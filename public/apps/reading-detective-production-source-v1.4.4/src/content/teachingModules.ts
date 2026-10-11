import type {
  PresentationStage,
  TeachingModule,
  TeachingPracticeItem,
  TeachingPresentationVariant,
} from "../domain";
import { foundationTeachingModules } from "./foundationTeachingCoverage";
import { juniorHighTeachingModules } from "./juniorHighTeachingCoverage";
import { highSchoolTeachingModules } from "./highSchoolTeachingCoverage";
import { highSchoolResearchTeachingModules } from "./highSchoolResearchTeachingCoverage";
import { curriculumCompletionTeachingModules } from "./curriculumCompletionTeachingCoverage";

const choice = (id: string, label: string) => ({ id, label });

function practice(args: {
  id: string;
  prompt: string;
  sourceTitle?: string;
  sourceBody?: string;
  choices: Array<[string, string]>;
  correct: string;
  success: string;
  retry: string;
}): TeachingPracticeItem {
  return {
    id: args.id,
    prompt: args.prompt,
    sourceTitle: args.sourceTitle,
    sourceBody: args.sourceBody,
    choices: args.choices.map(([id, label]) => choice(id, label)),
    correctAnswerIds: [args.correct],
    successMessage: args.success,
    retryMessage: args.retry,
  };
}

function variant(args: Omit<TeachingPresentationVariant, "stage"> & { stage: PresentationStage }): TeachingPresentationVariant {
  return args;
}

const legacyTeachingModules: Record<string, TeachingModule> = {
  "TEACH.CODE.CVC": {
    id: "TEACH.CODE.CVC",
    skillId: "CODE.002",
    title: "Blend Every Sound Clue",
    stages: ["young-investigator", "investigator", "lead-investigator"],
    notebookTool: {
      title: "Blend Every Sound",
      reminder: "Touch every sound, blend across the word, then say the whole word. Do not guess from the first letter.",
    },
    variants: {
      "young-investigator": variant({
        stage: "young-investigator",
        discover: { title: "Three clues can make one word", body: "The letters in a short word each give us a sound clue. We can put those clues together instead of guessing." },
        explanation: "In a word like map, m gives /m/, a gives /a/, and p gives /p/. Keeping all three sounds and blending them gives map.",
        model: { sourceTitle: "Word Card", sourceBody: "m a p", thinking: "I will not guess from m. I say /m/ /a/ /p/, sweep across the word, and blend: map." },
        together: practice({ id: "cvc-young-together", prompt: "Practice with me. Blend s-a-t.", sourceBody: "s a t", choices: [["sat", "sat"], ["sit", "sit"], ["sap", "sap"]], correct: "sat", success: "You kept all three sound clues and blended sat.", retry: "Keep every sound: /s/ /a/ /t/. Now blend them together." }),
        supported: practice({ id: "cvc-young-supported", prompt: "Your turn with a clue ready if you need it: m-a-t.", sourceBody: "m a t", choices: [["mat", "mat"], ["map", "map"], ["met", "met"]], correct: "mat", success: "Exactly. You used the whole word, not only the first sound.", retry: "Check the middle and ending sounds too: /m/ /a/ /t/." }),
        independent: practice({ id: "cvc-young-independent", prompt: "Crack this word on your own: p-i-n.", sourceBody: "p i n", choices: [["pin", "pin"], ["pan", "pan"], ["pit", "pit"]], correct: "pin", success: "Independent decoding logged.", retry: "Read every sound in order, then blend again." }),
        transfer: practice({ id: "cvc-young-transfer", prompt: "A new shelf tag says r-e-d. What word is it?", sourceTitle: "Shelf Tag", sourceBody: "r e d", choices: [["red", "red"], ["rid", "rid"], ["bed", "bed"]], correct: "red", success: "You transferred the same decoding tool to a new clue.", retry: "Use the same tool in this new setting: /r/ /e/ /d/." }),
      }),
      investigator: variant({
        stage: "investigator",
        discover: { title: "Short codes still require complete evidence", body: "When an unfamiliar short label appears, guessing from its first letter is unreliable. Every letter contributes evidence." },
        explanation: "For a simple consonant-vowel-consonant word, preserve each sound and blend them in order. This foundation still matters when reading unfamiliar labels and names.",
        model: { sourceTitle: "Equipment Tag", sourceBody: "b i n", thinking: "I inspect all three letters: /b/ /i/ /n/. Together they say bin." },
        together: practice({ id: "cvc-jr-together", prompt: "Decode this storage tag with me: p-a-d.", sourceTitle: "Storage Tag", sourceBody: "p a d", choices: [["pad", "pad"], ["pod", "pod"], ["pan", "pan"]], correct: "pad", success: "Complete sound evidence gave you pad.", retry: "Use all three sounds: /p/ /a/ /d/." }),
        supported: practice({ id: "cvc-jr-supported", prompt: "Decode the locker label: l-i-d.", sourceTitle: "Locker Label", sourceBody: "l i d", choices: [["lid", "lid"], ["led", "led"], ["lip", "lip"]], correct: "lid", success: "Good. You preserved the middle and final clues.", retry: "Check the vowel and ending before deciding." }),
        independent: practice({ id: "cvc-jr-independent", prompt: "Decode the inventory word: f-o-g.", sourceTitle: "Inventory", sourceBody: "f o g", choices: [["fog", "fog"], ["fig", "fig"], ["fox", "fox"]], correct: "fog", success: "Independent decoding logged.", retry: "Blend each sound in order rather than matching the shape." }),
        transfer: practice({ id: "cvc-jr-transfer", prompt: "A different case uses the tag n-e-t. Decode it.", sourceTitle: "Case Tag", sourceBody: "n e t", choices: [["net", "net"], ["nut", "nut"], ["not", "not"]], correct: "net", success: "The decoding tool transferred to a new context.", retry: "Apply the same all-sounds strategy to this new tag." }),
      }),
      "lead-investigator": variant({
        stage: "lead-investigator",
        discover: { title: "Foundational decoding can be repaired without changing your level", body: "Professional reading still depends on accurate decoding. If a short unfamiliar code trips you up, we strengthen that exact mechanism and return to the document." },
        explanation: "A CVC sequence uses three sound positions. Reading all positions prevents first-letter guessing and strengthens the foundation used inside longer words.",
        model: { sourceTitle: "Parcel Code", sourceBody: "t a g", thinking: "I verify each position: /t/ /a/ /g/. The code reads tag." },
        together: practice({ id: "cvc-lead-together", prompt: "Verify this dispatch label: c-a-b.", sourceTitle: "Dispatch Label", sourceBody: "c a b", choices: [["cab", "cab"], ["cub", "cub"], ["cap", "cap"]], correct: "cab", success: "You verified the full code rather than guessing.", retry: "Inspect all three positions: /c/ /a/ /b/." }),
        supported: practice({ id: "cvc-lead-supported", prompt: "Decode this inventory tag: r-i-g.", sourceTitle: "Inventory Tag", sourceBody: "r i g", choices: [["rig", "rig"], ["rug", "rug"], ["rip", "rip"]], correct: "rig", success: "Accurate decoding confirmed.", retry: "Check the vowel and final consonant before selecting." }),
        independent: practice({ id: "cvc-lead-independent", prompt: "Decode this short field code independently: p-e-n.", sourceTitle: "Field Code", sourceBody: "p e n", choices: [["pen", "pen"], ["pin", "pin"], ["pet", "pet"]], correct: "pen", success: "Independent foundational decoding logged without changing your presentation stage.", retry: "Use every sound in sequence." }),
        transfer: practice({ id: "cvc-lead-transfer", prompt: "Transfer the skill to a new logistics label: d-o-c.", sourceTitle: "Logistics Label", sourceBody: "d o c", choices: [["doc", "doc"], ["dig", "dig"], ["dot", "dot"]], correct: "doc", success: "Repair transferred. Return to advanced investigation when ready.", retry: "Same mechanism, new context: preserve all three sounds." }),
      }),
    },
  },

  "TEACH.SENT.MEANING": {
    id: "TEACH.SENT.MEANING",
    skillId: "SENT.001",
    title: "Find Who and What Happened",
    stages: ["young-investigator", "investigator", "lead-investigator"],
    notebookTool: { title: "Sentence Meaning", reminder: "Ask: Who or what is this about? What is being said about them?" },
    variants: {
      "young-investigator": variant({
        stage: "young-investigator",
        discover: { title: "Words work together", body: "A sentence gives us an idea. We can understand it by finding who or what it is about and what happens." },
        explanation: "In ‘The dog ran,’ the sentence is about the dog. What happened? It ran.",
        model: { sourceBody: "Mia packs the bag.", thinking: "Who? Mia. What happens? She packs the bag. Now I understand the whole sentence." },
        together: practice({ id: "sent-young-together", prompt: "Who is the sentence about?", sourceBody: "Ava opens the box.", choices: [["ava", "Ava"], ["box", "the box"], ["opens", "opens"]], correct: "ava", success: "Yes. Ava is who the sentence is about.", retry: "Find the person doing the action." }),
        supported: practice({ id: "sent-young-supported", prompt: "What happened?", sourceBody: "Theo shuts the gate.", choices: [["shuts", "Theo shuts the gate"], ["gate-is-blue", "The gate is blue"], ["unknown", "We do not know"]], correct: "shuts", success: "You connected the person with the action.", retry: "Look for what Theo does in the sentence." }),
        independent: practice({ id: "sent-young-independent", prompt: "What does this sentence tell us?", sourceBody: "Nia carries the book.", choices: [["carry", "Nia carries a book"], ["drops", "Nia drops a book"], ["reads", "Nia reads a book"]], correct: "carry", success: "Independent sentence meaning logged.", retry: "Use only what the sentence actually says." }),
        transfer: practice({ id: "sent-young-transfer", prompt: "Read a new sign sentence. What is happening?", sourceTitle: "Sign", sourceBody: "The bus stops here.", choices: [["stops", "The bus stops here"], ["leaves", "The bus leaves here"], ["breaks", "The bus breaks here"]], correct: "stops", success: "You transferred sentence meaning to a sign.", retry: "Find the subject and the action in the new context." }),
      }),
      investigator: variant({
        stage: "investigator",
        discover: { title: "Complex reading begins with sentence control", body: "Before comparing ideas across a passage, make sure each sentence is clear: who or what is being discussed, and what is asserted about it." },
        explanation: "Sentence meaning is not keyword matching. Keep the subject, action, and important qualifiers together.",
        model: { sourceBody: "The committee postponed the vote.", thinking: "The committee is the actor. Postponed is the action. The vote is what was postponed." },
        together: practice({ id: "sent-jr-together", prompt: "What happened in this sentence?", sourceBody: "The coach canceled practice after the storm warning.", choices: [["cancel", "The coach canceled practice"], ["storm", "The storm canceled practice"], ["unknown", "No action is stated"]], correct: "cancel", success: "You kept the actor and action together.", retry: "Identify who performs the sentence's main action." }),
        supported: practice({ id: "sent-jr-supported", prompt: "What does this sentence establish?", sourceBody: "The revised schedule moves lunch to 12:30.", choices: [["moves", "Lunch moves to 12:30"], ["ends", "Lunch ends at 12:30"], ["maybe", "Lunch may move"]], correct: "moves", success: "Precise sentence meaning confirmed.", retry: "Do not add a meaning the sentence does not state." }),
        independent: practice({ id: "sent-jr-independent", prompt: "Choose the exact meaning.", sourceBody: "The editor removed the final paragraph.", choices: [["removed", "The final paragraph was removed"], ["rewrote", "The final paragraph was rewritten"], ["added", "A final paragraph was added"]], correct: "removed", success: "Independent sentence interpretation logged.", retry: "Track the actual verb before deciding." }),
        transfer: practice({ id: "sent-jr-transfer", prompt: "Transfer to a policy sentence.", sourceBody: "The library closes the study room at 8:00 p.m.", choices: [["room", "The study room closes at 8:00 p.m."], ["library", "The whole library closes at 8:00 p.m."], ["opens", "The room opens at 8:00 p.m."]], correct: "room", success: "You transferred precise sentence reading to a policy context.", retry: "Track exactly what the verb applies to." }),
      }),
      "lead-investigator": variant({
        stage: "lead-investigator",
        discover: { title: "Precision starts at the sentence level", body: "Contracts, policies, and workplace documents can turn on one actor, one verb, or one qualifier. Sentence control prevents expensive assumptions." },
        explanation: "Identify the party or subject, the operative verb, the object or obligation, and any limiting language before drawing a conclusion.",
        model: { sourceBody: "The vendor provides replacement parts upon approval.", thinking: "Vendor is the actor. Provides is the action. Replacement parts are the object. ‘Upon approval’ limits when the action occurs." },
        together: practice({ id: "sent-lead-together", prompt: "What does the sentence actually require?", sourceBody: "The employee submits the form before Friday.", choices: [["submit", "The employee submits the form before Friday"], ["approve", "The employer approves the form before Friday"], ["optional", "Submitting the form is optional"]], correct: "submit", success: "You identified the actor, action, and deadline.", retry: "Separate who acts from who receives or reviews the action." }),
        supported: practice({ id: "sent-lead-supported", prompt: "Choose the precise meaning.", sourceBody: "Management reviews requests within five business days.", choices: [["review", "Management reviews requests within five business days"], ["approve", "Management approves every request within five days"], ["employee", "Employees review the requests"]], correct: "review", success: "You did not convert review into approval.", retry: "Stay with the exact operative verb." }),
        independent: practice({ id: "sent-lead-independent", prompt: "Interpret this sentence independently.", sourceBody: "The customer retains the receipt for warranty service.", choices: [["retain", "The customer keeps the receipt for warranty service"], ["company", "The company keeps the receipt"], ["refund", "The receipt guarantees a refund"]], correct: "retain", success: "Independent document-sentence precision logged.", retry: "Identify the party and what that party does." }),
        transfer: practice({ id: "sent-lead-transfer", prompt: "Transfer to a technical instruction.", sourceBody: "The technician records the reading before restarting the unit.", choices: [["record-first", "The reading is recorded before restart"], ["restart-first", "The unit is restarted before recording"], ["optional", "Recording is optional"]], correct: "record-first", success: "Sentence precision transferred to technical text.", retry: "Track the action order stated in the sentence." }),
      }),
    },
  },

  "TEACH.COMP.EXPLICIT": {
    id: "TEACH.COMP.EXPLICIT",
    skillId: "COMP.001",
    title: "Find What the Text Says Directly",
    stages: ["young-investigator", "investigator", "lead-investigator"],
    notebookTool: { title: "Direct Evidence", reminder: "For an explicit question, answer from what the text directly states before adding outside knowledge." },
    variants: {
      "young-investigator": variant({
        stage: "young-investigator",
        discover: { title: "Some answers are right on the page", body: "Sometimes the writer tells us the answer directly. Our job is to find that clue instead of guessing." },
        explanation: "If a sentence says ‘Ava put the key in her pocket,’ we can confirm the key went in her pocket because the text says so.",
        model: { sourceBody: "Eli placed the red cup on the table.", thinking: "Where is the cup? I can point to ‘on the table.’ That is direct evidence." },
        together: practice({ id: "explicit-young-together", prompt: "Where did Zuri put the note?", sourceBody: "Zuri put the note in her bag.", choices: [["bag", "in her bag"], ["desk", "on the desk"], ["unknown", "we do not know"]], correct: "bag", success: "You found the answer stated directly.", retry: "Point to the words that tell where the note went." }),
        supported: practice({ id: "explicit-young-supported", prompt: "What color is the bike?", sourceBody: "The blue bike is beside the fence.", choices: [["blue", "blue"], ["red", "red"], ["green", "green"]], correct: "blue", success: "Direct detail located.", retry: "Look for the color word in the sentence." }),
        independent: practice({ id: "explicit-young-independent", prompt: "What did Sam carry?", sourceBody: "Sam carried a box to the door.", choices: [["box", "a box"], ["bag", "a bag"], ["book", "a book"]], correct: "box", success: "Independent explicit-information evidence logged.", retry: "Use the sentence, not a guess." }),
        transfer: practice({ id: "explicit-young-transfer", prompt: "Transfer to a notice. When does the room open?", sourceTitle: "Notice", sourceBody: "Room opens at 9:00.", choices: [["9", "9:00"], ["8", "8:00"], ["10", "10:00"]], correct: "9", success: "You found direct information in a new text type.", retry: "Locate the time the notice directly states." }),
      }),
      investigator: variant({
        stage: "investigator",
        discover: { title: "Separate stated information from inference", body: "A strong reader first knows what the source explicitly establishes. Inferences come later." },
        explanation: "Direct information can be pointed to in the text. If the source never says it, it is not explicit evidence even if it sounds plausible.",
        model: { sourceBody: "The meeting was moved to Thursday at 4:00 p.m.", thinking: "I can confirm Thursday and 4:00 because those details are stated. I cannot confirm why it moved." },
        together: practice({ id: "explicit-jr-together", prompt: "What can we confirm?", sourceBody: "The club meeting begins in Room 204 at 3:15.", choices: [["room", "It begins in Room 204 at 3:15"], ["reason", "It moved because of sports practice"], ["attendance", "Everyone will attend"]], correct: "room", success: "You stayed inside the source boundary.", retry: "Choose only the option you can point to in the text." }),
        supported: practice({ id: "explicit-jr-supported", prompt: "Which detail is directly stated?", sourceBody: "The bus route changes on Monday.", choices: [["monday", "The change begins Monday"], ["why", "The change is caused by construction"], ["permanent", "The change is permanent"]], correct: "monday", success: "Direct evidence distinguished from assumptions.", retry: "Which choice uses information actually printed here?" }),
        independent: practice({ id: "explicit-jr-independent", prompt: "Select the confirmed fact.", sourceBody: "The article was published on August 12.", choices: [["date", "It was published August 12"], ["accurate", "The article is accurate"], ["popular", "The article is popular"]], correct: "date", success: "Independent explicit-information reading logged.", retry: "Publication date is stated; the other qualities require more evidence." }),
        transfer: practice({ id: "explicit-jr-transfer", prompt: "Transfer to a schedule.", sourceBody: "Workshop: Saturday, 10:00 a.m.–12:00 p.m.", choices: [["sat", "The workshop is Saturday"], ["free", "The workshop is free"], ["required", "Attendance is required"]], correct: "sat", success: "Direct-evidence reading transferred to a schedule.", retry: "Use only information the schedule includes." }),
      }),
      "lead-investigator": variant({
        stage: "lead-investigator",
        discover: { title: "Establish the record before interpreting it", body: "In real documents, separate what is explicitly on the record from what you infer, predict, or assume." },
        explanation: "A statement is explicit when you can identify the exact language establishing it. Plausibility is not a substitute for text evidence.",
        model: { sourceBody: "Payment is due on September 1.", thinking: "I can confirm the due date. I cannot confirm a late fee unless another clause states one." },
        together: practice({ id: "explicit-lead-together", prompt: "What does this clause directly establish?", sourceBody: "The subscription renews monthly.", choices: [["monthly", "Renewal occurs monthly"], ["refund", "Cancellation produces a refund"], ["price", "The price never changes"]], correct: "monthly", success: "You separated the stated term from unstated consequences.", retry: "Which answer can be proven from these exact words?" }),
        supported: practice({ id: "explicit-lead-supported", prompt: "Which fact is on the record?", sourceBody: "Applications close at 5:00 p.m. Friday.", choices: [["deadline", "The deadline is 5:00 p.m. Friday"], ["extension", "Late applications receive an extension"], ["approval", "Applications are approved Friday"]], correct: "deadline", success: "Exact-document reading confirmed.", retry: "Do not infer a policy the source does not state." }),
        independent: practice({ id: "explicit-lead-independent", prompt: "Identify the explicit requirement.", sourceBody: "Receipts must be submitted within 30 days.", choices: [["30", "Receipts must be submitted within 30 days"], ["email", "Receipts must be emailed"], ["approval", "All receipts will be approved"]], correct: "30", success: "Independent explicit-document evidence logged.", retry: "Choose only the requirement written in the clause." }),
        transfer: practice({ id: "explicit-lead-transfer", prompt: "Transfer to a technical notice.", sourceBody: "Calibration begins after the system reaches 20°C.", choices: [["after", "Calibration begins after 20°C is reached"], ["before", "Calibration begins before 20°C"], ["manual", "Calibration must be manual"]], correct: "after", success: "Direct evidence transferred to technical text.", retry: "Stay with the condition actually stated." }),
      }),
    },
  },

  "TEACH.EVID.LOCATE": {
    id: "TEACH.EVID.LOCATE",
    skillId: "EVID.001",
    title: "Show Your Evidence",
    stages: ["young-investigator", "investigator", "lead-investigator"],
    notebookTool: { title: "Show Your Evidence", reminder: "Choose the clue that actually proves or supports your answer—not the clue that merely sounds related." },
    variants: {
      "young-investigator": variant({
        stage: "young-investigator",
        discover: { title: "An answer needs a clue", body: "Detectives do not only say what they think. They show the clue that helped them decide." },
        explanation: "Good evidence is the part of the text that directly helps answer the question.",
        model: { sourceBody: "The sign says: Dogs must stay on a leash.", thinking: "If I say dogs need a leash, I can show the exact words ‘must stay on a leash.’" },
        together: practice({ id: "evid-young-together", prompt: "Which clue proves the library closes at 6?", sourceBody: "LIBRARY HOURS — Closes 6:00 p.m.", choices: [["hours", "Closes 6:00 p.m."], ["library", "LIBRARY"], ["guess", "It is probably dark then"]], correct: "hours", success: "That clue directly supports the answer.", retry: "Pick the words that contain the actual closing time." }),
        supported: practice({ id: "evid-young-supported", prompt: "Which clue supports that Maya brought lunch?", sourceBody: "Maya opened her lunch bag and took out a sandwich.", choices: [["bag", "opened her lunch bag"], ["name", "Maya"], ["outside", "She probably ate outside"]], correct: "bag", success: "You selected relevant text evidence.", retry: "Which words connect most directly to bringing lunch?" }),
        independent: practice({ id: "evid-young-independent", prompt: "Show the best clue that the floor is wet.", sourceBody: "Water covered the floor near the sink.", choices: [["water", "Water covered the floor"], ["sink", "near the sink"], ["rain", "It probably rained"]], correct: "water", success: "Independent evidence location logged.", retry: "Choose the phrase that directly establishes wetness." }),
        transfer: practice({ id: "evid-young-transfer", prompt: "Transfer to a new notice: which clue proves helmets are required?", sourceBody: "BIKE AREA — Helmets required.", choices: [["required", "Helmets required"], ["bike", "BIKE AREA"], ["safe", "Helmets are safe"]], correct: "required", success: "Evidence selection transferred to a notice.", retry: "Find the exact words that create the requirement." }),
      }),
      investigator: variant({
        stage: "investigator",
        discover: { title: "Related is not the same as supportive", body: "A source may contain many true details. Evidence is the part that actually supports the conclusion you are making." },
        explanation: "Select the smallest relevant passage that connects to the claim. Avoid interesting but irrelevant details and outside assumptions.",
        model: { sourceBody: "The official notice says the program begins at 6:30. A text message guesses 6:00.", thinking: "For the program start time, the official notice containing ‘begins at 6:30’ is the strongest direct evidence." },
        together: practice({ id: "evid-jr-together", prompt: "Which detail supports the claim that the route changed?", sourceBody: "Starting Monday, Route 4 will use Pine Street instead of Oak Street.", choices: [["pine", "will use Pine Street instead of Oak Street"], ["monday", "Starting Monday"], ["traffic", "Traffic is usually heavy"]], correct: "pine", success: "You selected the detail that establishes the change itself.", retry: "Which phrase shows what changed, not merely when?" }),
        supported: practice({ id: "evid-jr-supported", prompt: "Which evidence best supports that attendance declined?", sourceBody: "Attendance fell from 420 students Monday to 360 Tuesday.", choices: [["numbers", "fell from 420 ... to 360"], ["tuesday", "Tuesday"], ["weather", "It may have rained"]], correct: "numbers", success: "Relevant quantitative evidence selected.", retry: "Use the detail that actually demonstrates a decline." }),
        independent: practice({ id: "evid-jr-independent", prompt: "Choose the strongest text evidence for the stated cancellation.", sourceBody: "Official update: Tonight's concert has been canceled.", choices: [["official", "Tonight's concert has been canceled"], ["tonight", "Tonight's"], ["rumor", "A friend said it might be canceled"]], correct: "official", success: "Independent evidence selection logged.", retry: "Choose the language that directly establishes cancellation." }),
        transfer: practice({ id: "evid-jr-transfer", prompt: "Transfer to an article. Which sentence supports the claim that the park expanded?", sourceBody: "The park added twelve acres this year. It also repainted the entrance sign.", choices: [["acres", "The park added twelve acres this year"], ["paint", "It repainted the entrance sign"], ["popular", "The park is probably more popular"]], correct: "acres", success: "Evidence selection transferred to article text.", retry: "Pick the fact that actually demonstrates expansion." }),
      }),
      "lead-investigator": variant({
        stage: "lead-investigator",
        discover: { title: "A conclusion is only as good as the evidence attached to it", body: "Professional reading often requires proving exactly which clause, data point, or statement supports a decision." },
        explanation: "Locate the source, then narrow to the sentence or phrase that does the evidentiary work. Do not substitute a related statement for the operative one.",
        model: { sourceBody: "Returns accepted within 30 days. Final-sale items are excluded.", thinking: "For whether a final-sale item can be returned, the operative evidence is ‘Final-sale items are excluded,’ not the general 30-day rule." },
        together: practice({ id: "evid-lead-together", prompt: "Which phrase proves approval is not guaranteed?", sourceBody: "Employees may request schedule changes. Requests are subject to supervisor approval.", choices: [["approval", "subject to supervisor approval"], ["request", "may request"], ["employee", "Employees"]], correct: "approval", success: "You found the phrase controlling the conclusion.", retry: "Which words make the outcome depend on another decision?" }),
        supported: practice({ id: "evid-lead-supported", prompt: "Which evidence establishes the cancellation deadline?", sourceBody: "Cancellation must be received at least 24 hours before renewal.", choices: [["24", "at least 24 hours before renewal"], ["must", "must be received"], ["refund", "A refund will be provided"]], correct: "24", success: "Deadline evidence identified precisely.", retry: "Find the phrase that specifies when cancellation must arrive." }),
        independent: practice({ id: "evid-lead-independent", prompt: "Select the operative evidence for who pays return shipping.", sourceBody: "The company replaces defective units. Customer is responsible for return shipping.", choices: [["customer", "Customer is responsible for return shipping"], ["replace", "The company replaces defective units"], ["defect", "defective units"]], correct: "customer", success: "Independent operative-evidence selection logged.", retry: "Choose the clause assigning the exact responsibility in question." }),
        transfer: practice({ id: "evid-lead-transfer", prompt: "Transfer to a workplace procedure. Which phrase proves power must be disconnected first?", sourceBody: "Disconnect power before removing the safety guard.", choices: [["before", "Disconnect power before removing the safety guard"], ["guard", "safety guard"], ["repair", "The unit needs repair"]], correct: "before", success: "Evidence precision transferred to procedural text.", retry: "Locate the words establishing the required sequence." }),
      }),
    },
  },

  "TEACH.SENT.CONTRAST": {
    id: "TEACH.SENT.CONTRAST",
    skillId: "SENT.003",
    title: "Track Contrast Words",
    stages: ["investigator", "lead-investigator"],
    notebookTool: { title: "Contrast Words", reminder: "However and although signal that the next idea contrasts with another idea. Keep both sides." },
    variants: {
      investigator: variant({
        stage: "investigator",
        discover: { title: "One connector can flip the relationship", body: "Words such as however and although tell us that two ideas pull in different directions." },
        explanation: "Do not stop after the first idea. A contrast connector signals that another important piece changes or complicates it.",
        model: { sourceBody: "Ari wanted to attend. However, she had to work.", thinking: "Wanting to attend is one idea. ‘However’ warns me the next idea contrasts: work prevents it." },
        together: practice({ id: "contrast-jr-together", prompt: "What relationship does ‘however’ signal?", sourceBody: "The team practiced daily. However, they still felt nervous.", choices: [["contrast", "The second idea contrasts with the first"], ["cause", "The first idea caused the second"], ["example", "The second is an example"]], correct: "contrast", success: "You tracked the contrast across both sentences.", retry: "Notice that practice and nervousness do not point in the same expected direction." }),
        supported: practice({ id: "contrast-jr-supported", prompt: "What does ‘although’ tell you?", sourceBody: "Although the store was open, the service desk was closed.", choices: [["contrast", "Open store and closed desk contrast"], ["same", "Both were open"], ["sequence", "The desk opened later"]], correct: "contrast", success: "Contrast meaning confirmed.", retry: "Keep both parts of the sentence and compare them." }),
        independent: practice({ id: "contrast-jr-independent", prompt: "Interpret the connector independently.", sourceBody: "The article is detailed; however, it provides no sources.", choices: [["limit", "Detail does not remove the sourcing problem"], ["support", "Detail proves the article is sourced"], ["cause", "Sources caused the detail"]], correct: "limit", success: "Independent contrast reading logged.", retry: "What does the second clause complicate about the first?" }),
        transfer: practice({ id: "contrast-jr-transfer", prompt: "Transfer to a policy message.", sourceBody: "The request was submitted on time. However, it still requires approval.", choices: [["approval", "On-time submission does not guarantee approval"], ["guarantee", "On-time submission guarantees approval"], ["late", "The request was late"]], correct: "approval", success: "Contrast reading transferred to a policy context.", retry: "Use ‘however’ to keep the approval condition from being lost." }),
      }),
      "lead-investigator": variant({
        stage: "lead-investigator",
        discover: { title: "Contrast language can preserve an exception or limitation", body: "In professional documents, however, although, nevertheless, and similar connectors can prevent a reader from overgeneralizing the first clause." },
        explanation: "Read both sides before concluding. The second clause may qualify, limit, or oppose the first.",
        model: { sourceBody: "The warranty covers parts. However, labor costs are excluded.", thinking: "Coverage exists, but ‘however’ introduces a limitation. I cannot say all repair costs are covered." },
        together: practice({ id: "contrast-lead-together", prompt: "What conclusion respects the contrast?", sourceBody: "The account may be canceled anytime. However, prepaid fees are nonrefundable.", choices: [["no-refund", "Cancellation is allowed, but prepaid fees generally are not returned"], ["refund", "Cancellation guarantees a refund"], ["no-cancel", "Cancellation is prohibited"]], correct: "no-refund", success: "You preserved both the permission and the limitation.", retry: "Do not let the first sentence erase the ‘however’ clause." }),
        supported: practice({ id: "contrast-lead-supported", prompt: "Interpret the limitation.", sourceBody: "The report found improvement; however, the sample was small.", choices: [["caution", "The improvement finding should be read with the sample limitation"], ["proof", "The small sample proves the finding"], ["none", "Sample size is irrelevant"]], correct: "caution", success: "You treated the second clause as a meaningful qualification.", retry: "Ask what the ‘however’ clause changes about how strongly to read the first." }),
        independent: practice({ id: "contrast-lead-independent", prompt: "Choose the precise reading.", sourceBody: "Access is normally available. However, maintenance windows may interrupt service.", choices: [["interrupt", "Availability has a stated limitation during maintenance"], ["always", "Access is guaranteed at all times"], ["never", "Access is never available"]], correct: "interrupt", success: "Independent contrast interpretation logged.", retry: "Preserve the normal rule and the stated limitation." }),
        transfer: practice({ id: "contrast-lead-transfer", prompt: "Transfer to research language.", sourceBody: "Scores increased. However, the study did not include a control group.", choices: [["limit", "The result exists, but the missing control limits what can be concluded"], ["cause", "The study proves the intervention caused the increase"], ["ignore", "The missing control does not matter"]], correct: "limit", success: "Contrast reasoning transferred to research text.", retry: "Use the second clause to calibrate the strength of the conclusion." }),
      }),
    },
  },

  "TEACH.SENT.CONDITION": {
    id: "TEACH.SENT.CONDITION",
    skillId: "SENT.005",
    title: "Conditions Change the Rule",
    stages: ["investigator", "lead-investigator"],
    notebookTool: { title: "Condition Check", reminder: "When you see if, unless, except, or provided that, find the condition before deciding what the rule allows." },
    variants: {
      investigator: variant({
        stage: "investigator",
        discover: { title: "A rule may depend on another fact", body: "Condition words tell us when a statement applies and when it does not." },
        explanation: "‘You may enter if your badge is active’ does not permit everyone to enter. The badge condition must be satisfied.",
        model: { sourceBody: "Students may leave early if a guardian signs the form.", thinking: "Leaving early is possible only when the guardian-signature condition is met." },
        together: practice({ id: "condition-jr-together", prompt: "Who may use the room?", sourceBody: "Students may use the lab if a teacher is present.", choices: [["teacher", "Students with a teacher present"], ["all", "All students at any time"], ["none", "No students"]], correct: "teacher", success: "You applied the condition before the permission.", retry: "Find what must be true after the word ‘if.’" }),
        supported: practice({ id: "condition-jr-supported", prompt: "What does the rule allow?", sourceBody: "You may submit online unless the portal is closed.", choices: [["open", "Online submission is allowed when the portal is not closed"], ["always", "Online submission is always allowed"], ["never", "Online submission is never allowed"]], correct: "open", success: "You tracked the exception created by ‘unless.’", retry: "Treat ‘unless the portal is closed’ as the situation that changes the general rule." }),
        independent: practice({ id: "condition-jr-independent", prompt: "Apply the condition independently.", sourceBody: "Entry is free except during ticketed events.", choices: [["ticketed", "Ticketed events are an exception to free entry"], ["always", "Entry is always free"], ["never", "Entry is never free"]], correct: "ticketed", success: "Independent condition reading logged.", retry: "Which situation is carved out by ‘except’?" }),
        transfer: practice({ id: "condition-jr-transfer", prompt: "Transfer to an application rule.", sourceBody: "Applications are reviewed provided that all required fields are complete.", choices: [["complete", "Review depends on required fields being complete"], ["guarantee", "Every application is approved"], ["optional", "Required fields are optional"]], correct: "complete", success: "Condition reasoning transferred to an application context.", retry: "Find what has to be true before review occurs." }),
      }),
      "lead-investigator": variant({
        stage: "lead-investigator",
        discover: { title: "Conditions, exceptions, and qualifications control real decisions", body: "A clause may state a general rule and then narrow it with if, unless, except, subject to, or provided that." },
        explanation: "Extract the general rule, then the condition or exception. Apply both before deciding what a party can or must do.",
        model: { sourceBody: "Returns are accepted within 30 days unless the item is marked final sale.", thinking: "The general rule allows 30-day returns. Final-sale status is an exception that changes the result." },
        together: practice({ id: "condition-lead-together", prompt: "Can this customer cancel without a fee?", sourceBody: "Cancellation is free if received at least 48 hours before service.", choices: [["depends", "Only if the cancellation is received at least 48 hours before service"], ["always", "Yes, at any time"], ["never", "No cancellations are free"]], correct: "depends", success: "You applied the stated condition rather than the headline rule alone.", retry: "What must be true after ‘if’?" }),
        supported: practice({ id: "condition-lead-supported", prompt: "Apply the exception.", sourceBody: "Access is permitted except during scheduled maintenance.", choices: [["maintenance", "Scheduled maintenance is an exception to access"], ["always", "Access is always permitted"], ["none", "Access is never permitted"]], correct: "maintenance", success: "Exception reading confirmed.", retry: "Which situation is excluded by ‘except’?" }),
        independent: practice({ id: "condition-lead-independent", prompt: "Interpret the clause independently.", sourceBody: "The discount applies provided that payment is received by Friday.", choices: [["friday", "The discount depends on payment being received by Friday"], ["guarantee", "The discount applies regardless of payment date"], ["refund", "Late payment creates a refund"]], correct: "friday", success: "Independent conditional-language evidence logged.", retry: "Treat the phrase after ‘provided that’ as a required condition." }),
        transfer: practice({ id: "condition-lead-transfer", prompt: "Transfer to workplace policy.", sourceBody: "Remote work may continue subject to manager approval.", choices: [["approval", "Remote work depends on manager approval"], ["automatic", "Remote work is automatically guaranteed"], ["prohibited", "Remote work is prohibited"]], correct: "approval", success: "Conditional reading transferred to workplace policy.", retry: "‘Subject to’ means another condition controls the permission." }),
      }),
    },
  },

  "TEACH.LEGAL.OBLIGATION": {
    id: "TEACH.LEGAL.OBLIGATION",
    skillId: "LEGAL.001",
    title: "Who Must Do What?",
    stages: ["lead-investigator"],
    notebookTool: { title: "Legal Obligation Check", reminder: "Find the party, the obligation word, the required action, the condition or deadline, and the consequence if stated." },
    variants: {
      "lead-investigator": variant({
        stage: "lead-investigator",
        discover: { title: "Legal language assigns jobs to specific parties", body: "Before deciding whether a clause helps or hurts someone, identify exactly who is required to do what." },
        explanation: "Words such as must and shall commonly signal an obligation. Then identify the party, required action, timing, and any condition. Reading Detective explains language, not whether a clause is legally enforceable.",
        model: { sourceBody: "Tenant must notify management in writing within five days.", thinking: "Party: tenant. Obligation word: must. Action: notify management. Method: in writing. Deadline: within five days." },
        together: practice({ id: "legal-obligation-together", prompt: "Who has the obligation?", sourceBody: "Customer must return defective equipment within 14 days.", choices: [["customer", "Customer"], ["company", "Company"], ["both", "Both parties"]], correct: "customer", success: "You assigned the obligation to the correct party.", retry: "Find the party immediately connected to ‘must.’" }),
        supported: practice({ id: "legal-obligation-supported", prompt: "What action is required?", sourceBody: "Employee shall submit the signed form before access is granted.", choices: [["submit", "Submit the signed form"], ["grant", "Grant access"], ["optional", "No action is required"]], correct: "submit", success: "Required action identified.", retry: "Which action follows the obligation word ‘shall’?" }),
        independent: practice({ id: "legal-obligation-independent", prompt: "Map the obligation independently.", sourceBody: "Vendor must deliver replacement parts by June 10.", choices: [["vendor", "Vendor must deliver replacement parts by June 10"], ["buyer", "Buyer must deliver the parts"], ["optional", "Delivery is optional"]], correct: "vendor", success: "Independent legal-obligation reading logged.", retry: "Keep party, required action, and deadline together." }),
        transfer: practice({ id: "legal-obligation-transfer", prompt: "Transfer to a lease clause.", sourceBody: "Resident shall maintain smoke detectors in working condition.", choices: [["resident", "The resident has the stated maintenance obligation"], ["landlord", "The clause assigns the obligation to the landlord"], ["none", "The clause creates no obligation"]], correct: "resident", success: "Obligation analysis transferred to a lease context.", retry: "Identify who is directly paired with ‘shall.’" }),
      }),
    },
  },

  "TEACH.LEGAL.DEFINED": {
    id: "TEACH.LEGAL.DEFINED",
    skillId: "LEGAL.008",
    title: "Use the Document's Definition",
    stages: ["lead-investigator"],
    notebookTool: { title: "Defined Terms", reminder: "If the document defines a term, use that definition for the document instead of silently substituting everyday meaning." },
    variants: {
      "lead-investigator": variant({
        stage: "lead-investigator",
        discover: { title: "A familiar word can have a special document meaning", body: "Formal documents often define terms. Once defined, that meaning can control how later clauses should be read." },
        explanation: "Find the definition, note its scope, and apply it consistently. Do not assume an everyday meaning if the document gives its own definition.",
        model: { sourceBody: "‘Business Day’ means Monday through Friday, excluding federal holidays.", thinking: "If another clause says ‘within three Business Days,’ I must count using this definition, not every calendar day." },
        together: practice({ id: "defined-together", prompt: "What does ‘Written Notice’ mean in this document?", sourceBody: "‘Written Notice’ means notice delivered by email or certified mail.", choices: [["defined", "Email or certified mail"], ["phone", "A phone call"], ["any", "Any communication"]], correct: "defined", success: "You used the document's definition.", retry: "Use the exact methods listed in the definition." }),
        supported: practice({ id: "defined-supported", prompt: "Does Saturday count as a Business Day here?", sourceBody: "‘Business Day’ means Monday through Friday, excluding federal holidays.", choices: [["no", "No"], ["yes", "Yes"], ["unknown", "The document gives no definition"]], correct: "no", success: "Defined-term application confirmed.", retry: "Compare Saturday to the days included in the document's definition." }),
        independent: practice({ id: "defined-independent", prompt: "Apply the definition independently.", sourceBody: "‘Service Area’ means the counties listed in Appendix A. Coverage is available only within the Service Area.", choices: [["appendix", "Coverage depends on whether the county appears in Appendix A"], ["everywhere", "Coverage is available everywhere"], ["city", "Service Area means any city"]], correct: "appendix", success: "Independent defined-term reading logged.", retry: "Use the document's stated definition of Service Area." }),
        transfer: practice({ id: "defined-transfer", prompt: "Transfer to another agreement.", sourceBody: "‘Account Holder’ means the person named on the billing statement. Only the Account Holder may change the plan.", choices: [["named", "Only the person named on the billing statement may change the plan"], ["user", "Any user may change the plan"], ["company", "Only the company may change the plan"]], correct: "named", success: "Defined-term reasoning transferred to a new agreement.", retry: "Apply the definition before reading the permission clause." }),
      }),
    },
  },
};


// v1.4.2 pre-reader-first interaction repair: the first CVC lesson must visibly
// teach with building/matching before independent printed decoding.
const youngCvc = legacyTeachingModules["TEACH.CODE.CVC"].variants["young-investigator"]!;
youngCvc.together = {
  ...youngCvc.together,
  prompt: "Listen to sat. Tap the letters in the order that builds the word.",
  audioText: "sat",
  sourceBody: undefined,
  interaction: "sequence",
  choices: [],
  correctAnswerIds: ["structured"],
  sequenceTokens: [
    { id: "s", label: "s", audioText: "/s/" },
    { id: "a", label: "a", audioText: "/a/" },
    { id: "t", label: "t", audioText: "/t/" },
  ],
};
youngCvc.supported = {
  ...youngCvc.supported,
  prompt: "Match each letter to the sound it gives in mat.",
  sourceBody: "m a t",
  interaction: "match",
  choices: [],
  correctAnswerIds: ["structured"],
  matchPairs: [
    { id: "m", left: "m", right: "/m/", rightAudioText: "/m/" },
    { id: "a", left: "a", right: "/a/", rightAudioText: "/a/" },
    { id: "t", left: "t", right: "/t/", rightAudioText: "/t/" },
  ],
};
// Encoding / production: the learner builds the word from grapheme tiles.
// This exercises the Hear -> Identify -> Build step of the foundational flow.
youngCvc.independent = {
  ...youngCvc.independent,
  prompt: "Build the word map. Choose each letter in the order you hear it.",
  audioText: "map",
  sourceBody: undefined,
  interaction: "build",
  choices: [],
  correctAnswerIds: ["structured"],
  buildTarget: { word: "map", graphemes: ["m", "a", "p"], distractors: ["t", "s"], audioText: "map" },
};
// Connected-text application: a short controlled sentence using patterns already
// taught (short-a CVC words), read and comprehended rather than decoded in isolation.
youngCvc.transfer = practice({
  id: "cvc-connected-text",
  prompt: "Read the sentence. Then choose what the cat did.",
  sourceBody: "The cat sat on a mat.",
  choices: [
    ["sat", "It sat on a mat."],
    ["ran", "It ran up a hill."],
    ["hid", "It hid in a bag."],
  ],
  correct: "sat",
  success: "You read a whole sentence using the sounds you built. That is real reading.",
  retry: "Read it again slowly: The cat sat on a mat.",
});

// Older-presentation (Investigator) encoding for a struggling reader repairing the
// same foundational skill: typed spelling keeps the work age-respecting.
const cvcInvestigator = legacyTeachingModules["TEACH.CODE.CVC"].variants["investigator"]!;
cvcInvestigator.independent = {
  ...cvcInvestigator.independent,
  prompt: "Spell the word you hear.",
  audioText: "sun",
  sourceBody: undefined,
  interaction: "spell",
  choices: [],
  correctAnswerIds: ["structured"],
  spellTarget: { word: "sun", accept: ["sun"], hint: "Three sounds: /s/ /u/ /n/.", audioText: "sun" },
};

export const teachingModules: Record<string, TeachingModule> = {
  ...foundationTeachingModules,
  ...juniorHighTeachingModules,
  ...highSchoolTeachingModules,
  ...highSchoolResearchTeachingModules,
  ...curriculumCompletionTeachingModules,
  ...legacyTeachingModules,
};

export const teachingModuleBySkill: Record<string, TeachingModule> = Object.fromEntries(
  Object.values(teachingModules).map((module) => [module.skillId, module]),
);
