import type {
  CapstoneProgression,
  CaseMapProgress,
  ContentVariationTemplate,
  LearnerProfile,
  NextLearningActivity,
  ReadingCase,
  ScheduledReview,
  SkillGraph,
  TeachingModule,
} from "../domain";
import { findUnmetPrerequisite } from "./routing";
import { assessCapstoneReadiness } from "./capstone";

const masteryWeight: Record<string, number> = {
  "not-introduced": 6,
  introduced: 5,
  guided: 4.5,
  developing: 4,
  "review-needed": 5.5,
  independent: 2,
  transferred: 1,
  secure: -8,
};

function compatibleReviewTemplate(
  review: ScheduledReview,
  learner: LearnerProfile,
  templates: Record<string, ContentVariationTemplate>,
): ContentVariationTemplate | undefined {
  return Object.values(templates).find(
    (template) =>
      template.skillId === review.skillId &&
      template.scenarios.some((scenario) =>
        scenario.stages.includes(learner.presentationStage),
      ),
  );
}

function dueReviews(reviews: ScheduledReview[], now: Date): ScheduledReview[] {
  return reviews
    .filter(
      (review) =>
        review.status === "scheduled" &&
        new Date(review.dueAt).getTime() <= now.getTime(),
    )
    .sort((a, b) => {
      const reasonPriority =
        Number(b.reason === "repair-follow-up") -
        Number(a.reason === "repair-follow-up");
      if (reasonPriority !== 0) return reasonPriority;
      return a.dueAt.localeCompare(b.dueAt);
    });
}

function masteryForCase(readingCase: ReadingCase, learner: LearnerProfile) {
  return readingCase.targetSkills.map(
    (skillId) => learner.skillStates[skillId]?.mastery ?? "not-introduced",
  );
}

function allStable(levels: string[]) {
  return levels.every((level) => level === "secure");
}

function allHigh(levels: string[]) {
  return levels.every((level) =>
    ["independent", "transferred", "secure"].includes(level),
  );
}

function caseScore(readingCase: ReadingCase, learner: LearnerProfile): number {
  const placementSkill = learner.placement?.recommendedSkillId;
  const levels = masteryForCase(readingCase, learner);
  const skillScore = readingCase.targetSkills.reduce((score, skillId) => {
    const mastery = learner.skillStates[skillId]?.mastery ?? "not-introduced";
    return score + (masteryWeight[mastery] ?? 0);
  }, 0);
  const placementBonus =
    placementSkill && readingCase.targetSkills.includes(placementSkill) ? 12 : 0;
  const noveltyBonus = levels.some((level) => level === "not-introduced") ? 2 : 0;
  return skillScore + placementBonus + noveltyBonus;
}

export function routeNextLearningActivity(args: {
  learner: LearnerProfile;
  cases: Record<string, ReadingCase>;
  caseMap: CaseMapProgress[];
  reviews: ScheduledReview[];
  variationTemplates: Record<string, ContentVariationTemplate>;
  skillGraph: SkillGraph;
  now?: Date;
  activeCaseId?: string;
  activeCaseStatus?: "active" | "probing" | "repairing" | "complete";
  teachingModulesBySkill?: Record<string, TeachingModule>;
  capstoneProgression?: CapstoneProgression;
}): NextLearningActivity {
  const now = args.now ?? new Date();

  if (
    args.activeCaseId &&
    args.activeCaseStatus &&
    args.activeCaseStatus !== "complete"
  ) {
    const readingCase = args.cases[args.activeCaseId];
    if (readingCase?.presentationStages.includes(args.learner.presentationStage)) {
      return {
        kind: "resume-case",
        caseId: readingCase.id,
        reason: "active-case",
      };
    }
  }

  for (const review of dueReviews(args.reviews, now)) {
    const template = compatibleReviewTemplate(
      review,
      args.learner,
      args.variationTemplates,
    );
    if (template) {
      return {
        kind: "review-insertion",
        review,
        variationTemplateId: template.id,
        reason: review.reason,
      };
    }
  }

  const stageCases = Object.values(args.cases).filter((readingCase) =>
    readingCase.presentationStages.includes(args.learner.presentationStage),
  );
  const ordinaryStageCases = stageCases.filter((readingCase) => !readingCase.capstone);

  if (args.capstoneProgression && args.learner.presentationStage === "lead-investigator") {
    const readiness = assessCapstoneReadiness({
      learner: args.learner,
      progression: args.capstoneProgression,
    });
    const capstoneCase = args.cases[args.capstoneProgression.capstoneCaseId];
    if (readiness.ready && capstoneCase) {
      const graduated = args.learner.graduation?.status === "graduated";
      if (!graduated) {
        return {
          kind: "capstone",
          caseId: capstoneCase.id,
          reason: args.learner.graduation?.status === "needs-more-independent-evidence"
            ? "capstone-retry"
            : "capstone-ready",
        };
      }
    }
  }

  const candidates = ordinaryStageCases
    .filter((readingCase) => {
      const progress = args.caseMap.find((item) => item.caseId === readingCase.id);
      const levels = masteryForCase(readingCase, args.learner);
      if (progress?.status === "completed" && allStable(levels)) return false;
      return !allStable(levels);
    })
    .sort((a, b) => caseScore(b, args.learner) - caseScore(a, args.learner));

  const nextCase = candidates[0];
  if (!nextCase) {
    return {
      kind: "complete",
      reason: ordinaryStageCases.length > 0
        ? "all-current-content-stable"
        : "no-compatible-content",
    };
  }

  const requestedSkill =
    args.learner.placement?.recommendedSkillId ?? nextCase.targetSkills[0];
  const targetSkill = nextCase.targetSkills.includes(requestedSkill)
    ? requestedSkill
    : nextCase.targetSkills[0];
  const unmet = findUnmetPrerequisite(targetSkill, args.learner, args.skillGraph);
  if (unmet) {
    const teaching = args.teachingModulesBySkill?.[unmet];
    if (
      teaching?.stages.includes(args.learner.presentationStage) &&
      teaching.variants[args.learner.presentationStage]
    ) {
      return {
        kind: "teaching",
        skillId: unmet,
        moduleId: teaching.id,
        caseId: nextCase.id,
        reason: "prerequisite-gap",
      };
    }
    const repairCase = ordinaryStageCases
      .filter((candidate) => candidate.targetSkills.includes(unmet))
      .sort((a, b) => caseScore(b, args.learner) - caseScore(a, args.learner))[0];
    return {
      kind: "skill-repair",
      skillId: unmet,
      caseId: repairCase?.id,
      reason: "prerequisite-gap",
    };
  }

  const targetMastery = args.learner.skillStates[targetSkill]?.mastery ?? "not-introduced";
  const teaching = args.teachingModulesBySkill?.[targetSkill];
  if (
    teaching?.stages.includes(args.learner.presentationStage) &&
    teaching.variants[args.learner.presentationStage] &&
    ["not-introduced", "introduced", "guided", "developing", "review-needed"].includes(targetMastery)
  ) {
    return {
      kind: "teaching",
      skillId: targetSkill,
      moduleId: teaching.id,
      caseId: nextCase.id,
      reason: targetMastery === "not-introduced" || targetMastery === "introduced"
        ? "new-skill"
        : "skill-strengthening",
    };
  }

  const levels = masteryForCase(nextCase, args.learner);
  const progress = args.caseMap.find((item) => item.caseId === nextCase.id);
  const placementMatch =
    args.learner.placement?.recommendedSkillId &&
    nextCase.targetSkills.includes(args.learner.placement.recommendedSkillId);

  return {
    kind: "case",
    caseId: nextCase.id,
    mode: allHigh(levels) ? "sample" : "full",
    reason: placementMatch
      ? "placement-recommendation"
      : progress?.status === "completed"
        ? "transfer-sample"
        : "skill-growth",
  };
}
