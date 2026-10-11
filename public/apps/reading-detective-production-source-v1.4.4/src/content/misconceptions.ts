import type { DiagnosticProbe, MisconceptionDefinition } from "../domain";

export const misconceptions: Record<string, MisconceptionDefinition> = {
  "CODE.001": {
    id: "CODE.001",
    skillId: "CODE.002",
    label: "CVC sounds not blended accurately",
    description: "Learner identifies some sounds but does not combine the full consonant-vowel-consonant sequence into the target word.",
    confirmationThreshold: 2,
    probeIds: ["PROBE.CODE.001"],
    clueLabId: "CLUE.CODE.CVC",
  },
  "EVID.001": {
    id: "EVID.001",
    skillId: "EVID.004",
    label: "Outside knowledge substituted for evidence",
    description: "Learner answers from what could be true rather than what the supplied text supports.",
    confirmationThreshold: 2,
    probeIds: ["PROBE.EVID.001"],
    clueLabId: "CLUE.EVID.TEXT_ONLY",
  },
  "COND.001": {
    id: "COND.001",
    skillId: "SENT.005",
    label: "Condition ignored",
    description: "Learner treats a conditional statement as unconditional.",
    confirmationThreshold: 2,
    probeIds: ["PROBE.COND.001"],
    clueLabId: "CLUE.COND.IF",
  },
  "COND.002": {
    id: "COND.002",
    skillId: "SENT.005",
    label: "Unless misunderstood",
    description: "Learner does not correctly interpret an unless clause.",
    confirmationThreshold: 2,
    probeIds: ["PROBE.COND.002"],
    clueLabId: "CLUE.COND.UNLESS",
  },
  "LEGAL.004": {
    id: "LEGAL.004",
    skillId: "LEGAL.001",
    label: "Obligation assigned to wrong party",
    description: "Learner understands the action but attributes the duty to the wrong party.",
    confirmationThreshold: 2,
    probeIds: ["PROBE.LEGAL.004"],
    clueLabId: "CLUE.LEGAL.WHO_MUST",
  },
};

export const diagnosticProbes: Record<string, DiagnosticProbe> = {
  "PROBE.CODE.001": {
    id: "PROBE.CODE.001",
    misconceptionId: "CODE.001",
    prompt: "Listen to the sound sequence in your head: /b/ /i/ /n/. Which word do those sounds make together?",
    correctAnswerIds: ["bin"],
    choices: [
      { id: "bin", label: "bin" },
      { id: "ban", label: "ban" },
    ],
  },
  "PROBE.EVID.001": {
    id: "PROBE.EVID.001",
    misconceptionId: "EVID.001",
    prompt: "Which answer uses only information from the case file?",
    correctAnswerIds: ["text-only"],
    choices: [
      { id: "text-only", label: "The answer supported by the supplied text" },
      { id: "possible", label: "Something that could happen in real life" },
    ],
  },
  "PROBE.COND.001": {
    id: "PROBE.COND.001",
    misconceptionId: "COND.001",
    prompt: "What has to happen before the rule applies?",
    correctAnswerIds: ["condition"],
    choices: [
      { id: "condition", label: "The stated condition must be satisfied" },
      { id: "always", label: "Nothing; the rule always applies" },
    ],
  },
  "PROBE.COND.002": {
    id: "PROBE.COND.002",
    misconceptionId: "COND.002",
    prompt: "In this sentence, what job does ‘unless’ do?",
    correctAnswerIds: ["exception"],
    choices: [
      { id: "exception", label: "It introduces an exception or condition that changes the rule" },
      { id: "guarantee", label: "It guarantees the action will happen" },
    ],
  },
  "PROBE.LEGAL.004": {
    id: "PROBE.LEGAL.004",
    misconceptionId: "LEGAL.004",
    prompt: "Which party does the sentence say must act?",
    correctAnswerIds: ["named-party"],
    choices: [
      { id: "named-party", label: "The party named before the required action" },
      { id: "other-party", label: "The other party in the agreement" },
    ],
  },
};
