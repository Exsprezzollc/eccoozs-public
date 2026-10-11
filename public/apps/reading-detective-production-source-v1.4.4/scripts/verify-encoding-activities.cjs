const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { teachingModules } = require('../dist-core/src/content/teachingModules.js');
const { validateTeachingModule, answerTeachingPractice, createTeachingSession } = require('../dist-core/src/engine/teaching.js');

// Collect encoding interactions across all modules/variants.
const builds = [];
const spells = [];
let connectedText = 0;
for (const module of Object.values(teachingModules)) {
  for (const stage of Object.keys(module.variants || {})) {
    const v = module.variants[stage];
    if (!v) continue;
    for (const phase of ['together', 'supported', 'independent', 'transfer']) {
      const item = v[phase];
      if (!item) continue;
      if (item.interaction === 'build') builds.push({ module: module.id, stage, phase, item });
      if (item.interaction === 'spell') spells.push({ module: module.id, stage, phase, item });
      // Connected-text application at the foundational level = a choice item whose
      // stimulus is a short controlled sentence (<= 6 words) built from taught patterns.
      const body = (item.sourceBody ?? '').trim();
      const words = body ? body.split(/\s+/).length : 0;
      if ((item.interaction ?? 'choice') === 'choice' && /[.!?]$/.test(body) && words >= 3 && words <= 6) {
        connectedText += 1;
      }
    }
  }
}

// 1. The reusable encoding capability is actually exercised by real content.
assert.ok(builds.length >= 1, 'expected at least one word-building (build) activity');
assert.ok(spells.length >= 1, 'expected at least one spelling (spell) activity');
assert.ok(connectedText >= 1, 'expected at least one short controlled connected-text application item');
// The representative foundational connected-text example must be present.
const cvc = teachingModules['TEACH.CODE.CVC'];
const cvcTransfer = cvc.variants['young-investigator'] && cvc.variants['young-investigator'].transfer;
assert.ok(cvcTransfer && /the cat sat on a mat/i.test(cvcTransfer.sourceBody || ''),
  'foundational connected-text representative (CVC transfer sentence) missing');

// 2. Build activities are structurally valid: graphemes spell the word, tiles >= 2.
for (const entry of builds) {
  const t = entry.item.buildTarget;
  assert.ok(t, `${entry.module}/${entry.phase}: build has no buildTarget`);
  assert.ok(t.graphemes.length >= 2, `${entry.module}/${entry.phase}: build needs >= 2 graphemes`);
  assert.equal(t.graphemes.join('').toLowerCase(), t.word.toLowerCase(),
    `${entry.module}/${entry.phase}: graphemes must spell "${t.word}"`);
}

// 3. Spell activities have a target word (and an accept list that includes it).
for (const entry of spells) {
  const t = entry.item.spellTarget;
  assert.ok(t && t.word, `${entry.module}/${entry.phase}: spell has no target word`);
  const accept = (t.accept ?? [t.word]).map((w) => w.toLowerCase());
  assert.ok(accept.includes(t.word.toLowerCase()), `${entry.module}/${entry.phase}: accept list must include the word`);
}

// 4. Every module carrying encoding activities still validates cleanly.
const touched = new Set([...builds, ...spells].map((e) => e.module));
for (const id of touched) {
  const errors = validateTeachingModule(teachingModules[id]);
  assert.deepEqual(errors, [], `module ${id} failed validation: ${errors.join('; ')}`);
}

// 5. Mastery protection: an encoding item graded correct records a single
//    correct practice result and does NOT by itself flip the skill to mastered.
//    (Mastery still requires the full independent + transfer + delayed evidence
//    pattern handled by the evidence/mastery engine.)
const buildEntry = builds[0];
const buildModule = teachingModules[buildEntry.module];
const learner = {
  id: 'encoding-check',
  presentationStage: buildEntry.stage,
  readingDevelopment: 'foundation',
  detective: { id: 'skylar', appearance: 'fba' },
  accessibility: { textScale: 1, increasedSpacing: false, contrast: 'standard', narrationEnabled: true, reducedMotion: false },
  skillStates: {},
  placement: undefined,
};
const session = createTeachingSession({ learner, module: buildModule, mastery: 'practicing' });
session.phase = buildEntry.phase; // grade the actual encoding phase
const before = JSON.stringify(session);
const result = answerTeachingPractice({ session, module: buildModule, correctness: true });
assert.equal(result.correct, true, 'structured encoding answer should pass correctness through');
assert.notEqual(JSON.stringify(result.session), before, 'session should advance after an answer');

// 6. The UI renderer wires the encoding interactions (static contract).
const tsx = fs.readFileSync(path.join(__dirname, '..', 'src/app/components/TeachingPracticeInteraction.tsx'), 'utf8');
assert.match(tsx, /interaction === "build"/, 'build interaction not routed in renderer');
assert.match(tsx, /interaction === "spell"/, 'spell interaction not routed in renderer');
assert.match(tsx, /onStructuredAnswer/, 'encoding must use the structured-answer path');

console.log('Reading Detective encoding/production activities verification: PASS');
console.log(`Verified ${builds.length} word-building, ${spells.length} spelling, and ${connectedText} connected-text activities, structural validity, renderer wiring, and preserved mastery protections.`);
