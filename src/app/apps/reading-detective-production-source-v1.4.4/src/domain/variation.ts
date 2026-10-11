import type {
  EvidenceContext,
  MisconceptionId,
  PresentationStage,
  SkillId,
} from "./types";
import type { SourceKind } from "./cases";

export interface VariationChoiceTemplate {
  id: string;
  labelTemplate: string;
  misconceptionId?: MisconceptionId;
}

export interface VariationScenario {
  id: string;
  stages: PresentationStage[];
  tokens: Readonly<Record<string, string>>;
}

export interface ContentVariationTemplate {
  id: string;
  skillId: SkillId;
  sourceKind: SourceKind;
  sourceTitleTemplate: string;
  sourceBodyTemplate: string;
  promptTemplate: string;
  choices: VariationChoiceTemplate[];
  correctChoiceIds: string[];
  scenarios: VariationScenario[];
  shuffleChoices?: boolean;
  clueLabId?: string;
  evidenceContext?: EvidenceContext;
}

export interface MaterializedVariationChoice {
  id: string;
  label: string;
  misconceptionId?: MisconceptionId;
}

export interface MaterializedVariationItem {
  templateId: string;
  scenarioId: string;
  fingerprint: string;
  skillId: SkillId;
  sourceKind: SourceKind;
  sourceTitle: string;
  sourceBody: string;
  prompt: string;
  choices: MaterializedVariationChoice[];
  correctChoiceIds: string[];
  clueLabId?: string;
  evidenceContext: EvidenceContext;
}
