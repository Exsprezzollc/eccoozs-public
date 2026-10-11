const assert = require('node:assert/strict');

const { curriculumMap } = require('../dist-core/src/content/curriculum.js');
const { skillGraph } = require('../dist-core/src/content/skillGraph.js');
const { teachingModules, teachingModuleBySkill } = require('../dist-core/src/content/teachingModules.js');
const { reviewVariationTemplateFor } = require('../dist-core/src/content/reviewVariations.js');
const { cases } = require('../dist-core/src/content/cases/index.js');
const { validateTeachingModule } = require('../dist-core/src/engine/teaching.js');
const { validateCase } = require('../dist-core/src/engine/caseValidation.js');
const { canReadAloud } = require('../dist-core/src/engine/readAloudPolicy.js');
const {
  assessMotive,
  evaluateTheme,
  assessNarrator,
  validateLiteratureIntelligence,
} = require('../dist-core/src/engine/literatureIntelligence.js');
const {
  assessProcedureRule,
  evaluateForm,
  assessCivicNotice,
  validateAppliedReading,
} = require('../dist-core/src/engine/appliedReading.js');

function stageSkills(stage) {
  return [...new Set(curriculumMap[stage].strands.flatMap((strand) => strand.skillIds))];
}

const youngSkills = stageSkills('young-investigator');
const juniorSkills = stageSkills('investigator');
const leadSkills = stageSkills('lead-investigator');
assert.equal(youngSkills.length, 30, 'v1.1 Young Investigator curriculum should expose 30 distinct skills');
assert.equal(juniorSkills.length, 33, 'v1.1 Investigator curriculum should expose 33 distinct skills');
assert.equal(leadSkills.length, 54, 'v1.1 Lead Investigator curriculum should expose 54 distinct skills');
assert.equal(Object.keys(skillGraph).length, 82, 'v1.1 skill graph should contain 82 prerequisite-aware skills');
assert.ok(Object.keys(cases).length >= 35, 'v1.1+ case library should retain at least the 35 cases present at v1.1');

// Every stage skill remains Teach-First covered in that stage.
for (const [stage, skills] of [['young-investigator', youngSkills], ['investigator', juniorSkills], ['lead-investigator', leadSkills]]) {
  for (const skillId of skills) {
    const module = teachingModuleBySkill[skillId];
    assert.ok(module, `${stage}/${skillId} needs Teach-First coverage`);
    assert.ok(module.variants[stage], `${stage}/${skillId} needs an age-respecting presentation variant`);
    assert.deepEqual(validateTeachingModule(module), [], `${module.id} should validate`);
  }
}

// Foundational completeness: high-frequency mapping, punctuation, and fluency are explicit skills.
for (const skillId of ['CODE.010', 'SENT.006', 'FLUENCY.001']) {
  assert.ok(skillGraph[skillId], `${skillId} missing from skill graph`);
  for (const stage of ['young-investigator', 'investigator', 'lead-investigator']) {
    assert.ok(teachingModuleBySkill[skillId].variants[stage], `${skillId} must remain age-respectful in ${stage}`);
  }
}
assert.match(skillGraph['FLUENCY.001'].description, /without rewarding speed/i, 'fluency must explicitly reject speed-for-speed’s-sake');
assert.equal(canReadAloud(skillGraph['CODE.010'], 'target-word', true), false, 'read-aloud must not reveal a high-frequency decoding target during assessment');

// New cases validate through the shared case engine plus their intelligence contracts.
const newCaseIds = [
  'CASE.ELEM.007','CASE.ELEM.008',
  'CASE.JR.007','CASE.JR.008','CASE.JR.009',
  'CASE.LEAD.015','CASE.LEAD.016','CASE.LEAD.017','CASE.LEAD.018',
];
for (const id of newCaseIds) {
  const item = cases[id];
  assert.ok(item, `${id} should exist`);
  assert.deepEqual(validateCase(item, skillGraph).errors, [], `${id} should validate`);
  assert.deepEqual(validateLiteratureIntelligence(item), [], `${id} literature intelligence should validate`);
  assert.deepEqual(validateAppliedReading(item), [], `${id} applied reading should validate`);
}

// Literary motive stays calibrated as interpretation, not a hidden fact label.
{
  const story = cases['CASE.JR.007'];
  const motive = assessMotive(story, 'simone-relief');
  assert.ok(motive);
  assert.equal(motive.strength, 'strongly-supported');
  assert.match(motive.explanation, /interpretation/i);
  const narrator = assessNarrator(story, 'friend-narrator');
  assert.ok(narrator);
  assert.equal(narrator.perspective, 'first-person-limited');
  assert.equal(narrator.caution, 'limited-knowledge');
}

// Theme requires evidence and is not satisfied by a topic word alone.
{
  const story = cases['CASE.JR.008'];
  const insufficient = evaluateTheme(story, 'honesty-trust', { evidenceSourceIds: ['opening'] });
  assert.ok(insufficient);
  assert.equal(insufficient.supported, false);
  const supported = evaluateTheme(story, 'honesty-trust', { evidenceSourceIds: ['opening', 'ending'] });
  assert.ok(supported);
  assert.equal(supported.supported, true);
}

// Narrator contradiction narrows confidence claim-by-claim instead of globally declaring the narrator false.
{
  const story = cases['CASE.LEAD.015'];
  const narrator = assessNarrator(story, 'workshop-narrator');
  assert.ok(narrator);
  assert.equal(narrator.caution, 'contradicted-account');
  assert.deepEqual(narrator.contradictionSourceIds, ['record']);
  assert.match(narrator.explanation, /without proving that every observation/i);
}

// Procedure intelligence preserves prerequisites and instruction strength.
{
  const procedure = cases['CASE.LEAD.016'];
  const early = assessProcedureRule(procedure, 'guard', ['stop']);
  assert.ok(early);
  assert.equal(early.prerequisitesMet, false);
  assert.deepEqual(early.missingPrerequisiteRuleIds.sort(), ['disconnect', 'zero']);
  const ready = assessProcedureRule(procedure, 'guard', ['stop', 'disconnect', 'zero']);
  assert.ok(ready);
  assert.equal(ready.prerequisitesMet, true);
  const recommendation = assessProcedureRule(procedure, 'second-tech', []);
  assert.equal(recommendation.strength, 'recommended');
}

// Form intelligence distinguishes required fields from optional/conditional ones and reads signature scope precisely.
{
  const form = cases['CASE.LEAD.017'];
  const incomplete = evaluateForm(form, { providedFieldIds: ['name'], signedCertificationIds: [] });
  assert.ok(incomplete);
  assert.equal(incomplete.complete, false);
  assert.ok(incomplete.missingRequiredFieldIds.includes('email'));
  assert.ok(incomplete.missingCertificationIds.includes('accuracy'));
  const complete = evaluateForm(form, { providedFieldIds: ['name', 'email'], signedCertificationIds: ['accuracy'] });
  assert.ok(complete);
  assert.equal(complete.complete, true);
  assert.equal(complete.missingRequiredFieldIds.includes('middle'), false, 'optional middle-name field must not block completeness');
}

// Civic notice intelligence keeps issuer, affected action, deadline, condition, and consequence distinct.
{
  const notice = assessCivicNotice(cases['CASE.LEAD.018'], 'parking-appeal');
  assert.ok(notice);
  assert.equal(notice.issuer, 'City Clerk');
  assert.equal(notice.action, 'Submit Appeal Form P-4');
  assert.equal(notice.deadline, '5:00 PM on September 18');
  assert.match(notice.condition, /residents seeking review/i);
  assert.match(notice.consequence, /Late appeals/i);
}

// Natural review remains available for representative new skills in the correct stage.
for (const [skillId, stage] of [
  ['CODE.010','young-investigator'],
  ['SENT.006','lead-investigator'],
  ['FLUENCY.001','investigator'],
  ['LIT.003','investigator'],
  ['PROC.002','lead-investigator'],
  ['FORM.002','lead-investigator'],
  ['CIVIC.001','lead-investigator'],
]) {
  assert.ok(reviewVariationTemplateFor(skillId, stage), `${skillId}/${stage} needs a natural review variation`);
}

// The new curriculum must not reintroduce retired detective/character names.
{
  const serialized = JSON.stringify({ teachingModules, newCases: newCaseIds.map((id) => cases[id]) }).toLowerCase();
  for (const name of ['harper','jordan','malik']) {
    assert.equal(serialized.includes(name), false, `retired name ${name} must remain absent`);
  }
}

console.log('Reading Detective Curriculum Completeness + Literature/Applied Reading verification: PASS');
console.log(`Verified: ${Object.keys(skillGraph).length} skills, ${Object.keys(cases).length} cases, ${youngSkills.length}/${youngSkills.length} Young, ${juniorSkills.length}/${juniorSkills.length} Junior, and ${leadSkills.length}/${leadSkills.length} Lead stage skills have Teach-First coverage; foundational fluency/punctuation/tricky-word gaps, evidence-based literary interpretation, procedures, forms, certifications, and civic notices are encoded.`);
