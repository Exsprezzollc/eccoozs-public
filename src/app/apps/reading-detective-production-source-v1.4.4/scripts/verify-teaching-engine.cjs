const assert = require('node:assert/strict');

const { teachingModules, teachingModuleBySkill } = require('../dist-core/src/content/teachingModules.js');
const { cases } = require('../dist-core/src/content/cases/index.js');
const { skillGraph } = require('../dist-core/src/content/skillGraph.js');
const {
  createTeachingSession,
  advanceTeachingSession,
  answerTeachingPractice,
  validateTeachingModule,
} = require('../dist-core/src/engine/teaching.js');
const { deriveSkillState } = require('../dist-core/src/engine/mastery.js');
const { routeNextLearningActivity } = require('../dist-core/src/engine/activityRouting.js');

function learner(stage, overrides = {}) {
  return {
    id: `learner-${stage}`,
    presentationStage: stage,
    readingDevelopment: 'foundation',
    detective: { id: 'skylar', appearance: 'fba' },
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
    createdAt: '2026-08-18T00:00:00.000Z',
    updatedAt: '2026-08-18T00:00:00.000Z',
    ...overrides,
  };
}

function event({ context, support, outcome = 'correct', index = 0 }) {
  return {
    id: `e-${context}-${index}`,
    learnerId: 'learner-young-investigator',
    skillId: 'CODE.002',
    caseId: 'CASE.ELEM.001',
    itemId: `i-${context}-${index}`,
    outcome,
    support,
    context,
    modality: 'print',
    timestamp: `2026-08-18T00:0${index}:00.000Z`,
  };
}

assert.ok(Object.keys(teachingModules).length >= 8, 'teaching milestone should contain at least eight explicit teaching modules');
for (const module of Object.values(teachingModules)) {
  assert.deepEqual(validateTeachingModule(module), [], `${module.id} should validate`);
  assert.equal(teachingModuleBySkill[module.skillId].id, module.id);
}

// Teaching exposure must introduce a skill without inflating performance mastery.
{
  const exposure = [event({ context: 'instruction', support: 'worked-example', outcome: 'presented', index: 0 })];
  const state = deriveSkillState('CODE.002', exposure, 'print');
  assert.equal(state.mastery, 'introduced');
  assert.equal(state.confidence, 0);
}

// Full teaching sequence: discover -> explain -> model -> together -> supported -> independent -> transfer.
{
  const profile = learner('young-investigator');
  const module = teachingModules['TEACH.CODE.CVC'];
  let session = createTeachingSession({ learner: profile, module, now: '2026-08-18T00:00:00.000Z' });
  assert.equal(session.phase, 'discover');
  session = advanceTeachingSession(session, '2026-08-18T00:01:00.000Z');
  assert.equal(session.phase, 'explain');
  session = advanceTeachingSession(session, '2026-08-18T00:02:00.000Z');
  assert.equal(session.phase, 'model');
  session = advanceTeachingSession(session, '2026-08-18T00:03:00.000Z');
  assert.equal(session.phase, 'together');

  for (const phase of ['together', 'supported', 'independent', 'transfer']) {
    const variant = module.variants['young-investigator'];
    const item = variant[phase];
    const result = answerTeachingPractice({ session, module, answerId: item.correctAnswerIds[0] });
    assert.equal(result.correct, true);
    session = result.session;
  }
  assert.equal(session.phase, 'complete');
  assert.ok(session.completedAt);
}

// Guided + supported success alone is not independent. Independent + transfer reaches transferred, not secure.
{
  const evidence = [
    event({ context: 'guided-practice', support: 'worked-example', index: 1 }),
    event({ context: 'supported-practice', support: 'concept-reminder', index: 2 }),
  ];
  assert.notEqual(deriveSkillState('CODE.002', evidence, 'print').mastery, 'independent');
  evidence.push(event({ context: 'independent', support: 'independent', index: 3 }));
  evidence.push(event({ context: 'transfer', support: 'independent', index: 4 }));
  const state = deriveSkillState('CODE.002', evidence, 'print');
  assert.equal(state.mastery, 'transferred');
  assert.notEqual(state.mastery, 'secure');
}

// Stronger evidence enters later in instruction instead of replaying every phase.
{
  const module = teachingModules['TEACH.SENT.MEANING'];
  const developing = learner('investigator', {
    skillStates: { 'SENT.001': { skillId: 'SENT.001', mastery: 'developing', confidence: 0.55 } },
  });
  const session = createTeachingSession({ learner: developing, module });
  assert.equal(session.phase, 'supported');

  const independent = learner('investigator', {
    skillStates: { 'SENT.001': { skillId: 'SENT.001', mastery: 'independent', confidence: 0.75 } },
  });
  assert.equal(createTeachingSession({ learner: independent, module }).phase, 'transfer');
}

// Age-dignity invariant: same foundational skill, different presentation, no demotion.
{
  const profile = learner('lead-investigator');
  const module = teachingModules['TEACH.CODE.CVC'];
  const session = createTeachingSession({ learner: profile, module, returnTo: { caseId: 'CASE.LEAD.001', stepIndex: 0 } });
  assert.equal(session.presentationStage, 'lead-investigator');
  assert.equal(session.returnTo.caseId, 'CASE.LEAD.001');
  assert.match(module.variants['lead-investigator'].model.sourceTitle, /Parcel|Dispatch|Inventory|Field|Logistics/i);
  assert.equal(profile.presentationStage, 'lead-investigator');
}

// Router now chooses teaching before an untaught compatible case when prerequisites are already stable.
{
  const profile = learner('young-investigator', {
    placement: { recommendedSkillId: 'CODE.002', printAccessGapSkillIds: [], completedAt: '2026-08-18T00:00:00.000Z' },
    skillStates: {
      'PRINT.001': { skillId: 'PRINT.001', mastery: 'secure', confidence: 1 },
      'PHON.003': { skillId: 'PHON.003', mastery: 'secure', confidence: 1 },
      'PHON.005': { skillId: 'PHON.005', mastery: 'secure', confidence: 1 },
      'CODE.001': { skillId: 'CODE.001', mastery: 'secure', confidence: 1 },
      'CODE.002': { skillId: 'CODE.002', mastery: 'not-introduced', confidence: 0 },
    },
  });
  const route = routeNextLearningActivity({
    learner: profile,
    cases: { 'CASE.ELEM.001': cases['CASE.ELEM.001'] },
    caseMap: [],
    reviews: [],
    variationTemplates: {},
    skillGraph,
    teachingModulesBySkill: teachingModuleBySkill,
  });
  assert.equal(route.kind, 'teaching');
  assert.equal(route.skillId, 'CODE.002');
  assert.equal(route.moduleId, 'TEACH.CODE.CVC');
  assert.equal(route.caseId, 'CASE.ELEM.001');
}

// The retired names must not leak into teaching content.
{
  const serialized = JSON.stringify(teachingModules).toLowerCase();
  for (const name of ['harper', 'jordan', 'malik']) {
    assert.equal(serialized.includes(name), false, `retired name ${name} should not appear in teaching content`);
  }
}

console.log('Reading Detective teaching-engine verification: PASS');
console.log('Verified: teach-first sequencing, adaptive phase entry, instruction/mastery separation, age-respecting foundational teaching, router-before-case instruction, transfer evidence, and content-name hygiene.');
