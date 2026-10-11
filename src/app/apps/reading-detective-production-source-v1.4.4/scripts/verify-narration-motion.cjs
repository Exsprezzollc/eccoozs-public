const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const voice = require('../dist-core/src/engine/voice.js');

const detective = { name: 'Skylar', personality: 'patient', descriptor: 'careful reader', dialogue: { evidence_prompt: 'Show me the clue.' } };
const prefs = (overrides = {}) => ({ textScale: 1, increasedSpacing: false, contrast: 'standard', narrationEnabled: true, reducedMotion: false, speechRate: 1, ...overrides });

function installSpeech({ mode = 'normal' } = {}) {
  const state = { spoken: [], cancelled: 0 };
  class FakeUtterance {
    constructor(text) { this.text = text; this.rate = 1; this.pitch = 1; this.lang = 'en-US'; this.voice = null; this.onstart = null; this.onend = null; this.onerror = null; }
  }
  globalThis.SpeechSynthesisUtterance = FakeUtterance;
  globalThis.speechSynthesis = {
    getVoices: () => [{ name: 'US Voice', lang: 'en-US', localService: true, default: true }],
    cancel: () => { state.cancelled += 1; },
    speak: (u) => {
      state.spoken.push(u);
      if (mode === 'normal') { u.onstart && u.onstart(); u.onend && u.onend(); }
      if (mode === 'error') { u.onstart && u.onstart(); u.onerror && u.onerror(); }
      // mode 'silent' leaves lifecycle unfired.
    },
  };
  return state;
}

function clearSpeech() {
  delete globalThis.SpeechSynthesisUtterance;
  delete globalThis.speechSynthesis;
}

// --- Narration unit tests -------------------------------------------------

// 1. Speaking begins and ends: onStart then onEnd both fire; cancel precedes speak.
(() => {
  const state = installSpeech({ mode: 'normal' });
  let started = 0, ended = 0;
  const ok = voice.speakDetectiveText({ text: 'Hello', detective, preferences: prefs(), onStart: () => started++, onEnd: () => ended++ });
  assert.equal(ok, true, 'speak should report success when supported');
  assert.equal(started, 1, 'onStart should fire once');
  assert.equal(ended, 1, 'onEnd should fire once');
  assert.equal(state.cancelled, 1, 'previous narration should be cancelled before speaking');
  assert.equal(state.spoken.length, 1, 'exactly one utterance should be spoken');
})();

// 2. State clears on error: onerror is wired to the same onEnd handler.
(() => {
  installSpeech({ mode: 'error' });
  let ended = 0;
  voice.speakDetectiveText({ text: 'Hello', detective, preferences: prefs(), onEnd: () => ended++ });
  assert.equal(ended, 1, 'onEnd must fire when narration errors so the app never sticks in speaking state');
})();

// 3. Repeat narration works (a second call speaks again and cancels the first).
(() => {
  const state = installSpeech({ mode: 'normal' });
  voice.speakDetectiveText({ text: 'One', detective, preferences: prefs() });
  voice.speakDetectiveText({ text: 'Two', detective, preferences: prefs() });
  assert.equal(state.spoken.length, 2, 'repeat narration should speak again');
  assert.equal(state.cancelled, 2, 'each narration should cancel prior speech');
})();

// 4. Narration turned off: onUnavailable fires, nothing is spoken.
(() => {
  const state = installSpeech({ mode: 'normal' });
  let unavailable = 0;
  const ok = voice.speakDetectiveText({ text: 'Hi', detective, preferences: prefs({ narrationEnabled: false }), onUnavailable: () => unavailable++ });
  assert.equal(ok, false);
  assert.equal(unavailable, 1, 'onUnavailable should fire when narration is disabled');
  assert.equal(state.spoken.length, 0, 'nothing should be spoken when narration is off');
})();

// 5. No SpeechSynthesis support: graceful fallback, no throw.
(() => {
  clearSpeech();
  assert.equal(voice.supportsSpeechSynthesis(), false);
  assert.deepEqual(voice.voiceOptions(), [], 'voiceOptions must be empty without support');
  let unavailable = 0;
  const ok = voice.speakDetectiveText({ text: 'Hi', detective, preferences: prefs(), onUnavailable: () => unavailable++ });
  assert.equal(ok, false);
  assert.equal(unavailable, 1, 'onUnavailable should fire when speech is unsupported');
})();
clearSpeech();

// --- Motion / speaking-state contract checks ------------------------------

const appSource = fs.readFileSync(path.join(__dirname, '..', 'src/App.tsx'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, '..', 'src/styles/app.css'), 'utf8');

// Speaking state is applied and guarded against stale/overlapping utterances.
assert.match(appSource, /isSpeaking \? "app-speaking"/, 'app-speaking state class not wired');
assert.match(appSource, /utteranceSeq/, 'per-utterance guard (utteranceSeq) missing');
assert.match(appSource, /id === utteranceSeq\.current/, 'speaking handlers must ignore stale utterances');
assert.match(appSource, /\.\.\.speakingHandlers\(\)/, 'speaking handlers must be spread into narration calls');

// Reduced motion genuinely disables decorative motion (class + OS preference).
assert.match(css, /\.reduced-motion \*[^{]*\{[^}]*animation: none !important/, 'reduced-motion kill-switch missing');
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/, 'prefers-reduced-motion media query missing');

// Meaningful animations still exist (motion was not simply deleted).
const keyframes = (css.match(/@keyframes/g) || []).length;
assert.ok(keyframes >= 6, `expected several keyframe animations, found ${keyframes}`);

// Animation must not block reading: the learner's action invite stops pulsing
// while the mentor is speaking.
assert.match(css, /\.app-speaking \.giant-action \{ animation: none/, 'giant action should not animate while speaking');

// No unbounded state loops: transient overlays auto-clear via timeouts that are
// also cleaned up (celebration + phonics notice).
assert.match(appSource, /celebrationTimer/, 'celebration timer missing');
assert.match(appSource, /phonicsNoticeTimer/, 'phonics notice timer missing');
assert.match(appSource, /clearTimeout\(celebrationTimer\.current\)/, 'celebration timer not cleared');
assert.match(appSource, /clearTimeout\(phonicsNoticeTimer\.current\)/, 'phonics timer not cleared');

console.log('Reading Detective narration + motion regression verification: PASS');
console.log(`Verified: narration start/end/error/repeat/disabled/unsupported callback lifecycle, app-speaking state guarding, reduced-motion kill-switches, ${keyframes} retained keyframe animations, and non-blocking/non-looping motion contracts.`);
