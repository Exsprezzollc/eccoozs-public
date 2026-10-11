import type {
  CapstoneProgression,
  CurriculumMap,
  GraduationDefinition,
  ProductionQaReport,
  QaIssue,
  ReadingCase,
  SkillGraph,
  TeachingModule,
} from "../domain";
import { validateCase } from "./caseValidation";
import { validateCurriculumMap, validateSkillGraph } from "./curriculumValidation";
import { validateTeachingModule } from "./teaching";

function countBySeverity(issues: QaIssue[]) {
  return {
    errorCount: issues.filter((issue) => issue.severity === "error").length,
    warningCount: issues.filter((issue) => issue.severity === "warning").length,
    infoCount: issues.filter((issue) => issue.severity === "info").length,
  };
}

function pushErrors(issues: QaIssue[], code: string, messages: string[], entityId?: string) {
  for (const message of messages) issues.push({ code, severity: "error", message, entityId });
}

export function runProductionQa(args: {
  graph: SkillGraph;
  cases: Record<string, ReadingCase>;
  curriculum: CurriculumMap;
  teachingModules: Record<string, TeachingModule>;
  teachingModulesBySkill: Record<string, TeachingModule>;
  capstoneProgression?: CapstoneProgression;
  graduationDefinition?: GraduationDefinition;
  retiredNames?: string[];
  generatedAt?: string;
}): ProductionQaReport {
  const issues: QaIssue[] = [];
  const checkIssues = new Map<string, QaIssue[]>();
  const add = (checkId: string, issue: QaIssue) => {
    issues.push(issue);
    checkIssues.set(checkId, [...(checkIssues.get(checkId) ?? []), issue]);
  };

  const skillErrors = validateSkillGraph(args.graph);
  skillErrors.forEach((message) => add("skill-graph", { code: "QA-SKILL-GRAPH", severity: "error", message }));

  const curriculumErrors = validateCurriculumMap(args.curriculum, args.graph, args.cases);
  curriculumErrors.forEach((message) => add("curriculum-map", { code: "QA-CURRICULUM", severity: "error", message }));

  for (const readingCase of Object.values(args.cases)) {
    const result = validateCase(readingCase, args.graph);
    result.errors.forEach((message) => add("case-contracts", { code: "QA-CASE", severity: "error", message: `${readingCase.id}: ${message}`, entityId: readingCase.id }));

    const sourceIds = readingCase.sources.map((source) => source.id);
    if (new Set(sourceIds).size !== sourceIds.length) {
      add("content-identifiers", { code: "QA-DUP-SOURCE", severity: "error", message: `${readingCase.id} has duplicate source ids.`, entityId: readingCase.id });
    }
    const stepIds = readingCase.steps.map((step) => step.id);
    if (new Set(stepIds).size !== stepIds.length) {
      add("content-identifiers", { code: "QA-DUP-STEP", severity: "error", message: `${readingCase.id} has duplicate step ids.`, entityId: readingCase.id });
    }
    if (readingCase.steps.length === 0) {
      add("content-identifiers", { code: "QA-EMPTY-CASE", severity: "error", message: `${readingCase.id} has no investigation steps.`, entityId: readingCase.id });
    }
    for (const step of readingCase.steps) {
      const choiceIds = step.choices?.map((choice) => choice.id) ?? [];
      if (new Set(choiceIds).size !== choiceIds.length) {
        add("content-identifiers", { code: "QA-DUP-CHOICE", severity: "error", message: `${readingCase.id}/${step.id} has duplicate choice ids.`, entityId: readingCase.id });
      }
      if (step.correctAnswerIds?.some((answerId) => !choiceIds.includes(answerId))) {
        add("content-identifiers", { code: "QA-MISSING-CORRECT-CHOICE", severity: "error", message: `${readingCase.id}/${step.id} references a correct answer that is not a choice.`, entityId: readingCase.id });
      }
    }
  }

  for (const module of Object.values(args.teachingModules)) {
    validateTeachingModule(module).forEach((message) => add("teaching-contracts", { code: "QA-TEACHING", severity: "error", message, entityId: module.id }));
    if (!args.graph[module.skillId]) {
      add("teaching-contracts", { code: "QA-TEACHING-SKILL", severity: "error", message: `${module.id} teaches unknown skill ${module.skillId}.`, entityId: module.id });
    }
  }

  for (const stageMap of Object.values(args.curriculum)) {
    const curriculumSkills = new Set(stageMap.strands.flatMap((strand) => strand.skillIds));
    for (const skillId of curriculumSkills) {
      const module = args.teachingModulesBySkill[skillId];
      if (!module || !module.stages.includes(stageMap.stage) || !module.variants[stageMap.stage]) {
        add("teach-first-coverage", {
          code: "QA-TEACH-FIRST-COVERAGE",
          severity: "error",
          message: `${stageMap.stage} curriculum skill ${skillId} lacks an age-compatible Teach-First module.`,
          entityId: skillId,
        });
      }
    }
  }

  if (args.capstoneProgression || args.graduationDefinition) {
    const progression = args.capstoneProgression;
    const graduation = args.graduationDefinition;
    if (!progression || !graduation) {
      add("capstone-contract", { code: "QA-CAPSTONE-PAIR", severity: "error", message: "Capstone progression and graduation definition must be supplied together." });
    } else {
      const capstoneCase = args.cases[progression.capstoneCaseId];
      if (!capstoneCase) {
        add("capstone-contract", { code: "QA-CAPSTONE-CASE", severity: "error", message: `Capstone case ${progression.capstoneCaseId} is missing.` });
      } else {
        if (!capstoneCase.capstone) {
          add("capstone-contract", { code: "QA-CAPSTONE-FLAG", severity: "error", message: `${capstoneCase.id} must be marked capstone.`, entityId: capstoneCase.id });
        }
        if (!capstoneCase.presentationStages.includes("lead-investigator")) {
          add("capstone-contract", { code: "QA-CAPSTONE-STAGE", severity: "error", message: `${capstoneCase.id} must support Lead Investigator presentation.`, entityId: capstoneCase.id });
        }
        if (graduation.caseId !== capstoneCase.id) {
          add("capstone-contract", { code: "QA-GRAD-CASE", severity: "error", message: `Graduation definition points to ${graduation.caseId}, expected ${capstoneCase.id}.` });
        }
        const capstoneStepIds = new Set(capstoneCase.steps.map((step) => step.id));
        for (const competency of graduation.competencies) {
          for (const stepId of competency.stepIds) {
            if (!capstoneStepIds.has(stepId)) {
              add("capstone-contract", { code: "QA-GRAD-STEP", severity: "error", message: `Graduation competency ${competency.id} references missing capstone step ${stepId}.`, entityId: competency.id });
            }
          }
        }
      }
      for (const requirement of progression.requirements) {
        if (requirement.minimumSatisfied < 1 || requirement.minimumSatisfied > requirement.skillIds.length) {
          add("capstone-contract", { code: "QA-READINESS-COUNT", severity: "error", message: `${requirement.id} has invalid minimumSatisfied ${requirement.minimumSatisfied}.`, entityId: requirement.id });
        }
        for (const skillId of requirement.skillIds) {
          if (!args.graph[skillId]) add("capstone-contract", { code: "QA-READINESS-SKILL", severity: "error", message: `${requirement.id} references unknown skill ${skillId}.`, entityId: requirement.id });
        }
      }
    }
  }

  const retiredNames = args.retiredNames ?? [];
  if (retiredNames.length > 0) {
    const serialized = JSON.stringify({
      cases: args.cases,
      curriculum: args.curriculum,
      teachingModules: args.teachingModules,
    }).toLowerCase();
    for (const retiredName of retiredNames) {
      const pattern = new RegExp(`\\b${retiredName.toLowerCase().replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}\\b`);
      if (pattern.test(serialized)) {
        add("content-hygiene", { code: "QA-RETIRED-NAME", severity: "error", message: `Retired character name ${retiredName} appears in learner content.` });
      }
    }
  }

  const learnerFacingText = JSON.stringify({ cases: args.cases, curriculum: args.curriculum, teachingModules: args.teachingModules });
  const gradeLabelPatterns = [/\breading grade\b/i, /\bgrade equivalent\b/i, /\breads? at (?:a )?grade\b/i, /\b(?:1st|2nd|3rd|[4-9]th|1[0-2]th)[ -]grade reader\b/i];
  for (const pattern of gradeLabelPatterns) {
    if (pattern.test(learnerFacingText)) {
      add("content-hygiene", { code: "QA-GRADE-LABEL", severity: "error", message: `Learner-facing curriculum content contains a stigmatizing grade-label pattern: ${pattern.source}` });
    }
  }

  const checkLabels: Record<string, string> = {
    "skill-graph": "Skill graph integrity",
    "curriculum-map": "Curriculum references",
    "case-contracts": "Case engine contracts",
    "content-identifiers": "Content identifier integrity",
    "teaching-contracts": "Teaching module contracts",
    "teach-first-coverage": "Teach-First coverage",
    "capstone-contract": "Capstone & graduation contract",
    "content-hygiene": "Content hygiene",
  };
  const checkOrder = Object.keys(checkLabels);
  const checks = checkOrder.map((id) => {
    const current = checkIssues.get(id) ?? [];
    const counts = countBySeverity(current);
    return { id, label: checkLabels[id], passed: counts.errorCount === 0, ...counts };
  });
  const counts = countBySeverity(issues);

  return {
    generatedAt: args.generatedAt ?? new Date().toISOString(),
    passed: counts.errorCount === 0,
    ...counts,
    checks,
    issues,
  };
}
