import type {
  DiagnosticProbe,
  EvidenceEvent,
  InvestigationStep,
  MisconceptionDefinition,
  SupportLevel,
} from "../domain";
import { assessMisconception } from "./diagnostics";
import { isSupportLadderExhausted, nextSupportLevel } from "./support";

export type IncorrectResponseDecision =
  | { kind: "support"; support: SupportLevel }
  | { kind: "probe"; probe: DiagnosticProbe; misconceptionId: string }
  | { kind: "repair"; clueLabId: string; misconceptionId?: string };

export function decideAfterIncorrectResponse(args: {
  step: InvestigationStep;
  misconceptionId?: string;
  currentSupport: SupportLevel;
  events: EvidenceEvent[];
  misconceptions: Record<string, MisconceptionDefinition>;
  probes: Record<string, DiagnosticProbe>;
}): IncorrectResponseDecision {
  const {
    step,
    misconceptionId,
    currentSupport,
    events,
    misconceptions,
    probes,
  } = args;

  if (misconceptionId && misconceptions[misconceptionId]) {
    const assessment = assessMisconception(
      misconceptions[misconceptionId],
      events,
      probes,
    );

    if (assessment.status === "confirmed") {
      return {
        kind: "repair",
        clueLabId: misconceptions[misconceptionId].clueLabId,
        misconceptionId,
      };
    }

    // Diagnostic probes come only after the least-intrusive support ladder has
    // been exhausted. Repeated wrong answers alone are not a diagnosis.
    if (
      assessment.status === "probe" &&
      assessment.probe &&
      isSupportLadderExhausted(currentSupport)
    ) {
      return {
        kind: "probe",
        probe: assessment.probe,
        misconceptionId,
      };
    }
  }

  if (!isSupportLadderExhausted(currentSupport)) {
    return { kind: "support", support: nextSupportLevel(currentSupport) };
  }

  if (step.clueLabId) {
    return { kind: "repair", clueLabId: step.clueLabId, misconceptionId };
  }

  return { kind: "support", support: "concept-reminder" };
}

export function decideAfterProbe(args: {
  misconception: MisconceptionDefinition;
  correct: boolean;
}): { kind: "return" } | { kind: "repair"; clueLabId: string } {
  if (args.correct) return { kind: "return" };
  return { kind: "repair", clueLabId: args.misconception.clueLabId };
}
