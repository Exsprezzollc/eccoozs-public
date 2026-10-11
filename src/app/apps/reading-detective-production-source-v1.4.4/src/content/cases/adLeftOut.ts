import type { ReadingCase } from "../../domain";

export const adLeftOut: ReadingCase = {
  id: "CASE.JR.004",
  title: "The Advertisement That Left Something Out",
  genre: "source",
  presentationStages: ["investigator"],
  targetSkills: ["SOURCE.002", "ARG.001", "EVID.003"],
  prerequisiteSkills: ["SOURCE.001", "EVID.002", "EVID.004"],
  briefing: "An energy-drink ad makes a strong promise. Separate the claim from the evidence and decide which evidence is actually strong enough to matter.",
  sources: [
    { id: "ad", kind: "advertisement", title: "Advertisement", body: "FOCUSFAST makes you concentrate better. Thousands follow us online!", authority: "reported" },
    { id: "study", kind: "document", title: "Study Summary", body: "In a controlled classroom task, students using the tested formula improved an average of 3 percent on one attention measure. The study did not test school grades or long-term concentration.", authority: "official" },
    { id: "comment", kind: "message", title: "Customer Comment", body: "I like the flavor and I buy it every week.", authority: "personal" },
  ],
  steps: [
    {
      id: "purpose",
      prompt: "What is the advertisement mainly trying to do?",
      skillId: "SOURCE.002",
      responseType: "single-choice",
      sourceIds: ["ad"],
      choices: [
        { id: "persuade", label: "Persuade people to believe the product helps concentration" },
        { id: "record", label: "Create a neutral scientific record" },
      ],
      correctAnswerIds: ["persuade"],
    },
    {
      id: "claim",
      prompt: "Which statement is the advertisement's main claim?",
      skillId: "ARG.001",
      responseType: "single-choice",
      sourceIds: ["ad"],
      choices: [
        { id: "focus", label: "FOCUSFAST makes you concentrate better" },
        { id: "followers", label: "Thousands follow the account online" },
      ],
      correctAnswerIds: ["focus"],
    },
    {
      id: "evidence-strength",
      prompt: "Sort the evidence by how strongly it supports the concentration claim.",
      skillId: "EVID.003",
      responseType: "classify",
      sourceIds: ["study", "comment", "ad"],
      evidenceBoard: {
        mode: "sort",
        categories: [
          { id: "evidence", label: "Relevant evidence" },
          { id: "possible", label: "Weak / indirect evidence" },
          { id: "unsupported", label: "Does not support the concentration claim" },
        ],
        cards: [
          { id: "study-card", label: "Controlled task found a small improvement on one attention measure.", sourceId: "study" },
          { id: "followers-card", label: "Thousands follow the product online.", sourceId: "ad" },
          { id: "flavor-card", label: "A customer likes the flavor.", sourceId: "comment" },
        ],
        correctPlacements: {
          "study-card": "evidence",
          "followers-card": "possible",
          "flavor-card": "unsupported",
        },
      },
      evidenceContext: "transfer",
    },
  ],
  misconceptionTargets: [],
  transferCaseIds: [],
  delayedReview: { afterDays: 7, skillIds: ["SOURCE.002", "ARG.001", "EVID.003"] },
};
