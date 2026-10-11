import type { ReadingCase } from "../../domain";

export function LiteratureAnalysisPanel({ readingCase }: { readingCase: ReadingCase }) {
  if (!readingCase.literatureIntelligence) return null;
  return (
    <section className="analysis-desk" aria-label="Literature analysis tools">
      <div className="panel-heading">
        <strong>Literature Investigation Desk</strong>
        <span>Evidence before interpretation</span>
      </div>
      <div className="analysis-grid">
        <article>
          <small>MOTIVE</small>
          <p>Separate what the character directly says from what behavior only supports as an inference.</p>
        </article>
        <article>
          <small>POINT OF VIEW</small>
          <p>Ask what the narrator can observe, what they cannot know directly, and where their perspective limits the account.</p>
        </article>
        <article>
          <small>THEME / INTERPRETATION</small>
          <p>Use repeated story evidence. A topic word alone is not a theme, and an interpretation still needs textual support.</p>
        </article>
      </div>
    </section>
  );
}
