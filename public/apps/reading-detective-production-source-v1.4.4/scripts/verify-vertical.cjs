const assert = require('node:assert/strict');
const { lostDelivery } = require('../dist-core/src/content/cases/lostDelivery.js');
const { missingLibraryBook } = require('../dist-core/src/content/cases/missingLibraryBook.js');
const { misconceptions, diagnosticProbes } = require('../dist-core/src/content/misconceptions.js');
const { clueLabs } = require('../dist-core/src/content/clue-labs/core.js');
const { createCaseSession, caseSessionReducer, getStepSupport } = require('../dist-core/src/engine/caseSession.js');
const { decideAfterIncorrectResponse, decideAfterProbe } = require('../dist-core/src/engine/diagnosticFlow.js');
const { notebookEntryFromClueLab } = require('../dist-core/src/engine/notebook.js');
const { scheduleDelayedReview } = require('../dist-core/src/engine/reviewScheduling.js');
const { deriveSkillState } = require('../dist-core/src/engine/mastery.js');

function evidence({ learnerId='lead-reader', skillId, caseId, itemId, outcome, support, context, misconceptionId }) {
  return {
    id: crypto.randomUUID(), learnerId, skillId, caseId, itemId, outcome, support, context,
    misconceptionId, timestamp: new Date().toISOString(),
  };
}

// End-to-end age-respecting foundational repair inside a Lead Investigator case.
{
  const learner = {
    id: 'lead-reader',
    presentationStage: 'lead-investigator',
    readingDevelopment: 'foundation',
  };
  let session = createCaseSession({ learnerId: learner.id, readingCase: lostDelivery });
  const step = lostDelivery.steps[0];
  const events = [];
  const wrongChoice = step.choices.find((choice) => choice.id === 'ban');

  for (let i = 0; i < 4; i += 1) {
    const support = getStepSupport(session, step.id);
    const event = evidence({
      skillId: step.skillId,
      caseId: lostDelivery.id,
      itemId: step.id,
      outcome: 'incorrect',
      support,
      context: support === 'independent' ? 'independent' : 'supported-practice',
      misconceptionId: wrongChoice.misconceptionId,
    });
    events.push(event);
    const decision = decideAfterIncorrectResponse({
      step,
      misconceptionId: wrongChoice.misconceptionId,
      currentSupport: support,
      events,
      misconceptions,
      probes: diagnosticProbes,
    });

    if (i < 3) {
      assert.equal(decision.kind, 'support');
      session = caseSessionReducer(session, {
        type: 'SET_SUPPORT', stepId: step.id, support: decision.support, wrongAnswerId: 'ban',
      });
    } else {
      assert.equal(decision.kind, 'probe');
      session = caseSessionReducer(session, {
        type: 'BEGIN_PROBE',
        probe: { probeId: decision.probe.id, misconceptionId: decision.misconceptionId, originatingStepId: step.id },
      });
    }
  }

  assert.equal(session.status, 'probing');
  assert.equal(session.pendingProbe.probeId, 'PROBE.CODE.001');

  const probeEvent = evidence({
    skillId: 'CODE.002', caseId: lostDelivery.id, itemId: 'PROBE.CODE.001', outcome: 'incorrect',
    support: 'concept-reminder', context: 'diagnostic-probe', misconceptionId: 'CODE.001',
  });
  events.push(probeEvent);
  const probeDecision = decideAfterProbe({ misconception: misconceptions['CODE.001'], correct: false });
  assert.equal(probeDecision.kind, 'repair');

  session = caseSessionReducer(session, {
    type: 'BEGIN_REPAIR',
    repair: {
      clueLabId: probeDecision.clueLabId,
      misconceptionId: 'CODE.001',
      phase: 'discover',
      bookmark: {
        caseId: lostDelivery.id,
        stepIndex: session.stepIndex,
        stepId: step.id,
        supportBeforeRepair: getStepSupport(session, step.id),
      },
    },
  });
  assert.equal(session.status, 'repairing');
  assert.equal(learner.presentationStage, 'lead-investigator');
  assert.equal(clueLabs[probeDecision.clueLabId].stages.includes('lead-investigator'), true);

  session = caseSessionReducer(session, { type: 'SET_REPAIR_PHASE', phase: 'guided' });
  events.push(evidence({
    skillId: 'CODE.002', caseId: lostDelivery.id, itemId: clueLabs['CLUE.CODE.CVC'].guided.id,
    outcome: 'correct', support: 'reteach', context: 'guided-practice', misconceptionId: 'CODE.001',
  }));
  session = caseSessionReducer(session, { type: 'SET_REPAIR_PHASE', phase: 'transfer' });
  events.push(evidence({
    skillId: 'CODE.002', caseId: lostDelivery.id, itemId: clueLabs['CLUE.CODE.CVC'].transfer.id,
    outcome: 'correct', support: 'reteach', context: 'transfer', misconceptionId: 'CODE.001',
  }));

  const notebook = notebookEntryFromClueLab({ learnerId: learner.id, clueLab: clueLabs['CLUE.CODE.CVC'], sourceCaseId: lostDelivery.id });
  const followUp = scheduleDelayedReview({ learnerId: learner.id, skillId: 'CODE.002', sourceCaseId: lostDelivery.id, delayDays: 3, reason: 'repair-follow-up' });
  assert.equal(notebook.skillId, 'CODE.002');
  assert.equal(followUp.reason, 'repair-follow-up');

  session = caseSessionReducer(session, { type: 'RETURN_FROM_REPAIR' });
  assert.equal(session.status, 'active');
  assert.equal(session.stepIndex, 0);

  events.push(evidence({
    skillId: 'CODE.002', caseId: lostDelivery.id, itemId: step.id, outcome: 'correct',
    support: 'concept-reminder', context: 'supported-practice',
  }));
  session = caseSessionReducer(session, { type: 'COMPLETE_STEP', stepId: step.id, totalSteps: lostDelivery.steps.length });
  assert.equal(session.stepIndex, 1);
  assert.equal(session.status, 'active');
  assert.notEqual(deriveSkillState('CODE.002', events).mastery, 'secure');
}

// Elementary case contains a genuine transfer item and can be serialized/resumed.
{
  let session = createCaseSession({ learnerId: 'young-reader', readingCase: missingLibraryBook });
  const saved = JSON.parse(JSON.stringify(session));
  session = caseSessionReducer(session, { type: 'HYDRATE', state: saved });
  assert.equal(session.id, saved.id);
  assert.equal(missingLibraryBook.steps.at(-1).evidenceContext, 'transfer');
  assert.ok(missingLibraryBook.delayedReview.skillIds.includes('EVID.001'));
}

console.log('Reading Detective vertical-slice verification: PASS');
console.log('Verified: support ladder -> diagnostic probe -> targeted Clue Lab -> guided practice -> transfer -> exact Repair & Return -> age-respecting continuation, plus resumable state and review metadata.');
