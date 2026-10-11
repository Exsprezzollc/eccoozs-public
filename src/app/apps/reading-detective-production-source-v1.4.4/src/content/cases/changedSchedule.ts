import type { ReadingCase } from "../../domain";

export const changedSchedule: ReadingCase = {
  id: "CASE.JR.002",
  title: "The Changed Schedule",
  genre: "source",
  presentationStages: ["investigator"],
  targetSkills: ["SENT.003", "COMP.001", "EVID.004"],
  prerequisiteSkills: ["SENT.001", "VOCAB.001", "EVID.001"],
  briefing:
    "A group chat and an official notice disagree about when a school program begins. Determine what changed and which information controls.",
  sources: [
    {
      id: "chat",
      kind: "message",
      title: "Group Chat",
      body: "I heard the program starts at 6:00 PM.",
      authority: "personal",
    },
    {
      id: "notice",
      kind: "notice",
      title: "Official Notice",
      body: "Doors open at 6:00 PM. However, the program begins at 6:30 PM.",
      authority: "official",
    },
    {
      id: "flyer",
      kind: "advertisement",
      title: "Event Flyer",
      body: "Join us Friday evening!",
      authority: "official",
    },
  ],
  steps: [
    {
      id: "contrast",
      prompt: "What does ‘however’ signal in the official notice?",
      skillId: "SENT.003",
      responseType: "single-choice",
      sourceIds: ["notice"],
      choices: [
        { id: "contrast", label: "The second idea contrasts with the first time mentioned" },
        { id: "same", label: "Both times mean exactly the same thing" },
      ],
      correctAnswerIds: ["contrast"],
    },
    {
      id: "program-time",
      prompt: "When does the program actually begin according to the official notice?",
      skillId: "COMP.001",
      responseType: "single-choice",
      sourceIds: ["notice"],
      choices: [
        { id: "630", label: "6:30 PM" },
        { id: "600", label: "6:00 PM" },
      ],
      correctAnswerIds: ["630"],
    },
    {
      id: "chat-boundary",
      prompt: "Does the group chat prove that the program starts at 6:00 PM?",
      skillId: "EVID.004",
      responseType: "single-choice",
      sourceIds: ["chat", "notice"],
      choices: [
        { id: "no", label: "No. It reports what someone heard, while the official notice gives the start time." },
        {
          id: "yes",
          label: "Yes. A group-chat message proves the schedule.",
          misconceptionId: "EVID.001",
        },
      ],
      correctAnswerIds: ["no"],
      clueLabId: "CLUE.EVID.TEXT_ONLY",
      evidenceContext: "transfer",
    },
  ],
  misconceptionTargets: ["EVID.001"],
  transferCaseIds: [],
  delayedReview: { afterDays: 7, skillIds: ["SENT.003", "EVID.004"] },
};
