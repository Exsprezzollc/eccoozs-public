const assert = require('node:assert/strict');
const { placementPlans } = require('../dist-core/src/content/placement.js');
const { skillGraph } = require('../dist-core/src/content/skillGraph.js');
const {
  createPlacementSession,
  answerPlacementProbe,
  placementEvidenceEvent,
  placementSummary,
  readingDevelopmentForSkill,
} = require('../dist-core/src/engine/placement.js');
const { deriveSkillModalityProfile } = require('../dist-core/src/engine/componentProfile.js');
const { validatePlacementPlan } = require('../dist-core/src/engine/placementValidation.js');
const { deriveSkillState } = require('../dist-core/src/engine/mastery.js');
const { LocalStorageLearnerRepository } = require('../dist-core/src/persistence/localStorageRepository.js');

function learner(stage, id = `learner-${stage}`) {
  return { id, presentationStage: stage };
}

function answer(session, plan, answerId) {
  return answerPlacementProbe({ session, plan, answerId, now: `2026-08-18T0${Math.min(session.responses.length, 9)}:00:00.000Z` });
}

// Every placement plan is structurally valid and uses known skills/routes.
for (const plan of Object.values(placementPlans)) {
  assert.deepEqual(validatePlacementPlan(plan, skillGraph), []);
}

// A Lead Investigator can show strong listening comprehension while print access breaks down.
// Presentation is never changed or demoted.
{
  const plan = placementPlans['lead-investigator'];
  const lead = learner('lead-investigator', 'lead-access-gap');
  let session = createPlacementSession({ learner: lead, plan, now: '2026-08-18T00:00:00.000Z' });
  const evidence = [];

  let result = answer(session, plan, 'physical'); // print comprehension incorrect
  evidence.push(placementEvidenceEvent({ learnerId: lead.id, plan, response: result.response }));
  session = result.session;
  assert.equal(session.currentProbeId, 'PL.COMP.AUDIO');

  result = answer(session, plan, 'recorded'); // same meaning understood by listening
  evidence.push(placementEvidenceEvent({ learnerId: lead.id, plan, response: result.response }));
  session = result.session;
  assert.equal(session.currentProbeId, 'PL.CODE.CVC');
  assert.deepEqual(session.printAccessGapSkillIds, ['COMP.001']);

  result = answer(session, plan, 'ban'); // decoding breaks
  evidence.push(placementEvidenceEvent({ learnerId: lead.id, plan, response: result.response }));
  session = result.session;
  assert.equal(session.currentProbeId, 'PL.PHON.BLEND');

  result = answer(session, plan, 'bin'); // auditory blending works
  evidence.push(placementEvidenceEvent({ learnerId: lead.id, plan, response: result.response }));
  session = result.session;

  assert.equal(session.status, 'complete');
  assert.equal(session.recommendedSkillId, 'CODE.002');
  assert.equal(session.presentationStage, 'lead-investigator');
  assert.equal(readingDevelopmentForSkill(session.recommendedSkillId), 'decoder');

  const profile = deriveSkillModalityProfile('COMP.001', evidence);
  assert.equal(profile.printAccessGap, true);
  assert.equal(profile.print.accuracy, 0);
  assert.equal(profile.audio.accuracy, 1);

  const summary = placementSummary(session);
  assert.equal(summary.recommendedSkillId, 'CODE.002');
  assert.deepEqual(summary.printAccessGapSkillIds, ['COMP.001']);
}

// Placement observations inform the profile but cannot by themselves award independent mastery.
{
  const events = [
    {
      id: 'p1', learnerId: 'x', skillId: 'COMP.001', caseId: 'PLACEMENT:x', itemId: '1',
      outcome: 'correct', support: 'independent', context: 'placement', modality: 'print', timestamp: '2026-08-18T00:00:00.000Z',
    },
    {
      id: 'p2', learnerId: 'x', skillId: 'COMP.001', caseId: 'PLACEMENT:x', itemId: '2',
      outcome: 'correct', support: 'independent', context: 'placement', modality: 'print', timestamp: '2026-08-18T00:01:00.000Z',
    },
    {
      id: 'p3', learnerId: 'x', skillId: 'COMP.001', caseId: 'PLACEMENT:x', itemId: '3',
      outcome: 'correct', support: 'independent', context: 'placement', modality: 'print', timestamp: '2026-08-18T00:02:00.000Z',
    },
  ];
  const state = deriveSkillState('COMP.001', events, 'print');
  assert.notEqual(state.mastery, 'independent');
  assert.notEqual(state.mastery, 'transferred');
  assert.notEqual(state.mastery, 'secure');
}

// Strong placement paths terminate at useful next-instruction skills, not grade labels.
{
  const youngPlan = placementPlans['young-investigator'];
  let young = createPlacementSession({ learner: learner('young-investigator'), plan: youngPlan });
  young = answer(young, youngPlan, 'map').session;
  young = answer(young, youngPlan, 'blue').session;
  young = answer(young, youngPlan, 'label').session;
  assert.equal(young.status, 'complete');
  assert.equal(young.recommendedSkillId, 'COMP.001');

  const juniorPlan = placementPlans.investigator;
  let junior = createPlacementSession({ learner: learner('investigator'), plan: juniorPlan });
  junior = answer(junior, juniorPlan, '214').session;
  junior = answer(junior, juniorPlan, 'leave').session;
  junior = answer(junior, juniorPlan, 'no').session;
  junior = answer(junior, juniorPlan, 'schedule').session;
  assert.equal(junior.status, 'complete');
  assert.equal(junior.recommendedSkillId, 'SENT.003');

  const leadPlan = placementPlans['lead-investigator'];
  let lead = createPlacementSession({ learner: learner('lead-investigator'), plan: leadPlan });
  lead = answer(lead, leadPlan, 'recorded').session;
  lead = answer(lead, leadPlan, 'unattended').session;
  lead = answer(lead, leadPlan, 'guess').session;
  lead = answer(lead, leadPlan, 'tracking').session;
  lead = answer(lead, leadPlan, 'customer').session;
  assert.equal(lead.status, 'complete');
  assert.equal(lead.recommendedSkillId, 'LEGAL.003');
}

// Placement session persistence round-trips without losing the active adaptive branch.
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
  const plan = placementPlans['lead-investigator'];
  let session = createPlacementSession({ learner: learner('lead-investigator', 'persist-placement'), plan });
  session = answer(session, plan, 'physical').session;
  assert.equal(session.currentProbeId, 'PL.COMP.AUDIO');

  Promise.resolve()
    .then(() => repo.savePlacementSession(session))
    .then(() => repo.getPlacementSession(session.learnerId))
    .then((saved) => {
      assert.equal(saved.currentProbeId, 'PL.COMP.AUDIO');
      assert.equal(saved.responses.length, 1);
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}

setImmediate(() => {
  if (!process.exitCode) {
    console.log('Reading Detective adaptive-placement verification: PASS');
    console.log('Verified: stage-safe adaptive placement, print/listening separation, foundational routing without demotion, no mastery inflation, structural plan validation, and resumable placement state.');
  }
});
