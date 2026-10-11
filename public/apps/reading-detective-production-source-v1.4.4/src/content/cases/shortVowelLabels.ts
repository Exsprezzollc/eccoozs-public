import type { ReadingCase } from "../../domain";

export const shortVowelLabels: ReadingCase = {
  id: "CASE.ELEM.003",
  title: "The Short-Vowel Labels",
  genre: "word",
  presentationStages: ["young-investigator"],
  targetSkills: ["CODE.003"],
  prerequisiteSkills: ["CODE.002"],
  briefing: "Three supply labels look almost alike. Read every sound so the correct box goes to the reading table.",
  sources: [
    { id: "label-map", kind: "notice", title: "Box A", body: "MAP", authority: "official" },
    { id: "label-mop", kind: "notice", title: "Box B", body: "MOP", authority: "official" },
    { id: "label-mat", kind: "notice", title: "Box C", body: "MAT", authority: "official" },
  ],
  steps: [
    {
      id: "short-a",
      prompt: "Which label says ‘map’? Read through the middle sound before choosing.",
      skillId: "CODE.003",
      responseType: "single-choice",
      sourceIds: ["label-map", "label-mop", "label-mat"],
      choices: [
        { id: "map", label: "MAP" },
        { id: "mop", label: "MOP", misconceptionId: "CODE.001" },
        { id: "mat", label: "MAT", misconceptionId: "CODE.001" },
      ],
      correctAnswerIds: ["map"],
    },
    {
      id: "short-transfer",
      prompt: "New clue: which word says ‘sit’ rather than ‘sat’ or ‘sip’?",
      skillId: "CODE.003",
      responseType: "single-choice",
      sourceIds: [],
      choices: [
        { id: "sit", label: "SIT" },
        { id: "sat", label: "SAT" },
        { id: "sip", label: "SIP" },
      ],
      correctAnswerIds: ["sit"],
      evidenceContext: "transfer",
    },
  ],
  misconceptionTargets: ["CODE.001"],
  transferCaseIds: [],
  delayedReview: { afterDays: 7, skillIds: ["CODE.003"] },
};
