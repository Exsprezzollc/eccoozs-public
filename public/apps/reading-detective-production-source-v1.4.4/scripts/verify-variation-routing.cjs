const assert = require('node:assert/strict');
const { cases } = require('../dist-core/src/content/cases/index.js');
const { reviewVariations } = require('../dist-core/src/content/reviewVariations.js');
const { skillGraph } = require('../dist-core/src/content/skillGraph.js');
const { materializeVariation } = require('../dist-core/src/engine/variation.js');
const { validateVariationTemplate } = require('../dist-core/src/engine/variationValidation.js');
const { routeNextLearningActivity } = require('../dist-core/src/engine/activityRouting.js');
const {
  scheduleDelayedReview,
  scheduleReviewIfNeeded,
  listDueReviews,
  completeScheduledReview,
} = require('../dist-core/src/engine/reviewScheduling.js');

function skillState(skillId, mastery) {
  return { skillId, mastery, confidence: mastery === 'secure' ? 1 : 0.8 };
}

function learner(stage, states = {}, placementSkill) {
  return {
    id: `learner-${stage}`,
    presentationStage: stage,
    readingDevelopment: 'comprehender',
    detective: { id: 'x', appearance: 'fba' },
    accessibility: {
      textScale: 1, increasedSpacing: false, contrast: 'standard', narrationEnabled: true,
      speechRate: 1, reducedMotion: false, focusMode: false, spokenResponseEnabled: true,
    },
    skillStates: states,
    placement: placementSkill ? {
      planId: 'test', presentationStage: stage, recommendedSkillId: placementSkill,
      observedSkillIds: [], printAccessGapSkillIds: [], completedAt: '2026-08-18T00:00:00.000Z',
    } : undefined,
    createdAt: '2026-08-18T00:00:00.000Z',
    updatedAt: '2026-08-18T00:00:00.000Z',
  };
}

function stablePrereqs(stage) {
  const states = {};
  for (const [skillId, definition] of Object.entries(skillGraph)) {
    if (definition.presentationStages.includes(stage)) {
      states[skillId] = skillState(skillId, 'secure');
    }
  }
  return states;
}

// Every controlled variation template is structurally valid.
for (const template of Object.values(reviewVariations)) {
  assert.deepEqual(validateVariationTemplate(template, skillGraph), []);
}


// Every skill that a current case schedules for delayed review has at least one compatible variation in that stage.
{
  for (const readingCase of Object.values(cases)) {
    for (const skillId of readingCase.delayedReview?.skillIds ?? []) {
      const covered = Object.values(reviewVariations).some((template) =>
        template.skillId === skillId &&
        template.scenarios.some((scenario) =>
          scenario.stages.some((stage) => readingCase.presentationStages.includes(stage))
        )
      );
      assert.equal(covered, true, `${readingCase.id} schedules ${skillId} without a compatible review variation`);
    }
  }
}

// A seed is deterministic: resume/reload cannot silently mutate the item.
{
  const template = reviewVariations['VAR.REVIEW.CODE.CVC'];
  const first = materializeVariation({ template, stage: 'lead-investigator', seed: 'same-session' });
  const second = materializeVariation({ template, stage: 'lead-investigator', seed: 'same-session' });
  assert.deepEqual(second, first);
}

// Recent fingerprints are excluded when another compatible scenario exists.
{
  const template = reviewVariations['VAR.REVIEW.CODE.CVC'];
  const first = materializeVariation({ template, stage: 'lead-investigator', seed: 'reader-a' });
  const second = materializeVariation({
    template,
    stage: 'lead-investigator',
    seed: 'reader-a',
    recentFingerprints: [first.fingerprint],
  });
  assert.notEqual(second.fingerprint, first.fingerprint);
}

// Choice order is controlled by the seed, while the correctness contract stays role-based.
{
  const template = reviewVariations['VAR.REVIEW.COND'];
  const orders = new Set();
  for (let i = 0; i < 20; i += 1) {
    const item = materializeVariation({ template, stage: 'lead-investigator', seed: `seed-${i}` });
    orders.add(item.choices.map((choice) => choice.id).join(','));
    assert.deepEqual(item.correctChoiceIds, ['correct']);
  }
  assert.ok(orders.size > 1, 'answer position should not be fixed across generated items');
}

// Scheduling is deduplicated: replaying a completed case cannot stack identical pending reviews.
{
  const existing = [scheduleDelayedReview({
    learnerId: 'l1', skillId: 'COMP.001', sourceCaseId: 'CASE.ELEM.001',
    reason: 'retention-check', now: new Date('2026-08-18T00:00:00.000Z'), delayDays: 7,
  })];
  const result = scheduleReviewIfNeeded({
    existing, learnerId: 'l1', skillId: 'COMP.001', sourceCaseId: 'CASE.ELEM.001',
    reason: 'retention-check', now: new Date('2026-08-19T00:00:00.000Z'), delayDays: 7,
  });
  assert.equal(result.created, false);
  assert.equal(result.review.id, existing[0].id);
}

// Repair follow-ups are routed ahead of ordinary retention checks once both are due.
{
  const retention = scheduleDelayedReview({
    learnerId: 'l1', skillId: 'EVID.004', reason: 'retention-check',
    now: new Date('2026-08-01T00:00:00.000Z'), delayDays: 1,
  });
  const repair = scheduleDelayedReview({
    learnerId: 'l1', skillId: 'SENT.005', reason: 'repair-follow-up',
    now: new Date('2026-08-02T00:00:00.000Z'), delayDays: 1,
  });
  const due = listDueReviews([retention, repair], new Date('2026-08-18T00:00:00.000Z'));
  assert.equal(due[0].reason, 'repair-follow-up');
  assert.equal(completeScheduledReview(due[0], new Date('2026-08-18T01:00:00.000Z')).status, 'completed');
}

// Resume wins: an interrupted investigation is never displaced by a scheduled review.
{
  const l = learner('lead-investigator', stablePrereqs('lead-investigator'));
  const review = scheduleDelayedReview({
    learnerId: l.id, skillId: 'SENT.005', reason: 'repair-follow-up',
    now: new Date('2026-08-01T00:00:00.000Z'), delayDays: 1,
  });
  const route = routeNextLearningActivity({
    learner: l, cases, caseMap: [], reviews: [review], variationTemplates: reviewVariations,
    skillGraph, now: new Date('2026-08-18T00:00:00.000Z'),
    activeCaseId: 'CASE.LEAD.001', activeCaseStatus: 'active',
  });
  assert.deepEqual(route, { kind: 'resume-case', caseId: 'CASE.LEAD.001', reason: 'active-case' });
}

// A due repaired skill quietly returns as a new stage-appropriate review clue before a new case.
{
  const l = learner('lead-investigator', stablePrereqs('lead-investigator'));
  const review = scheduleDelayedReview({
    learnerId: l.id, skillId: 'LEGAL.001', reason: 'repair-follow-up',
    now: new Date('2026-08-01T00:00:00.000Z'), delayDays: 1,
  });
  const route = routeNextLearningActivity({
    learner: l, cases, caseMap: [], reviews: [review], variationTemplates: reviewVariations,
    skillGraph, now: new Date('2026-08-18T00:00:00.000Z'), activeCaseStatus: 'complete',
  });
  assert.equal(route.kind, 'review-insertion');
  assert.equal(route.review.id, review.id);
  assert.equal(route.variationTemplateId, 'VAR.REVIEW.LEGAL.OBLIGATION');
}

// Strong learners skip a completed, fully secure case and are routed to content with remaining growth.
{
  const states = stablePrereqs('investigator');
  for (const skill of cases['CASE.JR.002'].targetSkills) {
    states[skill] = skillState(skill, 'developing');
  }
  const l = learner('investigator', states);
  const route = routeNextLearningActivity({
    learner: l,
    cases,
    caseMap: [{ learnerId: l.id, caseId: 'CASE.JR.001', status: 'completed', lastVisitedAt: '2026-08-17T00:00:00.000Z', completedAt: '2026-08-17T00:00:00.000Z' }],
    reviews: [], variationTemplates: reviewVariations, skillGraph,
  });
  assert.equal(route.kind, 'case');
  assert.equal(route.caseId, 'CASE.JR.002');
  assert.equal(route.mode, 'full');
}

// Previously strong but not secure skills are sampled instead of forcing a full replay.
{
  const states = stablePrereqs('young-investigator');
  for (const skill of cases['CASE.ELEM.002'].targetSkills) {
    states[skill] = skillState(skill, 'transferred');
  }
  const l = learner('young-investigator', states);
  const route = routeNextLearningActivity({
    learner: l,
    cases,
    caseMap: [{ learnerId: l.id, caseId: 'CASE.ELEM.002', status: 'completed', lastVisitedAt: '2026-08-17T00:00:00.000Z', completedAt: '2026-08-17T00:00:00.000Z' }],
    reviews: [], variationTemplates: reviewVariations, skillGraph,
  });
  assert.equal(route.kind, 'case');
  assert.equal(route.mode, 'sample');
  assert.equal(route.reason, 'transfer-sample');
}

// If all compatible current content is secure, the router does not manufacture busywork.
{
  const l = learner('lead-investigator', stablePrereqs('lead-investigator'));
  const route = routeNextLearningActivity({
    learner: l, cases, caseMap: [], reviews: [], variationTemplates: reviewVariations, skillGraph,
  });
  assert.deepEqual(route, { kind: 'complete', reason: 'all-current-content-stable' });
}

console.log('Reading Detective content-variation + review-routing verification: PASS');
console.log('Verified: deterministic controlled variation, non-repeating scenarios, shuffled answer position, valid correctness contracts, review deduplication, repair-first due routing, resume priority, natural review insertion, secure-skill skipping, transfer sampling, and no manufactured busywork.');
