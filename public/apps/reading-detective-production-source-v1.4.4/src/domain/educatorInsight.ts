import type { MasteryLevel, PresentationStage, SkillId, SupportLevel } from "./types";
import type { SkillDomain } from "./skills";

export type EducatorSkillBand =
  | "strength"
  | "growing"
  | "new"
  | "review-needed";

export interface EducatorSkillInsight {
  skillId: SkillId;
  name: string;
  domain: SkillDomain;
  mastery: MasteryLevel;
  confidence: number;
  band: EducatorSkillBand;
  attempts: number;
  correct: number;
  independentAttempts: number;
  independentCorrect: number;
  independentAccuracy?: number;
  lastEvidenceAt?: string;
}

export interface EducatorMisconceptionInsight {
  misconceptionId: string;
  skillId: SkillId;
  label: string;
  description: string;
  incorrectEvidenceCount: number;
  diagnosticProbeConfirmed: boolean;
  lastObservedAt?: string;
}

export interface EducatorRepairInsight {
  skillId: SkillId;
  name: string;
  clueLabId: string;
  repairedAt: string;
  transferredAfterRepair: boolean;
}

export interface EducatorSupportSummary {
  totalPracticeAttempts: number;
  independentAttempts: number;
  independentCorrect: number;
  independentAccuracy?: number;
  supportCounts: Record<SupportLevel, number>;
  supportedAttemptRate?: number;
}

export interface EducatorModalityObservation {
  skillId: SkillId;
  name: string;
  printAttempts: number;
  printAccuracy?: number;
  audioAttempts: number;
  audioAccuracy?: number;
  observation: string;
}

export interface TeachingCoverageInsight {
  stage: PresentationStage;
  curriculumSkillCount: number;
  coveredSkillCount: number;
  coverageRate: number;
  uncoveredSkillIds: SkillId[];
  foundationSkillCount: number;
  foundationCoveredSkillCount: number;
  foundationCoverageRate: number;
}

export interface EducatorNextFocus {
  skillId: SkillId;
  name: string;
  rationale: string;
  suggestedSupport: string;
}

export interface EducatorInsightReport {
  learnerId: string;
  presentationStage: PresentationStage;
  generatedAt: string;
  strengths: EducatorSkillInsight[];
  growingTools: EducatorSkillInsight[];
  newTools: EducatorSkillInsight[];
  reviewNeeded: EducatorSkillInsight[];
  recentRepairs: EducatorRepairInsight[];
  confirmedMisconceptions: EducatorMisconceptionInsight[];
  support: EducatorSupportSummary;
  modalityObservations: EducatorModalityObservation[];
  nextFocus?: EducatorNextFocus;
  teachingCoverage: TeachingCoverageInsight;
  notes: string[];
}
