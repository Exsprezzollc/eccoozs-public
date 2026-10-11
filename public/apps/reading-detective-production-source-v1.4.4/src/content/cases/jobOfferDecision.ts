import type { ReadingCase } from "../../domain";

export const jobOfferDecision: ReadingCase = {
  id: "CASE.LEAD.012",
  title: "Which Job Offer?",
  genre: "decision",
  presentationStages: ["lead-investigator"],
  targetSkills: ["DECISION.001", "DECISION.002", "DECISION.004"],
  prerequisiteSkills: ["EVID.003", "SOURCE.005", "SENT.005"],
  briefing: "Two offers have different strengths. There is no universal winner: defend a choice using the stated priorities, documents, and tradeoffs.",
  sources: [
    { id: "offer-a", kind: "document", title: "Offer A", body: "$20/hour. 20 guaranteed hours/week. 15-mile commute. No tuition benefit. Evening availability required." },
    { id: "offer-b", kind: "document", title: "Offer B", body: "$18/hour. 30 guaranteed hours/week. 5-mile commute. Tuition assistance up to $2,000/year after 90 days. Weekend availability required." },
    { id: "priority", kind: "message", title: "Learner Priorities", body: "I need at least 25 work hours each week. I am taking classes and tuition support matters. I can work weekends." },
  ],
  steps: [
    { id: "criteria", prompt: "Which criteria matter most for the stated learner?", skillId: "DECISION.001", responseType: "single-choice", sourceIds: ["offer-a", "offer-b", "priority"], choices: [
      { id: "fit", label: "Guaranteed weekly hours, tuition-assistance conditions, schedule fit, commute, and pay." },
      { id: "logo", label: "Company logo and document color." },
      { id: "hourly-only", label: "Hourly wage only; all other stated priorities are irrelevant." },
    ], correctAnswerIds: ["fit"] },
    { id: "decision", prompt: "Build a defensible decision from the case packet.", skillId: "DECISION.002", responseType: "decision-workbench", sourceIds: ["offer-a", "offer-b", "priority"], decisionId: "job-choice" },
    { id: "alternate", prompt: "Could a different learner reasonably choose Offer A?", skillId: "DECISION.004", responseType: "single-choice", sourceIds: ["offer-a", "offer-b"], choices: [
      { id: "yes", label: "Yes. A learner who prioritizes higher hourly wage and does not need 25+ hours or tuition assistance could defend Offer A with the correct evidence." },
      { id: "no", label: "No. Offer B is objectively best for every person." },
    ], correctAnswerIds: ["yes"], evidenceContext: "transfer" },
  ], misconceptionTargets: [], transferCaseIds: ["CASE.LEAD.013"], delayedReview: { afterDays: 7, skillIds: ["DECISION.001", "DECISION.002", "DECISION.004"] },
  researchMediaDecision: { decisions: [{
    id: "job-choice", question: "Which offer best fits the priorities in this case?",
    criteria: [
      { id: "hours", label: "At least 25 weekly hours" },
      { id: "tuition", label: "Tuition support" },
      { id: "schedule", label: "Schedule fit" },
      { id: "commute", label: "Commute" },
      { id: "pay", label: "Pay" },
    ],
    options: [
      { id: "a", label: "Offer A", evidenceSourceIds: ["offer-a", "priority"], criterionNotes: { pay: "$20/hour", hours: "20 guaranteed hours — below stated 25-hour minimum", tuition: "none", commute: "15 miles" } },
      { id: "b", label: "Offer B", evidenceSourceIds: ["offer-b", "priority"], criterionNotes: { pay: "$18/hour", hours: "30 guaranteed hours", tuition: "up to $2,000 after 90 days", commute: "5 miles", schedule: "weekends required; learner can work weekends" } },
    ],
    acceptableDecisions: [
      { optionId: "b", requiredEvidenceSourceIds: ["offer-b", "priority"], requiredCriterionIds: ["hours", "tuition", "schedule"], requiredTradeoffAcknowledgements: ["Lower hourly wage than Offer A"], rationale: "Offer B is defensible for this learner because it satisfies the stated 25-hour minimum, offers conditional tuition assistance, and its weekend requirement fits the learner's availability; the lower hourly wage remains a tradeoff." },
    ],
  }] },
};
