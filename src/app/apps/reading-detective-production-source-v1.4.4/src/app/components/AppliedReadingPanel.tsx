import type { ReadingCase } from "../../domain";

export function AppliedReadingPanel({ readingCase }: { readingCase: ReadingCase }) {
  if (!readingCase.appliedReading) return null;
  return (
    <section className="analysis-desk" aria-label="Applied reading tools">
      <div className="panel-heading">
        <strong>Applied Reading Desk</strong>
        <span>Read the function of each instruction</span>
      </div>
      <div className="analysis-grid">
        <article>
          <small>PROCEDURE</small>
          <p>Mark required, prohibited, recommended, and optional language. Then check prerequisites before later steps.</p>
        </article>
        <article>
          <small>FORM</small>
          <p>Separate required, optional, and conditional fields. Read the exact sentence attached to any signature.</p>
        </article>
        <article>
          <small>NOTICE</small>
          <p>Find the issuer, affected group, action, deadline, condition, and any stated exception or consequence.</p>
        </article>
      </div>
    </section>
  );
}
