import { getVocabularyForStage, getVocabularyWord } from "../content/vocabulary.js";
import { stageDefinitions, displayRank } from "../content/stages.js";
import { buildHighSchoolEducatorInsights } from "./educatorInsights.js";

function pct(correct, total) {
  return total ? Math.round((correct / total) * 100) : null;
}

function stageProgress(profile, stage) {
  if (profile.stage === stage) return { rank: profile.rank, completedSessions: profile.completedSessions };
  return profile.stageProgress?.[stage] || { rank: "Pathfinder", completedSessions: 0 };
}

function masteryRows(profile, stage) {
  const words = getVocabularyForStage(stage);
  return words
    .map((entry) => ({ entry, record: profile.mastery?.[entry.id] }))
    .filter(({ record }) => Boolean(record))
    .map(({ entry, record }) => ({
      word: entry.word,
      stage: record.stage,
      exposureCount: Number(record.exposureCount || 0),
      successfulResponses: Number(record.correctTotal || 0),
      misses: Number(record.wrongTotal || 0),
      buildEvidence: Number(record.evidence?.spell || 0),
      meaningEvidence: Number(record.evidence?.meaning || 0),
      useEvidence: Number(record.evidence?.use || 0),
      laterRecallEvidence: Number(record.evidence?.recall || 0),
      reviewDue: Number(record.nextReviewAt || 0) > 0 && Number(record.nextReviewAt || 0) <= Date.now()
    }));
}

function stageSummary(profile, stage) {
  const rows = masteryRows(profile, stage);
  const events = (profile.challengeHistory || []).filter((event) => event.learningStage === stage && event.skill !== "exposure");
  const correct = events.filter((event) => event.correct).length;
  const progress = stageProgress(profile, stage);
  return {
    stage,
    rank: displayRank(stage, progress.rank),
    completedSessionsOrBriefs: Number(progress.completedSessions || 0),
    wordsIntroduced: rows.length,
    strongOrMastered: rows.filter((row) => ["Strong", "Mastered"].includes(row.stage)).length,
    mastered: rows.filter((row) => row.stage === "Mastered").length,
    reviewDue: rows.filter((row) => row.reviewDue).length,
    assessedResponses: events.length,
    assessedAccuracy: pct(correct, events.length)
  };
}

export function buildEducatorReport(profile, exportedAt = Date.now()) {
  const stages = stageDefinitions.map((definition) => stageSummary(profile, definition.label));
  const currentRows = masteryRows(profile, profile.stage);
  const events = (profile.challengeHistory || []).filter((event) => event.learningStage === profile.stage && event.skill !== "exposure");
  const supportPatterns = events
    .filter((event) => !event.correct && event.errorType)
    .reduce((acc, event) => {
      acc[event.errorType] = (acc[event.errorType] || 0) + 1;
      return acc;
    }, {});
  const report = {
    reportType: "ECCOOZS Vocabulary Adventure — Adult / Educator Progress",
    exportedAt,
    currentLearningPath: profile.stage,
    estateCredits: Number(profile.credits || 0),
    developmentalPaths: stages,
    currentPathWords: currentRows,
    currentPathSupportPatterns: Object.entries(supportPatterns)
      .map(([pattern, observations]) => ({ pattern, observations }))
      .sort((a, b) => b.observations - a.observations),
    notes: [
      "Teaching exposures are excluded from assessed accuracy.",
      "A repaired miss remains part of the learning record and does not become false first-attempt independence.",
      "This export contains earned learning evidence only. It intentionally excludes challenge prompts, answer keys, future questions, distractor sets, and authored scoring scripts."
    ]
  };
  if (profile.stage === "High School") report.highSchoolAppliedInsights = buildHighSchoolEducatorInsights(profile);
  return report;
}

function csvCell(value) {
  const text = value == null ? "" : String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function educatorReportToCSV(report) {
  const lines = [];
  lines.push(["ECCOOZS Vocabulary Adventure — Adult / Educator Progress"].map(csvCell).join(","));
  lines.push(["Exported", new Date(report.exportedAt).toISOString()].map(csvCell).join(","));
  lines.push(["Current learning path", report.currentLearningPath].map(csvCell).join(","));
  lines.push(["Estate Credits", report.estateCredits].map(csvCell).join(","));
  lines.push("");
  lines.push(["Developmental path", "Rank", "Completed sessions/briefs", "Words introduced", "Strong/Mastered", "Mastered", "Review due", "Assessed responses", "Assessed accuracy"].map(csvCell).join(","));
  for (const row of report.developmentalPaths) {
    lines.push([row.stage, row.rank, row.completedSessionsOrBriefs, row.wordsIntroduced, row.strongOrMastered, row.mastered, row.reviewDue, row.assessedResponses, row.assessedAccuracy == null ? "" : `${row.assessedAccuracy}%`].map(csvCell).join(","));
  }
  lines.push("");
  lines.push(["Current path word", "Mastery stage", "Heard/introduced", "Successful responses", "Misses", "Build evidence", "Meaning evidence", "Use evidence", "Later recall", "Review due"].map(csvCell).join(","));
  for (const row of report.currentPathWords) {
    lines.push([row.word, row.stage, row.exposureCount, row.successfulResponses, row.misses, row.buildEvidence, row.meaningEvidence, row.useEvidence, row.laterRecallEvidence, row.reviewDue ? "Yes" : "No"].map(csvCell).join(","));
  }
  if (report.currentPathSupportPatterns.length) {
    lines.push("");
    lines.push(["Support pattern", "Observed misses"].map(csvCell).join(","));
    for (const item of report.currentPathSupportPatterns) lines.push([item.pattern, item.observations].map(csvCell).join(","));
  }
  lines.push("");
  for (const note of report.notes) lines.push(["Note", note].map(csvCell).join(","));
  return lines.join("\r\n");
}

export function educatorReportFilename(stage, date = new Date(), extension = "csv") {
  const stamp = date.toISOString().slice(0, 10);
  const safeStage = String(stage || "Progress").replaceAll(" ", "_");
  return `ECCOOZS_Vocabulary_Adventure_${safeStage}_Progress_${stamp}.${extension}`;
}
