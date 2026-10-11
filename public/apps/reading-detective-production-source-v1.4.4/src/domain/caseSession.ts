import type { CaseId, LearnerId, MisconceptionId, SupportLevel } from "./types";
import type { EvidenceBoardState } from "./evidenceBoard";
import type { CaseRouteMode } from "./activity";

export type CaseSessionStatus =
  | "active"
  | "probing"
  | "repairing"
  | "complete";

export interface StepAttemptState {
  stepId: string;
  attempts: number;
  support: SupportLevel;
  wrongAnswerIds: string[];
}

export interface PendingProbeState {
  probeId: string;
  misconceptionId: MisconceptionId;
  originatingStepId: string;
}

export type RepairPhase = "discover" | "guided" | "transfer";

export interface RepairBookmark {
  caseId: CaseId;
  stepIndex: number;
  stepId: string;
  supportBeforeRepair: SupportLevel;
}

export interface ActiveRepairState {
  clueLabId: string;
  misconceptionId?: MisconceptionId;
  phase: RepairPhase;
  bookmark: RepairBookmark;
}

export interface CaseSessionState {
  id: string;
  learnerId: LearnerId;
  caseId: CaseId;
  status: CaseSessionStatus;
  stepIndex: number;
  routeMode?: CaseRouteMode;
  stepAttempts: Record<string, StepAttemptState>;
  completedStepIds: string[];
  evidenceBoards: Record<string, EvidenceBoardState>;
  pendingProbe?: PendingProbeState;
  activeRepair?: ActiveRepairState;
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
}
