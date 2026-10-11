const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { detectives } = require('../dist-core/src/content/detectives/roster.js');
const { detectiveVoicePreviewText, supportsSpeechSynthesis } = require('../dist-core/src/engine/voice.js');

const root = path.resolve(__dirname, '..');
let portraits = 0;
for (const detective of detectives) {
  for (const appearance of detective.appearances) {
    const file = path.join(root, 'public', 'assets', 'detectives', `${detective.id}-${appearance}.jpg`);
    assert.ok(fs.existsSync(file), `missing detective portrait ${file}`);
    const size = fs.statSync(file).size;
    assert.ok(size > 10000, `portrait looks truncated: ${file} (${size} bytes)`);
    portraits += 1;
  }
  const preview = detectiveVoicePreviewText(detective);
  assert.ok(preview.includes(detective.name), `${detective.id} voice preview omits name`);
  assert.ok(preview.includes(detective.descriptor), `${detective.id} voice preview omits descriptor`);
}
assert.equal(portraits, 36, 'expected 18 detectives x 2 appearance variants');
assert.equal(supportsSpeechSynthesis(), false, 'Node verification should degrade safely without browser speech synthesis');
assert.ok(fs.existsSync(path.join(root,'public','assets','reference','detective-selection-approved.jpg')));

for (const stage of ['young-investigator', 'investigator', 'lead-investigator', 'welcome-headquarters']) {
  const envFile = path.join(root, 'public', 'assets', 'environments', `${stage}.jpg`);
  assert.ok(fs.existsSync(envFile), `missing stage environment ${envFile}`);
  assert.ok(fs.statSync(envFile).size > 100000, `stage environment looks truncated: ${envFile}`);
}

assert.ok(fs.existsSync(path.join(root,'vercel.json')), 'deployment security config missing');
console.log('Reading Detective production asset + voice contract verification: PASS');
console.log(`Verified ${portraits} local detective portrait assets, 4 environment assets, voice preview contracts, safe degradation without browser speech synthesis, approved visual reference, and deployment config.`);
