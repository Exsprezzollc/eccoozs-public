const assert = require('node:assert/strict');
const { cases } = require('../dist-core/src/content/cases/index.js');
const { reviewVariations } = require('../dist-core/src/content/reviewVariations.js');
const { skillGraph } = require('../dist-core/src/content/skillGraph.js');
const { teachingModules, teachingModuleBySkill } = require('../dist-core/src/content/teachingModules.js');
const { materializeVariation, compatibleScenarios } = require('../dist-core/src/engine/variation.js');
const { validateVariationTemplate } = require('../dist-core/src/engine/variationValidation.js');
const { validateCase } = require('../dist-core/src/engine/caseValidation.js');
const { routeNextLearningActivity } = require('../dist-core/src/engine/activityRouting.js');

const stages = ['young-investigator','investigator','lead-investigator'];
let generated = 0;
let distinctFingerprints = 0;

for (const template of Object.values(reviewVariations)) {
  const errors = validateVariationTemplate(template, skillGraph);
  assert.deepEqual(errors, [], `${template.id}: ${errors.join('; ')}`);
  for (const stage of stages) {
    const compatible = compatibleScenarios(template, stage);
    if (!compatible.length) continue;
    const fingerprints = new Set();
    const choiceOrders = new Set();
    for (let i=0;i<300;i++) {
      const item = materializeVariation({ template, stage, seed: `stress-${template.id}-${stage}-${i}` });
      generated += 1;
      fingerprints.add(item.fingerprint);
      choiceOrders.add(item.choices.map((choice)=>choice.id).join('|'));
      const ids = new Set(item.choices.map((choice)=>choice.id));
      for (const correct of item.correctChoiceIds) assert.ok(ids.has(correct), `${template.id} generated missing correct choice ${correct}`);
      assert.ok(item.prompt.trim().length > 0, `${template.id} generated empty prompt`);
      assert.ok(item.sourceBody.trim().length > 0, `${template.id} generated empty source`);
      assert.equal(/\{\{[^}]+\}\}/.test(item.prompt + item.sourceBody + item.sourceTitle), false, `${template.id} leaked token`);
      const labels = item.choices.map((choice)=>choice.label.trim().toLowerCase());
      assert.equal(new Set(labels).size, labels.length, `${template.id} generated duplicate answer labels`);
    }
    assert.equal(fingerprints.size, compatible.length, `${template.id}/${stage} failed to reach all compatible scenarios`);
    if (template.shuffleChoices && template.choices.length > 1) assert.ok(choiceOrders.size > 1, `${template.id}/${stage} shuffle never varied`);
    distinctFingerprints += fingerprints.size;
  }
}

for (const readingCase of Object.values(cases)) {
  const result = validateCase(readingCase, skillGraph);
  assert.equal(result.valid, true, `${readingCase.id}: ${result.errors.join('; ')}`);
  assert.equal(new Set(readingCase.steps.map((s)=>s.id)).size, readingCase.steps.length, `${readingCase.id} duplicate step IDs`);
  assert.equal(new Set(readingCase.sources.map((s)=>s.id)).size, readingCase.sources.length, `${readingCase.id} duplicate source IDs`);
}

for (const [skillId, module] of Object.entries(teachingModuleBySkill)) {
  assert.ok(skillGraph[skillId], `teaching module references missing skill ${skillId}`);
  assert.ok(teachingModules[module.id], `teaching module ${module.id} missing from registry`);
  for (const stage of module.stages) assert.ok(module.variants[stage], `${module.id} missing ${stage} presentation`);
}

function state(skillId, mastery) { return { skillId, mastery, confidence: mastery==='secure'?1:0.6 }; }
function makeLearner(stage, seed) {
  const states = {};
  let n = seed;
  for (const [skillId, def] of Object.entries(skillGraph)) {
    if (!def.presentationStages.includes(stage)) continue;
    n = (n * 1664525 + 1013904223) >>> 0;
    const levels=['not-introduced','introduced','guided','developing','independent','transferred','secure'];
    states[skillId]=state(skillId,levels[n%levels.length]);
  }
  return {
    id:`stress-${stage}-${seed}`, presentationStage:stage, readingDevelopment:'comprehender',
    detective:{id:'x',appearance:'fba'}, accessibility:{textScale:1,increasedSpacing:false,contrast:'standard',narrationEnabled:true,speechRate:1,reducedMotion:false,focusMode:false,spokenResponseEnabled:true},
    skillStates:states, createdAt:'2026-08-18T00:00:00.000Z', updatedAt:'2026-08-18T00:00:00.000Z'
  };
}
for (const stage of stages) {
  for (let i=1;i<=500;i++) {
    const learner=makeLearner(stage,i);
    const route=routeNextLearningActivity({learner,cases,caseMap:[],reviews:[],variationTemplates:reviewVariations,skillGraph});
    assert.ok(route && typeof route.kind==='string', `router returned invalid result for ${stage}/${i}`);
    if (route.kind==='case') {
      const c=cases[route.caseId]; assert.ok(c,`router returned missing case ${route.caseId}`); assert.ok(c.presentationStages.includes(stage),`router crossed presentation stage ${stage} -> ${c.id}`);
    }
    if (route.kind==='teaching') {
      const module=teachingModules[route.moduleId]; assert.ok(module,`router returned missing module ${route.moduleId}`); assert.ok(module.stages.includes(stage),`router returned incompatible teaching ${route.moduleId}`);
    }
  }
}

console.log('Reading Detective content stress verification: PASS');
console.log(`Generated ${generated} controlled review items across ${distinctFingerprints} stage-compatible scenario fingerprints; validated ${Object.keys(cases).length} cases and 1,500 randomized learner routes.`);
