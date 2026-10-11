export type EvidenceBoardCategoryId =
  | "confirmed"
  | "possible"
  | "unsupported"
  | "need-more-information"
  | "claim"
  | "evidence"
  | "contradiction"
  | "condition"
  | "exception"
  | "unknown"
  | string;

export interface EvidenceBoardCategory {
  id: EvidenceBoardCategoryId;
  label: string;
  description?: string;
}

export interface EvidenceBoardCard {
  id: string;
  label: string;
  sourceId?: string;
  quote?: string;
}

export interface EvidenceBoardSortConfig {
  mode: "sort";
  categories: EvidenceBoardCategory[];
  cards: EvidenceBoardCard[];
  correctPlacements: Record<string, EvidenceBoardCategoryId>;
}

export interface EvidenceZoomTarget {
  sourceId: string;
  sentence: string;
  phrase: string;
}

export interface EvidenceBoardZoomConfig {
  mode: "zoom";
  target: EvidenceZoomTarget;
  phraseOptions: string[];
}

export interface EvidenceBoardCompareConfig {
  mode: "compare";
  categories: EvidenceBoardCategory[];
  cards: EvidenceBoardCard[];
  correctPlacements: Record<string, EvidenceBoardCategoryId>;
  minimumSources?: number;
}

export type EvidenceBoardConfig =
  | EvidenceBoardSortConfig
  | EvidenceBoardZoomConfig
  | EvidenceBoardCompareConfig;

export interface EvidenceZoomSelection {
  sourceId?: string;
  sentence?: string;
  phrase?: string;
}

export interface EvidenceBoardState {
  stepId: string;
  placements: Record<string, EvidenceBoardCategoryId>;
  zoom: EvidenceZoomSelection;
  updatedAt: string;
}

export interface EvidenceBoardGrade {
  correct: boolean;
  totalTargets: number;
  correctTargets: number;
  missingCardIds: string[];
  incorrectCardIds: string[];
  zoomMatches?: {
    source: boolean;
    sentence: boolean;
    phrase: boolean;
  };
}
