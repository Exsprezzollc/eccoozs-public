import type {
  EvidenceEvent,
  EvidenceModality,
  MasteryLevel,
  SkillDefinition,
  SkillState,
} from "../domain";

const isCorrect = (event: EvidenceEvent) =>
  event.outcome === "correct" || event.outcome === "self-corrected";

const isMasteryEligibleContext = (event: EvidenceEvent) =>
  event.context !== "placement" &&
  event.context !== "diagnostic-probe" &&
  event.context !== "instruction" &&
  event.context !== "guided-practice";

const isIndependent = (event: EvidenceEvent) =>
  event.support === "independent" &&
  isCorrect(event) &&
  isMasteryEligibleContext(event);

function modalityEligible(
  event: EvidenceEvent,
  requiredModality?: EvidenceModality,
): boolean {
  if (!requiredModality || requiredModality === "mixed") return true;
  const eventModality = event.modality ?? "print";
  return eventModality === requiredModality || eventModality === "mixed";
}

export function deriveSkillState(
  skillId: string,
  events: EvidenceEvent[],
  requiredModality?: EvidenceModality,
): SkillState {
  const skillEvents = events
    .filter(
      (event) =>
        event.skillId === skillId && modalityEligible(event, requiredModality),
    )
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  if (skillEvents.length === 0) {
    return { skillId, mastery: "not-introduced", confidence: 0 };
  }

  const correct = skillEvents.filter(
    (event) => isCorrect(event) && event.context !== "instruction",
  );
  const independent = skillEvents.filter(isIndependent);
  const transfer = independent.filter((e) => e.context === "transfer");
  const delayed = independent.filter((e) => e.context === "delayed-review");
  const recent = skillEvents
    .filter((event) => isMasteryEligibleContext(event))
    .slice(-3);
  const recentIncorrect = recent.filter((e) => e.outcome === "incorrect").length;

  let mastery: MasteryLevel = "introduced";

  if (correct.length > 0) mastery = "guided";
  if (correct.length >= 2) mastery = "developing";
  if (independent.length >= 2) mastery = "independent";
  if (transfer.length >= 1 && independent.length >= 2) mastery = "transferred";
  if (transfer.length >= 1 && delayed.length >= 1 && independent.length >= 3) {
    mastery = "secure";
  }
  if (mastery === "secure" && recentIncorrect >= 2) {
    mastery = "review-needed";
  }

  const weightedSuccess = skillEvents.reduce((total, event) => {
    if (!isCorrect(event)) return total;
    const supportWeight = event.support === "independent" ? 1 : 0.65;
    const contextWeight =
      event.context === "instruction"
        ? 0
        : event.context === "transfer" || event.context === "delayed-review"
          ? 1.2
          : event.context === "placement" || event.context === "diagnostic-probe"
            ? 0.45
            : event.context === "guided-practice"
              ? 0.6
              : 1;
    return total + supportWeight * contextWeight;
  }, 0);

  const confidence = Math.min(
    1,
    Number((weightedSuccess / Math.max(3, skillEvents.length)).toFixed(2)),
  );

  return {
    skillId,
    mastery,
    confidence,
    lastEvidenceAt: skillEvents.at(-1)?.timestamp,
  };
}

export function deriveSkillStateForDefinition(
  definition: SkillDefinition,
  events: EvidenceEvent[],
): SkillState {
  return deriveSkillState(definition.id, events, definition.primaryModality);
}
