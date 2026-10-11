import type { SkillDefinition } from "../domain";

export type AudioTarget = "target-word" | "sentence" | "instructions" | "source";

export function canReadAloud(
  skill: SkillDefinition,
  target: AudioTarget,
  isAssessment: boolean,
): boolean {
  if (target === "instructions") return true;

  if (
    isAssessment &&
    skill.domain === "decoding" &&
    target === "target-word"
  ) {
    return false;
  }

  return true;
}
