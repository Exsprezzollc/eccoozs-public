import type { ReadingCase } from "../../domain";

export const recipeMixUp: ReadingCase = {
  id: "CASE.ELEM.005",
  title: "The Recipe Mix-Up",
  genre: "procedure",
  presentationStages: ["young-investigator"],
  targetSkills: ["COMP.002", "SENT.004", "EVID.001"],
  prerequisiteSkills: ["COMP.001", "SENT.001"],
  briefing: "The snack recipe cards were shuffled. Put the steps back in order and use the written clue to explain why one step must happen first.",
  sources: [
    { id: "recipe", kind: "document", title: "Snack Recipe", body: "First, wash the apple. Next, cut the apple into slices. Then place the slices on the plate. Because the apple is washed first, dirt is removed before it is cut.", authority: "official" },
  ],
  steps: [
    {
      id: "first-step",
      prompt: "What happens first?",
      skillId: "COMP.002",
      responseType: "single-choice",
      sourceIds: ["recipe"],
      choices: [
        { id: "wash", label: "Wash the apple" },
        { id: "cut", label: "Cut the apple" },
        { id: "plate", label: "Put slices on the plate" },
      ],
      correctAnswerIds: ["wash"],
    },
    {
      id: "because",
      prompt: "What job does ‘because’ do in the last sentence?",
      skillId: "SENT.004",
      responseType: "single-choice",
      sourceIds: ["recipe"],
      choices: [
        { id: "reason", label: "It connects the result to a reason" },
        { id: "order", label: "It means the events happened at the same time" },
      ],
      correctAnswerIds: ["reason"],
    },
    {
      id: "evidence-zoom",
      prompt: "Show the exact evidence explaining why washing comes first.",
      skillId: "EVID.001",
      responseType: "highlight-phrase",
      sourceIds: ["recipe"],
      evidenceBoard: {
        mode: "zoom",
        target: {
          sourceId: "recipe",
          sentence: "Because the apple is washed first, dirt is removed before it is cut.",
          phrase: "dirt is removed before it is cut",
        },
        phraseOptions: [
          "dirt is removed before it is cut",
          "place the slices on the plate",
          "cut the apple into slices",
        ],
      },
      evidenceContext: "transfer",
    },
  ],
  misconceptionTargets: [],
  transferCaseIds: [],
  delayedReview: { afterDays: 7, skillIds: ["COMP.002", "EVID.001"] },
};
