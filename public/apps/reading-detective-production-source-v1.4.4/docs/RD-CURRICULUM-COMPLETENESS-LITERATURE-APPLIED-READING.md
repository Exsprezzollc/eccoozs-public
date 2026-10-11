# RD Curriculum Completeness + Literature & Applied Reading Intelligence — v1.1.0

Reading Detective v1.1.0 closes important curriculum gaps that sit between decoding, comprehension, advanced analysis, and practical adult reading. The milestone adds explicit instruction and case contracts for high-frequency irregular words, punctuation-as-meaning, fluency for meaning, literary interpretation, procedures, forms, certifications/signatures, and civic notices.

## Curriculum coverage

The prerequisite-aware skill graph now contains **82 skills** and the case library contains **35 data-driven cases**.

Stage-facing Teach-First coverage is complete for the current curriculum:

- **Young Investigator:** 30 / 30 skills
- **Investigator:** 33 / 33 skills
- **Lead Investigator:** 54 / 54 skills

Presentation stage remains separate from instructional skill. Foundation skills continue to provide Young, Investigator, and Lead presentation variants so older learners can repair a reading gap without being visually demoted.

## Foundation completeness

Three explicit foundation skills were added:

- `CODE.010` — High-frequency irregular words
- `SENT.006` — Punctuation carries meaning
- `FLUENCY.001` — Phrase for meaning

High-frequency irregular-word instruction maps the parts that follow known sound/spelling patterns and the part that is not yet expected, rather than teaching whole-word visual shape memorization.

Fluency instruction is explicitly meaning-first. The curriculum treats accuracy, phrasing, punctuation, and expression as supports for comprehension and does not reward speed for its own sake.

## Literature Intelligence

A first-class Literature Intelligence domain and engine now support evidence-bound literary interpretation without reducing literature to one-answer trivia.

Contracts include:

- character motive with calibrated inference strength;
- narrative point of view and knowledge boundaries;
- theme as a supported statement rather than a one-word topic;
- tone/connotation tied to exact language;
- narrator reliability and contradiction without globally labeling a narrator a liar;
- ambiguity and symbolic interpretation with evidence-supported alternate readings.

The engine distinguishes `explicit`, `strongly-supported`, `plausible`, and `unsupported` literary conclusions. A motive can therefore be strongly supported while remaining an interpretation rather than a directly stated fact.

New literature skills:

- `LIT.001` — Character motivation from evidence
- `LIT.002` — Narrative point of view
- `LIT.003` — Theme versus topic
- `LIT.004` — Tone and connotation
- `LIT.005` — Narrator reliability and limits
- `LIT.006` — Ambiguity and symbolic interpretation

## Applied Reading Intelligence

A first-class Applied Reading domain and engine now model reading that has practical consequences.

The engine can represent and assess:

- required, prohibited, recommended, and optional instructions;
- procedure prerequisites and consequences of skipping required steps;
- required versus optional form fields;
- required certifications/signatures and the exact statement a signature affirms;
- public/civic notices: issuer, affected action, deadline, condition, and consequence.

New applied-reading skills:

- `PROC.001` — Required / prohibited / recommended / optional
- `PROC.002` — Procedure prerequisites and consequences
- `FORM.001` — Required and optional form fields
- `FORM.002` — Certification and signature meaning
- `CIVIC.001` — Read a public notice for action and deadline

These contracts extend the same Reading Detective principle used in legal/document reading: teach the learner to determine what the text actually requires or communicates without pretending to provide a professional legal, medical, or regulatory verdict.

## New cases

### Young Investigator

- `CASE.ELEM.007` — **The Tricky Word Note**
- `CASE.ELEM.008` — **The Punctuation Message**

### Investigator

- `CASE.JR.007` — **The Story Behind the Smile**
- `CASE.JR.008` — **Theme on Trial**
- `CASE.JR.009` — **The Procedure That Failed**

### Lead Investigator

- `CASE.LEAD.015` — **The Unreliable Account**
- `CASE.LEAD.016` — **The Equipment Shutdown**
- `CASE.LEAD.017` — **The Application Certification**
- `CASE.LEAD.018` — **The Public Notice Deadline**

## Learner-facing workspaces

Two neutral analysis panels are now integrated into the case workspace:

- **Literature Analysis Panel** — prompts the learner to inspect motive, point of view, theme, tone, narrator limits, and symbolic patterns without revealing the authored conclusion.
- **Applied Reading Panel** — surfaces procedure/form/public-notice reading tools without supplying the learner's answer.

Both panels preserve the same design rule as the Analysis Desk: the interface may expose the structure of the investigation, but it must not leak the engine's expected conclusion before the learner reasons through the evidence.

## Review routing

Natural delayed-review variation now covers the new foundation, literature, procedure, form, and civic-reading skills. These skills can reappear in later cases without sending the learner to a repetitive review worksheet.

## Verification

`npm run verify:curriculum-completeness` verifies:

- 82 prerequisite-aware graph skills;
- 35 data-driven cases;
- 30 / 30 Young Investigator Teach-First coverage;
- 33 / 33 Investigator Teach-First coverage;
- 54 / 54 Lead Investigator Teach-First coverage;
- high-frequency irregular word, punctuation, and fluency coverage;
- decoding read-aloud protection for `CODE.010`;
- literature intelligence validation and calibrated interpretation;
- theme evidence requirements;
- narrator contradiction handling;
- procedure prerequisite evaluation;
- form completion/certification evaluation;
- civic-notice extraction;
- delayed-review variation coverage;
- retired character-name hygiene.

The complete `npm run verify:all` suite continues to execute all previous milestone verification plus the new v1.1.0 suite and the offline React/JSX static TypeScript check.

## Browser-runtime boundary

The current environment still does not have installed React/Vite runtime dependencies. Node-based engine verification and the offline React/JSX TypeScript check pass. A full Vite/browser execution remains a separate production-validation step once dependencies can be installed.

## Next milestone

**v1.2 — Capstone Progression + Graduation Case + Production QA**

The next layer should connect the curriculum into a real completion pathway: capstone readiness, a multi-source Final Case, mentor fade-out, cross-domain evidence synthesis, graduation evaluation, content-authoring QA, coverage auditing, and browser-level end-to-end validation when runtime dependencies are available.
