import type {
  CaseId,
  EvidenceContext,
  MisconceptionId,
  PresentationStage,
  SkillId,
} from "./types";
import type { EvidenceBoardConfig } from "./evidenceBoard";
import type { SourceIntelligenceConfig, SourceIntelligenceMetadata } from "./sourceIntelligence";
import type { DocumentIntelligenceConfig } from "./documentIntelligence";
import type { ResearchMediaDecisionConfig } from "./researchMediaDecision";
import type { LiteratureIntelligenceConfig } from "./literatureIntelligence";
import type { AppliedReadingConfig } from "./appliedReading";

export type CaseGenre =
  | "mystery"
  | "meaning"
  | "source"
  | "decision"
  | "word"
  | "procedure"
  | "agreement"
  | "literature";

export type SourceKind =
  | "text"
  | "message"
  | "notice"
  | "advertisement"
  | "document"
  | "chart"
  | "timeline"
  | "audio"
  | "image";

export interface CaseSource {
  id: string;
  kind: SourceKind;
  title: string;
  body: string;
  authority?: "official" | "reported" | "personal" | "unknown";
  intelligence?: SourceIntelligenceMetadata;
}

export type ResponseType =
  | "single-choice"
  | "multiple-choice"
  | "drag-sort"
  | "match"
  | "sequence"
  | "highlight-phrase"
  | "highlight-sentence"
  | "select-source"
  | "connect-evidence"
  | "classify"
  | "timeline"
  | "structured-explanation"
  | "free-response"
  | "spoken-response"
  | "confidence-rating"
  | "decision-workbench";

export interface InvestigationChoice {
  id: string;
  label: string;
  misconceptionId?: MisconceptionId;
}

export interface InvestigationStep {
  id: string;
  prompt: string;
  skillId: SkillId;
  responseType: ResponseType;
  sourceIds: string[];
  choices?: InvestigationChoice[];
  correctAnswerIds?: string[];
  acceptableAnswerIds?: string[];
  allowInsufficientEvidence?: boolean;
  clueLabId?: string;
  evidenceContext?: EvidenceContext;
  evidenceBoard?: EvidenceBoardConfig;
  sourceLensId?: string;
  sourceClaimId?: string;
  documentLensId?: string;
  researchProfileId?: string;
  mediaFrameId?: string;
  quantitativeFrameId?: string;
  graphFrameId?: string;
  decisionId?: string;
}

export interface ReadingCase {
  id: CaseId;
  title: string;
  genre: CaseGenre;
  presentationStages: PresentationStage[];
  targetSkills: SkillId[];
  prerequisiteSkills: SkillId[];
  briefing: string;
  sources: CaseSource[];
  steps: InvestigationStep[];
  misconceptionTargets: MisconceptionId[];
  transferCaseIds: CaseId[];
  sourceIntelligence?: SourceIntelligenceConfig;
  documentIntelligence?: DocumentIntelligenceConfig;
  researchMediaDecision?: ResearchMediaDecisionConfig;
  literatureIntelligence?: LiteratureIntelligenceConfig;
  appliedReading?: AppliedReadingConfig;
  capstone?: boolean;
  delayedReview?: {
    afterDays: number;
    skillIds: SkillId[];
  };
}
