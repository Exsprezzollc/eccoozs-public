import type { PresentationStage, SkillId } from "./types";

export interface ClueLabChoice {
  id: string;
  label: string;
}

export interface ClueLabPracticeItem {
  id: string;
  prompt: string;
  choices: ClueLabChoice[];
  correctAnswerIds: string[];
}

export interface ClueLab {
  id: string;
  title: string;
  skillId: SkillId;
  stages: PresentationStage[];
  concept: string;
  model: string;
  guided: ClueLabPracticeItem;
  transfer: ClueLabPracticeItem;
  returnMessage: string;
  notebookEntry: {
    title: string;
    summary: string;
  };
}
