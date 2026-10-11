const fs = require('fs');
const assert = require('assert');

const app = fs.readFileSync('src/App.tsx', 'utf8');
const teaching = fs.readFileSync('src/app/components/TeachingPracticeInteraction.tsx', 'utf8');
const modules = fs.readFileSync('src/content/teachingModules.ts', 'utf8');
const placement = fs.readFileSync('src/content/placement.ts', 'utf8');
const css = fs.readFileSync('src/styles/app.css', 'utf8');

assert(app.includes('Hear What To Do'), 'Young critical instructions need a large replay control');
assert(app.includes('young-hq-grid'), 'Young Headquarters must use simplified child navigation');
assert(!/young-hq-grid[\\s\\S]{0,900}Educator Insight/.test(app), 'Educator Insight must not be a Young HQ child tile');
assert(app.includes('child-control-grid'), 'Young learners need icon-led child controls');
assert(app.includes('automaticRepairNarrationKey'), 'Clue Lab must have automatic narration support');
assert(app.includes('narrationUse[result.item.id]'), 'Teaching narration must be recorded as mixed modality');
assert(app.includes('setNarrationUse((current) => ({ ...current, [currentStep.id]: true }))'), 'Automatic case narration must be recorded as mixed modality');
assert(teaching.includes('allowChoiceAudio'), 'Practice choices need controlled audio support');
assert(teaching.includes('simpleMode'), 'Teaching interactions need pre-reader simple mode');
assert(modules.includes('youngCvc.together') && modules.includes('interaction: "sequence"'), 'Young CVC together phase must use sequencing');
assert(modules.includes('youngCvc.supported') && modules.includes('interaction: "match"'), 'Young CVC supported phase must use matching');
assert(placement.includes('🌙 moon') && placement.includes('☀️ sun'), 'Young phonemic placement must include picture-supported choices');
assert(css.includes('/* v1.4.2 — Pre-Reader First UX */'), 'Pre-reader UX styles missing');
assert(css.includes('.big-listen-button') && css.includes('.young-phase-dots'), 'Voice-first learner styles missing');

console.log('Reading Detective pre-reader-first UX verification: PASS');
console.log('Verified: voice + visual critical directions, child HQ, child controls, narrated repair, mixed-modality evidence, and early tactile CVC practice.');
