import type {
  DecisionEvaluation,
  DecisionEvaluationInput,
  GraphAssessment,
  MediaCalibrationAssessment,
  QuantitativeAssessment,
  ReadingCase,
  ResearchAssessment,
  ResearchProfile,
} from "../domain";

function config(readingCase: ReadingCase) {
  return readingCase.researchMediaDecision;
}

export function assessResearchProfile(
  readingCase: ReadingCase,
  profileId: string,
): ResearchAssessment | undefined {
  const profile = config(readingCase)?.research?.find((item) => item.id === profileId);
  if (!profile) return undefined;
  const canSupportCausalClaim =
    profile.relationshipSupported === "causal" &&
    (profile.design === "randomized-experiment" || profile.design === "controlled-experiment") &&
    profile.comparisonGroup === true;
  return {
    caseId: readingCase.id,
    profileId: profile.id,
    sourceId: profile.sourceId,
    design: profile.design,
    strongestSupportedRelationship: profile.relationshipSupported,
    canSupportCausalClaim,
    limitations: [...profile.limitations],
    explanation: researchExplanation(profile, canSupportCausalClaim),
  };
}

function researchExplanation(profile: ResearchProfile, canSupportCausalClaim: boolean): string {
  if (canSupportCausalClaim) {
    return `The case model permits a causal reading because the supplied research profile is ${profile.design}, includes a comparison group, and marks the supported relationship as causal. Limitations still matter.`;
  }
  if (profile.relationshipSupported === "association") {
    return "The supplied research profile supports an association. It does not establish that one variable caused the other.";
  }
  if (profile.relationshipSupported === "prediction") {
    return "The supplied research profile supports a prediction within the case model, not a universal causal rule.";
  }
  return "The supplied research profile supports a descriptive finding only.";
}

export function assessMediaCalibration(
  readingCase: ReadingCase,
  frameId: string,
): MediaCalibrationAssessment | undefined {
  const frame = config(readingCase)?.mediaClaims?.find((item) => item.id === frameId);
  if (!frame) return undefined;
  return {
    caseId: readingCase.id,
    frameId: frame.id,
    claimText: frame.claimText,
    certainty: frame.certainty,
    risks: [...frame.risks],
    calibrated: frame.risks.length === 0,
    preciseReading: frame.preciseReading,
  };
}

export function assessQuantitativeFrame(
  readingCase: ReadingCase,
  frameId: string,
): QuantitativeAssessment | undefined {
  const frame = config(readingCase)?.quantitativeFrames?.find((item) => item.id === frameId);
  if (!frame) return undefined;
  const absoluteChange = frame.comparison - frame.baseline;
  const relativeChangePercent = frame.baseline === 0
    ? undefined
    : (absoluteChange / frame.baseline) * 100;
  const reported = frame.reportedRelativeChangePercent;
  const framingComplete = reported === undefined || relativeChangePercent === undefined
    ? reported === undefined
    : Math.abs(reported - relativeChangePercent) < 0.01;
  return {
    caseId: readingCase.id,
    frameId: frame.id,
    absoluteChange,
    relativeChangePercent,
    reportedRelativeChangePercent: reported,
    framingComplete,
    explanation: relativeChangePercent === undefined
      ? `The value changed by ${absoluteChange} ${frame.unit}; a relative percentage cannot be computed from a zero baseline.`
      : `The value changed by ${absoluteChange} ${frame.unit}, which is ${relativeChangePercent.toFixed(1)}% relative to the baseline. Readers should inspect both the percentage and the underlying values.`,
  };
}

export function assessGraphFrame(
  readingCase: ReadingCase,
  graphId: string,
): GraphAssessment | undefined {
  const graph = config(readingCase)?.graphFrames?.find((item) => item.id === graphId);
  if (!graph) return undefined;
  const dataRange = Math.max(...graph.values) - Math.min(...graph.values);
  const axisRange = graph.yAxisMaximum - graph.yAxisMinimum;
  const exaggerationRatio = dataRange > 0 && axisRange > 0 ? dataRange / axisRange : undefined;
  const risk = graph.visualRisk ?? "none";
  return {
    caseId: readingCase.id,
    graphId: graph.id,
    visualRisk: risk,
    dataRange,
    axisRange,
    exaggerationRatio,
    explanation: risk === "truncated-axis"
      ? "The graph may make a modest numeric difference look visually dramatic because the displayed axis begins well above zero. The underlying values still need to be read directly."
      : graph.interpretation,
  };
}

export function evaluateDecision(
  readingCase: ReadingCase,
  decisionId: string,
  input: DecisionEvaluationInput,
): DecisionEvaluation | undefined {
  const model = config(readingCase)?.decisions?.find((item) => item.id === decisionId);
  if (!model) return undefined;
  const acceptable = model.acceptableDecisions.find((item) => item.optionId === input.optionId);
  if (!acceptable) {
    return {
      caseId: readingCase.id,
      decisionId,
      optionId: input.optionId,
      defensible: false,
      missingEvidenceSourceIds: [],
      missingCriterionIds: [],
      missingTradeoffs: [],
      explanation: "This option is not one of the conclusions the authored case marks as defensible from the supplied evidence.",
    };
  }
  const evidence = new Set(input.evidenceSourceIds);
  const criteria = new Set(input.criterionIds);
  const tradeoffs = new Set(input.tradeoffAcknowledgements ?? []);
  const missingEvidenceSourceIds = acceptable.requiredEvidenceSourceIds.filter((id) => !evidence.has(id));
  const missingCriterionIds = acceptable.requiredCriterionIds.filter((id) => !criteria.has(id));
  const missingTradeoffs = (acceptable.requiredTradeoffAcknowledgements ?? []).filter((id) => !tradeoffs.has(id));
  const defensible = !missingEvidenceSourceIds.length && !missingCriterionIds.length && !missingTradeoffs.length;
  return {
    caseId: readingCase.id,
    decisionId,
    optionId: input.optionId,
    defensible,
    missingEvidenceSourceIds,
    missingCriterionIds,
    missingTradeoffs,
    explanation: defensible
      ? acceptable.rationale
      : "The conclusion may be possible, but the response has not yet connected enough required evidence, criteria, and tradeoffs to make it defensible in this case.",
  };
}

export function validateResearchMediaDecision(readingCase: ReadingCase): string[] {
  const errors: string[] = [];
  const cfg = config(readingCase);
  if (!cfg) return errors;
  const sourceIds = new Set(readingCase.sources.map((source) => source.id));
  const ids = new Set<string>();
  const addId = (id: string, type: string) => {
    if (ids.has(id)) errors.push(`Duplicate research/media/decision id ${id}`);
    ids.add(id);
    if (!id.trim()) errors.push(`${type} must have an id`);
  };
  for (const profile of cfg.research ?? []) {
    addId(profile.id, "Research profile");
    if (!sourceIds.has(profile.sourceId)) errors.push(`Research profile ${profile.id} references missing source ${profile.sourceId}`);
    if (!profile.measuredOutcome.trim()) errors.push(`Research profile ${profile.id} needs a measured outcome`);
    if (!profile.statedFinding.trim()) errors.push(`Research profile ${profile.id} needs a stated finding`);
  }
  for (const frame of cfg.mediaClaims ?? []) {
    addId(frame.id, "Media claim frame");
    if (!sourceIds.has(frame.sourceId)) errors.push(`Media claim frame ${frame.id} references missing source ${frame.sourceId}`);
    for (const sourceId of frame.evidenceSourceIds) if (!sourceIds.has(sourceId)) errors.push(`Media claim frame ${frame.id} references missing evidence source ${sourceId}`);
  }
  for (const frame of cfg.quantitativeFrames ?? []) {
    addId(frame.id, "Quantitative frame");
    if (!sourceIds.has(frame.sourceId)) errors.push(`Quantitative frame ${frame.id} references missing source ${frame.sourceId}`);
  }
  for (const graph of cfg.graphFrames ?? []) {
    addId(graph.id, "Graph frame");
    if (!sourceIds.has(graph.sourceId)) errors.push(`Graph frame ${graph.id} references missing source ${graph.sourceId}`);
    if (graph.values.length !== graph.labels.length) errors.push(`Graph frame ${graph.id} must have one label per value`);
    if (graph.yAxisMaximum <= graph.yAxisMinimum) errors.push(`Graph frame ${graph.id} has an invalid y-axis range`);
  }
  for (const decision of cfg.decisions ?? []) {
    addId(decision.id, "Decision model");
    const criterionIds = new Set(decision.criteria.map((item) => item.id));
    const optionIds = new Set(decision.options.map((item) => item.id));
    for (const option of decision.options) {
      for (const sourceId of option.evidenceSourceIds) if (!sourceIds.has(sourceId)) errors.push(`Decision ${decision.id}/${option.id} references missing source ${sourceId}`);
    }
    for (const acceptable of decision.acceptableDecisions) {
      if (!optionIds.has(acceptable.optionId)) errors.push(`Decision ${decision.id} accepts missing option ${acceptable.optionId}`);
      for (const sourceId of acceptable.requiredEvidenceSourceIds) if (!sourceIds.has(sourceId)) errors.push(`Decision ${decision.id}/${acceptable.optionId} requires missing source ${sourceId}`);
      for (const criterionId of acceptable.requiredCriterionIds) if (!criterionIds.has(criterionId)) errors.push(`Decision ${decision.id}/${acceptable.optionId} requires missing criterion ${criterionId}`);
    }
  }
  const researchIds = new Set((cfg.research ?? []).map((item) => item.id));
  const mediaIds = new Set((cfg.mediaClaims ?? []).map((item) => item.id));
  const quantitativeIds = new Set((cfg.quantitativeFrames ?? []).map((item) => item.id));
  const graphIds = new Set((cfg.graphFrames ?? []).map((item) => item.id));
  const decisionIds = new Set((cfg.decisions ?? []).map((item) => item.id));
  for (const step of readingCase.steps) {
    if (step.researchProfileId && !researchIds.has(step.researchProfileId)) errors.push(`Step ${step.id} references missing research profile ${step.researchProfileId}`);
    if (step.mediaFrameId && !mediaIds.has(step.mediaFrameId)) errors.push(`Step ${step.id} references missing media frame ${step.mediaFrameId}`);
    if (step.quantitativeFrameId && !quantitativeIds.has(step.quantitativeFrameId)) errors.push(`Step ${step.id} references missing quantitative frame ${step.quantitativeFrameId}`);
    if (step.graphFrameId && !graphIds.has(step.graphFrameId)) errors.push(`Step ${step.id} references missing graph frame ${step.graphFrameId}`);
    if (step.decisionId && !decisionIds.has(step.decisionId)) errors.push(`Step ${step.id} references missing decision model ${step.decisionId}`);
    if (step.responseType === "decision-workbench" && !step.decisionId) errors.push(`Step ${step.id} uses decision-workbench without a decisionId`);
  }
  return errors;
}
