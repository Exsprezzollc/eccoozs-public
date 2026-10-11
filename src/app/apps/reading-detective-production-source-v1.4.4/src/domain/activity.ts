import type { CaseId, SkillId } from "./types";
import type { ScheduledReview } from "./review";

export type CaseRouteMode = "full" | "sample";

export type NextLearningActivity =
  | {
      kind: "teaching";
      skillId: SkillId;
      moduleId: string;
      caseId?: CaseId;
      reason: "new-skill" | "skill-strengthening" | "prerequisite-gap";
    }
  | {
      kind: "resume-case";
      caseId: CaseId;
      reason: "active-case";
    }
  | {
      kind: "review-insertion";
      review: ScheduledReview;
      variationTemplateId: string;
      reason: "repair-follow-up" | "retention-check";
    }
  | {
      kind: "case";
      caseId: CaseId;
      mode: CaseRouteMode;
      reason: "placement-recommendation" | "skill-growth" | "transfer-sample";
    }
  | {
      kind: "capstone";
      caseId: CaseId;
      reason: "capstone-ready" | "capstone-retry";
    }
  | {
      kind: "skill-repair";
      skillId: SkillId;
      caseId?: CaseId;
      reason: "prerequisite-gap";
    }
  | {
      kind: "complete";
      reason: "all-current-content-stable" | "no-compatible-content";
    };
