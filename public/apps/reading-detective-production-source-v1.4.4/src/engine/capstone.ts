import type {
  CapstoneProgression,
  CapstoneReadinessAssessment,
  EvidenceEvent,
  GraduationDefinition,
  GraduationEvaluation,
  LearnerProfile,
  MasteryLevel,
  MentorPresence,
  SkillId,
} from "../domain";

const masteryRank: Record<MasteryLevel, number> = {
  "not-introduced": 0,
  introduced: 1,
  guided: 2,
  developing: 3,
  "review-needed": 3,
  independent: 4,
  transferred: 5,
  secure: 6,
};

function masteryMeets(
  learner: LearnerProfile,
  skillId: SkillId,
  minimum: "independent" | "transferred" | "secure",
): boolean {
  const mastery = learner.skillStates[skillId]?.mastery ?? "not-introduced";
  return masteryRank[mastery] >= masteryRank[minimum] && mastery !== "review-needed";
}

export function assessCapstoneReadiness(args: {
  learner: LearnerProfile;
  progression: CapstoneProgression;
}): CapstoneReadinessAssessment {
  const { learner, progression } = args;
  const allSatisfied = new Set<SkillId>();

  const requirements = progression.requirements.map((requirement) => {
    const satisfiedSkillIds = requirement.skillIds.filter((skillId) =>
      masteryMeets(learner, skillId, requirement.minimumMastery),
    );
    satisfiedSkillIds.forEach((skillId) => allSatisfied.add(skillId));
    const missingSkillIds = requirement.skillIds.filter(
      (skillId) => !satisfiedSkillIds.includes(skillId),
    );
    return {
      id: requirement.id,
      label: requirement.label,
      domain: requirement.domain,
      satisfied: satisfiedSkillIds.length >= requirement.minimumSatisfied,
      satisfiedSkillIds,
      missingSkillIds,
      minimumSatisfied: requirement.minimumSatisfied,
      rationale: requirement.rationale,
    };
  });

  const requirementsReady = requirements.every((requirement) => requirement.satisfied);
  const overallReady = allSatisfied.size >= progression.minimumOverallSatisfiedSkills;
  const totalPossible = new Set(progression.requirements.flatMap((item) => item.skillIds)).size;
  const readinessRate = totalPossible === 0 ? 1 : allSatisfied.size / totalPossible;
  const firstGap = requirements.find((item) => !item.satisfied);

  return {
    progressionId: progression.id,
    capstoneCaseId: progression.capstoneCaseId,
    ready: requirementsReady && overallReady,
    overallSatisfiedSkills: allSatisfied.size,
    minimumOverallSatisfiedSkills: progression.minimumOverallSatisfiedSkills,
    readinessRate: Number(readinessRate.toFixed(2)),
    requirements,
    nextGapSkillId: firstGap?.missingSkillIds[0],
  };
}

export function mentorPresenceFor(args: {
  learner: LearnerProfile;
  readiness: CapstoneReadinessAssessment;
  inCapstone?: boolean;
}): MentorPresence {
  if (args.inCapstone) return "on-request";
  if (args.readiness.ready) return "on-request";
  if (args.readiness.readinessRate >= 0.7) return "available";
  return "full";
}

function isCorrect(event: EvidenceEvent): boolean {
  return event.outcome === "correct" || event.outcome === "self-corrected";
}

function isIndependent(event: EvidenceEvent): boolean {
  return event.support === "independent" && isCorrect(event);
}

export function evaluateGraduation(args: {
  definition: GraduationDefinition;
  events: EvidenceEvent[];
  caseCompleted: boolean;
  evaluatedAt?: string;
}): GraduationEvaluation {
  const caseEvents = args.events.filter((event) => event.caseId === args.definition.caseId);
  const supportedCorrectAttempts = caseEvents.filter(
    (event) => isCorrect(event) && event.support !== "independent",
  ).length;

  const competencies = args.definition.competencies.map((competency) => {
    const relevant = caseEvents.filter((event) => competency.stepIds.includes(event.itemId));
    const independentlyCorrectSteps = new Set(
      relevant.filter(isIndependent).map((event) => event.itemId),
    );
    const attemptedStepIds = Array.from(new Set(relevant.map((event) => event.itemId)));
    const missingStepIds = competency.stepIds.filter(
      (stepId) => !independentlyCorrectSteps.has(stepId),
    );
    return {
      id: competency.id,
      label: competency.label,
      domain: competency.domain,
      passed: independentlyCorrectSteps.size >= competency.minimumIndependentCorrect,
      independentCorrect: independentlyCorrectSteps.size,
      requiredIndependentCorrect: competency.minimumIndependentCorrect,
      attemptedStepIds,
      missingStepIds,
      description: competency.description,
    };
  });

  const passedCompetencies = competencies.filter((item) => item.passed).length;
  const allCompetenciesPass = passedCompetencies === competencies.length;
  const supportWithinLimit = supportedCorrectAttempts <= args.definition.maximumSupportedCorrectAttempts;

  let status: GraduationEvaluation["status"];
  let explanation: string;
  if (args.definition.requireCaseCompletion && !args.caseCompleted) {
    status = "in-progress";
    explanation = "The final investigation is still in progress.";
  } else if (allCompetenciesPass && supportWithinLimit) {
    status = "graduated";
    explanation = "The learner independently synthesized evidence across every required capstone competency. The detective can step back.";
  } else {
    status = "needs-more-independent-evidence";
    explanation = allCompetenciesPass
      ? "The reasoning was accurate, but the graduation standard requires more of the final case to be completed independently. Support remains available; the capstone can be revisited without penalty."
      : "The final case revealed one or more competencies that need additional independent evidence. Reading Detective should repair or review those exact tools rather than restarting the curriculum.";
  }

  return {
    definitionId: args.definition.id,
    caseId: args.definition.caseId,
    status,
    passedCompetencies,
    totalCompetencies: competencies.length,
    supportedCorrectAttempts,
    competencies,
    explanation,
    evaluatedAt: args.evaluatedAt ?? new Date().toISOString(),
  };
}
