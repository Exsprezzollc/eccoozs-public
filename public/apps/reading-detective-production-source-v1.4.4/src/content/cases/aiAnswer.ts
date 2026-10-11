import type { ReadingCase } from "../../domain";

export const aiAnswer: ReadingCase = {
  id: "CASE.LEAD.010",
  title: "The Polished AI Answer",
  genre: "source",
  presentationStages: ["lead-investigator"],
  targetSkills: ["MEDIA.003", "SOURCE.005", "SOURCE.003", "EVID.004"],
  prerequisiteSkills: ["SOURCE.001", "SOURCE.002", "EVID.001"],
  briefing: "An AI-generated answer confidently summarizes a workplace policy and cites a sentence. Verify the claim against the original document instead of trusting or rejecting it automatically.",
  sources: [
    { id: "ai", kind: "message", title: "AI-Generated Answer", body: "Employees are guaranteed two remote days each week. The policy says: ‘Employees may request up to two remote days per week.’", authority: "unknown", intelligence: { creator: "AI assistant", purpose: "explain", proximity: "summary", independenceKey: "ai-summary", contextNote: "Generated answer; underlying source must be checked." } },
    { id: "policy", kind: "document", title: "Remote Work Policy", body: "Employees may request up to two remote days per week. Requests require manager approval and may be denied when operational coverage is insufficient.", authority: "official", intelligence: { creator: "Employer HR", purpose: "instruct", proximity: "official-record", independenceKey: "hr-policy" } },
  ],
  sourceIntelligence: { lenses: [{ id: "remote-guarantee", question: "Are two remote days guaranteed?", assessments: [
    { sourceId: "ai", utility: "limited", rationale: "The answer states the guarantee claim but paraphrases the policy inaccurately." },
    { sourceId: "policy", utility: "direct", rationale: "The original policy directly states request permission and manager-approval conditions." },
  ] }] },
  steps: [
    { id: "verify", prompt: "What is the strongest first move?", skillId: "MEDIA.003", responseType: "single-choice", sourceIds: ["ai", "policy"], choices: [
      { id: "original", label: "Read the original policy and compare the quoted/paraphrased language in context." },
      { id: "trust", label: "Accept the answer because it is polished and includes a quote." },
      { id: "reject", label: "Reject every AI-generated statement automatically." },
    ], correctAnswerIds: ["original"] },
    { id: "phrase", prompt: "Which phrase proves the AI answer overstates the policy?", skillId: "EVID.004", responseType: "highlight-phrase", sourceIds: ["policy"], evidenceBoard: { mode: "zoom", target: { sourceId: "policy", sentence: "Employees may request up to two remote days per week. Requests require manager approval and may be denied when operational coverage is insufficient.", phrase: "may request" }, phraseOptions: ["may request", "two remote days", "per week"] } },
    { id: "conclusion", prompt: "What conclusion does the policy support?", skillId: "SOURCE.005", responseType: "single-choice", sourceIds: ["ai", "policy"], sourceLensId: "remote-guarantee", choices: [
      { id: "conditional", label: "Employees may request up to two remote days, but approval is conditional and not guaranteed." },
      { id: "guaranteed", label: "Every employee is guaranteed two remote days." },
    ], correctAnswerIds: ["conditional"], evidenceContext: "transfer" },
  ], misconceptionTargets: [], transferCaseIds: [], delayedReview: { afterDays: 7, skillIds: ["MEDIA.003", "SOURCE.005"] },
};
