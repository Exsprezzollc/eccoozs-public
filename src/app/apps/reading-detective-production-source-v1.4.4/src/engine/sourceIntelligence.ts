import type {
  CorroborationSummary,
  DerivedSourceLens,
  ReadingCase,
  SourceClaimMap,
  SourceQuestionLens,
} from "../domain";

function sourceById(readingCase: ReadingCase, sourceId: string) {
  return readingCase.sources.find((source) => source.id === sourceId);
}

function independenceKey(readingCase: ReadingCase, sourceId: string): string {
  const source = sourceById(readingCase, sourceId);
  return source?.intelligence?.independenceKey ?? source?.intelligence?.originalSourceId ?? sourceId;
}

export function sourceLensForCase(readingCase: ReadingCase, lensId: string): DerivedSourceLens | undefined {
  const lens = readingCase.sourceIntelligence?.lenses.find((candidate) => candidate.id === lensId);
  if (!lens) return undefined;
  return {
    caseId: readingCase.id,
    lensId: lens.id,
    question: lens.question,
    entries: lens.assessments.map((assessment) => {
      const source = sourceById(readingCase, assessment.sourceId);
      return {
        ...assessment,
        creator: source?.intelligence?.creator,
        purpose: source?.intelligence?.purpose,
        proximity: source?.intelligence?.proximity,
        independenceKey: source ? independenceKey(readingCase, source.id) : assessment.sourceId,
        interestNote: source?.intelligence?.interestNote,
      };
    }),
  };
}

function claimMap(readingCase: ReadingCase, claimId: string): SourceClaimMap | undefined {
  return readingCase.sourceIntelligence?.claims?.find((candidate) => candidate.id === claimId);
}

export function corroborationForClaim(readingCase: ReadingCase, claimId: string): CorroborationSummary | undefined {
  const map = claimMap(readingCase, claimId);
  if (!map) return undefined;

  const supportingSourceIds = map.positions.filter((item) => item.stance === "supports").map((item) => item.sourceId);
  const contradictingSourceIds = map.positions.filter((item) => item.stance === "contradicts").map((item) => item.sourceId);
  const uncertainSourceIds = map.positions.filter((item) => item.stance === "uncertain").map((item) => item.sourceId);
  const independentSupportingOrigins = [...new Set(supportingSourceIds.map((id) => independenceKey(readingCase, id)))];
  const independentContradictingOrigins = [...new Set(contradictingSourceIds.map((id) => independenceKey(readingCase, id)))];

  let status: CorroborationSummary["status"];
  let explanation: string;
  if (independentSupportingOrigins.length === 0 && independentContradictingOrigins.length === 0) {
    status = uncertainSourceIds.length ? "uncertain" : "unsupported";
    explanation = uncertainSourceIds.length
      ? "The available sources mention or qualify the claim but do not independently establish it."
      : "No source in this case currently supports or contradicts the claim.";
  } else if (independentSupportingOrigins.length > 0 && independentContradictingOrigins.length > 0) {
    status = "disputed";
    explanation = "Independent source origins point in different directions, so the claim remains disputed.";
  } else if (independentSupportingOrigins.length >= 2) {
    status = "corroborated";
    explanation = "At least two independent source origins support the same claim without an independent contradiction in this case.";
  } else {
    status = "single-origin";
    explanation = supportingSourceIds.length > 1
      ? "Several items repeat the claim, but they trace back to one underlying source origin, so they do not count as independent corroboration."
      : "The claim is supported by one source origin and has not yet been independently corroborated.";
  }

  return {
    caseId: readingCase.id,
    claimId: map.id,
    claim: map.claim,
    status,
    supportingSourceIds,
    contradictingSourceIds,
    uncertainSourceIds,
    independentSupportingOrigins,
    independentContradictingOrigins,
    explanation,
  };
}

export function validateSourceIntelligence(readingCase: ReadingCase): string[] {
  const errors: string[] = [];
  const config = readingCase.sourceIntelligence;
  if (!config) return errors;
  const sourceIds = new Set(readingCase.sources.map((source) => source.id));
  const lensIds = new Set<string>();
  const claimIds = new Set<string>();

  for (const source of readingCase.sources) {
    const original = source.intelligence?.originalSourceId;
    if (original && !sourceIds.has(original)) {
      errors.push(`Source ${source.id} points to missing original source ${original}`);
    }
  }

  for (const lens of config.lenses) {
    if (lensIds.has(lens.id)) errors.push(`Duplicate source lens id ${lens.id}`);
    lensIds.add(lens.id);
    if (!lens.question.trim()) errors.push(`Source lens ${lens.id} must state the question it is evaluating`);
    const assessmentIds = new Set<string>();
    for (const assessment of lens.assessments) {
      if (!sourceIds.has(assessment.sourceId)) errors.push(`Source lens ${lens.id} references missing source ${assessment.sourceId}`);
      if (assessmentIds.has(assessment.sourceId)) errors.push(`Source lens ${lens.id} assesses source ${assessment.sourceId} more than once`);
      assessmentIds.add(assessment.sourceId);
      if (!assessment.rationale.trim()) errors.push(`Source lens ${lens.id}/${assessment.sourceId} needs a rationale`);
    }
  }

  for (const claim of config.claims ?? []) {
    if (claimIds.has(claim.id)) errors.push(`Duplicate source claim id ${claim.id}`);
    claimIds.add(claim.id);
    if (!claim.claim.trim()) errors.push(`Source claim ${claim.id} must include claim text`);
    for (const position of claim.positions) {
      if (!sourceIds.has(position.sourceId)) errors.push(`Source claim ${claim.id} references missing source ${position.sourceId}`);
    }
  }

  for (const step of readingCase.steps) {
    if (step.sourceLensId && !lensIds.has(step.sourceLensId)) {
      errors.push(`Step ${step.id} references missing source lens ${step.sourceLensId}`);
    }
    if (step.sourceClaimId && !claimIds.has(step.sourceClaimId)) {
      errors.push(`Step ${step.id} references missing source claim ${step.sourceClaimId}`);
    }
  }

  return errors;
}

export function sourceQuestionLens(readingCase: ReadingCase, lensId: string): SourceQuestionLens | undefined {
  return readingCase.sourceIntelligence?.lenses.find((candidate) => candidate.id === lensId);
}
