import { useMemo, useState } from "react";
import type { DragEvent } from "react";
import type {
  EvidenceBoardState,
  InvestigationStep,
  ReadingCase,
} from "../../domain";
import {
  createEvidenceBoardState,
  gradeEvidenceBoard,
  placeEvidenceCard,
  setEvidenceZoomPhrase,
  setEvidenceZoomSentence,
  setEvidenceZoomSource,
  splitSourceIntoSentences,
} from "../../engine";

interface EvidenceBoardPanelProps {
  readingCase: ReadingCase;
  step: InvestigationStep;
  state?: EvidenceBoardState;
  onChange: (state: EvidenceBoardState) => void;
  onSubmit: (grade: ReturnType<typeof gradeEvidenceBoard>) => void;
}

export function EvidenceBoardPanel({
  readingCase,
  step,
  state,
  onChange,
  onSubmit,
}: EvidenceBoardPanelProps) {
  const config = step.evidenceBoard;
  const board = state ?? createEvidenceBoardState(step.id);
  const [selectedCardId, setSelectedCardId] = useState<string>();

  const selectedSource = useMemo(
    () => readingCase.sources.find((source) => source.id === board.zoom.sourceId),
    [board.zoom.sourceId, readingCase.sources],
  );

  if (!config) return null;

  if (config.mode === "zoom") {
    const sourceOptions = readingCase.sources.filter((source) => step.sourceIds.includes(source.id));
    const sentences = selectedSource ? splitSourceIntoSentences(selectedSource.body) : [];
    const ready = Boolean(board.zoom.sourceId && board.zoom.sentence && board.zoom.phrase);

    return (
      <section className="evidence-board evidence-zoom" aria-label="Evidence zoom">
        <div className="evidence-board-heading">
          <div>
            <p className="eyebrow">SHOW YOUR EVIDENCE</p>
            <h3>Source → Sentence → Phrase</h3>
          </div>
          <div className="zoom-path" aria-label="Evidence selection path">
            <span className={board.zoom.sourceId ? "done" : ""}>Source</span>
            <span>→</span>
            <span className={board.zoom.sentence ? "done" : ""}>Sentence</span>
            <span>→</span>
            <span className={board.zoom.phrase ? "done" : ""}>Phrase</span>
          </div>
        </div>

        <div className="evidence-zoom-stage">
          <strong>1. Choose the source.</strong>
          <div className="evidence-chip-row">
            {sourceOptions.map((source) => (
              <button
                key={source.id}
                className={board.zoom.sourceId === source.id ? "evidence-chip selected" : "evidence-chip"}
                onClick={() => onChange(setEvidenceZoomSource(board, source.id))}
              >
                {source.title}
              </button>
            ))}
          </div>
        </div>

        {selectedSource && (
          <div className="evidence-zoom-stage">
            <strong>2. Choose the sentence that carries the evidence.</strong>
            <div className="sentence-picker">
              {sentences.map((sentence) => (
                <button
                  key={sentence}
                  className={board.zoom.sentence === sentence ? "sentence-choice selected" : "sentence-choice"}
                  onClick={() => onChange(setEvidenceZoomSentence(board, sentence))}
                >
                  {sentence}
                </button>
              ))}
            </div>
          </div>
        )}

        {board.zoom.sentence && (
          <div className="evidence-zoom-stage">
            <strong>3. Narrow it to the phrase that does the most work.</strong>
            <div className="evidence-chip-row">
              {config.phraseOptions.map((phrase) => (
                <button
                  key={phrase}
                  className={board.zoom.phrase === phrase ? "evidence-chip selected" : "evidence-chip"}
                  onClick={() => onChange(setEvidenceZoomPhrase(board, phrase))}
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          className="primary evidence-submit"
          disabled={!ready}
          onClick={() => onSubmit(gradeEvidenceBoard(config, board))}
        >
          Lock Evidence
        </button>
      </section>
    );
  }

  const placedIds = new Set(Object.keys(board.placements));
  const unplaced = config.cards.filter((card) => !placedIds.has(card.id));
  const ready = Object.keys(config.correctPlacements).every((cardId) => board.placements[cardId]);

  const placeSelected = (categoryId: string) => {
    if (!selectedCardId) return;
    onChange(placeEvidenceCard(board, selectedCardId, categoryId));
    setSelectedCardId(undefined);
  };

  return (
    <section className="evidence-board" aria-label="Evidence board">
      <div className="evidence-board-heading">
        <div>
          <p className="eyebrow">EVIDENCE BOARD</p>
          <h3>{config.mode === "compare" ? "Compare the sources" : "Sort the clues"}</h3>
        </div>
        <p className="quiet">Drag a card, or select a card and then select its evidence category.</p>
      </div>

      <div className="evidence-tray" aria-label="Unsorted evidence">
        <strong>Evidence tray</strong>
        <div className="evidence-card-list">
          {unplaced.length === 0 && <p className="quiet">Every clue has been placed.</p>}
          {unplaced.map((card) => (
            <button
              key={card.id}
              draggable
              onDragStart={(event: DragEvent<HTMLButtonElement>) => event.dataTransfer.setData("text/plain", card.id)}
              className={selectedCardId === card.id ? "evidence-card selected" : "evidence-card"}
              onClick={() => setSelectedCardId((current) => current === card.id ? undefined : card.id)}
            >
              {card.sourceId && <small>{readingCase.sources.find((source) => source.id === card.sourceId)?.title}</small>}
              <span>{card.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="evidence-category-grid">
        {config.categories.map((category) => {
          const cards = config.cards.filter((card) => board.placements[card.id] === category.id);
          return (
            <div
              key={category.id}
              className="evidence-category"
              onDragOver={(event: DragEvent<HTMLDivElement>) => event.preventDefault()}
              onDrop={(event: DragEvent<HTMLDivElement>) => {
                event.preventDefault();
                const cardId = event.dataTransfer.getData("text/plain");
                if (cardId) onChange(placeEvidenceCard(board, cardId, category.id));
              }}
            >
              <button className="category-button" onClick={() => placeSelected(category.id)}>
                <strong>{category.label}</strong>
                {category.description && <span>{category.description}</span>}
              </button>
              <div className="category-cards">
                {cards.map((card) => (
                  <button
                    key={card.id}
                    className="placed-evidence-card"
                    onClick={() => {
                      const next = { ...board, placements: { ...board.placements } };
                      delete next.placements[card.id];
                      onChange({ ...next, updatedAt: new Date().toISOString() });
                    }}
                    title="Return this clue to the evidence tray"
                  >
                    {card.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="primary evidence-submit"
        disabled={!ready}
        onClick={() => onSubmit(gradeEvidenceBoard(config, board))}
      >
        Check Evidence Board
      </button>
    </section>
  );
}
