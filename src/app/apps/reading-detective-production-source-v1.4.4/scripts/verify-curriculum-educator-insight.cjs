const assert = require('node:assert/strict');

const { curriculumMap } = require('../dist-core/src/content/curriculum.js');
const { skillGraph } = require('../dist-core/src/content/skillGraph.js');
const { teachingModules, teachingModuleBySkill } = require('../dist-core/src/content/teachingModules.js');
const { misconceptions } = require('../dist-core/src/content/misconceptions.js');
const { validateTeachingModule } = require('../dist-core/src/engine/teaching.js');
const { deriveEducatorInsightReport } = require('../dist-core/src/engine/educatorInsight.js');

const stages = ['young-investigator', 'investigator', 'lead-investigator'];

function learner(stage = 'lead-investigator', overrides = {}) {
  return {
    id: 'educator-insight-learner',
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

let n = 0;
function event(overrides = {}) {
  n += 1;
  return {
    id: `e-${n}`,
    learnerId: 'educator-insight-learner',
    skillId: 'COMP.001',
    caseId: 'CASE.TEST',
    itemId: `i-${n}`,
    outcome: 'correct',
    support: 'independent',
    context: 'independent',
    modality: 'print',
    timestamp: `2026-08-18T00:${String(n).padStart(2, '0')}:00.000Z`,
    ...overrides,
  };
}

function stageSkillIds(stage) {
  return [...new Set(curriculumMap[stage].strands.flatMap((strand) => strand.skillIds))];
}

const foundationSkills = stageSkillIds('young-investigator');
assert.ok(foundationSkills.length >= 27, 'young-investigator curriculum must retain at least the original 27 foundation skills');

// Every foundation skill now has a Teach-First module in every presentation stage.
for (const skillId of foundationSkills) {
  const module = teachingModuleBySkill[skillId];
  assert.ok(module, `${skillId} should have a teaching module`);
  assert.deepEqual(validateTeachingModule(module), [], `${module.id} should validate`);
  for (const stage of stages) {
    assert.ok(module.stages.includes(stage), `${module.id} should support ${stage}`);
    assert.ok(module.variants[stage], `${module.id} should have a ${stage} variant`);
  }
}

// Audio-first phonemic teaching keeps the spoken target out of sourceBody.
for (const skillId of ['PHON.001', 'PHON.002', 'PHON.003', 'PHON.004', 'PHON.005']) {
  const module = teachingModuleBySkill[skillId];
  for (const stage of stages) {
    const variant = module.variants[stage];
    assert.ok(variant.model.audioText, `${skillId}/${stage} model should provide an audio clue`);
    assert.equal(variant.model.sourceBody, undefined, `${skillId}/${stage} model should not print the spoken target as source text`);
    for (const phase of ['together', 'supported', 'independent', 'transfer']) {
      assert.ok(variant[phase].audioText, `${skillId}/${stage}/${phase} should provide audioText`);
      assert.equal(variant[phase].sourceBody, undefined, `${skillId}/${stage}/${phase} should not expose the spoken target in sourceBody`);
    }
  }
}

// Foundation coverage must be 100% even for an older learner with foundational gaps.
{
  const report = deriveEducatorInsightReport({
    learner: learner('lead-investigator'),
    events: [],
    skillGraph,
    curriculum: curriculumMap,
    teachingModulesBySkill: teachingModuleBySkill,
    misconceptions,
    now: '2026-08-18T04:00:00.000Z',
  });
  assert.equal(report.teachingCoverage.foundationCoverageRate, 1);
  assert.equal(report.teachingCoverage.foundationCoveredSkillCount, foundationSkills.length);
  assert.equal(report.presentationStage, 'lead-investigator');
  assert.equal(Object.hasOwn(report, 'gradeLevel'), false);
  assert.ok(report.nextFocus, 'educator report should identify a teachable next focus');
}

// A single wrong answer never becomes a confirmed misconception.
{
  const report = deriveEducatorInsightReport({
    learner: learner('investigator'),
    events: [event({ skillId: 'EVID.004', outcome: 'incorrect', misconceptionId: 'EVID.001' })],
    skillGraph,
    curriculum: curriculumMap,
    teachingModulesBySkill: teachingModuleBySkill,
    misconceptions,
  });
  assert.equal(report.confirmedMisconceptions.length, 0);
}

// Repeated errors trigger investigation, but only a failed diagnostic probe confirms a misconception when a probe exists.
{
  const repeated = [
    event({ skillId: 'EVID.004', outcome: 'incorrect', misconceptionId: 'EVID.001' }),
    event({ skillId: 'EVID.004', outcome: 'incorrect', misconceptionId: 'EVID.001' }),
  ];
  let report = deriveEducatorInsightReport({
    learner: learner('investigator'), events: repeated, skillGraph, curriculum: curriculumMap,
    teachingModulesBySkill: teachingModuleBySkill, misconceptions,
  });
  assert.equal(report.confirmedMisconceptions.length, 0, 'threshold errors should trigger a probe, not create a confirmed educator label');

  report = deriveEducatorInsightReport({
    learner: learner('investigator'),
    events: [
      ...repeated,
      event({ skillId: 'EVID.004', outcome: 'incorrect', context: 'diagnostic-probe', support: 'concept-reminder', misconceptionId: 'EVID.001' }),
    ],
    skillGraph, curriculum: curriculumMap, teachingModulesBySkill: teachingModuleBySkill, misconceptions,
  });
  assert.equal(report.confirmedMisconceptions.length, 1);
  assert.equal(report.confirmedMisconceptions[0].diagnosticProbeConfirmed, true);
}

// Support summary separates independent performance from supported practice.
{
  const events = [
    event({ skillId: 'COMP.001', support: 'independent', outcome: 'correct' }),
    event({ skillId: 'COMP.001', support: 'independent', outcome: 'incorrect' }),
    event({ skillId: 'COMP.001', support: 'concept-reminder', context: 'supported-practice', outcome: 'correct' }),
    event({ skillId: 'COMP.001', support: 'reteach', context: 'supported-practice', outcome: 'correct' }),
  ];
  const report = deriveEducatorInsightReport({
    learner: learner('young-investigator'), events, skillGraph, curriculum: curriculumMap,
    teachingModulesBySkill: teachingModuleBySkill, misconceptions,
  });
  assert.equal(report.support.independentAttempts, 2);
  assert.equal(report.support.independentCorrect, 1);
  assert.equal(report.support.independentAccuracy, 0.5);
  assert.equal(report.support.supportedAttemptRate, 0.5);
}

// Modality pattern requires repeated evidence in both channels and explicitly avoids diagnosis.
{
  const events = [
    event({ skillId: 'COMP.001', modality: 'print', outcome: 'incorrect' }),
    event({ skillId: 'COMP.001', modality: 'print', outcome: 'incorrect' }),
    event({ skillId: 'COMP.001', modality: 'audio', outcome: 'correct' }),
    event({ skillId: 'COMP.001', modality: 'audio', outcome: 'correct' }),
  ];
  const report = deriveEducatorInsightReport({
    learner: learner('young-investigator'), events, skillGraph, curriculum: curriculumMap,
    teachingModulesBySkill: teachingModuleBySkill, misconceptions,
  });
  assert.equal(report.modalityObservations.length, 1);
  assert.match(report.modalityObservations[0].observation, /not a diagnosis/i);
}

// Successful Clue Lab transfer becomes a repaired-tool insight.
{
  const report = deriveEducatorInsightReport({
    learner: learner('lead-investigator'),
    events: [event({
      skillId: 'CODE.002',
      context: 'transfer',
      support: 'reteach',
      outcome: 'correct',
      metadata: { clueLabId: 'CLUE.CODE.CVC' },
    })],
    skillGraph, curriculum: curriculumMap, teachingModulesBySkill: teachingModuleBySkill, misconceptions,
  });
  assert.equal(report.recentRepairs.length, 1);
  assert.equal(report.recentRepairs[0].skillId, 'CODE.002');
  assert.equal(report.recentRepairs[0].transferredAfterRepair, true);
}

// Retired names remain absent across the expanded teaching corpus.
{
  const serialized = JSON.stringify(teachingModules).toLowerCase();
  for (const name of ['harper', 'jordan', 'malik']) {
    assert.equal(serialized.includes(name), false, `retired name ${name} should not appear in expanded teaching content`);
  }
}

console.log('Reading Detective curriculum-teaching-coverage + educator-insight verification: PASS');
console.log(`Verified: ${foundationSkills.length}/${foundationSkills.length} foundation skills have Teach-First coverage across all 3 presentation stages; phonemic modules are audio-first; educator insights separate independent/support evidence, require misconception confirmation, surface repairs and repeated modality patterns without diagnosing, and preserve age-dignity.`);
