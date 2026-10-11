import type { ReadingCase } from "../../domain";

export const themeOnTrial: ReadingCase = {
  id: "CASE.JR.008",
  title: "Theme on Trial",
  genre: "literature",
  presentationStages: ["investigator"],
  targetSkills: ["LIT.003", "LIT.004", "EVID.002"],
  prerequisiteSkills: ["COMP.003", "COMP.004", "VOCAB.002"],
  briefing: "A short story repeats a pattern about honesty and trust. Separate the topic from the theme and identify the wording that creates tone.",
  sources: [
    { id: "opening", kind: "text", title: "Opening", body: "Avery hid the damaged camera and blamed the loose shelf. His friend Micah believed him and defended him to the club adviser." },
    { id: "middle", kind: "text", title: "Middle", body: "Each new excuse made Avery's stomach tighten. Micah kept making plans based on a story Avery knew was false." },
    { id: "ending", kind: "text", title: "Ending", body: "Avery finally told the truth. Micah was angry, but after Avery replaced the camera and stopped making excuses, the two slowly rebuilt their trust." },
    { id: "tone-line", kind: "text", title: "Narration Line", body: "Each new excuse made Avery's stomach tighten." },
  ],
  literatureIntelligence: {
    themes: [
      {
        id: "honesty-trust",
        topic: "honesty and trust",
        themeStatement: "Trust damaged by dishonesty can begin to recover when a person accepts responsibility and changes their behavior.",
        evidenceSourceIds: ["opening", "middle", "ending"],
        minimumEvidenceCount: 2,
      },
    ],
    tones: [
      {
        id: "guilt-tone",
        sourceId: "tone-line",
        tone: "uneasy / guilty",
        evidencePhrases: ["stomach tighten"],
        neutralRestatement: "Avery continued making excuses.",
      },
    ],
  },
  steps: [
    {
      id: "theme",
      prompt: "Which is a supported theme rather than only a topic?",
      skillId: "LIT.003",
      responseType: "single-choice",
      sourceIds: ["opening", "middle", "ending"],
      choices: [
        { id: "trust", label: "Trust damaged by dishonesty can begin to recover when a person accepts responsibility and changes behavior." },
        { id: "topic", label: "Honesty" },
        { id: "unrelated", label: "Winning matters more than friendship." },
      ],
      correctAnswerIds: ["trust"],
    },
    {
      id: "tone",
      prompt: "Which phrase most clearly creates an uneasy or guilty tone?",
      skillId: "LIT.004",
      responseType: "single-choice",
      sourceIds: ["tone-line"],
      choices: [
        { id: "tighten", label: "stomach tighten" },
        { id: "avery", label: "Avery" },
        { id: "new", label: "new" },
      ],
      correctAnswerIds: ["tighten"],
    },
    {
      id: "support",
      prompt: "Which evidence set best supports the theme?",
      skillId: "EVID.002",
      responseType: "single-choice",
      sourceIds: ["opening", "middle", "ending"],
      choices: [
        { id: "pattern", label: "The initial lie, the damage caused by repeated excuses, and the later responsibility/rebuilding" },
        { id: "name", label: "The fact that the characters have names" },
        { id: "camera", label: "Only the word camera, without the character choices" },
      ],
      correctAnswerIds: ["pattern"],
      evidenceContext: "transfer",
    },
  ],
  misconceptionTargets: [],
  transferCaseIds: ["CASE.LEAD.015"],
  delayedReview: { afterDays: 7, skillIds: ["LIT.003", "LIT.004"] },
};
