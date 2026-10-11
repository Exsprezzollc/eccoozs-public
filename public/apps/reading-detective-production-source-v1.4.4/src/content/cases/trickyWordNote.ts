import type { ReadingCase } from "../../domain";

export const trickyWordNote: ReadingCase = {
  id: "CASE.ELEM.007",
  title: "The Tricky Word Note",
  genre: "word",
  presentationStages: ["young-investigator"],
  targetSkills: ["CODE.010", "SENT.001"],
  prerequisiteSkills: ["CODE.003", "CODE.001"],
  briefing: "A short note contains words that appear all the time. Map the printed words instead of guessing from their shape.",
  sources: [
    { id: "note", kind: "message", title: "Desk Note", body: "The red bag was by the door.", authority: "reported" },
  ],
  steps: [
    {
      id: "map-was",
      prompt: "Which printed word in the note is the word was?",
      skillId: "CODE.010",
      responseType: "single-choice",
      sourceIds: ["note"],
      choices: [
        { id: "was", label: "was" },
        { id: "the", label: "the" },
        { id: "door", label: "door" },
      ],
      correctAnswerIds: ["was"],
    },
    {
      id: "meaning",
      prompt: "What does the whole sentence tell us?",
      skillId: "SENT.001",
      responseType: "single-choice",
      sourceIds: ["note"],
      choices: [
        { id: "location", label: "The red bag was by the door." },
        { id: "blue", label: "A blue bag was on the table." },
        { id: "missing", label: "The note does not mention a bag." },
      ],
      correctAnswerIds: ["location"],
      evidenceContext: "transfer",
    },
  ],
  misconceptionTargets: [],
  transferCaseIds: ["CASE.ELEM.008"],
  delayedReview: { afterDays: 5, skillIds: ["CODE.010"] },
};
