export const skills = ["spell", "meaning", "use", "recall"];

export function challengeSkill(kind, record, sessionNumber) {
  if (kind === "hear" || kind === "discover") return "exposure";
  if (kind === "build") return "spell";
  if (kind === "use") return record?.firstSession != null && sessionNumber > record.firstSession ? "recall" : "use";
  return "meaning";
}

export function useChallengeMode(record, sessionNumber) {
  if (!record) return "recognition";
  const laterSession = record.firstSession != null && sessionNumber > record.firstSession;
  if (laterSession && (record.evidence?.recall || 0) <= 0) return "recall-cloze";
  if (["Strong", "Mastered"].includes(record.stage)) return "precision";
  if (record.stage === "Practicing") return "cloze";
  return "recognition";
}

export function deriveStage(record) {
  const values = skills.map((skill) => record.evidence?.[skill] || 0);
  const distinct = values.filter((value) => value > 0).length;
  const total = values.reduce((sum, value) => sum + value, 0);
  if (values.every((value) => value > 0) && record.correctTotal >= 6 && (record.evidence?.recall || 0) > 0) return "Mastered";
  if (distinct >= 3 && record.correctTotal >= 4) return "Strong";
  if (distinct >= 2 && total >= 3) return "Practicing";
  if (total >= 1) return "Familiar";
  return "New";
}

function createRecord(wordId, sessionNumber, now) {
  return {
    wordId,
    exposureCount: 0,
    evidence: { spell: 0, meaning: 0, use: 0, recall: 0 },
    correctTotal: 0,
    wrongTotal: 0,
    stage: "New",
    firstSession: sessionNumber,
    lastSeenAt: 0,
    nextReviewAt: now
  };
}

export function reviewDelayMs(stageLabel, learningStage, correct = true, exposureOnly = false) {
  if (exposureOnly) return stageLabel === "Elementary" ? 1000 * 60 * 15 : 1000 * 60 * 5;
  if (!correct) return stageLabel === "Elementary" ? 1000 * 60 * 4 : 1000 * 60 * 5;

  const elementary = {
    New: 1000 * 60 * 20,
    Familiar: 1000 * 60 * 35,
    Practicing: 1000 * 60 * 60 * 8,
    Strong: 1000 * 60 * 60 * 24 * 2,
    Mastered: 1000 * 60 * 60 * 24 * 5
  };
  const junior = {
    New: 1000 * 60 * 20,
    Familiar: 1000 * 60 * 45,
    Practicing: 1000 * 60 * 60 * 12,
    Strong: 1000 * 60 * 60 * 24 * 3,
    Mastered: 1000 * 60 * 60 * 24 * 7
  };
  const table = stageLabel === "Elementary" ? elementary : junior;
  return table[learningStage] || table.Familiar;
}

export function applyEvidence(existing, wordId, skill, correct, sessionNumber, now = Date.now(), hintLevel = 0, stageLabel = "Junior High") {
  const record = existing || createRecord(wordId, sessionNumber, now);
  const evidence = { spell: 0, meaning: 0, use: 0, recall: 0, ...(record.evidence || {}) };
  const exposureCount = record.exposureCount || 0;

  if (skill === "exposure" || skill === "hear") {
    const exposed = {
      ...record,
      evidence,
      exposureCount: exposureCount + (correct ? 1 : 0),
      lastSeenAt: now
    };
    exposed.stage = deriveStage(exposed);
    exposed.nextReviewAt = now + reviewDelayMs(stageLabel, exposed.stage, correct, true);
    return exposed;
  }

  if (correct) {
    const strength = hintLevel >= 2 ? 0.25 : hintLevel === 1 ? 0.5 : 1;
    evidence[skill] = Math.min(3, (evidence[skill] || 0) + strength);
  } else if ((evidence[skill] || 0) > 0) {
    evidence[skill] = Math.max(0, evidence[skill] - 0.25);
  }

  const updated = {
    ...record,
    exposureCount,
    evidence,
    correctTotal: (record.correctTotal || 0) + (correct ? 1 : 0),
    wrongTotal: (record.wrongTotal || 0) + (correct ? 0 : 1),
    lastSeenAt: now
  };
  updated.stage = deriveStage(updated);
  updated.nextReviewAt = now + reviewDelayMs(stageLabel, updated.stage, correct, false);
  return updated;
}

export function deriveRank(profile, wordIds = null) {
  const allowed = wordIds ? new Set(wordIds) : null;
  const records = Object.values(profile.mastery).filter((record) => !allowed || allowed.has(record.wordId));
  const mastered = records.filter((record) => record.stage === "Mastered").length;
  if (profile.completedSessions >= 4 && mastered >= 5) return "Distinguished";
  if (profile.completedSessions >= 1 && records.length >= 3) return "Seasoned";
  return "Pathfinder";
}
