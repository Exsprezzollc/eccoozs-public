import type { AccessibilityPreferences, DetectiveProfile } from "../domain";

export interface DetectiveVoiceStyle {
  rateMultiplier: number;
  pitch: number;
}

export interface VoiceOption {
  name: string;
  lang: string;
  localService: boolean;
  isDefault: boolean;
}

const PERSONALITY_STYLE: Record<DetectiveProfile["personality"], DetectiveVoiceStyle> = {
  patient: { rateMultiplier: 0.94, pitch: 1.0 },
  encouraging: { rateMultiplier: 1.0, pitch: 1.04 },
  curious: { rateMultiplier: 0.98, pitch: 1.05 },
  analytical: { rateMultiplier: 0.94, pitch: 0.97 },
  "evidence-focused": { rateMultiplier: 0.95, pitch: 0.99 },
  practical: { rateMultiplier: 0.97, pitch: 0.96 },
  empathetic: { rateMultiplier: 0.93, pitch: 1.01 },
  dependable: { rateMultiplier: 0.92, pitch: 0.98 },
};

export function supportsSpeechSynthesis(): boolean {
  return typeof globalThis !== "undefined" && "speechSynthesis" in globalThis && "SpeechSynthesisUtterance" in globalThis;
}

export function voiceOptions(): VoiceOption[] {
  if (!supportsSpeechSynthesis()) return [];
  return globalThis.speechSynthesis
    .getVoices()
    .filter((voice) => /^en(?:-|$)/i.test(voice.lang))
    .sort((a, b) => {
      if (a.default !== b.default) return a.default ? -1 : 1;
      if (a.localService !== b.localService) return a.localService ? -1 : 1;
      return a.name.localeCompare(b.name);
    })
    .map((voice) => ({
      name: voice.name,
      lang: voice.lang,
      localService: voice.localService,
      isDefault: voice.default,
    }));
}

function selectedVoice(preferences: AccessibilityPreferences): SpeechSynthesisVoice | undefined {
  if (!supportsSpeechSynthesis()) return undefined;
  const voices = globalThis.speechSynthesis.getVoices();
  if (preferences.voiceName) {
    const exact = voices.find((voice) => voice.name === preferences.voiceName);
    if (exact) return exact;
  }
  return (
    voices.find((voice) => /^en-US$/i.test(voice.lang) && voice.default) ??
    voices.find((voice) => /^en-US$/i.test(voice.lang) && voice.localService) ??
    voices.find((voice) => /^en(?:-|$)/i.test(voice.lang) && voice.default) ??
    voices.find((voice) => /^en(?:-|$)/i.test(voice.lang))
  );
}

export function speakDetectiveText(args: {
  text: string;
  detective: DetectiveProfile;
  preferences: AccessibilityPreferences;
  onUnavailable?: () => void;
  // Fired when narration actually begins and ends (including when it is
  // cancelled by a newer utterance). The UI uses these to show a calm
  // "listening" state while the mentor speaks and to reveal the learner's
  // turn only once the mentor has finished — so a beginning reader is never
  // rushed to act while directions are still being read aloud.
  onStart?: () => void;
  onEnd?: () => void;
}): boolean {
  if (!args.preferences.narrationEnabled || !supportsSpeechSynthesis()) {
    args.onUnavailable?.();
    return false;
  }

  const style = PERSONALITY_STYLE[args.detective.personality];
  const utterance = new SpeechSynthesisUtterance(args.text);
  const voice = selectedVoice(args.preferences);
  if (voice) utterance.voice = voice;
  utterance.lang = voice?.lang ?? "en-US";
  utterance.rate = Math.max(0.5, Math.min(1.8, args.preferences.speechRate * style.rateMultiplier));
  utterance.pitch = style.pitch;
  if (args.onStart) utterance.onstart = () => args.onStart?.();
  if (args.onEnd) {
    const finish = () => args.onEnd?.();
    utterance.onend = finish;
    utterance.onerror = finish;
  }
  globalThis.speechSynthesis.cancel();
  globalThis.speechSynthesis.speak(utterance);
  return true;
}

export function detectiveVoicePreviewText(detective: DetectiveProfile): string {
  return `${detective.name}. ${detective.descriptor}. ${detective.dialogue.evidence_prompt}`;
}
