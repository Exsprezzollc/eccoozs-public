import type { ReadingCase } from "../../domain";

export const digraphClue: ReadingCase = {
  id: "CASE.ELEM.004",
  title: "The Two-Letter Sound Clue",
  genre: "word",
  presentationStages: ["young-investigator"],
  targetSkills: ["CODE.004", "CODE.005"],
  prerequisiteSkills: ["CODE.003"],
  briefing: "A clue card uses two letters that work together. Crack the sound, then compare it with a word where both consonants can still be heard.",
  sources: [
    { id: "ship", kind: "notice", title: "Clue Card", body: "SHIP", authority: "official" },
    { id: "stop", kind: "notice", title: "Second Card", body: "STOP", authority: "official" },
  ],
  steps: [
    {
      id: "digraph-sh",
      prompt: "In SHIP, which two letters work together to represent the first sound?",
      skillId: "CODE.004",
      responseType: "single-choice",
      sourceIds: ["ship"],
      choices: [
        { id: "sh", label: "sh" },
        { id: "hi", label: "hi" },
        { id: "ip", label: "ip" },
      ],
      correctAnswerIds: ["sh"],
    },
    {
      id: "blend-st",
      prompt: "In STOP, can you still hear both /s/ and /t/ at the beginning?",
      skillId: "CODE.005",
      responseType: "single-choice",
      sourceIds: ["stop"],
      choices: [
        { id: "both", label: "Yes. Both sounds are heard in the blend." },
        { id: "one", label: "No. The two letters make only one sound." },
      ],
      correctAnswerIds: ["both"],
      evidenceContext: "transfer",
    },
  ],
  misconceptionTargets: [],
  transferCaseIds: [],
  delayedReview: { afterDays: 7, skillIds: ["CODE.004", "CODE.005"] },
};
