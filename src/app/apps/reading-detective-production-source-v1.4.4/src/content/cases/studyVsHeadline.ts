import type { ReadingCase } from "../../domain";

export const studyVsHeadline: ReadingCase = {
  id: "CASE.LEAD.007",
  title: "The Study Behind the Headline",
  genre: "source",
  presentationStages: ["lead-investigator"],
  targetSkills: ["MEDIA.001", "MEDIA.002", "RESEARCH.001", "RESEARCH.002", "RESEARCH.003"],
  prerequisiteSkills: ["ARG.003", "SOURCE.005", "EVID.003"],
  briefing: "A dramatic headline claims a new study proves a broad effect. Reconstruct what the study measured and decide how strong the conclusion can actually be.",
  sources: [
    { id: "headline", kind: "text", title: "News Headline", body: "NEW STUDY PROVES LATER BEDTIMES DESTROY SCHOOL PERFORMANCE", authority: "reported", intelligence: { creator: "Metro Daily", purpose: "inform", proximity: "summary", independenceKey: "metro-article" } },
    { id: "study", kind: "document", title: "Study Summary", body: "Researchers observed 640 students for one semester. Students reporting later average bedtimes also had lower average quiz scores. The study did not assign sleep schedules and states that the results do not establish causation.", authority: "official", intelligence: { creator: "University Sleep Lab", purpose: "explain", proximity: "official-record", independenceKey: "sleep-study" } },
    { id: "methods", kind: "document", title: "Methods Note", body: "Sleep timing was self-reported weekly. Quiz averages came from participating classes. The sample included students from four schools in one region.", authority: "official", intelligence: { creator: "University Sleep Lab", purpose: "document", proximity: "official-record", independenceKey: "sleep-study" } },
  ],
  sourceIntelligence: {
    lenses: [{ id: "study-question", question: "What did the study itself establish?", assessments: [
      { sourceId: "headline", utility: "limited", rationale: "The headline summarizes the study with stronger causal language than the source uses." },
      { sourceId: "study", utility: "direct", rationale: "The study summary directly states the design, finding, and causal limitation." },
      { sourceId: "methods", utility: "supporting", rationale: "The methods note clarifies sample and measurement details." },
    ] }],
  },
  steps: [
    { id: "measure", prompt: "What did the study actually measure?", skillId: "RESEARCH.001", responseType: "single-choice", sourceIds: ["study", "methods"], researchProfileId: "sleep-profile", choices: [
      { id: "reported", label: "Self-reported sleep timing and quiz averages during one semester" },
      { id: "assigned", label: "A randomized experiment assigning all students different bedtimes" },
      { id: "lifetime", label: "Lifetime academic performance" },
    ], correctAnswerIds: ["reported"] },
    { id: "cause", prompt: "Does this study prove later bedtimes caused lower quiz scores?", skillId: "RESEARCH.002", responseType: "single-choice", sourceIds: ["study"], researchProfileId: "sleep-profile", choices: [
      { id: "association", label: "No. It reports an association and explicitly says causation was not established." },
      { id: "proof", label: "Yes. Any association proves causation." },
      { id: "none", label: "No relationship was reported." },
    ], correctAnswerIds: ["association"] },
    { id: "headline", prompt: "How should the headline be judged against the study?", skillId: "MEDIA.001", responseType: "single-choice", sourceIds: ["headline", "study"], mediaFrameId: "headline-frame", choices: [
      { id: "stronger", label: "The headline is stronger than the study because it says ‘proves’ and ‘destroy’ while the study reports an association." },
      { id: "same", label: "The headline precisely matches the study." },
      { id: "weaker", label: "The headline is more cautious than the study." },
    ], correctAnswerIds: ["stronger"] },
    { id: "sample", prompt: "Which conclusion respects the study's sample?", skillId: "RESEARCH.003", responseType: "single-choice", sourceIds: ["methods"], choices: [
      { id: "scope", label: "The findings describe the observed sample and may inform similar settings, but do not automatically prove the same result for every student everywhere." },
      { id: "universal", label: "The four-school sample proves the result for every student everywhere." },
      { id: "nobody", label: "The sample provides no useful information at all." },
    ], correctAnswerIds: ["scope"], evidenceContext: "transfer" },
  ],
  misconceptionTargets: [], transferCaseIds: ["CASE.LEAD.009"],
  delayedReview: { afterDays: 7, skillIds: ["MEDIA.001", "RESEARCH.002", "RESEARCH.003"] },
  researchMediaDecision: {
    research: [{ id: "sleep-profile", sourceId: "study", design: "observational", sampleSize: 640, population: "students from four schools in one region", comparisonGroup: false, randomAssignment: false, measuredOutcome: "self-reported sleep timing and quiz averages", statedFinding: "Later reported bedtimes were associated with lower average quiz scores.", relationshipSupported: "association", limitations: ["observational design", "self-reported sleep timing", "four schools in one region"] }],
    mediaClaims: [{ id: "headline-frame", sourceId: "headline", claimText: "Later bedtimes destroy school performance.", certainty: "unsupported", evidenceSourceIds: ["study", "methods"], risks: ["headline-stronger-than-source", "causation-from-correlation", "sample-overgeneralization", "unsupported-certainty"], preciseReading: "The study found an association between later reported bedtimes and lower quiz averages in the observed sample; it did not establish causation." }],
  },
};
