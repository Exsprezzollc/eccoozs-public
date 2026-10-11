import type {
  CaseId,
  EvidenceContext,
  EvidenceOutcome,
  EvidenceModality,
  LearnerId,
  MisconceptionId,
  SkillId,
  SupportLevel,
} from "./types";

export interface EvidenceEvent {
  id: string;
  learnerId: LearnerId;
  skillId: SkillId;
  caseId: CaseId;
  itemId: string;
  outcome: EvidenceOutcome;
  support: SupportLevel;
  context: EvidenceContext;
  modality?: EvidenceModality;
  misconceptionId?: MisconceptionId;
  timestamp: string;
  metadata?: Readonly<Record<string, string | number | boolean>>;
}
