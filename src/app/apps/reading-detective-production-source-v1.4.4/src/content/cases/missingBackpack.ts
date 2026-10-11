import type { ReadingCase } from "../../domain";

export const missingBackpack: ReadingCase = {
  id: "CASE.JR.001",
  title: "The Missing Backpack",
  genre: "source",
  presentationStages: ["investigator"],
  targetSkills: ["SENT.003", "COMP.001", "EVID.004", "SOURCE.001"],
  prerequisiteSkills: ["SENT.001", "VOCAB.001", "EVID.001"],
  briefing: "A backpack was left behind after club meetings. Compare the messages, schedule, and witness account to determine what the evidence supports.",
  sources: [
    {
      id: "schedule",
      kind: "notice",
      title: "Club Schedule",
      body: "Robotics Club — Room 214 — 3:15–4:15 PM. Art Club — Room 118 — 3:30–4:30 PM.",
      authority: "official",
    },
    {
      id: "message",
      kind: "message",
      title: "Group Message",
      body: "I think the blue backpack belongs to somebody from Art Club.",
      authority: "personal",
    },
    {
      id: "witness",
      kind: "text",
      title: "Witness Statement",
      body: "I saw a student carrying a blue backpack leave Room 214, but I did not see where the backpack was left later.",
      authority: "reported",
    },
  ],
  steps: [
    {
      id: "room-clue",
      prompt: "Which club definitely met in Room 214?",
      skillId: "COMP.001",
      responseType: "single-choice",
      sourceIds: ["schedule"],
      choices: [
        { id: "robotics", label: "Robotics Club" },
        { id: "art", label: "Art Club" },
      ],
      correctAnswerIds: ["robotics"],
    },
    {
      id: "evidence-boundary",
      prompt: "What does the witness statement support?",
      skillId: "EVID.004",
      responseType: "single-choice",
      sourceIds: ["witness", "message"],
      choices: [
        { id: "left-room", label: "A student with a blue backpack left Room 214" },
        { id: "belongs-art", label: "The backpack definitely belongs to an Art Club student", misconceptionId: "EVID.001" },
      ],
      correctAnswerIds: ["left-room"],
      clueLabId: "CLUE.EVID.TEXT_ONLY",
    },
    {
      id: "final",
      prompt: "Can the current evidence prove who owns the backpack?",
      skillId: "EVID.004",
      responseType: "single-choice",
      sourceIds: ["schedule", "message", "witness"],
      choices: [
        { id: "not-enough", label: "No. We need more information." },
        { id: "art-owner", label: "Yes. The group message proves it." , misconceptionId: "EVID.001"},
      ],
      correctAnswerIds: ["not-enough"],
      allowInsufficientEvidence: true,
      clueLabId: "CLUE.EVID.TEXT_ONLY",
    },
  ],
  misconceptionTargets: ["EVID.001"],
  transferCaseIds: [],
};
