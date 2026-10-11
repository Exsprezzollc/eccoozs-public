# Reading Detective — Engineering Foundation

## Architecture rule

**Content is not logic.** Curriculum files declare target skills, evidence sources, response forms, misconception traps, and repair links. Shared engines decide routing, support, mastery, remediation, and evidence interpretation.

## Domain boundaries

### Learner
Stores presentation stage, reading development, chosen detective, appearance, accessibility settings, and derived skill state.

### Skill graph
Every skill has a stable ID and prerequisite edges. The graph allows the routing engine to move backward to the smallest missing prerequisite without changing the learner's age presentation.

### Evidence Ledger
Every meaningful learning interaction becomes an immutable evidence event. Mastery is derived from accumulated evidence rather than saved as a permanent boolean.

### Misconceptions
A wrong answer is not automatically a diagnosis. Repeated matching errors trigger a diagnostic probe. A confirmed misconception links to a Clue Lab.

### Case Engine
Cases are structured data. A case can contain notices, messages, documents, charts, timelines, audio, or images and can use multiple response forms.

### Clue Lab
A focused repair lesson teaches one exact concept and returns the learner to the original case state.

### Detective system
Detectives control presentation and dialogue style only. They do not change curriculum quality, mastery rules, or skill routing.

## Initial invariant set

- RD-001: Presentation age never determines instructional skill.
- RD-002: Instructional skill never forces younger presentation.
- RD-003: One wrong answer alone cannot confirm a misconception.
- RD-004: Confirmed misconceptions require evidence and a probe.
- RD-005: Guided performance alone cannot award independent mastery.
- RD-006: Secure mastery requires transfer and delayed evidence.
- RD-007: Help use must never reduce earned learning evidence.
- RD-008: Read-aloud cannot expose decoding targets during assessment.
- RD-009: Skipped content is never equivalent to mastery.
- RD-010: Presentation changes do not modify skill evidence.
- RD-011: Detective changes do not modify curriculum state.
- RD-012: Appearance changes do not modify curriculum state.
- RD-013: Clue Lab must return to the exact interrupted case context.
- RD-014: Evidence history is append-only.
- RD-015: Learner-facing grade-equivalent labeling is not part of the core model.

## Next engineering milestone

**RD Vertical Slice 1**

1. Persist learner and evidence state through repository abstraction.
2. Build case-state reducer with resumable checkpoints.
3. Implement diagnostic-probe UI instead of immediately opening Clue Lab after a first wrong response.
4. Implement three support levels before reteach: reread → attention cue → concept reminder.
5. Add explicit transfer item and delayed-review scheduling metadata.
6. Add Case Map and Detective Notebook data stores.
7. Replace text avatar placeholders with approved character asset bundles.
8. Add accessibility controls to the live UI.
9. Add automated browser tests for the full Missing Library Book journey.
10. Add a lead-investigator foundational repair case proving age-respecting remediation end to end.

## RD Vertical Slice 1 — implemented

The first adaptive vertical slice is now wired through the production contracts rather than hard-coded screen behavior.

Implemented:

- Resumable `CaseSessionState` with persisted step index, per-step attempts, support level, pending diagnostic probe, repair bookmark, and completion state.
- Explicit least-intrusive support ladder: `independent → reread → attention-cue → concept-reminder`.
- Diagnostic probes occur only after repeated matching errors **and** after the support ladder has been exhausted.
- A failed probe opens the exact targeted Clue Lab; a successful probe returns to the case without unnecessary reteaching.
- Clue Labs now contain real guided-practice and transfer items rather than explanatory text only.
- Repair & Return preserves the exact interrupted case, step index, step ID, and pre-repair support level.
- Notebook tools are unlocked from completed Clue Labs.
- Delayed retention checks are represented by scheduled review records; repaired skills also receive a shorter follow-up review.
- Local persistence now covers learner profiles, append-only evidence, case sessions, Detective Notebook entries, Case Map progress, and scheduled reviews.
- The live React flow now includes resumable cases, diagnostic probes, support cues, Clue Lab practice, transfer, Notebook, Case Map, progress, and accessibility controls.
- `The Missing Library Book` now includes an explicit transfer item and delayed-review metadata.
- `The Lost Delivery` contains a mature-presented CVC decoding check and targeted CVC Clue Lab, proving that a Lead Investigator can receive foundational repair without changing presentation stage.

### Runtime verification

`npm run verify:core` verifies the foundation invariants and persistence contracts.

`npm run verify:vertical` walks the age-respecting repair sequence:

`wrong response → reread → attention cue → concept reminder → diagnostic probe → targeted Clue Lab → guided practice → transfer → exact return to interrupted case`.

Both verification scripts pass in the current build.

### Browser build status

The environment could not resolve the npm registry (`EAI_AGAIN` while requesting `registry.npmjs.org`), so React/Vite dependencies could not be installed in this session. Core TypeScript compilation and both Node runtime verification suites pass. The React application source was also static-type checked against temporary local React declarations to catch application-level TypeScript errors. Full Vite/browser execution should be run as soon as registry access is available; this is the remaining validation item for Vertical Slice 1.

## RD Adaptive Placement — implemented in 0.3.0

The first investigation is now a real adaptive placement engine rather than a fixed entry case.

Key contracts:

- Placement stage must match learner presentation stage (`RD-016`).
- Placement uses data-driven probes and transitions, not hard-coded page routing.
- Print and listening evidence are stored separately.
- A paired listening success after a print failure may establish a **print-access gap observation**, but the engine does not infer a diagnosis or disability.
- Placement evidence may inform confidence/developing state but cannot award independent, transferred, or secure mastery.
- A Lead Investigator can route to phonemic/decoding checks while remaining in Lead Investigator presentation.
- Completed placement stores a recommended instructional skill rather than a learner-facing grade equivalent.
- Placement sessions are resumable through the same repository abstraction as cases.

## RD Content Variation + Review Routing — implemented in 0.4.0

The curriculum can now vary surface content while preserving known instructional and diagnostic contracts. Variation templates use stable scenario fingerprints, deterministic selection, recent-item avoidance, and deterministic choice shuffling.

The activity router now follows the production priority order:

`active case → due repair follow-up → due retention check → highest-need compatible case → transfer sample → complete`

Secure skills are not replayed merely to create activity. Independent/transferred skills can be sampled at transfer/application instead of forcing a full case replay. Delayed reviews appear as new contextual clues and contribute `delayed-review` evidence. Duplicate pending reviews are prevented.

Three additional cases now provide multiple routing destinations per stage: The Playground Sign, The Changed Schedule, and The Auto-Renewing Subscription.

`npm run verify:variation-routing` validates deterministic variation, non-repetition, choice shuffling, deduplication, routing priority, secure-skill skipping, and transfer sampling.

### Next engineering milestone

**RD Curriculum Expansion + Evidence Board Interactions**

1. Expand the Elementary skill graph and content from true print awareness through phonics, sentence meaning, fluency, and early comprehension.
2. Add evidence highlighting at source → sentence → phrase granularity.
3. Add drag/sort Evidence Board interactions for confirmed / possible / unsupported / need-more-information.
4. Add structured source comparison and contradiction links for Junior High.
5. Add the High School document workspace for conditions, obligations, exceptions, legal terms, and multi-source cases.
6. Add browser-level journey verification once React/Vite dependency installation is available.


## RD Curriculum Expansion + Evidence Board — implemented in 0.5.0

The curriculum graph now contains 50 prerequisite-aware skills and 14 cases. Evidence Board interactions support sorting, multi-source comparison, and source → sentence → phrase evidence zoom with persisted board state and Evidence Ledger grading metadata.

## RD Teach-First Adaptive Instruction — implemented in 0.6.0

Reading Detective now has a first-class Teaching Engine. Teaching Modules are content data; shared engine logic controls phase entry, persistence, performance evidence, return-to-case behavior, Notebook unlocks, and delayed review.

The production phase order is:

`Discover → Explain → Model → Together → Supported → Independent → Transfer → delayed review`

Important contracts added in this milestone:

- an untaught compatible case step is gated behind instruction rather than exposed as an independent test;
- instruction exposure is stored as `presented` evidence and cannot inflate performance mastery;
- prior evidence can enter a learner at Supported or Transfer instead of forcing the entire lesson;
- Teaching Sessions are resumable and can carry an exact case/step return bookmark;
- the same foundational Teaching Module may use age-respecting presentation variants without altering skill logic;
- completed teaching unlocks a Detective Notebook tool and schedules a retention check.

### Next engineering milestone

**RD Curriculum Teaching Coverage + Educator Insight**

1. Expand explicit Teaching Modules across the remaining Elementary foundational graph, including print awareness, phonemic awareness, letter-sound correspondence, short vowels, digraphs, blends, vowel patterns, vocabulary, sequence, main idea, supporting detail, and inference.
2. Add misconception-specific teaching branches inside Teaching Modules so a learner can receive different explanations for different error patterns before entering Clue Lab remediation.
3. Build the first real Learner Insight summary from Evidence Ledger patterns: strengths, developing skills, confirmed misconceptions, repaired tools, independent vs supported performance, and print vs listening comprehension.
4. Build the educator/parent dashboard read model without exposing stigmatizing grade-equivalent labels.
5. Add learner-created Detective Notebook notes for Junior High and High School.
6. Add browser-level journey tests when React/Vite dependencies are available.

## RD Junior High Teaching Coverage + Source Intelligence — implemented in 0.8.0

The Investigator curriculum now contains 27 explicit skills with Teach-First coverage in both Investigator and Lead Investigator presentation. Reading Detective can therefore repair Junior High morphology, evidence, source, and argument gaps in an older learner without presentation-age demotion.

Source Intelligence is now a first-class domain layer rather than a loose set of case prompts. It tracks creator, purpose, proximity, provenance/independence, original-source relationships, and question-specific usefulness. Source usefulness is relational to the question; the engine does not maintain a universal reliability score.

Corroboration now groups sources by underlying origin before counting agreement. Reposts of the same original source cannot manufacture independent confirmation. Claim maps can resolve to `corroborated`, `single-origin`, `disputed`, `uncertain`, or `unsupported` while intentionally avoiding a universal truth verdict.

Two new Junior High cases exercise the system:

- `CASE.JR.005 — Two Stories, One Incident`
- `CASE.JR.006 — The Viral Screenshot`

`npm run verify:junior-source` validates 27/27 teaching coverage, question-specific source usefulness, provenance-aware corroboration, independent conflict, Source Intelligence case contracts, and content-name hygiene.

## RD High School Teaching Coverage + Document Intelligence — implemented in 0.9.0

Lead Investigator Teach-First coverage was completed for the then-current 26-skill High School graph. Document Intelligence added authored sections, definitions, obligations, permissions, conditions, exceptions, deadlines, renewal/termination rules, waivers, liability language, arbitration, governing-law clauses, purposeful search, and professional-review guardrails without an enforceability or legal-verdict engine.

## RD Research, Media & Decision Intelligence — implemented in 1.0.0

The prerequisite-aware graph now contains **68 skills**, the case library contains **26 cases**, and the Lead Investigator curriculum exposes **43 skills with 43/43 Teach-First coverage**.

New first-class contracts cover:

- research design, measured outcomes, sample/population, relationship strength, and limitations;
- headline/source calibration, certainty, missing/cropped context, and single-origin amplification;
- quantitative baseline/comparison framing and graph-scale analysis;
- assumptions, counterclaims/rebuttals, and reasoning flaws;
- decision criteria, evidence chains, tradeoff acknowledgements, calibrated uncertainty, and multiple defensible conclusions.

The learner-facing Analysis Desk is intentionally neutral: it shows raw study/data/source structure but does not reveal the engine's derived expected conclusion before the learner responds.

The Decision Workbench grades the authored reasoning contract rather than a universal preference. It can therefore accept `insufficient evidence` when information is missing and can accept more than one option when the same case packet supports different explicit priorities.

`npm run verify:research-media-decision` validates these contracts. `npm run verify:all` continues to include all prior milestone suites plus the offline React/JSX static check.


## RD Curriculum Completeness + Literature & Applied Reading Intelligence — implemented in 1.1.0

The skill graph now contains **82 prerequisite-aware skills** and the case library contains **35 data-driven cases**. Stage-facing Teach-First coverage is complete for **30/30 Young Investigator**, **33/33 Investigator**, and **54/54 Lead Investigator** skills.

Foundation completeness now explicitly includes high-frequency irregular-word mapping, punctuation-as-meaning, and fluency phrasing. Fluency remains meaning-first and does not reward speed for its own sake.

Literature Intelligence adds evidence-calibrated character motive, point of view, theme versus topic, tone/connotation, narrator knowledge/reliability limits, ambiguity, and symbolic interpretation. It deliberately distinguishes an explicit fact from a strongly supported or merely plausible interpretation.

Applied Reading Intelligence adds procedure strength and prerequisites, form-field requirements, certification/signature meaning, and civic-notice action/deadline extraction. The learner-facing Literature Analysis and Applied Reading panels expose the structure of the task without leaking the authored conclusion.

Nine new cases exercise these contracts across all three presentations. `npm run verify:curriculum-completeness` validates the new skill/case counts, teaching coverage, decoding read-aloud protection, literary inference calibration, theme evidence requirements, procedure sequencing, form completion, civic notice extraction, review variation, and retired-name hygiene.

### Next engineering milestone

**RD Capstone Progression + Graduation Case + Production QA**

1. Add readiness gates that derive capstone eligibility from secure/transfer evidence rather than case-count completion.
2. Build the Final Case as a multi-source packet spanning article, email, policy, chart, advertisement, witness statement, agreement excerpt, and timeline.
3. Fade mentor prompting as the learner demonstrates independent investigation.
4. Add cross-domain evidence synthesis and graduation-level decision evaluation.
5. Add authoring/coverage QA so every case declares target skills, evidence paths, misconceptions, acceptable alternatives, and review behavior.
6. Add browser-level end-to-end verification when React/Vite dependencies can be installed.

## v1.2.0 — Capstone Progression + Graduation + Production QA

The architecture now includes a dedicated capstone layer rather than treating the last case as just another curriculum item.

### Capstone contracts

- `CapstoneProgression` defines evidence-based readiness gates.
- `assessCapstoneReadiness()` derives unlock state from real skill mastery.
- Capstone cases are excluded from ordinary case routing until readiness is established.
- A completed-but-not-yet-independent capstone can be reopened without discarding earlier evidence.

### Mentor fade

- `mentorPresenceFor()` derives the mentor's presentation level from readiness.
- The Final Case uses on-request mentoring.
- A requested mentor clue changes the step support level, preserving the distinction between accurate and independently demonstrated reasoning.

### Graduation

- `GraduationDefinition` maps capstone steps into cross-domain competencies.
- `evaluateGraduation()` requires independent correct evidence rather than a single percentage score.
- Supported success is retained as learning evidence but cannot silently masquerade as independent graduation.
- `LearnerProfile.graduation` persists the graduation summary.

### Production QA

- `runProductionQa()` performs cross-file content and architecture audits.
- QA is part of `npm run verify:all` through `verify:capstone-qa`.
- A full browser-runtime build remains a separate gate until React/Vite dependencies can be installed in the execution environment.
