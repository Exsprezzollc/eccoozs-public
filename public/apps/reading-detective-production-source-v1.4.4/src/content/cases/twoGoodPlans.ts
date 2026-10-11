import type { ReadingCase } from "../../domain";

export const twoGoodPlans: ReadingCase = {
  id: "CASE.LEAD.014",
  title: "Two Defensible Plans",
  genre: "decision",
  presentationStages: ["lead-investigator"],
  targetSkills: ["DECISION.002", "DECISION.004"],
  prerequisiteSkills: ["DECISION.001", "EVID.003"],
  briefing: "Two backup plans satisfy the basic requirement but trade cost against recovery speed. Defend either choice by naming the priority, evidence, and tradeoff.",
  sources: [
    { id: "plan-a", kind: "document", title: "Plan A Specification", body: "Annual cost: $12,000. Recovery target: 6 hours. Storage requirement: met." },
    { id: "plan-b", kind: "document", title: "Plan B Specification", body: "Annual cost: $18,000. Recovery target: 2 hours. Storage requirement: met." },
    { id: "brief", kind: "document", title: "Decision Brief", body: "Both plans meet the required storage capacity. The team must choose whether lower annual cost or faster recovery is the higher priority." },
  ],
  steps: [
    { id: "decision", prompt: "Choose and defend one plan. Reading Detective will grade the evidence chain, not a preferred option.", skillId: "DECISION.004", responseType: "decision-workbench", sourceIds: ["plan-a", "plan-b", "brief"], decisionId: "backup-choice", evidenceContext: "transfer" },
  ],
  misconceptionTargets: [], transferCaseIds: [], delayedReview: { afterDays: 7, skillIds: ["DECISION.004"] },
  researchMediaDecision: { decisions: [{
    id: "backup-choice",
    question: "Which plan is preferable under the priority you choose?",
    criteria: [
      { id: "cost", label: "Lower annual cost", description: "Prioritize minimizing recurring cost." },
      { id: "recovery", label: "Faster recovery", description: "Prioritize minimizing service-restoration time." },
      { id: "storage", label: "Required storage", description: "Both plans already meet this requirement." },
    ],
    options: [
      { id: "a", label: "Plan A", evidenceSourceIds: ["plan-a", "plan-b", "brief"], criterionNotes: { cost: "$12,000/year", recovery: "6 hours", storage: "requirement met" } },
      { id: "b", label: "Plan B", evidenceSourceIds: ["plan-a", "plan-b", "brief"], criterionNotes: { cost: "$18,000/year", recovery: "2 hours", storage: "requirement met" } },
    ],
    acceptableDecisions: [
      { optionId: "a", requiredEvidenceSourceIds: ["plan-a", "plan-b", "brief"], requiredCriterionIds: ["cost"], requiredTradeoffAcknowledgements: ["Longer recovery time than Plan B"], rationale: "Plan A is defensible when lower annual cost is the stated priority and the reader acknowledges its slower recovery." },
      { optionId: "b", requiredEvidenceSourceIds: ["plan-a", "plan-b", "brief"], requiredCriterionIds: ["recovery"], requiredTradeoffAcknowledgements: ["Higher annual cost than Plan A"], rationale: "Plan B is defensible when faster recovery is the stated priority and the reader acknowledges its higher annual cost." },
    ],
  }] },
};
