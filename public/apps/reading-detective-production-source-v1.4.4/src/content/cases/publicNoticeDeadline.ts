import type { ReadingCase } from "../../domain";

export const publicNoticeDeadline: ReadingCase = {
  id: "CASE.LEAD.018",
  title: "The Public Notice Deadline",
  genre: "procedure",
  presentationStages: ["lead-investigator"],
  targetSkills: ["CIVIC.001", "SENT.005", "EVID.001"],
  prerequisiteSkills: ["COMP.001", "EVID.001"],
  briefing: "A public notice has a headline, an affected group, a filing deadline, and an exception. Determine who must act, when, and what the notice does not say.",
  sources: [
    {
      id: "notice",
      kind: "notice",
      title: "City Clerk Public Notice",
      body: "Parking Permit Appeals — Residents seeking review of a denied 2026 residential parking permit must submit Appeal Form P-4 to the City Clerk by 5:00 PM on September 18. Appeals received after the deadline will be considered only if an exception authorized by the parking ordinance applies. This notice does not itself determine whether an applicant qualifies for an exception.",
      authority: "official",
    },
  ],
  appliedReading: {
    civicNotices: [
      {
        id: "parking-appeal",
        sourceId: "notice",
        issuer: "City Clerk",
        action: "Submit Appeal Form P-4",
        deadline: "5:00 PM on September 18",
        condition: "Applies to residents seeking review of a denied 2026 residential parking permit.",
        consequence: "Late appeals are considered only if an ordinance-authorized exception applies.",
      },
    ],
  },
  steps: [
    {
      id: "who-what-when",
      prompt: "Which reading correctly combines the affected group, action, and deadline?",
      skillId: "CIVIC.001",
      responseType: "single-choice",
      sourceIds: ["notice"],
      choices: [
        { id: "precise", label: "Residents appealing a denied 2026 residential parking permit must submit Form P-4 to the City Clerk by 5:00 PM September 18." },
        { id: "everyone", label: "Every resident must submit Form P-4 by September 18." },
        { id: "clerk", label: "The City Clerk must file an appeal for every resident." },
      ],
      correctAnswerIds: ["precise"],
    },
    {
      id: "exception",
      prompt: "What does the late-filing sentence actually say?",
      skillId: "SENT.005",
      responseType: "single-choice",
      sourceIds: ["notice"],
      choices: [
        { id: "conditional", label: "A late appeal may be considered only if an ordinance-authorized exception applies." },
        { id: "guaranteed", label: "Every late appeal is automatically accepted." },
        { id: "never", label: "No late appeal can ever be considered." },
      ],
      correctAnswerIds: ["conditional"],
    },
    {
      id: "evidence-limit",
      prompt: "Which phrase shows that the notice does NOT decide whether a person qualifies for an exception?",
      skillId: "EVID.001",
      responseType: "highlight-phrase",
      sourceIds: ["notice"],
      evidenceBoard: {
        mode: "zoom",
        target: {
          sourceId: "notice",
          sentence: "This notice does not itself determine whether an applicant qualifies for an exception.",
          phrase: "does not itself determine",
        },
        phraseOptions: [
          "does not itself determine",
          "Parking Permit Appeals",
          "submit Appeal Form P-4",
        ],
      },
      evidenceContext: "transfer",
    },
  ],
  misconceptionTargets: [],
  transferCaseIds: [],
  delayedReview: { afterDays: 10, skillIds: ["CIVIC.001", "SENT.005"] },
};
