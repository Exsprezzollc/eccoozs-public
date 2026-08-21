import {
  DEFAULT_ECCOOZS_VOICE,
  DEFAULT_ECCOOZS_VOICE_SPEED,
  ECCOOZS_VOICE_PREVIEW_TEXT,
  ECCOOZS_VOICE_STORAGE_KEYS,
  isEccoozsVoiceAlias,
  type EccoozsAudioPurpose,
  type EccoozsVoiceAlias,
  type EccoozsVoiceMode,
  type EccoozsVoiceSpeed,
} from "./voice-config";

const LEGACY_WORLD_EXPLORER_KEY = "eccoozs:learning-voice:v1";

export interface EccoozsVoicePreferences {
  alias: EccoozsVoiceAlias;
  speed: EccoozsVoiceSpeed;
  enabled: boolean;
}

export interface SpeakEccoozsOptions {
  voice?: EccoozsVoiceAlias;
  text: string;
  mode?: EccoozsVoiceMode;
  purpose?: EccoozsAudioPurpose;
  speedPreference?: EccoozsVoiceSpeed;
  answerProtectedText?: string[];
}

let currentAudio: HTMLAudioElement | null = null;
let currentObjectUrl: string | null = null;

function hasWindow() {
  return typeof window !== "undefined";
}

function readBoolean(value: string | null, fallback: boolean) {
  if (value === null) return fallback;
  return value !== "0" && value !== "false";
}

function migrateLegacyPreferences() {
  if (!hasWindow()) return;

  const alreadyMigrated = window.localStorage.getItem(
    ECCOOZS_VOICE_STORAGE_KEYS.alias
  );
  if (alreadyMigrated) return;

  try {
    const legacy = JSON.parse(
      window.localStorage.getItem(LEGACY_WORLD_EXPLORER_KEY) ?? "null"
    ) as { voice?: unknown; speed?: unknown } | null;

    if (legacy && isEccoozsVoiceAlias(legacy.voice)) {
      window.localStorage.setItem(
        ECCOOZS_VOICE_STORAGE_KEYS.alias,
        legacy.voice
      );
    }

    if (legacy?.speed === "normal" || legacy?.speed === "slower") {
      window.localStorage.setItem(
        ECCOOZS_VOICE_STORAGE_KEYS.speed,
        legacy.speed
      );
    }
  } catch {
    // Ignore malformed legacy preference data.
  }
}

export function loadEccoozsVoicePreferences(): EccoozsVoicePreferences {
  if (!hasWindow()) {
    return {
      alias: DEFAULT_ECCOOZS_VOICE,
      speed: DEFAULT_ECCOOZS_VOICE_SPEED,
      enabled: true,
    };
  }

  migrateLegacyPreferences();

  const storedAlias = window.localStorage.getItem(
    ECCOOZS_VOICE_STORAGE_KEYS.alias
  );
  const storedSpeed = window.localStorage.getItem(
    ECCOOZS_VOICE_STORAGE_KEYS.speed
  );
  const storedEnabled = window.localStorage.getItem(
    ECCOOZS_VOICE_STORAGE_KEYS.enabled
  );

  return {
    alias: isEccoozsVoiceAlias(storedAlias)
      ? storedAlias
      : DEFAULT_ECCOOZS_VOICE,
    speed:
      storedSpeed === "slower" || storedSpeed === "normal"
        ? storedSpeed
        : DEFAULT_ECCOOZS_VOICE_SPEED,
    enabled: readBoolean(storedEnabled, true),
  };
}

export function saveEccoozsVoicePreferences(
  preferences: Partial<EccoozsVoicePreferences>
) {
  if (!hasWindow()) return;

  const current = loadEccoozsVoicePreferences();
  const next = { ...current, ...preferences };

  window.localStorage.setItem(ECCOOZS_VOICE_STORAGE_KEYS.alias, next.alias);
  window.localStorage.setItem(ECCOOZS_VOICE_STORAGE_KEYS.speed, next.speed);
  window.localStorage.setItem(
    ECCOOZS_VOICE_STORAGE_KEYS.enabled,
    next.enabled ? "1" : "0"
  );
}

export function stopEccoozsVoice() {
  currentAudio?.pause();
  currentAudio = null;

  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = null;
  }
}

export async function speakEccoozsVoice(options: SpeakEccoozsOptions) {
  if (!hasWindow()) return null;

  const preferences = loadEccoozsVoicePreferences();
  if (!preferences.enabled) return null;

  const text = options.text.trim();
  if (!text) return null;

  stopEccoozsVoice();

  const response = await fetch("/api/learning-voice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      voice: options.voice ?? preferences.alias,
      text,
      mode: options.mode ?? "narration",
      purpose: options.purpose ?? "ui",
      speedPreference: options.speedPreference ?? preferences.speed,
      answerProtectedText: options.answerProtectedText ?? [],
    }),
  });

  if (!response.ok) {
    const detail = (await response.json().catch(() => null)) as
      | { error?: string }
      | null;
    throw new Error(detail?.error || "ECCOOZS voice request failed.");
  }

  const blob = await response.blob();
  currentObjectUrl = URL.createObjectURL(blob);
  currentAudio = new Audio(currentObjectUrl);
  currentAudio.playbackRate =
    (options.speedPreference ?? preferences.speed) === "slower" ? 0.84 : 1;

  await currentAudio.play();
  return currentAudio;
}

export async function previewEccoozsVoice(alias: EccoozsVoiceAlias) {
  return speakEccoozsVoice({
    voice: alias,
    text: ECCOOZS_VOICE_PREVIEW_TEXT,
    mode: "encouragement",
    purpose: "ui",
  });
}
