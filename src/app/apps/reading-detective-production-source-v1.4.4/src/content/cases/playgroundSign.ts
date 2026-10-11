import type { ReadingCase } from "../../domain";

export const playgroundSign: ReadingCase = {
  id: "CASE.ELEM.002",
  title: "The Playground Sign",
  genre: "meaning",
  presentationStages: ["young-investigator"],
  targetSkills: ["SENT.001", "COMP.001", "EVID.001"],
  prerequisiteSkills: ["CODE.002"],
  briefing:
    "Two playground signs give different directions. Read the clues and determine which area is open for play.",
  sources: [
    {
      id: "blue-sign",
      kind: "notice",
      title: "Blue Playground Sign",
      body: "BALL FIELD OPEN",
      authority: "official",
    },
    {
      id: "garden-sign",
      kind: "notice",
      title: "Garden Sign",
      body: "GARDEN CLOSED TODAY",
      authority: "official",
    },
    {
      id: "friend-note",
      kind: "message",
      title: "Friend's Note",
      body: "I think the garden might open later.",
      authority: "personal",
    },
  ],
  steps: [
    {
      id: "open-area",
      prompt: "Which place does the sign say is open?",
      skillId: "COMP.001",
      responseType: "single-choice",
      sourceIds: ["blue-sign", "garden-sign"],
      choices: [
        { id: "field", label: "The ball field" },
        { id: "garden", label: "The garden" },
      ],
      correctAnswerIds: ["field"],
    },
    {
      id: "garden-meaning",
      prompt: "What does the garden sign tell us?",
      skillId: "SENT.001",
      responseType: "single-choice",
      sourceIds: ["garden-sign"],
      choices: [
        { id: "closed", label: "The garden is closed today" },
        { id: "open", label: "The garden is open today" },
      ],
      correctAnswerIds: ["closed"],
    },
    {
      id: "best-evidence",
      prompt: "Which clue best proves whether the garden is open now?",
      skillId: "EVID.001",
      responseType: "select-source",
      sourceIds: ["garden-sign", "friend-note"],
      choices: [
        { id: "sign", label: "The official garden sign" },
        {
          id: "guess",
          label: "The friend's guess about later",
          misconceptionId: "EVID.001",
        },
      ],
      correctAnswerIds: ["sign"],
      clueLabId: "CLUE.EVID.TEXT_ONLY",
      evidenceContext: "transfer",
    },
  ],
  misconceptionTargets: ["EVID.001"],
  transferCaseIds: [],
  delayedReview: { afterDays: 7, skillIds: ["COMP.001", "EVID.001"] },
};
