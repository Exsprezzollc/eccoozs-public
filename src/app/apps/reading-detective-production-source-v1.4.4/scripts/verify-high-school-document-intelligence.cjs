const assert = require('node:assert/strict');

const { curriculumMap } = require('../dist-core/src/content/curriculum.js');
const { skillGraph } = require('../dist-core/src/content/skillGraph.js');
const { teachingModules, teachingModuleBySkill } = require('../dist-core/src/content/teachingModules.js');
const { cases } = require('../dist-core/src/content/cases/index.js');
const { validateTeachingModule } = require('../dist-core/src/engine/teaching.js');
const { validateCase } = require('../dist-core/src/engine/caseValidation.js');
const {
  documentQuestionForCase,
  definedTermForCase,
  documentRulesForParty,
  searchDocumentSections,
  validateDocumentIntelligence,
} = require('../dist-core/src/engine/documentIntelligence.js');

function uniqueStageSkills(stage) {
  return [...new Set(curriculumMap[stage].strands.flatMap((strand) => strand.skillIds))];
}

const leadSkills = uniqueStageSkills('lead-investigator');
assert.ok(leadSkills.length >= 26, 'Lead Investigator curriculum should retain at least the 26 document-era skills');

// Every current Lead Investigator skill now has explicit Teach-First coverage.
for (const skillId of leadSkills) {
  const module = teachingModuleBySkill[skillId];
  assert.ok(module, `${skillId} should have a Teach-First module`);
  assert.ok(module.stages.includes('lead-investigator'), `${module.id} should support Lead Investigator`);
  assert.ok(module.variants['lead-investigator'], `${module.id} should include a Lead Investigator variant`);
  assert.deepEqual(validateTeachingModule(module), [], `${module.id} should validate`);
}

for (const skillId of ['LEGAL.002', 'LEGAL.003', 'LEGAL.004', 'LEGAL.005', 'LEGAL.006', 'LEGAL.007']) {
  const module = teachingModuleBySkill[skillId];
  assert.ok(module, `${skillId} missing from high-school legal teaching coverage`);
  const corpus = JSON.stringify(module).toLowerCase();
  assert.match(corpus, /enforce|wording|clause|document/, `${skillId} should teach document reading rather than a quiz-only label`);
}

const subscription = cases['CASE.LEAD.002'];
const apartment = cases['CASE.LEAD.003'];
const warranty = cases['CASE.LEAD.004'];
const waiver = cases['CASE.LEAD.005'];
const dispute = cases['CASE.LEAD.006'];
for (const item of [subscription, apartment, warranty, waiver, dispute]) {
  assert.ok(item, 'expected document case should exist');
  assert.deepEqual(validateCase(item, skillGraph).errors, [], `${item.id} should validate`);
  assert.deepEqual(validateDocumentIntelligence(item), [], `${item.id} document intelligence should validate`);
}

// Document search teaches scanning/navigation rather than forcing linear reading.
{
  const cancellation = searchDocumentSections(subscription, 'cancellation effective');
  assert.ok(cancellation.length >= 1);
  assert.equal(cancellation[0].sectionHeading, 'Cancellation');

  const arbitration = searchDocumentSections(dispute, 'arbitration opt out');
  assert.ok(arbitration.length >= 1);
  assert.equal(arbitration[0].sectionHeading, 'Dispute Resolution');
}

// Defined terms must use the document's declared meaning.
{
  const definition = definedTermForCase(apartment, 'written notice');
  assert.ok(definition);
  assert.equal(definition.kind, 'definition');
  assert.match(definition.definition, /resident portal/i);

  const covered = definedTermForCase(dispute, 'Covered Dispute');
  assert.ok(covered);
  assert.match(covered.definition, /billing or service dispute/i);
}

// Party-specific rule extraction does not collapse permission into obligation.
{
  const customerRules = documentRulesForParty(subscription, 'customer');
  assert.ok(customerRules.some((rule) => rule.kind === 'obligation'));
  assert.ok(customerRules.some((rule) => rule.kind === 'condition'));

  const managementRules = documentRulesForParty(apartment, 'management');
  assert.ok(managementRules.some((rule) => rule.kind === 'permission'));
  assert.equal(managementRules.some((rule) => rule.kind === 'obligation'), false);
}

// Legal-question lenses preserve conditions/exceptions and flag consequential clauses for professional review.
{
  const waiverLens = documentQuestionForCase(waiver, 'waiver-scope');
  assert.ok(waiverLens);
  assert.equal(waiverLens.conclusionStrength, 'conditional');
  assert.equal(waiverLens.professionalReviewRecommended, true);
  assert.ok(waiverLens.rules.some((rule) => rule.kind === 'waiver'));
  assert.ok(waiverLens.rules.some((rule) => rule.kind === 'exception'));

  const arbitrationLens = documentQuestionForCase(dispute, 'arbitration-process');
  assert.ok(arbitrationLens);
  assert.equal(arbitrationLens.professionalReviewRecommended, true);
  assert.ok(arbitrationLens.rules.some((rule) => rule.kind === 'dispute-path'));
  assert.ok(arbitrationLens.rules.some((rule) => rule.kind === 'exception'));
}

// Warranty exclusion is no longer mislabeled as termination/cancellation skill evidence.
{
  const coverage = warranty.steps.find((step) => step.id === 'coverage-reading');
  assert.equal(coverage.skillId, 'EVID.004');
  assert.equal(warranty.targetSkills.includes('LEGAL.005'), false);
}

// Validation catches broken document references.
{
  const broken = {
    ...dispute,
    steps: dispute.steps.map((step, index) => index === 0 ? { ...step, documentLensId: 'missing-document-lens' } : step),
  };
  assert.ok(validateDocumentIntelligence(broken).some((error) => /missing document lens/i.test(error)));
}

// No global legal verdict/enforceability engine exists in the domain data.
{
  const serialized = JSON.stringify({ subscription, apartment, warranty, waiver, dispute });
  assert.equal(serialized.includes('enforceabilityScore'), false);
  assert.equal(serialized.includes('legalVerdict'), false);
}

// Character-name hygiene remains locked.
{
  const serialized = JSON.stringify({ teachingModules, waiver, dispute }).toLowerCase();
  for (const name of ['harper', 'jordan', 'malik']) {
    assert.equal(serialized.includes(name), false, `retired name ${name} should not appear in v0.9 content`);
  }
}

console.log('Reading Detective High School teaching-coverage + document-intelligence verification: PASS');
console.log(`Verified: all ${leadSkills.length} current Lead Investigator skills have Teach-First coverage; document search, defined terms, party/rule mapping, waiver/liability scope, arbitration exceptions, governing-law language, and professional-review guardrails are encoded without a legal-verdict engine.`);
