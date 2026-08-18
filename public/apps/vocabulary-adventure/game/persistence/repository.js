import { createInitialProfile, PROFILE_SCHEMA_VERSION } from "../state/initialState.js";
import { deriveStage } from "../learning/mastery.js";
import { isStageAvailable } from "../content/stages.js";
import { getVocabularyForStage, vocabularyById } from "../content/vocabulary.js";
import { civicProjectById } from "../content/highSchoolProjects.js";
import { getScenarioVariants, resolveProjectScenario } from "../content/highSchoolScenarios.js";
import { shopById } from "../content/shop.js";

export const STORAGE_KEY = "eccoozs.vocabulary-adventure.profile.v10";
const LEGACY_KEYS = [
  "eccoozs.vocabulary-adventure.profile.v9",
  "eccoozs.vocabulary-adventure.profile.v8",
  "eccoozs.vocabulary-adventure.profile.v7",
  "eccoozs.vocabulary-adventure.profile.v6",
  "eccoozs.vocabulary-adventure.profile.v5",
  "eccoozs.vocabulary-adventure.profile.v4",
  "eccoozs.vocabulary-adventure.profile.v3",
  "eccoozs.vocabulary-adventure.profile.v2",
  "eccoozs-player-profile",
  "eccoozs-profile"
];

const VALID_RANKS = new Set(["Pathfinder", "Seasoned", "Distinguished"]);
const SESSION_KINDS = {
  "Elementary": new Set(["discover", "build", "know", "synonym", "antonym", "use"]),
  "Junior High": new Set(["hear", "build", "know", "synonym", "antonym", "distinguish", "use"])
};

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function finiteNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function nonNegativeNumber(value, fallback = 0) {
  return Math.max(0, finiteNumber(value, fallback));
}

function nonNegativeInteger(value, fallback = 0) {
  return Math.floor(nonNegativeNumber(value, fallback));
}

function normalizeRank(value, fallback = "Pathfinder") {
  return VALID_RANKS.has(value) ? value : fallback;
}

function normalizeBooleanSettings(candidate, defaults) {
  if (!isPlainObject(candidate)) return { ...defaults };
  return Object.fromEntries(
    Object.entries(defaults).map(([key, defaultValue]) => [key, typeof candidate[key] === "boolean" ? candidate[key] : defaultValue])
  );
}

function normalizeMasteryRecord(wordId, candidate) {
  if (!isPlainObject(candidate) || !vocabularyById.has(wordId)) return null;
  const legacyHear = nonNegativeNumber(candidate.evidence?.hear, 0);
  const exposureCount = candidate.exposureCount == null ? legacyHear : nonNegativeNumber(candidate.exposureCount, legacyHear);
  const evidence = {
    spell: Math.min(3, nonNegativeNumber(candidate.evidence?.spell, 0)),
    meaning: Math.min(3, nonNegativeNumber(candidate.evidence?.meaning, 0)),
    use: Math.min(3, nonNegativeNumber(candidate.evidence?.use, 0)),
    recall: Math.min(3, nonNegativeNumber(candidate.evidence?.recall, 0))
  };
  const legacyCorrect = nonNegativeInteger(candidate.correctTotal, 0);
  const correctTotal = candidate.exposureCount == null ? Math.max(0, legacyCorrect - legacyHear) : legacyCorrect;
  const record = {
    ...candidate,
    wordId,
    exposureCount,
    evidence,
    correctTotal,
    wrongTotal: nonNegativeInteger(candidate.wrongTotal, 0),
    firstSession: candidate.firstSession == null ? null : nonNegativeInteger(candidate.firstSession, 0),
    lastSeenAt: nonNegativeNumber(candidate.lastSeenAt, 0),
    nextReviewAt: nonNegativeNumber(candidate.nextReviewAt, 0)
  };
  record.stage = deriveStage(record);
  return record;
}

function normalizeMastery(candidate) {
  if (!isPlainObject(candidate)) return {};
  return Object.fromEntries(
    Object.entries(candidate)
      .slice(-512)
      .map(([wordId, record]) => [wordId, normalizeMasteryRecord(wordId, record)])
      .filter(([, record]) => Boolean(record))
  );
}

function normalizeStageProgress(candidate, currentStage, rank, completedSessions) {
  const initial = createInitialProfile().stageProgress;
  const output = {
    "Elementary": { ...initial["Elementary"] },
    "Junior High": { ...initial["Junior High"] },
    "High School": { ...initial["High School"] }
  };
  if (isPlainObject(candidate)) {
    for (const label of Object.keys(output)) {
      if (!isPlainObject(candidate[label])) continue;
      output[label] = {
        rank: normalizeRank(candidate[label].rank, output[label].rank),
        completedSessions: nonNegativeInteger(candidate[label].completedSessions, 0)
      };
    }
  }
  if (currentStage && output[currentStage]) {
    output[currentStage] = {
      rank: normalizeRank(rank, output[currentStage].rank),
      completedSessions: nonNegativeInteger(completedSessions, output[currentStage].completedSessions)
    };
  }
  return output;
}

function stageDefaults(stage) {
  if (stage === "Elementary") return { propertyName: "Cottage Garden", selectedCharacter: "elementary-pair" };
  if (stage === "Junior High") return { propertyName: "Garden House", selectedCharacter: "learner-pair" };
  return { propertyName: "Professional Field Portfolio", selectedCharacter: "high-school-pair" };
}

function normalizeRecentWords(candidate, stage) {
  if (!Array.isArray(candidate)) return [];
  const allowed = new Set(getVocabularyForStage(stage).map((entry) => entry.id));
  return [...new Set(candidate.map(String).filter((id) => allowed.has(id)))].slice(-12);
}

function normalizeSessionStats(candidate) {
  return {
    correct: nonNegativeInteger(candidate?.correct, 0),
    wrong: nonNegativeInteger(candidate?.wrong, 0),
    exposures: nonNegativeInteger(candidate?.exposures, 0),
    creditsEarned: nonNegativeInteger(candidate?.creditsEarned, 0),
    strengthened: nonNegativeInteger(candidate?.strengthened, 0),
    mastered: nonNegativeInteger(candidate?.mastered, 0)
  };
}

function normalizeActiveSession(candidate, stage) {
  if (!isPlainObject(candidate) || !SESSION_KINDS[stage] || candidate.stage !== stage || !Array.isArray(candidate.plan)) return null;
  const allowedWordIds = new Set(getVocabularyForStage(stage).map((entry) => entry.id));
  const allowedKinds = SESSION_KINDS[stage];
  const plan = candidate.plan.slice(0, 5).map((encounter, index) => {
    if (!isPlainObject(encounter)) return null;
    const wordId = String(encounter.wordId || "");
    if (!allowedWordIds.has(wordId) || !Array.isArray(encounter.kinds) || !encounter.kinds.length) return null;
    const kinds = encounter.kinds.map(String);
    if (kinds.some((kind) => !allowedKinds.has(kind))) return null;
    return {
      ...encounter,
      wordId,
      location: Number.isInteger(Number(encounter.location)) ? Number(encounter.location) : index,
      zoneId: encounter.zoneId == null ? null : String(encounter.zoneId),
      review: Boolean(encounter.review),
      due: Boolean(encounter.due),
      kinds,
      seed: String(encounter.seed ?? `${stage}:restored:${wordId}:${index}`)
    };
  });
  if (!plan.length || plan.some((encounter) => !encounter)) return null;

  const encounterIndex = nonNegativeInteger(candidate.encounterIndex, 0);
  if (encounterIndex > plan.length) return null;
  let challengeIndex = nonNegativeInteger(candidate.challengeIndex, 0);
  if (encounterIndex < plan.length && challengeIndex >= plan[encounterIndex].kinds.length) return null;
  if (encounterIndex >= plan.length) challengeIndex = 0;

  return {
    ...candidate,
    id: String(candidate.id || `${stage.toLowerCase().replaceAll(" ", "-")}-restored`),
    stage,
    seed: candidate.seed ?? 0,
    startedAt: nonNegativeNumber(candidate.startedAt, 0),
    plan,
    encounterIndex,
    challengeIndex,
    attempt: Math.min(10000, nonNegativeInteger(candidate.attempt, 0)),
    // Never trust a persisted gate flag by itself. Completion is earned only when
    // every encounter has actually advanced past the plan boundary.
    gateOpen: encounterIndex >= plan.length,
    stats: normalizeSessionStats(candidate.stats)
  };
}

function normalizeConstruction(candidate, ownedItems) {
  if (!isPlainObject(candidate)) return {};
  const owned = new Set(ownedItems);
  const allowedStages = new Set(["Elementary", "Junior High"]);
  const allowedBuildStages = new Set(["Surveyed", "Foundation", "Installed"]);
  return Object.fromEntries(
    Object.entries(candidate)
      .filter(([itemId, project]) => owned.has(itemId) && shopById.has(itemId) && isPlainObject(project))
      .slice(-64)
      .map(([itemId, project]) => [itemId, {
        ...project,
        stage: allowedBuildStages.has(project.stage) ? project.stage : "Surveyed",
        learningStage: allowedStages.has(project.learningStage) ? project.learningStage : shopById.get(itemId).stage,
        purchasedAtSession: nonNegativeInteger(project.purchasedAtSession, 0),
        lastAdvancedSession: nonNegativeInteger(project.lastAdvancedSession, 0)
      }])
  );
}

function normalizeTransactionMap(candidate, limit = 50000) {
  if (!isPlainObject(candidate)) return {};
  return Object.fromEntries(
    Object.entries(candidate)
      .filter(([key, value]) => typeof key === "string" && key.length <= 240 && Number.isFinite(Number(value)) && Number(value) >= 0)
      .slice(-limit)
      .map(([key, value]) => [key, Number(value)])
  );
}

function normalizeAppliedProjects(candidate, sourceSchemaVersion = PROFILE_SCHEMA_VERSION, stage = "Elementary") {
  const initial = createInitialProfile().appliedProjects;
  if (!isPlainObject(candidate)) return { ...initial };

  let active = stage === "High School" && isPlainObject(candidate.active) ? { ...candidate.active } : null;
  if (active) {
    const project = civicProjectById.get(String(active.briefId || ""));
    if (!project) {
      active = null;
    } else {
      const variants = getScenarioVariants(project);
      const requestedVariantId = String(active.scenarioVariantId || "base");
      const scenarioVariantId = variants.some((variant) => variant.id === requestedVariantId) ? requestedVariantId : variants[0].id;
      const resolvedProject = resolveProjectScenario(project, scenarioVariantId);
      const validEvidenceIds = new Set(resolvedProject.evidence.map((item) => item.id));
      active = {
        ...active,
        id: String(active.id || `high-school:${project.id}:restored`),
        briefId: project.id,
        scenarioVariantId,
        stepIndex: Math.min(9, nonNegativeInteger(active.stepIndex, 0)),
        reviewedEvidence: Array.isArray(active.reviewedEvidence)
          ? [...new Set(active.reviewedEvidence.map(String).filter((id) => validEvidenceIds.has(id)))]
          : [],
        presentation: isPlainObject(active.presentation) ? active.presentation : {},
        decisions: isPlainObject(active.decisions) ? active.decisions : {},
        attempts: {
          sourceStrength: nonNegativeInteger(active.attempts?.sourceStrength, 0),
          sourceLimitation: nonNegativeInteger(active.attempts?.sourceLimitation, 0),
          sourceConfidence: nonNegativeInteger(active.attempts?.sourceConfidence, 0),
          vocabulary: nonNegativeInteger(active.attempts?.vocabulary, 0),
          reasoning: nonNegativeInteger(active.attempts?.reasoning, 0),
          evidenceSupport: nonNegativeInteger(active.attempts?.evidenceSupport, 0),
          constraint: nonNegativeInteger(active.attempts?.constraint, 0),
          assumption: nonNegativeInteger(active.attempts?.assumption, 0),
          recommendation: nonNegativeInteger(active.attempts?.recommendation, 0),
          decisionImpact: nonNegativeInteger(active.attempts?.decisionImpact, 0),
          decisionResponse: nonNegativeInteger(active.attempts?.decisionResponse, 0)
        },
        chainDraft: isPlainObject(active.chainDraft)
          ? { evidenceIds: Array.isArray(active.chainDraft.evidenceIds) ? [...new Set(active.chainDraft.evidenceIds.map(String).filter((id) => validEvidenceIds.has(id)))].slice(0, 3) : [] }
          : { evidenceIds: [] },
        rationale: String(active.rationale || "").slice(0, 800),
        creditsEarned: nonNegativeInteger(active.creditsEarned, 0),
        startedAt: nonNegativeNumber(active.startedAt, 0)
      };

      // Phase 8 inserts the Evidence Chain Studio before recommendation. An unfinished
      // v7 brief at or beyond recommendation returns to that new checkpoint so the
      // learner can build the missing chain without losing earlier work.
      if (Number(sourceSchemaVersion || 0) < 8 && active.stepIndex >= 4) active.stepIndex = 4;

      // Phase 9 inserts Source Judgment immediately after evidence inspection. Any
      // unfinished v8 (or earlier modern) High School brief that had advanced beyond
      // evidence review returns to this new checkpoint. Existing vocabulary,
      // reasoning, chain, recommendation, rationale, credits, and history are kept.
      if (Number(sourceSchemaVersion || 0) < 9 && active.stepIndex >= 2) active.stepIndex = 2;

      // Phase 10 inserts Decision Revision after the preliminary recommendation.
      // An unfinished v9 (or earlier modern) brief that had reached rationale or
      // impact returns to the new late-evidence checkpoint. Earlier structured
      // work and any already-written rationale are preserved.
      if (Number(sourceSchemaVersion || 0) < 10 && active.stepIndex >= 7) active.stepIndex = 7;
    }
  }

  return {
    active,
    completedBriefIds: Array.isArray(candidate.completedBriefIds)
      ? [...new Set(candidate.completedBriefIds.map(String).filter((id) => civicProjectById.has(id)))].slice(-64)
      : [],
    history: Array.isArray(candidate.history)
      ? candidate.history.filter((entry) => isPlainObject(entry) && civicProjectById.has(String(entry.briefId || ""))).slice(-120)
      : []
  };
}

function mergeProfile(candidate) {
  const initial = createInitialProfile();
  if (!isPlainObject(candidate)) return initial;
  const stage = isStageAvailable(candidate.stage) ? candidate.stage : initial.stage;
  const progress = normalizeStageProgress(candidate.stageProgress, stage, candidate.rank, candidate.completedSessions);
  const defaults = stageDefaults(stage);
  const recentWordsByStage = {
    "Elementary": normalizeRecentWords(candidate.recentWordsByStage?.["Elementary"], "Elementary"),
    "Junior High": normalizeRecentWords(candidate.recentWordsByStage?.["Junior High"], "Junior High"),
    "High School": normalizeRecentWords(candidate.recentWordsByStage?.["High School"], "High School")
  };
  if (!isPlainObject(candidate.recentWordsByStage)) recentWordsByStage[stage] = normalizeRecentWords(candidate.recentWords, stage);

  const currentProgress = progress[stage] || { rank: "Pathfinder", completedSessions: 0 };
  const ownedItems = Array.isArray(candidate.ownedItems)
    ? [...new Set(candidate.ownedItems.map(String).filter((id) => shopById.has(id)))].slice(-256)
    : [];
  const weakSkills = Object.fromEntries(
    Object.entries(initial.weakSkills).map(([key, value]) => [key, Math.min(9999, nonNegativeNumber(candidate.weakSkills?.[key], value))])
  );

  const normalized = {
    ...initial,
    ...candidate,
    schemaVersion: PROFILE_SCHEMA_VERSION,
    playerId: "local-vocabulary-adventure",
    onboardingComplete: typeof candidate.onboardingComplete === "boolean" ? candidate.onboardingComplete : true,
    stage,
    credits: nonNegativeInteger(candidate.credits, 0),
    rank: currentProgress.rank,
    completedSessions: currentProgress.completedSessions,
    stageProgress: progress,
    propertyName: candidate.propertyName && candidate.stage === stage ? String(candidate.propertyName).slice(0, 80) : defaults.propertyName,
    selectedCharacter: defaults.selectedCharacter,
    mastery: normalizeMastery(candidate.mastery),
    weakSkills,
    settings: normalizeBooleanSettings(candidate.settings, initial.settings),
    ownedItems,
    construction: normalizeConstruction(candidate.construction, ownedItems),
    creditTransactions: normalizeTransactionMap(candidate.creditTransactions),
    purchaseTransactions: normalizeTransactionMap(candidate.purchaseTransactions, 512),
    recentWords: recentWordsByStage[stage] || [],
    recentWordsByStage,
    challengeHistory: Array.isArray(candidate.challengeHistory) ? candidate.challengeHistory.filter(isPlainObject).slice(-240) : [],
    appliedProjects: normalizeAppliedProjects(candidate.appliedProjects, Number(candidate.schemaVersion || 0), stage),
    lastSession: isPlainObject(candidate.lastSession) ? candidate.lastSession : null,
    updatedAt: nonNegativeNumber(candidate.updatedAt, 0)
  };
  normalized.activeSession = normalizeActiveSession(candidate.activeSession, stage);
  return normalized;
}

function migrateLegacy(candidate) {
  if (!isPlainObject(candidate)) return createInitialProfile();
  const legacyOwned = candidate.estate?.owned;
  const legacyStage = candidate.stage || "Junior High";
  const stage = legacyStage === "Elementary" ? "Elementary" : "Junior High";
  const defaults = stageDefaults(stage);
  return mergeProfile({
    ...candidate,
    stage,
    credits: nonNegativeInteger(candidate.credits, 0),
    rank: normalizeRank(candidate.rank || candidate.currentRank, "Pathfinder"),
    completedSessions: nonNegativeInteger(candidate.completedSessions, 0),
    ownedItems: candidate.ownedItems || (Array.isArray(legacyOwned) ? legacyOwned : []),
    propertyName: candidate.propertyName || candidate.estate?.propertyName || defaults.propertyName,
    selectedCharacter: defaults.selectedCharacter
  });
}

export function normalizeProfile(candidate) {
  if (candidate?.schemaVersion === PROFILE_SCHEMA_VERSION) return mergeProfile(candidate);
  // v2+ profiles already use the modern profile shape. Merge them directly so
  // High School stage progress and applied-project history survive version upgrades.
  if (isPlainObject(candidate) && Number(candidate.schemaVersion || 0) >= 2) return mergeProfile(candidate);
  return migrateLegacy(candidate);
}

export function createPlayerRepository(storage = globalThis.localStorage) {
  function readKey(key) {
    try {
      const raw = storage?.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  return {
    load() {
      const current = readKey(STORAGE_KEY);
      if (current) return normalizeProfile(current);
      for (const key of LEGACY_KEYS) {
        const legacy = readKey(key);
        if (legacy) {
          const migrated = normalizeProfile(legacy);
          this.save(migrated);
          return migrated;
        }
      }
      return createInitialProfile();
    },
    save(profile) {
      const normalized = normalizeProfile({ ...profile, updatedAt: Date.now() });
      try {
        storage?.setItem(STORAGE_KEY, JSON.stringify(normalized));
      } catch {
        // The game remains playable when storage is unavailable or full.
      }
      return normalized;
    },
    reset() {
      try {
        storage?.removeItem(STORAGE_KEY);
        for (const key of LEGACY_KEYS) storage?.removeItem(key);
      } catch {
        // Ignore storage restrictions and return a clean in-memory profile.
      }
      return createInitialProfile();
    }
  };
}
