import type { CaseId, LearnerId, SkillId } from "./types";

export type ReviewReason = "retention-check" | "repair-follow-up";
export type ReviewStatus = "scheduled" | "completed" | "dismissed";

export interface ScheduledReview {
  id: string;
  learnerId: LearnerId;
  skillId: SkillId;
  sourceCaseId?: CaseId;
  reason: ReviewReason;
  dueAt: string;
  status: ReviewStatus;
  createdAt: string;
  completedAt?: string;
}
