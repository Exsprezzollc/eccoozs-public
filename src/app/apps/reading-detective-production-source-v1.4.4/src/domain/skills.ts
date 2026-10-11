import type { EvidenceModality, PresentationStage, SkillId } from "./types";

export type SkillDomain =
  | "print"
  | "phonemic-awareness"
  | "decoding"
  | "vocabulary"
  | "sentence"
  | "comprehension"
  | "evidence"
  | "source"
  | "argument"
  | "legal-language"
  | "media-literacy"
  | "research-literacy"
  | "data-literacy"
  | "decision"
  | "fluency"
  | "literature"
  | "applied-reading";

export interface SkillDefinition {
  id: SkillId;
  name: string;
  domain: SkillDomain;
  description: string;
  prerequisites: SkillId[];
  presentationStages: PresentationStage[];
  transferContexts: string[];
  primaryModality: EvidenceModality;
}

export type SkillGraph = Record<SkillId, SkillDefinition>;
