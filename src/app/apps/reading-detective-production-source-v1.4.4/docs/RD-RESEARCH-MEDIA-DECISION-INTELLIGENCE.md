# RD v1.0.0 — Research, Media & Decision Intelligence

This milestone expands Lead Investigator from document/legal reading into **research literacy, media literacy, quantitative framing, argument analysis, and evidence-weighted decision making**. It deliberately avoids a hidden truth score: Reading Detective teaches learners to inspect what a source actually supports, how strongly it supports it, and what remains uncertain.

## 1. Lead Investigator teaching coverage

The Lead Investigator curriculum now exposes **43 prerequisite-aware skills**, and all 43 have Teach-First coverage.

The 17 new skills are:

### Media literacy

- `MEDIA.001` — headline versus source
- `MEDIA.002` — claim strength and certainty
- `MEDIA.003` — restore digital context

### Research literacy

- `RESEARCH.001` — identify what a study measured
- `RESEARCH.002` — distinguish correlation from causation
- `RESEARCH.003` — sample and generalization
- `RESEARCH.004` — conflict of interest without automatic dismissal

### Data literacy

- `DATA.001` — relative versus absolute change
- `DATA.002` — graph scale and framing
- `DATA.003` — chart-text consistency

### Argument analysis

- `ARG.004` — unstated assumptions
- `ARG.005` — counterclaim and rebuttal
- `ARG.006` — reasoning flaws

### Decision intelligence

- `DECISION.001` — identify decision criteria
- `DECISION.002` — build an evidence-weighted decision
- `DECISION.003` — calibrated confidence
- `DECISION.004` — defensible alternate conclusions

Every new skill follows the shared Teach-First sequence:

**Discover → Explain → Model → Together → Supported → Independent → Transfer**

## 2. Research Intelligence

A case can declare an authored `ResearchProfile` describing:

- research design
- sample size and population
- comparison group
- random assignment
- measured outcome
- stated finding
- relationship actually supported
- limitations

`assessResearchProfile()` derives the strongest relationship the authored evidence can support. Causal support is deliberately narrow: a source does not become causal merely because a headline uses causal wording.

Reading Detective does **not** assign a universal truth score to a study.

## 3. Media Intelligence

A `MediaClaimFrame` records a claim and the evidence it cites. It can represent instructional risks such as:

- headline stronger than source
- causation inferred from correlation
- sample overgeneralization
- relative change without absolute context
- missing or cropped context
- amplification of one underlying source
- unsupported certainty

`assessMediaCalibration()` compares the authored claim strength with the authored evidentiary contract. The engine is a curriculum instrument, not a general-purpose fact checker.

The learner-facing Analysis Desk intentionally shows **neutral source details only**. It does not reveal the engine's expected conclusion before the learner answers.

## 4. Quantitative and graph framing

A `QuantitativeFrame` preserves:

- baseline value
- comparison value
- unit
- reported relative change

The engine can calculate absolute and relative change so the learner can distinguish a dramatic percentage from the actual base-rate movement.

A `GraphFrame` preserves:

- axis minimum and maximum
- labels and values
- an authored visual-risk contract such as truncated axis or uneven scale

The learner-facing workspace exposes the raw scale and values, while the grading engine evaluates the reasoning separately.

## 5. Argument Intelligence

New teaching and case content explicitly develops:

- identifying what must be assumed for an argument to work
- separating a counterclaim from a relevant rebuttal
- explaining the reasoning problem before relying on a fallacy label

The goal is not “name the fallacy.” The learner must explain **what is wrong with the reasoning** and what evidence would improve it.

## 6. Decision Intelligence

A `DecisionModel` contains:

- explicit criteria
- available options
- evidence sources
- acceptable evidence chains
- required tradeoff acknowledgements
- optionally, insufficient-evidence as a legitimate result

`evaluateDecision()` does not grade a learner against one universal preferred option. It asks whether the chosen conclusion is supported by the declared evidence, criteria, and acknowledged tradeoffs.

This enables three important case types:

1. **Priority-specific decisions** — one option is defensible for the learner's stated priorities.
2. **Unresolved decisions** — the correct conclusion is that required information is missing.
3. **Multiple defensible decisions** — more than one option can be correct when different explicit priorities are used consistently.

## 7. New Lead Investigator cases

### CASE.LEAD.007 — The Study Behind the Headline

An observational study reports an association, while a headline claims proof of causation. The learner inspects design, sample, measured outcome, claim strength, and scope.

### CASE.LEAD.008 — The Graph That Shouts

A 50% relative decrease is real, but the learner must also identify the absolute change and inspect a narrow nonzero graph axis.

### CASE.LEAD.009 — The Sponsored Study

A manufacturer-funded study, company advertisement, and independent replication teach conflict-of-interest context, provenance, and genuine corroboration without assuming funded evidence is automatically false.

### CASE.LEAD.010 — The Polished AI Answer

A fluent generated summary says a policy guarantees remote work. The original policy says employees **may request** it and manager approval is required. The case teaches original-source verification and restored context.

### CASE.LEAD.011 — The Argument Trap

A proposal, counterclaim, survey evidence, and weak rebuttal teach assumptions, relevant rebuttal, personal attack, popularity reasoning, and evidence repair.

### CASE.LEAD.012 — Which Job Offer?

The learner weighs hours, tuition assistance, schedule, commute, and wage against stated priorities. The Decision Workbench grades the evidence chain and tradeoffs rather than mere button choice.

### CASE.LEAD.013 — The Decision We Cannot Finish Yet

A required operating-cost fact is absent. **Insufficient evidence** is the intended terminal conclusion.

### CASE.LEAD.014 — Two Defensible Plans

Both plans satisfy the hard requirement. Plan A costs less; Plan B recovers faster. The same packet can support either decision when the learner explicitly chooses the relevant priority, uses both plans as evidence, and acknowledges the corresponding tradeoff.

## 8. UI additions

### Analysis Desk

Research/media/data cases can show a neutral inspection panel containing raw study design, sample information, measured outcome, claim text, numerical baseline/comparison, and graph scale. It deliberately does not expose the derived “correct” assessment.

### Decision Workbench

Decision cases can ask the learner to:

- select an option
- select the evidence used
- identify the criteria driving the decision
- acknowledge relevant tradeoffs

The resulting reasoning evidence is written to the append-only Evidence Ledger.

## 9. Guardrails

Research, Media & Decision Intelligence deliberately does **not** include:

- a universal truth score
- a global source reliability score
- “professional looking = trustworthy” logic
- “conflict of interest = false” logic
- repost count treated as independent corroboration
- causation inferred from association by default
- one forced answer when the authored evidence genuinely supports multiple conclusions
- false certainty when a required fact is absent

## 10. Verification

Run:

```bash
npm run verify:research-media-decision
```

The milestone suite verifies:

- 43/43 Lead Investigator skills have Teach-First coverage;
- observational association does not become causation;
- stronger headline wording is detectable;
- absolute and relative changes remain distinct;
- graph-scale risk is represented;
- conflict-of-interest metadata does not become a truth score;
- original-source policy text outranks a generated summary for the policy question;
- evidence, criteria, and tradeoffs are all required for a defensible decision;
- insufficient evidence remains a valid terminal outcome;
- **two different options can both pass when the same packet supports different explicit priorities**;
- broken research/decision references fail validation;
- retired detective names remain absent.

`npm run verify:all` executes this suite along with every earlier Reading Detective engine suite and the offline React/JSX static check.
