import type { ScheduledReview } from "../domain";

export function scheduleDelayedReview(args: {
  learnerId: string;
  skillId: string;
  sourceCaseId?: string;
  now?: Date;
  delayDays?: number;
  reason?: ScheduledReview["reason"];
}): ScheduledReview {
  const now = args.now ?? new Date();
  const due = new Date(now);
  due.setUTCDate(due.getUTCDate() + (args.delayDays ?? 7));

  return {
    id: crypto.randomUUID(),
    learnerId: args.learnerId,
    skillId: args.skillId,
    sourceCaseId: args.sourceCaseId,
    reason: args.reason ?? "retention-check",
    dueAt: due.toISOString(),
    status: "scheduled",
    createdAt: now.toISOString(),
  };
}

export function scheduleReviewIfNeeded(args: {
  existing: ScheduledReview[];
  learnerId: string;
  skillId: string;
  sourceCaseId?: string;
  now?: Date;
  delayDays?: number;
  reason?: ScheduledReview["reason"];
}): { review: ScheduledReview; created: boolean } {
  const reason = args.reason ?? "retention-check";
  const duplicate = args.existing.find(
    (review) =>
      review.learnerId === args.learnerId &&
      review.skillId === args.skillId &&
      review.sourceCaseId === args.sourceCaseId &&
      review.reason === reason &&
      review.status === "scheduled",
  );
  if (duplicate) {
    return { review: structuredClone(duplicate), created: false };
  }
  return {
    review: scheduleDelayedReview({ ...args, reason }),
    created: true,
  };
}

export function listDueReviews(
  reviews: ScheduledReview[],
  now = new Date(),
): ScheduledReview[] {
  return reviews
    .filter(
      (review) =>
        review.status === "scheduled" &&
        new Date(review.dueAt).getTime() <= now.getTime(),
    )
    .sort((a, b) => {
      const repairPriority =
        Number(b.reason === "repair-follow-up") -
        Number(a.reason === "repair-follow-up");
      if (repairPriority !== 0) return repairPriority;
      return a.dueAt.localeCompare(b.dueAt);
    })
    .map((review) => structuredClone(review));
}

export function completeScheduledReview(
  review: ScheduledReview,
  now = new Date(),
): ScheduledReview {
  return {
    ...structuredClone(review),
    status: "completed",
    completedAt: now.toISOString(),
  };
}

export function dismissScheduledReview(
  review: ScheduledReview,
): ScheduledReview {
  return {
    ...structuredClone(review),
    status: "dismissed",
  };
}
