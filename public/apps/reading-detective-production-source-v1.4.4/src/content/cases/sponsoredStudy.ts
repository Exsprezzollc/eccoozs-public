import type { ReadingCase } from "../../domain";

export const sponsoredStudy: ReadingCase = {
  id: "CASE.LEAD.009",
  title: "The Sponsored Study",
  genre: "source",
  presentationStages: ["lead-investigator"],
  targetSkills: ["RESEARCH.004", "SOURCE.004", "SOURCE.003", "MEDIA.002"],
  prerequisiteSkills: ["RESEARCH.001", "SOURCE.005"],
  briefing: "A company-funded study reports a benefit. Determine what the funding relationship means, what the study found, and what independent evidence adds.",
  sources: [
    { id: "company-study", kind: "document", title: "Company-Funded Trial Summary", body: "A 12-week controlled comparison of 220 participants found an average 6% improvement on the specified task in the product group. The manufacturer funded the study and contracted the research organization.", authority: "reported", intelligence: { creator: "Independent Research Services", purpose: "explain", proximity: "official-record", independenceKey: "company-trial", interestNote: "The manufacturer funded the work and sells the tested product." } },
    { id: "company-ad", kind: "advertisement", title: "Manufacturer Advertisement", body: "CLINICALLY PROVEN TO BOOST PERFORMANCE.", authority: "personal", intelligence: { creator: "Manufacturer", purpose: "sell", proximity: "summary", independenceKey: "company-trial", originalSourceId: "company-study", interestNote: "The manufacturer sells the product." } },
    { id: "replication", kind: "document", title: "Independent Replication", body: "A separate university team tested a similar protocol with 310 participants and found a smaller 2% average improvement on the same task.", authority: "official", intelligence: { creator: "State University Lab", purpose: "explain", proximity: "official-record", independenceKey: "university-replication" } },
  ],
  sourceIntelligence: { lenses: [{ id: "funding", question: "How should the company funding affect source evaluation?", assessments: [
    { sourceId: "company-study", utility: "direct", rationale: "It directly reports the funded study and discloses the funding relationship; methods and findings still need inspection." },
    { sourceId: "company-ad", utility: "limited", rationale: "It is useful for what the company claims but depends on the same study origin and has a selling purpose." },
    { sourceId: "replication", utility: "supporting", rationale: "It provides independent evidence on a similar protocol from a different origin." },
  ] }], claims: [{ id: "benefit", claim: "The tested product improves performance on the specified task.", positions: [
    { sourceId: "company-study", stance: "supports", excerpt: "6% improvement" },
    { sourceId: "company-ad", stance: "supports", excerpt: "clinically proven" },
    { sourceId: "replication", stance: "supports", excerpt: "2% improvement" },
  ] }] },
  steps: [
    { id: "interest", prompt: "What is the disciplined way to treat the manufacturer funding?", skillId: "RESEARCH.004", responseType: "single-choice", sourceIds: ["company-study", "replication"], choices: [
      { id: "inspect", label: "Treat the funding as relevant context, inspect methods and claims, and compare independent evidence." },
      { id: "false", label: "Assume every result is false because the manufacturer funded it." },
      { id: "true", label: "Assume every result is true because a research firm performed it." },
    ], correctAnswerIds: ["inspect"] },
    { id: "independence", prompt: "Do the advertisement and company-funded study count as two independent confirmations?", skillId: "SOURCE.003", responseType: "single-choice", sourceIds: ["company-ad", "company-study"], choices: [
      { id: "one-origin", label: "No. The advertisement depends on the company-funded study, so they share one underlying origin." },
      { id: "two", label: "Yes. Every separate page counts as independent corroboration." },
    ], correctAnswerIds: ["one-origin"] },
    { id: "replication", prompt: "What does the independent replication add?", skillId: "SOURCE.004", responseType: "single-choice", sourceIds: ["company-study", "replication"], choices: [
      { id: "independent", label: "A separate origin also found improvement, although the size was smaller; that strengthens support without making the effect identical or universal." },
      { id: "erase", label: "It erases the funding relationship from the first study." },
      { id: "contradict", label: "Any different effect size means the studies completely contradict one another." },
    ], correctAnswerIds: ["independent"], evidenceContext: "transfer" },
  ], misconceptionTargets: [], transferCaseIds: [], delayedReview: { afterDays: 7, skillIds: ["RESEARCH.004", "SOURCE.003"] },
  researchMediaDecision: { research: [
    { id: "company-profile", sourceId: "company-study", design: "controlled-experiment", sampleSize: 220, population: "adult participants", comparisonGroup: true, measuredOutcome: "specified performance task", statedFinding: "6% average improvement", relationshipSupported: "causal", limitations: ["manufacturer funded study", "single specified task"] },
    { id: "replication-profile", sourceId: "replication", design: "controlled-experiment", sampleSize: 310, population: "adult participants", comparisonGroup: true, measuredOutcome: "same specified performance task", statedFinding: "2% average improvement", relationshipSupported: "causal", limitations: ["effect smaller than first study"] },
  ] },
};
