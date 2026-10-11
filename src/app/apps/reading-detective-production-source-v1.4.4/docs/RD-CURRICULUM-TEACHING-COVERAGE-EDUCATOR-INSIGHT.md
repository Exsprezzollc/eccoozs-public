# RD v0.7.0 — Curriculum Teaching Coverage + Educator Insight

This milestone expands Teach-First coverage across the complete Young Investigator foundation curriculum and turns the Evidence Ledger into a useful educator-facing instructional summary.

## 1. Foundation teaching coverage

All 27 foundation skills in the Young Investigator curriculum now have explicit Teaching Modules available in all three presentation stages:

- print meaning and directionality
- spoken-word awareness, rhyme, beginning sound, segmentation, blending
- letter-sound correspondence
- CVC decoding
- short vowels
- consonant digraphs and blends
- silent-e patterns
- vowel teams
- r-controlled vowels
- multisyllabic decoding
- contextual vocabulary and multiple meanings
- sentence meaning, pronoun reference, cause/result connectors
- explicit information, sequence, main idea, supporting details, inference
- evidence location

Existing modules for CVC decoding, sentence meaning, explicit information, and evidence location remain the canonical specialized versions; the new coverage fills the missing skills around them.

### Age dignity

Every foundation Teaching Module has Young Investigator, Investigator, and Lead Investigator variants. An older learner can therefore receive foundational instruction without being moved into a younger presentation stage.

### Audio-first phonemic instruction

Phonemic-awareness modules now support `audioText`. The spoken target is not placed in `sourceBody`, preventing the teaching UI from visually revealing the word that the learner is supposed to hear and analyze.

## 2. Educator Insight engine

`deriveEducatorInsightReport()` converts append-only evidence into an instructional report containing:

- strengths
- growing tools
- new tools
- review-needed skills
- recent successful Repair & Return transfers
- confirmed misconception evidence
- independent accuracy
- support-use distribution
- repeated print/listening performance patterns
- suggested next instructional focus
- curriculum teaching-coverage metrics

### Misconception guardrail

A single wrong response cannot appear as a confirmed misconception. Repeated similar errors can trigger a diagnostic probe, but when a misconception has a probe contract, the educator view does not label it confirmed unless that probe also provides confirming evidence.

### Modality guardrail

The educator engine waits for repeated evidence in both print and audio before surfacing a difference. It describes this only as an observed instructional access pattern and explicitly does not diagnose a disability or infer cause.

### No grade-equivalent output

The educator report uses component skills, evidence strength, support, transfer, and retention. It does not expose a `gradeLevel` or learner-facing grade-equivalent field.

## 3. Educator dashboard UI

The React shell now includes a Grown-Up / Educator view from both Welcome and Headquarters. The dashboard displays:

- independent performance
- support-use rate
- foundation teaching coverage
- pending retention checks
- suggested next focus and instructional response
- strengths and growing tools
- confirmed misconceptions only when evidence is sufficient
- recent repaired tools
- reading-vs-listening observations with non-diagnostic language
- educator guardrails

## 4. Verification

Run:

```bash
npm run verify:educator-insight
```

The verification proves:

- 27/27 foundation curriculum skills have Teach-First modules
- every foundation module supports all three presentation stages
- phonemic teaching is audio-first
- Lead Investigator foundation coverage remains complete
- one error cannot create a confirmed misconception
- repeated errors alone do not create a confirmed label; a failed diagnostic probe confirms probed misconception patterns
- supported attempts are separated from independent performance
- modality observations require repeated evidence and explicitly avoid diagnosis
- successful Clue Lab transfer appears as a repaired-tool insight
- retired character names remain absent from the expanded teaching corpus

`npm run verify:all` also includes this milestone verification and the offline React/JSX static check.
