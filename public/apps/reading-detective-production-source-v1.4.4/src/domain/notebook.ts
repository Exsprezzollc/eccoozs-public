import type { CaseId, LearnerId, SkillId } from "./types";

export interface DetectiveNotebookEntry {
  id: string;
  learnerId: LearnerId;
  skillId: SkillId;
  title: string;
  summary: string;
  sourceCaseId?: CaseId;
  learnerNote?: string;
  unlockedAt: string;
  updatedAt: string;
}

export type CaseMapStatus = "available" | "in-progress" | "completed";

export interface CaseMapProgress {
  learnerId: LearnerId;
  caseId: CaseId;
  status: CaseMapStatus;
  lastVisitedAt: string;
  completedAt?: string;
}
