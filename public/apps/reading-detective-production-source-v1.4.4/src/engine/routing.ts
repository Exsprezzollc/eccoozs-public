import type { LearnerProfile, SkillGraph, SkillId } from "../domain";

const stableMastery = new Set(["independent", "transferred", "secure"]);

export function findUnmetPrerequisite(
  targetSkillId: SkillId,
  learner: LearnerProfile,
  graph: SkillGraph,
): SkillId | undefined {
  const target = graph[targetSkillId];
  if (!target) throw new Error(`Unknown skill: ${targetSkillId}`);

  for (const prerequisiteId of target.prerequisites) {
    const state = learner.skillStates[prerequisiteId];
    if (!state || !stableMastery.has(state.mastery)) {
      return findUnmetPrerequisite(prerequisiteId, learner, graph) ?? prerequisiteId;
    }
  }

  return undefined;
}

export function chooseInstructionalSkill(
  requestedSkillId: SkillId,
  learner: LearnerProfile,
  graph: SkillGraph,
): SkillId {
  return findUnmetPrerequisite(requestedSkillId, learner, graph) ?? requestedSkillId;
}
