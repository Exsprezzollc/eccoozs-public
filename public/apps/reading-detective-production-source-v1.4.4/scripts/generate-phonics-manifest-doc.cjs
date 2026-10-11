// Regenerates docs/RD-PHONEME-AUDIO-MANIFEST.md from the source manifest so the
// recording checklist can never drift from what the app actually loads.
// Usage: npx tsc -p tsconfig.core.json && node scripts/generate-phonics-manifest-doc.cjs
const fs = require('node:fs');
const path = require('node:path');
const { phonicsAudioAssets, PHONICS_AUDIO_BASE } = require('../dist-core/src/content/audio/phonicsManifest.js');
const { teachingModules } = require('../dist-core/src/content/teachingModules.js');

const uses = {};
const add = (tok, where) => {
  if (!tok) return;
  for (const a of phonicsAudioAssets) {
    if (a.matches.some((m) => m.trim().toLowerCase() === String(tok).trim().toLowerCase())) {
      (uses[a.id] = uses[a.id] || new Set()).add(where);
    }
  }
};
for (const m of Object.values(teachingModules)) {
  for (const s of Object.keys(m.variants || {})) {
    const v = m.variants[s];
    if (!v) continue;
    for (const p of ['together', 'supported', 'independent', 'transfer']) {
      const it = v[p];
      if (!it) continue;
      const w = `${m.id} (${s}, ${p})`;
      add(it.audioText, w);
      (it.matchPairs || []).forEach((x) => { add(x.leftAudioText, w); add(x.rightAudioText, w); });
      (it.sequenceTokens || []).forEach((x) => add(x.audioText, w));
      if (it.buildTarget) add(it.buildTarget.audioText, w);
      if (it.spellTarget) add(it.spellTarget.audioText, w);
    }
    if (v.model && v.model.audioText) add(v.model.audioText, `${m.id} (${s}, model)`);
  }
}
const esc = (s) => String(s).replace(/\|/g, '\\|');
const count = (k) => phonicsAudioAssets.filter((a) => a.kind === k).length;
const total = phonicsAudioAssets.length;
const pending = phonicsAudioAssets.filter((a) => a.status === 'pending').length;

let md = `# Reading Detective — Phoneme / Phonics Audio Asset Manifest (v1.4.4)

**Status: ${total - pending} of ${total} approved recordings exist. ${pending} assets are PENDING.** No recordings were generated or fabricated.

This checklist is generated from \`src/content/audio/phonicsManifest.ts\` (the single source of truth) by \`scripts/generate-phonics-manifest-doc.cjs\`. Until an asset is recorded, the app never presents browser text-to-speech as the authoritative pronunciation: it voices a clearly labelled approximation and shows "Approximate sound — final recording coming soon."

## How to add a recording

1. Record to the spec below and export as mono MP3 (44.1 kHz, about 128 kbps, peak-normalized to about -3 dBFS, no more than 150 ms of leading or trailing silence).
2. Save it at \`public/${PHONICS_AUDIO_BASE}/<filename>\`.
3. In \`phonicsManifest.ts\`, change that asset's \`status\` from \`"pending"\` to \`"recorded"\`.
4. Run \`npm run qa:production\`. No lesson logic changes are required.

## General recording notes

- Use one consistent adult voice, recorded in a quiet room with a close microphone.
- Continuant sounds (/m/, /s/, /f/, /l/, /n/, /r/, /sh/) are held about one second with no added vowel.
- Stop sounds (/p/, /t/, /d/, /g/, /k/) are clipped; say /p/, never "puh."
- Short vowels use the short-vowel sound (/a/ as in map, /e/ as in red, /i/ as in bin, /o/ as in fog, /u/ as in sun).
- Decoding sequences: each sound with a brief pause (about half a second), then the blended word at a natural, unhurried pace.
- Have each file reviewed by a reading specialist before switching it to \`recorded\`.

## Asset checklist

| Done | Asset ID | Kind | Sound / word | Filename | Curriculum use | Recording note |
|---|---|---|---|---|---|---|
`;
for (const a of phonicsAudioAssets) {
  const set = uses[a.id];
  const u = set
    ? [...set].slice(0, 4).join('; ') + (set.size > 4 ? ` (+${set.size - 4} more)` : '')
    : `${a.curriculum.domains.join(', ')}: appears in on-screen phoneme labels and decoding sequences; standalone audio reserved for expansion`;
  md += `| ${a.status === 'recorded' ? '☑' : '☐'} | \`${a.id}\` | ${a.kind} | ${esc(a.label)} | \`${a.file}\` | ${esc(u)} | ${esc(a.recordingNote || '')} |\n`;
}
md += `\n**Totals:** ${total} assets (${count('phoneme')} phonemes, ${count('blend')} digraph, ${count('decoding-sequence')} decoding sequences, ${count('decodable-word')} decodable words). ${Object.keys(uses).length} are referenced by current teaching content; the rest appear in on-screen phoneme labels, decoding sequences, or encoding/connected-text words and are ready for standalone audio as content expands.\n`;

fs.writeFileSync(path.join(__dirname, '..', 'docs/RD-PHONEME-AUDIO-MANIFEST.md'), md);
console.log(`Wrote docs/RD-PHONEME-AUDIO-MANIFEST.md: ${total} assets, ${pending} pending, ${Object.keys(uses).length} referenced by content.`);
