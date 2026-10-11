# RD v0.8.0 — Junior High Teaching Coverage + Source Intelligence

This milestone completes explicit Teach-First coverage for the Junior High **Read, Investigate & Reason** curriculum and adds a first-class Source Intelligence model for provenance, question-specific source usefulness, corroboration, conflict, and perspective.

## 1. Junior High Teach-First coverage

The Investigator curriculum now exposes 27 explicit skills, and all 27 have Teaching Modules that support both:

- `investigator`
- `lead-investigator`

The Lead Investigator variants are deliberate: an older learner who needs a Junior High morphology, evidence, source, or argument repair receives mature presentation without being visually demoted.

New explicit teaching modules cover:

- prefixes
- suffixes
- roots and word families
- relevant evidence
- evidence strength
- evidence versus assumption
- identifying source origin
- source purpose
- corroboration
- perspective and bias
- source usefulness by question
- claims
- reasons
- matching evidence to claims

These join the existing foundation/shared modules for multisyllabic decoding, context, multiple meanings, sentence connectors, comprehension, and evidence location.

## 2. Source Intelligence domain

`SourceIntelligenceMetadata` now lets a case describe source attributes without reducing a source to a global trust score:

- creator
- purpose
- proximity to the information (`official-record`, `firsthand`, `secondhand`, `summary`, `repost`, `unknown`)
- independence key / underlying origin
- original-source relationship
- interest/context notes

### Question-specific Source Lens

A `SourceQuestionLens` asks how useful each source is **for one specific question**:

- direct
- supporting
- context
- limited
- not relevant

This encodes a core Reading Detective rule:

> A source can be highly useful for one question and weak for another.

For example, a company advertisement may be direct evidence of **what the company claims**, while an inspection report is more direct for **what inspectors found**.

No global `reliabilityScore` exists in the Source Intelligence model.

## 3. Provenance-aware corroboration

`corroborationForClaim()` groups repeated items by underlying `independenceKey` before counting agreement.

Therefore:

- three reposts of one original post are still one source origin;
- an original witness account plus a repost of that witness is not independent corroboration;
- two genuinely independent origins supporting the same claim can be represented as corroboration;
- independent origins pointing in different directions produce a disputed status;
- single-origin support remains single-origin support rather than being inflated by repetition.

The engine returns evidence status, not a universal truth verdict.

## 4. Perspective without automatic dismissal

The Teaching Engine now explicitly teaches that perspective, interest, or bias can affect framing, access, and emphasis **without proving every statement from that source false**.

Learners are taught to separate:

- what the source could observe;
- what the source is trying to do;
- what interest or relationship may matter;
- which specific claims can be independently checked.

## 5. New Junior High investigations

### CASE.JR.005 — Two Stories, One Incident

Learners compare two involved student accounts, a staff statement, and an independent doorway sensor log.

The case teaches:

- perspective and observation limits;
- question-specific source usefulness;
- independent corroboration;
- confirmed vs disputed vs unknown findings.

The same source set produces different usefulness judgments depending on whether the question is **who touched a backpack first** or **when staff arrived**.

### CASE.JR.006 — The Viral Screenshot

Learners trace a cropped screenshot and viral repost back to fuller source information.

The case teaches:

- creator vs original source;
- source purpose;
- missing context;
- source usefulness for a specific question;
- claim/evidence fit;
- why repetition of a screenshot is not independent confirmation.

## 6. Source metadata in the case UI

Source cards now surface neutral Source Intelligence metadata when available:

- Creator
- Purpose
- Origin/proximity
- Reposted source relationship

The UI does not display a global good/bad or reliable/unreliable score.

## 7. Validation

`validateSourceIntelligence()` checks:

- missing original-source references;
- duplicate lens IDs;
- missing lens questions;
- duplicate/missing lens source assessments;
- missing rationale;
- duplicate/missing claim-map references;
- case steps pointing to nonexistent source lenses or claim maps.

Source Intelligence validation is now part of normal case validation.

## 8. Verification

Run:

```bash
npm run verify:junior-source
```

The v0.8.0 verification proves:

- 27/27 Junior High skills have Teach-First coverage;
- every Junior High skill is teachable in Investigator and Lead Investigator presentation;
- Source Lens usefulness changes by question;
- no global reliability-score contract exists;
- reposts sharing an origin cannot manufacture independent corroboration;
- independent agreement and independent conflict produce distinct statuses;
- the two new Source Intelligence cases validate;
- retired character names remain absent from the expanded content.

`npm run verify:all` includes this milestone plus all prior Reading Detective verification suites and the offline UI static check.
