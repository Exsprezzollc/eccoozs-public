import { getCivicProject, highSchoolDomains } from "../content/highSchoolProjects.js";
import { getVocabularyWord } from "../content/vocabulary.js";

const scoredKinds = new Set(["source-strength", "source-limitation", "source-confidence", "applied-vocabulary", "evidence-reasoning", "evidence-selection", "constraint-reasoning", "assumption-check", "professional-recommendation", "decision-revision-impact", "decision-revision-response"]);

function domainForEvent(event) {
  try {
    return getCivicProject(event.projectId).domainId;
  } catch {
    return null;
  }
}

function firstAttemptEvents(profile) {
  return (profile.challengeHistory || []).filter((event) => {
    if (event.learningStage !== "High School" || !scoredKinds.has(event.kind)) return false;
    const id = String(event.id || "");
    return /:0$/.test(id);
  });
}

function accuracy(events) {
  if (!events.length) return null;
  return Math.round((events.filter((event) => event.correct).length / events.length) * 100);
}

function evidenceLabel(filed, accuracyPercent) {
  if (!filed) return "Not observed";
  if (filed === 1) return "Emerging evidence";
  if (accuracyPercent == null) return "Developing evidence";
  if (filed >= 3 && accuracyPercent >= 85) return "Strong applied evidence";
  if (accuracyPercent >= 70) return "Demonstrated";
  return "Developing evidence";
}

export function buildHighSchoolEducatorInsights(profile) {
  const history = profile.appliedProjects?.history || [];
  const first = firstAttemptEvents(profile);

  const domains = highSchoolDomains.map((domain) => {
    const filed = history.filter((item) => item.domainId === domain.id).length;
    const domainEvents = first.filter((event) => domainForEvent(event) === domain.id);
    const sourceEvents = domainEvents.filter((event) => ["source-strength", "source-limitation", "source-confidence"].includes(event.kind));
    const vocabulary = domainEvents.filter((event) => event.kind === "applied-vocabulary");
    const reasoning = domainEvents.filter((event) => event.kind === "evidence-reasoning");
    const chainEvents = domainEvents.filter((event) => ["evidence-selection", "constraint-reasoning", "assumption-check"].includes(event.kind));
    const recommendations = domainEvents.filter((event) => event.kind === "professional-recommendation");
    const revisionEvents = domainEvents.filter((event) => ["decision-revision-impact", "decision-revision-response"].includes(event.kind));
    const overall = accuracy(domainEvents);
    return {
      ...domain,
      filed,
      attempts: domainEvents.length,
      firstAttemptAccuracy: overall,
      sourceJudgmentAccuracy: accuracy(sourceEvents),
      vocabularyAccuracy: accuracy(vocabulary),
      reasoningAccuracy: accuracy(reasoning),
      evidenceChainAccuracy: accuracy(chainEvents),
      recommendationAccuracy: accuracy(recommendations),
      decisionRevisionAccuracy: accuracy(revisionEvents),
      evidenceLevel: evidenceLabel(filed, overall)
    };
  });

  const applicationMap = new Map();
  for (const event of (profile.challengeHistory || [])) {
    if (event.learningStage !== "High School" || event.kind !== "applied-vocabulary" || !event.correct || !event.wordId) continue;
    const domainId = domainForEvent(event);
    if (!domainId) continue;
    const current = applicationMap.get(event.wordId) || { wordId: event.wordId, domains: new Set(), projects: new Set(), recallEvents: 0, successfulEvents: 0 };
    current.domains.add(domainId);
    current.projects.add(event.projectId);
    current.successfulEvents += 1;
    if (event.skill === "recall") current.recallEvents += 1;
    applicationMap.set(event.wordId, current);
  }

  const transfer = [...applicationMap.values()].map((item) => {
    const entry = getVocabularyWord(item.wordId);
    const domainsUsed = [...item.domains];
    const level = domainsUsed.length >= 2 && item.recallEvents > 0
      ? "Cross-domain transfer"
      : item.projects.size >= 2
        ? "Repeated application"
        : "Single-context application";
    return {
      wordId: item.wordId,
      word: entry.word,
      domains: domainsUsed,
      domainNames: domainsUsed.map((id) => highSchoolDomains.find((domain) => domain.id === id)?.shortName || id),
      projects: item.projects.size,
      successfulEvents: item.successfulEvents,
      recallEvents: item.recallEvents,
      level
    };
  }).sort((a, b) => b.domains.length - a.domains.length || b.projects - a.projects || a.word.localeCompare(b.word));

  const repairs = (profile.challengeHistory || [])
    .filter((event) => event.learningStage === "High School" && !event.correct && event.repairType)
    .reduce((counts, event) => {
      counts[event.repairType] = (counts[event.repairType] || 0) + 1;
      return counts;
    }, {});

  return {
    domains,
    transfer,
    crossDomainTransfer: transfer.filter((item) => item.level === "Cross-domain transfer"),
    repeatedApplication: transfer.filter((item) => item.level === "Repeated application"),
    precisionRepairs: Object.entries(repairs).sort((a, b) => b[1] - a[1]),
    firstAttemptAccuracy: accuracy(first),
    firstAttemptCount: first.length
  };
}
