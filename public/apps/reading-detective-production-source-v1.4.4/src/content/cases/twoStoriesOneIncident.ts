import type { ReadingCase } from "../../domain";

export const twoStoriesOneIncident: ReadingCase = {
  id: "CASE.JR.005",
  title: "Two Stories, One Incident",
  genre: "source",
  presentationStages: ["investigator"],
  targetSkills: ["SOURCE.003", "SOURCE.004", "SOURCE.005", "EVID.002"],
  prerequisiteSkills: ["EVID.001", "EVID.004", "SOURCE.001", "SOURCE.002"],
  briefing:
    "Two students and a staff member describe the same hallway incident differently. Separate what each person could observe from what remains disputed.",
  sources: [
    {
      id: "asha",
      kind: "text",
      title: "Asha's Statement",
      body: "Darius blocked the doorway and grabbed my backpack strap. I pulled the bag back. I did not touch his backpack.",
      authority: "personal",
      intelligence: {
        creator: "Asha",
        purpose: "document",
        proximity: "firsthand",
        independenceKey: "asha-account",
        interestNote: "Asha was directly involved in the incident and has firsthand access to some events as well as a personal stake in how the event is understood.",
      },
    },
    {
      id: "darius",
      kind: "text",
      title: "Darius's Statement",
      body: "Asha grabbed my backpack first. I held onto her strap after she pulled mine. I did not block the doorway.",
      authority: "personal",
      intelligence: {
        creator: "Darius",
        purpose: "document",
        proximity: "firsthand",
        independenceKey: "darius-account",
        interestNote: "Darius was directly involved and has firsthand access to some events as well as a personal stake in how the event is understood.",
      },
    },
    {
      id: "staff",
      kind: "text",
      title: "Staff Statement",
      body: "I reached the hallway at about 3:44 PM. I saw both students holding backpack straps. I did not see how the contact began.",
      authority: "reported",
      intelligence: {
        creator: "After-School Staff Member",
        purpose: "document",
        proximity: "firsthand",
        independenceKey: "staff-account",
        contextNote: "The staff member observed only the later portion of the incident.",
      },
    },
    {
      id: "door-log",
      kind: "document",
      title: "Doorway Sensor Log",
      body: "3:42 PM — doorway occupied. 3:44 PM — staff badge registered at hallway entrance.",
      authority: "official",
      intelligence: {
        creator: "Building Access System",
        purpose: "document",
        proximity: "official-record",
        independenceKey: "building-log",
        contextNote: "The log records times, not who touched a backpack first.",
      },
    },
  ],
  sourceIntelligence: {
    lenses: [
      {
        id: "who-started",
        question: "Who touched a backpack first?",
        assessments: [
          { sourceId: "asha", utility: "direct", rationale: "Asha directly states her account of how the contact began, but she is one involved participant." },
          { sourceId: "darius", utility: "direct", rationale: "Darius directly states a conflicting account of how the contact began, but he is also one involved participant." },
          { sourceId: "staff", utility: "limited", rationale: "The staff member arrived after the contact had already begun and explicitly says they did not see the beginning." },
          { sourceId: "door-log", utility: "not-relevant", rationale: "The log helps with timing but does not record who touched a backpack first." },
        ],
      },
      {
        id: "staff-arrival",
        question: "When did staff arrive at the hallway entrance?",
        assessments: [
          { sourceId: "asha", utility: "context", rationale: "Asha's statement describes the incident but gives no precise staff-arrival time." },
          { sourceId: "darius", utility: "context", rationale: "Darius's statement describes the incident but gives no precise staff-arrival time." },
          { sourceId: "staff", utility: "supporting", rationale: "The staff member estimates arriving at about 3:44 PM." },
          { sourceId: "door-log", utility: "direct", rationale: "The system record timestamps the staff badge at the hallway entrance at 3:44 PM." },
        ],
      },
    ],
    claims: [
      {
        id: "first-touch-asha",
        claim: "Asha touched Darius's backpack first.",
        positions: [
          { sourceId: "darius", stance: "supports", excerpt: "Asha grabbed my backpack first." },
          { sourceId: "asha", stance: "contradicts", excerpt: "I did not touch his backpack." },
          { sourceId: "staff", stance: "uncertain", excerpt: "I did not see how the contact began." },
          { sourceId: "door-log", stance: "mentions" },
        ],
      },
      {
        id: "staff-at-344",
        claim: "Staff arrived at the hallway entrance at about 3:44 PM.",
        positions: [
          { sourceId: "staff", stance: "supports", excerpt: "I reached the hallway at about 3:44 PM." },
          { sourceId: "door-log", stance: "supports", excerpt: "3:44 PM — staff badge registered at hallway entrance." },
        ],
      },
    ],
  },
  steps: [
    {
      id: "perspective",
      prompt: "What is the strongest way to treat Asha's and Darius's different accounts?",
      skillId: "SOURCE.004",
      responseType: "single-choice",
      sourceIds: ["asha", "darius", "staff"],
      choices: [
        { id: "compare", label: "Treat both as involved firsthand accounts, compare their specific claims, and use other evidence where possible." },
        { id: "both-false", label: "Because they disagree, both statements must be false." },
        { id: "pick", label: "Choose whichever statement sounds more confident." },
      ],
      correctAnswerIds: ["compare"],
    },
    {
      id: "source-usefulness",
      prompt: "For the question ‘Who touched a backpack first?’, which source is least useful?",
      skillId: "SOURCE.005",
      responseType: "single-choice",
      sourceIds: ["asha", "darius", "staff", "door-log"],
      sourceLensId: "who-started",
      choices: [
        { id: "log", label: "Doorway Sensor Log" },
        { id: "asha", label: "Asha's Statement" },
        { id: "darius", label: "Darius's Statement" },
        { id: "staff", label: "Staff Statement" },
      ],
      correctAnswerIds: ["log"],
    },
    {
      id: "corroboration",
      prompt: "What does the evidence support about staff arrival time?",
      skillId: "SOURCE.003",
      responseType: "single-choice",
      sourceIds: ["staff", "door-log"],
      sourceLensId: "staff-arrival",
      sourceClaimId: "staff-at-344",
      choices: [
        { id: "two-origins", label: "Two independent sources support an arrival time of about 3:44 PM." },
        { id: "one", label: "Only one source mentions staff arrival." },
        { id: "first-touch", label: "The arrival time proves who touched a backpack first." },
      ],
      correctAnswerIds: ["two-origins"],
      evidenceContext: "transfer",
    },
    {
      id: "confirmed-disputed",
      prompt: "Sort the case findings into what is confirmed, disputed, or still unknown.",
      skillId: "EVID.002",
      responseType: "classify",
      sourceIds: ["asha", "darius", "staff", "door-log"],
      evidenceBoard: {
        mode: "compare",
        minimumSources: 2,
        categories: [
          { id: "confirmed", label: "Confirmed / independently supported" },
          { id: "contradiction", label: "Disputed" },
          { id: "unknown", label: "Still unknown" },
        ],
        cards: [
          { id: "arrival", label: "Staff reached the hallway at about 3:44 PM.", sourceId: "door-log" },
          { id: "first-touch", label: "Asha touched a backpack first.", sourceId: "darius" },
          { id: "before", label: "What happened before either student's account begins.", sourceId: "staff" },
        ],
        correctPlacements: {
          arrival: "confirmed",
          "first-touch": "contradiction",
          before: "unknown",
        },
      },
    },
  ],
  misconceptionTargets: [],
  transferCaseIds: ["CASE.JR.006"],
  delayedReview: { afterDays: 7, skillIds: ["SOURCE.003", "SOURCE.004", "SOURCE.005"] },
};
