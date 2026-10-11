import type {
  PresentationStage,
  TeachingModule,
  TeachingPracticeItem,
  TeachingPresentationVariant,
} from "../domain";

const choice = (id: string, label: string) => ({ id, label });

type ItemSeed = {
  prompt: string;
  body: string;
  choices: [string, string][];
  correct: string;
  success: string;
  retry: string;
};

type ModuleSeed = {
  id: string;
  skillId: string;
  title: string;
  notebookTitle: string;
  reminder: string;
  stages: PresentationStage[];
  discover: string;
  explanation: string;
  modelBody: string;
  modelThinking: string;
  together: ItemSeed;
  supported: ItemSeed;
  independent: ItemSeed;
  transfer: ItemSeed;
};

const stageFraming: Record<PresentationStage, string> = {
  "young-investigator": "We will make the reading clue visible and practice it one small step at a time.",
  investigator: "We will inspect the reading move directly and apply it in an age-respecting case context.",
  "lead-investigator": "We will analyze the exact reading mechanism and apply it to mature documents or narratives without changing your presentation level.",
};

const sourceTitle: Record<PresentationStage, string> = {
  "young-investigator": "Case Clue",
  investigator: "Evidence Card",
  "lead-investigator": "Field Document",
};

function item(moduleId: string, stage: PresentationStage, phase: string, seed: ItemSeed): TeachingPracticeItem {
  return {
    id: `${moduleId.toLowerCase().replaceAll(".", "-")}-${stage}-${phase}`,
    prompt: seed.prompt,
    sourceTitle: sourceTitle[stage],
    sourceBody: seed.body,
    choices: seed.choices.map(([id, label]) => choice(id, label)),
    correctAnswerIds: [seed.correct],
    successMessage: seed.success,
    retryMessage: seed.retry,
  };
}

function make(seed: ModuleSeed): TeachingModule {
  const variants: Partial<Record<PresentationStage, TeachingPresentationVariant>> = {};
  for (const stage of seed.stages) {
    variants[stage] = {
      stage,
      discover: { title: "Investigate the reading tool", body: `${stageFraming[stage]} ${seed.discover}` },
      explanation: seed.explanation,
      model: { sourceTitle: sourceTitle[stage], sourceBody: seed.modelBody, thinking: seed.modelThinking },
      together: item(seed.id, stage, "together", seed.together),
      supported: item(seed.id, stage, "supported", seed.supported),
      independent: item(seed.id, stage, "independent", seed.independent),
      transfer: item(seed.id, stage, "transfer", seed.transfer),
    };
  }
  return {
    id: seed.id,
    skillId: seed.skillId,
    title: seed.title,
    stages: [...seed.stages],
    notebookTool: { title: seed.notebookTitle, reminder: seed.reminder },
    variants,
  };
}

const allStages: PresentationStage[] = ["young-investigator", "investigator", "lead-investigator"];
const olderStages: PresentationStage[] = ["investigator", "lead-investigator"];
const leadOnly: PresentationStage[] = ["lead-investigator"];

const seeds: ModuleSeed[] = [
  {
    id: "TEACH.CODE.HIGH_FREQUENCY", skillId: "CODE.010", title: "Map the Tricky Part", notebookTitle: "Tricky-Word Map",
    reminder: "Do not memorize a word as a picture. Map the sound-spelling parts you know and explicitly learn the unexpected part.", stages: allStages,
    discover: "Some very common words contain a spelling pattern you have not learned yet or a part that does not match the most common sound you expect.",
    explanation: "Keep the parts that do follow familiar sound-spelling patterns. Mark the unusual part as the piece to remember. This builds a word map instead of a visual guess.",
    modelBody: "said → s | ai | d", modelThinking: "The s and d are familiar. In this word, ai represents the /e/ sound. I map the whole word and remember that unusual middle spelling.",
    together: { prompt: "Which is the best way to learn the word said?", body: "said", choices: [["map","Map the known sounds and remember the unusual ai spelling"],["shape","Memorize the outside shape of the word"],["guess","Guess from the first letter"]], correct: "map", success: "You mapped the word instead of treating it like a picture.", retry: "Use the letters and sounds you know, then isolate the unusual part." },
    supported: { prompt: "What is the useful clue in the word was?", body: "was", choices: [["whole","Map w and the ending sound, then remember the word-specific vowel pronunciation"],["photo","Remember only what the word looks like"],["first","Use only w and guess"]], correct: "whole", success: "You kept the whole spelling in the word map.", retry: "Do not throw away the regular parts because one part is tricky." },
    independent: { prompt: "Choose the strongest reading strategy for this common word.", body: "the", choices: [["map","Connect the printed letters to the spoken word and learn the word-specific spelling pattern"],["guess","Guess from sentence context every time"],["outline","Memorize the word silhouette"]], correct: "map", success: "Independent tricky-word mapping logged.", retry: "Reading should stay connected to print, not to word shape." },
    transfer: { prompt: "Transfer the tool to another frequent word.", body: "does", choices: [["map","Map the spelling to the spoken word and remember the unusual vowel sound"],["skip","Skip the word and infer the sentence"],["picture","Store it only as a visual picture"]], correct: "map", success: "The strategy transferred to a new high-frequency word.", retry: "Keep print and sound connected even when one part is unexpected." },
  },
  {
    id: "TEACH.SENT.PUNCTUATION", skillId: "SENT.006", title: "Punctuation Changes the Reading", notebookTitle: "Punctuation Clues",
    reminder: "Punctuation can signal a finished thought, a question, strong emphasis, a pause, or exact spoken words.", stages: allStages,
    discover: "The words can stay the same while punctuation changes how the message should be understood or heard.",
    explanation: "A period closes a statement, a question mark signals a question, an exclamation mark can signal strong emphasis, commas organize phrasing, and quotation marks can show exact spoken words.",
    modelBody: "You finished.   You finished?", modelThinking: "The words match, but the first states something and the second asks whether it is true. The punctuation changes the reading job.",
    together: { prompt: "Which sentence is asking a question?", body: "The gate is open.  |  The gate is open?", choices: [["question","The gate is open?"],["statement","The gate is open."]], correct: "question", success: "You used the question mark as a meaning clue.", retry: "Find the mark that signals a question." },
    supported: { prompt: "What do the quotation marks tell you?", body: "Avery said, “Meet me at the desk.”", choices: [["exact","They mark Avery's exact spoken words"],["question","They turn the sentence into a question"],["stop","They mean the sentence must stop at Avery"]], correct: "exact", success: "Quotation marks were used as a dialogue clue.", retry: "Look at the words enclosed by the quotation marks." },
    independent: { prompt: "What does the comma help organize here?", body: "Before you leave, sign the sheet.", choices: [["phrases","It separates the opening condition from the main instruction"],["end","It means the whole message is finished"],["quote","It marks exact speech"]], correct: "phrases", success: "Independent punctuation meaning logged.", retry: "Read the two meaning groups on either side of the comma." },
    transfer: { prompt: "Transfer punctuation reading to a warning.", body: "Stop!", choices: [["emphasis","The exclamation mark signals strong emphasis"],["question","The writer is asking whether to stop"],["optional","The word becomes optional"]], correct: "emphasis", success: "Punctuation meaning transferred to a new context.", retry: "The mark changes how strongly the word is delivered, not its basic action." },
  },
  {
    id: "TEACH.FLUENCY.PHRASING", skillId: "FLUENCY.001", title: "Read in Meaningful Phrases", notebookTitle: "Phrase for Meaning",
    reminder: "Fluency is not racing. Group words that belong together, respond to punctuation, stay accurate, and keep meaning intact.", stages: allStages,
    discover: "Reading every word as a separate stop can make meaning harder to hold. Skilled reading groups words into meaningful units.",
    explanation: "Use sentence meaning and punctuation to decide where phrases belong. The goal is accurate, understandable reading—not maximum speed.",
    modelBody: "After the meeting, / the team returned / to the lab.", modelThinking: "I group words that form one idea. The comma gives me a natural boundary, and I keep the rest in meaningful phrases.",
    together: { prompt: "Which phrasing best preserves meaning?", body: "The small dog ran home.", choices: [["meaning","The small dog / ran home."],["choppy","The / small / dog / ran / home."],["wrong","The small / dog ran / home."]], correct: "meaning", success: "You grouped the sentence by meaning.", retry: "Keep words that belong to one idea together." },
    supported: { prompt: "Where is the strongest phrase boundary?", body: "When the bell rings, students may enter.", choices: [["comma","When the bell rings, / students may enter."],["inside","When the / bell rings students / may enter."],["none","Read every word with the same spacing"]], correct: "comma", success: "You used syntax and punctuation to guide phrasing.", retry: "The opening condition forms one complete meaning group." },
    independent: { prompt: "Choose the reading that keeps the condition clear.", body: "If the light is red, wait at the line.", choices: [["clear","If the light is red, / wait at the line."],["blur","If / the light is / red wait / at the line."],["race","Read it as fast as possible with no pause"]], correct: "clear", success: "Independent phrasing evidence logged.", retry: "Group the if-condition separately from the action." },
    transfer: { prompt: "Transfer phrasing to a document sentence.", body: "After payment is received, the receipt will be emailed.", choices: [["clear","After payment is received, / the receipt will be emailed."],["split","After / payment is / received the / receipt will be emailed."],["speed","The fastest reading is always best"]], correct: "clear", success: "Meaningful phrasing transferred to a document context.", retry: "Accuracy and meaning control the phrasing; speed does not." },
  },
  {
    id: "TEACH.LIT.MOTIVE", skillId: "LIT.001", title: "Infer Motive Without Turning It Into Fact", notebookTitle: "Motive Evidence",
    reminder: "A motive can be strongly supported without being directly stated. Separate what the text says from what you infer.", stages: olderStages,
    discover: "Characters often reveal motives through choices, reactions, and patterns rather than by announcing what they feel.",
    explanation: "Collect behavior and language that point toward a motive. Then label the conclusion honestly: explicit, strongly supported, plausible, or unsupported.",
    modelBody: "Nia congratulated the winner, then immediately changed the subject whenever the award was mentioned.", modelThinking: "Jealousy is possible and may be supported, but the text does not directly state it. I should present it as an interpretation supported by behavior.",
    together: { prompt: "Which conclusion is most precise?", body: "Devon reread the acceptance email three times and saved a copy.", choices: [["support","The email seems important to Devon; the text supports that interpretation"],["fact","The text proves Devon plans to quit tomorrow"],["none","The actions cannot suggest anything"]], correct: "support", success: "You kept inference strength calibrated.", retry: "Use the behavior, but do not invent a motive the text cannot support." },
    supported: { prompt: "What should you call this motive claim?", body: "She hid the broken vase and avoided the room when her father entered.", choices: [["strong","Strongly supported interpretation: she may fear being blamed"],["explicit","Directly stated fact: she says she is afraid"],["unsupported","No interpretation is possible"]], correct: "strong", success: "You distinguished strong inference from explicit fact.", retry: "The behavior is evidence, but the feeling is not directly stated." },
    independent: { prompt: "Choose the best evidence-based reading.", body: "After being offered the captain role, Eli asked whether someone else could lead and volunteered to organize equipment instead.", choices: [["precise","Eli may prefer a supporting role; that is an inference from his choices"],["certain","Eli definitely hates leadership"],["random","The text proves nothing about preference"]], correct: "precise", success: "Independent motive reasoning logged.", retry: "Avoid extreme certainty when the text gives behavior rather than a stated motive." },
    transfer: { prompt: "Transfer to a new scene.", body: "Mara kept checking the door during the speech and relaxed only after her sister arrived.", choices: [["inference","Mara may have been waiting or worried about her sister; the behavior supports that possibility"],["fact","Mara explicitly says she is angry"],["certain","The scene proves exactly why she watched the door"]], correct: "inference", success: "Motive reasoning transferred to a new narrative.", retry: "Match the strength of your conclusion to the evidence." },
  },
  {
    id: "TEACH.LIT.POV", skillId: "LIT.002", title: "Whose Eyes Shape the Story?", notebookTitle: "Point of View",
    reminder: "Identify who tells the story and what that narrator can actually know.", stages: olderStages,
    discover: "A narrative's point of view controls which thoughts, observations, and gaps the reader receives.",
    explanation: "First person uses a narrator inside the story. Limited narration follows one perspective. Omniscient narration can reveal multiple characters' inner thoughts. Point of view affects access, not automatic truth.",
    modelBody: "I watched the bus leave, but I could not tell what Sam was thinking.", modelThinking: "The narrator speaks as I and admits a knowledge boundary. This is first-person limited access.",
    together: { prompt: "What can this narrator know directly?", body: "I heard the announcement from the hallway.", choices: [["own","What the narrator heard and observed"],["everyone","Every person's private thoughts"],["future","Everything that will happen later"]], correct: "own", success: "You matched knowledge to point of view.", retry: "An I-narrator has direct access to their own experience, not everyone's mind." },
    supported: { prompt: "Which description fits?", body: "Tessa worried about the test. Across town, Luis wondered whether she would call.", choices: [["omniscient","The narrator reveals thoughts from more than one character"],["first","Only a first-person narrator could say this"],["objective","No inner thoughts are revealed"]], correct: "omniscient", success: "You recognized broad narrator access.", retry: "The narration enters two different characters' thoughts." },
    independent: { prompt: "What is the narrator's limit?", body: "Rico saw the envelope on the desk but did not know who had left it.", choices: [["limited","The narrator follows Rico's knowledge and does not reveal the unknown sender"],["all","The narrator knows every hidden fact"],["none","The sentence has no point of view"]], correct: "limited", success: "Independent point-of-view evidence logged.", retry: "Notice what the narrative explicitly says Rico does not know." },
    transfer: { prompt: "Transfer to a witness-style narrative.", body: "From my seat, I could see the argument begin, but the music was too loud to hear the words.", choices: [["boundary","The narrator can report seeing the argument but has limited evidence about what was said"],["full","The narrator knows every spoken word"],["false","Limited hearing means the entire account is false"]], correct: "boundary", success: "Point-of-view reasoning transferred to evidence limits.", retry: "A limitation narrows what the narrator can support; it does not erase everything observed." },
  },
  {
    id: "TEACH.LIT.THEME", skillId: "LIT.003", title: "Theme Is a Supported Idea, Not a Topic Word", notebookTitle: "Theme Evidence",
    reminder: "A topic is a subject such as friendship. A theme is a supportable statement about what the text explores about that subject.", stages: olderStages,
    discover: "A story can repeatedly explore an idea without stating a lesson in one sentence.",
    explanation: "Name the broad topic, then turn it into a claim that the story's events actually support. Use multiple moments from the text rather than one isolated detail.",
    modelBody: "Topic: friendship. Across the story, two friends repair their relationship only after both admit what they hid.", modelThinking: "A theme could be: lasting friendship requires honesty even when honesty is uncomfortable. That is a statement, not the single word friendship.",
    together: { prompt: "Which answer is a theme statement rather than only a topic?", body: "The story repeatedly shows a family rebuilding trust after telling the truth.", choices: [["theme","Trust can be rebuilt when people take responsibility and tell the truth"],["topic","Trust"],["plot","A family lives in a house"]], correct: "theme", success: "You turned the topic into a supportable larger idea.", retry: "A theme says something about the topic; it is not only the topic word." },
    supported: { prompt: "What should support a theme?", body: "A character sacrifices popularity twice to defend someone being treated unfairly.", choices: [["multiple","A pattern of relevant events across the story"],["one-word","Only the topic word courage"],["guess","A lesson you like even if the text does not support it"]], correct: "multiple", success: "You connected theme to repeated evidence.", retry: "Theme must grow from the story's pattern, not from preference." },
    independent: { prompt: "Choose the defensible theme.", body: "Three times, the protagonist chooses an easy shortcut; each shortcut creates a larger problem until she finally slows down and checks her work.", choices: [["care","Careful work can prevent problems created by rushing"],["topic","Problems"],["unrelated","Winning is always everything"]], correct: "care", success: "Independent theme reasoning logged.", retry: "Use the repeated pattern and its outcome." },
    transfer: { prompt: "Transfer to another narrative pattern.", body: "A character keeps refusing help to appear independent, then succeeds only after accepting a teammate's expertise.", choices: [["theme","Independence does not require refusing useful help"],["topic","Teamwork"],["unrelated","The story proves teams never disagree"]], correct: "theme", success: "Theme reasoning transferred to a new story.", retry: "Build a statement supported by the pattern of choices and outcome." },
  },
  {
    id: "TEACH.LIT.TONE", skillId: "LIT.004", title: "Word Choice Creates Tone", notebookTitle: "Tone Words",
    reminder: "Identify the exact words producing the attitude, then compare them with a neutral restatement.", stages: olderStages,
    discover: "Two sentences can report a similar event while producing very different attitudes through word choice.",
    explanation: "Tone is the attitude or emotional stance conveyed by the wording. Point to the phrases that create it; do not name a tone without evidence.",
    modelBody: "The council finally abandoned the reckless proposal.", modelThinking: "Finally and reckless add a critical, disapproving tone. A neutral restatement would be: The council rejected the proposal.",
    together: { prompt: "Which word most clearly creates a critical tone?", body: "The company quietly slipped another fee into the renewal notice.", choices: [["slipped","slipped"],["company","company"],["notice","notice"]], correct: "slipped", success: "You located tone in the wording.", retry: "Find the word that adds judgment rather than only describing the event." },
    supported: { prompt: "Which is the neutral restatement?", body: "The team heroically fought through the impossible schedule.", choices: [["neutral","The team completed work under a demanding schedule"],["same","The heroic team defeated an impossible enemy"],["stronger","The team performed the greatest feat ever"]], correct: "neutral", success: "You separated event from evaluative wording.", retry: "Remove praise or criticism while keeping the basic event." },
    independent: { prompt: "What tone does the phrase suggest?", body: "Another brilliant decision from management.", choices: [["sarcastic","Likely sarcastic or critical in context"],["neutral","Purely neutral with no evaluative signal"],["legal","Formal legal obligation"]], correct: "sarcastic", success: "Independent tone evidence logged.", retry: "Notice how brilliant can be used ironically when paired with another and context." },
    transfer: { prompt: "Transfer to a narrative sentence.", body: "She placed the cracked trophy gently on the shelf, as if it still mattered.", choices: [["tender","The wording supports a tender or reflective tone"],["furious","The sentence clearly shouts anger"],["neutral","No wording suggests attitude"]], correct: "tender", success: "Tone reasoning transferred to literary narration.", retry: "Use gently and as if it still mattered as evidence." },
  },
  {
    id: "TEACH.LIT.NARRATOR", skillId: "LIT.005", title: "A Narrator Can Be Limited Without Being Automatically False", notebookTitle: "Narrator Limits",
    reminder: "Ask what the narrator could know, what contradicts the account, and where self-interest may affect emphasis. Do not jump straight to liar.", stages: leadOnly,
    discover: "A narrator can misunderstand, omit, rationalize, or lack access to facts while still reporting some observations accurately.",
    explanation: "Track knowledge boundaries, contradictions, and incentives. Calibrate confidence claim by claim rather than assigning one global truth label to the narrator.",
    modelBody: "I knew nobody had entered the room. Later, the access log showed a badge entry at 8:14 PM while I was outside.", modelThinking: "The narrator's certainty is contradicted by an independent record. I should reduce confidence in that claim, not declare every sentence false.",
    together: { prompt: "What is the strongest reading?", body: "I never saw anyone move the box, so nobody moved it.", choices: [["limit","The narrator's observation does not justify the universal conclusion"],["truth","The sentence proves nobody moved the box"],["all-false","Every statement by this narrator must be false"]], correct: "limit", success: "You separated observation from overreach.", retry: "Not seeing an event is not always proof that it never happened." },
    supported: { prompt: "How should a contradiction affect reading?", body: "Narrator: I arrived at 9. Timestamped photo: narrator at another location at 9:03.", choices: [["claim","Recheck the arrival-time claim against the independent record"],["everything","Discard the entire story automatically"],["ignore","Ignore the photo because the narrator sounds confident"]], correct: "claim", success: "You calibrated one claim instead of assigning a global verdict.", retry: "Use the contradiction where it applies." },
    independent: { prompt: "What caution fits this narrator?", body: "I am sure Tessa refused because she was jealous, though she never told me why.", choices: [["inference","The narrator is presenting an interpretation of Tessa's motive as certainty"],["explicit","Tessa explicitly stated jealousy"],["omniscient","The narrator has direct access to Tessa's thoughts"]], correct: "inference", success: "Independent narrator-limit reasoning logged.", retry: "Separate what the narrator knows from what the narrator assumes." },
    transfer: { prompt: "Transfer to memoir-style narration.", body: "At the time, I believed the manager ignored my email. Years later I learned the account had been inactive.", choices: [["update","The later information changes how the earlier belief should be interpreted"],["lie","The earlier narrator must have knowingly lied"],["unchanged","New evidence cannot affect interpretation"]], correct: "update", success: "Narrator calibration transferred to changing information.", retry: "A sincere earlier belief can still be mistaken." },
  },
  {
    id: "TEACH.LIT.AMBIGUITY", skillId: "LIT.006", title: "More Than One Interpretation Can Be Defensible", notebookTitle: "Literary Interpretation",
    reminder: "An interpretation earns strength from textual evidence. Different interpretations can coexist when each explains the text and acknowledges ambiguity.", stages: leadOnly,
    discover: "Literary texts sometimes leave motives, symbols, or meanings deliberately open rather than resolving everything into one answer.",
    explanation: "State the interpretation, connect it to repeated textual evidence, compare alternatives, and avoid claiming certainty the text does not provide.",
    modelBody: "A locked door appears whenever the narrator avoids telling the truth, but the text never explains the door directly.", modelThinking: "The door could symbolize avoidance or emotional separation. I need repeated textual evidence and should allow another interpretation if it also fits.",
    together: { prompt: "Which response treats symbolism responsibly?", body: "A broken watch appears during several scenes about regret.", choices: [["evidence","The watch may symbolize time or regret; support that reading with the repeated scenes"],["certain","The author has only one possible meaning and we know it without evidence"],["none","Symbols can never support interpretation"]], correct: "evidence", success: "You tied symbolic meaning to a textual pattern.", retry: "Use pattern + interpretation + evidence, not certainty without support." },
    supported: { prompt: "What makes an alternate reading acceptable?", body: "Two readers interpret the final empty chair differently.", choices: [["support","Each interpretation explains relevant textual evidence and does not contradict key facts"],["preference","Any interpretation is correct if someone likes it"],["teacher","Only the first interpretation stated can be valid"]], correct: "support", success: "You distinguished evidence-based plurality from anything-goes guessing.", retry: "Multiple interpretations still need evidence." },
    independent: { prompt: "Choose the strongest literary reasoning.", body: "The river is described as widening whenever the protagonist considers leaving home.", choices: [["pattern","The recurring river imagery may represent possibility or distance; the pattern supports that interpretation without proving only one meaning"],["literal","The river definitely commands the character to leave"],["random","The repeated imagery has no possible interpretive role"]], correct: "pattern", success: "Independent ambiguity reasoning logged.", retry: "Use recurrence as evidence while keeping the conclusion appropriately open." },
    transfer: { prompt: "Transfer to an ambiguous ending.", body: "The final scene ends with the character holding an unopened letter and smiling, but the letter's contents are never shown.", choices: [["uncertain","Several explanations remain possible; a defensible reading should use earlier character and plot evidence"],["know","The reader can know the exact contents without evidence"],["none","Ambiguity means analysis is impossible"]], correct: "uncertain", success: "Ambiguity reasoning transferred to an unresolved ending.", retry: "Unresolved information invites evidence-based interpretation, not invented certainty." },
  },
  {
    id: "TEACH.PROC.STRENGTH", skillId: "PROC.001", title: "Required Is Not the Same as Recommended", notebookTitle: "Procedure Strength",
    reminder: "Mark each instruction as required, prohibited, recommended, or optional before deciding what a person may do.", stages: olderStages,
    discover: "Procedures use different language for commands, warnings, recommendations, and choices.",
    explanation: "Must, required, do not, recommended, should, and may do different jobs. The exact strength matters when reading safety and workplace instructions.",
    modelBody: "Disconnect power before service. Wearing eye protection is recommended during cleanup.", modelThinking: "Disconnect power is required. Eye protection is recommended in this sentence. I should not silently turn one into the other.",
    together: { prompt: "Which instruction is mandatory?", body: "Employees must sign out before removing equipment. Staff may request a carrying cart.", choices: [["sign","Sign out before removing equipment"],["cart","Request a carrying cart"]], correct: "sign", success: "You separated required from optional.", retry: "Look for must versus may." },
    supported: { prompt: "What does this line do?", body: "Do not open the panel while the status light is red.", choices: [["prohibit","It prohibits opening the panel under the stated condition"],["recommend","It merely suggests waiting"],["allow","It gives permission to open it"]], correct: "prohibit", success: "You recognized a prohibition.", retry: "Do not is stronger than a recommendation." },
    independent: { prompt: "Classify the instruction.", body: "For best results, allow the device to cool for five minutes.", choices: [["recommend","Recommended guidance"],["must","Mandatory requirement in this wording"],["ban","Prohibition"]], correct: "recommend", success: "Independent procedure-strength reading logged.", retry: "For best results signals advice in this case, not an absolute command." },
    transfer: { prompt: "Transfer to a school lab instruction.", body: "Goggles are required while the burner is in use; gloves are optional for this step.", choices: [["different","Goggles are mandatory; gloves are optional"],["both","Both are mandatory"],["neither","Neither matters"]], correct: "different", success: "Procedure-strength reading transferred to a new setting.", retry: "Read required and optional separately." },
  },
  {
    id: "TEACH.PROC.PREREQ", skillId: "PROC.002", title: "Find What Must Happen First", notebookTitle: "Procedure Prerequisites",
    reminder: "Before doing a later step, find any prerequisite and the consequence of skipping it.", stages: olderStages,
    discover: "Some procedures fail not because a step is unknown, but because the reader performs it before a required earlier condition is satisfied.",
    explanation: "Build a dependency chain: required prerequisite → later action → stated consequence or risk. Sequence words alone are not enough if the procedure also contains conditions.",
    modelBody: "1. Shut off power. 2. Verify zero voltage. 3. Remove the cover.", modelThinking: "Removing the cover depends on the safety checks before it. I cannot jump to Step 3 just because I know how to remove the cover.",
    together: { prompt: "What must happen before removing the cover?", body: "Shut off power. Verify zero voltage. Then remove the cover.", choices: [["both","Power off and zero-voltage verification"],["remove","Nothing; remove the cover first"],["cleanup","Cleanup after the job"]], correct: "both", success: "You identified the prerequisites.", retry: "Trace the required steps that come before the action." },
    supported: { prompt: "Why is this order important?", body: "Record the starting temperature before heating the sample.", choices: [["baseline","Heating first would destroy the starting measurement"],["style","The order is only a writing preference"],["none","The result is identical either way"]], correct: "baseline", success: "You connected order to consequence.", retry: "Ask what information becomes unavailable if the later action happens first." },
    independent: { prompt: "Can Step 4 happen yet?", body: "Step 3: Obtain supervisor approval. Step 4: Activate the account. Approval has not been recorded.", choices: [["no","No; the stated prerequisite is not complete"],["yes","Yes; later steps never depend on earlier ones"],["unknown","The procedure contains no condition"]], correct: "no", success: "Independent prerequisite reasoning logged.", retry: "Step 4 depends on the approval stated in Step 3." },
    transfer: { prompt: "Transfer to an application process.", body: "Upload identification before selecting Submit. Submissions without identification are marked incomplete.", choices: [["id","Identification must be uploaded before submission to avoid an incomplete application"],["submit","Submit first and ignore the stated requirement"],["optional","Identification is optional"]], correct: "id", success: "Procedure dependency transferred to a new context.", retry: "Use the prerequisite and stated consequence together." },
  },
  {
    id: "TEACH.FORM.FIELDS", skillId: "FORM.001", title: "Required, Optional, and Conditional Fields", notebookTitle: "Form Fields",
    reminder: "A blank field matters differently depending on whether the form marks it required, optional, or required only under a stated condition.", stages: leadOnly,
    discover: "Forms compress instructions into labels, asterisks, checkboxes, and conditional fields. Reading those signals prevents accidental incomplete submissions.",
    explanation: "Identify which fields are mandatory, which are optional, and which become required only if another answer triggers them.",
    modelBody: "Email*  |  Middle name (optional)  |  Employer name — complete only if currently employed", modelThinking: "Email is required, middle name is optional, and employer name is conditional on employment status.",
    together: { prompt: "Which field may be left blank without making this form incomplete?", body: "Phone*  |  Apartment number (optional)", choices: [["apt","Apartment number"],["phone","Phone"]], correct: "apt", success: "You distinguished optional from required.", retry: "Look for the explicit optional label." },
    supported: { prompt: "When is the extra field required?", body: "If you selected Yes for prior employment, enter the employer name.", choices: [["yes","Only when Yes was selected"],["always","For every applicant"],["never","It is never required"]], correct: "yes", success: "You applied the field condition.", retry: "The if-clause controls when the field becomes required." },
    independent: { prompt: "Which submission is complete under these field rules?", body: "Name* | Email* | Secondary phone (optional)", choices: [["complete","Name and Email filled; secondary phone blank"],["missing","Name filled; Email blank; secondary phone filled"],["blank","All fields blank"]], correct: "complete", success: "Independent form-field reading logged.", retry: "Required fields control completeness; optional fields do not." },
    transfer: { prompt: "Transfer to a registration form.", body: "Guardian contact — required only for applicants under 18.", choices: [["conditional","The field depends on the applicant's age"],["all","Every applicant must complete it"],["none","No applicant may complete it"]], correct: "conditional", success: "Conditional form reading transferred to a new context.", retry: "Use the stated age condition." },
  },
  {
    id: "TEACH.FORM.CERTIFY", skillId: "FORM.002", title: "Read What the Signature Affirms", notebookTitle: "Signature Meaning",
    reminder: "Before signing, read the exact certification, acknowledgement, consent, or authorization statement. Do not assume all signatures mean the same thing.", stages: leadOnly,
    discover: "A signature can affirm accuracy, acknowledge receipt, give permission, or accept a condition. The sentence above the signature controls its stated meaning.",
    explanation: "Identify the verb: certify, acknowledge, agree, consent, authorize. Then identify exactly what is being affirmed or permitted.",
    modelBody: "By signing below, I certify that the information in this application is accurate to the best of my knowledge.", modelThinking: "The signature affirms an accuracy statement. It does not, by itself, say I agree with unrelated policies not named here.",
    together: { prompt: "What does the signature affirm?", body: "I acknowledge receipt of the employee handbook.", choices: [["receipt","Receipt of the handbook"],["agreement","Agreement with every policy forever"],["payment","Authorization of a payment"]], correct: "receipt", success: "You read the exact acknowledgement.", retry: "Acknowledge receipt is narrower than agreeing with every possible statement." },
    supported: { prompt: "What action is authorized?", body: "I authorize the clinic to send appointment reminders by text message.", choices: [["texts","Sending appointment reminders by text"],["all-data","Any use of all information for any purpose"],["charge","Automatic billing"]], correct: "texts", success: "You kept authorization within its stated scope.", retry: "Use the specific action after authorize." },
    independent: { prompt: "Which reading is precise?", body: "By signing, I certify that I completed the required training.", choices: [["training","The signer affirms completion of the required training"],["everything","The signer accepts every future company decision"],["optional","The statement has no meaning"]], correct: "training", success: "Independent certification reading logged.", retry: "Do not extend the signature beyond the actual certification text." },
    transfer: { prompt: "Transfer to consent language.", body: "I consent to the use of my submitted photo in the event program.", choices: [["photo","The stated consent concerns the submitted photo in the event program"],["all","The sentence grants unlimited use of every future image"],["none","Consent means only receipt"]], correct: "photo", success: "Signature/consent scope transferred to a new form.", retry: "Identify exactly what use the consent sentence names." },
  },
  {
    id: "TEACH.CIVIC.NOTICE", skillId: "CIVIC.001", title: "Read the Notice for Who, What, and When", notebookTitle: "Public Notice Check",
    reminder: "Find the issuer, affected people, required or requested action, deadline, condition, and consequence before deciding what the notice means.", stages: leadOnly,
    discover: "Public notices often combine authority, eligibility, deadlines, locations, and action steps in a small amount of text.",
    explanation: "Do not stop at the headline. Identify who issued the notice, who it applies to, what action is stated, and when it must happen.",
    modelBody: "City Clerk: Residents seeking a parking-permit appeal must submit the form by October 12. Late appeals will be considered only where the ordinance permits an exception.", modelThinking: "Issuer: City Clerk. Affected group: residents seeking an appeal. Action: submit the form. Deadline: October 12. There is also a limited exception clause.",
    together: { prompt: "Who issued this notice?", body: "County Elections Office — Registration update forms are due May 3.", choices: [["county","County Elections Office"],["resident","A resident"],["unknown","The notice does not say"]], correct: "county", success: "You identified the issuing body.", retry: "Start with the organization named before the instruction." },
    supported: { prompt: "What action and deadline are stated?", body: "Library Board: Written comments on the proposed hours must be received by 5:00 PM on June 14.", choices: [["comments","Submit written comments by 5:00 PM June 14"],["attend","Attend a meeting at any time"],["none","No action is described"]], correct: "comments", success: "You extracted action + deadline together.", retry: "Find the verb must be received and the date/time." },
    independent: { prompt: "Who does the rule apply to?", body: "Applicants requesting a fee waiver must include proof of eligibility with the application.", choices: [["waiver","Applicants requesting a fee waiver"],["everyone","Every person in the city"],["staff","Only agency staff"]], correct: "waiver", success: "Independent notice-scope reading logged.", retry: "The opening noun phrase defines the affected group." },
    transfer: { prompt: "Transfer to a school-district notice.", body: "Families who want transportation changes for the fall term must submit Route Form B by August 1.", choices: [["precise","Families requesting transportation changes must submit Route Form B by August 1"],["all","Every family must submit Route Form B"],["optional","The form has no deadline"]], correct: "precise", success: "Public-notice reading transferred to another civic setting.", retry: "Keep the affected group, action, and deadline together." },
  },
];

export const curriculumCompletionTeachingModules: Record<string, TeachingModule> = Object.fromEntries(
  seeds.map((seed) => {
    const module = make(seed);
    return [module.id, module];
  }),
);
