import type { ReadingCase } from "../../domain";

export const procedureThatFailed: ReadingCase = {
  id: "CASE.JR.009",
  title: "The Procedure That Failed",
  genre: "procedure",
  presentationStages: ["investigator"],
  targetSkills: ["PROC.001", "PROC.002", "COMP.002"],
  prerequisiteSkills: ["SENT.005", "SENT.004", "COMP.001"],
  briefing: "A media-club equipment setup failed. Determine which instructions were mandatory, which were optional, and which prerequisite was skipped.",
  sources: [
    {
      id: "procedure",
      kind: "document",
      title: "Projector Setup Procedure",
      body: "1. Connect the video cable. 2. Verify the projector is powered off before connecting the power cable. 3. Connect power. 4. Turn on the projector. A carrying cart is optional. Do not disconnect the video cable while the projector is updating.",
      authority: "official",
    },
    {
      id: "incident",
      kind: "message",
      title: "Setup Note",
      body: "The power cable was connected while the projector was already on. The display froze during startup.",
      authority: "reported",
    },
  ],
  appliedReading: {
    procedures: [
      { id: "connect-video", sourceId: "procedure", action: "Connect the video cable", strength: "required" },
      { id: "power-off", sourceId: "procedure", action: "Verify the projector is powered off before connecting power", strength: "required" },
      { id: "connect-power", sourceId: "procedure", action: "Connect the power cable", strength: "required", prerequisiteRuleIds: ["power-off"], consequenceIfSkipped: "The procedure's required safety/setup order is violated." },
      { id: "cart", sourceId: "procedure", action: "Use a carrying cart", strength: "optional" },
      { id: "no-disconnect", sourceId: "procedure", action: "Disconnect the video cable while updating", strength: "prohibited" },
    ],
  },
  steps: [
    {
      id: "strength",
      prompt: "Which action is optional rather than required?",
      skillId: "PROC.001",
      responseType: "single-choice",
      sourceIds: ["procedure"],
      choices: [
        { id: "cart", label: "Use a carrying cart" },
        { id: "off", label: "Verify power is off before connecting power" },
        { id: "video", label: "Connect the video cable" },
      ],
      correctAnswerIds: ["cart"],
    },
    {
      id: "prerequisite",
      prompt: "Which required prerequisite was skipped before the power cable was connected?",
      skillId: "PROC.002",
      responseType: "single-choice",
      sourceIds: ["procedure", "incident"],
      choices: [
        { id: "off", label: "Verify the projector is powered off" },
        { id: "cart", label: "Use the optional carrying cart" },
        { id: "update", label: "Wait for an update that had not begun" },
      ],
      correctAnswerIds: ["off"],
    },
    {
      id: "sequence",
      prompt: "Which sequence matches the required setup order?",
      skillId: "COMP.002",
      responseType: "single-choice",
      sourceIds: ["procedure"],
      choices: [
        { id: "correct", label: "Connect video → verify power off → connect power → turn on" },
        { id: "wrong", label: "Turn on → connect power → verify power off" },
        { id: "cart-first", label: "Use cart → turn on → skip cable verification" },
      ],
      correctAnswerIds: ["correct"],
      evidenceContext: "transfer",
    },
  ],
  misconceptionTargets: [],
  transferCaseIds: ["CASE.LEAD.016"],
  delayedReview: { afterDays: 7, skillIds: ["PROC.001", "PROC.002"] },
};
