import type { ReadingCase } from "../../domain";

export const warrantyException: ReadingCase = {
  id: "CASE.LEAD.004",
  title: "The Warranty Exception",
  genre: "agreement",
  presentationStages: ["lead-investigator"],
  targetSkills: ["SENT.005", "EVID.003", "EVID.004"],
  prerequisiteSkills: ["LEGAL.001", "EVID.002"],
  briefing: "A customer believes every damaged product gets a replacement. Read the warranty, identify the exception, and determine what the document actually establishes.",
  sources: [
    { id: "warranty", kind: "document", title: "Limited Warranty", body: "The company will repair or replace a product with a manufacturing defect during the one-year warranty period. This warranty does not cover damage caused by misuse, except where consumer law requires otherwise.", authority: "official" },
    { id: "receipt", kind: "document", title: "Purchase Record", body: "Purchase date: March 4. Reported issue: cracked housing after the device was dropped.", authority: "official" },
    { id: "post", kind: "message", title: "Online Post", body: "A warranty means the company always owes you a new one.", authority: "personal" },
  ],
  steps: [
    {
      id: "exception",
      prompt: "Which wording creates an exception to the warranty's general exclusion?",
      skillId: "SENT.005",
      responseType: "single-choice",
      sourceIds: ["warranty"],
      documentLensId: "misuse-exception",
      choices: [
        { id: "except", label: "except where consumer law requires otherwise" },
        { id: "year", label: "during the one-year warranty period" },
      ],
      correctAnswerIds: ["except"],
      clueLabId: "CLUE.COND.UNLESS",
    },
    {
      id: "coverage-reading",
      prompt: "What does this warranty itself say about ordinary misuse?",
      skillId: "EVID.004",
      responseType: "single-choice",
      sourceIds: ["warranty"],
      documentLensId: "misuse-coverage",
      choices: [
        { id: "excluded", label: "The warranty says misuse is generally outside its coverage, subject to the stated consumer-law exception." },
        { id: "always", label: "Misuse is always covered with no exception or condition." },
      ],
      correctAnswerIds: ["excluded"],
    },
    {
      id: "evidence-board",
      prompt: "Sort the case information by what it can actually establish about this warranty claim.",
      skillId: "EVID.003",
      responseType: "classify",
      sourceIds: ["warranty", "receipt", "post"],
      evidenceBoard: {
        mode: "compare",
        minimumSources: 2,
        categories: [
          { id: "evidence", label: "Directly relevant evidence" },
          { id: "unsupported", label: "Unsupported generalization" },
          { id: "unknown", label: "Still requires more information" },
        ],
        cards: [
          { id: "drop", label: "The purchase record says the housing cracked after the device was dropped.", sourceId: "receipt" },
          { id: "misuse", label: "The warranty says damage caused by misuse is generally not covered.", sourceId: "warranty" },
          { id: "post-card", label: "An online post says every warranty guarantees a new product.", sourceId: "post" },
          { id: "law", label: "Whether the stated consumer-law exception changes the result in this situation." },
        ],
        correctPlacements: {
          drop: "evidence",
          misuse: "evidence",
          "post-card": "unsupported",
          law: "unknown",
        },
      },
      evidenceContext: "transfer",
    },
  ],
  misconceptionTargets: ["EVID.001"],
  transferCaseIds: [],
  delayedReview: { afterDays: 7, skillIds: ["SENT.005", "EVID.003", "EVID.004"] },
  documentIntelligence: {
    sections: [
      { id: "warranty-coverage", sourceId: "warranty", heading: "Coverage and Exclusions", order: 1, searchTerms: ["warranty", "manufacturing defect", "misuse", "consumer law", "repair", "replace"] },
      { id: "purchase-record", sourceId: "receipt", heading: "Purchase Record", order: 2, searchTerms: ["purchase", "issue", "dropped", "date"] },
    ],
    rules: [
      { id: "rule-defect-coverage", sourceId: "warranty", kind: "permission", clauseText: "The company will repair or replace a product with a manufacturing defect during the one-year warranty period.", party: "company", action: "repair or replace a product with a manufacturing defect", condition: "during the one-year warranty period", plainLanguage: "The warranty states a repair-or-replace remedy for manufacturing defects during the stated period." },
      { id: "rule-misuse-exclusion", sourceId: "warranty", kind: "exception", clauseText: "This warranty does not cover damage caused by misuse", condition: "damage caused by misuse", consequence: "outside this warranty coverage", plainLanguage: "The warranty states a general exclusion for damage caused by misuse." },
      { id: "rule-law-exception", sourceId: "warranty", kind: "exception", clauseText: "except where consumer law requires otherwise", condition: "where consumer law requires otherwise", plainLanguage: "The clause expressly preserves a legal exception to its general misuse exclusion.", professionalReviewRecommended: true },
    ],
    questions: [
      { id: "misuse-exception", question: "What wording changes the general misuse exclusion?", ruleIds: ["rule-misuse-exclusion", "rule-law-exception"], conclusionStrength: "conditional", plainLanguageConclusion: "The warranty generally excludes misuse but states an exception where consumer law requires otherwise.", professionalReviewRecommended: true },
      { id: "misuse-coverage", question: "What does this warranty itself say about misuse?", ruleIds: ["rule-misuse-exclusion", "rule-law-exception"], conclusionStrength: "conditional", plainLanguageConclusion: "The document generally excludes misuse while preserving the stated legal exception.", professionalReviewRecommended: true },
    ],
  },
};
