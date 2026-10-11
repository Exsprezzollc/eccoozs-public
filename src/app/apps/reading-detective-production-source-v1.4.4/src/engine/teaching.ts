import type {
  LearnerProfile,
  MasteryLevel,
  TeachingModule,
  TeachingPhase,
  TeachingPracticeItem,
  TeachingSession,
} from "../domain";
import { teachingEntryPhaseForMastery } from "../domain";

const phaseOrder: TeachingPhase[] = [
  "discover",
  "explain",
  "model",
  "together",
  "supported",
  "independent",
  "transfer",
  "complete",
];

export function createTeachingSession(args: {
  learner: LearnerProfile;
  module: TeachingModule;
  mastery?: MasteryLevel;
  now?: string;
  id?: string;
  returnTo?: { caseId: string; stepIndex: number };
}): TeachingSession {
  if (!args.module.stages.includes(args.learner.presentationStage)) {
    throw new Error(
      `Teaching module ${args.module.id} does not support ${args.learner.presentationStage}.`,
    );
  }
  if (!args.module.variants[args.learner.presentationStage]) {
    throw new Error(
      `Teaching module ${args.module.id} is missing its ${args.learner.presentationStage} presentation variant.`,
    );
  }

  const now = args.now ?? new Date().toISOString();
  const mastery =
    args.mastery ??
    args.learner.skillStates[args.module.skillId]?.mastery ??
    "not-introduced";
  const phase = teachingEntryPhaseForMastery(mastery);

  return {
    id: args.id ?? crypto.randomUUID(),
    learnerId: args.learner.id,
    moduleId: args.module.id,
    skillId: args.module.skillId,
    presentationStage: args.learner.presentationStage,
    returnTo: args.returnTo,
    phase,
    completedPhases: [],
    attempts: {},
    startedAt: now,
    updatedAt: now,
    completedAt: phase === "complete" ? now : undefined,
  };
}

export function nextTeachingPhase(phase: TeachingPhase): TeachingPhase {
  const index = phaseOrder.indexOf(phase);
  if (index < 0 || index >= phaseOrder.length - 1) return "complete";
  return phaseOrder[index + 1];
}

export function teachingPracticeItem(
  session: TeachingSession,
  module: TeachingModule,
): TeachingPracticeItem | undefined {
  const variant = module.variants[session.presentationStage];
  if (!variant) return undefined;
  if (session.phase === "together") return variant.together;
  if (session.phase === "supported") return variant.supported;
  if (session.phase === "independent") return variant.independent;
  if (session.phase === "transfer") return variant.transfer;
  return undefined;
}

export function advanceTeachingSession(
  session: TeachingSession,
  now = new Date().toISOString(),
): TeachingSession {
  if (session.phase === "complete") return session;
  const next = nextTeachingPhase(session.phase);
  return {
    ...session,
    completedPhases: session.completedPhases.includes(session.phase)
      ? session.completedPhases
      : [...session.completedPhases, session.phase],
    phase: next,
    updatedAt: now,
    completedAt: next === "complete" ? now : session.completedAt,
  };
}

export function answerTeachingPractice(args: {
  session: TeachingSession;
  module: TeachingModule;
  answerId?: string;
  correctness?: boolean;
  now?: string;
}): { session: TeachingSession; correct: boolean; item: TeachingPracticeItem } {
  const item = teachingPracticeItem(args.session, args.module);
  if (!item) {
    throw new Error(`Teaching phase ${args.session.phase} is not interactive.`);
  }

  const correct = args.correctness ?? (args.answerId ? item.correctAnswerIds.includes(args.answerId) : false);
  const phase = args.session.phase as "together" | "supported" | "independent" | "transfer";
  const previous = args.session.attempts[phase];
  const now = args.now ?? new Date().toISOString();
  const attempts = (previous?.attempts ?? 0) + 1;

  let next = {
    ...args.session,
    attempts: {
      ...args.session.attempts,
      [phase]: {
        phase,
        itemId: item.id,
        attempts,
        correct,
      },
    },
    updatedAt: now,
  } satisfies TeachingSession;

  if (correct) {
    next = advanceTeachingSession(next, now);
  }

  return { session: next, correct, item };
}

export function validateTeachingModule(module: TeachingModule): string[] {
  const errors: string[] = [];
  if (!module.id.trim()) errors.push("Teaching module id is required.");
  if (!module.skillId.trim()) errors.push(`${module.id}: skillId is required.`);
  if (module.stages.length === 0) errors.push(`${module.id}: at least one stage is required.`);

  for (const stage of module.stages) {
    const variant = module.variants[stage];
    if (!variant) {
      errors.push(`${module.id}: missing ${stage} variant.`);
      continue;
    }
    const practice = [variant.together, variant.supported, variant.independent, variant.transfer];
    for (const item of practice) {
      const interaction = item.interaction ?? "choice";
      if (interaction === "choice") {
        if (!item.choices.length) errors.push(`${module.id}/${item.id}: choices are required.`);
        if (!item.correctAnswerIds.length) errors.push(`${module.id}/${item.id}: correct answer is required.`);
        for (const answerId of item.correctAnswerIds) {
          if (!item.choices.some((choice) => choice.id === answerId)) {
            errors.push(`${module.id}/${item.id}: correct answer ${answerId} is not a choice.`);
          }
        }
      } else if (interaction === "match") {
        if (!item.matchPairs || item.matchPairs.length < 2) {
          errors.push(`${module.id}/${item.id}: matching requires at least two pairs.`);
        }
      } else if (interaction === "sequence") {
        if (!item.sequenceTokens || item.sequenceTokens.length < 2) {
          errors.push(`${module.id}/${item.id}: sequencing requires at least two tokens.`);
        }
      } else if (interaction === "build") {
        const target = item.buildTarget;
        if (!target || !target.word || !Array.isArray(target.graphemes) || target.graphemes.length < 2) {
          errors.push(`${module.id}/${item.id}: word-building requires a target word and at least two graphemes.`);
        } else if (target.graphemes.join("").toLowerCase() !== target.word.toLowerCase()) {
          errors.push(`${module.id}/${item.id}: build graphemes must spell the target word.`);
        }
      } else if (interaction === "spell") {
        if (!item.spellTarget || !item.spellTarget.word) {
          errors.push(`${module.id}/${item.id}: spelling requires a target word.`);
        }
      }
    }
  }

  return errors;
}

export { evidenceContextForTeachingPhase } from "../domain";
