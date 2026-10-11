import type { ClueLab } from "../../domain";

export const clueLabs: Record<string, ClueLab> = {
  "CLUE.CODE.CVC": {
    id: "CLUE.CODE.CVC",
    title: "Blend Every Sound",
    skillId: "CODE.002",
    stages: ["young-investigator", "investigator", "lead-investigator"],
    concept: "A short word can be cracked by holding each sound in order and then blending the sounds into one word.",
    model: "For m-a-p, keep all three clues: /m/ /a/ /p/. Blend them together: map. Do not guess from only the first sound.",
    guided: {
      id: "guided-cvc",
      prompt: "Blend /s/ /i/ /t/. Which word do the sounds make?",
      choices: [
        { id: "sit", label: "sit" },
        { id: "sat", label: "sat" },
      ],
      correctAnswerIds: ["sit"],
    },
    transfer: {
      id: "transfer-cvc",
      prompt: "New code word: /p/ /i/ /n/. Which word does it make?",
      choices: [
        { id: "pin", label: "pin" },
        { id: "pan", label: "pan" },
      ],
      correctAnswerIds: ["pin"],
    },
    returnMessage: "Code repaired. Return to the case and blend every sound in the storage label.",
    notebookEntry: {
      title: "Blend Every Sound",
      summary: "For a short CVC word, keep the first, middle, and last sound in order, then blend them into one spoken word.",
    },
  },
  "CLUE.EVID.TEXT_ONLY": {
    id: "CLUE.EVID.TEXT_ONLY",
    title: "Case File or Guess?",
    skillId: "EVID.004",
    stages: ["young-investigator", "investigator", "lead-investigator"],
    concept: "A strong answer is supported by information in the case. Something can sound reasonable and still be only a guess.",
    model: "If the case says the sidewalk is wet, we can confirm it is wet. We cannot confirm why it is wet unless the case gives us that clue.",
    guided: {
      id: "guided-text-only",
      prompt: "The case says: ‘A red hat is on the bench.’ Which statement is supported?",
      choices: [
        { id: "supported", label: "A red hat is on the bench." },
        { id: "guess", label: "Cameron left the hat there." },
      ],
      correctAnswerIds: ["supported"],
    },
    transfer: {
      id: "transfer-text-only",
      prompt: "A delivery notice says: ‘Package scanned at reception.’ What can we confirm?",
      choices: [
        { id: "scan", label: "The carrier recorded a scan at reception." },
        { id: "desk", label: "The package is definitely still on the reception desk." },
      ],
      correctAnswerIds: ["scan"],
    },
    returnMessage: "Clue repaired. Return to the case and use only the evidence you actually have.",
    notebookEntry: {
      title: "Case File or Guess?",
      summary: "Separate what the text establishes from what could merely be true. Ask: ‘What evidence actually supports this?’",
    },
  },
  "CLUE.COND.IF": {
    id: "CLUE.COND.IF",
    title: "The Word ‘If’",
    skillId: "SENT.005",
    stages: ["investigator", "lead-investigator"],
    concept: "‘If’ introduces a condition. The result depends on that condition being satisfied.",
    model: "‘You may enter if your badge is active’ does not mean everyone may enter. The badge condition matters.",
    guided: {
      id: "guided-if",
      prompt: "‘You can submit the form if a guardian signs it.’ What has to happen first?",
      choices: [
        { id: "signed", label: "A guardian signs the form." },
        { id: "nothing", label: "Nothing; anyone can submit it." },
      ],
      correctAnswerIds: ["signed"],
    },
    transfer: {
      id: "transfer-if",
      prompt: "‘Drivers may use the parcel room if reception is unattended.’ When may they use it?",
      choices: [
        { id: "unattended", label: "When reception is unattended." },
        { id: "always", label: "For every delivery." },
      ],
      correctAnswerIds: ["unattended"],
    },
    returnMessage: "Condition identified. Return to the case and check whether the requirement was actually met.",
    notebookEntry: {
      title: "Condition Word: IF",
      summary: "‘If’ means the result depends on a stated condition. Find the condition before deciding what the rule allows.",
    },
  },
  "CLUE.COND.UNLESS": {
    id: "CLUE.COND.UNLESS",
    title: "The Word ‘Unless’",
    skillId: "SENT.005",
    stages: ["investigator", "lead-investigator"],
    concept: "‘Unless’ introduces an exception that can change what would otherwise happen.",
    model: "‘The office is open unless the building is closed’ means open is the general rule, but a closed building changes it.",
    guided: {
      id: "guided-unless",
      prompt: "‘You may attend unless the event is full.’ What can stop attendance?",
      choices: [
        { id: "full", label: "The event being full." },
        { id: "nothing", label: "Nothing can change the rule." },
      ],
      correctAnswerIds: ["full"],
    },
    transfer: {
      id: "transfer-unless",
      prompt: "‘The subscription renews unless you cancel before Friday.’ What prevents renewal?",
      choices: [
        { id: "cancel", label: "Canceling before Friday." },
        { id: "wait", label: "Waiting until after Friday." },
      ],
      correctAnswerIds: ["cancel"],
    },
    returnMessage: "Exception found. Return to the case and inspect the full rule again.",
    notebookEntry: {
      title: "Condition Word: UNLESS",
      summary: "‘Unless’ marks an exception that can change the general rule. Find the exception before deciding.",
    },
  },
  "CLUE.LEGAL.WHO_MUST": {
    id: "CLUE.LEGAL.WHO_MUST",
    title: "Who Must Act?",
    skillId: "LEGAL.001",
    stages: ["lead-investigator"],
    concept: "Legal and policy language often assigns a duty to one specific party. Identify the party, the required action, and any deadline.",
    model: "‘Tenant must notify management in writing’ assigns the notification duty to the tenant.",
    guided: {
      id: "guided-who-must",
      prompt: "‘Customer must return the device within 10 days.’ Who has the duty?",
      choices: [
        { id: "customer", label: "The customer." },
        { id: "company", label: "The company." },
      ],
      correctAnswerIds: ["customer"],
    },
    transfer: {
      id: "transfer-who-must",
      prompt: "‘Employer must provide the safety equipment.’ Who is responsible?",
      choices: [
        { id: "employer", label: "The employer." },
        { id: "employee", label: "The employee." },
      ],
      correctAnswerIds: ["employer"],
    },
    returnMessage: "Responsibility clarified. Return to the agreement and assign the duty to the correct party.",
    notebookEntry: {
      title: "Who Must Act?",
      summary: "For an obligation, identify the party, the required action, and any condition or deadline before deciding who is responsible.",
    },
  },
};
