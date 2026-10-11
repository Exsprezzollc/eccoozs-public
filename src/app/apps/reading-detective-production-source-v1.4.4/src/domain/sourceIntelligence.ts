import type { CaseId } from "./types";

export type SourcePurpose =
  | "inform"
  | "explain"
  | "persuade"
  | "sell"
  | "instruct"
  | "document"
  | "entertain"
  | "unknown";

export type SourceProximity =
  | "official-record"
  | "firsthand"
  | "secondhand"
  | "summary"
  | "repost"
  | "unknown";

export type SourceUtility =
  | "direct"
  | "supporting"
  | "context"
  | "limited"
  | "not-relevant";

export interface SourceIntelligenceMetadata {
  creator?: string;
  purpose?: SourcePurpose;
  proximity?: SourceProximity;
  /** Sources with the same independenceKey ultimately depend on the same underlying origin. */
  independenceKey?: string;
  originalSourceId?: string;
  interestNote?: string;
  contextNote?: string;
}

export interface SourceLensAssessment {
  sourceId: string;
  utility: SourceUtility;
  rationale: string;
}

export interface SourceQuestionLens {
  id: string;
  question: string;
  assessments: SourceLensAssessment[];
}

export type SourceClaimStance = "supports" | "contradicts" | "uncertain" | "mentions";

export interface SourceClaimPosition {
  sourceId: string;
  stance: SourceClaimStance;
  excerpt?: string;
}

export interface SourceClaimMap {
  id: string;
  claim: string;
  positions: SourceClaimPosition[];
}

export interface SourceIntelligenceConfig {
  lenses: SourceQuestionLens[];
  claims?: SourceClaimMap[];
}

export interface DerivedSourceLensEntry extends SourceLensAssessment {
  creator?: string;
  purpose?: SourcePurpose;
  proximity?: SourceProximity;
  independenceKey: string;
  interestNote?: string;
}

export interface DerivedSourceLens {
  caseId: CaseId;
  lensId: string;
  question: string;
  entries: DerivedSourceLensEntry[];
}

export type CorroborationStatus =
  | "corroborated"
  | "single-origin"
  | "disputed"
  | "uncertain"
  | "unsupported";

export interface CorroborationSummary {
  caseId: CaseId;
  claimId: string;
  claim: string;
  status: CorroborationStatus;
  supportingSourceIds: string[];
  contradictingSourceIds: string[];
  uncertainSourceIds: string[];
  independentSupportingOrigins: string[];
  independentContradictingOrigins: string[];
  explanation: string;
}
