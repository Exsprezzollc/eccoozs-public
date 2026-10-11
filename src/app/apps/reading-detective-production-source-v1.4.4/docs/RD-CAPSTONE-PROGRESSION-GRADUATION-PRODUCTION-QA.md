# Reading Detective v1.2.0 — Capstone Progression + Graduation Case + Production QA

## Purpose

v1.2.0 converges the previously separate reading, evidence, source, legal/document, research/media/data, argument, applied-reading, and decision systems into a graduation pathway. The capstone introduces **no new reading skill**. It asks whether already-taught tools can be used together independently in a complex case packet.

## Capstone readiness is evidence-based

The Final Case is not unlocked by age, elapsed time, case count, or a hidden grade equivalent. `CapstoneProgression` defines eight readiness gates:

1. Meaning across text
2. Evidence precision
3. Source intelligence
4. Document & legal-language reading
5. Research, media & data
6. Argument reasoning
7. Decision reasoning
8. Applied reading

Each gate names existing skill IDs, a minimum mastery level, and the minimum number of those skills that must meet the threshold. `assessCapstoneReadiness()` derives readiness from the learner's current skill evidence.

A learner who is not ready is routed toward the first concrete skill gap. A learner who is ready can enter the Final Case without being forced through optional repetition.

## Mentor fade-out

`mentorPresenceFor()` reduces the detective's prominence as independent evidence grows. During the Final Case the detective becomes **on request** instead of leading each step. Asking the detective for a clue raises the recorded support level, so graduation evidence remains honest about whether the final reasoning was independent.

The learner is never punished for asking for help. Support simply means the system needs additional independent evidence before declaring graduation.

## The Final Case

**CASE.LEAD.019 — The Final Case: Opening Day Decision**

The learner receives a multi-source packet containing:

- board email
- neighborhood news article
- city occupancy policy
- facilities-manager statement
- promotional advertisement draft
- tutoring pilot research brief
- registration chart
- vendor renewal agreement
- case timeline

The investigation requires the learner to:

- distinguish a planned opening from confirmed public-occupancy approval
- prove a condition with source → sentence → phrase evidence
- trace a news claim back to its promotional origin instead of counting repetition as corroboration
- reject causal overclaiming from an observational pilot
- recalibrate a promotional “PROVEN” claim
- read both the absolute and relative registration increase and notice truncated-axis framing
- identify a contract obligation and apply a document-defined term
- expose an argument that substitutes popularity for official approval
- build a final recommendation from evidence, criteria, uncertainty, contract timing, and tradeoffs
- state an appropriately calibrated confidence level

## Graduation evaluation

Graduation is competency-based rather than score-based. `GraduationDefinition` currently evaluates five cross-domain competencies:

- Read the rule exactly
- Trace and compare sources
- Calibrate research and media claims
- Inspect reasoning
- Make a defensible decision

`evaluateGraduation()` counts unique capstone step targets completed correctly and independently. It also counts correct attempts completed with instructional support.

Possible outcomes:

- `in-progress`
- `needs-more-independent-evidence`
- `graduated`

A learner who reasons accurately with substantial support does not “fail.” Their existing evidence is retained and the capstone can be revisited to add the independent evidence that remains.

## Persistent graduation record

`LearnerProfile` now stores a compact graduation record containing status, Final Case ID, evaluation time, and competencies passed. The full append-only Evidence Ledger remains the source evidence beneath that summary.

## Production QA engine

v1.2.0 adds `runProductionQa()`. The automated audit currently checks:

- skill graph prerequisite integrity and cycles
- curriculum skill/case references and presentation compatibility
- every case against all case-engine validators
- duplicate source, step, and choice IDs
- correct-answer references
- teaching-module contracts
- Teach-First coverage for every curriculum skill in each presentation stage
- capstone case existence, stage, and capstone flag
- readiness-skill references and readiness thresholds
- graduation competency step references
- retired character-name hygiene
- learner-content patterns that would reintroduce stigmatizing grade-equivalent labeling

The QA engine emits a structured `ProductionQaReport` with check-level pass/fail and issue severity.

## Verification result

The v1.2 verification suite proves:

- Final Case case-contract validity
- readiness unlock from real skill evidence rather than case count
- a missing decision domain keeps the capstone locked
- mentor fade to on-request
- independent capstone work graduates
- heavily scaffolded but correct work requests more independent evidence rather than falsely awarding graduation
- production QA passes the complete authored content set

Current verified corpus:

- **82 prerequisite-aware skills**
- **36 data-driven cases**
- **30/30 Young Investigator curriculum skills with Teach-First coverage**
- **33/33 Investigator curriculum skills with Teach-First coverage**
- **54/54 Lead Investigator curriculum skills with Teach-First coverage**

## Browser-runtime boundary

`npm run verify:all` passes in the current environment, including the offline React/JSX static check. A normal `npm run build` cannot currently complete because the environment does not have local React/Vite packages and `npm install` times out. Full Vite/browser runtime validation therefore remains a separate release gate and is not being represented as complete.
