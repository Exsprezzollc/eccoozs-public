import { shopById, rankMeets } from "../content/shop.js";
import { getStageDefinition, isStageAvailable } from "../content/stages.js";
import { getVocabularyForStage, getVocabularyWord } from "../content/vocabulary.js";
import { buildSessionPlan } from "../learning/selection.js";
import { applyEvidence, challengeSkill, deriveRank } from "../learning/mastery.js";
import { applyCreditTransaction, calculateReward } from "../learning/rewards.js";
import { diagnoseError } from "../learning/misconceptions.js";

export const CONSTRUCTION_STAGES = ["Surveyed", "Foundation", "Installed"];

function sessionStats() {
  return { correct: 0, wrong: 0, exposures: 0, creditsEarned: 0, strengthened: 0, mastered: 0 };
}

function stageIdentity(stage) {
  if (stage === "Elementary") return { propertyName: "Cottage Garden", selectedCharacter: "elementary-pair" };
  if (stage === "Junior High") return { propertyName: "Garden House", selectedCharacter: "learner-pair" };
  return { propertyName: "Professional Field Portfolio", selectedCharacter: "high-school-pair" };
}

function stageSlug(stage) {
  return String(stage).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function switchStage(profile, nextStage) {
  if (profile.activeSession || profile.appliedProjects?.active) {
    return { profile, status: "session-active", message: profile.appliedProjects?.active ? "Finish the current professional brief before changing learning paths." : "Finish the current trail before changing learning paths." };
  }
  if (!isStageAvailable(nextStage)) {
    return { profile, status: "locked", message: `${getStageDefinition(nextStage).label} is still being prepared.` };
  }
  if (profile.stage === nextStage) return { profile, status: "current", message: `${nextStage} is already active.` };

  const stageProgress = {
    ...(profile.stageProgress || {}),
    [profile.stage]: { rank: profile.rank, completedSessions: profile.completedSessions }
  };
  const target = stageProgress[nextStage] || { rank: "Pathfinder", completedSessions: 0 };
  const recentWordsByStage = {
    ...(profile.recentWordsByStage || {}),
    [profile.stage]: profile.recentWords || []
  };
  const identity = stageIdentity(nextStage);
  return {
    profile: {
      ...profile,
      stage: nextStage,
      rank: target.rank || "Pathfinder",
      completedSessions: Number(target.completedSessions || 0),
      stageProgress,
      recentWordsByStage,
      recentWords: recentWordsByStage[nextStage] || [],
      propertyName: identity.propertyName,
      selectedCharacter: identity.selectedCharacter,
      activeSession: null
    },
    status: "changed",
    message: `${nextStage} is now your active learning path.`
  };
}

export function startSession(profile, seed = Date.now(), now = Date.now()) {
  if (profile.stage === "High School") throw new Error("High School uses applied professional projects rather than vocabulary trail sessions.");
  if (profile.activeSession) return profile;
  const plan = buildSessionPlan(profile, seed, 5, now);
  return {
    ...profile,
    activeSession: {
      id: `${stageSlug(profile.stage)}-${profile.completedSessions + 1}-${seed}`,
      stage: profile.stage,
      seed,
      startedAt: now,
      plan,
      encounterIndex: 0,
      challengeIndex: 0,
      attempt: 0,
      gateOpen: false,
      stats: sessionStats()
    }
  };
}

export function abandonSession(profile) {
  return { ...profile, activeSession: null };
}

export function recordChallengeResult(profile, challenge, correct, hintLevel = 0, now = Date.now(), response = "") {
  const session = profile.activeSession;
  if (!session) throw new Error("No active vocabulary session.");
  const transactionId = `${session.id}:${challenge.id}:${correct ? "correct" : "wrong"}`;
  if (profile.challengeHistory.some((event) => event.id === transactionId)) {
    const entry = getVocabularyWord(challenge.wordId);
    return {
      profile,
      reward: 0,
      entry,
      previousStage: profile.mastery[entry.id]?.stage || "New",
      nextStage: profile.mastery[entry.id]?.stage || "New",
      misconception: null
    };
  }

  const entry = getVocabularyWord(challenge.wordId);
  const existing = profile.mastery[entry.id];
  const skill = challengeSkill(challenge.kind, existing, profile.completedSessions);
  const previousStage = existing?.stage || "New";
  const masteryRecord = applyEvidence(existing, entry.id, skill, correct, profile.completedSessions, now, hintLevel, profile.stage);
  const nextStage = masteryRecord.stage;
  const reward = calculateReward(entry, challenge.kind, correct, hintLevel, challenge.attempt || 0);
  const credited = applyCreditTransaction(
    { ...profile, mastery: { ...profile.mastery, [entry.id]: masteryRecord } },
    `${transactionId}:credits`,
    reward
  );
  const assessable = challenge.assessable !== false && !["hear", "discover"].includes(challenge.kind);
  const weakSkills = { ...credited.weakSkills };
  if (assessable) {
    weakSkills[skill] = Math.max(0, (weakSkills[skill] || 0) + (correct ? -0.35 : 1));
    if (["know", "synonym", "antonym"].includes(challenge.kind)) {
      weakSkills[challenge.kind] = Math.max(0, (weakSkills[challenge.kind] || 0) + (correct ? -0.35 : 1));
    }
  }
  const stats = {
    ...session.stats,
    correct: session.stats.correct + (assessable && correct ? 1 : 0),
    wrong: session.stats.wrong + (assessable && !correct ? 1 : 0),
    exposures: (session.stats.exposures || 0) + (!assessable && correct ? 1 : 0),
    creditsEarned: session.stats.creditsEarned + reward,
    strengthened: session.stats.strengthened + (assessable && correct && nextStage !== previousStage && ["Practicing", "Strong"].includes(nextStage) ? 1 : 0),
    mastered: session.stats.mastered + (assessable && correct && nextStage === "Mastered" && previousStage !== "Mastered" ? 1 : 0)
  };
  const diagnosis = !correct ? diagnoseError(entry, challenge, response) : null;
  const misconception = diagnosis?.misconception || null;
  const event = {
    id: transactionId,
    wordId: entry.id,
    learningStage: profile.stage,
    kind: challenge.kind,
    skill,
    correct,
    hintLevel,
    response: String(response || "").slice(0, 240),
    errorType: diagnosis?.type || null,
    misconceptionId: misconception?.id || null,
    at: now
  };
  return {
    profile: {
      ...credited,
      weakSkills,
      activeSession: { ...session, stats },
      challengeHistory: [...credited.challengeHistory, event].slice(-240)
    },
    reward,
    entry,
    skill,
    previousStage,
    nextStage,
    diagnosis,
    misconception
  };
}

export function retryChallenge(profile) {
  if (!profile.activeSession) return profile;
  return {
    ...profile,
    activeSession: {
      ...profile.activeSession,
      attempt: profile.activeSession.attempt + 1
    }
  };
}

export function advanceChallenge(profile) {
  const session = profile.activeSession;
  if (!session) return profile;
  const encounter = session.plan[session.encounterIndex];
  if (!encounter) return profile;
  let encounterIndex = session.encounterIndex;
  let challengeIndex = session.challengeIndex + 1;
  let recentWords = profile.recentWords || [];
  if (challengeIndex >= encounter.kinds.length) {
    recentWords = [...recentWords.filter((id) => id !== encounter.wordId), encounter.wordId].slice(-12);
    encounterIndex += 1;
    challengeIndex = 0;
  }
  return {
    ...profile,
    recentWords,
    recentWordsByStage: { ...(profile.recentWordsByStage || {}), [profile.stage]: recentWords },
    activeSession: {
      ...session,
      encounterIndex,
      challengeIndex,
      attempt: 0,
      gateOpen: encounterIndex >= session.plan.length
    }
  };
}

export function advanceConstruction(profile, completedSessions = profile.completedSessions, learningStage = profile.stage) {
  const construction = { ...profile.construction };
  for (const [itemId, project] of Object.entries(construction)) {
    const projectStage = project.learningStage || shopById.get(itemId)?.stage || "Junior High";
    if (projectStage !== learningStage) continue;
    if (project.stage === "Installed" || completedSessions <= project.lastAdvancedSession) continue;
    const currentIndex = CONSTRUCTION_STAGES.indexOf(project.stage);
    construction[itemId] = {
      ...project,
      stage: CONSTRUCTION_STAGES[Math.min(CONSTRUCTION_STAGES.length - 1, currentIndex + 1)],
      lastAdvancedSession: completedSessions
    };
  }
  return { ...profile, construction };
}

export function completeSession(profile, now = Date.now()) {
  const session = profile.activeSession;
  if (!session?.gateOpen) throw new Error("The garden gate must be open before the session can be completed.");
  const completedSessions = profile.completedSessions + 1;
  let completed = {
    ...profile,
    completedSessions,
    lastSession: { ...session.stats, id: session.id, stage: profile.stage, completedAt: now },
    activeSession: null
  };
  completed = advanceConstruction(completed, completedSessions, profile.stage);
  const wordIds = getVocabularyForStage(profile.stage).map((entry) => entry.id);
  completed.rank = deriveRank(completed, wordIds);
  completed.stageProgress = {
    ...(completed.stageProgress || {}),
    [profile.stage]: { rank: completed.rank, completedSessions }
  };
  completed.recentWordsByStage = {
    ...(completed.recentWordsByStage || {}),
    [profile.stage]: completed.recentWords || []
  };
  return completed;
}

export function purchaseItem(profile, itemId, transactionId = `purchase:${itemId}`) {
  const item = shopById.get(itemId);
  if (!item || item.stage !== profile.stage) {
    return { profile, status: "missing", message: "That improvement belongs to a different learning property." };
  }
  if (profile.purchaseTransactions[transactionId] || profile.ownedItems.includes(itemId)) {
    return { profile, status: "owned", message: `${item.name} is already part of your property.` };
  }
  if (!rankMeets(profile.rank, item.rank)) {
    return { profile, status: "locked", message: `${item.name} opens at the ${item.rank} rank.` };
  }
  if (profile.credits < item.cost) {
    return { profile, status: "insufficient", message: `You need ${item.cost - profile.credits} more Estate Credits.` };
  }
  const construction = { ...profile.construction };
  if (item.construction) {
    construction[itemId] = {
      stage: CONSTRUCTION_STAGES[0],
      learningStage: profile.stage,
      purchasedAtSession: profile.completedSessions,
      lastAdvancedSession: profile.completedSessions
    };
  }
  return {
    profile: {
      ...profile,
      credits: profile.credits - item.cost,
      ownedItems: [...profile.ownedItems, itemId],
      purchaseTransactions: { ...profile.purchaseTransactions, [transactionId]: item.cost },
      construction
    },
    status: "purchased",
    message: item.construction
      ? `${item.name} is surveyed. Complete future ${profile.stage} sessions to finish construction.`
      : `${item.name} is now part of your property.`
  };
}
