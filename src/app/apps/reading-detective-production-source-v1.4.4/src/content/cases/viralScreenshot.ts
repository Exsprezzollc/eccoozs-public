import type { ReadingCase } from "../../domain";

export const viralScreenshot: ReadingCase = {
  id: "CASE.JR.006",
  title: "The Viral Screenshot",
  genre: "source",
  presentationStages: ["investigator"],
  targetSkills: ["SOURCE.001", "SOURCE.002", "SOURCE.005", "EVID.004", "ARG.001", "ARG.003"],
  prerequisiteSkills: ["EVID.001", "EVID.002", "SOURCE.001", "SOURCE.002"],
  briefing:
    "A cropped screenshot is spreading with the claim that late-bus service is ending permanently. Trace the source, restore the missing context, and decide what the evidence actually supports.",
  sources: [
    {
      id: "screenshot",
      kind: "image",
      title: "Cropped Screenshot",
      body: "Route 8 — Friday: last departure 6:00 PM.",
      authority: "unknown",
      intelligence: {
        creator: "Unknown screenshot creator",
        purpose: "unknown",
        proximity: "summary",
        independenceKey: "cropped-screenshot",
        contextNote: "The screenshot shows only one line and omits the surrounding notice.",
      },
    },
    {
      id: "repost",
      kind: "message",
      title: "Viral Repost",
      body: "See? No more late buses after Friday. Share this before they delete it.",
      authority: "personal",
      intelligence: {
        creator: "Student social account",
        purpose: "persuade",
        proximity: "repost",
        independenceKey: "cropped-screenshot",
        originalSourceId: "screenshot",
        interestNote: "The post uses urgency and makes a stronger permanent-change claim than the screenshot itself states.",
      },
    },
    {
      id: "notice",
      kind: "notice",
      title: "Transit Agency Service Notice",
      body: "Route 8 maintenance notice: On Friday, August 21 only, the last departure will be 6:00 PM. Normal 9:00 PM service resumes Saturday, August 22.",
      authority: "official",
      intelligence: {
        creator: "Regional Transit Agency",
        purpose: "inform",
        proximity: "official-record",
        independenceKey: "transit-agency-notice",
      },
    },
    {
      id: "district",
      kind: "document",
      title: "School Transportation Update",
      body: "Students using Route 8 on Friday, August 21 should plan for the temporary 6:00 PM last departure. The regular evening schedule returns Saturday.",
      authority: "official",
      intelligence: {
        creator: "School Transportation Office",
        purpose: "inform",
        proximity: "official-record",
        independenceKey: "school-transportation",
      },
    },
  ],
  sourceIntelligence: {
    lenses: [
      {
        id: "permanent-change",
        question: "Is late-bus service ending permanently after Friday?",
        assessments: [
          { sourceId: "screenshot", utility: "limited", rationale: "The cropped line gives Friday's last-departure time but omits whether the change is temporary." },
          { sourceId: "repost", utility: "limited", rationale: "The repost states the permanent-change claim but depends on the cropped screenshot rather than independent evidence." },
          { sourceId: "notice", utility: "direct", rationale: "The transit notice directly states the Friday-only change and when normal service resumes." },
          { sourceId: "district", utility: "supporting", rationale: "The school transportation update independently describes the change as temporary and says the regular schedule returns Saturday." },
        ],
      },
      {
        id: "what-viral-post-claims",
        question: "What claim is the viral post making?",
        assessments: [
          { sourceId: "repost", utility: "direct", rationale: "The repost is the source making the claim, so it is direct evidence of what the account says." },
          { sourceId: "screenshot", utility: "supporting", rationale: "The screenshot is the material the repost relies on, but it does not itself state a permanent end." },
          { sourceId: "notice", utility: "context", rationale: "The official notice is useful for checking the claim, not for identifying what the repost says." },
          { sourceId: "district", utility: "context", rationale: "The district update helps verify the situation but is not the creator of the viral claim." },
        ],
      },
    ],
    claims: [
      {
        id: "permanent-end",
        claim: "Route 8 late-bus service ends permanently after Friday.",
        positions: [
          { sourceId: "repost", stance: "supports", excerpt: "No more late buses after Friday." },
          { sourceId: "screenshot", stance: "uncertain", excerpt: "Friday: last departure 6:00 PM." },
          { sourceId: "notice", stance: "contradicts", excerpt: "Normal 9:00 PM service resumes Saturday." },
          { sourceId: "district", stance: "contradicts", excerpt: "The regular evening schedule returns Saturday." },
        ],
      },
      {
        id: "friday-6pm",
        claim: "On Friday, August 21, Route 8's last departure is 6:00 PM.",
        positions: [
          { sourceId: "screenshot", stance: "supports", excerpt: "Friday: last departure 6:00 PM." },
          { sourceId: "notice", stance: "supports", excerpt: "On Friday, August 21 only, the last departure will be 6:00 PM." },
          { sourceId: "district", stance: "supports", excerpt: "temporary 6:00 PM last departure" },
        ],
      },
    ],
  },
  steps: [
    {
      id: "claim",
      prompt: "What is the viral repost claiming?",
      skillId: "ARG.001",
      responseType: "single-choice",
      sourceIds: ["repost"],
      sourceLensId: "what-viral-post-claims",
      choices: [
        { id: "permanent", label: "Late-bus service is ending permanently after Friday." },
        { id: "friday", label: "Friday has a temporary 6:00 PM last departure." },
        { id: "unknown", label: "The post makes no claim about bus service." },
      ],
      correctAnswerIds: ["permanent"],
    },
    {
      id: "best-source",
      prompt: "Which source is most direct for deciding whether the change is permanent?",
      skillId: "SOURCE.005",
      responseType: "select-source",
      sourceIds: ["screenshot", "repost", "notice", "district"],
      sourceLensId: "permanent-change",
      choices: [
        { id: "notice", label: "Transit Agency Service Notice" },
        { id: "repost", label: "Viral Repost" },
        { id: "screenshot", label: "Cropped Screenshot" },
        { id: "district", label: "School Transportation Update" },
      ],
      correctAnswerIds: ["notice"],
    },
    {
      id: "missing-context",
      prompt: "Which phrase in the full notice changes the meaning of the cropped screenshot most directly?",
      skillId: "EVID.004",
      responseType: "highlight-phrase",
      sourceIds: ["notice"],
      evidenceBoard: {
        mode: "zoom",
        target: {
          sourceId: "notice",
          sentence: "Route 8 maintenance notice: On Friday, August 21 only, the last departure will be 6:00 PM. Normal 9:00 PM service resumes Saturday, August 22.",
          phrase: "Friday, August 21 only",
        },
        phraseOptions: ["Friday, August 21 only", "last departure", "Route 8 maintenance notice"],
      },
    },
    {
      id: "evidence-fit",
      prompt: "Which evidence best addresses the viral claim that service is ending permanently?",
      skillId: "ARG.003",
      responseType: "single-choice",
      sourceIds: ["notice", "district", "repost"],
      sourceClaimId: "permanent-end",
      choices: [
        { id: "resume", label: "The transit notice says normal service resumes Saturday, and the district update says the regular schedule returns Saturday." },
        { id: "shares", label: "The repost has been shared many times." },
        { id: "urgent", label: "The repost says ‘Share this before they delete it.’" },
      ],
      correctAnswerIds: ["resume"],
      evidenceContext: "transfer",
    },
  ],
  misconceptionTargets: ["EVID.001"],
  transferCaseIds: [],
  delayedReview: { afterDays: 7, skillIds: ["SOURCE.005", "EVID.004", "ARG.003"] },
};
