import type { LearnerProfile, PresentationStage } from "../domain";
import { DEFAULT_ACCESSIBILITY } from "../domain";

export function createLearner(stage: PresentationStage): LearnerProfile {
  const now = new Date().toISOString();
  const defaultDetective =
    stage === "young-investigator"
      ? "skylar"
      : stage === "investigator"
        ? "jada-junior"
        : "brooke";

  return {
    id: crypto.randomUUID(),
    presentationStage: stage,
    readingDevelopment: "foundation",
    detective: { id: defaultDetective, appearance: "fba" },
    accessibility: { ...DEFAULT_ACCESSIBILITY },
    skillStates: {},
    createdAt: now,
    updatedAt: now,
  };
}
