import type { EvidenceEvent } from "../domain";

function cloneEvent(event: EvidenceEvent): EvidenceEvent {
  return Object.freeze({
    ...event,
    metadata: event.metadata ? Object.freeze({ ...event.metadata }) : undefined,
  });
}

export class EvidenceLedger {
  private readonly events: EvidenceEvent[] = [];

  record(event: EvidenceEvent): EvidenceEvent {
    const frozen = cloneEvent(event);
    this.events.push(frozen);
    return cloneEvent(frozen);
  }

  forLearner(learnerId: string): EvidenceEvent[] {
    return this.events
      .filter((event) => event.learnerId === learnerId)
      .map(cloneEvent);
  }

  forSkill(learnerId: string, skillId: string): EvidenceEvent[] {
    return this.events
      .filter(
        (event) => event.learnerId === learnerId && event.skillId === skillId,
      )
      .map(cloneEvent);
  }

  snapshot(): EvidenceEvent[] {
    return this.events.map(cloneEvent);
  }
}
