import type { PlacementPlan, SkillGraph } from "../domain";

export interface PlacementValidationIssue {
  code: string;
  message: string;
}

export function validatePlacementPlan(
  plan: PlacementPlan,
  graph: SkillGraph,
): PlacementValidationIssue[] {
  const issues: PlacementValidationIssue[] = [];
  if (!plan.probes[plan.startProbeId]) {
    issues.push({ code: "PLACEMENT_START", message: `Unknown start probe ${plan.startProbeId}.` });
  }
  if (plan.maxResponses < 1) {
    issues.push({ code: "PLACEMENT_LIMIT", message: "Placement maxResponses must be at least 1." });
  }

  for (const probe of Object.values(plan.probes)) {
    if (!graph[probe.skillId]) {
      issues.push({ code: "PLACEMENT_SKILL", message: `${probe.id} references unknown skill ${probe.skillId}.` });
    }
    if (probe.modality === "audio" && !probe.audioText) {
      issues.push({ code: "PLACEMENT_AUDIO", message: `${probe.id} is audio-only but has no audioText.` });
    }
    if (probe.correctAnswerIds.length === 0) {
      issues.push({ code: "PLACEMENT_ANSWER", message: `${probe.id} has no correct answer.` });
    }
    for (const answerId of probe.correctAnswerIds) {
      if (!probe.choices.some((choice) => choice.id === answerId)) {
        issues.push({ code: "PLACEMENT_ANSWER", message: `${probe.id} correct answer ${answerId} is not a choice.` });
      }
    }
    for (const transition of [probe.correct, probe.incorrect]) {
      if (transition.nextProbeId && !plan.probes[transition.nextProbeId]) {
        issues.push({ code: "PLACEMENT_ROUTE", message: `${probe.id} routes to unknown probe ${transition.nextProbeId}.` });
      }
      if (transition.recommendationSkillId && !graph[transition.recommendationSkillId]) {
        issues.push({ code: "PLACEMENT_RECOMMENDATION", message: `${probe.id} recommends unknown skill ${transition.recommendationSkillId}.` });
      }
    }
  }

  return issues;
}
