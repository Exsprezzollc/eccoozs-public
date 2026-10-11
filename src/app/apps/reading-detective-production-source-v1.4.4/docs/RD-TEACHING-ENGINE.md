# RD Teaching Engine — v0.6.0

Reading Detective now enforces the core instructional rule:

> **Teach first → demonstrate → practice together → supported attempt → independent application → transfer → delayed review.**

## What changed

### Data-driven Teaching Modules
Teaching is now represented as curriculum data instead of one-off screen logic. A `TeachingModule` declares:

- target skill
- supported presentation stages
- age-respecting presentation variants
- discover / explain / model content
- together / supported / independent / transfer practice
- Detective Notebook tool unlocked after completion

The same reading skill can therefore use a Young Investigator, Investigator, or Lead Investigator presentation while preserving one instructional mechanism.

### Teaching Session engine
`TeachingSession` persists:

- learner
- module
- presentation stage
- exact phase
- completed phases
- practice attempts
- optional case-and-step return bookmark
- completion timestamps

An interrupted lesson can resume instead of restarting.

### Adaptive entry
Instruction does not always restart at Discover.

- `not-introduced` / `introduced` → Discover
- `guided` / `developing` / `review-needed` → Supported
- `independent` / `transferred` → Transfer
- `secure` → Complete / no unnecessary lesson

This prevents strong learners from being forced through teaching they have already demonstrated.

### Teach-before-test gate
A normal case step with an untaught skill no longer exposes the assessment controls. The case shows a **Teach First** gate, launches the relevant Teaching Module, preserves the exact case position, and returns the learner to that clue after the tool is strengthened.

### Instruction evidence does not inflate mastery
The Evidence Ledger now supports a `presented` outcome. Discover / Explain / Model exposures are recorded as `instruction` evidence, but they cannot make a learner Guided, Independent, Transferred, or Secure merely for seeing instruction.

Performance mastery still comes from what the learner actually demonstrates.

### Teaching → Notebook → Review
Completing a Teaching Module:

1. updates the derived skill state,
2. unlocks the associated Detective Notebook tool,
3. schedules a delayed retention check,
4. returns to the exact interrupted case when applicable.

## Initial Teaching Module library

v0.6.0 includes eight explicit modules:

1. CVC decoding — all three presentation stages
2. Sentence meaning — all three stages
3. Explicit information — all three stages
4. Locate evidence / Show Your Evidence — all three stages
5. Contrast connectors — Junior High + High School
6. Conditional language — Junior High + High School
7. Legal obligations — High School
8. Defined legal terms — High School

The CVC module is deliberately implemented across all three presentations to prove the age-dignity requirement. A Lead Investigator receives logistics / dispatch language, not a child-themed lesson, while learning the same foundational decoding mechanism.

## Verification

`npm run verify:teaching` confirms:

- structural validity of all Teaching Modules
- full phase order
- adaptive phase entry
- instruction exposure does not inflate performance mastery
- guided/support success does not award independent mastery
- independent + transfer evidence produces transferred, not secure, mastery
- Lead Investigator foundational teaching does not alter presentation stage
- activity routing selects teaching before an untaught case skill
- retired character names do not leak into teaching content

`npm run verify:all` includes the Teaching Engine suite plus all prior milestone suites.

## Browser status

The React Teaching screen and Teach First case gate pass the repository's offline TypeScript / JSX static verification. Full Vite browser execution still requires the React/Vite dependencies to be installed in an environment with npm registry access.
