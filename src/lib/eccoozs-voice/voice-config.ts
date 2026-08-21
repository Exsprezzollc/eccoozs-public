export const ECCOOZS_VOICE_ALIASES = [
  "ECCOOZS_FEMALE_01",
  "ECCOOZS_FEMALE_02",
  "ECCOOZS_MALE_01",
  "ECCOOZS_MALE_02",
] as const;

export type EccoozsVoiceAlias = (typeof ECCOOZS_VOICE_ALIASES)[number];

export const ECCOOZS_VOICE_LABELS: Record<EccoozsVoiceAlias, string> = {
  ECCOOZS_FEMALE_01: "Woman 1",
  ECCOOZS_FEMALE_02: "Woman 2",
  ECCOOZS_MALE_01: "Man 1",
  ECCOOZS_MALE_02: "Man 2",
};

export type EccoozsVoiceSpeed = "normal" | "slower";

export type EccoozsVoiceMode =
  | "teaching"
  | "guided-practice"
  | "narration"
  | "investigation"
  | "professional"
  | "encouragement";

export type EccoozsAudioPurpose =
  | "teach"
  | "model"
  | "guided-practice"
  | "assessment"
  | "feedback"
  | "ui";

export interface EccoozsLearningVoiceRequest {
  voice: EccoozsVoiceAlias;
  text: string;
  mode: EccoozsVoiceMode;
  purpose: EccoozsAudioPurpose;
  speedPreference?: EccoozsVoiceSpeed;
  answerProtectedText?: string[];
}

export const DEFAULT_ECCOOZS_VOICE: EccoozsVoiceAlias = "ECCOOZS_FEMALE_01";
export const DEFAULT_ECCOOZS_VOICE_SPEED: EccoozsVoiceSpeed = "normal";

// Global cross-product preference keys. Learning apps must share these keys.
export const ECCOOZS_VOICE_STORAGE_KEYS = {
  alias: "eccoozs.learning.voice.alias",
  speed: "eccoozs.learning.voice.speed",
  enabled: "eccoozs.learning.voice.enabled",
} as const;

export const ECCOOZS_VOICE_PREVIEW_TEXT =
  "Hi! I can help you learn. Tap me if you like this voice.";

export function isEccoozsVoiceAlias(value: unknown): value is EccoozsVoiceAlias {
  return (
    typeof value === "string" &&
    (ECCOOZS_VOICE_ALIASES as readonly string[]).includes(value)
  );
}
