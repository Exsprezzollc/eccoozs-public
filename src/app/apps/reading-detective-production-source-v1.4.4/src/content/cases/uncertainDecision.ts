import type { ReadingCase } from "../../domain";

export const uncertainDecision: ReadingCase = {
  id: "CASE.LEAD.013",
  title: "The Decision We Cannot Finish Yet",
  genre: "decision",
  presentationStages: ["lead-investigator"],
  targetSkills: ["DECISION.003", "EVID.004", "SOURCE.003"],
  prerequisiteSkills: ["DECISION.002", "SOURCE.005"],
  briefing: "A community board must choose between two service proposals, but a critical cost document is missing. Decide what can be concluded and what must remain unresolved.",
  sources: [
    { id: "a", kind: "document", title: "Proposal A Service Plan", body: "Late-night service until 1:00 AM on three routes. Estimated ridership: 900 trips/week. Final operating-cost sheet: not included in packet." },
    { id: "b", kind: "document", title: "Proposal B Service Plan", body: "Late-night service until 11:30 PM on five routes. Estimated ridership: 1,050 trips/week. Annual operating cost: $1.8 million." },
    { id: "minutes", kind: "document", title: "Board Minutes", body: "The board's stated priorities are late-shift access, geographic coverage, and keeping annual operating cost below $2 million." },
  ],
  steps: [
    { id: "known", prompt: "What can be confirmed from the packet?", skillId: "EVID.004", responseType: "single-choice", sourceIds: ["a", "b", "minutes"], choices: [
      { id: "known", label: "Proposal A runs later on fewer routes; Proposal B covers more routes and lists a $1.8M annual cost." },
      { id: "a-cost", label: "Proposal A definitely costs less than $2M." },
      { id: "winner", label: "Proposal A is definitely the best choice." },
    ], correctAnswerIds: ["known"] },
    { id: "confidence", prompt: "Can the board determine which proposal satisfies all three priorities from this packet alone?", skillId: "DECISION.003", responseType: "single-choice", sourceIds: ["a", "b", "minutes"], choices: [
      { id: "insufficient", label: "No. Proposal A's final cost is missing, so there is insufficient evidence to compare every priority." },
      { id: "a", label: "Yes. Proposal A is definitely under budget." },
      { id: "b", label: "Yes. Proposal B is automatically best because its cost is known." },
    ], correctAnswerIds: ["insufficient"], allowInsufficientEvidence: true, evidenceContext: "transfer" },
  ], misconceptionTargets: [], transferCaseIds: [], delayedReview: { afterDays: 7, skillIds: ["DECISION.003", "EVID.004"] },
};
