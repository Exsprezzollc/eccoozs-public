import { getCivicProject, selectAppliedProject } from "../content/highSchoolProjects.js";
import { resolveProjectScenario, selectScenarioVariant } from "../content/highSchoolScenarios.js";
import { getVocabularyForStage, getVocabularyWord } from "../content/vocabulary.js";
import { applyEvidence, deriveRank } from "../learning/mastery.js";
import { applyCreditTransaction } from "../learning/rewards.js";
import { diagnoseProfessionalPrecision } from "../learning/highSchoolPrecision.js";
import { getProfessionalEvidenceChain } from "../content/highSchoolEvidenceChains.js";
import { getProfessionalSourceJudgment, sourceConfidenceOptions } from "../content/highSchoolSourceJudgment.js";
import { getProfessionalDecisionRevision, lateEvidenceImpactOptions, decisionResponseOptions } from "../content/highSchoolDecisionRevision.js";


function seededRandom(seed) {
  let state = (Number(seed) || 1) >>> 0;
  return () => {
    state += 0x6D2B79F5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffledIndices(length, seed) {
  const output = Array.from({ length }, (_, index) => index);
  const random = seededRandom(seed);
  for (let index = output.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [output[index], output[swap]] = [output[swap], output[index]];
  }
  if (output.length > 1 && output.every((value, index) => value === index)) {
    const shift = 1 + (Math.abs(Number(seed) || 0) % (output.length - 1));
    return output.slice(shift).concat(output.slice(0, shift));
  }
  return output;
}

function stringSeed(value) {
  let hash = 2166136261;
  for (const char of String(value || "")) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function resolveActiveAppliedProject(active) {
  if (!active) throw new Error("No active professional project.");
  return resolveProjectScenario(getCivicProject(active.briefId), active.scenarioVariantId || "base");
}

export function createAppliedPresentation(project, seed = Date.now()) {
  const base = Number(seed) || 1;
  const chain = getProfessionalEvidenceChain(project);
  const sourceJudgment = getProfessionalSourceJudgment(project);
  const decisionRevision = getProfessionalDecisionRevision(project);
  return {
    evidenceOrder: shuffledIndices(project.evidence.length, base ^ 0x51a3),
    sourceOrder: shuffledIndices(sourceJudgment.sources.length, base ^ 0x8d27),
    sourceLimitationOrder: shuffledIndices(sourceJudgment.limitationOptions.length, base ^ 0x6e43),
    sourceConfidenceOrder: shuffledIndices(sourceConfidenceOptions.length, base ^ 0xb135),
    vocabularyOrder: shuffledIndices(project.vocabulary.options.length, base ^ 0x9b17),
    reasoningOrder: shuffledIndices(project.reasoning.options.length, base ^ 0xd431),
    recommendationOrder: shuffledIndices(project.recommendation.options.length, base ^ 0x3f29),
    constraintOrder: shuffledIndices(project.constraints.length, base ^ 0x7ac3),
    assumptionOrder: shuffledIndices(chain.assumptionOptions.length, base ^ 0x2e91),
    decisionImpactOrder: shuffledIndices(lateEvidenceImpactOptions.length, base ^ 0xc247),
    decisionResponseOrder: shuffledIndices(decisionResponseOptions.length, base ^ 0xe391)
  };
}

function presentationOrder(active, key, length) {
  const order = active?.presentation?.[key];
  if (!Array.isArray(order) || order.length !== length) return Array.from({ length }, (_, index) => index);
  return order;
}

export function appliedProjectView(project, active) {
  const resolvedProject = resolveProjectScenario(project, active?.scenarioVariantId || "base");
  const evidenceOrder = presentationOrder(active, "evidenceOrder", resolvedProject.evidence.length);
  const baseVocabularyOrder = presentationOrder(active, "vocabularyOrder", resolvedProject.vocabulary.options.length);
  const vocabularyOrder = Array.isArray(active?.precisionRepair?.vocabularyOrder)
    ? active.precisionRepair.vocabularyOrder
    : baseVocabularyOrder;
  const reasoningOrder = presentationOrder(active, "reasoningOrder", resolvedProject.reasoning.options.length);
  const recommendationOrder = presentationOrder(active, "recommendationOrder", resolvedProject.recommendation.options.length);
  const chain = getProfessionalEvidenceChain(resolvedProject);
  const sourceJudgment = getProfessionalSourceJudgment(resolvedProject);
  const sourceOrder = presentationOrder(active, "sourceOrder", sourceJudgment.sources.length);
  const sourceLimitationOrder = presentationOrder(active, "sourceLimitationOrder", sourceJudgment.limitationOptions.length);
  const sourceConfidenceOrder = presentationOrder(active, "sourceConfidenceOrder", sourceConfidenceOptions.length);
  const constraintOrder = presentationOrder(active, "constraintOrder", resolvedProject.constraints.length);
  const assumptionOrder = presentationOrder(active, "assumptionOrder", chain.assumptionOptions.length);
  const decisionRevision = getProfessionalDecisionRevision(resolvedProject);
  const decisionImpactOrder = presentationOrder(active, "decisionImpactOrder", lateEvidenceImpactOptions.length);
  const decisionResponseOrder = presentationOrder(active, "decisionResponseOrder", decisionResponseOptions.length);
  return {
    project: resolvedProject,
    scenarioLabel: resolvedProject.scenarioLabel,
    evidence: evidenceOrder.map((index) => resolvedProject.evidence[index]),
    sourceCards: sourceOrder.map((index) => sourceJudgment.sources[index]),
    sourceStrengthPrompt: sourceJudgment.strengthPrompt,
    sourceLimitationOptions: sourceLimitationOrder.map((index) => sourceJudgment.limitationOptions[index].text),
    sourceConfidencePrompt: sourceJudgment.confidence.prompt,
    sourceConfidenceOptions: sourceConfidenceOrder.map((index) => sourceConfidenceOptions[index]),
    sourceJudgmentTeaching: sourceJudgment.teaching,
    vocabularyStem: active?.precisionRepair?.retryStem || resolvedProject.vocabulary.stem,
    vocabularyOptions: vocabularyOrder.map((index) => resolvedProject.vocabulary.options[index]),
    vocabularyOrder,
    reasoningOptions: reasoningOrder.map((index) => resolvedProject.reasoning.options[index]),
    recommendationOptions: recommendationOrder.map((index) => resolvedProject.recommendation.options[index]),
    constraints: constraintOrder.map((index) => resolvedProject.constraints[index]),
    assumptionOptions: assumptionOrder.map((index) => chain.assumptionOptions[index].text),
    evidenceChain: {
      supportingEvidenceCount: chain.supportingEvidenceIds.length,
      teaching: chain.teaching
    },
    decisionRevision: {
      update: decisionRevision.update,
      impactPrompt: decisionRevision.impactPrompt,
      impactOptions: decisionImpactOrder.map((index) => lateEvidenceImpactOptions[index]),
      responsePrompt: decisionRevision.responsePrompt,
      responseOptions: decisionResponseOrder.map((index) => decisionResponseOptions[index]),
      filedResult: decisionRevision.filedResult,
      teaching: decisionRevision.teaching
    },
    sourceOrder,
    sourceLimitationOrder,
    sourceConfidenceOrder,
    reasoningOrder,
    recommendationOrder,
    constraintOrder,
    assumptionOrder,
    decisionImpactOrder,
    decisionResponseOrder
  };
}

function projectState(profile) {
  return profile.appliedProjects || { active: null, completedBriefIds: [], history: [] };
}

function withProject(profile, active) {
  return { ...profile, appliedProjects: { ...projectState(profile), active } };
}

export function startAppliedProject(profile, projectId = null, seed = Date.now(), now = Date.now()) {
  if (profile.stage !== "High School") throw new Error("Applied professional projects are available only in High School.");
  if (profile.activeSession) throw new Error("Finish the active vocabulary trail before entering a professional project.");
  if (projectState(profile).active) return profile;
  const baseProject = projectId ? getCivicProject(projectId) : selectAppliedProject(profile, seed);
  const scenarioVariantId = selectScenarioVariant(baseProject, profile, seed ^ 0x72d1);
  const project = resolveProjectScenario(baseProject, scenarioVariantId);
  return withProject(profile, {
    id: `high-school:${project.id}:${profile.completedSessions + 1}:${seed}`,
    briefId: project.id,
    scenarioVariantId,
    stepIndex: 0,
    reviewedEvidence: [],
    presentation: createAppliedPresentation(project, seed),
    decisions: {},
    attempts: { sourceStrength: 0, sourceLimitation: 0, sourceConfidence: 0, vocabulary: 0, reasoning: 0, evidenceSupport: 0, constraint: 0, assumption: 0, recommendation: 0, decisionImpact: 0, decisionResponse: 0 },
    chainDraft: { evidenceIds: [] },
    rationale: "",
    creditsEarned: 0,
    startedAt: now
  });
}

export function abandonAppliedProject(profile) {
  if (profile.stage !== "High School") return profile;
  return { ...profile, appliedProjects: { ...projectState(profile), active: null } };
}

export function reviewProjectEvidence(profile, evidenceId) {
  const active = projectState(profile).active;
  if (!active) throw new Error("No active professional project.");
  const project = resolveActiveAppliedProject(active);
  if (!project.evidence.some((item) => item.id === evidenceId)) return profile;
  if (active.reviewedEvidence.includes(evidenceId)) return profile;
  return withProject(profile, { ...active, reviewedEvidence: [...active.reviewedEvidence, evidenceId] });
}

export function advanceAppliedStep(profile) {
  const active = projectState(profile).active;
  if (!active) throw new Error("No active professional project.");
  const project = resolveActiveAppliedProject(active);
  if (active.stepIndex === 1 && active.reviewedEvidence.length < project.evidence.length) return profile;
  if (active.stepIndex === 2 && !sourceJudgmentComplete(active)) return profile;
  if (active.stepIndex === 3 && !active.decisions.vocabulary?.correct) return profile;
  if (active.stepIndex === 4 && !active.decisions.reasoning?.correct) return profile;
  if (active.stepIndex === 5 && !evidenceChainComplete(active)) return profile;
  if (active.stepIndex === 6 && !active.decisions.recommendation?.correct) return profile;
  if (active.stepIndex === 7 && !decisionRevisionComplete(active)) return profile;
  if (active.stepIndex === 8 && active.rationale.trim().length < 40) return profile;
  return withProject(profile, { ...active, stepIndex: Math.min(9, active.stepIndex + 1) });
}

function appendAppliedEvent(profile, event) {
  return { ...profile, challengeHistory: [...(profile.challengeHistory || []), event].slice(-240) };
}

function projectAttempt(active, phase) {
  return Number(active.attempts?.[phase] || 0);
}

export function recordAppliedVocabulary(profile, response, now = Date.now()) {
  const active = projectState(profile).active;
  if (!active) throw new Error("No active professional project.");
  const project = resolveActiveAppliedProject(active);
  const entry = getVocabularyWord(project.targetWordId);
  if (active.decisions.vocabulary?.correct) return { profile, correct: true, reward: 0, entry, teaching: project.vocabulary.teaching };
  const normalized = String(response || "").trim().toLowerCase();
  const correct = normalized === project.vocabulary.answer.toLowerCase();
  const attempt = projectAttempt(active, "vocabulary");
  const repair = correct ? null : diagnoseProfessionalPrecision(project, response, attempt + 1);
  if (repair) repair.vocabularyOrder = shuffledIndices(project.vocabulary.options.length, stringSeed(`${active.id}:repair:${attempt}`));
  const existing = profile.mastery[entry.id];
  const evidenceSkill = existing?.firstSession != null && profile.completedSessions > existing.firstSession ? "recall" : "use";
  const masteryRecord = applyEvidence(existing, entry.id, evidenceSkill, correct, profile.completedSessions, now, 0, "High School");
  let next = {
    ...profile,
    mastery: { ...profile.mastery, [entry.id]: masteryRecord }
  };
  const reward = correct ? Math.max(24, entry.baseReward || 30) : 0;
  if (correct) next = applyCreditTransaction(next, `${active.id}:vocabulary:credits`, reward);
  next = appendAppliedEvent(next, {
    id: `${active.id}:vocabulary:${attempt}`,
    projectId: project.id,
    wordId: entry.id,
    learningStage: "High School",
    kind: "applied-vocabulary",
    skill: evidenceSkill,
    correct,
    repairType: repair?.type || null,
    scenarioVariantId: active.scenarioVariantId || "base",
    response: String(response || "").slice(0, 240),
    at: now
  });
  const current = projectState(next).active;
  const updated = {
    ...current,
    attempts: { ...current.attempts, vocabulary: attempt + 1 },
    decisions: { ...current.decisions, vocabulary: { response: String(response || ""), correct, repairType: repair?.type || null, at: now } },
    precisionRepair: repair,
    creditsEarned: current.creditsEarned + reward
  };
  next = withProject(next, updated);
  return { profile: next, correct, reward, entry, teaching: project.vocabulary.teaching };
}

export function recordAppliedReasoning(profile, selectedIndex, now = Date.now()) {
  const active = projectState(profile).active;
  if (!active) throw new Error("No active professional project.");
  const project = resolveActiveAppliedProject(active);
  if (active.decisions.reasoning?.correct) return { profile, correct: true, reward: 0, teaching: project.reasoning.teaching };
  const displayIndex = Number(selectedIndex);
  const order = presentationOrder(active, "reasoningOrder", project.reasoning.options.length);
  const index = Number(order[displayIndex]);
  const correct = index === project.reasoning.answerIndex;
  const attempt = projectAttempt(active, "reasoning");
  const entry = getVocabularyWord(project.targetWordId);
  const masteryRecord = applyEvidence(profile.mastery[entry.id], entry.id, "meaning", correct, profile.completedSessions, now, 0, "High School");
  let next = appendAppliedEvent({ ...profile, mastery: { ...profile.mastery, [entry.id]: masteryRecord } }, {
    id: `${active.id}:reasoning:${attempt}`,
    projectId: project.id,
    wordId: project.targetWordId,
    learningStage: "High School",
    kind: "evidence-reasoning",
    skill: "meaning",
    correct,
    scenarioVariantId: active.scenarioVariantId || "base",
    response: String(project.reasoning.options[index] || "").slice(0, 240),
    at: now
  });
  const reward = correct ? 24 : 0;
  if (correct) next = applyCreditTransaction(next, `${active.id}:reasoning:credits`, reward);
  const current = projectState(next).active;
  next = withProject(next, {
    ...current,
    attempts: { ...current.attempts, reasoning: attempt + 1 },
    decisions: { ...current.decisions, reasoning: { selectedIndex: index, correct, at: now } },
    creditsEarned: current.creditsEarned + reward
  });
  return { profile: next, correct, reward, teaching: project.reasoning.teaching };
}


export function decisionRevisionComplete(active) {
  return Boolean(active?.decisions?.decisionImpact?.correct && active?.decisions?.decisionResponse?.correct);
}

export function recordDecisionRevisionImpact(profile, selectedIndex, now = Date.now()) {
  const active = projectState(profile).active;
  if (!active) throw new Error("No active professional project.");
  const project = resolveActiveAppliedProject(active);
  const revision = getProfessionalDecisionRevision(project);
  if (active.decisions?.decisionImpact?.correct) return { profile, correct: true, reward: 0, teaching: revision.teaching.impact };
  const displayIndex = Number(selectedIndex);
  const order = presentationOrder(active, "decisionImpactOrder", lateEvidenceImpactOptions.length);
  const optionIndex = Number(order[displayIndex]);
  const option = lateEvidenceImpactOptions[optionIndex];
  const correct = option?.id === revision.impactAnswer;
  const attempt = projectAttempt(active, "decisionImpact");
  let next = appendAppliedEvent(profile, {
    id: `${active.id}:decision-impact:${attempt}`,
    projectId: project.id,
    wordId: project.targetWordId,
    learningStage: "High School",
    kind: "decision-revision-impact",
    skill: "reasoning",
    correct,
    impactId: option?.id || null,
    scenarioVariantId: active.scenarioVariantId || "base",
    at: now
  });
  const reward = correct ? 14 : 0;
  if (correct) next = applyCreditTransaction(next, `${active.id}:decision-impact:credits`, reward);
  const current = projectState(next).active;
  next = withProject(next, {
    ...current,
    attempts: { ...current.attempts, decisionImpact: attempt + 1 },
    decisions: { ...current.decisions, decisionImpact: { selectedIndex: optionIndex, impactId: option?.id || null, correct, at: now } },
    creditsEarned: current.creditsEarned + reward
  });
  return { profile: next, correct, reward, teaching: revision.teaching.impact };
}

export function recordDecisionRevisionResponse(profile, selectedIndex, now = Date.now()) {
  const active = projectState(profile).active;
  if (!active) throw new Error("No active professional project.");
  const project = resolveActiveAppliedProject(active);
  const revision = getProfessionalDecisionRevision(project);
  if (active.decisions?.decisionResponse?.correct) return { profile, correct: true, reward: 0, teaching: revision.teaching.response };
  const displayIndex = Number(selectedIndex);
  const order = presentationOrder(active, "decisionResponseOrder", decisionResponseOptions.length);
  const optionIndex = Number(order[displayIndex]);
  const option = decisionResponseOptions[optionIndex];
  const correct = option?.id === revision.responseAnswer;
  const attempt = projectAttempt(active, "decisionResponse");
  let next = appendAppliedEvent(profile, {
    id: `${active.id}:decision-response:${attempt}`,
    projectId: project.id,
    wordId: project.targetWordId,
    learningStage: "High School",
    kind: "decision-revision-response",
    skill: "use",
    correct,
    responseId: option?.id || null,
    scenarioVariantId: active.scenarioVariantId || "base",
    at: now
  });
  const reward = correct ? 18 : 0;
  if (correct) next = applyCreditTransaction(next, `${active.id}:decision-response:credits`, reward);
  const current = projectState(next).active;
  next = withProject(next, {
    ...current,
    attempts: { ...current.attempts, decisionResponse: attempt + 1 },
    decisions: { ...current.decisions, decisionResponse: { selectedIndex: optionIndex, responseId: option?.id || null, correct, at: now } },
    creditsEarned: current.creditsEarned + reward
  });
  return { profile: next, correct, reward, teaching: revision.teaching.response };
}

export function saveAppliedRationale(profile, rationale) {
  const active = projectState(profile).active;
  if (!active) throw new Error("No active professional project.");
  return withProject(profile, { ...active, rationale: String(rationale || "").slice(0, 800) });
}


export function sourceJudgmentComplete(active) {
  return Boolean(
    active?.decisions?.sourceStrength?.correct &&
    active?.decisions?.sourceLimitation?.correct &&
    active?.decisions?.sourceConfidence?.correct
  );
}

export function recordSourceStrength(profile, selectedIndex, now = Date.now()) {
  const active = projectState(profile).active;
  if (!active) throw new Error("No active professional project.");
  const project = resolveActiveAppliedProject(active);
  const judgment = getProfessionalSourceJudgment(project);
  if (active.decisions?.sourceStrength?.correct) return { profile, correct: true, reward: 0, teaching: judgment.teaching.strength };
  const displayIndex = Number(selectedIndex);
  const order = presentationOrder(active, "sourceOrder", judgment.sources.length);
  const sourceIndex = Number(order[displayIndex]);
  const source = judgment.sources[sourceIndex];
  const correct = source?.evidenceId === judgment.strongestEvidenceId;
  const attempt = projectAttempt(active, "sourceStrength");
  let next = appendAppliedEvent(profile, {
    id: `${active.id}:source-strength:${attempt}`,
    projectId: project.id,
    wordId: project.targetWordId,
    learningStage: "High School",
    kind: "source-strength",
    skill: "reasoning",
    correct,
    sourceEvidenceId: source?.evidenceId || null,
    scenarioVariantId: active.scenarioVariantId || "base",
    at: now
  });
  const reward = correct ? 10 : 0;
  if (correct) next = applyCreditTransaction(next, `${active.id}:source-strength:credits`, reward);
  const current = projectState(next).active;
  next = withProject(next, {
    ...current,
    attempts: { ...current.attempts, sourceStrength: attempt + 1 },
    decisions: { ...current.decisions, sourceStrength: { selectedIndex: sourceIndex, evidenceId: source?.evidenceId || null, correct, at: now } },
    creditsEarned: current.creditsEarned + reward
  });
  return { profile: next, correct, reward, teaching: judgment.teaching.strength };
}

export function recordSourceLimitation(profile, selectedIndex, now = Date.now()) {
  const active = projectState(profile).active;
  if (!active) throw new Error("No active professional project.");
  const project = resolveActiveAppliedProject(active);
  const judgment = getProfessionalSourceJudgment(project);
  if (active.decisions?.sourceLimitation?.correct) return { profile, correct: true, reward: 0, teaching: judgment.teaching.limitation };
  const displayIndex = Number(selectedIndex);
  const order = presentationOrder(active, "sourceLimitationOrder", judgment.limitationOptions.length);
  const optionIndex = Number(order[displayIndex]);
  const correct = Boolean(judgment.limitationOptions[optionIndex]?.correct);
  const attempt = projectAttempt(active, "sourceLimitation");
  let next = appendAppliedEvent(profile, {
    id: `${active.id}:source-limitation:${attempt}`,
    projectId: project.id,
    wordId: project.targetWordId,
    learningStage: "High School",
    kind: "source-limitation",
    skill: "reasoning",
    correct,
    scenarioVariantId: active.scenarioVariantId || "base",
    at: now
  });
  const reward = correct ? 10 : 0;
  if (correct) next = applyCreditTransaction(next, `${active.id}:source-limitation:credits`, reward);
  const current = projectState(next).active;
  next = withProject(next, {
    ...current,
    attempts: { ...current.attempts, sourceLimitation: attempt + 1 },
    decisions: { ...current.decisions, sourceLimitation: { selectedIndex: optionIndex, correct, at: now } },
    creditsEarned: current.creditsEarned + reward
  });
  return { profile: next, correct, reward, teaching: judgment.teaching.limitation };
}

export function recordSourceConfidence(profile, selectedIndex, now = Date.now()) {
  const active = projectState(profile).active;
  if (!active) throw new Error("No active professional project.");
  const project = resolveActiveAppliedProject(active);
  const judgment = getProfessionalSourceJudgment(project);
  if (active.decisions?.sourceConfidence?.correct) return { profile, correct: true, reward: 0, teaching: judgment.teaching.confidence };
  const displayIndex = Number(selectedIndex);
  const order = presentationOrder(active, "sourceConfidenceOrder", sourceConfidenceOptions.length);
  const optionIndex = Number(order[displayIndex]);
  const option = sourceConfidenceOptions[optionIndex];
  const correct = option?.id === judgment.confidence.answer;
  const attempt = projectAttempt(active, "sourceConfidence");
  let next = appendAppliedEvent(profile, {
    id: `${active.id}:source-confidence:${attempt}`,
    projectId: project.id,
    wordId: project.targetWordId,
    learningStage: "High School",
    kind: "source-confidence",
    skill: "reasoning",
    correct,
    confidenceId: option?.id || null,
    scenarioVariantId: active.scenarioVariantId || "base",
    at: now
  });
  const reward = correct ? 10 : 0;
  if (correct) next = applyCreditTransaction(next, `${active.id}:source-confidence:credits`, reward);
  const current = projectState(next).active;
  next = withProject(next, {
    ...current,
    attempts: { ...current.attempts, sourceConfidence: attempt + 1 },
    decisions: { ...current.decisions, sourceConfidence: { selectedIndex: optionIndex, confidenceId: option?.id || null, correct, at: now } },
    creditsEarned: current.creditsEarned + reward
  });
  return { profile: next, correct, reward, teaching: judgment.teaching.confidence };
}


function evidenceChainComplete(active) {
  return Boolean(
    active?.decisions?.evidenceSupport?.correct &&
    active?.decisions?.constraint?.correct &&
    active?.decisions?.assumption?.correct
  );
}

function sameIdSet(left, right) {
  const a = [...new Set((left || []).map(String))].sort();
  const b = [...new Set((right || []).map(String))].sort();
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

export function toggleEvidenceChainSupport(profile, evidenceId) {
  const active = projectState(profile).active;
  if (!active) throw new Error("No active professional project.");
  if (active.decisions?.evidenceSupport?.correct) return profile;
  const project = resolveActiveAppliedProject(active);
  const chain = getProfessionalEvidenceChain(project);
  if (!project.evidence.some((item) => item.id === evidenceId)) return profile;
  const current = [...new Set(active.chainDraft?.evidenceIds || [])];
  const exists = current.includes(evidenceId);
  const nextIds = exists ? current.filter((id) => id !== evidenceId) : current.length < chain.supportingEvidenceIds.length ? [...current, evidenceId] : current;
  return withProject(profile, { ...active, chainDraft: { ...(active.chainDraft || {}), evidenceIds: nextIds } });
}

export function recordEvidenceChainSupport(profile, now = Date.now()) {
  const active = projectState(profile).active;
  if (!active) throw new Error("No active professional project.");
  const project = resolveActiveAppliedProject(active);
  const chain = getProfessionalEvidenceChain(project);
  if (active.decisions?.evidenceSupport?.correct) return { profile, correct: true, reward: 0, teaching: chain.teaching.evidence };
  const selectedIds = [...new Set(active.chainDraft?.evidenceIds || [])];
  const correct = sameIdSet(selectedIds, chain.supportingEvidenceIds);
  const attempt = projectAttempt(active, "evidenceSupport");
  let next = appendAppliedEvent(profile, {
    id: `${active.id}:evidence-chain:${attempt}`,
    projectId: project.id,
    wordId: project.targetWordId,
    learningStage: "High School",
    kind: "evidence-selection",
    skill: "reasoning",
    correct,
    scenarioVariantId: active.scenarioVariantId || "base",
    selectedCount: selectedIds.length,
    at: now
  });
  const reward = correct ? 12 : 0;
  if (correct) next = applyCreditTransaction(next, `${active.id}:evidence-chain:credits`, reward);
  const current = projectState(next).active;
  next = withProject(next, {
    ...current,
    attempts: { ...current.attempts, evidenceSupport: attempt + 1 },
    decisions: { ...current.decisions, evidenceSupport: { selectedIds, correct, at: now } },
    creditsEarned: current.creditsEarned + reward
  });
  return { profile: next, correct, reward, teaching: chain.teaching.evidence };
}

export function recordControllingConstraint(profile, selectedIndex, now = Date.now()) {
  const active = projectState(profile).active;
  if (!active) throw new Error("No active professional project.");
  const project = resolveActiveAppliedProject(active);
  const chain = getProfessionalEvidenceChain(project);
  if (active.decisions?.constraint?.correct) return { profile, correct: true, reward: 0, teaching: chain.teaching.constraint };
  const displayIndex = Number(selectedIndex);
  const order = presentationOrder(active, "constraintOrder", project.constraints.length);
  const index = Number(order[displayIndex]);
  const correct = index === chain.controllingConstraintIndex;
  const attempt = projectAttempt(active, "constraint");
  let next = appendAppliedEvent(profile, {
    id: `${active.id}:constraint:${attempt}`,
    projectId: project.id,
    wordId: project.targetWordId,
    learningStage: "High School",
    kind: "constraint-reasoning",
    skill: "reasoning",
    correct,
    scenarioVariantId: active.scenarioVariantId || "base",
    at: now
  });
  const reward = correct ? 12 : 0;
  if (correct) next = applyCreditTransaction(next, `${active.id}:constraint:credits`, reward);
  const current = projectState(next).active;
  next = withProject(next, {
    ...current,
    attempts: { ...current.attempts, constraint: attempt + 1 },
    decisions: { ...current.decisions, constraint: { selectedIndex: index, correct, at: now } },
    creditsEarned: current.creditsEarned + reward
  });
  return { profile: next, correct, reward, teaching: chain.teaching.constraint };
}

export function recordAssumptionCheck(profile, selectedIndex, now = Date.now()) {
  const active = projectState(profile).active;
  if (!active) throw new Error("No active professional project.");
  const project = resolveActiveAppliedProject(active);
  const chain = getProfessionalEvidenceChain(project);
  if (active.decisions?.assumption?.correct) return { profile, correct: true, reward: 0, teaching: chain.teaching.assumption };
  const displayIndex = Number(selectedIndex);
  const order = presentationOrder(active, "assumptionOrder", chain.assumptionOptions.length);
  const index = Number(order[displayIndex]);
  const correct = Boolean(chain.assumptionOptions[index]?.assumption);
  const attempt = projectAttempt(active, "assumption");
  let next = appendAppliedEvent(profile, {
    id: `${active.id}:assumption:${attempt}`,
    projectId: project.id,
    wordId: project.targetWordId,
    learningStage: "High School",
    kind: "assumption-check",
    skill: "reasoning",
    correct,
    scenarioVariantId: active.scenarioVariantId || "base",
    at: now
  });
  const reward = correct ? 12 : 0;
  if (correct) next = applyCreditTransaction(next, `${active.id}:assumption:credits`, reward);
  const current = projectState(next).active;
  next = withProject(next, {
    ...current,
    attempts: { ...current.attempts, assumption: attempt + 1 },
    decisions: { ...current.decisions, assumption: { selectedIndex: index, correct, at: now } },
    creditsEarned: current.creditsEarned + reward
  });
  return { profile: next, correct, reward, teaching: chain.teaching.assumption };
}

export function recordAppliedRecommendation(profile, selectedIndex, now = Date.now()) {
  const active = projectState(profile).active;
  if (!active) throw new Error("No active professional project.");
  const project = resolveActiveAppliedProject(active);
  if (active.decisions.recommendation?.correct) return { profile, correct: true, reward: 0, teaching: project.recommendation.teaching };
  const displayIndex = Number(selectedIndex);
  const order = presentationOrder(active, "recommendationOrder", project.recommendation.options.length);
  const index = Number(order[displayIndex]);
  const correct = index === project.recommendation.answerIndex;
  const attempt = projectAttempt(active, "recommendation");
  let next = appendAppliedEvent(profile, {
    id: `${active.id}:recommendation:${attempt}`,
    projectId: project.id,
    wordId: project.targetWordId,
    learningStage: "High School",
    kind: "professional-recommendation",
    skill: "use",
    correct,
    scenarioVariantId: active.scenarioVariantId || "base",
    response: String(project.recommendation.options[index]?.label || "").slice(0, 240),
    at: now
  });
  const reward = correct ? 36 : 0;
  if (correct) next = applyCreditTransaction(next, `${active.id}:recommendation:credits`, reward);
  const current = projectState(next).active;
  next = withProject(next, {
    ...current,
    attempts: { ...current.attempts, recommendation: attempt + 1 },
    decisions: { ...current.decisions, recommendation: { selectedIndex: index, correct, at: now } },
    creditsEarned: current.creditsEarned + reward
  });
  return { profile: next, correct, reward, teaching: project.recommendation.teaching };
}

export function completeAppliedProject(profile, now = Date.now()) {
  const state = projectState(profile);
  const active = state.active;
  if (!active) throw new Error("No active professional project.");
  const project = resolveActiveAppliedProject(active);
  if (active.stepIndex < 9 || !sourceJudgmentComplete(active) || !active.decisions.vocabulary?.correct || !active.decisions.reasoning?.correct || !evidenceChainComplete(active) || !active.decisions.recommendation?.correct || !decisionRevisionComplete(active) || active.rationale.trim().length < 40) {
    throw new Error("The professional recommendation is not complete.");
  }
  const completedSessions = profile.completedSessions + 1;
  const completedBriefIds = [...new Set([...(state.completedBriefIds || []), project.id])];
  const historyEntry = {
    id: active.id,
    briefId: project.id,
    completedAt: now,
    creditsEarned: active.creditsEarned,
    rationale: active.rationale,
    domainId: project.domainId,
    targetWordId: project.targetWordId,
    scenarioVariantId: active.scenarioVariantId || "base",
    scenarioLabel: project.scenarioLabel || "Core field condition",
    precisionRepairs: Number(active.attempts.vocabulary || 0) > 1 ? Number(active.attempts.vocabulary || 0) - 1 : 0,
    sourceJudgment: {
      completed: sourceJudgmentComplete(active),
      strongestSourceEvidenceId: active.decisions.sourceStrength?.evidenceId || null,
      confidenceId: active.decisions.sourceConfidence?.confidenceId || null,
      strengthAttempts: Number(active.attempts.sourceStrength || 0),
      limitationAttempts: Number(active.attempts.sourceLimitation || 0),
      confidenceAttempts: Number(active.attempts.sourceConfidence || 0)
    },
    evidenceChain: {
      completed: evidenceChainComplete(active),
      evidenceAttempts: Number(active.attempts.evidenceSupport || 0),
      constraintAttempts: Number(active.attempts.constraint || 0),
      assumptionAttempts: Number(active.attempts.assumption || 0)
    },
    decisionRevision: {
      completed: decisionRevisionComplete(active),
      impactId: active.decisions.decisionImpact?.impactId || null,
      responseId: active.decisions.decisionResponse?.responseId || null,
      impactAttempts: Number(active.attempts.decisionImpact || 0),
      responseAttempts: Number(active.attempts.decisionResponse || 0)
    },
    recommendationIndex: active.decisions.recommendation.selectedIndex
  };
  const highSchoolIds = getVocabularyForStage("High School").map((entry) => entry.id);
  let next = {
    ...profile,
    completedSessions,
    lastSession: {
      id: active.id,
      stage: "High School",
      type: "applied-project",
      creditsEarned: active.creditsEarned,
      correct: 11,
      wrong: Math.max(0, active.attempts.sourceStrength - 1) + Math.max(0, active.attempts.sourceLimitation - 1) + Math.max(0, active.attempts.sourceConfidence - 1) + Math.max(0, active.attempts.vocabulary - 1) + Math.max(0, active.attempts.reasoning - 1) + Math.max(0, active.attempts.evidenceSupport - 1) + Math.max(0, active.attempts.constraint - 1) + Math.max(0, active.attempts.assumption - 1) + Math.max(0, active.attempts.recommendation - 1) + Math.max(0, active.attempts.decisionImpact - 1) + Math.max(0, active.attempts.decisionResponse - 1),
      exposures: active.reviewedEvidence.length,
      strengthened: 1,
      mastered: 0,
      completedAt: now
    },
    appliedProjects: {
      active: null,
      completedBriefIds,
      history: [...(state.history || []), historyEntry].slice(-120)
    }
  };
  next.rank = deriveRank(next, highSchoolIds);
  next.stageProgress = {
    ...(next.stageProgress || {}),
    "High School": { rank: next.rank, completedSessions }
  };
  return next;
}
