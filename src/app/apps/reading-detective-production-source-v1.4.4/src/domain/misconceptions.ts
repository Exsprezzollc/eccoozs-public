import type { MisconceptionId, SkillId } from "./types";

export interface MisconceptionDefinition {
  id: MisconceptionId;
  skillId: SkillId;
  label: string;
  description: string;
  confirmationThreshold: number;
  probeIds: string[];
  clueLabId: string;
}

export interface DiagnosticProbe {
  id: string;
  misconceptionId: MisconceptionId;
  prompt: string;
  correctAnswerIds: string[];
  choices: Array<{ id: string; label: string }>;
}
