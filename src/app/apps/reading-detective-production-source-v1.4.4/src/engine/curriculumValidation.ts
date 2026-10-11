import type { CurriculumMap, ReadingCase, SkillGraph } from "../domain";

export function validateSkillGraph(graph: SkillGraph): string[] {
  const errors: string[] = [];
  for (const definition of Object.values(graph)) {
    for (const prerequisiteId of definition.prerequisites) {
      if (!graph[prerequisiteId]) {
        errors.push(`${definition.id} references missing prerequisite ${prerequisiteId}`);
      }
    }
  }

  const visiting = new Set<string>();
  const visited = new Set<string>();
  const visit = (skillId: string, trail: string[]) => {
    if (visiting.has(skillId)) {
      errors.push(`Skill graph cycle: ${[...trail, skillId].join(" -> ")}`);
      return;
    }
    if (visited.has(skillId)) return;
    visiting.add(skillId);
    for (const prerequisiteId of graph[skillId]?.prerequisites ?? []) {
      if (graph[prerequisiteId]) visit(prerequisiteId, [...trail, skillId]);
    }
    visiting.delete(skillId);
    visited.add(skillId);
  };
  for (const skillId of Object.keys(graph)) visit(skillId, []);
  return errors;
}

export function validateCurriculumMap(
  curriculum: CurriculumMap,
  graph: SkillGraph,
  cases: Record<string, ReadingCase>,
): string[] {
  const errors: string[] = [];
  for (const [stage, stageMap] of Object.entries(curriculum)) {
    if (stageMap.stage !== stage) errors.push(`Curriculum stage key ${stage} does not match stage value ${stageMap.stage}`);
    for (const strand of stageMap.strands) {
      if (strand.stage !== stageMap.stage) errors.push(`${strand.id} uses the wrong presentation stage`);
      for (const skillId of strand.skillIds) {
        const skill = graph[skillId];
        if (!skill) errors.push(`${strand.id} references missing skill ${skillId}`);
        else if (!skill.presentationStages.includes(stageMap.stage)) {
          errors.push(`${strand.id} includes ${skillId}, which is not presentation-compatible with ${stageMap.stage}`);
        }
      }
      for (const caseId of strand.caseIds) {
        const readingCase = cases[caseId];
        if (!readingCase) errors.push(`${strand.id} references missing case ${caseId}`);
        else if (!readingCase.presentationStages.includes(stageMap.stage)) {
          errors.push(`${strand.id} includes ${caseId}, which is not presentation-compatible with ${stageMap.stage}`);
        }
      }
    }
  }
  return errors;
}
