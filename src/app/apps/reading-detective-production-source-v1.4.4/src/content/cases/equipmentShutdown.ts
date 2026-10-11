import type { ReadingCase } from "../../domain";

export const equipmentShutdown: ReadingCase = {
  id: "CASE.LEAD.016",
  title: "The Equipment Shutdown",
  genre: "procedure",
  presentationStages: ["lead-investigator"],
  targetSkills: ["PROC.001", "PROC.002", "EVID.001"],
  prerequisiteSkills: ["SENT.005", "COMP.002", "SENT.004"],
  briefing: "A maintenance team skipped part of a shutdown procedure. Identify the mandatory steps, the prerequisite chain, and the exact language explaining the risk.",
  sources: [
    {
      id: "manual",
      kind: "document",
      title: "Shutdown Procedure",
      body: "Before removing the access guard: (1) stop the machine, (2) disconnect the main power supply, and (3) verify zero energy at the control panel. Do not remove the access guard until all three steps are complete. A second technician is recommended for large assemblies.",
      authority: "official",
    },
    {
      id: "incident",
      kind: "document",
      title: "Maintenance Log",
      body: "Machine stopped at 2:08 PM. Access guard removed at 2:10 PM. Main power disconnect was logged at 2:12 PM. Zero-energy verification was not recorded.",
      authority: "official",
    },
  ],
  appliedReading: {
    procedures: [
      { id: "stop", sourceId: "manual", action: "Stop the machine", strength: "required" },
      { id: "disconnect", sourceId: "manual", action: "Disconnect main power", strength: "required", prerequisiteRuleIds: ["stop"] },
      { id: "zero", sourceId: "manual", action: "Verify zero energy", strength: "required", prerequisiteRuleIds: ["disconnect"] },
      { id: "guard", sourceId: "manual", action: "Remove access guard", strength: "prohibited", prerequisiteRuleIds: ["stop", "disconnect", "zero"], consequenceIfSkipped: "The guard is removed before the procedure's energy-isolation requirements are complete." },
      { id: "second-tech", sourceId: "manual", action: "Use a second technician for large assemblies", strength: "recommended" },
    ],
  },
  steps: [
    {
      id: "required",
      prompt: "Which statement is only a recommendation rather than one of the required pre-guard steps?",
      skillId: "PROC.001",
      responseType: "single-choice",
      sourceIds: ["manual"],
      choices: [
        { id: "second", label: "Use a second technician for large assemblies" },
        { id: "disconnect", label: "Disconnect main power" },
        { id: "zero", label: "Verify zero energy" },
      ],
      correctAnswerIds: ["second"],
    },
    {
      id: "order",
      prompt: "Why was removing the guard at 2:10 PM inconsistent with the stated procedure?",
      skillId: "PROC.002",
      responseType: "single-choice",
      sourceIds: ["manual", "incident"],
      choices: [
        { id: "early", label: "The guard was removed before power disconnect and before zero-energy verification were complete." },
        { id: "second", label: "A second technician was only recommended, so the guard could be removed at any time." },
        { id: "time", label: "The procedure requires waiting exactly two minutes." },
      ],
      correctAnswerIds: ["early"],
    },
    {
      id: "evidence",
      prompt: "Show the exact sentence that controls when the guard may be removed.",
      skillId: "EVID.001",
      responseType: "highlight-sentence",
      sourceIds: ["manual"],
      evidenceBoard: {
        mode: "zoom",
        target: {
          sourceId: "manual",
          sentence: "Do not remove the access guard until all three steps are complete.",
          phrase: "until all three steps are complete",
        },
        phraseOptions: [
          "until all three steps are complete",
          "A second technician is recommended",
          "stop the machine",
        ],
      },
      evidenceContext: "transfer",
    },
  ],
  misconceptionTargets: [],
  transferCaseIds: ["CASE.LEAD.017"],
  delayedReview: { afterDays: 7, skillIds: ["PROC.001", "PROC.002"] },
};
