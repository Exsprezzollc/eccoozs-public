export type PresentationStage =
  | "young-investigator"
  | "investigator"
  | "lead-investigator";

export type ReadingDevelopment =
  | "foundation"
  | "decoder"
  | "word-reader"
  | "fluent-reader"
  | "comprehender"
  | "evidence-reader"
  | "analytical-reader";

export type DetectiveAppearance = "fba" | "caucasian";

export type MasteryLevel =
  | "not-introduced"
  | "introduced"
  | "guided"
  | "developing"
  | "independent"
  | "transferred"
  | "secure"
  | "review-needed";

export type SupportLevel =
  | "independent"
  | "reread"
  | "attention-cue"
  | "concept-reminder"
  | "worked-example"
  | "reteach";

export type EvidenceModality = "print" | "audio" | "mixed";

export type EvidenceContext =
  | "instruction"
  | "guided-practice"
  | "supported-practice"
  | "independent"
  | "transfer"
  | "delayed-review"
  | "diagnostic-probe"
  | "placement";

export type EvidenceOutcome =
  | "presented"
  | "correct"
  | "incorrect"
  | "self-corrected"
  | "abandoned";

export type SkillId = string;
export type MisconceptionId = string;
export type CaseId = string;
export type LearnerId = string;
