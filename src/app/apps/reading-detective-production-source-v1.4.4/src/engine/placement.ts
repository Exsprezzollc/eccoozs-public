import type {
  EvidenceEvent,
  LearnerProfile,
  PlacementPlan,
  PlacementProbe,
  PlacementResponse,
  PlacementSession,
  PlacementSummary,
  ReadingDevelopment,
  SkillId,
} from "../domain";

export function createPlacementSession(args: {
  learner: Pick<LearnerProfile, "id" | "presentationStage">;
  plan: PlacementPlan;
  id?: string;
  now?: string;
}): PlacementSession {
  if (args.plan.presentationStage !== args.learner.presentationStage) {
    throw new Error(
      "RD-016 violated: placement plan presentation stage does not match learner presentation.",
    );
  }
  if (!args.plan.probes[args.plan.startProbeId]) {
    throw new Error(`Placement plan ${args.plan.id} has an unknown start probe.`);
  }
  const now = args.now ?? new Date().toISOString();
  return {
    id: args.id ?? crypto.randomUUID(),
    learnerId: args.learner.id,
    planId: args.plan.id,
    presentationStage: args.learner.presentationStage,
    status: "active",
    currentProbeId: args.plan.startProbeId,
    responses: [],
    printAccessGapSkillIds: [],
    startedAt: now,
    updatedAt: now,
  };
}

export function currentPlacementProbe(
  session: PlacementSession,
  plan: PlacementPlan,
): PlacementProbe | undefined {
  if (!session.currentProbeId) return undefined;
  return plan.probes[session.currentProbeId];
}

export function answerPlacementProbe(args: {
  session: PlacementSession;
  plan: PlacementPlan;
  answerId: string;
  now?: string;
}): { session: PlacementSession; response: PlacementResponse } {
  const { session, plan, answerId } = args;
  if (session.status !== "active") {
    throw new Error("Cannot answer a completed placement session.");
  }
  if (session.planId !== plan.id) {
    throw new Error("Placement session and plan do not match.");
  }
  const probe = currentPlacementProbe(session, plan);
  if (!probe) throw new Error("Placement session has no current probe.");
  if (!probe.choices.some((choice) => choice.id === answerId)) {
    throw new Error(`Unknown placement answer: ${answerId}`);
  }

  const now = args.now ?? new Date().toISOString();
  const correct = probe.correctAnswerIds.includes(answerId);
  const transition = correct ? probe.correct : probe.incorrect;
  const response: PlacementResponse = {
    probeId: probe.id,
    skillId: probe.skillId,
    modality: probe.modality,
    answerId,
    correct,
    answeredAt: now,
  };

  const printAccessGapSkillIds = transition.markPrintAccessGapSkillId
    ? Array.from(
        new Set([
          ...session.printAccessGapSkillIds,
          transition.markPrintAccessGapSkillId,
        ]),
      )
    : session.printAccessGapSkillIds;

  const responseCount = session.responses.length + 1;
  const forcedStop = responseCount >= plan.maxResponses;
  const recommendedSkillId =
    transition.recommendationSkillId ?? (forcedStop ? probe.skillId : undefined);
  const nextProbeId = forcedStop ? undefined : transition.nextProbeId;
  const complete = Boolean(recommendedSkillId) || !nextProbeId;

  if (!complete && nextProbeId && !plan.probes[nextProbeId]) {
    throw new Error(
      `Placement plan ${plan.id} routes ${probe.id} to unknown probe ${nextProbeId}.`,
    );
  }

  return {
    response,
    session: {
      ...session,
      status: complete ? "complete" : "active",
      currentProbeId: complete ? undefined : nextProbeId,
      responses: [...session.responses, response],
      printAccessGapSkillIds,
      recommendedSkillId: complete
        ? recommendedSkillId ?? probe.skillId
        : session.recommendedSkillId,
      updatedAt: now,
      completedAt: complete ? now : undefined,
    },
  };
}

export function placementEvidenceEvent(args: {
  learnerId: string;
  plan: PlacementPlan;
  response: PlacementResponse;
}): EvidenceEvent {
  return {
    id: crypto.randomUUID(),
    learnerId: args.learnerId,
    skillId: args.response.skillId,
    caseId: `PLACEMENT:${args.plan.id}`,
    itemId: args.response.probeId,
    outcome: args.response.correct ? "correct" : "incorrect",
    support: "independent",
    context: "placement",
    modality: args.response.modality,
    timestamp: args.response.answeredAt,
    metadata: { placementPlanId: args.plan.id },
  };
}

export function placementSummary(session: PlacementSession): PlacementSummary {
  if (session.status !== "complete" || !session.completedAt || !session.recommendedSkillId) {
    throw new Error("Placement summary requires a completed session.");
  }
  return {
    planId: session.planId,
    completedAt: session.completedAt,
    recommendedSkillId: session.recommendedSkillId,
    printAccessGapSkillIds: [...session.printAccessGapSkillIds],
    responseCount: session.responses.length,
  };
}

export function readingDevelopmentForSkill(skillId: SkillId): ReadingDevelopment {
  if (skillId.startsWith("PRINT.") || skillId.startsWith("PHON.")) return "foundation";
  if (skillId.startsWith("CODE.")) return "decoder";
  if (skillId.startsWith("VOCAB.")) return "word-reader";
  if (skillId.startsWith("SENT.")) return "fluent-reader";
  if (skillId.startsWith("COMP.")) return "comprehender";
  if (skillId.startsWith("EVID.")) return "evidence-reader";
  return "analytical-reader";
}
