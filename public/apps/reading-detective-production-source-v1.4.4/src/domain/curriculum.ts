import type { CaseId, PresentationStage, SkillId } from "./types";

export interface CurriculumStrand {
  id: string;
  title: string;
  stage: PresentationStage;
  purpose: string;
  skillIds: SkillId[];
  caseIds: CaseId[];
}

export interface CurriculumStageMap {
  stage: PresentationStage;
  learnerPromise: string;
  strands: CurriculumStrand[];
}

export type CurriculumMap = Record<PresentationStage, CurriculumStageMap>;
