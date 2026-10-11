import type { ReadingCase } from "../../domain";

export const apartmentClause: ReadingCase = {
  id: "CASE.LEAD.003",
  title: "The Apartment Clause",
  genre: "agreement",
  presentationStages: ["lead-investigator"],
  targetSkills: ["LEGAL.001", "LEGAL.002", "LEGAL.008"],
  prerequisiteSkills: ["SENT.005", "EVID.001", "VOCAB.002"],
  briefing: "A renter is trying to understand a maintenance section of a lease. Identify who must act, what management may do, and how the lease defines an important term.",
  sources: [
    { id: "definitions", kind: "document", title: "Lease — Definitions", body: "For this lease, ‘written notice’ means a message submitted through the resident portal or a letter delivered to the management office.", authority: "official" },
    { id: "maintenance", kind: "document", title: "Lease — Maintenance", body: "The tenant must give written notice of a maintenance problem. Management may enter the unit during reasonable hours to inspect the reported condition after notice is received.", authority: "official" },
    { id: "text", kind: "message", title: "Text Message", body: "I texted the building manager's personal phone, so that definitely counts as written notice.", authority: "personal" },
  ],
  steps: [
    {
      id: "obligation",
      prompt: "Who has the stated obligation to give written notice of a maintenance problem?",
      skillId: "LEGAL.001",
      responseType: "single-choice",
      sourceIds: ["maintenance"],
      documentLensId: "maintenance-obligation",
      choices: [
        { id: "tenant", label: "The tenant" },
        { id: "management", label: "Management", misconceptionId: "LEGAL.004" },
      ],
      correctAnswerIds: ["tenant"],
      clueLabId: "CLUE.LEGAL.WHO_MUST",
    },
    {
      id: "permission",
      prompt: "What does the lease say management may do after notice is received?",
      skillId: "LEGAL.002",
      responseType: "single-choice",
      sourceIds: ["maintenance"],
      documentLensId: "management-permission",
      choices: [
        { id: "inspect", label: "Enter during reasonable hours to inspect the reported condition" },
        { id: "must-enter", label: "Management must enter immediately at any hour" },
      ],
      correctAnswerIds: ["inspect"],
    },
    {
      id: "defined-term",
      prompt: "Under this lease's definition, does a text to the manager's personal phone automatically satisfy ‘written notice’?",
      skillId: "LEGAL.008",
      responseType: "single-choice",
      sourceIds: ["definitions", "text"],
      documentLensId: "written-notice-definition",
      choices: [
        { id: "no", label: "No. The lease definition lists the resident portal or a letter to the management office." },
        { id: "yes", label: "Yes. Any written message has to count." },
      ],
      correctAnswerIds: ["no"],
      evidenceContext: "transfer",
    },
    {
      id: "legal-evidence-zoom",
      prompt: "Show the exact phrase that tells you what the tenant is required to do.",
      skillId: "EVID.001",
      responseType: "highlight-phrase",
      sourceIds: ["maintenance"],
      evidenceBoard: {
        mode: "zoom",
        target: {
          sourceId: "maintenance",
          sentence: "The tenant must give written notice of a maintenance problem.",
          phrase: "must give written notice",
        },
        phraseOptions: [
          "must give written notice",
          "may enter the unit",
          "during reasonable hours",
        ],
      },
    },
  ],
  misconceptionTargets: ["LEGAL.004"],
  transferCaseIds: [],
  delayedReview: { afterDays: 7, skillIds: ["LEGAL.001", "LEGAL.002", "LEGAL.008"] },
  documentIntelligence: {
    sections: [
      { id: "lease-definitions", sourceId: "definitions", heading: "Definitions", order: 1, searchTerms: ["definition", "written notice", "resident portal", "letter"] },
      { id: "lease-maintenance", sourceId: "maintenance", heading: "Maintenance", order: 2, searchTerms: ["maintenance", "notice", "inspect", "enter", "reasonable hours"] },
    ],
    rules: [
      { id: "rule-written-notice", sourceId: "definitions", kind: "definition", clauseText: "‘written notice’ means a message submitted through the resident portal or a letter delivered to the management office.", term: "written notice", definition: "a message submitted through the resident portal or a letter delivered to the management office", plainLanguage: "For this lease, the defined term uses the two listed delivery methods." },
      { id: "rule-tenant-notice", sourceId: "maintenance", kind: "obligation", clauseText: "The tenant must give written notice of a maintenance problem.", party: "tenant", action: "give written notice of a maintenance problem", plainLanguage: "The tenant is assigned the notice obligation." },
      { id: "rule-management-entry", sourceId: "maintenance", kind: "permission", clauseText: "Management may enter the unit during reasonable hours to inspect the reported condition after notice is received.", party: "management", action: "enter the unit to inspect the reported condition", condition: "after notice is received", plainLanguage: "The clause gives management conditional permission to enter for inspection during reasonable hours." },
    ],
    questions: [
      { id: "maintenance-obligation", question: "Who must give maintenance notice?", ruleIds: ["rule-tenant-notice"], conclusionStrength: "directly-stated", plainLanguageConclusion: "The tenant must give the stated written notice." },
      { id: "management-permission", question: "What may management do after notice?", ruleIds: ["rule-management-entry"], conclusionStrength: "conditional", plainLanguageConclusion: "After notice is received, management may enter during reasonable hours to inspect the reported condition." },
      { id: "written-notice-definition", question: "What counts as written notice under this lease?", ruleIds: ["rule-written-notice"], conclusionStrength: "directly-stated", plainLanguageConclusion: "The lease defines written notice as portal submission or a letter delivered to the management office." },
    ],
  },
};
