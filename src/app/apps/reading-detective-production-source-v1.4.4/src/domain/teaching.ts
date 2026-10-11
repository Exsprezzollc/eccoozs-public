import type {
  EvidenceContext,
  MasteryLevel,
  PresentationStage,
  SkillId,
} from "./types";
import type { InvestigationChoice } from "./cases";

export type TeachingPhase =
  | "discover"
  | "explain"
  | "model"
  | "together"
  | "supported"
  | "independent"
  | "transfer"
  | "complete";

export type TeachingInteractionKind = "choice" | "match" | "sequence" | "build" | "spell";

/**
 * Word-building / encoding target: the learner assembles a word from ordered
 * grapheme tiles. `graphemes` is the correct ordered sequence (letters or
 * multi-letter graphemes); `distractors` add non-target tiles to the pool.
 */
export interface TeachingBuildTarget {
  word: string;
  graphemes: string[];
  distractors?: string[];
  audioText?: string;
}

/**
 * Simple spelling / encoding target: the learner types the word. `accept`
 * lists all correct spellings (defaults to `[word]`); matching is
 * case-insensitive and trims surrounding whitespace.
 */
export interface TeachingSpellTarget {
  word: string;
  accept?: string[];
  hint?: string;
  audioText?: string;
}

export interface TeachingMatchPair {
  id: string;
  left: string;
  right: string;
  leftAudioText?: string;
  rightAudioText?: string;
}

export interface TeachingSequenceToken {
  id: string;
  label: string;
  audioText?: string;
}

export interface TeachingPracticeItem {
  id: string;
  prompt: string;
  sourceTitle?: string;
  sourceBody?: string;
  audioText?: string;
  /**
   * Rendering contract for practice. Choice remains the default for legacy content,
   * while match and sequence let foundation lessons use tactile interactions instead
   * of reducing every concept to multiple-choice buttons.
   */
  interaction?: TeachingInteractionKind;
  choices: InvestigationChoice[];
  correctAnswerIds: string[];
  matchPairs?: TeachingMatchPair[];
  sequenceTokens?: TeachingSequenceToken[];
  /** Encoding: assemble the word from ordered grapheme tiles. */
  buildTarget?: TeachingBuildTarget;
  /** Encoding: type the word (developmentally appropriate written production). */
  spellTarget?: TeachingSpellTarget;
  successMessage: string;
  retryMessage: string;
}

export interface TeachingPresentationVariant {
  stage: PresentationStage;
  discover: {
    title: string;
    body: string;
  };
  explanation: string;
  model: {
    sourceTitle?: string;
    sourceBody?: string;
    audioText?: string;
    thinking: string;
  };
  together: TeachingPracticeItem;
  supported: TeachingPracticeItem;
  independent: TeachingPracticeItem;
  transfer: TeachingPracticeItem;
}

export interface TeachingModule {
  id: string;
  skillId: SkillId;
  title: string;
  stages: PresentationStage[];
  variants: Partial<Record<PresentationStage, TeachingPresentationVariant>>;
  notebookTool?: {
    title: string;
    reminder: string;
  };
}

export interface TeachingAttempt {
  phase: Extract<TeachingPhase, "together" | "supported" | "independent" | "transfer">;
  itemId: string;
  attempts: number;
  correct: boolean;
}

export interface TeachingSession {
  id: string;
  learnerId: string;
  moduleId: string;
  skillId: SkillId;
  presentationStage: PresentationStage;
  returnTo?: { caseId: string; stepIndex: number };
  phase: TeachingPhase;
  completedPhases: TeachingPhase[];
  attempts: Partial<Record<TeachingAttempt["phase"], TeachingAttempt>>;
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
}

export function evidenceContextForTeachingPhase(
  phase: TeachingPhase,
): EvidenceContext | undefined {
  if (phase === "discover" || phase === "explain" || phase === "model") {
    return "instruction";
  }
  if (phase === "together") return "guided-practice";
  if (phase === "supported") return "supported-practice";
  if (phase === "independent") return "independent";
  if (phase === "transfer") return "transfer";
  return undefined;
}

export function teachingEntryPhaseForMastery(mastery: MasteryLevel): TeachingPhase {
  switch (mastery) {
    case "not-introduced":
    case "introduced":
      return "discover";
    case "guided":
    case "developing":
    case "review-needed":
      return "supported";
    case "independent":
    case "transferred":
      return "transfer";
    case "secure":
      return "complete";
  }
}
