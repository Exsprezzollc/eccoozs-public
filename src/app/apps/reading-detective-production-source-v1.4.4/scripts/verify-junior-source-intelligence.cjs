const assert = require('node:assert/strict');

const { curriculumMap } = require('../dist-core/src/content/curriculum.js');
const { skillGraph } = require('../dist-core/src/content/skillGraph.js');
const { teachingModules, teachingModuleBySkill } = require('../dist-core/src/content/teachingModules.js');
const { cases } = require('../dist-core/src/content/cases/index.js');
const { validateTeachingModule } = require('../dist-core/src/engine/teaching.js');
const {
  sourceLensForCase,
  corroborationForClaim,
  validateSourceIntelligence,
} = require('../dist-core/src/engine/sourceIntelligence.js');
const { validateCase } = require('../dist-core/src/engine/caseValidation.js');

function uniqueStageSkills(stage) {
  return [...new Set(curriculumMap[stage].strands.flatMap((strand) => strand.skillIds))];
}

const juniorSkills = uniqueStageSkills('investigator');
assert.ok(juniorSkills.length >= 27, 'Junior High curriculum must retain at least the 27 skills present in v0.8.0');

// Every Junior High skill must be explicitly teachable, and the same skill must remain teachable
// in the Lead Investigator presentation so older learners can repair a Junior High gap without demotion.
for (const skillId of juniorSkills) {
  const module = teachingModuleBySkill[skillId];
  assert.ok(module, `${skillId} should have a Teach-First module`);
  assert.deepEqual(validateTeachingModule(module), [], `${module.id} should validate`);
  assert.ok(module.stages.includes('investigator'), `${module.id} should support investigator`);
  assert.ok(module.variants.investigator, `${module.id} should have an investigator variant`);
  assert.ok(module.stages.includes('lead-investigator'), `${module.id} should support lead-investigator repair`);
  assert.ok(module.variants['lead-investigator'], `${module.id} should have a lead-investigator variant`);
}

const incident = cases['CASE.JR.005'];
const viral = cases['CASE.JR.006'];
assert.ok(incident, 'Two Stories, One Incident should exist');
assert.ok(viral, 'The Viral Screenshot should exist');
assert.deepEqual(validateCase(incident, skillGraph).errors, []);
assert.deepEqual(validateCase(viral, skillGraph).errors, []);
assert.deepEqual(validateSourceIntelligence(incident), []);
assert.deepEqual(validateSourceIntelligence(viral), []);

// Source usefulness is question-specific: the same source can be direct for one question and limited for another.
{
  const permanence = sourceLensForCase(viral, 'permanent-change');
  const postClaim = sourceLensForCase(viral, 'what-viral-post-claims');
  assert.ok(permanence && postClaim);
  const permanenceRepost = permanence.entries.find((entry) => entry.sourceId === 'repost');
  const claimRepost = postClaim.entries.find((entry) => entry.sourceId === 'repost');
  assert.equal(permanenceRepost.utility, 'limited');
  assert.equal(claimRepost.utility, 'direct');
  assert.equal(Object.hasOwn(permanenceRepost, 'reliabilityScore'), false, 'Source Intelligence must not collapse source evaluation into a global reliability score');
}

// Independent corroboration and genuine conflict are distinct statuses.
{
  const arrival = corroborationForClaim(incident, 'staff-at-344');
  const firstTouch = corroborationForClaim(incident, 'first-touch-asha');
  assert.equal(arrival.status, 'corroborated');
  assert.equal(arrival.independentSupportingOrigins.length, 2);
  assert.equal(firstTouch.status, 'disputed');
  assert.equal(firstTouch.independentSupportingOrigins.length, 1);
  assert.equal(firstTouch.independentContradictingOrigins.length, 1);
}

// Repetition of one origin is not independent corroboration.
{
  const synthetic = {
    id: 'CASE.TEST.ORIGIN',
    title: 'Origin Test',
    genre: 'source',
    presentationStages: ['investigator'],
    targetSkills: ['SOURCE.003'],
    prerequisiteSkills: [],
    briefing: 'test',
    sources: [
      { id: 'original', kind: 'message', title: 'Original', body: 'Claim.', intelligence: { independenceKey: 'origin-a', proximity: 'firsthand' } },
      { id: 'repost-a', kind: 'message', title: 'Repost A', body: 'Claim.', intelligence: { independenceKey: 'origin-a', originalSourceId: 'original', proximity: 'repost' } },
      { id: 'repost-b', kind: 'message', title: 'Repost B', body: 'Claim.', intelligence: { independenceKey: 'origin-a', originalSourceId: 'original', proximity: 'repost' } },
    ],
    steps: [],
    misconceptionTargets: [],
    transferCaseIds: [],
    sourceIntelligence: {
      lenses: [],
      claims: [{ id: 'c', claim: 'Claim.', positions: [
        { sourceId: 'original', stance: 'supports' },
        { sourceId: 'repost-a', stance: 'supports' },
        { sourceId: 'repost-b', stance: 'supports' },
      ] }],
    },
  };
  const result = corroborationForClaim(synthetic, 'c');
  assert.equal(result.status, 'single-origin');
  assert.equal(result.supportingSourceIds.length, 3);
  assert.equal(result.independentSupportingOrigins.length, 1);
}

// A cropped/reposted claim can be disputed by independent primary information without forcing a truth label on every source.
{
  const permanent = corroborationForClaim(viral, 'permanent-end');
  assert.equal(permanent.status, 'disputed');
  assert.ok(permanent.contradictingSourceIds.includes('notice'));
  assert.ok(permanent.contradictingSourceIds.includes('district'));
}

// Validation catches missing source-intelligence references.
{
  const broken = {
    ...viral,
    steps: [{ ...viral.steps[0], sourceLensId: 'missing-lens' }],
  };
  assert.ok(validateSourceIntelligence(broken).some((error) => /missing source lens/i.test(error)));
}

// Character-name hygiene remains locked.
{
  const serialized = JSON.stringify({ teachingModules, incident, viral }).toLowerCase();
  for (const name of ['harper', 'jordan', 'malik']) {
    assert.equal(serialized.includes(name), false, `retired name ${name} should not appear in v0.8 content`);
  }
}

console.log('Reading Detective Junior High teaching-coverage + source-intelligence verification: PASS');
console.log(`Verified: ${juniorSkills.length}/${juniorSkills.length} Junior High skills have Teach-First coverage in Investigator + Lead Investigator presentations; source usefulness changes by question; provenance prevents reposts from faking corroboration; independent agreement and conflict are represented without global reliability scores.`);
