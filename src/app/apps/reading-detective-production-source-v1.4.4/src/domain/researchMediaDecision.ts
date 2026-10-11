import type { CaseId } from "./types";

export type ClaimCertainty =
  | "confirmed"
  | "strongly-supported"
  | "plausible"
  | "uncertain"
  | "unsupported";

export type ResearchDesign =
  | "randomized-experiment"
  | "controlled-experiment"
  | "observational"
  | "survey"
  | "case-report"
  | "review"
  | "unknown";

export type RelationshipClaim =
  | "descriptive"
  | "association"
  | "causal"
  | "prediction";

export interface ResearchProfile {
  id: string;
  sourceId: string;
  design: ResearchDesign;
  sampleSize?: number;
  population?: string;
  comparisonGroup?: boolean;
  randomAssignment?: boolean;
  measuredOutcome: string;
  statedFinding: string;
  relationshipSupported: RelationshipClaim;
  limitations: string[];
}

export type MediaOverclaimRisk =
  | "headline-stronger-than-source"
  | "causation-from-correlation"
  | "sample-overgeneralization"
  | "relative-without-absolute"
  | "missing-context"
  | "cropped-context"
  | "single-source-amplification"
  | "unsupported-certainty";

export interface MediaClaimFrame {
  id: string;
  sourceId: string;
  claimText: string;
  certainty: ClaimCertainty;
  evidenceSourceIds: string[];
  risks: MediaOverclaimRisk[];
  preciseReading: string;
}

export interface QuantitativeFrame {
  id: string;
  sourceId: string;
  label: string;
  baseline: number;
  comparison: number;
  unit: string;
  reportedRelativeChangePercent?: number;
  note?: string;
}

export interface GraphFrame {
  id: string;
  sourceId: string;
  title: string;
  yAxisMinimum: number;
  yAxisMaximum: number;
  values: number[];
  labels: string[];
  interpretation: string;
  visualRisk?: "truncated-axis" | "uneven-scale" | "missing-baseline" | "none";
}

export interface DecisionCriterion {
  id: string;
  label: string;
  description?: string;
}

export interface DecisionOption {
  id: string;
  label: string;
  evidenceSourceIds: string[];
  criterionNotes: Record<string, string>;
}

export interface AcceptableDecision {
  optionId: string;
  requiredEvidenceSourceIds: string[];
  requiredCriterionIds: string[];
  requiredTradeoffAcknowledgements?: string[];
  rationale: string;
}

export interface DecisionModel {
  id: string;
  question: string;
  criteria: DecisionCriterion[];
  options: DecisionOption[];
  acceptableDecisions: AcceptableDecision[];
  allowInsufficientEvidence?: boolean;
}

export interface ResearchMediaDecisionConfig {
  research?: ResearchProfile[];
  mediaClaims?: MediaClaimFrame[];
  quantitativeFrames?: QuantitativeFrame[];
  graphFrames?: GraphFrame[];
  decisions?: DecisionModel[];
}

export interface ResearchAssessment {
  caseId: CaseId;
  profileId: string;
  sourceId: string;
  design: ResearchDesign;
  strongestSupportedRelationship: RelationshipClaim;
  canSupportCausalClaim: boolean;
  limitations: string[];
  explanation: string;
}

export interface MediaCalibrationAssessment {
  caseId: CaseId;
  frameId: string;
  claimText: string;
  certainty: ClaimCertainty;
  risks: MediaOverclaimRisk[];
  calibrated: boolean;
  preciseReading: string;
}

export interface QuantitativeAssessment {
  caseId: CaseId;
  frameId: string;
  absoluteChange: number;
  relativeChangePercent?: number;
  reportedRelativeChangePercent?: number;
  framingComplete: boolean;
  explanation: string;
}

export interface GraphAssessment {
  caseId: CaseId;
  graphId: string;
  visualRisk: GraphFrame["visualRisk"];
  dataRange: number;
  axisRange: number;
  exaggerationRatio?: number;
  explanation: string;
}

export interface DecisionEvaluationInput {
  optionId: string;
  evidenceSourceIds: string[];
  criterionIds: string[];
  tradeoffAcknowledgements?: string[];
}

export interface DecisionEvaluation {
  caseId: CaseId;
  decisionId: string;
  optionId: string;
  defensible: boolean;
  missingEvidenceSourceIds: string[];
  missingCriterionIds: string[];
  missingTradeoffs: string[];
  explanation: string;
}
