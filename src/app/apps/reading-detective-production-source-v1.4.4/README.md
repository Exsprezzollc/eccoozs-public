## v1.4.2 — Pre-Reader First UX

The live production walkthrough showed that accessibility controls and narration existed, but Young Investigator still depended too heavily on written interface instructions. v1.4.2 makes the beginning experience voice + visual first: critical directions have large replay controls and automatic detective narration after interaction; Young Headquarters removes educator/developer language; child controls are icon-led; placement adds picture-supported choices where reading is not the target; Clue Lab is narrated; and the first CVC teaching path visibly uses sequencing and matching before independent decoding. Print remains on screen as reinforcement, but it is no longer the gatekeeper for knowing what to do.

## v1.4.2 Production Walkthrough Repair

The first real Windows/Vite production walkthrough exposed three presentation-layer blockers even though the learning engines were passing: the approved decorative environments were not visible in the live UI, narration was too narrow, and Teach-First practice was still overusing multiple-choice buttons. v1.4.2 closes those gaps with live stage environments, automatic/replayable detective narration, larger mentor presence, and real matching/sequencing interactions while preserving decoding-target audio guards.

# ECCOOZS Reading Detective

**Current version:** 1.4.4 — Production Hardening (phoneme-audio architecture, encoding/production activities, grown-up + data controls, evidence terminology, narration/motion regression tests)

Reading Detective is a data-driven reading, comprehension, evidence, and reasoning learning system. It begins with true reading foundations and grows into source analysis, legal/document reading, research/media literacy, applied reading, and evidence-based decision making. The architecture keeps **presentation age separate from instructional need**, so older learners can repair foundational gaps without being placed in a childish interface.

## Current engineering status

- **82 prerequisite-aware skills**
- **36 data-driven cases**
- **30/30 Young Investigator curriculum skills with Teach-First coverage**
- **33/33 Investigator curriculum skills with Teach-First coverage**
- **54/54 Lead Investigator curriculum skills with Teach-First coverage**
- Append-only Evidence Ledger with derived mastery
- Adaptive first-investigation placement with separate print/audio/mixed evidence
- Discover → Explain → Model → Together → Supported → Independent → Transfer teaching engine
- Least-intrusive support ladder and diagnostic probes
- Targeted Clue Labs with exact Repair & Return
- Controlled content variation and natural spaced review
- Evidence Board sorting, source comparison, and source → sentence → phrase proof
- Source Intelligence with provenance-aware corroboration and question-specific usefulness
- Document Intelligence with defined terms, obligations, permissions, conditions, exceptions, deadlines, waiver/liability/dispute/governing-law language
- Research, media, data, argument, literature, forms, procedures, civic notices, and decision intelligence
- Educator Insight based on actual skill evidence rather than grade-equivalent labels
- Persistent accessibility preferences, Case Map, Detective Notebook, reviews, teaching sessions, and learner state
- FBA/Caucasian detective appearance options without changing curriculum quality
- **Evidence-based Final Case readiness gates**
- **Mentor fade-out to on-request guidance as independence grows**
- **Cross-domain Final Case and competency-based graduation**
- **Automated Production QA engine**
- **36 local detective portraits** — FBA/Caucasian variants for all 18 detectives
- **Browser Speech Synthesis voices** with preview, voice selection, and detective-specific pacing
- **Interactive Chromium QA** across all three presentation stages and 360/768/1440px layouts
- **Content stress QA** generating 30,300 review items and 1,500 randomized learner routes
- **Deployment hardening** with pinned dependencies, Vite configuration, Vercel CSP/security headers, manifest, and persistence migration/failure guards

## v1.2 Final Case

**CASE.LEAD.019 — The Final Case: Opening Day Decision** combines:

- a board email
- a news article
- a city occupancy policy
- a facilities-manager statement
- a promotional advertisement
- a research brief
- a registration chart
- a vendor renewal agreement
- a timeline

The learner must determine what is confirmed, what remains conditional, whether repeated reports are truly independent, whether research supports causation, how numerical framing affects interpretation, what contract language actually requires, which argument assumptions fail, and what final recommendation the evidence justifies.

The capstone adds **no new skill**. It tests whether already-taught tools can work together independently.

## Capstone readiness

The Final Case is not unlocked by age, time spent, case count, or a hidden grade level. Readiness is derived from eight competency gates:

1. Meaning across text
2. Evidence precision
3. Source intelligence
4. Document & legal-language reading
5. Research, media & data
6. Argument reasoning
7. Decision reasoning
8. Applied reading

If a gate is not ready, Reading Detective identifies the specific remaining skill gap instead of forcing a complete curriculum replay.

## Graduation

Graduation is competency-based rather than a one-number test score. The Final Case evaluates whether the learner can independently:

- read rules, conditions, definitions, and obligations precisely
- trace and compare source origins
- calibrate research/media/data claims
- expose unsupported reasoning
- build and defend a decision with uncertainty and tradeoffs

Accurate work completed with substantial support is still preserved as real learning evidence; it simply triggers a request for more **independent** capstone evidence before graduation is awarded.

## Product rules encoded in the engine

1. Presentation age never determines instructional skill.
2. Instructional skill never forces a younger visual presentation.
3. One wrong answer cannot confirm a misconception.
4. Guided success alone cannot produce secure mastery.
5. Secure mastery requires independent transfer and delayed evidence.
6. Read-aloud cannot expose a decoding target during assessment.
7. Evidence history is append-only.
8. Case content is data, not custom page logic.
9. Placement is an investigation, not a learner-facing grade-level test.
10. Placement observations cannot by themselves award independent mastery.
11. Print and listening evidence remain distinguishable.
12. Asking for help is never punished, but support level remains visible in mastery evidence.
13. Capstone readiness is derived from demonstrated skills, not completion count.
14. Graduation requires cross-domain independent evidence rather than a single percentage.
15. A learner can revisit the Final Case without losing prior evidence.

## Run

```bash
npm install
npm run dev
```

## Verify

The engine/content verification targets do not require the React runtime:

```bash
npm run verify:all
```

Full production-oriented QA (engine/content + browser harness):

```bash
npm run qa:production
```

Individual suites:

```bash
npm run verify:core
npm run verify:vertical
npm run verify:placement
npm run verify:variation-routing
npm run verify:curriculum-evidence
npm run verify:teaching
npm run verify:educator-insight
npm run verify:junior-source
npm run verify:high-school-document
npm run verify:research-media-decision
npm run verify:curriculum-completeness
npm run verify:capstone-qa
npm run verify:production-assets
npm run verify:content-stress
npm run verify:ui-static
npm run verify:browser-qa
```

## Verification status

At v1.4.4, the engine/content suites, production-asset checks, 30,300-item content stress suite, offline React/JSX type check, and interactive system-Chromium QA all pass in this environment.

The browser QA drives the compiled Reading Detective UI through a dedicated local compatibility harness because npm package-network access remains unavailable here. The final **React 18 + Vite production build is still a release gate** and must be run on a networked build runner.

See [`docs/PRODUCTION-QA-REPORT.md`](docs/PRODUCTION-QA-REPORT.md) and [`docs/RD-PRODUCTION-HARDENING.md`](docs/RD-PRODUCTION-HARDENING.md) for the exact verification boundary.

## Architecture and milestone documents

- [`docs/ENGINEERING.md`](docs/ENGINEERING.md)
- [`docs/RD-VERTICAL-SLICE-1.md`](docs/RD-VERTICAL-SLICE-1.md)
- [`docs/RD-ADAPTIVE-PLACEMENT.md`](docs/RD-ADAPTIVE-PLACEMENT.md)
- [`docs/RD-CONTENT-VARIATION-REVIEW-ROUTING.md`](docs/RD-CONTENT-VARIATION-REVIEW-ROUTING.md)
- [`docs/RD-CURRICULUM-EVIDENCE-BOARD.md`](docs/RD-CURRICULUM-EVIDENCE-BOARD.md)
- [`docs/RD-TEACHING-ENGINE.md`](docs/RD-TEACHING-ENGINE.md)
- [`docs/RD-CURRICULUM-TEACHING-COVERAGE-EDUCATOR-INSIGHT.md`](docs/RD-CURRICULUM-TEACHING-COVERAGE-EDUCATOR-INSIGHT.md)
- [`docs/RD-JUNIOR-HIGH-TEACHING-SOURCE-INTELLIGENCE.md`](docs/RD-JUNIOR-HIGH-TEACHING-SOURCE-INTELLIGENCE.md)
- [`docs/RD-HIGH-SCHOOL-TEACHING-DOCUMENT-INTELLIGENCE.md`](docs/RD-HIGH-SCHOOL-TEACHING-DOCUMENT-INTELLIGENCE.md)
- [`docs/RD-RESEARCH-MEDIA-DECISION-INTELLIGENCE.md`](docs/RD-RESEARCH-MEDIA-DECISION-INTELLIGENCE.md)
- [`docs/RD-CURRICULUM-COMPLETENESS-LITERATURE-APPLIED-READING.md`](docs/RD-CURRICULUM-COMPLETENESS-LITERATURE-APPLIED-READING.md)
- [`docs/RD-CAPSTONE-PROGRESSION-GRADUATION-PRODUCTION-QA.md`](docs/RD-CAPSTONE-PROGRESSION-GRADUATION-PRODUCTION-QA.md)
- [`docs/RD-PRODUCTION-HARDENING.md`](docs/RD-PRODUCTION-HARDENING.md)
- [`docs/RELEASE-CHECKLIST.md`](docs/RELEASE-CHECKLIST.md)

The full product/interaction specification is preserved at [`docs/product-spec.md`](docs/product-spec.md), with locked visual references under [`docs/reference`](docs/reference).
