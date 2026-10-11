import type {
  PresentationStage,
  SkillId,
  TeachingModule,
  TeachingPracticeItem,
  TeachingPresentationVariant,
} from "../domain";

const choice = (id: string, label: string) => ({ id, label });

type ItemSpec = {
  prompt: string;
  sourceTitle?: string;
  sourceBody: string;
  choices: [string, string][];
  correct: string;
  success: string;
  retry: string;
};

type VariantSpec = {
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

type ModuleSpec = {
  id: string;
  skillId: SkillId;
  title: string;
  notebookTitle: string;
  reminder: string;
  investigator: VariantSpec;
  lead: VariantSpec;
};

function item(id: string, spec: ItemSpec): TeachingPracticeItem {
  return {
    id,
    prompt: spec.prompt,
    sourceTitle: spec.sourceTitle,
    sourceBody: spec.sourceBody,
    choices: spec.choices.map(([choiceId, label]) => choice(choiceId, label)),
    correctAnswerIds: [spec.correct],
    successMessage: spec.success,
    retryMessage: spec.retry,
  };
}

function variant(stage: PresentationStage, prefix: string, spec: VariantSpec): TeachingPresentationVariant {
  return {
    stage,
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
    stages: ["investigator", "lead-investigator"],
    notebookTool: { title: spec.notebookTitle, reminder: spec.reminder },
    variants: {
      investigator: variant("investigator", `${prefix}-jr`, spec.investigator),
      "lead-investigator": variant("lead-investigator", `${prefix}-lead`, spec.lead),
    },
  };
}

const specs: ModuleSpec[] = [
  {
    id: "TEACH.VOCAB.PREFIX",
    skillId: "VOCAB.003",
    title: "Use the Beginning Word Part",
    notebookTitle: "Prefix Clue",
    reminder: "Separate the prefix, recall its usual meaning, then test whether that meaning fits the whole word in context.",
    investigator: {
      discoverTitle: "The beginning of a word can carry meaning",
      discoverBody: "Words such as misread, preview, and rewrite contain meaningful parts before the base word.",
      explanation: "A prefix is added to the beginning of a base or root. It can change meaning. Use the part as a clue, then verify the result in the sentence.",
      modelBody: "The directions were misread, so the group went to the wrong room.",
      modelThinking: "mis- often signals wrong or incorrectly. mis + read fits the consequence: the directions were read incorrectly.",
      together: { prompt: "What does re- help you infer in rewrite?", sourceBody: "The editor asked the team to rewrite the opening paragraph.", choices: [["again", "write it again"], ["before", "write it before something"], ["not", "do not write it"]], correct: "again", success: "You used re- as a meaning clue and checked the sentence.", retry: "Separate re- from write and test the common meaning of re-." },
      supported: { prompt: "What does pre- suggest here?", sourceBody: "Students previewed the article before the discussion.", choices: [["before", "viewed it beforehand"], ["wrong", "viewed it incorrectly"], ["against", "argued against it"]], correct: "before", success: "You connected pre- with before.", retry: "Look at before the discussion and test the meaning of pre-." },
      independent: { prompt: "Infer the meaning of disconnect.", sourceBody: "Disconnect the charger before moving the equipment.", choices: [["separate", "separate the connection"], ["repeat", "connect again"], ["predict", "connect early"]], correct: "separate", success: "Independent prefix reasoning logged.", retry: "What does dis- do to the idea of connect here?" },
      transfer: { prompt: "Transfer the prefix strategy to a new word.", sourceBody: "The report described the original estimate as inaccurate.", choices: [["not-accurate", "not accurate"], ["very-accurate", "very accurate"], ["before-accurate", "accurate beforehand"]], correct: "not-accurate", success: "Prefix reasoning transferred to a new context.", retry: "Separate in- from accurate and use the sentence as a check." },
    },
    lead: {
      discoverTitle: "Morphology can unlock professional vocabulary",
      discoverBody: "Longer documents often use familiar bases with prefixes that narrow or reverse meaning.",
      explanation: "Treat a prefix as one evidence source, not a guaranteed definition. Separate it, infer a likely contribution, and verify against the sentence and document context.",
      modelBody: "The account was reactivated after identity verification.",
      modelThinking: "re- signals again. re + activated means activated again, which fits the event after verification.",
      together: { prompt: "What does non- contribute here?", sourceBody: "Nonrefundable charges remain due after cancellation.", choices: [["not", "not refundable"], ["again", "refunded again"], ["before", "refunded beforehand"]], correct: "not", success: "You used the prefix without changing the clause's scope.", retry: "Separate non- from refundable." },
      supported: { prompt: "Infer the word from its prefix.", sourceBody: "The inspection identified an unauthorized modification.", choices: [["not-authorized", "not authorized"], ["authorized-again", "authorized again"], ["authorized-before", "authorized in advance"]], correct: "not-authorized", success: "Prefix meaning confirmed in formal text.", retry: "What does un- contribute to authorized?" },
      independent: { prompt: "Interpret preapproval.", sourceBody: "Overtime requires preapproval from a supervisor.", choices: [["before", "approval obtained beforehand"], ["after", "approval obtained afterward"], ["optional", "approval is optional"]], correct: "before", success: "Independent morphology evidence logged.", retry: "Use pre- plus approval and the sentence requirement." },
      transfer: { prompt: "Transfer to a policy term.", sourceBody: "A misclassification may require payroll correction.", choices: [["wrong", "an incorrect classification"], ["new", "a new classification"], ["shared", "a shared classification"]], correct: "wrong", success: "Prefix analysis transferred to policy language.", retry: "Separate mis- from classification and test the result in context." },
    },
  },
  {
    id: "TEACH.VOCAB.SUFFIX",
    skillId: "VOCAB.004",
    title: "Use the Ending Word Part",
    notebookTitle: "Suffix Clue",
    reminder: "Notice the suffix, ask what it contributes to meaning or word function, and verify in the sentence.",
    investigator: {
      discoverTitle: "Word endings can change meaning or job",
      discoverBody: "Words such as helpful, careless, movement, and quickly use endings that contribute meaning or grammatical function.",
      explanation: "A suffix comes after a base or root. Some suffixes change meaning; others signal whether a word names a person, action, quality, or manner.",
      modelBody: "The instructions were readable even on a small screen.",
      modelThinking: "-able often signals capable of. readable means capable of being read, and that fits the sentence.",
      together: { prompt: "What does -less contribute to careless?", sourceBody: "A careless copy omitted the final sentence.", choices: [["without-care", "without enough care"], ["full-care", "full of care"], ["again", "care again"]], correct: "without-care", success: "You used -less as a meaning clue.", retry: "Think about the common contribution of -less." },
      supported: { prompt: "What does -er signal in reporter here?", sourceBody: "The reporter interviewed both teams.", choices: [["person", "a person who reports"], ["place", "a place for reports"], ["time", "a time to report"]], correct: "person", success: "You used the suffix to identify word function.", retry: "Who performs the action report?" },
      independent: { prompt: "Infer the function of quickly.", sourceBody: "The message spread quickly through the group chat.", choices: [["manner", "it tells how the message spread"], ["person", "it names a person"], ["object", "it names an object"]], correct: "manner", success: "Independent suffix reasoning logged.", retry: "What does -ly help this word do in the sentence?" },
      transfer: { prompt: "Transfer to a new academic word.", sourceBody: "The expansion changed traffic patterns near the school.", choices: [["process", "expansion names a process or result of expanding"], ["person", "expansion names a person"], ["opposite", "expansion means not expanding"]], correct: "process", success: "Suffix strategy transferred.", retry: "Use the base expand and the noun-forming ending." },
    },
    lead: {
      discoverTitle: "Suffixes reveal both meaning and function",
      discoverBody: "Formal text often packs information into nouns, adjectives, and adverbs built from recognizable bases.",
      explanation: "Use suffixes to identify what kind of concept the word expresses, then read the full clause before deciding its exact meaning.",
      modelBody: "The cancellation becomes effective on the date shown below.",
      modelThinking: "-tion helps turn cancel into the noun cancellation—the act or result of canceling. I still use the clause to determine timing.",
      together: { prompt: "What does -ment help settlement name?", sourceBody: "The parties reached a settlement before the hearing.", choices: [["result", "a result or arrangement reached"], ["person", "a person who settles"], ["manner", "how something settles"]], correct: "result", success: "You used the suffix to identify the noun concept.", retry: "Start with settle and notice the noun-forming ending." },
      supported: { prompt: "What does -able suggest?", sourceBody: "The fee is payable on the first business day of each month.", choices: [["can-must-be-paid", "capable or required to be paid in this context"], ["already-paid", "already paid"], ["never-paid", "not payable"]], correct: "can-must-be-paid", success: "You used morphology while keeping the clause context.", retry: "Combine pay with -able, then read how the sentence uses the result." },
      independent: { prompt: "Interpret periodically.", sourceBody: "Security credentials are reviewed periodically.", choices: [["intervals", "at intervals from time to time"], ["once", "only once"], ["never", "not reviewed"]], correct: "intervals", success: "Independent suffix reasoning logged.", retry: "Use period + -ic + -ally as clues, then check the sentence." },
      transfer: { prompt: "Transfer to technical language.", sourceBody: "The device requires calibration before use.", choices: [["process", "calibration names the process of calibrating"], ["person", "calibration names a technician"], ["warning", "calibration means a warning"]], correct: "process", success: "Suffix reasoning transferred to technical text.", retry: "Use the base calibrate and the noun-forming ending." },
    },
  },
  {
    id: "TEACH.VOCAB.ROOTS",
    skillId: "VOCAB.005",
    title: "Find the Meaningful Root",
    notebookTitle: "Root & Word Family",
    reminder: "Find a meaningful root or related word, combine it with other word parts, then verify the meaning in context.",
    investigator: {
      discoverTitle: "Related words share meaning clues",
      discoverBody: "Predict, prediction, and predictable are connected. Recognizing the shared root reduces how much of a long word is truly unfamiliar.",
      explanation: "A root or base carries core meaning. Related prefixes and suffixes modify that meaning. Build the likely meaning from parts, then test it against the sentence.",
      modelBody: "The outcome was predictable after the same pattern occurred three times.",
      modelThinking: "predict is the familiar base. -able means capable of. predictable means capable of being predicted, which fits the repeated pattern.",
      together: { prompt: "Use the word family to infer disagreement.", sourceBody: "The teams agree on the date but have a disagreement about the location.", choices: [["not-agree", "a lack of agreement"], ["same", "complete agreement"], ["schedule", "a schedule change"]], correct: "not-agree", success: "You used agree as the meaning anchor.", retry: "Find the familiar base agree inside disagreement." },
      supported: { prompt: "What does transportation most likely relate to?", sourceBody: "Transportation problems delayed several students who normally take the bus.", choices: [["move", "moving people or things from place to place"], ["write", "writing a report"], ["argue", "disagreeing"]], correct: "move", success: "You connected the longer word to its meaning family and context.", retry: "Use transport as the core clue and check the bus context." },
      independent: { prompt: "Infer reconsidered.", sourceBody: "After reading the new evidence, the committee reconsidered its decision.", choices: [["think-again", "considered the decision again"], ["ignored", "ignored the decision"], ["copied", "copied the decision"]], correct: "think-again", success: "Independent root-family reasoning logged.", retry: "Find consider inside reconsidered and account for re-." },
      transfer: { prompt: "Transfer to a new academic term.", sourceBody: "The two reports contain contradictory descriptions of the same event.", choices: [["conflict", "descriptions that conflict with one another"], ["identical", "descriptions that are identical"], ["missing", "descriptions that are missing"]], correct: "conflict", success: "Root and context reasoning transferred.", retry: "Connect contradict with the idea that the descriptions do not agree." },
    },
    lead: {
      discoverTitle: "Long words often contain familiar meaning machinery",
      discoverBody: "Legal, technical, and workplace vocabulary becomes more manageable when you identify roots and related word families.",
      explanation: "Do not pronounce-and-guess. Identify a known root or base, account for attached parts, and confirm the interpretation in the sentence or defined terms.",
      modelBody: "The contract permits modification only with written approval.",
      modelThinking: "modify and modification are in the same family. The sentence tells me modification means a change to the contract.",
      together: { prompt: "Use the word family to interpret notification.", sourceBody: "Notification must be sent before the deadline.", choices: [["notice", "the act or result of notifying"], ["payment", "the act of paying"], ["inspection", "the act of inspecting"]], correct: "notice", success: "You linked notification to notify.", retry: "Find notify inside the word family." },
      supported: { prompt: "Infer authorization.", sourceBody: "No payment may be processed without authorization from the account holder.", choices: [["permission", "formal permission or approval"], ["cancellation", "ending the account"], ["delivery", "sending the payment"]], correct: "permission", success: "Word-family reasoning confirmed.", retry: "Connect authorization to authorize, then verify against without authorization." },
      independent: { prompt: "Interpret contractual.", sourceBody: "The notice describes the contractual duties of both parties.", choices: [["agreement-related", "related to the contract or agreement"], ["criminal", "related to a crime"], ["optional", "unrelated to obligations"]], correct: "agreement-related", success: "Independent root reasoning logged.", retry: "Find contract inside contractual." },
      transfer: { prompt: "Transfer to technical documentation.", sourceBody: "The technician documented the malfunction before replacing the component.", choices: [["failure", "a failure to function correctly"], ["success", "successful operation"], ["schedule", "a planned meeting"]], correct: "failure", success: "Root and affix analysis transferred to technical vocabulary.", retry: "Use function inside malfunction and account for mal-." },
    },
  },
  {
    id: "TEACH.EVID.RELEVANCE",
    skillId: "EVID.002",
    title: "Use Evidence That Answers the Question",
    notebookTitle: "Relevant Evidence",
    reminder: "Ask what the question needs. Keep evidence that directly helps answer it; set aside facts that are merely related or interesting.",
    investigator: {
      discoverTitle: "Not every true detail is useful evidence",
      discoverBody: "A fact can be accurate and still fail to answer the question you are investigating.",
      explanation: "Relevant evidence bears directly on the question. First define what you need to know, then judge each clue by whether it helps establish that point.",
      modelBody: "Question: Did the meeting begin late? Clue A: The room holds 200 people. Clue B: The agenda says 3:00; the timestamped video begins at 3:18.",
      modelThinking: "Room capacity is unrelated to start time. The agenda and timestamp directly address whether the meeting began late.",
      together: { prompt: "Which clue is most relevant to whether the bus arrived at 4:10?", sourceBody: "Clue A: The bus is blue. Clue B: The transit log records arrival at 4:10.", choices: [["log", "The transit log"], ["blue", "The bus color"], ["both", "Both equally"]], correct: "log", success: "You matched the evidence to the actual question.", retry: "Which clue directly addresses arrival time?" },
      supported: { prompt: "Which detail should be set aside?", sourceBody: "Question: Was the assignment submitted? The portal shows ‘submitted 8:42 PM.’ The assignment has a blue cover page.", choices: [["cover", "The blue cover page"], ["portal", "The portal submission record"], ["none", "Both are equally relevant"]], correct: "cover", success: "You separated a related detail from useful evidence.", retry: "The question is about submission, not appearance." },
      independent: { prompt: "Choose the evidence that directly answers the question.", sourceBody: "Question: Did the event move indoors? A weather post predicts rain. The organizer notice says: ‘Tonight's event will be held in the gym.’", choices: [["notice", "Organizer notice"], ["weather", "Weather prediction"], ["either", "Either one proves it"]], correct: "notice", success: "Independent relevance judgment logged.", retry: "Which source actually states the event location?" },
      transfer: { prompt: "Transfer relevance to a purchase claim.", sourceBody: "Question: Is the warranty still active? The receipt shows purchase date. A review says the product looks good. The warranty lasts one year.", choices: [["receipt-warranty", "Purchase date plus warranty duration"], ["review", "Product review"], ["appearance", "How the product looks"]], correct: "receipt-warranty", success: "Evidence relevance transferred to a new context.", retry: "What information lets you determine whether the one-year period has ended?" },
    },
    lead: {
      discoverTitle: "Professional documents contain plenty of irrelevant detail",
      discoverBody: "Efficient readers identify the decision question first, then locate evidence that actually bears on it.",
      explanation: "Relevance is question-specific. A document can contain accurate facts that do not support the conclusion currently under review.",
      modelBody: "Question: Was notice timely? The contract has 22 pages. The notice was sent May 3. The clause requires notice by May 5.",
      modelThinking: "Page count is irrelevant. The sent date and deadline directly determine timeliness.",
      together: { prompt: "Which information matters to eligibility?", sourceBody: "Policy: Applicants must hold a current license. Applicant record: license active through December. Resume uses a modern template.", choices: [["license", "The license status"], ["template", "The resume template"], ["both", "Both equally"]], correct: "license", success: "You focused on the criterion that controls the question.", retry: "Eligibility depends on which stated requirement?" },
      supported: { prompt: "Set aside the irrelevant detail.", sourceBody: "Question: Was payment late? Invoice due June 1; payment posted June 4; invoice logo is green.", choices: [["logo", "Logo color"], ["dates", "Due and posted dates"], ["none", "All details are equally useful"]], correct: "logo", success: "Relevant evidence isolated.", retry: "Which detail has no bearing on whether the deadline was missed?" },
      independent: { prompt: "Identify the evidence that bears on the clause.", sourceBody: "Question: Can the customer cancel today without penalty? Cancellation clause requires 48 hours' notice. Service begins tomorrow. The company opened in 2012.", choices: [["timing", "The 48-hour rule plus tomorrow's service date"], ["history", "The company's founding year"], ["both", "Both are necessary"]], correct: "timing", success: "Independent relevance analysis logged.", retry: "Use the facts that control the cancellation condition." },
      transfer: { prompt: "Transfer to a source packet.", sourceBody: "Question: Did inspectors find a violation? A company ad lists awards. An inspection report states ‘violation observed.’", choices: [["report", "Inspection report"], ["ad", "Company awards"], ["both", "Both establish the violation"]], correct: "report", success: "Relevance judgment transferred to source evaluation.", retry: "Which evidence directly answers what inspectors found?" },
    },
  },
  {
    id: "TEACH.EVID.STRENGTH",
    skillId: "EVID.003",
    title: "Compare How Strongly Evidence Supports a Claim",
    notebookTitle: "Evidence Strength",
    reminder: "Compare directness, specificity, method, and connection to the claim. Popularity or appearance is not automatically strong evidence.",
    investigator: {
      discoverTitle: "Relevant evidence can still vary in strength",
      discoverBody: "Two clues may both relate to a claim, but one may support it much more directly.",
      explanation: "Stronger evidence has a clearer connection to the claim and usually tells us how the information was observed or measured. Weak evidence may be indirect, vague, or based on one person's impression.",
      modelBody: "Claim: The tutoring program improved attendance. Evidence A: A student says it felt helpful. Evidence B: Attendance records rose from 82% to 91% after enrollment for the same group.",
      modelThinking: "Both are related, but the attendance records directly measure the claimed outcome and are stronger for this question.",
      together: { prompt: "Which is stronger evidence that a game update reduced crashes?", sourceBody: "A: ‘It seems smoother to me.’ B: Error logs show crash rate fell from 8% to 2% after the update.", choices: [["logs", "Error logs"], ["impression", "One player's impression"], ["equal", "They are equally strong"]], correct: "logs", success: "You compared evidence by connection and measurement.", retry: "Which clue directly measures crash frequency?" },
      supported: { prompt: "Which evidence is weaker for the claim?", sourceBody: "Claim: The cafeteria line is shorter. A timed sample shows average wait fell by four minutes. A poster says ‘New and Improved!’", choices: [["poster", "The poster"], ["timed", "The timed sample"], ["same", "Both are equally strong"]], correct: "poster", success: "You recognized promotional language as weaker evidence for wait time.", retry: "Which item actually measures the claimed outcome?" },
      independent: { prompt: "Choose the stronger support.", sourceBody: "Claim: The new route gets students home earlier. A: three timestamped route records. B: one comment saying ‘I like it.’", choices: [["records", "Timestamped route records"], ["comment", "One comment"], ["same", "Equal strength"]], correct: "records", success: "Independent evidence-strength judgment logged.", retry: "Which evidence is more direct and specific to arrival time?" },
      transfer: { prompt: "Transfer to a product claim.", sourceBody: "Claim: The bottle keeps drinks cold for 12 hours. A lab test records temperature over 12 hours; an influencer says the bottle looks premium.", choices: [["test", "Temperature test"], ["looks", "Influencer comment about appearance"], ["both", "Both equally"]], correct: "test", success: "Evidence-strength reasoning transferred.", retry: "Which clue measures the specific 12-hour temperature claim?" },
    },
    lead: {
      discoverTitle: "Evidence quality is not the same as confidence or polish",
      discoverBody: "Professional claims can be supported by data, records, observation, anecdotes, or marketing. These do not carry equal weight for every question.",
      explanation: "Compare directness, specificity, method, sample, and how closely the evidence matches the actual claim. Strong presentation is not a substitute for strong support.",
      modelBody: "Claim: A process cut defects in half. A brochure says ‘industry-leading.’ Production records show defects fell from 40 to 19 per 1,000 units across six months.",
      modelThinking: "The records measure the exact outcome over time. The brochure's wording does not establish the numerical claim.",
      together: { prompt: "Which evidence more strongly supports the claim?", sourceBody: "Claim: Training reduced incidents. A: incident records before and after training. B: a manager says the training was impressive.", choices: [["records", "Incident records"], ["manager", "Manager impression"], ["equal", "Equal strength"]], correct: "records", success: "You prioritized evidence that measures the claimed result.", retry: "Which source directly compares incident outcomes?" },
      supported: { prompt: "Which evidence is limited?", sourceBody: "Claim: A policy improves retention. A survey of five volunteers says they like it; HR records cover 2,000 employees over two years.", choices: [["five", "Survey of five volunteers"], ["records", "HR records"], ["same", "Both are equally informative"]], correct: "five", success: "You considered breadth and method, not just relevance.", retry: "Compare the amount and kind of evidence collected." },
      independent: { prompt: "Select stronger evidence for the exact claim.", sourceBody: "Claim: The software completes the task in under 30 seconds. A benchmark logs 24–27 seconds over 100 runs. A testimonial says it feels fast.", choices: [["benchmark", "Benchmark logs"], ["testimonial", "Testimonial"], ["same", "Equal support"]], correct: "benchmark", success: "Independent evidence-quality analysis logged.", retry: "Which evidence measures the exact time claim repeatedly?" },
      transfer: { prompt: "Transfer to research language.", sourceBody: "Claim: A method improves one attention task. A controlled comparison measures that task; a headline says it ‘boosts intelligence.’", choices: [["controlled", "Controlled comparison for the measured task"], ["headline", "Headline language"], ["headline-stronger", "Headline is stronger because it sounds certain"]], correct: "controlled", success: "Evidence-quality reasoning transferred to research claims.", retry: "Use the evidence that matches what was actually measured." },
    },
  },
  {
    id: "TEACH.EVID.ASSUMPTION",
    skillId: "EVID.004",
    title: "Separate Evidence From Assumption",
    notebookTitle: "Evidence vs. Assumption",
    reminder: "State what the source establishes, then label anything extra as inference, possibility, or unsupported assumption.",
    investigator: {
      discoverTitle: "A plausible answer can still go beyond the text",
      discoverBody: "Good readers notice the boundary between what a clue says and what they are adding from their own expectations.",
      explanation: "Evidence comes from the case. An inference combines evidence with reasonable knowledge. An assumption adds something the evidence does not support. Keep those categories separate.",
      modelBody: "The sidewalk is wet and several students carry umbrellas.",
      modelThinking: "Rain is a reasonable inference, but the sentence never directly says it rained. I should not call rain an explicit fact.",
      together: { prompt: "Which conclusion stays inside the evidence?", sourceBody: "A student with a blue backpack left Room 214. The witness did not see where the backpack went afterward.", choices: [["left", "A student with a blue backpack left Room 214"], ["owner", "That student definitely owns the backpack"], ["stolen", "The backpack was stolen"]], correct: "left", success: "You stopped at what the source actually establishes.", retry: "Which statement is directly supported without adding a new fact?" },
      supported: { prompt: "What is only possible, not proven?", sourceBody: "The lights are off and the door is locked. No closing time is posted.", choices: [["closed", "The business may be closed"], ["definite", "The business is definitely closed for the day"], ["owner", "The owner left town"]], correct: "closed", success: "You calibrated the conclusion to the evidence.", retry: "Choose the statement that leaves room for another explanation." },
      independent: { prompt: "Identify the unsupported assumption.", sourceBody: "The school added an extra bus on Friday. The notice does not explain why.", choices: [["traffic", "The bus was added because traffic was worse"], ["extra", "An extra bus was added Friday"], ["unknown", "The reason is not stated"]], correct: "traffic", success: "Independent evidence-boundary reasoning logged.", retry: "Which statement invents a reason the notice never gives?" },
      transfer: { prompt: "Transfer to a media post.", sourceBody: "A post says a store is ‘changing operations next month.’ It does not say the store is closing.", choices: [["not-proven", "Closure is not established by this wording"], ["closing", "The store is definitely closing"], ["sold", "The company has been sold"]], correct: "not-proven", success: "Evidence-vs-assumption reasoning transferred.", retry: "Do not convert vague change language into a stronger claim." },
    },
    lead: {
      discoverTitle: "Decision errors often begin where the document ends",
      discoverBody: "A reader can understand every sentence and still overstate what the evidence proves.",
      explanation: "Separate explicit terms, supported inference, plausible possibility, and unsupported assumption. Professional reading requires matching conclusion strength to evidence strength.",
      modelBody: "The employer may approve remote work after review.",
      modelThinking: "The policy establishes that approval is possible after review. It does not guarantee approval or explain the review outcome.",
      together: { prompt: "Which statement is justified?", sourceBody: "The company says it intends to open a second location, subject to permit approval.", choices: [["intends", "The company intends to open a location if approval is obtained"], ["open", "The second location is definitely opening"], ["approved", "The permit has already been approved"]], correct: "intends", success: "You preserved the condition and uncertainty.", retry: "Do not turn intent plus a condition into a completed outcome." },
      supported: { prompt: "Identify the assumption.", sourceBody: "The report notes lower sales in June but gives no cause.", choices: [["economy", "Sales fell because of the economy"], ["lower", "June sales were lower"], ["cause-unknown", "The cause is not established"]], correct: "economy", success: "Unsupported causal assumption identified.", retry: "Which answer supplies a cause the report never gives?" },
      independent: { prompt: "Calibrate the conclusion.", sourceBody: "A study found an association between two variables but did not test causation.", choices: [["association", "The variables were associated in this study"], ["caused", "One variable caused the other"], ["guarantee", "The result guarantees the same outcome for everyone"]], correct: "association", success: "Independent evidence-boundary judgment logged.", retry: "Use the study's stated scope rather than a stronger causal claim." },
      transfer: { prompt: "Transfer to contract interpretation.", sourceBody: "The customer may request a refund. The clause does not state that every request is approved.", choices: [["request", "The customer has permission to request a refund"], ["guaranteed", "The customer is guaranteed a refund"], ["paid", "The refund has already been paid"]], correct: "request", success: "Evidence-versus-assumption reasoning transferred to agreement language.", retry: "Distinguish permission to request from guaranteed outcome." },
    },
  },
  {
    id: "TEACH.SOURCE.IDENTIFY",
    skillId: "SOURCE.001",
    title: "Identify Who Produced the Information",
    notebookTitle: "Source Identity",
    reminder: "Name the actual creator or origin of the information. A person repeating a claim is not necessarily the original source.",
    investigator: {
      discoverTitle: "Every clue comes from somewhere",
      discoverBody: "A screenshot, message, notice, and article may all repeat the same words while coming from different origins.",
      explanation: "Identify who created the source you are reading and, when possible, where the information originally came from. This is source identity, not yet a judgment about truth.",
      modelBody: "Student post: ‘The Activities Office says ticket sales begin Monday.’",
      modelThinking: "The student created this post, but the claimed information is attributed to the Activities Office. I keep creator and claimed origin separate.",
      together: { prompt: "Who produced the official schedule?", sourceBody: "Header: Activities Office — Fall Event Schedule", choices: [["office", "Activities Office"], ["student", "A student"], ["unknown", "Unknown"]], correct: "office", success: "You identified the source from its own label.", retry: "Look at the organization named as the creator." },
      supported: { prompt: "Who created this message?", sourceBody: "Group chat: ‘My cousin said the dance was canceled.’", choices: [["chat-user", "The group-chat user"], ["cousin", "The cousin definitely created this message"], ["office", "Activities Office"]], correct: "chat-user", success: "You separated the message creator from the person being quoted.", retry: "Who actually posted the words you are viewing?" },
      independent: { prompt: "Identify the original source named in the repost.", sourceBody: "Repost: ‘According to the transit agency, Route 8 will end service at 9 PM.’", choices: [["agency", "Transit agency"], ["reposter", "Only the reposter"], ["driver", "A driver"]], correct: "agency", success: "Independent source-origin reasoning logged.", retry: "The repost tells you where its information claims to originate." },
      transfer: { prompt: "Transfer to a screenshot citation.", sourceBody: "Screenshot footer: City Health Department — Inspection Results", choices: [["health", "City Health Department"], ["screenshot", "The screenshot itself is the creator"], ["store", "The inspected store"]], correct: "health", success: "Source identification transferred to a new format.", retry: "Use the creator named in the document footer." },
    },
    lead: {
      discoverTitle: "Origin and messenger are different questions",
      discoverBody: "Professional analysis tracks the creator of the item, the origin of any quoted claim, and whether the current item is original, summarized, or reposted.",
      explanation: "Identify the source origin before evaluating usefulness. A repost can be accurate, but it does not become an independent source merely because a new account repeated it.",
      modelBody: "Industry newsletter: ‘The regulator reported 14 violations.’",
      modelThinking: "The newsletter created this summary; the underlying violation count is attributed to the regulator. I record both layers.",
      together: { prompt: "What is the underlying source for the number?", sourceBody: "News brief: ‘According to the quarterly filing, revenue fell 4%.’", choices: [["filing", "Quarterly filing"], ["brief", "Only the news brief"], ["reader", "The reader"]], correct: "filing", success: "You traced the claim to its stated origin.", retry: "Look for the document the brief says the number came from." },
      supported: { prompt: "Which item is the original policy source?", sourceBody: "A blog quotes one paragraph from the Employee Handbook. The handbook is linked below.", choices: [["handbook", "Employee Handbook"], ["blog", "Blog post"], ["quote", "The quotation marks"]], correct: "handbook", success: "Original source identified.", retry: "Which document actually contains the policy?" },
      independent: { prompt: "Separate creator from quoted origin.", sourceBody: "Consultant memo: ‘OSHA guidance recommends…’", choices: [["memo-osha", "The consultant wrote the memo; OSHA is the cited origin of the guidance"], ["osha-memo", "OSHA wrote the consultant memo"], ["same", "Creator and cited origin are always the same"]], correct: "memo-osha", success: "Independent provenance reasoning logged.", retry: "Track who authored the memo and who is being cited." },
      transfer: { prompt: "Transfer to a reposted chart.", sourceBody: "A social account reposts a chart labeled ‘Source: State Labor Department.’", choices: [["labor", "The chart data is attributed to the State Labor Department"], ["social", "The social account becomes the original data source"], ["unknown", "No source is named"]], correct: "labor", success: "Source-origin analysis transferred to a digital repost.", retry: "The repost is a messenger; read the chart's source line." },
    },
  },
  {
    id: "TEACH.SOURCE.PURPOSE",
    skillId: "SOURCE.002",
    title: "Identify What the Source Is Trying to Do",
    notebookTitle: "Source Purpose",
    reminder: "Ask what the source wants the reader to know, believe, do, buy, follow, or record. A source can have more than one purpose.",
    investigator: {
      discoverTitle: "Sources are created for reasons",
      discoverBody: "A notice, advertisement, news report, tutorial, and personal post may discuss the same topic for different purposes.",
      explanation: "Source purpose helps explain wording and emphasis. Identifying purpose does not automatically prove a source true or false.",
      modelBody: "Advertisement: ‘Join today and unlock premium study tools!’",
      modelThinking: "The source gives information, but its main purpose is to persuade the reader to join or buy.",
      together: { prompt: "What is this source mainly trying to do?", sourceBody: "Safety notice: ‘Wear eye protection before operating the machine.’", choices: [["instruct", "Instruct the reader what to do"], ["sell", "Sell eye protection"], ["entertain", "Entertain"]], correct: "instruct", success: "You identified the source's functional purpose.", retry: "What action is the source directing the reader to take?" },
      supported: { prompt: "What is the main purpose?", sourceBody: "Event flyer: ‘Tickets on sale now — limited seats available.’", choices: [["persuade", "Persuade people to buy tickets"], ["record", "Create a neutral attendance record"], ["investigate", "Investigate a dispute"]], correct: "persuade", success: "Purpose identified from wording and context.", retry: "What does the flyer want the reader to do?" },
      independent: { prompt: "Identify the main purpose independently.", sourceBody: "School report: ‘Attendance was 91.4% in September, compared with 89.8% last year.’", choices: [["document", "Document/report measured information"], ["sell", "Sell a product"], ["invite", "Invite people to an event"]], correct: "document", success: "Independent source-purpose evidence logged.", retry: "Is the source recording information, selling, or directing action?" },
      transfer: { prompt: "Transfer to a mixed-purpose source.", sourceBody: "Museum page: ‘The exhibit opens Saturday. Reserve your ticket today.’", choices: [["inform-persuade", "Inform about the opening and persuade visitors to reserve"], ["only-record", "Only create a historical record"], ["warn", "Issue a safety warning"]], correct: "inform-persuade", success: "You recognized that sources can have more than one purpose.", retry: "Notice both the factual opening information and the call to action." },
    },
    lead: {
      discoverTitle: "Purpose helps explain framing",
      discoverBody: "An internal report, advertisement, legal notice, public statement, and news analysis can use overlapping facts for different goals.",
      explanation: "Identify the source's functional purpose before judging how to use it. Purpose can shape selection and emphasis without making every statement false.",
      modelBody: "Company landing page: ‘Our platform reduces administrative burden. Request a demo.’",
      modelThinking: "The page presents information but is also marketing: it wants the reader to request a demo and become a customer.",
      together: { prompt: "What is the source primarily doing?", sourceBody: "Incident log: ‘10:42 — alarm activated; 10:44 — building cleared.’", choices: [["document", "Document events and times"], ["sell", "Sell an alarm"], ["persuade", "Persuade readers to support a policy"]], correct: "document", success: "You identified the record-keeping purpose.", retry: "What job does a timestamped incident log perform?" },
      supported: { prompt: "Identify the source's purpose.", sourceBody: "Terms page: ‘By creating an account, you agree to the following conditions.’", choices: [["set-terms", "State conditions governing use"], ["entertain", "Entertain the user"], ["news", "Report breaking news"]], correct: "set-terms", success: "Purpose recognized in agreement language.", retry: "What is the document establishing for the user?" },
      independent: { prompt: "Identify the purpose independently.", sourceBody: "Press release: ‘The company today announced a new manufacturing facility.’", choices: [["announce-frame", "Announce and frame company news for the public"], ["audit", "Independently audit the company"], ["court", "Issue a court ruling"]], correct: "announce-frame", success: "Independent purpose analysis logged.", retry: "Who is communicating and what outcome does a press release serve?" },
      transfer: { prompt: "Transfer to an expert commentary.", sourceBody: "Opinion column: ‘The city should reject the proposal because…’", choices: [["argue", "Argue for a position"], ["neutral-log", "Create a neutral event log"], ["instruction", "Give equipment instructions"]], correct: "argue", success: "Source-purpose reasoning transferred to commentary.", retry: "What does should signal about the writer's purpose?" },
    },
  },
  {
    id: "TEACH.SOURCE.CORROBORATION",
    skillId: "SOURCE.003",
    title: "Check Whether Independent Sources Agree",
    notebookTitle: "Corroboration",
    reminder: "Compare claims across independent source origins. Reposts of the same origin do not create new independent confirmation.",
    investigator: {
      discoverTitle: "Two messages are not always two sources",
      discoverBody: "If three people repeat one rumor, you may still have only one underlying origin. Corroboration asks whether independent evidence agrees.",
      explanation: "First identify each source's origin. Then compare the specific claim. Independent agreement strengthens support; conflicting independent evidence keeps the claim disputed.",
      modelBody: "Post A quotes the Activities Office. Post B screenshots Post A. The Activities Office notice itself says the same thing.",
      modelThinking: "The screenshot and repost trace to the same origin. They do not count as separate independent confirmation of the office notice.",
      together: { prompt: "Which pair gives independent support?", sourceBody: "A student repeats a coach's message. Another student reposts it. A timestamped facility log independently records the same closing time.", choices: [["coach-log", "Coach-origin message + facility log"], ["student-repost", "Student message + repost of that message"], ["repost-only", "Two copies of the same repost"]], correct: "coach-log", success: "You distinguished repetition from independent corroboration.", retry: "Which two clues come from different underlying origins?" },
      supported: { prompt: "Is this independently corroborated?", sourceBody: "Three accounts share the same screenshot from one anonymous post. No other source confirms it.", choices: [["no", "No — multiple shares still trace to one origin"], ["yes", "Yes — three shares equal three confirmations"], ["certain", "It is confirmed because it is popular"]], correct: "no", success: "You tracked the information back to one origin.", retry: "Count independent origins, not copies." },
      independent: { prompt: "Classify the source agreement.", sourceBody: "Official notice: event begins 7:00. Independent venue calendar: 7:00. One personal post says 6:30.", choices: [["mixed", "Two independent sources support 7:00 while one source conflicts"], ["all-agree", "All sources agree"], ["post-wins", "The personal post automatically controls"]], correct: "mixed", success: "Independent corroboration and conflict both recognized.", retry: "Compare each source's claim rather than choosing by format alone." },
      transfer: { prompt: "Transfer to an incident case.", sourceBody: "A witness reports the alarm at 10:42. The system log independently records 10:42. A repost repeats the witness statement.", choices: [["corroborated", "The 10:42 time has two independent supporting origins"], ["three", "There are three independent origins"], ["none", "No source supports the time"]], correct: "corroborated", success: "Corroboration reasoning transferred to a new case.", retry: "Treat the repost as dependent on the witness, then count the system log separately." },
    },
    lead: {
      discoverTitle: "Corroboration is about independent origin, not volume",
      discoverBody: "A claim repeated across many outlets can still trace to one press release, one witness, or one dataset.",
      explanation: "Track provenance before counting agreement. Independent corroboration means separately sourced evidence converges on the same point. It does not guarantee universal truth; it strengthens support within the available record.",
      modelBody: "Five articles cite the same agency filing. A separate audit independently reaches the same count.",
      modelThinking: "The five articles form one origin chain for the count. The independent audit creates a second origin, so the figure has independent corroboration.",
      together: { prompt: "How many independent origins support the figure?", sourceBody: "Press release states 120 units. Two blogs quote the press release. Warehouse record independently shows 121 units.", choices: [["two", "Two independent origins"], ["four", "Four independent origins"], ["one", "One origin only"]], correct: "two", success: "You counted provenance, not publication count.", retry: "Group the blogs with the press release they depend on." },
      supported: { prompt: "What is the correct status?", sourceBody: "Regulator report says 14 violations. Company statement says 3. News stories separately quote both documents.", choices: [["disputed", "Disputed — independent primary sources conflict"], ["corroborated", "Corroborated because many news stories exist"], ["company", "Company statement automatically controls"]], correct: "disputed", success: "You kept a genuine source conflict unresolved.", retry: "The news stories repeat the two conflicting underlying documents." },
      independent: { prompt: "Evaluate the corroboration independently.", sourceBody: "A research paper reports a result. A press release and ten posts all cite that paper. No independent replication is provided.", choices: [["single-origin", "Single-origin support, not independent replication"], ["many", "Twelve independent confirmations"], ["false", "The result is automatically false"]], correct: "single-origin", success: "Independent provenance analysis logged.", retry: "Count the underlying study once, regardless of how often it is repeated." },
      transfer: { prompt: "Transfer to a workplace investigation.", sourceBody: "Employee account and access-control log independently place the employee in the room at 8:12. A manager's email quotes the employee account.", choices: [["two", "Two independent origins support presence at 8:12"], ["three", "Three independent origins"], ["none", "No corroboration"]], correct: "two", success: "Corroboration reasoning transferred to workplace evidence.", retry: "Separate the employee account from the independent access log; the manager email depends on the account." },
    },
  },
  {
    id: "TEACH.SOURCE.PERSPECTIVE",
    skillId: "SOURCE.004",
    title: "Account for Perspective Without Declaring a Source False",
    notebookTitle: "Perspective & Bias",
    reminder: "Ask what the source could observe, what interests or goals may shape emphasis, and what other evidence is needed. Perspective is not automatic proof of falsehood.",
    investigator: {
      discoverTitle: "People can describe the same event differently",
      discoverBody: "Position, experience, goals, and what someone could actually see affect which details they notice and emphasize.",
      explanation: "Perspective helps explain differences between accounts. Bias can influence selection or framing, but you still evaluate each specific claim against evidence instead of discarding the entire source.",
      modelBody: "Player: ‘The call changed the game.’ Referee: ‘The call followed the rule.’ Spectator: ‘I could not see the contact.’",
      modelThinking: "Each source occupies a different position. I compare what each could know and seek evidence about the actual call instead of deciding that one role is automatically truthful or dishonest.",
      together: { prompt: "What is the best reading move?", sourceBody: "A club organizer says the event was a success. The organizer helped plan it.", choices: [["context", "Note the organizer's role and check specific claims against other evidence"], ["false", "Assume everything is false"], ["true", "Assume everything is true because the organizer was there"]], correct: "context", success: "You used perspective as context rather than a shortcut verdict.", retry: "Role matters, but it does not settle every claim by itself." },
      supported: { prompt: "Which question matters most?", sourceBody: "A student says, ‘The hallway was packed,’ but viewed it from one doorway.", choices: [["view", "What could the student actually see from that position?"], ["honesty", "Is the student automatically lying?"], ["grade", "What grade is the student in?"]], correct: "view", success: "You connected perspective to observation limits.", retry: "Ask what the source was positioned to observe." },
      independent: { prompt: "Interpret the source carefully.", sourceBody: "A product maker describes its own product as ‘the best value.’", choices: [["interest", "The maker has an interest in positive framing; verify the value claim with relevant evidence"], ["false", "Every factual statement from the maker is false"], ["proof", "The phrase proves best value"]], correct: "interest", success: "Independent perspective analysis logged.", retry: "Recognize the interest without turning it into an automatic truth verdict." },
      transfer: { prompt: "Transfer to two witness accounts.", sourceBody: "Witness A saw the beginning of the argument. Witness B arrived later and saw only the ending.", choices: [["different-access", "Their accounts may differ because they observed different portions"], ["one-liar", "One must be lying"], ["same", "They necessarily had identical information"]], correct: "different-access", success: "Perspective reasoning transferred to conflicting accounts.", retry: "Compare what each witness was present to observe." },
    },
    lead: {
      discoverTitle: "Interest, expertise, and truth are separate dimensions",
      discoverBody: "A source can be knowledgeable and interested, independent but poorly informed, or biased yet accurate about a particular fact.",
      explanation: "Identify role, access, expertise, incentives, and framing. Then evaluate specific claims. Do not collapse those dimensions into one global trustworthy/untrustworthy label.",
      modelBody: "Manufacturer report: ‘Our device met the stated durability test.’ The manufacturer funded the test and publishes the method.",
      modelThinking: "The financial interest is relevant context. It does not by itself falsify the result. I inspect the method and seek independent evidence for consequential decisions.",
      together: { prompt: "What is the strongest analysis?", sourceBody: "A consultant recommends the software sold by a company that pays the consultant referral fees.", choices: [["conflict", "The financial relationship is relevant and the recommendation should be checked against independent evidence"], ["automatic-false", "The recommendation is automatically false"], ["automatic-true", "Payment proves expertise"]], correct: "conflict", success: "You separated conflict of interest from a truth verdict.", retry: "Treat the relationship as a reason for scrutiny, not as automatic proof." },
      supported: { prompt: "What should you examine next?", sourceBody: "A department report describes its own program as effective.", choices: [["measures", "What outcomes were measured and whether independent evidence agrees"], ["font", "The report font"], ["dismiss", "Nothing; self-report is always useless"]], correct: "measures", success: "You moved from role context to evidence quality.", retry: "Ask what specific evidence supports the effectiveness claim." },
      independent: { prompt: "Interpret the source relationship.", sourceBody: "An employee witness reports a process failure that could expose the employee's own mistake.", choices: [["complex", "The employee may have both firsthand access and self-interest; evaluate the account claim by claim"], ["discard", "Discard everything the employee says"], ["accept", "Accept everything because the employee was present"]], correct: "complex", success: "Independent perspective analysis logged.", retry: "Account for both access and incentive without using either as a shortcut." },
      transfer: { prompt: "Transfer to an expert disagreement.", sourceBody: "Two qualified experts interpret the same limited dataset differently.", choices: [["compare", "Compare assumptions, methods, and evidence; expertise alone does not resolve the disagreement"], ["one-fraud", "One expert must be dishonest"], ["popular", "Choose whichever expert has more followers"]], correct: "compare", success: "Perspective and expertise reasoning transferred.", retry: "Focus on the evidence and reasoning behind the interpretations." },
    },
  },
  {
    id: "TEACH.SOURCE.UTILITY",
    skillId: "SOURCE.005",
    title: "Choose the Source That Fits the Question",
    notebookTitle: "Source Usefulness Lens",
    reminder: "Do not ask whether a source is good in general. Ask how useful it is for this specific question and why.",
    investigator: {
      discoverTitle: "The best source depends on what you are asking",
      discoverBody: "An advertisement can be the best source for what a company claims, but a poor source for whether independent inspectors found a violation.",
      explanation: "Source usefulness is question-specific. Match the question to the source with the most direct access to the needed information, then use other sources for support, context, or comparison.",
      modelBody: "Question A: What does the company promise? Use the company ad. Question B: What did inspectors find? Use the inspection report.",
      modelThinking: "The same company ad changes from direct to limited depending on the question. I do not assign one permanent score to the source.",
      together: { prompt: "Which source is most direct for the official start time?", sourceBody: "Sources: official schedule; student rumor; event advertisement with no time.", choices: [["schedule", "Official schedule"], ["rumor", "Student rumor"], ["ad", "Advertisement with no time"]], correct: "schedule", success: "You matched the question to the source with direct information.", retry: "Which source actually states the official time?" },
      supported: { prompt: "Which source is most useful for what customers are saying about taste?", sourceBody: "Sources: customer-review page; nutrition label; shipping policy.", choices: [["reviews", "Customer reviews"], ["nutrition", "Nutrition label"], ["shipping", "Shipping policy"]], correct: "reviews", success: "You changed source choice when the question changed.", retry: "Which source directly contains customer opinions about taste?" },
      independent: { prompt: "Choose the source for the question.", sourceBody: "Question: What rule does the school currently publish? Sources: school policy page; student editorial; old screenshot with no date.", choices: [["policy", "Current school policy page"], ["editorial", "Student editorial"], ["screenshot", "Undated screenshot"]], correct: "policy", success: "Independent source-utility judgment logged.", retry: "Which source directly publishes the current rule?" },
      transfer: { prompt: "Transfer to a product investigation.", sourceBody: "Question: Did the independent test measure battery life? Sources: lab report; manufacturer ad; influencer unboxing.", choices: [["lab", "Lab report"], ["ad", "Manufacturer ad"], ["unboxing", "Influencer unboxing"]], correct: "lab", success: "Source usefulness transferred to a new domain.", retry: "Which source directly documents what the test measured?" },
    },
    lead: {
      discoverTitle: "Source quality is relational, not one-dimensional",
      discoverBody: "A source can be direct for one question, contextual for another, and irrelevant for a third.",
      explanation: "Define the information need first. Then classify each source as direct, supporting, contextual, limited, or not relevant for that question. This avoids simplistic source rankings.",
      modelBody: "Question: What terms did the company publish? Terms page = direct. Customer review = limited. Question: How did customers experience cancellation? Review data may become more useful.",
      modelThinking: "I change the source assessment when the question changes because usefulness is tied to the information need.",
      together: { prompt: "Which source is direct for the contractual obligation?", sourceBody: "Sources: signed agreement; sales brochure; customer forum.", choices: [["agreement", "Signed agreement"], ["brochure", "Sales brochure"], ["forum", "Customer forum"]], correct: "agreement", success: "You selected the source that contains the actual obligation language.", retry: "Which source states the governing terms themselves?" },
      supported: { prompt: "Which source is direct for how the company markets the plan?", sourceBody: "Sources: company advertisement; regulator filing; arbitration clause.", choices: [["ad", "Company advertisement"], ["filing", "Regulator filing"], ["clause", "Arbitration clause"]], correct: "ad", success: "The source lens changed with the question.", retry: "The question asks how the company presents the plan to customers." },
      independent: { prompt: "Choose the best source for the factual inspection result.", sourceBody: "Sources: inspection report; company press release; neighborhood comment thread.", choices: [["inspection", "Inspection report"], ["press", "Company press release"], ["comments", "Comment thread"]], correct: "inspection", success: "Independent source-utility analysis logged.", retry: "Which source directly records the inspectors' findings?" },
      transfer: { prompt: "Transfer to research evaluation.", sourceBody: "Question: What did the study actually measure? Sources: research paper methods section; news headline; social repost.", choices: [["paper", "Research paper methods section"], ["headline", "News headline"], ["repost", "Social repost"]], correct: "paper", success: "Source usefulness transferred to research reading.", retry: "Use the source that directly describes the study method." },
    },
  },
  {
    id: "TEACH.ARG.CLAIM",
    skillId: "ARG.001",
    title: "Find the Claim",
    notebookTitle: "Claim",
    reminder: "Ask: What statement does the writer want me to accept as true or support as a conclusion? Separate it from background facts and evidence.",
    investigator: {
      discoverTitle: "Some sentences are trying to establish a conclusion",
      discoverBody: "Arguments contain statements the writer wants the reader to accept. That central statement is the claim.",
      explanation: "A claim can be supported, unsupported, true, false, strong, or weak. First identify it accurately before judging it.",
      modelBody: "Our school should begin classes later because students need more sleep.",
      modelThinking: "The statement the writer wants accepted is ‘school should begin classes later.’ The sleep point is a reason offered for it.",
      together: { prompt: "Which sentence is the claim?", sourceBody: "The library should stay open until 8 PM. Many students need a quiet place after practice.", choices: [["open", "The library should stay open until 8 PM"], ["students", "Many students need a quiet place"], ["both", "Both are the exact same claim"]], correct: "open", success: "You separated the claim from a supporting reason.", retry: "Which statement is the writer asking the reader to accept as the main conclusion?" },
      supported: { prompt: "Identify the claim.", sourceBody: "This route is the safest option because it has protected crossings at every intersection.", choices: [["safest", "This route is the safest option"], ["crossings", "It has protected crossings"], ["intersection", "There are intersections"]], correct: "safest", success: "Claim identified from the argument structure.", retry: "Which statement is being supported by the because clause?" },
      independent: { prompt: "Find the claim independently.", sourceBody: "The new policy will reduce confusion. It puts all deadlines on one calendar.", choices: [["reduce", "The new policy will reduce confusion"], ["calendar", "It puts deadlines on one calendar"], ["deadline", "Deadlines exist"]], correct: "reduce", success: "Independent claim identification logged.", retry: "Which statement is the conclusion the second sentence is meant to support?" },
      transfer: { prompt: "Transfer to advertising.", sourceBody: "FOCUSFAST helps you concentrate better. Thousands follow us online.", choices: [["concentrate", "FOCUSFAST helps you concentrate better"], ["followers", "Thousands follow the account"], ["both", "Follower count is the concentration claim"]], correct: "concentrate", success: "Claim identification transferred to persuasive text.", retry: "Which sentence makes the product-performance assertion?" },
    },
    lead: {
      discoverTitle: "Claims drive reports, proposals, advertising, and arguments",
      discoverBody: "Professional writing often mixes factual background, interpretation, recommendations, and claims.",
      explanation: "Identify exactly what proposition is being advanced before evaluating support. Do not confuse a cited fact with the conclusion it is offered to support.",
      modelBody: "The company should replace the current process because defect rates remain above target.",
      modelThinking: "The recommendation to replace the process is the claim. Defect rates are offered as a reason or evidence for that recommendation.",
      together: { prompt: "Which statement is the claim?", sourceBody: "The subscription model is too costly for this team. Annual fees would exceed the approved budget.", choices: [["costly", "The subscription model is too costly for this team"], ["fees", "Annual fees would exceed the budget"], ["budget", "A budget exists"]], correct: "costly", success: "You separated conclusion from supporting financial information.", retry: "Which sentence expresses the judgment the writer wants accepted?" },
      supported: { prompt: "Identify the claim in a research summary.", sourceBody: "The authors conclude that the intervention modestly improved the measured task. Scores rose 3% on that task.", choices: [["conclude", "The intervention modestly improved the measured task"], ["score", "Scores rose 3%"], ["authors", "The authors wrote the study"]], correct: "conclude", success: "Claim identified without inflating its scope.", retry: "Which statement is the researchers' conclusion rather than the measurement itself?" },
      independent: { prompt: "Identify the principal claim.", sourceBody: "Management argues that remote work should continue because turnover fell and productivity remained stable.", choices: [["continue", "Remote work should continue"], ["turnover", "Turnover fell"], ["stable", "Productivity remained stable"]], correct: "continue", success: "Independent claim identification logged.", retry: "Which statement are the other facts being used to support?" },
      transfer: { prompt: "Transfer to legal-policy commentary.", sourceBody: "The writer contends that the cancellation clause is unfair because customers receive no prorated refund.", choices: [["unfair", "The cancellation clause is unfair"], ["refund", "Customers receive no prorated refund"], ["clause", "A cancellation clause exists"]], correct: "unfair", success: "Claim identification transferred to evaluative commentary.", retry: "Separate the writer's judgment from the factual reason offered." },
    },
  },
  {
    id: "TEACH.ARG.REASONS",
    skillId: "ARG.002",
    title: "Find the Reasons Supporting the Claim",
    notebookTitle: "Reason",
    reminder: "A reason explains why the writer thinks the claim should be accepted. It sits between the claim and the evidence that can support it.",
    investigator: {
      discoverTitle: "Claims usually come with because",
      discoverBody: "A reason answers: Why does the writer think this claim should be accepted?",
      explanation: "Reasons are not automatically evidence. A writer can give a reason that still needs support. Identify the logical bridge first.",
      modelBody: "The school should add a late bus because students in clubs need transportation home.",
      modelThinking: "Claim: add a late bus. Reason: club students need transportation home. I would still need evidence about the need and impact.",
      together: { prompt: "Which statement is the reason?", sourceBody: "The cafeteria should add another checkout line because students spend too much of lunch waiting.", choices: [["waiting", "Students spend too much lunch time waiting"], ["add", "The cafeteria should add a line"], ["cafeteria", "The school has a cafeteria"]], correct: "waiting", success: "You identified the reason offered for the claim.", retry: "Ask why the writer says another line should be added." },
      supported: { prompt: "Identify the reason.", sourceBody: "The team should use the new schedule because it avoids conflicts with practice.", choices: [["avoids", "It avoids practice conflicts"], ["use", "The team should use it"], ["new", "The schedule is new"]], correct: "avoids", success: "Reason identified.", retry: "Which statement answers why the new schedule is recommended?" },
      independent: { prompt: "Find the reason independently.", sourceBody: "The city should repair this crossing first. It serves the largest number of students each morning.", choices: [["largest", "It serves the largest number of students"], ["repair", "The city should repair it first"], ["morning", "Morning exists"]], correct: "largest", success: "Independent reason identification logged.", retry: "Which statement is being used to justify priority?" },
      transfer: { prompt: "Transfer to an advertisement.", sourceBody: "Choose Plan A because it includes unlimited storage.", choices: [["storage", "It includes unlimited storage"], ["choose", "Choose Plan A"], ["plan", "It is called Plan A"]], correct: "storage", success: "Reason identification transferred to persuasive content.", retry: "What does the because clause offer as justification?" },
    },
    lead: {
      discoverTitle: "Reasons organize an argument before evidence is tested",
      discoverBody: "A proposal can offer several reasons for one conclusion, each requiring its own support.",
      explanation: "Map claim → reason → evidence. If a reason is unsupported, the argument can fail even when the claim sounds plausible.",
      modelBody: "Renewal should be delayed because the vendor has not completed security testing.",
      modelThinking: "Claim: delay renewal. Reason: required security testing is incomplete. Next I would look for evidence that testing is actually incomplete and relevant to renewal.",
      together: { prompt: "Which statement functions as the reason?", sourceBody: "The contract should be revised because the current clause leaves the cancellation deadline ambiguous.", choices: [["ambiguous", "The cancellation deadline is ambiguous"], ["revise", "The contract should be revised"], ["contract", "A contract exists"]], correct: "ambiguous", success: "You mapped the reason beneath the recommendation.", retry: "Ask why the writer recommends revision." },
      supported: { prompt: "Identify the reason in the proposal.", sourceBody: "Management recommends replacing the server because maintenance costs have doubled.", choices: [["costs", "Maintenance costs have doubled"], ["replace", "Replace the server"], ["server", "The server exists"]], correct: "costs", success: "Reason isolated from claim.", retry: "Which fact is offered to justify replacement?" },
      independent: { prompt: "Find the reason independently.", sourceBody: "The analyst argues the comparison is misleading because the two groups were measured over different time periods.", choices: [["periods", "The groups were measured over different time periods"], ["misleading", "The comparison is misleading"], ["analyst", "An analyst wrote it"]], correct: "periods", success: "Independent reason mapping logged.", retry: "Which statement explains why the comparison is said to be misleading?" },
      transfer: { prompt: "Transfer to legal-policy analysis.", sourceBody: "The reviewer recommends clarification because ‘reasonable notice’ is not defined in the agreement.", choices: [["undefined", "The phrase is not defined"], ["clarify", "The reviewer recommends clarification"], ["agreement", "An agreement exists"]], correct: "undefined", success: "Reason identification transferred to document analysis.", retry: "What fact is offered to justify clarification?" },
    },
  },
  {
    id: "TEACH.ARG.MATCH_EVIDENCE",
    skillId: "ARG.003",
    title: "Match Evidence to the Claim and Reason",
    notebookTitle: "Claim → Reason → Evidence",
    reminder: "Evidence must support the actual reason and claim. A true fact that does not connect is not enough.",
    investigator: {
      discoverTitle: "Evidence has to fit the argument",
      discoverBody: "A writer can list impressive facts that never actually support the claim being made.",
      explanation: "First identify the claim and reason. Then ask whether the evidence directly supports that reason. Do not be distracted by popularity, emotion, or unrelated facts.",
      modelBody: "Claim: Start school later. Reason: Students need more sleep. Evidence: Sleep-study data on adolescent schedules.",
      modelThinking: "The evidence is relevant because it addresses the reason about sleep. A fact about school colors would not support this argument.",
      together: { prompt: "Which evidence best supports the reason?", sourceBody: "Claim: Add a late bus. Reason: Many club students lack transportation. Evidence options: A survey of club students' ride access; the school mascot won an award.", choices: [["survey", "Survey of transportation access"], ["mascot", "Mascot award"], ["both", "Both equally support the reason"]], correct: "survey", success: "You matched evidence to the specific reason.", retry: "Which evidence addresses whether club students actually lack transportation?" },
      supported: { prompt: "Which evidence does NOT support the claim?", sourceBody: "Claim: The new route is faster. A: trip-time records. B: riders like the seat color.", choices: [["color", "Seat-color preference"], ["records", "Trip-time records"], ["none", "Both support speed"]], correct: "color", success: "You rejected an unrelated fact even though it may be true.", retry: "The claim is about speed, not preference." },
      independent: { prompt: "Choose the evidence that fits the argument.", sourceBody: "Claim: More checkout stations reduce wait time. Reason: More students can be served at once. Evidence: timed waits before and after adding stations; menu popularity poll.", choices: [["waits", "Timed wait comparison"], ["menu", "Menu popularity poll"], ["both", "Both equally"]], correct: "waits", success: "Independent claim-evidence matching logged.", retry: "Which evidence measures the outcome the argument predicts?" },
      transfer: { prompt: "Transfer to a media claim.", sourceBody: "Claim: The headline exaggerates the study. Evidence A: study says ‘small change on one task’; headline says ‘transforms learning.’ Evidence B: article font is large.", choices: [["wording", "Difference between study wording and headline wording"], ["font", "Font size"], ["both", "Both prove exaggeration"]], correct: "wording", success: "Argument-evidence matching transferred.", retry: "Use evidence that compares the actual strength of the two claims." },
    },
    lead: {
      discoverTitle: "Arguments fail when evidence and conclusion do not line up",
      discoverBody: "Professional documents often contain relevant facts that support only part of a larger claim.",
      explanation: "Map the argument before judging it. Ask whether evidence supports the reason, whether the reason supports the claim, and whether the conclusion goes beyond the evidence's scope.",
      modelBody: "Claim: The new process should replace the old one. Reason: It reduces processing time. Evidence: benchmark shows average time fell 22% under the tested workload.",
      modelThinking: "The benchmark supports the speed reason. It does not by itself support claims about cost, safety, or every workload.",
      together: { prompt: "Which evidence best supports the stated reason?", sourceBody: "Claim: Renew the vendor. Reason: On-time delivery improved. A: delivery logs; B: vendor's redesigned logo.", choices: [["logs", "Delivery logs"], ["logo", "Logo redesign"], ["both", "Both equally"]], correct: "logs", success: "You matched evidence to the actual performance reason.", retry: "Which evidence measures on-time delivery?" },
      supported: { prompt: "Where does the evidence stop?", sourceBody: "Study evidence supports a small improvement on one attention task. Claim says the product improves all academic performance.", choices: [["too-broad", "The claim is broader than the evidence"], ["fully", "The evidence fully supports all academic outcomes"], ["none", "The study provides no evidence at all"]], correct: "too-broad", success: "You identified a scope mismatch rather than rejecting the evidence entirely.", retry: "Compare what was measured with what the claim asserts." },
      independent: { prompt: "Evaluate the evidence fit independently.", sourceBody: "Claim: Policy reduced turnover. Evidence: employee satisfaction rose, but turnover data are not provided.", choices: [["indirect", "The evidence is indirect and does not establish turnover reduction"], ["proves", "Higher satisfaction proves turnover fell"], ["irrelevant", "Satisfaction can never be relevant"]], correct: "indirect", success: "Independent evidence-fit analysis logged.", retry: "The evidence may relate to the claim, but does it measure turnover itself?" },
      transfer: { prompt: "Transfer to a legal-document argument.", sourceBody: "Claim: The company violated the notice clause. Evidence: an email was sent three days late; the clause requires notice by the deadline.", choices: [["supports", "The timing evidence directly bears on the claimed missed deadline"], ["logo", "The email signature design is stronger evidence"], ["unknown", "Deadlines can never be evidence"]], correct: "supports", success: "Claim-evidence matching transferred to agreement analysis.", retry: "Match the clause requirement to the timing evidence." },
    },
  },
];

export const juniorHighTeachingModules: Record<string, TeachingModule> = Object.fromEntries(
  specs.map((spec) => {
    const module = makeModule(spec);
    return [module.id, module];
  }),
);
