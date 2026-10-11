import type { ReadingCase } from "../../domain";

export const schoolRumor: ReadingCase = {
  id: "CASE.JR.003",
  title: "The School Rumor",
  genre: "source",
  presentationStages: ["investigator"],
  targetSkills: ["SOURCE.001", "EVID.002", "SOURCE.003"],
  prerequisiteSkills: ["EVID.001", "COMP.001"],
  briefing: "A rumor says the fall dance was canceled. Compare the messages and determine what is confirmed, what is only possible, and what still needs evidence.",
  sources: [
    { id: "chat", kind: "message", title: "Student Group Chat", body: "My cousin said the fall dance is canceled.", authority: "personal" },
    { id: "office", kind: "notice", title: "Activities Office Update", body: "The fall dance remains scheduled for October 16. Ticket sales begin Monday.", authority: "official" },
    { id: "club", kind: "message", title: "Student Council Post", body: "We are still decorating for the October 16 dance.", authority: "reported" },
  ],
  steps: [
    {
      id: "identify-source",
      prompt: "Which source is the Activities Office speaking for itself?",
      skillId: "SOURCE.001",
      responseType: "select-source",
      sourceIds: ["chat", "office", "club"],
      choices: [
        { id: "office", label: "Activities Office Update" },
        { id: "chat", label: "Student Group Chat" },
        { id: "club", label: "Student Council Post" },
      ],
      correctAnswerIds: ["office"],
    },
    {
      id: "relevance-sort",
      prompt: "Sort each clue by what it contributes to the question: Is the dance canceled?",
      skillId: "EVID.002",
      responseType: "classify",
      sourceIds: ["chat", "office", "club"],
      evidenceBoard: {
        mode: "compare",
        minimumSources: 2,
        categories: [
          { id: "confirmed", label: "Direct evidence about the schedule" },
          { id: "possible", label: "Useful but indirect evidence" },
          { id: "unsupported", label: "Rumor / unsupported claim" },
        ],
        cards: [
          { id: "office-card", label: "The office says the dance remains scheduled for October 16.", sourceId: "office" },
          { id: "club-card", label: "Student Council says it is still decorating for the October 16 dance.", sourceId: "club" },
          { id: "chat-card", label: "A student says a cousin said the dance is canceled.", sourceId: "chat" },
        ],
        correctPlacements: {
          "office-card": "confirmed",
          "club-card": "possible",
          "chat-card": "unsupported",
        },
      },
    },
    {
      id: "corroborate",
      prompt: "Which two sources agree that preparations for the October 16 dance are continuing?",
      skillId: "SOURCE.003",
      responseType: "multiple-choice",
      sourceIds: ["office", "club", "chat"],
      choices: [
        { id: "office", label: "Activities Office Update" },
        { id: "club", label: "Student Council Post" },
        { id: "chat", label: "Student Group Chat" },
      ],
      correctAnswerIds: ["office", "club"],
      evidenceContext: "transfer",
    },
  ],
  misconceptionTargets: ["EVID.001"],
  transferCaseIds: [],
  delayedReview: { afterDays: 7, skillIds: ["EVID.002", "SOURCE.003"] },
};
