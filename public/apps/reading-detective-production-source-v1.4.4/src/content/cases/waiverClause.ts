import type { ReadingCase } from "../../domain";

export const waiverClause: ReadingCase = {
  id: "CASE.LEAD.005",
  title: "The Waiver Clause",
  genre: "agreement",
  presentationStages: ["lead-investigator"],
  targetSkills: ["LEGAL.003", "LEGAL.004", "EVID.001"],
  prerequisiteSkills: ["LEGAL.001", "VOCAB.005", "SENT.005"],
  briefing: "A participant is reviewing a recreation agreement. Determine what the waiver language actually names, what responsibility language covers, and what the text does not establish.",
  sources: [
    {
      id: "waiver",
      kind: "document",
      title: "Participation Agreement — Waiver",
      body: "Participant waives the right to receive a paper copy of routine notices and consents to electronic delivery. This sentence does not waive emergency safety notices required by the facility's posted safety policy.",
      authority: "official",
    },
    {
      id: "responsibility",
      kind: "document",
      title: "Participation Agreement — Property",
      body: "Participant is responsible for replacement cost for facility equipment lost or damaged through the participant's intentional misuse.",
      authority: "official",
    },
    {
      id: "friend-message",
      kind: "message",
      title: "Friend Message",
      body: "If you sign any waiver, you give up every right you have.",
      authority: "personal",
    },
  ],
  steps: [
    {
      id: "waived-right",
      prompt: "What does this waiver sentence specifically say the participant gives up?",
      skillId: "LEGAL.003",
      responseType: "single-choice",
      sourceIds: ["waiver"],
      documentLensId: "waiver-scope",
      choices: [
        { id: "paper", label: "The right to receive a paper copy of routine notices" },
        { id: "every", label: "Every possible right in every situation" },
        { id: "safety", label: "All emergency safety notices" },
      ],
      correctAnswerIds: ["paper"],
      evidenceContext: "independent",
    },
    {
      id: "responsibility-scope",
      prompt: "Which responsibility does the property clause actually assign?",
      skillId: "LEGAL.004",
      responseType: "single-choice",
      sourceIds: ["responsibility"],
      documentLensId: "property-responsibility",
      choices: [
        { id: "intentional", label: "Replacement cost for facility equipment lost or damaged through the participant's intentional misuse" },
        { id: "everything", label: "Every loss or injury that could ever occur" },
        { id: "none", label: "No responsibility is stated" },
      ],
      correctAnswerIds: ["intentional"],
    },
    {
      id: "waiver-evidence-zoom",
      prompt: "Show the exact phrase that names the right being waived.",
      skillId: "EVID.001",
      responseType: "highlight-phrase",
      sourceIds: ["waiver"],
      evidenceBoard: {
        mode: "zoom",
        target: {
          sourceId: "waiver",
          sentence: "Participant waives the right to receive a paper copy of routine notices and consents to electronic delivery.",
          phrase: "right to receive a paper copy of routine notices",
        },
        phraseOptions: [
          "right to receive a paper copy of routine notices",
          "consents to electronic delivery",
          "emergency safety notices",
        ],
      },
      evidenceContext: "transfer",
    },
  ],
  misconceptionTargets: ["EVID.001"],
  transferCaseIds: [],
  delayedReview: { afterDays: 7, skillIds: ["LEGAL.003", "LEGAL.004", "EVID.001"] },
  documentIntelligence: {
    sections: [
      { id: "sec-waiver", sourceId: "waiver", heading: "Waiver and Notice Delivery", order: 1, searchTerms: ["waiver", "waives", "paper", "notice", "electronic", "safety"] },
      { id: "sec-responsibility", sourceId: "responsibility", heading: "Property Responsibility", order: 2, searchTerms: ["responsible", "replacement", "equipment", "misuse", "damage"] },
    ],
    rules: [
      { id: "rule-paper-waiver", sourceId: "waiver", kind: "waiver", clauseText: "Participant waives the right to receive a paper copy of routine notices", party: "participant", action: "waive the right to paper routine notices", plainLanguage: "The waiver is limited by its wording to the named right to paper copies of routine notices.", professionalReviewRecommended: true },
      { id: "rule-electronic-consent", sourceId: "waiver", kind: "permission", clauseText: "consents to electronic delivery", party: "participant", action: "consent to electronic delivery", plainLanguage: "The same sentence states the participant's consent to electronic delivery." },
      { id: "rule-safety-exception", sourceId: "waiver", kind: "exception", clauseText: "This sentence does not waive emergency safety notices required by the facility's posted safety policy.", condition: "emergency safety notices required by posted policy", plainLanguage: "The clause expressly states that the paper-notice waiver does not cover the named emergency safety notices.", professionalReviewRecommended: true },
      { id: "rule-property-responsibility", sourceId: "responsibility", kind: "liability", clauseText: "Participant is responsible for replacement cost for facility equipment lost or damaged through the participant's intentional misuse.", party: "participant", action: "pay replacement cost", condition: "equipment lost or damaged through participant's intentional misuse", plainLanguage: "The responsibility language is tied to replacement cost for equipment and the stated intentional-misuse condition.", professionalReviewRecommended: true },
    ],
    questions: [
      { id: "waiver-scope", question: "What is the scope of the stated waiver?", ruleIds: ["rule-paper-waiver", "rule-safety-exception"], conclusionStrength: "conditional", plainLanguageConclusion: "The sentence waives paper copies of routine notices while expressly preserving the named emergency safety notices.", professionalReviewRecommended: true },
      { id: "property-responsibility", question: "What responsibility does the property clause assign?", ruleIds: ["rule-property-responsibility"], conclusionStrength: "directly-stated", plainLanguageConclusion: "The participant is assigned replacement cost for facility equipment lost or damaged through the stated intentional misuse.", professionalReviewRecommended: true },
    ],
  },
};
