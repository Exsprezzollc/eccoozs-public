import type { CaseId, MasteryLevel, SkillId } from "./types";

export type CapstoneCompetencyDomain =
  | "meaning"
  | "evidence"
  | "source"
  | "document"
  | "research-media-data"
  | "argument"
  | "decision"
  | "applied-reading";

export type MentorPresence = "full" | "available" | "on-request" | "silent";

export interface CapstoneReadinessRequirement {
  id: string;
  label: string;
  domain: CapstoneCompetencyDomain;
  skillIds: SkillId[];
  minimumMastery: Extract<MasteryLevel, "independent" | "transferred" | "secure">;
  minimumSatisfied: number;
  rationale: string;
}

export interface CapstoneProgression {
  id: string;
  capstoneCaseId: CaseId;
  requirements: CapstoneReadinessRequirement[];
  minimumOverallSatisfiedSkills: number;
  learnerMessageWhenReady: string;
  learnerMessageWhenNotReady: string;
}

export interface ReadinessRequirementResult {
  id: string;
  label: string;
  domain: CapstoneCompetencyDomain;
  satisfied: boolean;
  satisfiedSkillIds: SkillId[];
  missingSkillIds: SkillId[];
  minimumSatisfied: number;
  rationale: string;
}

export interface CapstoneReadinessAssessment {
  progressionId: string;
  capstoneCaseId: CaseId;
  ready: boolean;
  overallSatisfiedSkills: number;
  minimumOverallSatisfiedSkills: number;
  readinessRate: number;
  requirements: ReadinessRequirementResult[];
  nextGapSkillId?: SkillId;
}

export interface GraduationCompetency {
  id: string;
  label: string;
  domain: CapstoneCompetencyDomain;
  stepIds: string[];
  minimumIndependentCorrect: number;
  description: string;
}

export interface GraduationDefinition {
  id: string;
  caseId: CaseId;
  competencies: GraduationCompetency[];
  maximumSupportedCorrectAttempts: number;
  requireCaseCompletion: boolean;
}

export interface GraduationCompetencyResult {
  id: string;
  label: string;
  domain: CapstoneCompetencyDomain;
  passed: boolean;
  independentCorrect: number;
  requiredIndependentCorrect: number;
  attemptedStepIds: string[];
  missingStepIds: string[];
  description: string;
}

export type GraduationStatus =
  | "not-ready"
  | "in-progress"
  | "needs-more-independent-evidence"
  | "graduated";

export interface GraduationEvaluation {
  definitionId: string;
  caseId: CaseId;
  status: GraduationStatus;
  passedCompetencies: number;
  totalCompetencies: number;
  supportedCorrectAttempts: number;
  competencies: GraduationCompetencyResult[];
  explanation: string;
  evaluatedAt: string;
}

export interface GraduationRecord {
  status: GraduationStatus;
  caseId: CaseId;
  evaluatedAt: string;
  passedCompetencies: number;
  totalCompetencies: number;
}
