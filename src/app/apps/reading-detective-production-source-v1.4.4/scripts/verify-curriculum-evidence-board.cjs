const assert = require('node:assert/strict');
const { cases } = require('../dist-core/src/content/cases/index.js');
const { skillGraph } = require('../dist-core/src/content/skillGraph.js');
const { curriculumMap } = require('../dist-core/src/content/curriculum.js');
const { validateCase } = require('../dist-core/src/engine/caseValidation.js');
const {
  createEvidenceBoardState,
  placeEvidenceCard,
  setEvidenceZoomSource,
  setEvidenceZoomSentence,
  setEvidenceZoomPhrase,
  gradeEvidenceBoard,
} = require('../dist-core/src/engine/evidenceBoard.js');
const { createCaseSession, caseSessionReducer } = require('../dist-core/src/engine/caseSession.js');
const { validateSkillGraph, validateCurriculumMap } = require('../dist-core/src/engine/curriculumValidation.js');

assert.ok(Object.keys(skillGraph).length >= 50, 'expanded curriculum should contain at least 50 skills');
assert.deepEqual(validateSkillGraph(skillGraph), []);
assert.deepEqual(validateCurriculumMap(curriculumMap, skillGraph, cases), []);

for (const readingCase of Object.values(cases)) {
  assert.deepEqual(validateCase(readingCase, skillGraph), { valid: true, errors: [] }, `${readingCase.id} should validate`);
}

const mainIdea = cases['CASE.ELEM.006'];
const sortStep = mainIdea.steps.find((step) => step.id === 'supporting-details');
let sortState = createEvidenceBoardState(sortStep.id, '2026-08-18T00:00:00.000Z');
sortState = placeEvidenceCard(sortState, 'shade', 'evidence');
sortState = placeEvidenceCard(sortState, 'water', 'evidence');
sortState = placeEvidenceCard(sortState, 'cooler', 'evidence');
sortState = placeEvidenceCard(sortState, 'fruit', 'unsupported');
const sortGrade = gradeEvidenceBoard(sortStep.evidenceBoard, sortState);
assert.equal(sortGrade.correct, true);
assert.equal(sortGrade.correctTargets, 4);

let wrongSort = createEvidenceBoardState(sortStep.id);
wrongSort = placeEvidenceCard(wrongSort, 'shade', 'unsupported');
wrongSort = placeEvidenceCard(wrongSort, 'water', 'evidence');
const wrongSortGrade = gradeEvidenceBoard(sortStep.evidenceBoard, wrongSort);
assert.equal(wrongSortGrade.correct, false);
assert.deepEqual(wrongSortGrade.incorrectCardIds, ['shade']);
assert.ok(wrongSortGrade.missingCardIds.includes('cooler'));

const recipe = cases['CASE.ELEM.005'];
const zoomStep = recipe.steps.find((step) => step.id === 'evidence-zoom');
let zoomState = createEvidenceBoardState(zoomStep.id);
zoomState = setEvidenceZoomSource(zoomState, 'recipe');
zoomState = setEvidenceZoomSentence(zoomState, 'Because the apple is washed first, dirt is removed before it is cut.');
zoomState = setEvidenceZoomPhrase(zoomState, 'dirt is removed before it is cut');
const zoomGrade = gradeEvidenceBoard(zoomStep.evidenceBoard, zoomState);
assert.equal(zoomGrade.correct, true);
assert.deepEqual(zoomGrade.zoomMatches, { source: true, sentence: true, phrase: true });

let partialZoom = createEvidenceBoardState(zoomStep.id);
partialZoom = setEvidenceZoomSource(partialZoom, 'recipe');
partialZoom = setEvidenceZoomSentence(partialZoom, 'Because the apple is washed first, dirt is removed before it is cut.');
partialZoom = setEvidenceZoomPhrase(partialZoom, 'cut the apple into slices');
const partialZoomGrade = gradeEvidenceBoard(zoomStep.evidenceBoard, partialZoom);
assert.equal(partialZoomGrade.correct, false);
assert.equal(partialZoomGrade.correctTargets, 2);

const rumor = cases['CASE.JR.003'];
const compareStep = rumor.steps.find((step) => step.id === 'relevance-sort');
let compareState = createEvidenceBoardState(compareStep.id);
compareState = placeEvidenceCard(compareState, 'office-card', 'confirmed');
compareState = placeEvidenceCard(compareState, 'club-card', 'possible');
compareState = placeEvidenceCard(compareState, 'chat-card', 'unsupported');
assert.equal(gradeEvidenceBoard(compareStep.evidenceBoard, compareState).correct, true);

let session = createCaseSession({ learnerId: 'evidence-reader', readingCase: mainIdea, now: '2026-08-18T00:00:00.000Z' });
session = caseSessionReducer(session, { type: 'SET_EVIDENCE_BOARD', stepId: sortStep.id, board: sortState });
assert.deepEqual(session.evidenceBoards[sortStep.id].placements, sortState.placements);
const hydrated = caseSessionReducer(session, { type: 'HYDRATE', state: JSON.parse(JSON.stringify(session)) });
assert.deepEqual(hydrated.evidenceBoards[sortStep.id].placements, sortState.placements);

const stageCaseCounts = Object.values(cases).reduce((acc, readingCase) => {
  for (const stage of readingCase.presentationStages) acc[stage] = (acc[stage] ?? 0) + 1;
  return acc;
}, {});
assert.ok(stageCaseCounts['young-investigator'] >= 6);
assert.ok(stageCaseCounts.investigator >= 4);
assert.ok(stageCaseCounts['lead-investigator'] >= 4);

console.log('Reading Detective curriculum-expansion + evidence-board verification: PASS');
console.log(`Verified: ${Object.keys(skillGraph).length} skills, ${Object.keys(cases).length} cases, acyclic prerequisites, stage-compatible curriculum strands, sort/compare boards, source→sentence→phrase zoom, board grading, and resumable board state.`);
