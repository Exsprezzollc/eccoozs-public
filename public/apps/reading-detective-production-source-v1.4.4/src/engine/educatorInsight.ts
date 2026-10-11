import type {
  CurriculumMap,
  EducatorInsightReport,
  EducatorMisconceptionInsight,
  EducatorModalityObservation,
  EducatorRepairInsight,
  EducatorSkillBand,
  EducatorSkillInsight,
  EvidenceEvent,
  LearnerProfile,
  MisconceptionDefinition,
  PresentationStage,
  SkillDefinition,
  SkillGraph,
  SupportLevel,
  TeachingCoverageInsight,
  TeachingModule,
} from "../domain";
import { deriveSkillModalityProfile } from "./componentProfile";
import { deriveSkillStateForDefinition } from "./mastery";

const correctOutcome = (event: EvidenceEvent) =>
  event.outcome === "correct" || event.outcome === "self-corrected";

const practiceContexts = new Set([
  "guided-practice",
  "supported-practice",
  "independent",
  "transfer",
  "delayed-review",
]);

const supportLevels: SupportLevel[] = [
  "independent",
  "reread",
  "attention-cue",
  "concept-reminder",
  "worked-example",
  "reteach",
];

function orderedStageSkills(curriculum: CurriculumMap, stage: PresentationStage): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const strand of curriculum[stage].strands) {
    for (const skillId of strand.skillIds) {
      if (seen.has(skillId)) continue;
      seen.add(skillId);
      result.push(skillId);
    }
  }
  return result;
}

function skillBand(mastery: EducatorSkillInsight["mastery"]): EducatorSkillBand {
  if (mastery === "review-needed") return "review-needed";
  if (["secure", "transferred", "independent"].includes(mastery)) return "strength";
  if (["guided", "developing"].includes(mastery)) return "growing";
  return "new";
}

function summarizeSkill(
  definition: SkillDefinition,
  events: EvidenceEvent[],
): EducatorSkillInsight {
  const skillEvents = events.filter((event) => event.skillId === definition.id);
  const state = deriveSkillStateForDefinition(definition, events);
  const attempts = skillEvents.filter((event) => practiceContexts.has(event.context)).length;
  const correct = skillEvents.filter(
    (event) => practiceContexts.has(event.context) && correctOutcome(event),
  ).length;
  const independentEvents = skillEvents.filter(
    (event) => practiceContexts.has(event.context) && event.support === "independent",
  );
  const independentCorrect = independentEvents.filter(correctOutcome).length;
  return {
    skillId: definition.id,
    name: definition.name,
    domain: definition.domain,
    mastery: state.mastery,
    confidence: state.confidence,
    band: skillBand(state.mastery),
    attempts,
    correct,
    independentAttempts: independentEvents.length,
    independentCorrect,
    independentAccuracy: independentEvents.length
      ? Number((independentCorrect / independentEvents.length).toFixed(2))
      : undefined,
    lastEvidenceAt: state.lastEvidenceAt,
  };
}

function confirmedMisconceptions(args: {
  events: EvidenceEvent[];
  misconceptions: Record<string, MisconceptionDefinition>;
}): EducatorMisconceptionInsight[] {
  const result: EducatorMisconceptionInsight[] = [];
  for (const misconception of Object.values(args.misconceptions)) {
    const related = args.events.filter(
      (event) => event.misconceptionId === misconception.id,
    );
    const incorrect = related.filter((event) => event.outcome === "incorrect");
    const diagnosticProbeConfirmed = incorrect.some(
      (event) => event.context === "diagnostic-probe",
    );
    const caseErrorCount = incorrect.filter(
      (event) => event.context !== "diagnostic-probe",
    ).length;
    const requiresProbeConfirmation = misconception.probeIds.length > 0;
    if (requiresProbeConfirmation) {
      if (!diagnosticProbeConfirmed) continue;
    } else if (caseErrorCount < misconception.confirmationThreshold) {
      continue;
    }
    result.push({
      misconceptionId: misconception.id,
      skillId: misconception.skillId,
      label: misconception.label,
      description: misconception.description,
      incorrectEvidenceCount: incorrect.length,
      diagnosticProbeConfirmed,
      lastObservedAt: incorrect
        .map((event) => event.timestamp)
        .sort()
        .at(-1),
    });
  }
  return result.sort((a, b) =>
    (b.lastObservedAt ?? "").localeCompare(a.lastObservedAt ?? ""),
  );
}

function recentRepairs(
  events: EvidenceEvent[],
  skillGraph: SkillGraph,
): EducatorRepairInsight[] {
  const transferRepairs = events.filter(
    (event) =>
      event.context === "transfer" &&
      correctOutcome(event) &&
      typeof event.metadata?.clueLabId === "string",
  );
  const latest = new Map<string, EvidenceEvent>();
  for (const event of transferRepairs) {
    const previous = latest.get(event.skillId);
    if (!previous || previous.timestamp < event.timestamp) latest.set(event.skillId, event);
  }
  return [...latest.values()]
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, 8)
    .map((event) => ({
      skillId: event.skillId,
      name: skillGraph[event.skillId]?.name ?? event.skillId,
      clueLabId: String(event.metadata?.clueLabId ?? ""),
      repairedAt: event.timestamp,
      transferredAfterRepair: true,
    }));
}

function supportSummary(events: EvidenceEvent[]) {
  const practice = events.filter(
    (event) => practiceContexts.has(event.context) && event.outcome !== "presented",
  );
  const supportCounts = Object.fromEntries(
    supportLevels.map((level) => [
      level,
      practice.filter((event) => event.support === level).length,
    ]),
  ) as Record<SupportLevel, number>;
  const independent = practice.filter((event) => event.support === "independent");
  const independentCorrect = independent.filter(correctOutcome).length;
  const supportedAttempts = practice.length - independent.length;
  return {
    totalPracticeAttempts: practice.length,
    independentAttempts: independent.length,
    independentCorrect,
    independentAccuracy: independent.length
      ? Number((independentCorrect / independent.length).toFixed(2))
      : undefined,
    supportCounts,
    supportedAttemptRate: practice.length
      ? Number((supportedAttempts / practice.length).toFixed(2))
      : undefined,
  };
}

function modalityObservations(
  events: EvidenceEvent[],
  skillGraph: SkillGraph,
): EducatorModalityObservation[] {
  const observations: EducatorModalityObservation[] = [];
  for (const definition of Object.values(skillGraph)) {
    const profile = deriveSkillModalityProfile(definition.id, events);
    if (profile.print.attempts < 2 || profile.audio.attempts < 2) continue;
    const printAccuracy = profile.print.accuracy ?? 0;
    const audioAccuracy = profile.audio.accuracy ?? 0;
    if (audioAccuracy - printAccuracy < 0.25) continue;
    observations.push({
      skillId: definition.id,
      name: definition.name,
      printAttempts: profile.print.attempts,
      printAccuracy: profile.print.accuracy,
      audioAttempts: profile.audio.attempts,
      audioAccuracy: profile.audio.accuracy,
      observation:
        "Current evidence is stronger when the same meaning is accessed through listening than through print. This is an instructional access pattern, not a diagnosis or statement of cause.",
    });
  }
  return observations;
}

function teachingCoverage(args: {
  curriculum: CurriculumMap;
  stage: PresentationStage;
  teachingModulesBySkill: Record<string, TeachingModule>;
}): TeachingCoverageInsight {
  const stageSkills = orderedStageSkills(args.curriculum, args.stage);
  const foundationSkills = orderedStageSkills(args.curriculum, "young-investigator");
  const supportsStage = (skillId: string) => {
    const module = args.teachingModulesBySkill[skillId];
    return Boolean(
      module &&
        module.stages.includes(args.stage) &&
        module.variants[args.stage],
    );
  };
  const covered = stageSkills.filter(supportsStage);
  const foundationCovered = foundationSkills.filter(supportsStage);
  return {
    stage: args.stage,
    curriculumSkillCount: stageSkills.length,
    coveredSkillCount: covered.length,
    coverageRate: stageSkills.length
      ? Number((covered.length / stageSkills.length).toFixed(2))
      : 1,
    uncoveredSkillIds: stageSkills.filter((skillId) => !supportsStage(skillId)),
    foundationSkillCount: foundationSkills.length,
    foundationCoveredSkillCount: foundationCovered.length,
    foundationCoverageRate: foundationSkills.length
      ? Number((foundationCovered.length / foundationSkills.length).toFixed(2))
      : 1,
  };
}

function suggestedSupportFor(mastery: EducatorSkillInsight["mastery"]): string {
  if (mastery === "review-needed") {
    return "Use a brief new-context review, then check transfer again rather than restarting the entire unit.";
  }
  if (mastery === "guided" || mastery === "developing") {
    return "Keep support available, fade it deliberately, and require one independent transfer example before treating the tool as stable.";
  }
  if (mastery === "independent" || mastery === "transferred") {
    return "Use spaced transfer in a different text type; avoid repetitive practice that adds no new evidence.";
  }
  return "Teach the concept explicitly before independent testing, using the learner's current age-respecting presentation stage.";
}

function nextFocus(args: {
  learner: LearnerProfile;
  insights: EducatorSkillInsight[];
  curriculum: CurriculumMap;
  teachingModulesBySkill: Record<string, TeachingModule>;
}) {
  const byId = Object.fromEntries(args.insights.map((insight) => [insight.skillId, insight]));
  const stageOrder = orderedStageSkills(args.curriculum, args.learner.presentationStage);
  const placementSkill = args.learner.placement?.recommendedSkillId;
  const candidates = placementSkill
    ? [placementSkill, ...stageOrder.filter((skillId) => skillId !== placementSkill)]
    : stageOrder;

  const priority = ["review-needed", "guided", "developing", "introduced", "not-introduced"];
  for (const mastery of priority) {
    for (const skillId of candidates) {
      const insight = byId[skillId];
      if (!insight || insight.mastery !== mastery) continue;
      const module = args.teachingModulesBySkill[skillId];
      if (!module?.variants[args.learner.presentationStage]) continue;
      return {
        skillId,
        name: insight.name,
        rationale:
          mastery === "review-needed"
            ? "Recent evidence suggests a previously stable tool needs a fresh check."
            : mastery === "guided" || mastery === "developing"
              ? "The learner is succeeding with some support but does not yet have enough independent transfer evidence."
              : "This is the earliest useful tool in the learner's current route that still needs explicit instruction.",
        suggestedSupport: suggestedSupportFor(insight.mastery),
      };
    }
  }
  return undefined;
}

export function deriveEducatorInsightReport(args: {
  learner: LearnerProfile;
  events: EvidenceEvent[];
  skillGraph: SkillGraph;
  curriculum: CurriculumMap;
  teachingModulesBySkill: Record<string, TeachingModule>;
  misconceptions: Record<string, MisconceptionDefinition>;
  now?: string;
}): EducatorInsightReport {
  const stageSkillIds = orderedStageSkills(args.curriculum, args.learner.presentationStage);
  const definitions = stageSkillIds
    .map((skillId) => args.skillGraph[skillId])
    .filter((definition): definition is SkillDefinition => Boolean(definition));
  const insights = definitions.map((definition) => summarizeSkill(definition, args.events));
  const coverage = teachingCoverage({
    curriculum: args.curriculum,
    stage: args.learner.presentationStage,
    teachingModulesBySkill: args.teachingModulesBySkill,
  });

  return {
    learnerId: args.learner.id,
    presentationStage: args.learner.presentationStage,
    generatedAt: args.now ?? new Date().toISOString(),
    strengths: insights.filter((insight) => insight.band === "strength"),
    growingTools: insights.filter((insight) => insight.band === "growing"),
    newTools: insights.filter((insight) => insight.band === "new"),
    reviewNeeded: insights.filter((insight) => insight.band === "review-needed"),
    recentRepairs: recentRepairs(args.events, args.skillGraph),
    confirmedMisconceptions: confirmedMisconceptions({
      events: args.events,
      misconceptions: args.misconceptions,
    }),
    support: supportSummary(args.events),
    modalityObservations: modalityObservations(args.events, args.skillGraph),
    nextFocus: nextFocus({
      learner: args.learner,
      insights,
      curriculum: args.curriculum,
      teachingModulesBySkill: args.teachingModulesBySkill,
    }),
    teachingCoverage: coverage,
    notes: [
      "This dashboard summarizes observed reading evidence. It does not diagnose a disability, condition, or cause of difficulty.",
      "Presentation stage and instructional skill are separate so an older learner can receive foundational instruction without being moved into a younger interface.",
      "Reading Detective does not generate a learner-facing grade-equivalent label from this evidence profile.",
    ],
  };
}
