const assert = require('node:assert/strict');

const { cases } = require('../dist-core/src/content/cases/index.js');
const { skillGraph } = require('../dist-core/src/content/skillGraph.js');
const { curriculumMap } = require('../dist-core/src/content/curriculum.js');
const { teachingModules, teachingModuleBySkill } = require('../dist-core/src/content/teachingModules.js');
const { capstoneProgression, graduationDefinition } = require('../dist-core/src/content/capstone.js');
const { validateCase } = require('../dist-core/src/engine/caseValidation.js');
const { assessCapstoneReadiness, evaluateGraduation, mentorPresenceFor } = require('../dist-core/src/engine/capstone.js');
const { routeNextLearningActivity } = require('../dist-core/src/engine/activityRouting.js');
const { runProductionQa } = require('../dist-core/src/engine/productionQa.js');
const { corroborationForClaim } = require('../dist-core/src/engine/sourceIntelligence.js');
const { definedTermForCase } = require('../dist-core/src/engine/documentIntelligence.js');
const { assessResearchProfile, assessQuantitativeFrame, evaluateDecision } = require('../dist-core/src/engine/researchMediaDecision.js');

const capstone = cases['CASE.LEAD.019'];
assert.ok(capstone, 'Final Case should exist');
assert.equal(capstone.capstone, true, 'Final Case must be marked as capstone');
assert.deepEqual(validateCase(capstone, skillGraph).errors, [], 'Final Case should satisfy case contracts');
assert.equal(graduationDefinition.caseId, capstone.id);
assert.equal(capstoneProgression.capstoneCaseId, capstone.id);

// The Final Case genuinely composes the earlier intelligence engines rather than only referencing their skill IDs.
{
  const corroboration = corroborationForClaim(capstone, 'saturday-approved');
  assert.ok(corroboration);
  assert.equal(corroboration.independentSupportingOrigins.length, 1, 'article + promo must trace to one promotional origin');
  assert.equal(corroboration.status, 'disputed');

  const research = assessResearchProfile(capstone, 'pilot-profile');
  assert.ok(research);
  assert.equal(research.canSupportCausalClaim, false);
  assert.equal(research.strongestSupportedRelationship, 'association');

  const quantity = assessQuantitativeFrame(capstone, 'registration-frame');
  assert.ok(quantity);
  assert.equal(quantity.absoluteChange, 20);
  assert.equal(quantity.relativeChangePercent, 50);

  const writtenNotice = definedTermForCase(capstone, 'Written Notice');
  assert.ok(writtenNotice);
  assert.match(writtenNotice.definition, /email|delivery/i);

  const finalDecision = evaluateDecision(capstone, 'opening-day-decision', {
    optionId: 'cautious',
    evidenceSourceIds: ['city-policy','facilities-statement','research-brief','registration-chart','vendor-agreement'],
    criterionIds: ['occupancy','research','numbers','contract','uncertainty'],
    tradeoffAcknowledgements: ['Waiting for the inspection may require changing the planned public launch message.'],
  });
  assert.ok(finalDecision);
  assert.equal(finalDecision.defensible, true);
}

function learnerWithMastery(level = 'independent') {
  const now = new Date().toISOString();
  const skillStates = {};
  const required = new Set(capstoneProgression.requirements.flatMap((item) => item.skillIds));
  for (const skillId of required) {
    skillStates[skillId] = { skillId, mastery: level, confidence: 0.9, lastEvidenceAt: now };
  }
  return {
    id: 'learner-capstone',
    presentationStage: 'lead-investigator',
    readingDevelopment: 'analytical-reader',
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
    skillStates,
    createdAt: now,
    updatedAt: now,
  };
}

// Capstone is unlocked by evidence, not by case-count completion.
{
  const learner = learnerWithMastery('independent');
  const readiness = assessCapstoneReadiness({ learner, progression: capstoneProgression });
  assert.equal(readiness.ready, true);
  assert.equal(readiness.requirements.every((item) => item.satisfied), true);
  assert.ok(readiness.overallSatisfiedSkills >= capstoneProgression.minimumOverallSatisfiedSkills);
  assert.equal(mentorPresenceFor({ learner, readiness }), 'on-request');
  assert.equal(mentorPresenceFor({ learner, readiness, inCapstone: true }), 'on-request');

  const route = routeNextLearningActivity({
    learner,
    cases,
    caseMap: [],
    reviews: [],
    variationTemplates: {},
    skillGraph,
    teachingModulesBySkill: teachingModuleBySkill,
    capstoneProgression,
  });
  assert.equal(route.kind, 'capstone');
  assert.equal(route.caseId, capstone.id);
}

// One missing domain keeps the final case locked and identifies a concrete gap.
{
  const learner = learnerWithMastery('independent');
  for (const skillId of ['DECISION.001', 'DECISION.002', 'DECISION.003', 'DECISION.004']) {
    learner.skillStates[skillId] = { skillId, mastery: 'developing', confidence: 0.4 };
  }
  const readiness = assessCapstoneReadiness({ learner, progression: capstoneProgression });
  assert.equal(readiness.ready, false);
  assert.ok(readiness.nextGapSkillId);
  assert.equal(readiness.requirements.find((item) => item.id === 'READY.DECISION').satisfied, false);
}

function evidenceForAllSteps({ supportedStepIds = [] } = {}) {
  const now = new Date().toISOString();
  const stepById = new Map(capstone.steps.map((step) => [step.id, step]));
  return graduationDefinition.competencies.flatMap((competency) =>
    competency.stepIds.map((stepId, index) => {
      const step = stepById.get(stepId);
      return {
        id: `ev-${competency.id}-${stepId}-${index}`,
        learnerId: 'learner-capstone',
        skillId: step.skillId,
        caseId: capstone.id,
        itemId: stepId,
        outcome: 'correct',
        support: supportedStepIds.includes(stepId) ? 'attention-cue' : 'independent',
        context: step.evidenceContext || 'independent',
        modality: 'mixed',
        timestamp: now,
      };
    }),
  );
}

// Graduation is competency-based and requires independent synthesis.
{
  const evaluation = evaluateGraduation({
    definition: graduationDefinition,
    events: evidenceForAllSteps(),
    caseCompleted: true,
    evaluatedAt: '2026-08-18T12:00:00.000Z',
  });
  assert.equal(evaluation.status, 'graduated');
  assert.equal(evaluation.passedCompetencies, evaluation.totalCompetencies);
  assert.equal(evaluation.supportedCorrectAttempts, 0);
}

// Accurate but heavily scaffolded capstone work does not get mislabeled as independent graduation.
{
  const evaluation = evaluateGraduation({
    definition: graduationDefinition,
    events: evidenceForAllSteps({ supportedStepIds: ['opening-status', 'research-claim'] }),
    caseCompleted: true,
  });
  assert.equal(evaluation.status, 'needs-more-independent-evidence');
  assert.ok(evaluation.supportedCorrectAttempts > graduationDefinition.maximumSupportedCorrectAttempts);
}

// Production QA scans architecture, curriculum, Teach-First coverage, capstone contracts, identifiers, and retired-name hygiene.
{
  const report = runProductionQa({
    graph: skillGraph,
    cases,
    curriculum: curriculumMap,
    teachingModules,
    teachingModulesBySkill: teachingModuleBySkill,
    capstoneProgression,
    graduationDefinition,
    retiredNames: ['Harper', 'Jordan', 'Malik'],
    generatedAt: '2026-08-18T12:00:00.000Z',
  });
  if (!report.passed) console.error(report.issues);
  assert.equal(report.passed, true);
  assert.equal(report.errorCount, 0);
  assert.equal(report.checks.every((check) => check.passed), true);
}

console.log('Reading Detective Capstone Progression + Graduation + Production QA verification: PASS');
console.log(`Verified: capstone readiness gates, evidence-based unlocking, mentor fade to on-request, cross-domain Final Case, independent graduation evaluation, scaffold-sensitive graduation, and production QA across ${Object.keys(skillGraph).length} skills / ${Object.keys(cases).length} cases.`);
