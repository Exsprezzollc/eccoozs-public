import type { ReadingCase } from "../../domain";

export const punctuationMessage: ReadingCase = {
  id: "CASE.ELEM.008",
  title: "The Punctuation Message",
  genre: "meaning",
  presentationStages: ["young-investigator"],
  targetSkills: ["SENT.006", "FLUENCY.001"],
  prerequisiteSkills: ["SENT.001", "CODE.010"],
  briefing: "Two messages use nearly the same words. Use punctuation and meaningful phrasing to understand how each should be read.",
  sources: [
    { id: "message-a", kind: "message", title: "Message A", body: "You found it.", authority: "reported" },
    { id: "message-b", kind: "message", title: "Message B", body: "You found it?", authority: "reported" },
    { id: "notice", kind: "notice", title: "Reading Notice", body: "After you find the key, bring it to the desk.", authority: "official" },
  ],
  steps: [
    {
      id: "question-mark",
      prompt: "Which message is asking whether the key was found?",
      skillId: "SENT.006",
      responseType: "single-choice",
      sourceIds: ["message-a", "message-b"],
      choices: [
        { id: "b", label: "Message B — You found it?" },
        { id: "a", label: "Message A — You found it." },
      ],
      correctAnswerIds: ["b"],
    },
    {
      id: "phrase",
      prompt: "Which phrasing keeps the condition and action clear?",
      skillId: "FLUENCY.001",
      responseType: "single-choice",
      sourceIds: ["notice"],
      choices: [
        { id: "clear", label: "After you find the key, / bring it to the desk." },
        { id: "choppy", label: "After / you find / the key bring / it to / the desk." },
        { id: "race", label: "Read as fast as possible without using the comma." },
      ],
      correctAnswerIds: ["clear"],
      evidenceContext: "transfer",
    },
  ],
  misconceptionTargets: [],
  transferCaseIds: [],
  delayedReview: { afterDays: 7, skillIds: ["SENT.006", "FLUENCY.001"] },
};
