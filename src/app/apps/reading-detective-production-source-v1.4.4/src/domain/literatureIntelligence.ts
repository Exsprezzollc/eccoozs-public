import type { CaseId } from "./types";

export type NarrativePerspective =
  | "first-person-limited"
  | "third-person-limited"
  | "third-person-omniscient"
  | "objective"
  | "mixed";

export type LiteraryInferenceStrength =
  | "explicit"
  | "strongly-supported"
  | "plausible"
  | "unsupported";

export type NarratorCaution =
  | "none"
  | "limited-knowledge"
  | "contradicted-account"
  | "self-interested-account";

export interface MotiveClaim {
  id: string;
  character: string;
  claim: string;
  evidenceSourceIds: string[];
  strength: LiteraryInferenceStrength;
  alternatePlausibleClaims?: string[];
}

export interface ThemeModel {
  id: string;
  topic: string;
  themeStatement: string;
  evidenceSourceIds: string[];
  minimumEvidenceCount: number;
}

export interface NarratorProfile {
  id: string;
  narrator: string;
  perspective: NarrativePerspective;
  knowledgeBoundary: string;
  caution: NarratorCaution;
  contradictionSourceIds?: string[];
  explanation: string;
}

export interface ToneFrame {
  id: string;
  sourceId: string;
  tone: string;
  evidencePhrases: string[];
  neutralRestatement: string;
}

export interface SymbolicInterpretation {
  id: string;
  symbolOrPattern: string;
  interpretation: string;
  evidenceSourceIds: string[];
  allowAlternates?: boolean;
}

export interface LiteratureIntelligenceConfig {
  motives?: MotiveClaim[];
  themes?: ThemeModel[];
  narrators?: NarratorProfile[];
  tones?: ToneFrame[];
  symbolism?: SymbolicInterpretation[];
}

export interface MotiveAssessment {
  caseId: CaseId;
  motiveId: string;
  character: string;
  claim: string;
  strength: LiteraryInferenceStrength;
  evidenceSourceIds: string[];
  explanation: string;
}

export interface ThemeEvaluationInput {
  evidenceSourceIds: string[];
}

export interface ThemeEvaluation {
  caseId: CaseId;
  themeId: string;
  supported: boolean;
  missingEvidenceSourceIds: string[];
  explanation: string;
}

export interface NarratorAssessment {
  caseId: CaseId;
  narratorId: string;
  perspective: NarrativePerspective;
  caution: NarratorCaution;
  contradictionSourceIds: string[];
  explanation: string;
}
