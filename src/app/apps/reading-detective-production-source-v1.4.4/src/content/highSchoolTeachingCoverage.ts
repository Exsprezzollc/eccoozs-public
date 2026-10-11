import type {
  SkillId,
  TeachingModule,
  TeachingPracticeItem,
  TeachingPresentationVariant,
} from "../domain";

const choice = (id: string, label: string) => ({ id, label });

type ItemSpec = {
  prompt: string;
  sourceBody: string;
  choices: [string, string][];
  correct: string;
  success: string;
  retry: string;
};

type ModuleSpec = {
  id: string;
  skillId: SkillId;
  title: string;
  notebookTitle: string;
  reminder: string;
  discoverTitle: string;
  discoverBody: string;
  explanation: string;
  modelBody: string;
  modelThinking: string;
  together: ItemSpec;
  supported: ItemSpec;
  independent: ItemSpec;
  transfer: ItemSpec;
};

function item(id: string, spec: ItemSpec): TeachingPracticeItem {
  return {
    id,
    prompt: spec.prompt,
    sourceBody: spec.sourceBody,
    choices: spec.choices.map(([choiceId, label]) => choice(choiceId, label)),
    correctAnswerIds: [spec.correct],
    successMessage: spec.success,
    retryMessage: spec.retry,
  };
}

function variant(prefix: string, spec: ModuleSpec): TeachingPresentationVariant {
  return {
    stage: "lead-investigator",
    discover: { title: spec.discoverTitle, body: spec.discoverBody },
    explanation: spec.explanation,
    model: { sourceBody: spec.modelBody, thinking: spec.modelThinking },
    together: item(`${prefix}-together`, spec.together),
    supported: item(`${prefix}-supported`, spec.supported),
    independent: item(`${prefix}-independent`, spec.independent),
    transfer: item(`${prefix}-transfer`, spec.transfer),
  };
}

function makeModule(spec: ModuleSpec): TeachingModule {
  const prefix = spec.id.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return {
    id: spec.id,
    skillId: spec.skillId,
    title: spec.title,
    stages: ["lead-investigator"],
    notebookTool: { title: spec.notebookTitle, reminder: spec.reminder },
    variants: { "lead-investigator": variant(prefix, spec) },
  };
}

const specs: ModuleSpec[] = [
  {
    id: "TEACH.LEGAL.PERMISSION",
    skillId: "LEGAL.002",
    title: "Permission Is Not Obligation",
    notebookTitle: "May vs Must",
    reminder: "Identify the party and modal word. May/can usually describe permission or possibility; must/shall signal a requirement in the clause. Read conditions and exceptions too.",
    discoverTitle: "A clause can allow an action without requiring it",
    discoverBody: "Formal documents often use small words such as may, can, must, and shall to assign very different kinds of action.",
    explanation: "Reading Detective maps what the words say. First identify the party, then the action word, then any condition. Do not turn permission into a requirement or a requirement into a guarantee about what will happen.",
    modelBody: "Management may inspect the unit after written notice is received.",
    modelThinking: "The clause gives management permission to inspect after the condition is met. It does not say management must inspect every time.",
    together: { prompt: "What does this clause give the customer?", sourceBody: "The customer may request a replacement within 30 days.", choices: [["permission", "Permission to request a replacement within 30 days"], ["guarantee", "A guaranteed replacement"], ["duty", "A duty to request a replacement"]], correct: "permission", success: "You kept permission separate from guarantee and obligation.", retry: "Focus on the word ‘may’ and the action it modifies." },
    supported: { prompt: "Which statement is precise?", sourceBody: "The employer may approve remote work subject to operational needs.", choices: [["conditional", "The employer is permitted to approve it, and the clause adds a condition"], ["must", "The employer must approve every request"], ["automatic", "Remote work is automatic"]], correct: "conditional", success: "You preserved both permission and the stated condition.", retry: "Read ‘may’ and ‘subject to’ separately before combining them." },
    independent: { prompt: "Interpret the clause independently.", sourceBody: "The resident may use the parking area while the permit remains active.", choices: [["permit", "The clause gives conditional permission while the permit is active"], ["duty", "The resident must park there"], ["forever", "Permission continues forever"]], correct: "permit", success: "Independent permission analysis logged.", retry: "Identify what is allowed and what limits that permission." },
    transfer: { prompt: "Transfer to a workplace policy.", sourceBody: "Employees may report safety concerns anonymously.", choices: [["option", "Anonymous reporting is an available option"], ["required", "Employees are required to report anonymously"], ["barred", "Anonymous reporting is prohibited"]], correct: "option", success: "Permission reading transferred to a new document type.", retry: "Ask whether the clause allows, requires, or prohibits the action." },
  },
  {
    id: "TEACH.LEGAL.WAIVER",
    skillId: "LEGAL.003",
    title: "Recognize What Is Being Waived",
    notebookTitle: "Waiver Check",
    reminder: "Find who is waiving, the exact right/claim/requirement named, the scope, and any conditions. Understanding the wording is not the same as deciding enforceability.",
    discoverTitle: "Some clauses describe a right or claim being given up",
    discoverBody: "Words such as waive or waiver deserve a slow read because they can change what a party says it will later claim or require.",
    explanation: "Identify the party doing the waiving and the exact thing named after the waiver language. Reading Detective explains the text only; whether a specific waiver is legally effective can depend on law and circumstances.",
    modelBody: "Participant waives the right to receive a printed copy of the monthly statement and agrees to electronic delivery.",
    modelThinking: "The participant is giving up the stated right to a printed copy. The clause also identifies the replacement method: electronic delivery.",
    together: { prompt: "What is being waived?", sourceBody: "Customer waives the right to paper notices and elects email delivery.", choices: [["paper", "The right to paper notices"], ["email", "The right to email delivery"], ["account", "The entire account"]], correct: "paper", success: "You identified the exact right named by the clause.", retry: "Look immediately after ‘waives the right to’." },
    supported: { prompt: "Which reading stays within the clause?", sourceBody: "The signer waives any claim for the promotional discount after the offer expires.", choices: [["scope", "The stated waiver concerns claims for that promotional discount after expiration"], ["all", "The signer gives up every possible legal right forever"], ["none", "The clause contains no waiver language"]], correct: "scope", success: "You kept the waiver within its stated scope.", retry: "Do not expand a specific waiver beyond the thing it names." },
    independent: { prompt: "Map the waiver independently.", sourceBody: "Member waives the right to a mailed renewal reminder.", choices: [["mailed", "The named right is a mailed renewal reminder"], ["cancel", "The member waives cancellation rights"], ["payment", "The member waives all payment obligations"]], correct: "mailed", success: "Independent waiver recognition logged.", retry: "Name only the right that the sentence actually identifies." },
    transfer: { prompt: "Transfer to an event form.", sourceBody: "Attendee waives the option to receive a physical ticket and selects mobile entry.", choices: [["physical", "The waived option is receiving a physical ticket"], ["entry", "The attendee waives entry"], ["event", "The attendee waives the event itself"]], correct: "physical", success: "Waiver recognition transferred without overreading the clause.", retry: "Separate the waived option from the alternative the clause provides." },
  },
  {
    id: "TEACH.LEGAL.LIABILITY",
    skillId: "LEGAL.004",
    title: "Read Responsibility Language Carefully",
    notebookTitle: "Liability Language",
    reminder: "Identify what type of responsibility the clause discusses, for which events or losses, and any limits or exceptions. Do not decide enforceability from wording alone.",
    discoverTitle: "Responsibility clauses often narrow exactly what they address",
    discoverBody: "Liability language may discuss responsibility for a specified loss, damage, cost, debt, or event. The scope matters.",
    explanation: "Locate the event or loss, the party named, and any limiting words. Reading Detective teaches how to read the clause; it does not determine whether the clause is legally enforceable or what a court would decide.",
    modelBody: "The customer is responsible for shipping costs for returns not caused by a product defect.",
    modelThinking: "The clause assigns one specific cost—return shipping—under one stated circumstance. I should not turn that into a claim about every possible loss.",
    together: { prompt: "What responsibility does this clause actually address?", sourceBody: "The renter is responsible for replacement cost for keys lost by the renter.", choices: [["keys", "Replacement cost for keys the renter loses"], ["all", "Every cost connected with the property"], ["none", "No responsibility is stated"]], correct: "keys", success: "You kept the responsibility tied to the stated event and cost.", retry: "Identify the exact cost and condition named in the sentence." },
    supported: { prompt: "Which conclusion stays within the text?", sourceBody: "Provider is not responsible for delays caused solely by scheduled maintenance disclosed in advance.", choices: [["limited", "The clause addresses a specific category of disclosed scheduled-maintenance delays"], ["everything", "The provider can never be responsible for any delay"], ["guarantee", "The clause guarantees no delays"]], correct: "limited", success: "You respected the clause's stated scope.", retry: "Notice the narrowing words ‘caused solely by’ and the maintenance condition." },
    independent: { prompt: "Read the responsibility language independently.", sourceBody: "Vendor is responsible for damage caused by its installation crew during installation.", choices: [["installation", "The clause assigns responsibility for damage caused by that crew during installation"], ["all-damage", "The vendor is responsible for all damage at all times"], ["none", "The vendor has no stated responsibility"]], correct: "installation", success: "Independent liability-language reading logged.", retry: "Keep cause, actor, and time window together." },
    transfer: { prompt: "Transfer to a service agreement.", sourceBody: "Subscriber remains responsible for charges incurred before the cancellation effective date.", choices: [["before", "The clause assigns responsibility for charges incurred before cancellation becomes effective"], ["after", "The subscriber must pay every future charge"], ["refund", "All earlier charges must be refunded"]], correct: "before", success: "Responsibility analysis transferred to a billing clause.", retry: "Locate the time boundary created by ‘before the cancellation effective date.’" },
  },
  {
    id: "TEACH.LEGAL.TERMINATION",
    skillId: "LEGAL.005",
    title: "Track How an Agreement Ends",
    notebookTitle: "Termination & Cancellation",
    reminder: "Find who may end the agreement, the trigger or notice rule, the effective date, and what obligations continue afterward.",
    discoverTitle: "Ending an agreement can have steps and consequences",
    discoverBody: "Cancellation and termination language often includes who may act, required notice, timing, and obligations that survive the end date.",
    explanation: "Map the ending process in order: actor → trigger/notice → effective date → stated consequence. Do not assume ending the agreement automatically erases prior charges or duties unless the text says so.",
    modelBody: "Either party may terminate with 30 days' written notice. Fees incurred before the termination date remain due.",
    modelThinking: "Either party has permission to terminate, but 30 days' written notice is required. Earlier fees survive the termination date according to the second sentence.",
    together: { prompt: "What is required to terminate here?", sourceBody: "Customer may cancel by submitting notice through the portal at least 24 hours before renewal.", choices: [["notice", "Portal notice at least 24 hours before renewal"], ["call", "Any phone call after renewal"], ["none", "No action is required"]], correct: "notice", success: "You mapped the cancellation method and deadline.", retry: "Find both the required action and the timing phrase." },
    supported: { prompt: "What survives termination?", sourceBody: "Termination ends future service, but unpaid charges already incurred remain due.", choices: [["charges", "Previously incurred unpaid charges remain due"], ["service", "Future service continues automatically"], ["nothing", "Every prior obligation disappears"]], correct: "charges", success: "You kept the post-termination consequence separate from future service.", retry: "Read the clause after ‘but’ as a surviving obligation." },
    independent: { prompt: "Interpret the termination trigger.", sourceBody: "The provider may terminate access if the account remains unpaid for 15 days after notice.", choices: [["conditional", "Termination permission depends on unpaid status lasting 15 days after notice"], ["immediate", "Access must end immediately whenever a payment is one day late"], ["never", "The provider cannot terminate access"]], correct: "conditional", success: "Independent termination analysis logged.", retry: "Track the if-condition and the 15-day timing requirement." },
    transfer: { prompt: "Transfer to a lease excerpt.", sourceBody: "Resident may end the month-to-month agreement by giving 30 days' notice as described in Section 8.", choices: [["section", "The resident has a stated termination option that depends on 30 days' notice and Section 8"], ["instant", "The resident may end it instantly with no notice"], ["forced", "The resident must terminate every 30 days"]], correct: "section", success: "Termination reading transferred to a cross-referenced clause.", retry: "Keep permission, notice period, and the cross-reference together." },
  },
  {
    id: "TEACH.LEGAL.ARBITRATION",
    skillId: "LEGAL.006",
    title: "Recognize the Dispute Process",
    notebookTitle: "Arbitration Clause",
    reminder: "Identify which disputes the clause covers, whether arbitration is stated as required or optional, and any exceptions. Understanding the clause is not legal advice about enforceability.",
    discoverTitle: "A dispute clause may specify a process outside ordinary court litigation",
    discoverBody: "Arbitration language can tell the reader where or how covered disputes are to be decided under the agreement.",
    explanation: "Find the dispute scope, the process word, modal words such as must/shall/may, and exceptions. Reading Detective explains the wording only and does not decide whether a particular arbitration provision is enforceable.",
    modelBody: "Except for claims eligible for small-claims court, disputes arising from this agreement shall be resolved by binding arbitration.",
    modelThinking: "The general dispute path is stated as binding arbitration, but the sentence also creates a small-claims exception. Both pieces matter.",
    together: { prompt: "What process does this clause state for covered disputes?", sourceBody: "Any billing dispute must be submitted to arbitration after the internal review process is completed.", choices: [["arbitration", "Arbitration after internal review"], ["automatic-court", "Automatic court trial before review"], ["none", "No dispute process is stated"]], correct: "arbitration", success: "You located the stated dispute path and sequence.", retry: "Find the process required after internal review." },
    supported: { prompt: "What changes the general arbitration rule?", sourceBody: "Disputes shall be arbitrated, except claims that qualify for small-claims court.", choices: [["exception", "Qualifying small-claims matters are an exception stated by the clause"], ["all", "Every dispute must be arbitrated with no exception"], ["optional", "Arbitration is described only as an optional suggestion"]], correct: "exception", success: "You preserved the stated exception.", retry: "Read the words after ‘except’ before deciding the scope." },
    independent: { prompt: "Interpret the modal language.", sourceBody: "The parties may agree in writing to mediate before arbitration.", choices: [["optional", "Written mediation is presented as an option the parties may agree to"], ["required", "Mediation is mandatory in every case"], ["barred", "Mediation is prohibited"]], correct: "optional", success: "Independent dispute-process reading logged.", retry: "The word ‘may’ matters here." },
    transfer: { prompt: "Transfer to service terms.", sourceBody: "Covered disputes are subject to binding arbitration unless the opt-out procedure in Section 12 was completed on time.", choices: [["conditional", "The stated arbitration rule has an opt-out exception tied to Section 12 timing"], ["absolute", "Arbitration applies with no possible exception"], ["court", "The clause guarantees a court trial"]], correct: "conditional", success: "Arbitration reading transferred with condition and cross-reference intact.", retry: "Track the general rule and the ‘unless’ exception together." },
  },
  {
    id: "TEACH.LEGAL.GOVERNING",
    skillId: "LEGAL.007",
    title: "Identify Governing-Law and Jurisdiction Language",
    notebookTitle: "Governing Law & Jurisdiction",
    reminder: "Identify what place or legal system the document names, what issue the clause says it governs, and whether a separate forum/jurisdiction clause names where disputes are handled.",
    discoverTitle: "Some clauses name the legal system or place connected to interpretation or disputes",
    discoverBody: "Governing-law and jurisdiction clauses can look like background fine print, but they can tell the reader which law the document says applies or where certain disputes are to be handled.",
    explanation: "Do not assume governing law and forum/jurisdiction always mean the same thing. Read the exact clause: one may identify the law used to interpret the agreement, while another may identify a court or place for covered proceedings. Reading Detective does not determine the clause's enforceability.",
    modelBody: "This agreement is governed by the laws of State A. Any court proceeding permitted under this agreement must be filed in County B, State A.",
    modelThinking: "The first sentence names the governing law. The second names a location for permitted court proceedings. They perform related but different jobs.",
    together: { prompt: "What does the first sentence identify?", sourceBody: "This agreement is governed by the laws of State C.", choices: [["law", "The legal system the agreement says governs it"], ["address", "The customer's mailing address"], ["price", "The contract price"]], correct: "law", success: "You identified the governing-law function.", retry: "Focus on the phrase ‘governed by the laws of’." },
    supported: { prompt: "Which clause is about where a permitted court case would be filed?", sourceBody: "Governing law: State D. Exclusive venue for permitted court proceedings: County E, State D.", choices: [["venue", "The venue sentence"], ["governing", "Only the governing-law label"], ["neither", "Neither sentence concerns location"]], correct: "venue", success: "You separated forum/venue from governing law.", retry: "Look for the sentence that names the place for court proceedings." },
    independent: { prompt: "Interpret the two functions independently.", sourceBody: "The agreement is governed by State F law. The parties consent to jurisdiction in the courts located in County G.", choices: [["different", "One sentence identifies governing law; the other identifies a stated court jurisdiction/location"], ["same", "Both sentences only define payment terms"], ["cancel", "Both sentences terminate the agreement"]], correct: "different", success: "Independent governing-law/jurisdiction reading logged.", retry: "Ask what job each sentence performs rather than treating them as synonyms." },
    transfer: { prompt: "Transfer to terms with an exception.", sourceBody: "These terms are governed by State H law, except where applicable consumer law requires otherwise.", choices: [["exception", "State H is the stated general rule, with an express consumer-law exception"], ["absolute", "No other law can ever matter"], ["none", "The document names no governing law"]], correct: "exception", success: "Governing-law reading transferred while preserving the stated exception.", retry: "Keep the general rule and the ‘except’ clause together." },
  },
];

export const highSchoolTeachingModules: Record<string, TeachingModule> = Object.fromEntries(
  specs.map((spec) => {
    const module = makeModule(spec);
    return [module.id, module];
  }),
);
