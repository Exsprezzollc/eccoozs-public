import type {
  DiagnosticProbe,
  EvidenceEvent,
  MisconceptionDefinition,
} from "../domain";

export interface MisconceptionAssessment {
  misconceptionId: string;
  status: "observe" | "probe" | "confirmed";
  matchingErrors: number;
  probe?: DiagnosticProbe;
}

export function assessMisconception(
  definition: MisconceptionDefinition,
  events: EvidenceEvent[],
  probes: Record<string, DiagnosticProbe>,
): MisconceptionAssessment {
  const matchingErrors = events.filter(
    (event) =>
      event.outcome === "incorrect" &&
      event.misconceptionId === definition.id &&
      event.context !== "diagnostic-probe",
  ).length;

  const probeEvidence = events.filter(
    (event) =>
      event.context === "diagnostic-probe" &&
      event.misconceptionId === definition.id,
  );

  const failedProbe = probeEvidence.some((event) => event.outcome === "incorrect");

  if (matchingErrors < definition.confirmationThreshold) {
    return {
      misconceptionId: definition.id,
      status: "observe",
      matchingErrors,
    };
  }

  if (!failedProbe) {
    return {
      misconceptionId: definition.id,
      status: "probe",
      matchingErrors,
      probe: probes[definition.probeIds[0]],
    };
  }

  return {
    misconceptionId: definition.id,
    status: "confirmed",
    matchingErrors,
  };
}
