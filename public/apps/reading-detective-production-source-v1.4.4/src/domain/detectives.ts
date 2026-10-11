import type { DetectiveAppearance, PresentationStage } from "./types";

export type DetectivePersonality =
  | "patient"
  | "encouraging"
  | "curious"
  | "analytical"
  | "evidence-focused"
  | "practical"
  | "empathetic"
  | "dependable";

export interface DetectiveProfile {
  id: string;
  name: string;
  stages: PresentationStage[];
  personality: DetectivePersonality;
  descriptor: string;
  profession?: string;
  appearances: DetectiveAppearance[];
  dialogue: Record<string, string>;
}
