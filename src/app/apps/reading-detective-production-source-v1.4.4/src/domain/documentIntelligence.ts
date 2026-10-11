import type { CaseId } from "./types";

export type DocumentRuleKind =
  | "definition"
  | "obligation"
  | "permission"
  | "prohibition"
  | "condition"
  | "exception"
  | "deadline"
  | "renewal"
  | "termination"
  | "waiver"
  | "liability"
  | "dispute-path"
  | "governing-law";

export type DocumentConclusionStrength =
  | "directly-stated"
  | "conditional"
  | "insufficient";

export interface DocumentSection {
  id: string;
  sourceId: string;
  heading: string;
  order: number;
  searchTerms: string[];
}

export interface DocumentRule {
  id: string;
  sourceId: string;
  kind: DocumentRuleKind;
  clauseText: string;
  party?: string;
  action?: string;
  condition?: string;
  deadline?: string;
  consequence?: string;
  term?: string;
  definition?: string;
  plainLanguage: string;
  /** Reading Detective teaches meaning, not enforceability. */
  professionalReviewRecommended?: boolean;
}

export interface DocumentQuestionLens {
  id: string;
  question: string;
  ruleIds: string[];
  conclusionStrength: DocumentConclusionStrength;
  plainLanguageConclusion: string;
  professionalReviewRecommended?: boolean;
}

export interface DocumentIntelligenceConfig {
  sections: DocumentSection[];
  rules: DocumentRule[];
  questions: DocumentQuestionLens[];
}

export interface DerivedDocumentRule extends DocumentRule {
  sourceTitle: string;
  sectionHeading?: string;
}

export interface DerivedDocumentQuestionLens {
  caseId: CaseId;
  lensId: string;
  question: string;
  conclusionStrength: DocumentConclusionStrength;
  plainLanguageConclusion: string;
  professionalReviewRecommended: boolean;
  rules: DerivedDocumentRule[];
}

export interface DocumentSearchResult {
  sourceId: string;
  sourceTitle: string;
  sectionId?: string;
  sectionHeading?: string;
  score: number;
  matchedTerms: string[];
}
