import type { ContentVariationTemplate, SkillGraph } from "../domain";
import { compatibleScenarios } from "./variation";

const tokenPattern = /\{\{([A-Za-z0-9_.-]+)\}\}/g;

function tokensIn(value: string): string[] {
  return [...value.matchAll(tokenPattern)].map((match) => match[1]);
}

export function validateVariationTemplate(
  template: ContentVariationTemplate,
  graph: SkillGraph,
): string[] {
  const errors: string[] = [];
  if (!graph[template.skillId]) {
    errors.push(`${template.id}: unknown skill ${template.skillId}`);
  }
  if (template.scenarios.length < 2) {
    errors.push(`${template.id}: needs at least two scenarios for meaningful variation`);
  }

  const choiceIds = new Set(template.choices.map((choice) => choice.id));
  for (const correctId of template.correctChoiceIds) {
    if (!choiceIds.has(correctId)) {
      errors.push(`${template.id}: correct choice ${correctId} does not exist`);
    }
  }

  const requiredTokens = new Set([
    ...tokensIn(template.sourceTitleTemplate),
    ...tokensIn(template.sourceBodyTemplate),
    ...tokensIn(template.promptTemplate),
    ...template.choices.flatMap((choice) => tokensIn(choice.labelTemplate)),
  ]);

  for (const scenario of template.scenarios) {
    if (scenario.stages.length === 0) {
      errors.push(`${template.id}/${scenario.id}: no presentation stage`);
    }
    for (const token of requiredTokens) {
      if (!(token in scenario.tokens)) {
        errors.push(`${template.id}/${scenario.id}: missing token ${token}`);
      }
    }
  }

  for (const stage of [
    "young-investigator",
    "investigator",
    "lead-investigator",
  ] as const) {
    const skill = graph[template.skillId];
    if (skill?.presentationStages.includes(stage) && compatibleScenarios(template, stage).length === 0) {
      // A template may intentionally serve only part of a skill's stage range.
      // This is informational, not an error.
    }
  }

  return errors;
}
