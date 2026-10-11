import type { ReadingCase } from "../../domain";

export const unreliableAccount: ReadingCase = {
  id: "CASE.LEAD.015",
  title: "The Unreliable Account",
  genre: "literature",
  presentationStages: ["lead-investigator"],
  targetSkills: ["LIT.005", "LIT.006", "EVID.003"],
  prerequisiteSkills: ["LIT.002", "LIT.003", "SOURCE.003", "EVID.004"],
  briefing: "A first-person narrator sounds certain, but later evidence complicates the account. Calibrate what can still be trusted and compare two defensible interpretations of a recurring image.",
  sources: [
    {
      id: "narration",
      kind: "text",
      title: "Narrator's Account",
      body: "I was certain nobody entered the workshop after I left at eight. The blue light over the side door was dark, just as it always was when the building was empty.",
    },
    {
      id: "record",
      kind: "document",
      title: "Access Record",
      body: "8:14 PM — authorized badge entry recorded at Side Door B.",
      authority: "official",
    },
    {
      id: "later-reflection",
      kind: "text",
      title: "Later Reflection",
      body: "Years later, I still picture that blue light whenever I remember how quickly I mistook confidence for certainty.",
    },
  ],
  literatureIntelligence: {
    narrators: [
      {
        id: "workshop-narrator",
        narrator: "First-person narrator",
        perspective: "first-person-limited",
        knowledgeBoundary: "The narrator knows what they observed before leaving but cannot directly observe what happened after departure.",
        caution: "contradicted-account",
        contradictionSourceIds: ["record"],
        explanation: "The access record contradicts the narrator's confident claim that nobody entered. That weakens this claim without proving that every observation in the account is false.",
      },
    ],
    symbolism: [
      {
        id: "blue-light",
        symbolOrPattern: "the recurring blue light",
        interpretation: "The blue light can represent the narrator's earlier confidence and later awareness that appearances can be mistaken for certainty.",
        evidenceSourceIds: ["narration", "later-reflection"],
        allowAlternates: true,
      },
    ],
  },
  steps: [
    {
      id: "narrator",
      prompt: "What is the most precise way to treat the narrator after seeing the access record?",
      skillId: "LIT.005",
      responseType: "single-choice",
      sourceIds: ["narration", "record"],
      choices: [
        { id: "calibrate", label: "Reduce confidence in the claim that nobody entered, while evaluating the narrator's other observations separately." },
        { id: "all-false", label: "Treat every sentence in the narration as false." },
        { id: "ignore", label: "Ignore the access record because the narrator sounds certain." },
      ],
      correctAnswerIds: ["calibrate"],
    },
    {
      id: "symbol",
      prompt: "Which interpretation of the blue light is defensible from the supplied text?",
      skillId: "LIT.006",
      responseType: "single-choice",
      sourceIds: ["narration", "later-reflection"],
      choices: [
        { id: "certainty", label: "It may represent the narrator's habit of treating appearances as certainty, especially because the later reflection connects the image to that mistake." },
        { id: "magic", label: "The light definitely has supernatural powers." },
        { id: "anything", label: "Any interpretation is equally valid even without textual support." },
      ],
      correctAnswerIds: ["certainty"],
    },
    {
      id: "evidence-strength",
      prompt: "Which source is strongest for deciding whether someone entered after 8:00 PM?",
      skillId: "EVID.003",
      responseType: "single-choice",
      sourceIds: ["narration", "record"],
      choices: [
        { id: "record", label: "The timestamped access record" },
        { id: "memory", label: "The narrator's belief before leaving" },
        { id: "equal", label: "They are equally direct for the post-8:00 PM entry question" },
      ],
      correctAnswerIds: ["record"],
      evidenceContext: "transfer",
    },
  ],
  misconceptionTargets: [],
  transferCaseIds: [],
  delayedReview: { afterDays: 9, skillIds: ["LIT.005", "LIT.006"] },
};
