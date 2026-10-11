import type { ReadingCase, SkillGraph } from "../domain";
import { validateEvidenceBoardStep } from "./evidenceBoard";
import { validateSourceIntelligence } from "./sourceIntelligence";
import { validateDocumentIntelligence } from "./documentIntelligence";
import { validateResearchMediaDecision } from "./researchMediaDecision";
import { validateLiteratureIntelligence } from "./literatureIntelligence";
import { validateAppliedReading } from "./appliedReading";

export interface CaseValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateCase(
  readingCase: ReadingCase,
  graph: SkillGraph,
): CaseValidationResult {
  const errors: string[] = [];
  const sourceIds = new Set(readingCase.sources.map((source) => source.id));

  for (const skillId of [
    ...readingCase.targetSkills,
    ...readingCase.prerequisiteSkills,
  ]) {
    if (!graph[skillId]) errors.push(`Unknown skill ${skillId}`);
  }

  errors.push(...validateSourceIntelligence(readingCase));
  errors.push(...validateDocumentIntelligence(readingCase));
  errors.push(...validateResearchMediaDecision(readingCase));
  errors.push(...validateLiteratureIntelligence(readingCase));
  errors.push(...validateAppliedReading(readingCase));

  for (const step of readingCase.steps) {
    if (!graph[step.skillId]) errors.push(`Step ${step.id} uses unknown skill ${step.skillId}`);
    for (const sourceId of step.sourceIds) {
      if (!sourceIds.has(sourceId)) {
        errors.push(`Step ${step.id} references missing source ${sourceId}`);
      }
    }
    errors.push(...validateEvidenceBoardStep(readingCase, step));
    if (
      step.responseType === "single-choice" &&
      (!step.correctAnswerIds || step.correctAnswerIds.length === 0)
    ) {
      errors.push(`Step ${step.id} needs at least one correct answer`);
    }
  }

  return { valid: errors.length === 0, errors };
}
