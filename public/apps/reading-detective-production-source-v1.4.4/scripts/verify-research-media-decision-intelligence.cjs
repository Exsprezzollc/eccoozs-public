const assert = require('node:assert/strict');

const { curriculumMap } = require('../dist-core/src/content/curriculum.js');
const { skillGraph } = require('../dist-core/src/content/skillGraph.js');
const { teachingModules, teachingModuleBySkill } = require('../dist-core/src/content/teachingModules.js');
const { cases } = require('../dist-core/src/content/cases/index.js');
const { validateTeachingModule } = require('../dist-core/src/engine/teaching.js');
const { validateCase } = require('../dist-core/src/engine/caseValidation.js');
const { corroborationForClaim, sourceLensForCase } = require('../dist-core/src/engine/sourceIntelligence.js');
const {
  assessResearchProfile,
  assessMediaCalibration,
  assessQuantitativeFrame,
  assessGraphFrame,
  evaluateDecision,
  validateResearchMediaDecision,
} = require('../dist-core/src/engine/researchMediaDecision.js');

function uniqueStageSkills(stage) {
  return [...new Set(curriculumMap[stage].strands.flatMap((strand) => strand.skillIds))];
}

const leadSkills = uniqueStageSkills('lead-investigator');
assert.ok(leadSkills.length >= 43, 'Lead Investigator curriculum must retain at least the 43 skills present in v1.0');
for (const skillId of leadSkills) {
  const module = teachingModuleBySkill[skillId];
  assert.ok(module, `${skillId} should have Teach-First coverage`);
  assert.ok(module.variants['lead-investigator'], `${module.id} needs a Lead Investigator variant`);
  assert.deepEqual(validateTeachingModule(module), [], `${module.id} should validate`);
}

for (const skillId of [
  'MEDIA.001','MEDIA.002','MEDIA.003',
  'RESEARCH.001','RESEARCH.002','RESEARCH.003','RESEARCH.004',
  'DATA.001','DATA.002','DATA.003',
  'ARG.004','ARG.005','ARG.006',
  'DECISION.001','DECISION.002','DECISION.003','DECISION.004',
]) {
  assert.ok(skillGraph[skillId], `${skillId} missing from the skill graph`);
  assert.ok(teachingModuleBySkill[skillId], `${skillId} missing a teaching module`);
}

const study = cases['CASE.LEAD.007'];
const graph = cases['CASE.LEAD.008'];
const sponsored = cases['CASE.LEAD.009'];
const ai = cases['CASE.LEAD.010'];
const argument = cases['CASE.LEAD.011'];
const job = cases['CASE.LEAD.012'];
const uncertain = cases['CASE.LEAD.013'];
const twoGood = cases['CASE.LEAD.014'];
for (const item of [study, graph, sponsored, ai, argument, job, uncertain, twoGood]) {
  assert.ok(item, 'expected v1.0 case should exist');
  assert.deepEqual(validateCase(item, skillGraph).errors, [], `${item.id} should validate`);
  assert.deepEqual(validateResearchMediaDecision(item), [], `${item.id} research/media/decision config should validate`);
}

// Study-vs-headline: observational association must not silently become causation.
{
  const research = assessResearchProfile(study, 'sleep-profile');
  assert.ok(research);
  assert.equal(research.design, 'observational');
  assert.equal(research.strongestSupportedRelationship, 'association');
  assert.equal(research.canSupportCausalClaim, false);
  assert.match(research.explanation, /association/i);

  const media = assessMediaCalibration(study, 'headline-frame');
  assert.ok(media);
  assert.equal(media.calibrated, false);
  assert.ok(media.risks.includes('causation-from-correlation'));
  assert.ok(media.risks.includes('headline-stronger-than-source'));
}

// Quantitative framing preserves baseline/absolute values and graph-scale risk.
{
  const quantitative = assessQuantitativeFrame(graph, 'complaints-frame');
  assert.ok(quantitative);
  assert.equal(quantitative.absoluteChange, -2);
  assert.equal(quantitative.relativeChangePercent, -50);
  assert.equal(quantitative.framingComplete, true);

  const chart = assessGraphFrame(graph, 'complaints-graph');
  assert.ok(chart);
  assert.equal(chart.visualRisk, 'truncated-axis');
  assert.equal(chart.dataRange, 2);
  assert.equal(chart.axisRange, 3);
  assert.match(chart.explanation, /visually dramatic|axis/i);
}

// Funding relationship does not create an automatic true/false verdict, and reposted/company material does not fake independence.
{
  const lens = sourceLensForCase(sponsored, 'funding');
  assert.ok(lens);
  const company = lens.entries.find((entry) => entry.sourceId === 'company-study');
  assert.match(company.interestNote, /funded/i);
  const serialized = JSON.stringify(sponsored).toLowerCase();
  assert.equal(serialized.includes('trustscore'), false);
  assert.equal(serialized.includes('reliabilityscore'), false);
}

// AI answer: original policy is direct for the policy question; generated summary is limited.
{
  const lens = sourceLensForCase(ai, 'remote-guarantee');
  assert.ok(lens);
  assert.equal(lens.entries.find((entry) => entry.sourceId === 'policy').utility, 'direct');
  assert.equal(lens.entries.find((entry) => entry.sourceId === 'ai').utility, 'limited');
}

// Decision engine grades evidence/criteria/tradeoffs, not a universal preference.
{
  const incomplete = evaluateDecision(job, 'job-choice', {
    optionId: 'b', evidenceSourceIds: ['offer-b'], criterionIds: ['hours','tuition'], tradeoffAcknowledgements: [],
  });
  assert.ok(incomplete);
  assert.equal(incomplete.defensible, false);
  assert.ok(incomplete.missingEvidenceSourceIds.includes('priority'));
  assert.ok(incomplete.missingCriterionIds.includes('schedule'));
  assert.ok(incomplete.missingTradeoffs.includes('Lower hourly wage than Offer A'));

  const complete = evaluateDecision(job, 'job-choice', {
    optionId: 'b', evidenceSourceIds: ['offer-b','priority'], criterionIds: ['hours','tuition','schedule'], tradeoffAcknowledgements: ['Lower hourly wage than Offer A'],
  });
  assert.ok(complete);
  assert.equal(complete.defensible, true);
  assert.match(complete.explanation, /defensible/i);
}



// The same packet can support more than one defensible decision when priorities differ.
{
  const lowerCost = evaluateDecision(twoGood, 'backup-choice', {
    optionId: 'a',
    evidenceSourceIds: ['plan-a','plan-b','brief'],
    criterionIds: ['cost'],
    tradeoffAcknowledgements: ['Longer recovery time than Plan B'],
  });
  assert.ok(lowerCost);
  assert.equal(lowerCost.defensible, true);

  const fasterRecovery = evaluateDecision(twoGood, 'backup-choice', {
    optionId: 'b',
    evidenceSourceIds: ['plan-a','plan-b','brief'],
    criterionIds: ['recovery'],
    tradeoffAcknowledgements: ['Higher annual cost than Plan A'],
  });
  assert.ok(fasterRecovery);
  assert.equal(fasterRecovery.defensible, true);
}

// Uncertainty remains a legitimate terminal conclusion when the packet lacks a required fact.
{
  const step = uncertain.steps.find((item) => item.id === 'confidence');
  assert.ok(step.allowInsufficientEvidence);
  assert.deepEqual(step.correctAnswerIds, ['insufficient']);
}

// Validation must catch broken intelligence references.
{
  const broken = {
    ...study,
    steps: study.steps.map((step, index) => index === 0 ? { ...step, researchProfileId: 'missing-profile' } : step),
  };
  assert.ok(validateResearchMediaDecision(broken).some((error) => /missing research profile/i.test(error)));

  const brokenDecision = {
    ...job,
    steps: job.steps.map((step) => step.id === 'decision' ? { ...step, decisionId: 'missing-decision' } : step),
  };
  assert.ok(validateResearchMediaDecision(brokenDecision).some((error) => /missing decision model/i.test(error)));
}

// Research/media intelligence is authored evidence calibration, not a hidden global truth engine.
{
  const serialized = JSON.stringify({ study, graph, sponsored, ai, argument, job, uncertain, twoGood }).toLowerCase();
  for (const forbidden of ['truthscore', 'trustscore', 'globalreliability', 'alwayscorrectsource']) {
    assert.equal(serialized.includes(forbidden), false, `${forbidden} should not exist`);
  }
}

// Retired character names remain absent.
{
  const serialized = JSON.stringify({ teachingModules, study, graph, sponsored, ai, argument, job, uncertain, twoGood }).toLowerCase();
  for (const name of ['harper','jordan','malik']) {
    assert.equal(serialized.includes(name), false, `retired name ${name} should not appear in v1.0 content`);
  }
}

console.log('Reading Detective Research, Media & Decision Intelligence verification: PASS');
console.log(`Verified: ${leadSkills.length}/${leadSkills.length} Lead Investigator skills have Teach-First coverage; study/headline calibration, correlation-vs-causation, sample scope, conflict-of-interest context, absolute/relative framing, graph scale, assumptions/rebuttals/reasoning flaws, AI-source verification, evidence-weighted decisions, defensible tradeoffs, multiple defensible conclusions, and insufficient-evidence conclusions are encoded.`);
