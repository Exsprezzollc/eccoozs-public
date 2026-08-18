import { getVocabularyForStage } from "../content/vocabulary.js";
import { elementaryZones } from "../content/elementarySupports.js";
import { createRng, shuffle } from "./random.js";

const coreKinds = ["know", "synonym", "antonym"];

function eligibleDifficulty(profile) {
  if (profile.stage === "Elementary") {
    if (profile.rank === "Distinguished") return 3;
    if (profile.rank === "Seasoned") return 2;
    return 1;
  }
  if (profile.rank === "Distinguished") return 3;
  if (profile.rank === "Seasoned") return 3;
  return 2;
}

function weakestMeaningKind(profile, rng) {
  const weakness = profile.weakSkills || {};
  const ranked = shuffle(coreKinds, rng).sort((a, b) => (weakness[b] || 0) - (weakness[a] || 0));
  return ranked[0];
}

function challengeKindsForStage(profile, rng, index, isReview = false, entry = null) {
  if (profile.stage === "Elementary") {
    if (isReview) {
      const reviewMeaning = weakestMeaningKind(profile, rng);
      // A due word must be retrieved before it is re-taught. Otherwise a later
      // "recall" point would merely measure something the learner just saw.
      return ["use", reviewMeaning, "build"];
    }
    if (profile.rank === "Pathfinder") return ["discover", "build", "know", "use"];
    const connectionKind = index === 0 ? weakestMeaningKind(profile, rng) : coreKinds[(index + Math.floor(rng() * 3)) % 3];
    return ["discover", "build", connectionKind, "use"];
  }
  const meaningKind = entry?.misconception
    ? "distinguish"
    : index === 0
      ? weakestMeaningKind(profile, rng)
      : coreKinds[(index + Math.floor(rng() * 3)) % 3];
  return ["hear", "build", meaningKind, "use"];
}

function selectElementaryWords({ due, fresh, continuing, fallback, pool, count, rng }) {
  const selected = [];
  const seen = new Set();
  const push = (entry) => {
    if (!entry || seen.has(entry.id) || selected.length >= count) return;
    selected.push(entry);
    seen.add(entry.id);
  };

  // Young learners benefit from review, but a whole adventure should not become
  // a wall of old material. At most two due words lead the spiral when fresh
  // choices are available; the remaining stones keep discovery alive.
  shuffle(due, rng).slice(0, Math.min(2, count)).forEach(push);
  shuffle(fresh, rng).forEach(push);
  shuffle(continuing, rng).forEach(push);
  shuffle(due, rng).forEach(push);
  shuffle(fallback, rng).forEach(push);
  shuffle(pool, rng).forEach(push);
  return selected;
}

export function buildSessionPlan(profile, seed, count = 5, now = Date.now()) {
  const rng = createRng(seed);
  const maxDifficulty = eligibleDifficulty(profile);
  const stagePool = getVocabularyForStage(profile.stage);
  const pool = stagePool.filter((entry) => entry.difficulty <= maxDifficulty);
  const recent = new Set((profile.recentWords || []).slice(-6));
  const due = pool.filter((entry) => {
    const record = profile.mastery[entry.id];
    return record && record.nextReviewAt <= now;
  });
  const fresh = pool.filter((entry) => !profile.mastery[entry.id] && !recent.has(entry.id));
  const continuing = pool.filter((entry) => profile.mastery[entry.id] && !recent.has(entry.id) && !due.includes(entry));
  const fallback = pool.filter((entry) => !recent.has(entry.id));

  let selected;
  if (profile.stage === "Elementary") {
    selected = selectElementaryWords({ due, fresh, continuing, fallback, pool, count: Math.min(count, pool.length), rng });
  } else {
    const ordered = [
      ...shuffle(due, rng),
      ...shuffle(fresh, rng),
      ...shuffle(continuing, rng),
      ...shuffle(fallback, rng),
      ...shuffle(pool, rng)
    ];
    selected = [];
    const seen = new Set();
    for (const entry of ordered) {
      if (!seen.has(entry.id)) {
        selected.push(entry);
        seen.add(entry.id);
      }
      if (selected.length === Math.min(count, pool.length)) break;
    }
  }

  const dueIds = new Set(due.map((entry) => entry.id));
  const zoneOffset = Math.floor(rng() * Math.max(1, elementaryZones.length - 1));
  return selected.map((entry, index) => {
    const record = profile.mastery[entry.id];
    const isDue = dueIds.has(entry.id);
    const isReview = Boolean(record && record.firstSession != null && profile.completedSessions > record.firstSession);
    const zone = profile.stage === "Elementary"
      ? (isReview ? elementaryZones[elementaryZones.length - 1] : elementaryZones[(zoneOffset + index) % (elementaryZones.length - 1)])
      : null;
    return {
      wordId: entry.id,
      location: index,
      zoneId: zone?.id || null,
      review: isReview,
      due: isDue,
      kinds: challengeKindsForStage(profile, rng, index, isReview, entry),
      seed: `${profile.stage}:${seed}:${entry.id}:${index}`
    };
  });
}
