import type { ReadingCase } from "../../domain";

export const graphThatShouts: ReadingCase = {
  id: "CASE.LEAD.008",
  title: "The Graph That Shouts",
  genre: "source",
  presentationStages: ["lead-investigator"],
  targetSkills: ["DATA.001", "DATA.002", "DATA.003", "MEDIA.002"],
  prerequisiteSkills: ["EVID.003", "RESEARCH.001"],
  briefing: "A report uses dramatic percentage language and a narrow graph scale. Determine what changed, how much, and whether the text matches the numbers.",
  sources: [
    { id: "claim", kind: "text", title: "Executive Summary", body: "CUSTOMER COMPLAINTS PLUMMET 50% AFTER REDESIGN.", authority: "reported" },
    { id: "table", kind: "chart", title: "Complaint Table", body: "Before redesign: 4 complaints per 10,000 transactions. After redesign: 2 complaints per 10,000 transactions.", authority: "official" },
    { id: "graph", kind: "chart", title: "Published Graph", body: "Y-axis: 1.5 to 4.5 complaints per 10,000. Bars: Before 4.0; After 2.0.", authority: "official" },
  ],
  steps: [
    { id: "relative", prompt: "Which reading gives both relative and absolute change?", skillId: "DATA.001", responseType: "single-choice", sourceIds: ["table"], quantitativeFrameId: "complaints-frame", choices: [
      { id: "both", label: "Complaints fell by 2 per 10,000 transactions, a 50% relative decrease from the baseline." },
      { id: "zero", label: "Complaints were eliminated." },
      { id: "half-people", label: "Half of all customers complained." },
    ], correctAnswerIds: ["both"] },
    { id: "axis", prompt: "What does the graph scale do to the visual impression?", skillId: "DATA.002", responseType: "single-choice", sourceIds: ["graph", "table"], graphFrameId: "complaints-graph", choices: [
      { id: "amplify", label: "The narrow nonzero axis makes the difference look visually larger, even though the underlying values are still 4 and 2 per 10,000." },
      { id: "fake", label: "The graph automatically proves the values are fake." },
      { id: "none", label: "Axis choices never affect visual interpretation." },
    ], correctAnswerIds: ["amplify"] },
    { id: "wording", prompt: "Which part of the summary needs the most caution?", skillId: "DATA.003", responseType: "single-choice", sourceIds: ["claim", "table"], mediaFrameId: "plummet-frame", choices: [
      { id: "plummet", label: "‘Plummet’ is dramatic framing; the precise values should be reported alongside the 50% decrease." },
      { id: "complaints", label: "The word ‘complaints’ is unsupported." },
      { id: "after", label: "The word ‘after’ proves causation." },
    ], correctAnswerIds: ["plummet"], evidenceContext: "transfer" },
  ], misconceptionTargets: [], transferCaseIds: [], delayedReview: { afterDays: 7, skillIds: ["DATA.001", "DATA.002", "DATA.003"] },
  researchMediaDecision: {
    quantitativeFrames: [{ id: "complaints-frame", sourceId: "table", label: "complaints per 10,000", baseline: 4, comparison: 2, unit: "complaints per 10,000", reportedRelativeChangePercent: -50 }],
    graphFrames: [{ id: "complaints-graph", sourceId: "graph", title: "Complaint Rate Before/After", yAxisMinimum: 1.5, yAxisMaximum: 4.5, values: [4,2], labels: ["Before", "After"], visualRisk: "truncated-axis", interpretation: "The graph displays the correct values but uses a narrow nonzero axis that amplifies visual difference." }],
    mediaClaims: [{ id: "plummet-frame", sourceId: "claim", claimText: "Customer complaints plummet 50% after redesign.", certainty: "plausible", evidenceSourceIds: ["table"], risks: ["relative-without-absolute"], preciseReading: "Complaints decreased from 4 to 2 per 10,000 transactions, a 50% relative decrease and an absolute decrease of 2 per 10,000." }],
  },
};
