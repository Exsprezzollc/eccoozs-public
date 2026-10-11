import { useMemo, useState } from "react";
import type { DecisionEvaluation, ReadingCase } from "../../domain";
import { evaluateDecision } from "../../engine";

export function DecisionWorkbench({
  readingCase,
  decisionId,
  onSubmit,
}: {
  readingCase: ReadingCase;
  decisionId: string;
  onSubmit: (evaluation: DecisionEvaluation) => void;
}) {
  const model = readingCase.researchMediaDecision?.decisions?.find((item) => item.id === decisionId);
  const [optionId, setOptionId] = useState<string>();
  const [evidenceIds, setEvidenceIds] = useState<string[]>([]);
  const [criterionIds, setCriterionIds] = useState<string[]>([]);
  const [tradeoffs, setTradeoffs] = useState<string[]>([]);
  const sourceById = useMemo(() => Object.fromEntries(readingCase.sources.map((source) => [source.id, source])), [readingCase.sources]);
  if (!model) return null;

  const toggle = (list: string[], value: string, setter: (next: string[]) => void) =>
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);

  const availableTradeoffs = [...new Set(model.acceptableDecisions.flatMap((item) => item.requiredTradeoffAcknowledgements ?? []))];
  const ready = Boolean(optionId && evidenceIds.length && criterionIds.length);

  return (
    <section className="decision-workbench" aria-label="Decision workbench">
      <p className="eyebrow">DECISION DESK</p>
      <h3>{model.question}</h3>
      <div className="decision-group">
        <strong>1. Choose a conclusion.</strong>
        <div className="choice-list compact">
          {model.options.map((option) => (
            <button key={option.id} className={optionId === option.id ? "selected" : ""} onClick={() => setOptionId(option.id)}>{option.label}</button>
          ))}
        </div>
      </div>
      <div className="decision-group">
        <strong>2. Select the evidence you are relying on.</strong>
        <div className="evidence-chip-row">
          {readingCase.sources.map((source) => (
            <button key={source.id} className={evidenceIds.includes(source.id) ? "evidence-chip selected" : "evidence-chip"} onClick={() => toggle(evidenceIds, source.id, setEvidenceIds)}>{source.title}</button>
          ))}
        </div>
      </div>
      <div className="decision-group">
        <strong>3. Name the criteria that matter.</strong>
        <div className="evidence-chip-row">
          {model.criteria.map((criterion) => (
            <button key={criterion.id} className={criterionIds.includes(criterion.id) ? "evidence-chip selected" : "evidence-chip"} onClick={() => toggle(criterionIds, criterion.id, setCriterionIds)} title={criterion.description}>{criterion.label}</button>
          ))}
        </div>
      </div>
      {availableTradeoffs.length > 0 && (
        <div className="decision-group">
          <strong>4. Acknowledge the tradeoff your choice carries.</strong>
          <div className="evidence-chip-row">
            {availableTradeoffs.map((tradeoff) => (
              <button key={tradeoff} className={tradeoffs.includes(tradeoff) ? "evidence-chip selected" : "evidence-chip"} onClick={() => toggle(tradeoffs, tradeoff, setTradeoffs)}>{tradeoff}</button>
            ))}
          </div>
        </div>
      )}
      <button className="primary" disabled={!ready} onClick={() => {
        if (!optionId) return;
        const evaluation = evaluateDecision(readingCase, decisionId, { optionId, evidenceSourceIds: evidenceIds, criterionIds, tradeoffAcknowledgements: tradeoffs });
        if (evaluation) onSubmit(evaluation);
      }}>Submit Evidence-Based Decision</button>
      {optionId && <p className="quiet">Selected: {model.options.find((item) => item.id === optionId)?.label}. Evidence: {evidenceIds.map((id) => sourceById[id]?.title ?? id).join(", ") || "none yet"}.</p>}
    </section>
  );
}
