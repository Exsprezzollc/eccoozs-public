import type { ReadingCase } from "../../domain";

export const mainIdeaNotice: ReadingCase = {
  id: "CASE.ELEM.006",
  title: "What Is the Notice Really About?",
  genre: "meaning",
  presentationStages: ["young-investigator"],
  targetSkills: ["COMP.003", "COMP.004", "EVID.001"],
  prerequisiteSkills: ["COMP.001", "SENT.001"],
  briefing: "A community garden notice contains several facts. Determine the big idea and which details actually support it.",
  sources: [
    { id: "garden", kind: "notice", title: "Garden Notice", body: "Neighbors planted trees beside the playground. The trees give shade on hot days. Their roots help soak up rainwater. The new trees also make the play area cooler.", authority: "official" },
  ],
  steps: [
    {
      id: "main-idea",
      prompt: "What is the notice mostly explaining?",
      skillId: "COMP.003",
      responseType: "single-choice",
      sourceIds: ["garden"],
      choices: [
        { id: "benefits", label: "How the new trees help the playground area" },
        { id: "rain", label: "Only that rainwater exists" },
        { id: "hot", label: "Only that some days are hot" },
      ],
      correctAnswerIds: ["benefits"],
    },
    {
      id: "supporting-details",
      prompt: "Sort the clues that support the main idea from the statement that does not belong in this notice.",
      skillId: "COMP.004",
      responseType: "classify",
      sourceIds: ["garden"],
      evidenceBoard: {
        mode: "sort",
        categories: [
          { id: "evidence", label: "Supports the main idea" },
          { id: "unsupported", label: "Not supported by this notice" },
        ],
        cards: [
          { id: "shade", label: "The trees give shade", sourceId: "garden" },
          { id: "water", label: "Roots help soak up rainwater", sourceId: "garden" },
          { id: "cooler", label: "The trees make the play area cooler", sourceId: "garden" },
          { id: "fruit", label: "The trees provide free fruit every week" },
        ],
        correctPlacements: { shade: "evidence", water: "evidence", cooler: "evidence", fruit: "unsupported" },
      },
      evidenceContext: "transfer",
    },
  ],
  misconceptionTargets: [],
  transferCaseIds: [],
  delayedReview: { afterDays: 7, skillIds: ["COMP.003", "COMP.004"] },
};
