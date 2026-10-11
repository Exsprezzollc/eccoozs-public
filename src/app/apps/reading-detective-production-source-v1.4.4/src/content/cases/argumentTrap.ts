import type { ReadingCase } from "../../domain";

export const argumentTrap: ReadingCase = {
  id: "CASE.LEAD.011",
  title: "The Argument Trap",
  genre: "source",
  presentationStages: ["lead-investigator"],
  targetSkills: ["ARG.004", "ARG.005", "ARG.006"],
  prerequisiteSkills: ["ARG.003", "EVID.004"],
  briefing: "A proposal debate contains an unstated assumption, a meaningful counterclaim, and several weak responses. Separate actual reasoning from rhetorical shortcuts.",
  sources: [
    { id: "proposal", kind: "text", title: "Proposal", body: "The city should replace all paper permits with an app because digital systems are always more efficient." },
    { id: "counter", kind: "text", title: "Counterclaim", body: "Some residents lack reliable smartphone access, so app-only permits could create access barriers." },
    { id: "response", kind: "text", title: "Response", body: "People who oppose the app are just afraid of technology. Millions of people use apps every day, so the proposal must be fair." },
    { id: "data", kind: "document", title: "Access Survey", body: "The local survey estimates 18% of permit users lack reliable smartphone access. The proposal draft includes no non-app alternative." },
  ],
  steps: [
    { id: "assumption", prompt: "What assumption does the proposal need?", skillId: "ARG.004", responseType: "single-choice", sourceIds: ["proposal"], choices: [
      { id: "digital", label: "Replacing paper with an app will be more efficient for the relevant permit users without creating unacceptable access problems." },
      { id: "city", label: "The city exists." },
      { id: "paper", label: "Paper can be printed." },
    ], correctAnswerIds: ["digital"] },
    { id: "rebuttal", prompt: "Which response actually addresses the counterclaim?", skillId: "ARG.005", responseType: "single-choice", sourceIds: ["counter", "data", "response"], choices: [
      { id: "access", label: "Use the access survey and explain whether a non-app option can address the 18% access barrier." },
      { id: "afraid", label: "Say opponents are afraid of technology." },
      { id: "popular", label: "Say millions of people use apps." },
    ], correctAnswerIds: ["access"] },
    { id: "flaw", prompt: "What is wrong with the response ‘Millions use apps, so the proposal must be fair’?", skillId: "ARG.006", responseType: "single-choice", sourceIds: ["response", "data"], choices: [
      { id: "popularity", label: "Popularity does not establish whether this specific app-only policy is accessible or fair to the affected users." },
      { id: "proof", label: "Popularity proves fairness." },
      { id: "sample", label: "The sentence is a randomized experiment." },
    ], correctAnswerIds: ["popularity"], evidenceContext: "transfer" },
  ], misconceptionTargets: [], transferCaseIds: [], delayedReview: { afterDays: 7, skillIds: ["ARG.004", "ARG.005", "ARG.006"] },
};
