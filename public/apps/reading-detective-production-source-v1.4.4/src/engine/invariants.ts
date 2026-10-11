import type { LearnerProfile, ReadingCase, SkillGraph } from "../domain";
import { canReadAloud } from "./readAloudPolicy";
import { validateCase } from "./caseValidation";

export function assertFoundationInvariants(args: {
  learner: LearnerProfile;
  graph: SkillGraph;
  cases: ReadingCase[];
}): void {
  const { learner, graph, cases } = args;

  if ("readingGrade" in (learner as unknown as Record<string, unknown>)) {
    throw new Error("RD-015 violated: learner model must not expose reading grade.");
  }

  for (const readingCase of cases) {
    const result = validateCase(readingCase, graph);
    if (!result.valid) {
      throw new Error(`Invalid case ${readingCase.id}: ${result.errors.join("; ")}`);
    }
  }

  const decoding = Object.values(graph).find((skill) => skill.domain === "decoding");
  if (decoding && canReadAloud(decoding, "target-word", true)) {
    throw new Error("RD-008 violated: decoding target audio exposed during assessment.");
  }
}
