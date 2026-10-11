import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import type { ReadingCase } from "../../domain";
import { searchDocumentSections } from "../../engine";

export function DocumentNavigator({ readingCase }: { readingCase: ReadingCase }) {
  const [query, setQuery] = useState("");
  const config = readingCase.documentIntelligence;
  const results = useMemo(
    () => (query.trim() ? searchDocumentSections(readingCase, query) : []),
    [query, readingCase],
  );

  if (!config) return null;

  return (
    <aside className="document-navigator" aria-label="Document Navigator">
      <div className="document-navigator-heading">
        <div>
          <small>DOCUMENT NAVIGATOR</small>
          <strong>Find the section that matters.</strong>
        </div>
        <span>{config.sections.length} sections</span>
      </div>
      <label>
        Search this case packet
        <input
          type="search"
          value={query}
          placeholder="Try: cancellation, waiver, governing law…"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
        />
      </label>
      {!query.trim() ? (
        <div className="document-section-list">
          {[...config.sections]
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <span key={section.id}>{section.order}. {section.heading}</span>
            ))}
        </div>
      ) : results.length ? (
        <div className="document-search-results" aria-live="polite">
          {results.map((result) => (
            <article key={result.sectionId ?? result.sourceId}>
              <strong>{result.sectionHeading ?? result.sourceTitle}</strong>
              <span>{result.sourceTitle}</span>
              <small>Matched: {result.matchedTerms.join(", ")}</small>
            </article>
          ))}
        </div>
      ) : (
        <p className="quiet" aria-live="polite">No section matched those words. Try a broader term or a heading word.</p>
      )}
      <p className="quiet">Search helps you locate text. It does not decide what the clause means for you.</p>
    </aside>
  );
}
