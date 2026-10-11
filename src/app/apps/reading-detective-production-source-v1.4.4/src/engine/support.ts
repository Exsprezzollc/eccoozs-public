import type { InvestigationStep, SkillDefinition, SupportLevel } from "../domain";

const SUPPORT_ORDER: SupportLevel[] = [
  "independent",
  "reread",
  "attention-cue",
  "concept-reminder",
];

export function nextSupportLevel(current: SupportLevel): SupportLevel {
  const index = SUPPORT_ORDER.indexOf(current);
  if (index < 0 || index >= SUPPORT_ORDER.length - 1) {
    return "concept-reminder";
  }
  return SUPPORT_ORDER[index + 1];
}

export function isSupportLadderExhausted(level: SupportLevel): boolean {
  return level === "concept-reminder";
}

export function supportMessage(args: {
  support: SupportLevel;
  step: InvestigationStep;
  skill?: SkillDefinition;
  sourceTitle?: string;
}): string {
  const { support, step, skill, sourceTitle } = args;
  if (support === "reread") {
    return "Read the clue one more time. Good investigators often reread before deciding.";
  }
  if (support === "attention-cue") {
    return sourceTitle
      ? `Focus on the evidence in “${sourceTitle}.” Which words answer the question?`
      : "Focus on the exact words that answer the question.";
  }
  if (support === "concept-reminder") {
    return skill
      ? `Tool reminder — ${skill.name}: ${skill.description}`
      : `Tool reminder: slow down and identify exactly what the prompt asks: “${step.prompt}”`;
  }
  return "Use the evidence and make your best independent decision.";
}
