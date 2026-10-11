const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { teachingModules } = require('../dist-core/src/content/teachingModules.js');

const root = path.resolve(__dirname, '..');

const envDir = path.join(root, 'public', 'assets', 'environments');
for (const stage of ['young-investigator', 'investigator', 'lead-investigator']) {
  const file = path.join(envDir, `${stage}.jpg`);
  assert.ok(fs.existsSync(file), `missing stage environment ${stage}`);
  assert.ok(fs.statSync(file).size > 100000, `${stage} environment appears truncated`);
}

const appSource = fs.readFileSync(path.join(root, 'src', 'App.tsx'), 'utf8');
const css = fs.readFileSync(path.join(root, 'src', 'styles', 'app.css'), 'utf8');
assert.match(appSource, /stage-environment/, 'stage environment is not mounted in the live app');
assert.match(appSource, /automaticCaseNarrationKey/, 'case narration contract missing');
assert.match(appSource, /automaticNarrationKey/, 'teaching narration contract missing');
assert.match(appSource, /TeachingPracticeInteraction/, 'structured teaching interaction renderer missing');
assert.match(appSource, /Replay this step/, 'detective narration replay control missing');
assert.match(css, /\.matching-interaction/, 'matching interaction styles missing');
assert.match(css, /\.sequence-interaction/, 'sequence interaction styles missing');
assert.match(css, /\.teaching-mentor-panel/, 'expanded detective mentor presentation missing');

const interactions = [];
for (const module of Object.values(teachingModules)) {
  for (const variant of Object.values(module.variants || {})) {
    if (!variant) continue;
    for (const phase of ['together', 'supported', 'independent', 'transfer']) {
      const item = variant[phase];
      if (item?.interaction && item.interaction !== 'choice') {
        interactions.push({ moduleId: module.id, stage: variant.stage, phase, interaction: item.interaction, item });
      }
    }
  }
}

assert.ok(interactions.some((entry) => entry.interaction === 'match'), 'no real matching lesson found');
assert.ok(interactions.some((entry) => entry.interaction === 'sequence'), 'no real sequencing lesson found');
for (const entry of interactions) {
  if (entry.interaction === 'match') {
    assert.ok(entry.item.matchPairs?.length >= 2, `${entry.moduleId}/${entry.phase} match has too few pairs`);
  }
  if (entry.interaction === 'sequence') {
    assert.ok(entry.item.sequenceTokens?.length >= 2, `${entry.moduleId}/${entry.phase} sequence has too few tokens`);
  }
}

const phonBlend = teachingModules['TEACH.PHON.BLEND'];
assert.ok(phonBlend, 'phoneme blending teaching module missing');
assert.equal(phonBlend.variants['young-investigator'].together.interaction, 'match');
const letterSound = teachingModules['TEACH.CODE.LETTER_SOUND'];
assert.equal(letterSound.variants['young-investigator'].together.interaction, 'match');
const segment = teachingModules['TEACH.PHON.SEGMENT'];
assert.equal(segment.variants['young-investigator'].supported.interaction, 'sequence');

console.log('Reading Detective visual world + narration + interaction repair verification: PASS');
console.log(`Verified 3 stage environments and ${interactions.length} non-choice teaching interactions, plus automatic narration, replay controls, and mentor-presence contracts.`);
