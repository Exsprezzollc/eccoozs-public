# RD Curriculum Expansion + Evidence Board — v0.5.0

This milestone expands Reading Detective from a small proof curriculum into an explicit multi-stage skill map and makes **Show Your Evidence** a real interaction rather than a visual idea.

## Curriculum expansion

The shared skill graph now contains **50 reading skills** across:

- print awareness,
- phonemic awareness,
- decoding,
- vocabulary,
- sentence meaning,
- comprehension,
- evidence reasoning,
- source reasoning,
- argument analysis,
- legal language.

The graph is prerequisite-aware and presentation-stage compatible. A validation pass rejects missing prerequisites and cycles.

A new `curriculumMap` groups skills into stage-specific strands without turning those strands into rigid grade labels.

### Young Investigator

- Print & Listening Foundations
- Crack the Reading Code
- Words Become Meaning
- Understand & Prove

### Investigator

- Language Investigation
- Meaning & Structure
- Evidence & Sources
- Claims & Arguments

### Lead Investigator

- Document Analysis
- Terms, Conditions & Legal Language
- Analyze, Evaluate & Decide

Presentation stage remains separate from instructional skill. Older learners can still be routed to foundational prerequisites without visual demotion.

## Case expansion

The project now contains **14 data-driven cases**.

New Young Investigator cases:

- `CASE.ELEM.003` — **The Short-Vowel Labels**
- `CASE.ELEM.004` — **The Two-Letter Sound Clue**
- `CASE.ELEM.005` — **The Recipe Mix-Up**
- `CASE.ELEM.006` — **What Is the Notice Really About?**

New Investigator cases:

- `CASE.JR.003` — **The School Rumor**
- `CASE.JR.004` — **The Advertisement That Left Something Out**

New Lead Investigator cases:

- `CASE.LEAD.003` — **The Apartment Clause**
- `CASE.LEAD.004` — **The Warranty Exception**

The cases add sequence, causal language, main idea, supporting details, source identification, evidence relevance, corroboration, source purpose, claim recognition, evidence strength, legal permissions, defined legal terms, and warranty/termination reading.

## Evidence Board interactions

`InvestigationStep` can now carry an `evidenceBoard` contract.

### Sort board

Learners place evidence cards into meaning categories such as:

- Supports the main idea
- Unsupported
- Relevant evidence
- Weak / indirect evidence

The interaction supports drag/drop and a click-first accessible alternative.

### Compare board

Multi-source cases can sort source-linked cards into categories such as:

- Confirmed
- Possible
- Unsupported
- Unknown

This makes source comparison an actual reasoning action rather than another multiple-choice question.

### Evidence Zoom

Learners can prove an answer through the hierarchy:

**Source → Sentence → Phrase**

The engine grades each layer independently. A learner can therefore be correct about the source and sentence while still selecting the wrong phrase, which produces more precise learning evidence.

## Persistence

Evidence Board state is stored inside the resumable case session. Leaving and returning to a case preserves:

- placed evidence cards,
- selected source,
- selected sentence,
- selected phrase.

This maintains the existing Repair & Return and exact-resume requirements.

## Evidence Ledger

A submitted board produces the same append-only `EvidenceEvent` model as other Reading Detective interactions. Metadata records:

- evidence-board mode,
- correct target count,
- total target count.

The system therefore measures **how precisely the learner proved an answer**, not only whether a final answer was correct.

## Review continuity

New controlled review packs cover the added curriculum skills used by delayed-review cases, including short vowels, digraphs, blends, sequence, main idea, supporting details, evidence relevance/strength, source purpose/corroboration, claim recognition, legal permission, legal termination, and defined legal terms.

## Routing improvement

When an expanded case reveals an unmet prerequisite, routing now tries to identify a stage-compatible case that actually teaches that prerequisite. It no longer automatically falls back to the first case when a more relevant repair case exists.

## Verification

`npm run verify:curriculum-evidence` verifies:

- 50-skill expanded graph,
- acyclic prerequisites,
- curriculum strand validity,
- all 14 case schemas,
- sort-board grading,
- compare-board grading,
- source → sentence → phrase grading,
- partial evidence-zoom diagnosis,
- resumable Evidence Board state,
- stage case coverage.

`npm run verify:ui-static` performs an offline TypeScript/JSX structural check using permissive local React declarations. It is useful when the package registry is unavailable, but it is **not a substitute for a real Vite/browser run with installed React dependencies**.
