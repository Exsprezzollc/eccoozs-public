import type { EvidenceEvent, EvidenceModality, SkillId } from "../domain";

export interface ModalityEvidenceSummary {
  attempts: number;
  correct: number;
  independentCorrect: number;
  accuracy?: number;
}

export interface SkillModalityProfile {
  skillId: SkillId;
  print: ModalityEvidenceSummary;
  audio: ModalityEvidenceSummary;
  mixed: ModalityEvidenceSummary;
  printAccessGap: boolean;
}

function summarize(events: EvidenceEvent[]): ModalityEvidenceSummary {
  const attempts = events.length;
  const correct = events.filter(
    (event) => event.outcome === "correct" || event.outcome === "self-corrected",
  ).length;
  const independentCorrect = events.filter(
    (event) =>
      event.support === "independent" &&
      (event.outcome === "correct" || event.outcome === "self-corrected"),
  ).length;
  return {
    attempts,
    correct,
    independentCorrect,
    accuracy: attempts ? Number((correct / attempts).toFixed(2)) : undefined,
  };
}

function eventsForModality(
  events: EvidenceEvent[],
  modality: EvidenceModality,
): EvidenceEvent[] {
  return events.filter((event) => (event.modality ?? "print") === modality);
}

export function deriveSkillModalityProfile(
  skillId: SkillId,
  events: EvidenceEvent[],
): SkillModalityProfile {
  const skillEvents = events.filter((event) => event.skillId === skillId);
  const print = summarize(eventsForModality(skillEvents, "print"));
  const audio = summarize(eventsForModality(skillEvents, "audio"));
  const mixed = summarize(eventsForModality(skillEvents, "mixed"));

  // We only assert an access gap when both channels have direct evidence.
  // This avoids inferring a disability or cause from a single response.
  const printAccessGap =
    print.attempts >= 1 &&
    audio.attempts >= 1 &&
    (print.accuracy ?? 1) < 0.5 &&
    (audio.accuracy ?? 0) >= 0.75;

  return { skillId, print, audio, mixed, printAccessGap };
}
