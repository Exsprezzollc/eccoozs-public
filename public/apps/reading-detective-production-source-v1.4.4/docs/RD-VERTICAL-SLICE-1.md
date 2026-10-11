# RD Vertical Slice 1

## Goal

Prove that Reading Detective can diagnose a reading breakdown, give only the help needed, repair the exact missing skill, and return the learner to the same investigation without changing age presentation.

## Young Investigator proof case

**The Missing Library Book**

- CVC decoding
- sentence meaning
- evidence selection
- explicit transfer item
- delayed retention-review metadata

## Lead Investigator dignity proof case

**The Lost Delivery**

A Lead Investigator encounters the mature parcel-area label **BIN**. If CVC decoding breaks down, the learner remains in the Lead Investigator experience while the engine routes through:

1. reread
2. attention cue
3. concept reminder
4. diagnostic probe
5. `CLUE.CODE.CVC` only if the probe confirms the gap
6. guided blending practice
7. transfer blending practice
8. exact return to the parcel case

The learner is never reclassified as an Elementary learner and never receives a learner-facing grade-equivalent label.

## Persistence proof

The repository stores:

- learner profile
- evidence events
- active case session
- exact repair bookmark
- Detective Notebook entries
- Case Map progress
- scheduled retention reviews

A serialized session can be restored and resumed at the same investigation state.

## Verification commands

```bash
npm run verify:core
npm run verify:vertical
```

Both currently pass.
