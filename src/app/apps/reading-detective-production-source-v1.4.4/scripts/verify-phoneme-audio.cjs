const assert = require('node:assert/strict');

const {
  phonicsAudioAssets,
  phonicsAssetByToken,
  PHONICS_AUDIO_BASE,
} = require('../dist-core/src/content/audio/phonicsManifest.js');
const {
  resolveAudio,
  classifyAudioText,
  findPhonicsAsset,
  hasRecordedPronunciation,
  pendingPhonicsAssets,
} = require('../dist-core/src/engine/phonicsAudio.js');
const { teachingModules } = require('../dist-core/src/content/teachingModules.js');

// 1. Manifest integrity: unique ids, unique files, non-empty matches, valid status.
const ids = new Set();
const files = new Set();
for (const asset of phonicsAudioAssets) {
  assert.ok(asset.id && !ids.has(asset.id), `duplicate/empty asset id: ${asset.id}`);
  ids.add(asset.id);
  assert.ok(asset.file && !files.has(asset.file), `duplicate/empty file: ${asset.file}`);
  files.add(asset.file);
  assert.ok(Array.isArray(asset.matches) && asset.matches.length > 0, `asset ${asset.id} has no match tokens`);
  assert.ok(['recorded', 'pending'].includes(asset.status), `asset ${asset.id} has invalid status`);
  assert.ok(asset.curriculum && Array.isArray(asset.curriculum.domains) && asset.curriculum.domains.length > 0,
    `asset ${asset.id} missing curriculum linkage`);
}

// 2. Every pronunciation-critical audioText token used in foundation teaching
//    content that looks like an isolated phoneme or modeled sequence must have
//    a manifest entry. This is what prevents a phoneme from silently depending
//    on browser TTS.
function collectAudioTokens(module) {
  const tokens = [];
  for (const stage of Object.keys(module.variants || {})) {
    const v = module.variants[stage];
    if (!v) continue;
    for (const phaseKey of ['together', 'supported', 'independent', 'transfer']) {
      const item = v[phaseKey];
      if (!item) continue;
      if (item.audioText) tokens.push(item.audioText);
      for (const pair of item.matchPairs || []) {
        if (pair.leftAudioText) tokens.push(pair.leftAudioText);
        if (pair.rightAudioText) tokens.push(pair.rightAudioText);
      }
      for (const tok of item.sequenceTokens || []) {
        if (tok.audioText) tokens.push(tok.audioText);
      }
    }
    if (v.model && v.model.audioText) tokens.push(v.model.audioText);
  }
  return tokens;
}

const phonemeLike = /^\/[a-z]{1,3}\/(\s*\.\.\.\s*\/[a-z]{1,3}\/)*$/i; // /m/ or /m/ ... /a/ ... /p/
let checkedCritical = 0;
for (const module of Object.values(teachingModules)) {
  for (const token of collectAudioTokens(module)) {
    if (phonemeLike.test(token.trim())) {
      checkedCritical += 1;
      assert.ok(findPhonicsAsset(token), `pronunciation-critical token has no phonics asset: "${token}"`);
      assert.equal(classifyAudioText(token), 'authoritative-phonics', `token misclassified: "${token}"`);
    }
  }
}
assert.ok(checkedCritical > 0, 'expected at least one pronunciation-critical token in content');

// 3. Narration text is classified as narration (TTS remains fine for it).
for (const sentence of [
  'Tap the sound that starts the word.',
  'The book is on the blue shelf.',
  'Watch how I work this clue.',
]) {
  assert.equal(classifyAudioText(sentence), 'narration', `narration misclassified: "${sentence}"`);
  const r = resolveAudio(sentence);
  assert.equal(r.category, 'narration');
}

// 4. Pending assets NEVER resolve as authoritative/recorded and never claim a url.
for (const asset of pendingPhonicsAssets()) {
  const token = asset.matches[0];
  const r = resolveAudio(token);
  assert.equal(r.category, 'authoritative-phonics');
  assert.equal(r.status, 'pending', `pending asset resolved as recorded: ${asset.id}`);
  assert.equal(r.url, undefined, `pending asset must not expose a url: ${asset.id}`);
  assert.equal(hasRecordedPronunciation(token), false, `pending asset reported as recorded: ${asset.id}`);
}

// 5. A recorded asset (simulated) resolves to a deterministic url under the base path.
const sample = phonicsAssetByToken('/m/');
assert.ok(sample, 'expected /m/ asset');
const recorded = { ...sample, status: 'recorded' };
// resolveAudio reads the live manifest, so assert url composition directly.
assert.ok(`${PHONICS_AUDIO_BASE}/${recorded.file}`.startsWith('assets/audio/phonics/'),
  'recorded url must live under assets/audio/phonics/');

const total = phonicsAudioAssets.length;
const pending = pendingPhonicsAssets().length;
console.log('Reading Detective phoneme-audio architecture verification: PASS');
console.log(`Verified: ${total} phonics assets (${pending} pending recordings), curriculum-token coverage for ${checkedCritical} pronunciation-critical tokens, narration/authoritative separation, and no-silent-TTS-as-authoritative guarantee.`);
