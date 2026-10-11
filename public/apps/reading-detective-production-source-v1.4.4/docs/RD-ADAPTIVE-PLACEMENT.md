# RD Adaptive Placement — v0.3.0

## Goal

Make the learner's first investigation do real adaptive placement work without ever displaying a stigmatizing grade-equivalent label or changing presentation age.

The learner experiences an age-appropriate case:

- Young Investigator — **The Missing Library Book**
- Investigator — **The Missing Backpack**
- Lead Investigator — **The Lost Delivery**

The engine uses the responses to find a useful instructional starting skill.

## What changed

### Adaptive placement sessions

Placement is now a persisted, resumable domain object rather than an informal side effect of a case. Each presentation stage owns a data-driven `PlacementPlan` with probe transitions.

A probe can:

- continue upward when a skill is demonstrated,
- move to a smaller prerequisite when print access breaks down,
- compare print and listening comprehension without changing age presentation,
- or finish with a recommended next instructional skill.

### Print vs listening evidence

`EvidenceEvent` now carries modality metadata:

- `print`
- `audio`
- `mixed`

Audio-only placement clues do not display the target sentence as text. This lets the app distinguish a print-access problem from a meaning/reasoning problem.

Example Lead Investigator route:

`print comprehension miss → listening comprehension success → mature CVC check → auditory blending check → CODE.002 recommended`

The learner remains a **Lead Investigator** throughout.

### Placement does not inflate mastery

Placement evidence is useful diagnostic evidence, but it cannot by itself award Independent, Transferred, or Secure mastery. Those states still require real independent application, transfer, and delayed evidence in the normal learning engine.

### Modality-aware skill state

Skill definitions now declare a primary modality. Mastery derivation can filter evidence to the modality that actually measures the skill. Read-aloud use during ordinary case work is recorded as `mixed` evidence rather than silently pretending the learner read independently.

### Persistence

`LearnerRepository` now persists placement sessions. An interrupted first investigation restores at the exact adaptive branch.

### Learner result

A completed placement creates a `PlacementSummary` containing:

- recommended next skill,
- print-access-gap observations when supported by paired evidence,
- response count,
- completion timestamp.

The learner-facing result remains a **Detective Toolkit / good place to begin**, not a grade label.

## Verification

```bash
npm run verify:placement
```

The verifier proves:

1. all three placement plans have valid skills and routes;
2. a Lead Investigator can route to foundational decoding without demotion;
3. paired print/listening evidence can identify a print-access gap;
4. placement evidence cannot falsely award independent mastery;
5. strong stage paths end at useful next-instruction skills;
6. adaptive placement state survives persistence and resume.

Run the full engine suite with:

```bash
npm run verify:all
```
