## v1.4.4 — Production Hardening

A stabilization release that hardens Reading Detective for controlled learner use without changing its instructional architecture, skill graph, placement/teaching/evidence/capstone engines, stage-aware presentation, or visual identity. All prior v1.4.3 functionality remains intact.

- **Production QA repair.** The interactive browser QA was stale against the current UI (it asserted the old `INVESTIGATION HEADQUARTERS` / `Continue Investigation` strings and the old accessibility panel). It now tests the actual interface stage-by-stage — Young Investigator (`🔎 HEADQUARTERS`, `▶ Continue My Case`, child controls) and Investigator / Lead Investigator (analyst wording, full controls) — across 360/768/1440px, and adds reduced-motion and narration speaking-state checks. Chromium is now resolved robustly (env override → system → bundled) so the suite runs on CI runners and locally.
- **Version normalization.** All references describing the current package are set to 1.4.4 (package.json, package-lock.json, README, install docs, release docs, verification output, start-here). Historical changelog entries and the historical `/* v1.4.2 — Pre-Reader First UX */` style marker are preserved. Dependency versions are unchanged.
- **Phoneme-audio architecture.** Instructionally critical pronunciation (phonemes, letter-sounds, digraphs, modeled decoding sequences, decodable/irregular words) is separated from ordinary narration. A curriculum-keyed manifest plus a deterministic resolution engine prefer approved human recordings and never present browser TTS as the authoritative pronunciation while a recording is pending; pending sounds voice a clearer, clearly-labelled approximation. Drop-in ready: add a recording and flip its status — no lesson-logic change. See `docs/RD-PHONEME-AUDIO-MANIFEST.md`.
- **Foundational production / encoding activities.** Added reusable word-building (grapheme tiles) and typed spelling interactions through the existing structured-answer path, with representative examples (young learners build `map`; the older-presentation variant types `sun`) and a short connected-text application (`The cat sat on a mat.`). Existing mastery/evidence protections are preserved — assisted construction is not counted as full mastery.
- **Connected-text support.** Foundational sequences can culminate in a short controlled sentence built from taught patterns.
- **Grown-up gate + learner data controls.** Entry to the educator/grown-up area now requires an intentional grown-up action (a simple arithmetic check) — honestly described as an accident-prevention speed-bump, not a security lock. The grown-up area adds clear, local-first data controls: view the current learner, export a readable summary and full JSON, reset progress, and delete all device data, each with an explicit warning and second confirmation. Browser QA executes both: reset clears progress but keeps the learner's detective and stage; delete removes every Reading Detective key; neither touches other site data.
- **Evidence terminology.** The learner/educator-facing heuristic percentage previously labelled "Evidence Confidence" is now "Evidence strength," with a note that it is a heuristic summary, not a statistically validated confidence measure or test score. Internal field names are unchanged to avoid migration risk.
- **Accessibility hardening.** A rendered-contrast audit found eight secondary/muted text colors below WCAG AA 4.5:1 on the cream backgrounds (worst 3.10:1), including the section eyebrow and `.quiet` captions. Each was darkened minimally with the same hue (now at least 4.60:1), preserving the visual identity. Rendered text contrast is now a permanent browser-QA gate across stages. Also raised shared and read-aloud controls to the 40px+ touch-target bar, corrected the decorative-image check, and made the touch-target check measure resting layout size so entrance animations cannot cause false results. (A full axe run and a manual screen-reader pass remain recommended on the release runner — see the release report.)
- **Narration + motion regression tests.** Added permanent unit tests for the speech callback lifecycle (start/end, end-on-error, repeat, disabled, unsupported) and static motion contracts (speaking-state guarding, reduced-motion kill-switches, retained keyframes, non-blocking/non-looping motion).
- **Security / privacy review.** Confirmed no network calls, analytics, trackers, `innerHTML`/`eval`, external resources, or secrets, and a strong Content-Security-Policy plus security headers. Local-first, minimal-data design preserved.
- **One authoritative QA gate.** `npm run qa:production` runs the full engine/content suite (now including phoneme-audio, encoding, and narration/motion), the strict UI type check, and the interactive browser QA.

## v1.4.3 — Unrushed Pacing + Purposeful Motion

Beginning readers are never pushed to act while directions are still being read, and the interface now uses gentle, meaning-carrying motion to hold attention. All animation is fully governed by the existing "Less Movement" control and OS reduced-motion setting.

- Added a live speaking state: while the detective reads aloud, the mentor portrait shows a soft "listening" ring and audio-wave cue, so a pre-reader is signalled to listen rather than answer. Speech-start/speech-end events now drive this state, with a per-utterance guard so narration that is replaced by newer narration cannot mis-clear the indicator.
- The primary "your turn" action stays calm while the mentor is speaking and only begins its gentle invite once narration has finished — separating "listen now" from "your turn" without any timers or auto-advance.
- Added a purposeful animation layer (previously the stylesheet had no keyframes): calm content entrance on each new screen/step, staggered choice reveal, and match/sequence pieces that visibly move into place so cause→effect is legible.
- Added a warm correct-answer celebration (with a star burst for Young Investigators) and a soft, non-punitive nudge on a retry. Both are purely decorative, remove themselves, and never advance the learner.
- Added tactile button-press feedback and a subtle shimmer on the readiness meter as it fills.
- All new motion inherits the existing reduced-motion kill-switches; decorative-only motion (speaking waves, star burst, meter shimmer) is hidden outright under reduced motion rather than merely shortened.
- No change to the learning engine, evidence rules, curriculum, placement, or QA contracts. All 17 engine/content verification suites, the strict UI type check, and the React 18 + Vite production build pass.

## v1.4.2 — Pre-Reader First UX

- Young Investigator critical navigation is voice + visual first.
- Added large Hear What To Do controls and automatic detective narration on post-click learner screens.
- Simplified Young Headquarters and moved Educator Insight out of child navigation.
- Added icon-led child controls for Voice, Bigger Words, Clear Screen, and Less Movement.
- Added narrated Clue Lab guidance.
- Added picture-supported young placement answers where decoding is not the target.
- First CVC Teach-First path now uses letter sequencing and letter-sound matching before independent decoding.
- Choice audio is available when it does not reveal a protected decoding target.
- Automatic narration use now records mixed-modality evidence instead of silently claiming print-only performance.
- Added pre-reader UX verification contract.

# Reading Detective Changelog

## v1.4.2 — Visual World + Narration + Interactive Learning Repair

Release-blocker repair after the first real production walkthrough.

- Restored age-specific decorative environments into the live application: warm Elementary library/workshop, Junior High investigation loft, and High School research suite.
- Expanded the chosen detective from a tiny teaching avatar into a visible mentor panel with replayable guidance.
- Added automatic narration for Teach-First explanations, models, practice directions, auditory clues, and case directions when narration is enabled.
- Preserved decoding-assessment protection: printed decoding targets are not automatically pronounced before the learner answers.
- Added permanent replay controls for explanations, model thinking, directions, sound clues, and case instructions.
- Added first-class matching and sequencing teaching interactions rather than rendering every practice item as multiple choice.
- Added sound-to-word, letter-to-sound, phoneme-order, and print-order interactions to foundational instruction.
- Added stage environment asset contracts and production QA for structured interactions and narration integration.
- Kept all prior adaptive placement, Teach-First, Repair & Return, Evidence Ledger, Source/Document/Research intelligence, educator insight, capstone, and graduation behavior intact.

## 1.3.0 — Production Runtime + Interactive QA + Accessibility Hardening

- Added 36 local detective portrait assets (18 detectives × FBA/Caucasian variants) extracted from the approved character-selection reference.
- Replaced initial-only detective placeholders with real portrait rendering plus graceful fallback initials.
- Added a browser Speech Synthesis voice engine with detective-personality pacing/pitch, persisted voice selection, and voice preview controls.
- Added learner-profile migration/normalization so older stored profiles gain new accessibility defaults without losing evidence.
- Added skip navigation, screen-change focus management, aria-pressed selection states, live feedback regions, stronger focus-visible treatment, 44px interaction targets, and mobile overflow hardening.
- Added responsive QA for 360px, 768px, and 1440px layouts across all three presentation stages.
- Added an executable Chromium interaction harness that covers onboarding, detective/appearance selection, voice preview, adaptive placement, Headquarters, case entry, wrong-answer feedback, accessibility controls, keyboard navigation, and responsive overflow.
- Added a controlled-content stress suite generating 30,300 review items, validating all 36 cases, and exercising 1,500 randomized learner routes.
- Added production asset/voice contract verification for all detective variants and browser speech fallback.
- Added pinned React/Vite/TypeScript dependency versions, Vite production configuration, web app manifest, and Vercel security headers/CSP.
- Added a no-crash localStorage write fallback so quota/privacy failures do not terminate a learning session.
- Added browser-QA build tooling that works in this restricted environment without npm-installed React/Vite packages.
- Preserved one explicit release boundary: the real Vite + React 18 production build still requires dependency installation; npm package download remains unavailable in this execution environment.

## 1.2.0 — Capstone Progression + Graduation Case + Production QA

- Added evidence-based capstone readiness gates across meaning, evidence, source, document/legal, research/media/data, argument, decision, and applied-reading domains.
- Added `CASE.LEAD.019 — The Final Case: Opening Day Decision`, a nine-source cross-domain investigation.
- Added capstone-aware routing so the Final Case is excluded from ordinary case progression until readiness is established.
- Added mentor fade-out: the detective becomes on-request during the Final Case rather than leading each step.
- Mentor-help requests now raise the recorded support level so graduation evidence remains honest about independence.
- Added competency-based graduation evaluation instead of a single percentage score.
- Added persistent learner graduation summary and capstone-retry behavior that preserves prior evidence.
- Added `runProductionQa()` with architecture, curriculum, case, teaching, capstone, identifier, content-hygiene, retired-name, and learner-label audits.
- Added `verify:capstone-qa` and included it in `verify:all`.
- Expanded case library from 35 to 36 while retaining 82 prerequisite-aware skills.
- Added Final Case readiness UI, locked/unlocked Case Map behavior, mentor-on-request UI, graduation screen, and progress readiness gates.
- Added explicit production QA report and capstone engineering documentation.
- Preserved the validation boundary: all executable engine/content/static suites pass; full Vite/browser runtime remains unverified because React/Vite dependencies cannot be installed in the current environment.

## 1.1.0 — Curriculum Completeness + Literature & Applied Reading Intelligence

- Expanded the skill graph from 68 to 82 prerequisite-aware skills.
- Expanded the case library from 26 to 35 cases.
- Added high-frequency irregular-word instruction that maps regular and temporarily irregular sound-spelling parts rather than teaching whole-word shape guessing.
- Added punctuation-as-meaning and fluency-for-comprehension instruction without speed-for-speed's-sake scoring.
- Added Literature Intelligence for motive, point of view, theme, tone, narrator limits, ambiguity, symbolism, and defensible alternate interpretations.
- Added Applied Reading Intelligence for procedures, prerequisites, forms, certification statements, signatures, and civic notices.
- Added Young, Investigator, and Lead Investigator cases covering the new curriculum.
- Added `verify:curriculum-completeness` and retained Teach-First coverage across all stage curriculum skills.

## 1.0.0 — Research, Media & Decision Intelligence

- Expanded the skill graph from 51 to 68 prerequisite-aware skills.
- Expanded Lead Investigator curriculum coverage from 26 to 43 skills, all with Teach-First modules.
- Added media literacy for headline/source calibration, certainty language, and restored digital context.
- Added research literacy for study design, measured outcomes, correlation vs causation, sample scope, and conflict-of-interest context.
- Added data literacy for absolute vs relative change, graph scale/framing, and chart-text consistency.
- Added argument instruction for unstated assumptions, counterclaim/rebuttal, and reasoning flaws.
- Added Research/Media/Decision domain contracts and validation.
- Added authored evidence-calibration engines without a global truth or reliability score.
- Added a neutral learner-facing Analysis Desk that exposes raw study/data details without leaking the derived answer.
- Added a Decision Workbench that grades evidence, criteria, and tradeoff acknowledgment rather than a universal preferred option.
- Added CASE.LEAD.007 through CASE.LEAD.014: Study Behind the Headline, Graph That Shouts, Sponsored Study, Polished AI Answer, Argument Trap, Which Job Offer?, Decision We Cannot Finish Yet, and Two Defensible Plans.
- Added explicit support for insufficient-evidence conclusions and multiple defensible conclusions from the same packet when priorities differ.
- Expanded natural review variation coverage for all new research/media/data/argument/decision skills.
- Added `verify:research-media-decision` and included it in `verify:all`.

## 0.9.0 — High School Teaching Coverage + Document Intelligence

- Completed Teach-First coverage for all 26 skills currently assigned to the Lead Investigator curriculum.
- Added explicit Lead Investigator modules for permission/rights, waiver, liability/responsibility language, termination/cancellation, arbitration, and governing-law/jurisdiction language.
- Added first-class Document Intelligence domain contracts for sections, rules, question lenses, defined terms, parties, conditions, deadlines, consequences, and professional-review guardrails.
- Added document-section search so learners can practice purposeful scanning rather than reading every document linearly.
- Added `definedTermForCase()`, `documentRulesForParty()`, and `documentQuestionForCase()` engines.
- Added a Document Navigator to the High School case workspace.
- Expanded The Auto-Renewing Subscription, The Apartment Clause, and The Warranty Exception with Document Intelligence metadata.
- Corrected the Warranty Exception skill mismatch so a warranty exclusion is no longer recorded as termination/cancellation evidence.
- Added CASE.LEAD.005 — The Waiver Clause.
- Added CASE.LEAD.006 — The Dispute Clause.
- Added natural review variations for waiver, liability language, arbitration, and governing-law reading.
- Added `verify:high-school-document` and included it in `verify:all`.
- Preserved the legal-language boundary: no enforceability score, no legal verdict, and explicit professional-review recommendations for consequential clauses.

## 0.8.0 — Junior High Teaching Coverage + Source Intelligence

- Completed Teach-First coverage for all 27 Investigator curriculum skills.
- Added Investigator and Lead Investigator variants for all Junior High-specific morphology, evidence, source, and argument modules.
- Added `SOURCE.005` — source usefulness by question — so a source is evaluated against the information need rather than given one global reliability label.
- Added Source Intelligence metadata for creator, purpose, information proximity, provenance/independence, original-source relationships, and relevant interest/context notes.
- Added question-specific Source Lenses with direct/supporting/context/limited/not-relevant classifications.
- Added provenance-aware corroboration that counts independent origins rather than repost volume.
- Added explicit disputed, corroborated, single-origin, uncertain, and unsupported claim states without turning the engine into a universal truth scorer.
- Added neutral Source Intelligence metadata strips to case source cards.
- Added `CASE.JR.005 — Two Stories, One Incident` and `CASE.JR.006 — The Viral Screenshot`.
- Expanded review variation coverage for perspective, source usefulness, and claim/evidence matching.
- Added Source Intelligence validation to normal case validation.
- Added `verify:junior-source` and included it in `verify:all`.

## 0.7.0 — Curriculum Teaching Coverage + Educator Insight

- Expanded Teach-First coverage to all 27 Young Investigator foundation skills.
- Added Young, Investigator, and Lead Investigator presentation variants for every foundation Teaching Module.
- Added audio-first phonemic Teaching Module support so spoken targets can remain out of printed source text.
- Added explicit teaching for print awareness, phonemic awareness, letter-sound correspondence, advanced foundational decoding patterns, vocabulary, sentence relationships, sequence, main idea, supporting details, and inference.
- Added `EducatorInsightReport` domain contracts and derivation engine.
- Added strengths, growing tools, review-needed skills, recent repairs, confirmed misconception evidence, support-use summaries, independent performance, modality observations, next-focus guidance, and teaching-coverage metrics.
- Added confirmation guardrails so repeated errors trigger investigation but probed misconceptions are not labeled confirmed in the educator view until diagnostic-probe evidence confirms them.
- Added repeated-evidence guardrails and non-diagnostic language for print/listening differences.
- Added a Grown-Up / Educator dashboard to the React shell.
- Added `verify:educator-insight` and included it in `verify:all`.

## 0.6.0 — Teach-First Adaptive Instruction

- Added a first-class Teaching Module and Teaching Session domain model.
- Added Discover → Explain → Model → Together → Supported → Independent → Transfer sequencing.
- Added adaptive phase entry based on existing mastery evidence.
- Added eight initial Teaching Modules spanning foundational reading, comprehension, evidence, sentence reasoning, and legal language.
- Added age-respecting CVC, sentence-meaning, explicit-information, and evidence-location presentations across all three stages.
- Added a case-step Teach First gate so untaught skills are not independently tested before instruction.
- Added persisted teaching sessions and exact return-to-case bookmarks.
- Added `presented` Evidence Ledger outcome and prevented instruction exposure from inflating mastery.
- Added Detective Notebook unlocks and delayed-review scheduling after teaching completion.
- Added teaching-aware activity routing for new skills, developing skills, and prerequisite gaps.
- Added `verify:teaching` and included it in `verify:all`.

## 0.5.0 — Curriculum Expansion + Evidence Board

- Expanded the skill graph to 50 prerequisite-aware reading skills.
- Added explicit Elementary, Junior High, and High School curriculum strands.
- Expanded the case library from 6 to 14 cases.
- Added persisted Evidence Board sort, compare, and source → sentence → phrase interactions.
- Added evidence-board grading metadata to the append-only Evidence Ledger.
- Added stage-compatible prerequisite case routing.
- Expanded delayed-review variation coverage for the new curriculum.
- Added curriculum/evidence verification and offline UI static verification.

## 0.4.0 — Content Variation + Review Routing

- Added deterministic controlled-randomization templates with stable scenario fingerprints.
- Added age-compatible variation scenarios and deterministic answer-choice shuffling.
- Added recent-fingerprint avoidance so repeated review does not immediately reuse the same surface item.
- Added structural validation for variation templates.
- Added due-review routing with active-case resume priority and repair-follow-up priority.
- Added review deduplication so replayed cases do not stack duplicate pending reviews.
- Added natural delayed-review evidence with variation metadata.
- Added adaptive case scoring, secure-skill skipping, and transfer sampling for already-strong skills.
- Added sampled Case Sessions that jump to transfer/application instead of forcing a complete replay.
- Added three new cases: The Playground Sign, The Changed Schedule, and The Auto-Renewing Subscription.
- Added controlled review packs for decoding, sentence meaning, explicit information, evidence location, contrast, conditions, evidence boundaries, and legal obligations.
- Wired Headquarters Continue Investigation through the shared activity router.
- Added `verify:variation-routing` and extended `verify:all`.

## 0.3.0 — Adaptive Placement

- Added persisted, data-driven adaptive placement plans for Young Investigator, Investigator, and Lead Investigator.
- Added print, audio, and mixed evidence modalities.
- Added paired print/listening checks so the engine can distinguish print-access breakdown from meaning breakdown.
- Added age-respecting foundational routing inside placement without changing presentation stage.
- Added `PlacementSummary` to the learner model with recommended instructional skill and supported print-access observations.
- Added modality-aware skill definitions and mastery derivation.
- Prevented placement and diagnostic evidence from inflating independent/secure mastery.
- Added placement persistence and resume.
- Wired the React flow through detective selection → adaptive first investigation → Detective Toolkit result → Headquarters.
- Added narration-use tracking so read-aloud comprehension evidence is recorded as mixed rather than independent print evidence.
- Added `verify:placement` and `verify:all`.

## 0.2.0 — RD Vertical Slice 1

- Added resumable Case Session reducer and persisted case checkpoints.
- Added reread, attention-cue, and concept-reminder support ladder.
- Added diagnostic-probe flow before targeted remediation.
- Added interactive guided and transfer phases to Clue Labs.
- Added exact Repair & Return bookmarks.
- Added Notebook, Case Map, and review-scheduling data models and persistence.
- Added live accessibility controls and decoding-aware narration guard to the React flow.
- Added explicit transfer item to The Missing Library Book.
- Added age-respecting foundational CVC repair path inside The Lost Delivery.
- Added `verify:vertical` end-to-end engine verification.
