import type { ReadingCase } from "../../domain";

export const storyBehindSmile: ReadingCase = {
  id: "CASE.JR.007",
  title: "The Story Behind the Smile",
  genre: "literature",
  presentationStages: ["investigator"],
  targetSkills: ["LIT.001", "LIT.002", "EVID.001"],
  prerequisiteSkills: ["COMP.005", "SOURCE.004"],
  briefing: "A narrator describes a tense school showcase. Determine what the narrator can actually know and how strongly the character's behavior supports a motive.",
  sources: [
    {
      id: "scene-one",
      kind: "text",
      title: "Scene — Before the Showcase",
      body: "I sat beside Simone while the judges read the finalists. She kept folding the corner of her program and checking the doorway. She told me she was fine, but she did not look at the stage.",
    },
    {
      id: "scene-two",
      kind: "text",
      title: "Scene — The Arrival",
      body: "When Simone's older brother stepped through the doorway, her shoulders dropped and she smiled. She finally turned toward the stage.",
    },
    {
      id: "narrator-limit",
      kind: "text",
      title: "Narrator Note",
      body: "I could see what Simone did, but she never told me exactly what she was thinking.",
    },
  ],
  literatureIntelligence: {
    motives: [
      {
        id: "simone-relief",
        character: "Simone",
        claim: "Simone was anxious about whether her brother would arrive and felt relief when he did.",
        evidenceSourceIds: ["scene-one", "scene-two"],
        strength: "strongly-supported",
        alternatePlausibleClaims: ["She may also have been nervous about the showcase itself."],
      },
    ],
    narrators: [
      {
        id: "friend-narrator",
        narrator: "Simone's classmate",
        perspective: "first-person-limited",
        knowledgeBoundary: "The narrator can report observed behavior and their own interpretation but cannot directly know Simone's private thoughts.",
        caution: "limited-knowledge",
        explanation: "The first-person narrator has direct access to what they saw, but Simone's motive remains an evidence-supported inference rather than a directly known fact.",
      },
    ],
  },
  steps: [
    {
      id: "motive",
      prompt: "What is the strongest evidence-based reading of Simone's behavior?",
      skillId: "LIT.001",
      responseType: "single-choice",
      sourceIds: ["scene-one", "scene-two"],
      choices: [
        { id: "relief", label: "She may have been anxious about her brother arriving and then relieved; the behavior strongly supports this, but it is still an inference." },
        { id: "fact", label: "The narrator directly knows that Simone was afraid her brother would never come." },
        { id: "none", label: "Behavior can never support a motive inference." },
      ],
      correctAnswerIds: ["relief"],
    },
    {
      id: "pov",
      prompt: "What does the first-person narrator NOT know directly?",
      skillId: "LIT.002",
      responseType: "single-choice",
      sourceIds: ["narrator-limit"],
      choices: [
        { id: "thought", label: "Simone's exact private thoughts" },
        { id: "behavior", label: "That Simone checked the doorway" },
        { id: "arrival", label: "That her brother entered" },
      ],
      correctAnswerIds: ["thought"],
    },
    {
      id: "evidence",
      prompt: "Show the exact change that most strongly supports relief after the arrival.",
      skillId: "EVID.001",
      responseType: "highlight-phrase",
      sourceIds: ["scene-two"],
      evidenceBoard: {
        mode: "zoom",
        target: {
          sourceId: "scene-two",
          sentence: "When Simone's older brother stepped through the doorway, her shoulders dropped and she smiled.",
          phrase: "her shoulders dropped and she smiled",
        },
        phraseOptions: [
          "her shoulders dropped and she smiled",
          "stepped through the doorway",
          "turned toward the stage",
        ],
      },
      evidenceContext: "transfer",
    },
  ],
  misconceptionTargets: [],
  transferCaseIds: ["CASE.JR.008"],
  delayedReview: { afterDays: 7, skillIds: ["LIT.001", "LIT.002"] },
};
