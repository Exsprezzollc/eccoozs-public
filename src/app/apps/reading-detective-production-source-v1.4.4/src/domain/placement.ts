import type {
  EvidenceModality,
  LearnerId,
  PresentationStage,
  SkillId,
} from "./types";

export interface PlacementChoice {
  id: string;
  label: string;
}

export interface PlacementTransition {
  nextProbeId?: string;
  recommendationSkillId?: SkillId;
  markPrintAccessGapSkillId?: SkillId;
}

export interface PlacementProbe {
  id: string;
  skillId: SkillId;
  modality: EvidenceModality;
  prompt: string;
  sourceTitle?: string;
  sourceBody?: string;
  audioText?: string;
  choices: PlacementChoice[];
  correctAnswerIds: string[];
  correct: PlacementTransition;
  incorrect: PlacementTransition;
}

export interface PlacementPlan {
  id: string;
  presentationStage: PresentationStage;
  caseTitle: string;
  briefing: string;
  startProbeId: string;
  probes: Record<string, PlacementProbe>;
  maxResponses: number;
}

export interface PlacementResponse {
  probeId: string;
  skillId: SkillId;
  modality: EvidenceModality;
  answerId: string;
  correct: boolean;
  answeredAt: string;
}

export type PlacementStatus = "active" | "complete";

export interface PlacementSession {
  id: string;
  learnerId: LearnerId;
  planId: string;
  presentationStage: PresentationStage;
  status: PlacementStatus;
  currentProbeId?: string;
  responses: PlacementResponse[];
  printAccessGapSkillIds: SkillId[];
  recommendedSkillId?: SkillId;
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface PlacementSummary {
  planId: string;
  completedAt: string;
  recommendedSkillId: SkillId;
  printAccessGapSkillIds: SkillId[];
  responseCount: number;
}
