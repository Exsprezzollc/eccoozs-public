# RD Content Variation + Review Routing — v0.4.0

This milestone turns delayed review and case selection into shared engine behavior rather than one-off lesson logic.

## Controlled content variation

Reading Detective now supports deterministic variation templates with:

- age-compatible scenarios,
- tokenized source/prompt/choice text,
- role-based correct answer IDs,
- misconception-linked distractors,
- deterministic answer-choice shuffling,
- stable fingerprints for persistence and analytics,
- recent-fingerprint avoidance so the same surface item is not immediately repeated,
- structural validation against the skill graph.

The randomization is controlled: the reading skill, intended evidence path, correctness contract, and misconception targets do not change when the surface wording changes.

## Natural review insertion

Delayed reviews are now routable learning activities. When a scheduled review becomes due, the router can materialize a new stage-appropriate clue that checks the same skill in a different context.

Priority order:

1. Resume an interrupted active case.
2. Insert a due repair follow-up.
3. Insert a due retention check.
4. Route to the strongest current case need.
5. Sample transfer for already-strong but not-yet-secure skills.
6. Stop manufacturing work when all currently available content is stable.

A review attempt records `delayed-review` evidence with the variation template ID and fingerprint. Correct delayed evidence can contribute to secure mastery; an incorrect review creates new evidence and schedules a shorter repair follow-up rather than resetting an entire unit.

## Review deduplication

Revisiting a completed case does not stack identical pending review records. `scheduleReviewIfNeeded` reuses an existing scheduled review for the same learner, skill, source case, and reason.

## Adaptive case routing

The router scores compatible cases from the learner's actual skill evidence rather than a fixed unit number.

- `not-introduced`, `introduced`, `guided`, `developing`, and `review-needed` skills increase case need.
- `independent` and `transferred` skills reduce the amount of required repetition.
- `secure` skills are skipped unless later evidence changes their state.
- a placement-recommended skill receives a routing bonus when a compatible case targets it.

When every target skill in a case is already independent/transferred/secure, the route may be `sample` rather than `full`. A sample case begins at a transfer step (or the final application step when no explicit transfer step exists).

## New cases in v0.4.0

- Young Investigator: **The Playground Sign**
- Investigator: **The Changed Schedule**
- Lead Investigator: **The Auto-Renewing Subscription**

These sit beside the original proof cases and give the router more than one valid destination per presentation stage.

## Review variation packs

The build currently contains controlled review templates for:

- CVC decoding (`CODE.002`)
- sentence meaning (`SENT.001`)
- explicit information (`COMP.001`)
- locating evidence (`EVID.001`)
- contrast connectors (`SENT.003`)
- conditional language (`SENT.005`)
- evidence vs. assumption (`EVID.004`)
- legal obligations (`LEGAL.001`)

Each template contains multiple age-appropriate scenarios where the underlying skill remains constant.

## Verification

`npm run verify:variation-routing` verifies:

- variation-template validity,
- deterministic resume behavior,
- non-repeating scenario selection,
- answer-position variation without changing correctness,
- review deduplication,
- repair-follow-up priority,
- active-case resume priority,
- natural due-review insertion,
- secure-skill skipping,
- transfer sampling,
- no manufactured busywork when current content is stable.

All core engine verification suites pass in v0.4.0.
