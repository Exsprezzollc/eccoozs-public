import type {
  ActiveRepairState,
  CaseSessionState,
  PendingProbeState,
  ReadingCase,
  SupportLevel,
  EvidenceBoardState,
} from "../domain";

export type CaseSessionAction =
  | { type: "HYDRATE"; state: CaseSessionState }
  | { type: "SET_SUPPORT"; stepId: string; support: SupportLevel; wrongAnswerId?: string }
  | { type: "BEGIN_PROBE"; probe: PendingProbeState }
  | { type: "CLEAR_PROBE" }
  | { type: "BEGIN_REPAIR"; repair: ActiveRepairState }
  | { type: "SET_REPAIR_PHASE"; phase: ActiveRepairState["phase"] }
  | { type: "RETURN_FROM_REPAIR" }
  | { type: "SET_EVIDENCE_BOARD"; stepId: string; board: EvidenceBoardState }
  | { type: "COMPLETE_STEP"; stepId: string; totalSteps: number }
  | { type: "COMPLETE_CASE" };

export function createCaseSession(args: {
  id?: string;
  learnerId: string;
  readingCase: ReadingCase;
  now?: string;
  startStepIndex?: number;
  routeMode?: "full" | "sample";
}): CaseSessionState {
  const now = args.now ?? new Date().toISOString();
  return {
    id: args.id ?? crypto.randomUUID(),
    learnerId: args.learnerId,
    caseId: args.readingCase.id,
    status: "active",
    stepIndex: args.startStepIndex ?? 0,
    routeMode: args.routeMode ?? "full",
    stepAttempts: {},
    completedStepIds: [],
    evidenceBoards: {},
    startedAt: now,
    updatedAt: now,
  };
}

function currentAttempt(
  state: CaseSessionState,
  stepId: string,
): { attempts: number; support: SupportLevel; wrongAnswerIds: string[] } {
  return (
    state.stepAttempts[stepId] ?? {
      attempts: 0,
      support: "independent" as SupportLevel,
      wrongAnswerIds: [],
    }
  );
}

export function caseSessionReducer(
  state: CaseSessionState,
  action: CaseSessionAction,
): CaseSessionState {
  const now = new Date().toISOString();

  switch (action.type) {
    case "HYDRATE":
      return { ...structuredClone(action.state), evidenceBoards: structuredClone(action.state.evidenceBoards ?? {}) };

    case "SET_SUPPORT": {
      const existing = currentAttempt(state, action.stepId);
      return {
        ...state,
        status: "active",
        stepAttempts: {
          ...state.stepAttempts,
          [action.stepId]: {
            stepId: action.stepId,
            attempts: existing.attempts + 1,
            support: action.support,
            wrongAnswerIds: action.wrongAnswerId
              ? [...existing.wrongAnswerIds, action.wrongAnswerId]
              : existing.wrongAnswerIds,
          },
        },
        updatedAt: now,
      };
    }

    case "BEGIN_PROBE":
      return {
        ...state,
        status: "probing",
        pendingProbe: action.probe,
        updatedAt: now,
      };

    case "CLEAR_PROBE":
      return {
        ...state,
        status: "active",
        pendingProbe: undefined,
        updatedAt: now,
      };

    case "BEGIN_REPAIR":
      return {
        ...state,
        status: "repairing",
        pendingProbe: undefined,
        activeRepair: action.repair,
        updatedAt: now,
      };

    case "SET_REPAIR_PHASE":
      if (!state.activeRepair) return state;
      return {
        ...state,
        activeRepair: { ...state.activeRepair, phase: action.phase },
        updatedAt: now,
      };

    case "RETURN_FROM_REPAIR": {
      if (!state.activeRepair) return state;
      const { bookmark } = state.activeRepair;
      if (bookmark.caseId !== state.caseId) {
        throw new Error("RD-013 violated: repair return case changed.");
      }
      return {
        ...state,
        status: "active",
        stepIndex: bookmark.stepIndex,
        activeRepair: undefined,
        updatedAt: now,
      };
    }


    case "SET_EVIDENCE_BOARD":
      return {
        ...state,
        evidenceBoards: {
          ...(state.evidenceBoards ?? {}),
          [action.stepId]: structuredClone(action.board),
        },
        updatedAt: now,
      };

    case "COMPLETE_STEP": {
      const completed = state.completedStepIds.includes(action.stepId)
        ? state.completedStepIds
        : [...state.completedStepIds, action.stepId];
      const isLast = state.stepIndex + 1 >= action.totalSteps;
      return {
        ...state,
        status: isLast ? "complete" : "active",
        stepIndex: isLast ? state.stepIndex : state.stepIndex + 1,
        completedStepIds: completed,
        completedAt: isLast ? now : state.completedAt,
        updatedAt: now,
      };
    }

    case "COMPLETE_CASE":
      return {
        ...state,
        status: "complete",
        completedAt: now,
        updatedAt: now,
      };
  }
}

export function getStepSupport(
  state: CaseSessionState,
  stepId: string,
): SupportLevel {
  return state.stepAttempts[stepId]?.support ?? "independent";
}
