const assert = require('node:assert/strict');

const { skillGraph } = require('../dist-core/src/content/skillGraph.js');
const { missingLibraryBook } = require('../dist-core/src/content/cases/missingLibraryBook.js');
const { lostDelivery } = require('../dist-core/src/content/cases/lostDelivery.js');
const { missingBackpack } = require('../dist-core/src/content/cases/missingBackpack.js');
const { misconceptions, diagnosticProbes } = require('../dist-core/src/content/misconceptions.js');
const { clueLabs } = require('../dist-core/src/content/clue-labs/core.js');
const { EvidenceLedger } = require('../dist-core/src/engine/evidenceLedger.js');
const { deriveSkillState } = require('../dist-core/src/engine/mastery.js');
const { canReadAloud } = require('../dist-core/src/engine/readAloudPolicy.js');
const { validateCase } = require('../dist-core/src/engine/caseValidation.js');
const { chooseInstructionalSkill } = require('../dist-core/src/engine/routing.js');
const { nextSupportLevel } = require('../dist-core/src/engine/support.js');
const { decideAfterIncorrectResponse, decideAfterProbe } = require('../dist-core/src/engine/diagnosticFlow.js');
const { createCaseSession, caseSessionReducer } = require('../dist-core/src/engine/caseSession.js');
const { scheduleDelayedReview } = require('../dist-core/src/engine/reviewScheduling.js');
const { notebookEntryFromClueLab } = require('../dist-core/src/engine/notebook.js');
const { LocalStorageLearnerRepository } = require('../dist-core/src/persistence/localStorageRepository.js');

function event(overrides = {}) {
  return {
    id: crypto.randomUUID(),
    learnerId: 'learner-1',
    skillId: 'COMP.001',
    caseId: 'CASE.TEST',
    itemId: crypto.randomUUID(),
    outcome: 'correct',
    support: 'independent',
    context: 'independent',
    timestamp: new Date().toISOString(),
    ...overrides,
  };
}

function learner(overrides = {}) {
  return {
    id: 'older-reader',
    presentationStage: 'lead-investigator',
    readingDevelopment: 'foundation',
    detective: { id: 'brooke', appearance: 'fba' },
    accessibility: {
      textScale: 1,
      increasedSpacing: false,
      contrast: 'standard',
      narrationEnabled: true,
      speechRate: 1,
      reducedMotion: false,
      focusMode: false,
      spokenResponseEnabled: true,
    },
    skillStates: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

// RD-014 Evidence history is append-only and copies are isolated.
{
  const ledger = new EvidenceLedger();
  const original = event({ metadata: { note: 'first' } });
  ledger.record(original);
  original.outcome = 'incorrect';
  original.metadata.note = 'changed';
  const stored = ledger.snapshot()[0];
  assert.equal(stored.outcome, 'correct');
  assert.equal(stored.metadata.note, 'first');
}

// RD-005 guided performance alone cannot award independent mastery.
{
  const guided = [
    event({ support: 'concept-reminder', context: 'guided-practice' }),
    event({ support: 'worked-example', context: 'guided-practice' }),
    event({ support: 'reread', context: 'supported-practice' }),
  ];
  const state = deriveSkillState('COMP.001', guided);
  assert.notEqual(state.mastery, 'independent');
  assert.notEqual(state.mastery, 'secure');
}

// RD-006 secure mastery requires transfer and delayed evidence.
{
  const evidence = [
    event({ context: 'independent' }),
    event({ context: 'independent' }),
    event({ context: 'transfer' }),
  ];
  assert.equal(deriveSkillState('COMP.001', evidence).mastery, 'transferred');
  evidence.push(event({ context: 'delayed-review' }));
  assert.equal(deriveSkillState('COMP.001', evidence).mastery, 'secure');
}

// RD-008 target decoding audio is not exposed during assessment.
{
  assert.equal(canReadAloud(skillGraph['CODE.002'], 'target-word', true), false);
  assert.equal(canReadAloud(skillGraph['CODE.002'], 'instructions', true), true);
  assert.equal(canReadAloud(skillGraph['COMP.001'], 'source', true), true);
}

// Data-driven cases validate against the shared skill graph.
{
  for (const readingCase of [missingLibraryBook, missingBackpack, lostDelivery]) {
    assert.deepEqual(validateCase(readingCase, skillGraph), { valid: true, errors: [] });
  }
  assert.equal(missingLibraryBook.steps.at(-1).evidenceContext, 'transfer');
  assert.equal(missingLibraryBook.delayedReview.afterDays, 7);
}

// RD-001 / RD-002: presentation stage does not block routing to foundational skills.
{
  const profile = learner();
  const routed = chooseInstructionalSkill('LEGAL.001', profile, skillGraph);
  assert.equal(routed, 'PRINT.001');
  assert.equal(profile.presentationStage, 'lead-investigator');
  assert.equal(lostDelivery.steps[0].skillId, 'CODE.002');
  assert.ok(lostDelivery.presentationStages.includes('lead-investigator'));
}

// Least-intrusive support ladder is explicit and ordered.
{
  assert.equal(nextSupportLevel('independent'), 'reread');
  assert.equal(nextSupportLevel('reread'), 'attention-cue');
  assert.equal(nextSupportLevel('attention-cue'), 'concept-reminder');
  assert.equal(nextSupportLevel('concept-reminder'), 'concept-reminder');
}

// Repeated wrong answers do not jump directly to reteach; probe comes after support ladder.
{
  const step = lostDelivery.steps[0];
  const wrongs = [
    event({ skillId: 'CODE.002', caseId: lostDelivery.id, itemId: step.id, outcome: 'incorrect', misconceptionId: 'CODE.001' }),
    event({ skillId: 'CODE.002', caseId: lostDelivery.id, itemId: step.id, outcome: 'incorrect', misconceptionId: 'CODE.001', support: 'reread' }),
  ];
  const first = decideAfterIncorrectResponse({
    step,
    misconceptionId: 'CODE.001',
    currentSupport: 'independent',
    events: wrongs.slice(0, 1),
    misconceptions,
    probes: diagnosticProbes,
  });
  assert.deepEqual(first, { kind: 'support', support: 'reread' });

  const afterThresholdButBeforeLadder = decideAfterIncorrectResponse({
    step,
    misconceptionId: 'CODE.001',
    currentSupport: 'reread',
    events: wrongs,
    misconceptions,
    probes: diagnosticProbes,
  });
  assert.deepEqual(afterThresholdButBeforeLadder, { kind: 'support', support: 'attention-cue' });

  const probe = decideAfterIncorrectResponse({
    step,
    misconceptionId: 'CODE.001',
    currentSupport: 'concept-reminder',
    events: wrongs,
    misconceptions,
    probes: diagnosticProbes,
  });
  assert.equal(probe.kind, 'probe');
  assert.equal(probe.probe.id, 'PROBE.CODE.001');
  assert.equal(decideAfterProbe({ misconception: misconceptions['CODE.001'], correct: false }).kind, 'repair');
}

// RD-013 repair returns to the exact interrupted case location.
{
  let session = createCaseSession({ learnerId: 'learner-1', readingCase: lostDelivery, now: '2026-08-18T00:00:00.000Z' });
  session = caseSessionReducer(session, {
    type: 'BEGIN_REPAIR',
    repair: {
      clueLabId: 'CLUE.CODE.CVC',
      misconceptionId: 'CODE.001',
      phase: 'discover',
      bookmark: {
        caseId: lostDelivery.id,
        stepIndex: 0,
        stepId: lostDelivery.steps[0].id,
        supportBeforeRepair: 'concept-reminder',
      },
    },
  });
  assert.equal(session.status, 'repairing');
  session = caseSessionReducer(session, { type: 'SET_REPAIR_PHASE', phase: 'transfer' });
  session = caseSessionReducer(session, { type: 'RETURN_FROM_REPAIR' });
  assert.equal(session.status, 'active');
  assert.equal(session.stepIndex, 0);
  assert.equal(session.activeRepair, undefined);
}

// Clue Lab has a real guided item, transfer item, and a notebook tool.
{
  const lab = clueLabs['CLUE.CODE.CVC'];
  assert.ok(lab.guided.correctAnswerIds.length > 0);
  assert.ok(lab.transfer.correctAnswerIds.length > 0);
  const note = notebookEntryFromClueLab({ learnerId: 'learner-1', clueLab: lab, sourceCaseId: lostDelivery.id, now: '2026-08-18T00:00:00.000Z' });
  assert.equal(note.skillId, 'CODE.002');
  assert.match(note.summary, /blend/i);
}

// Delayed review metadata produces a concrete future retention check.
{
  const review = scheduleDelayedReview({ learnerId: 'learner-1', skillId: 'CODE.002', sourceCaseId: lostDelivery.id, now: new Date('2026-08-18T00:00:00.000Z'), delayDays: 7 });
  assert.equal(review.dueAt, '2026-08-25T00:00:00.000Z');
  assert.equal(review.status, 'scheduled');
}

// Persistence contract round-trips resumable case state and keeps evidence append-only.
{
  const data = new Map();
  global.localStorage = {
    getItem: (key) => data.has(key) ? data.get(key) : null,
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: (key) => data.delete(key),
    clear: () => data.clear(),
    key: (i) => [...data.keys()][i] ?? null,
    get length() { return data.size; },
  };

  const repo = new LocalStorageLearnerRepository();
  const profile = learner({ id: 'persisted-reader' });
  const session = createCaseSession({ learnerId: profile.id, readingCase: missingLibraryBook });
  const evidence = event({ learnerId: profile.id, caseId: missingLibraryBook.id });

  Promise.resolve()
    .then(() => repo.saveLearner(profile))
    .then(() => repo.saveCaseSession(session))
    .then(() => repo.appendEvidence(evidence))
    .then(() => repo.getCaseSession(profile.id, missingLibraryBook.id))
    .then((savedSession) => {
      assert.equal(savedSession.id, session.id);
      return repo.listEvidence(profile.id);
    })
    .then((events) => assert.equal(events.length, 1))
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}

setImmediate(() => {
  if (!process.exitCode) {
    console.log('Reading Detective core verification: PASS');
    console.log('Verified: append-only evidence, mastery gates, read-aloud guard, case schemas, age-dignity routing, support ladder, probes, Repair & Return, transfer, review scheduling, notebook, and persistence.');
  }
});
