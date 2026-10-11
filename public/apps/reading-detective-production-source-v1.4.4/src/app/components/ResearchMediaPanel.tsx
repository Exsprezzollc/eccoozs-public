import type { InvestigationStep, ReadingCase } from "../../domain";

export function ResearchMediaPanel({ readingCase, step }: { readingCase: ReadingCase; step: InvestigationStep }) {
  const config = readingCase.researchMediaDecision;
  if (!config) return null;

  const research = step.researchProfileId
    ? config.research?.find((item) => item.id === step.researchProfileId)
    : undefined;
  const media = step.mediaFrameId
    ? config.mediaClaims?.find((item) => item.id === step.mediaFrameId)
    : undefined;
  const quantitative = step.quantitativeFrameId
    ? config.quantitativeFrames?.find((item) => item.id === step.quantitativeFrameId)
    : undefined;
  const graph = step.graphFrameId
    ? config.graphFrames?.find((item) => item.id === step.graphFrameId)
    : undefined;

  if (!research && !media && !quantitative && !graph) return null;

  return (
    <aside className="research-media-panel" aria-label="Research and media analysis desk">
      <div className="research-media-heading">
        <small>ANALYSIS DESK</small>
        <strong>Inspect the evidence before you decide what it supports.</strong>
      </div>

      {research && (
        <article>
          <strong>Study details</strong>
          <span>Design: {research.design.replaceAll("-", " ")}</span>
          {research.sampleSize !== undefined && <span>Sample: {research.sampleSize}</span>}
          {research.population && <span>Population: {research.population}</span>}
          <span>Measured outcome: {research.measuredOutcome}</span>
          <p><b>Stated finding:</b> {research.statedFinding}</p>
          <small>Use these details to decide how strong a conclusion the study can support.</small>
        </article>
      )}

      {media && (
        <article>
          <strong>Claim under review</strong>
          <p>{media.claimText}</p>
          <small>Compare this wording with the cited evidence before judging its certainty or scope.</small>
        </article>
      )}

      {quantitative && (
        <article>
          <strong>Numbers in the claim</strong>
          <span>Baseline: {quantitative.baseline} {quantitative.unit}</span>
          <span>Comparison: {quantitative.comparison} {quantitative.unit}</span>
          <small>Work out both the absolute change and the relative change before interpreting the framing.</small>
        </article>
      )}

      {graph && (
        <article>
          <strong>Graph scale</strong>
          <span>Y-axis: {graph.yAxisMinimum} to {graph.yAxisMaximum}</span>
          <span>Values: {graph.labels.map((label, index) => `${label}: ${graph.values[index]}`).join(" · ")}</span>
          <small>Compare the plotted scale with the actual size of the change. The desk does not grade the graph for you.</small>
        </article>
      )}
    </aside>
  );
}
