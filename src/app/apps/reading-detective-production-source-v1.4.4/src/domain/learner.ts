import type {
  DetectiveAppearance,
  LearnerId,
  MasteryLevel,
  PresentationStage,
  ReadingDevelopment,
  SkillId,
} from "./types";
import type { PlacementSummary } from "./placement";
import type { GraduationRecord } from "./capstone";

export interface AccessibilityPreferences {
  textScale: number;
  increasedSpacing: boolean;
  contrast: "standard" | "high";
  narrationEnabled: boolean;
  speechRate: number;
  voiceName?: string;
  reducedMotion: boolean;
  focusMode: boolean;
  spokenResponseEnabled: boolean;
}

export interface DetectiveSelection {
  id: string;
  appearance: DetectiveAppearance;
}

export interface SkillState {
  skillId: SkillId;
  mastery: MasteryLevel;
  confidence: number;
  lastEvidenceAt?: string;
}

export interface LearnerProfile {
  id: LearnerId;
  displayName?: string;
  presentationStage: PresentationStage;
  readingDevelopment: ReadingDevelopment;
  detective: DetectiveSelection;
  accessibility: AccessibilityPreferences;
  skillStates: Record<SkillId, SkillState>;
  currentCaseId?: string;
  currentTeachingModuleId?: string;
  activeRepairId?: string;
  placement?: PlacementSummary;
  graduation?: GraduationRecord;
  createdAt: string;
  updatedAt: string;
}

export const DEFAULT_ACCESSIBILITY: AccessibilityPreferences = {
  textScale: 1,
  increasedSpacing: false,
  contrast: "standard",
  narrationEnabled: true,
  speechRate: 1,
  reducedMotion: false,
  focusMode: false,
  spokenResponseEnabled: true,
};
