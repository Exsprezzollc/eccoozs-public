import type {
  PresentationStage,
  TeachingModule,
  TeachingPracticeItem,
  TeachingPresentationVariant,
} from "../domain";

const foundationStages: PresentationStage[] = [
  "young-investigator",
  "investigator",
  "lead-investigator",
];

type PracticeSeed = {
  prompt: string;
  source?: string;
  audio?: string;
  correct: string;
  choices: [string, string, string];
  success: string;
  retry: string;
};

type FoundationSpec = {
  moduleId: string;
  skillId: string;
  title: string;
  notebookTitle: string;
  reminder: string;
  discover: string;
  explanation: string;
  modelSource?: string;
  modelAudio?: string;
  modelThinking: string;
  practice: [PracticeSeed, PracticeSeed, PracticeSeed, PracticeSeed];
};

const stageLanguage: Record<PresentationStage, { discoverTitle: string; sourceTitle: string; framing: string }> = {
  "young-investigator": {
    discoverTitle: "Discover the clue",
    sourceTitle: "Case Clue",
    framing: "We will make the reading move visible and practice it one small step at a time.",
  },
  investigator: {
    discoverTitle: "Inspect the reading move",
    sourceTitle: "Evidence Card",
    framing: "This is a foundation check, presented in an age-respecting investigation context.",
  },
  "lead-investigator": {
    discoverTitle: "Analyze the reading mechanism",
    sourceTitle: "Field Document",
    framing: "Advanced reading still depends on precise foundations. We repair the exact mechanism without changing your presentation level.",
  },
};

function practiceItem(
  spec: FoundationSpec,
  stage: PresentationStage,
  phase: "together" | "supported" | "independent" | "transfer",
  seed: PracticeSeed,
  index: number,
): TeachingPracticeItem {
  const ids = ["a", "b", "c"];
  const correctIndex = seed.choices.findIndex((label) => label === seed.correct);
  const item: TeachingPracticeItem = {
    id: `${spec.moduleId.toLowerCase().replaceAll(".", "-")}-${stage}-${phase}`,
    prompt: seed.prompt,
    sourceTitle: seed.source || seed.audio ? stageLanguage[stage].sourceTitle : undefined,
    sourceBody: seed.source,
    audioText: seed.audio,
    interaction: "choice",
    choices: seed.choices.map((label, choiceIndex) => ({ id: ids[choiceIndex], label })),
    correctAnswerIds: [ids[Math.max(0, correctIndex)]],
    successMessage: seed.success,
    retryMessage: seed.retry,
  };

  // Production interaction repair: foundational reading should be tactile and auditory,
  // not a long run of multiple-choice cards. These interaction contracts keep the same
  // target skill while changing how the learner demonstrates it.
  if (phase === "together" && spec.skillId === "PHON.003") {
    item.interaction = "match";
    item.choices = [];
    item.correctAnswerIds = [];
    item.prompt = stage === "young-investigator"
      ? "Match each beginning sound to the word that starts with it."
      : stage === "investigator"
        ? "Match each sound clue to the evidence word that begins with it."
        : "Match each dispatch sound to the field word that begins with it.";
    item.matchPairs = stage === "young-investigator"
      ? [
          { id: "m", left: "/m/", right: "🗺️ map", leftAudioText: "/m/", rightAudioText: "map" },
          { id: "s", left: "/s/", right: "☀️ sun", leftAudioText: "/s/", rightAudioText: "sun" },
          { id: "t", left: "/t/", right: "🎟️ ticket", leftAudioText: "/t/", rightAudioText: "ticket" },
        ]
      : [
          { id: "m", left: "/m/", right: "metro", leftAudioText: "/m/", rightAudioText: "metro" },
          { id: "s", left: "/s/", right: "signal", leftAudioText: "/s/", rightAudioText: "signal" },
          { id: "t", left: "/t/", right: "tower", leftAudioText: "/t/", rightAudioText: "tower" },
        ];
  }

  if (phase === "together" && spec.skillId === "PHON.005") {
    item.interaction = "match";
    item.choices = [];
    item.correctAnswerIds = [];
    item.prompt = "Match each group of sounds to the whole word it makes.";
    item.matchPairs = [
      { id: "sun", left: "/s/ · /u/ · /n/", right: "sun", leftAudioText: "/s/ ... /u/ ... /n/", rightAudioText: "sun" },
      { id: "map", left: "/m/ · /a/ · /p/", right: "map", leftAudioText: "/m/ ... /a/ ... /p/", rightAudioText: "map" },
      { id: "red", left: "/r/ · /e/ · /d/", right: "red", leftAudioText: "/r/ ... /e/ ... /d/", rightAudioText: "red" },
    ];
  }

  if (phase === "supported" && spec.skillId === "PHON.004") {
    item.interaction = "sequence";
    item.choices = [];
    item.correctAnswerIds = [];
    item.prompt = "Put the sounds in the order you hear them in lip.";
    item.audioText = "lip";
    item.sequenceTokens = [
      { id: "l", label: "/l/", audioText: "/l/" },
      { id: "i", label: "/i/", audioText: "/i/" },
      { id: "p", label: "/p/", audioText: "/p/" },
    ];
  }

  if (phase === "together" && spec.skillId === "CODE.001") {
    item.interaction = "match";
    item.choices = [];
    item.correctAnswerIds = [];
    item.prompt = "Match each printed letter to its sound clue.";
    item.sourceBody = undefined;
    item.matchPairs = [
      { id: "m", left: "m", right: "/m/", rightAudioText: "/m/" },
      { id: "s", left: "s", right: "/s/", rightAudioText: "/s/" },
      { id: "t", left: "t", right: "/t/", rightAudioText: "/t/" },
    ];
  }

  if (phase === "independent" && spec.skillId === "PRINT.002") {
    item.interaction = "sequence";
    item.choices = [];
    item.correctAnswerIds = [];
    item.prompt = "Put these print clues in the order your eyes should read them.";
    item.sourceBody = undefined;
    item.sequenceTokens = [
      { id: "one", label: "ONE" },
      { id: "two", label: "TWO" },
      { id: "three", label: "THREE" },
    ];
  }

  return item;
}

function makeVariant(spec: FoundationSpec, stage: PresentationStage): TeachingPresentationVariant {
  const [together, supported, independent, transfer] = spec.practice;
  return {
    stage,
    discover: {
      title: stageLanguage[stage].discoverTitle,
      body: `${stageLanguage[stage].framing} ${spec.discover}`,
    },
    explanation: spec.explanation,
    model: {
      sourceTitle: spec.modelSource || spec.modelAudio ? stageLanguage[stage].sourceTitle : undefined,
      sourceBody: spec.modelSource,
      audioText: spec.modelAudio,
      thinking: spec.modelThinking,
    },
    together: practiceItem(spec, stage, "together", together, 0),
    supported: practiceItem(spec, stage, "supported", supported, 1),
    independent: practiceItem(spec, stage, "independent", independent, 2),
    transfer: practiceItem(spec, stage, "transfer", transfer, 3),
  };
}

function moduleFromSpec(spec: FoundationSpec): TeachingModule {
  return {
    id: spec.moduleId,
    skillId: spec.skillId,
    title: spec.title,
    stages: [...foundationStages],
    notebookTool: { title: spec.notebookTitle, reminder: spec.reminder },
    variants: Object.fromEntries(
      foundationStages.map((stage) => [stage, makeVariant(spec, stage)]),
    ),
  };
}

const specs: FoundationSpec[] = [
  {
    moduleId: "TEACH.PRINT.MEANING",
    skillId: "PRINT.001",
    title: "Print Carries a Message",
    notebookTitle: "Print Has a Job",
    reminder: "Pictures show; print uses written symbols to carry language and meaning.",
    discover: "A picture can show an object, while printed letters can represent the word people say for it.",
    explanation: "Reading begins with a simple idea: written marks are not decoration. Letters can be arranged into words that represent spoken language and meaning.",
    modelSource: "DOG",
    modelThinking: "I can say the spoken word dog. The printed letters D-O-G are a written way to represent that word.",
    practice: [
      { prompt: "Which item is print?", source: "DOG   🐕", correct: "DOG", choices: ["DOG", "the dog picture", "both are the same kind of symbol"], success: "You separated the printed word from the picture.", retry: "Look for the letters that represent the spoken word." },
      { prompt: "Which item could be read as a word?", source: "STOP   🛑", correct: "STOP", choices: ["STOP", "the shape of the sign", "neither"], success: "Yes. STOP is print carrying language.", retry: "Find the letters, not only the visual symbol." },
      { prompt: "What is the job of the written word EXIT?", source: "EXIT", correct: "It carries a written message", choices: ["It carries a written message", "It is only a decoration", "It is a number"], success: "Independent print-awareness evidence logged.", retry: "Ask what the letters communicate." },
      { prompt: "Transfer the idea to a screen label. What kind of clue is MENU?", source: "MENU", correct: "Printed language", choices: ["Printed language", "A photograph", "A sound only"], success: "You recognized print in a new setting.", retry: "MENU is made of letters that can be read." },
    ],
  },
  {
    moduleId: "TEACH.PRINT.DIRECTION",
    skillId: "PRINT.002",
    title: "Follow the Print Path",
    notebookTitle: "Track the Line",
    reminder: "In English, start at the left, move right, then continue on the next line.",
    discover: "Reading English print depends on following the symbols in a stable order.",
    explanation: "We usually begin at the left side of a line, move toward the right, then move down to the next line. Tracking order keeps words and sentences from becoming scrambled.",
    modelSource: "FIRST clue → NEXT clue",
    modelThinking: "My eyes begin with FIRST on the left and move right to NEXT. I do not start in the middle.",
    practice: [
      { prompt: "Which word comes first when you read this line?", source: "OPEN DOOR", correct: "OPEN", choices: ["OPEN", "DOOR", "Either one"], success: "You started at the left edge.", retry: "Begin with the word farthest left." },
      { prompt: "After reading TOP LINE, where do you go next?", source: "TOP LINE\nNEXT LINE", correct: "NEXT LINE", choices: ["NEXT LINE", "Back to TOP", "Skip the second line"], success: "You tracked from one line to the next.", retry: "Finish the first line, then move down." },
      { prompt: "Read the labels in order. Which sequence is correct?", source: "ONE  TWO  THREE", correct: "ONE, TWO, THREE", choices: ["ONE, TWO, THREE", "THREE, TWO, ONE", "TWO, ONE, THREE"], success: "Independent directionality evidence logged.", retry: "Track from left to right." },
      { prompt: "Transfer to a notice with two lines. What do you read after CHECK IN?", source: "CHECK IN\nAT DESK", correct: "AT DESK", choices: ["AT DESK", "CHECK IN again", "Nothing"], success: "Print tracking transferred to a notice.", retry: "Move down after completing the first line." },
    ],
  },
  {
    moduleId: "TEACH.PHON.WORDS",
    skillId: "PHON.001",
    title: "Hear the Words Inside Speech",
    notebookTitle: "Hear Separate Words",
    reminder: "A spoken sentence is made of separate words, even when speech flows together.",
    discover: "Speech can sound like one stream, but we can listen for the individual words inside it.",
    explanation: "Say a short sentence slowly and mark one beat for each word. We are listening to speech here, not reading print.",
    modelAudio: "The door opens",
    modelThinking: "I hear three word beats: The | door | opens.",
    practice: [
      { prompt: "How many separate words do you hear?", audio: "Blue bag", correct: "2 words", choices: ["2 words", "1 word", "3 words"], success: "You heard two word units.", retry: "Replay it and tap once for each separate word you hear." },
      { prompt: "How many words are in the spoken clue?", audio: "The bus stops", correct: "3 words", choices: ["3 words", "2 words", "4 words"], success: "You separated the sentence into three spoken words.", retry: "Listen for The | bus | stops." },
      { prompt: "Count the spoken words independently.", audio: "Lights turn off", correct: "3 words", choices: ["3 words", "2 words", "1 word"], success: "Independent spoken-word awareness logged.", retry: "Give each separate word one beat." },
      { prompt: "Transfer to a new spoken instruction. How many words?", audio: "Check the side door", correct: "4 words", choices: ["4 words", "3 words", "5 words"], success: "You transferred word counting to a new spoken context.", retry: "Listen again and count each separate word." },
    ],
  },
  {
    moduleId: "TEACH.PHON.RHYME",
    skillId: "PHON.002",
    title: "Hear Matching Endings",
    notebookTitle: "Rhyme Clue",
    reminder: "Rhyming words have ending sound patterns that sound alike.",
    discover: "Some spoken words share an ending sound even when they begin differently.",
    explanation: "Listen to the end of each word. Cat and hat rhyme because their ending sound pattern matches. Cat and dog do not.",
    modelAudio: "cat, hat",
    modelThinking: "I ignore the first sound for a moment and compare the endings: cat, hat. The endings sound alike.",
    practice: [
      { prompt: "Which word rhymes with sun?", audio: "sun ... run ... map", correct: "run", choices: ["run", "map", "both"], success: "You matched the ending sound.", retry: "Listen to the end of sun and compare it with run." },
      { prompt: "Which pair rhymes?", audio: "light, night; light, log", correct: "light and night", choices: ["light and night", "light and log", "neither pair"], success: "The shared ending sound is clear.", retry: "Compare the ending sound after the first consonant." },
      { prompt: "Choose the rhyme independently.", audio: "plan ... fan ... pen", correct: "fan", choices: ["fan", "pen", "both"], success: "Independent rhyme evidence logged.", retry: "Listen for the matching -an sound." },
      { prompt: "Transfer to a new clue. Which word rhymes with code?", audio: "code ... road ... card", correct: "road", choices: ["road", "card", "both"], success: "Rhyme recognition transferred to a new word set.", retry: "Compare the ending sound in code and road." },
    ],
  },
  {
    moduleId: "TEACH.PHON.BEGINNING",
    skillId: "PHON.003",
    title: "Catch the First Sound",
    notebookTitle: "Beginning Sound",
    reminder: "Stretch the beginning of a spoken word and identify the first sound you hear.",
    discover: "A word begins with a sound before the rest of the word follows.",
    explanation: "Say the word slowly and focus only on the first sound. In moon, the first sound is /m/.",
    modelAudio: "mmmmmoon",
    modelThinking: "I stretch the start and hear /m/ before the rest of moon.",
    practice: [
      { prompt: "What sound begins map?", audio: "map", correct: "/m/", choices: ["/m/", "/p/", "/a/"], success: "You isolated the first sound.", retry: "Stretch the beginning: mmmmmap." },
      { prompt: "Which sound comes first in sun?", audio: "sun", correct: "/s/", choices: ["/s/", "/n/", "/u/"], success: "Beginning sound identified.", retry: "Listen only to the very start of sun." },
      { prompt: "Identify the beginning sound independently.", audio: "ticket", correct: "/t/", choices: ["/t/", "/k/", "/i/"], success: "Independent beginning-sound evidence logged.", retry: "Say ticket slowly and hold the first sound." },
      { prompt: "Transfer to a dispatch word. What begins metro?", audio: "metro", correct: "/m/", choices: ["/m/", "/r/", "/e/"], success: "Beginning-sound analysis transferred to a new context.", retry: "Listen to the first sound before the rest of metro." },
    ],
  },
  {
    moduleId: "TEACH.PHON.SEGMENT",
    skillId: "PHON.004",
    title: "Pull a Spoken Word Apart",
    notebookTitle: "Sound Segmentation",
    reminder: "Say the word slowly and give each individual sound its own position.",
    discover: "A short spoken word can be separated into smaller sound units.",
    explanation: "For map, listen to each sound position: /m/ /a/ /p/. We are working with sounds before worrying about spelling.",
    modelAudio: "map",
    modelThinking: "I stretch map and mark three sounds: /m/ | /a/ | /p/.",
    practice: [
      { prompt: "Which sound sequence matches sun?", audio: "sun", correct: "/s/ /u/ /n/", choices: ["/s/ /u/ /n/", "/s/ /n/", "/u/ /n/"], success: "You kept all three spoken sounds.", retry: "Stretch sun and give every sound a place." },
      { prompt: "Pull lip apart into sounds.", audio: "lip", correct: "/l/ /i/ /p/", choices: ["/l/ /i/ /p/", "/l/ /p/", "/i/ /p/"], success: "Segmentation confirmed.", retry: "Listen for the middle vowel sound too." },
      { prompt: "Segment fog independently.", audio: "fog", correct: "/f/ /o/ /g/", choices: ["/f/ /o/ /g/", "/f/ /g/", "/o/ /g/"], success: "Independent phoneme segmentation logged.", retry: "Stretch fog slowly and mark each sound." },
      { prompt: "Transfer to a short code word: tag.", audio: "tag", correct: "/t/ /a/ /g/", choices: ["/t/ /a/ /g/", "/t/ /g/", "/a/ /g/"], success: "Segmentation transferred to a new spoken word.", retry: "Do not drop the middle sound." },
    ],
  },
  {
    moduleId: "TEACH.PHON.BLEND",
    skillId: "PHON.005",
    title: "Push Sounds Together",
    notebookTitle: "Sound Blending",
    reminder: "Hold the sounds in order, then sweep them together into one spoken word.",
    discover: "Separate sounds can be combined into a whole word.",
    explanation: "If you hear /m/ /a/ /p/, keep the order and blend without adding or removing sounds: map.",
    modelAudio: "/m/ ... /a/ ... /p/",
    modelThinking: "I hold the sequence, shorten the pauses, and blend: mmm-aa-p → map.",
    practice: [
      { prompt: "Blend these sounds.", audio: "/s/ ... /u/ ... /n/", correct: "sun", choices: ["sun", "son", "run"], success: "You blended the three sounds into sun.", retry: "Keep the sequence /s/ /u/ /n/ and sweep it together." },
      { prompt: "What word do these sounds make?", audio: "/l/ ... /i/ ... /d/", correct: "lid", choices: ["lid", "led", "lip"], success: "Sound blending confirmed.", retry: "Do not change the middle or final sound." },
      { prompt: "Blend independently.", audio: "/f/ ... /o/ ... /g/", correct: "fog", choices: ["fog", "fig", "log"], success: "Independent phoneme blending logged.", retry: "Bring /f/ /o/ /g/ together in order." },
      { prompt: "Transfer to a field code spoken aloud.", audio: "/r/ ... /e/ ... /d/", correct: "red", choices: ["red", "rid", "bed"], success: "Sound blending transferred to a new context.", retry: "Use the same sweep: /r/ /e/ /d/." },
    ],
  },
  {
    moduleId: "TEACH.CODE.LETTER_SOUND",
    skillId: "CODE.001",
    title: "Letters Carry Sound Clues",
    notebookTitle: "Letter-Sound Link",
    reminder: "See the letter, recall its sound, then use that sound inside a word.",
    discover: "Letters are visual symbols that can represent sounds in spoken words.",
    explanation: "A letter has a name, and in words it can represent a sound. For example, m commonly represents /m/. We connect the printed symbol to the sound we already know.",
    modelSource: "m  →  /m/",
    modelThinking: "I see m, recall /m/, and connect it to words such as map and metro.",
    practice: [
      { prompt: "Which sound does m commonly represent here?", source: "m", correct: "/m/", choices: ["/m/", "/s/", "/t/"], success: "You connected the letter to its sound.", retry: "Say mmmm and match it to the printed m." },
      { prompt: "Which letter can represent /s/?", source: "/s/", correct: "s", choices: ["s", "m", "p"], success: "You moved from sound back to letter.", retry: "Think of the first sound in sun." },
      { prompt: "Match the printed letter to the sound independently.", source: "t", correct: "/t/", choices: ["/t/", "/n/", "/m/"], success: "Independent letter-sound evidence logged.", retry: "Recall the first sound in tag." },
      { prompt: "Transfer the sound clue to a label. Which sound begins this printed word?", source: "map", correct: "/m/", choices: ["/m/", "/p/", "/a/"], success: "You used the letter-sound link inside a word.", retry: "Start with the first printed letter m." },
    ],
  },
  {
    moduleId: "TEACH.CODE.SHORT_VOWEL",
    skillId: "CODE.003",
    title: "Keep the Short Vowel Clue",
    notebookTitle: "Short Vowels",
    reminder: "In a short CVC word, check the middle vowel sound before deciding the word.",
    discover: "Changing the middle vowel can change the whole word even when the first and last letters stay the same.",
    explanation: "Compare pin, pen, and pan. The consonants can stay similar while the vowel carries a crucial middle sound clue.",
    modelSource: "p i n  /  p e n  /  p a n",
    modelThinking: "I do not guess from p-n. I inspect the middle vowel to decide which word is present.",
    practice: [
      { prompt: "Which word is printed?", source: "p i n", correct: "pin", choices: ["pin", "pen", "pan"], success: "You used the short i clue.", retry: "Check the middle vowel i." },
      { prompt: "Read the middle vowel carefully.", source: "m a p", correct: "map", choices: ["map", "mop", "mip"], success: "Short a identified accurately.", retry: "Keep the consonants and inspect a." },
      { prompt: "Decode independently.", source: "h o t", correct: "hot", choices: ["hot", "hit", "hat"], success: "Independent short-vowel evidence logged.", retry: "The middle vowel is o." },
      { prompt: "Transfer to a new label.", source: "r e d", correct: "red", choices: ["red", "rid", "rod"], success: "Short-vowel decoding transferred to a new label.", retry: "Use the middle e as evidence." },
    ],
  },
  {
    moduleId: "TEACH.CODE.DIGRAPH",
    skillId: "CODE.004",
    title: "Two Letters, One Sound Clue",
    notebookTitle: "Digraph Clue",
    reminder: "When a known digraph appears, treat the two letters as one sound unit before blending the word.",
    discover: "Sometimes two letters work together to represent one sound.",
    explanation: "In ship, s and h work together as sh. We do not read them as two separate sounds. Common examples include sh, ch, th, and wh.",
    modelSource: "sh → /sh/   ship",
    modelThinking: "I circle sh as one sound unit, then blend /sh/ /i/ /p/ → ship.",
    practice: [
      { prompt: "Which beginning is one sound unit in ship?", source: "ship", correct: "sh", choices: ["sh", "s only", "h only"], success: "You recognized the sh digraph.", retry: "The first two letters work together." },
      { prompt: "Decode the word using the digraph.", source: "chat", correct: "chat", choices: ["chat", "cat", "hat"], success: "You used ch as one sound clue.", retry: "Treat ch as a unit before blending the rest." },
      { prompt: "Identify the digraph independently.", source: "thin", correct: "th", choices: ["th", "t", "in"], success: "Independent digraph evidence logged.", retry: "Look for two letters representing the beginning sound." },
      { prompt: "Transfer to a new printed label.", source: "shop", correct: "shop", choices: ["shop", "sop", "hop"], success: "Digraph decoding transferred to a new context.", retry: "Use sh as the first sound unit." },
    ],
  },
  {
    moduleId: "TEACH.CODE.BLEND",
    skillId: "CODE.005",
    title: "Keep Both Consonant Sounds",
    notebookTitle: "Consonant Blends",
    reminder: "In a blend, the consonants stay close together but each sound can still be heard.",
    discover: "Two consonants can sit together while each keeps its own sound.",
    explanation: "In stop, s and t are close together, but we can still hear /s/ and /t/. That differs from a digraph, where two letters can represent one sound.",
    modelSource: "st + op → stop",
    modelThinking: "I preserve /s/ and /t/, then blend them with op: stop.",
    practice: [
      { prompt: "Which two beginning sounds are both heard in flag?", source: "flag", correct: "/f/ and /l/", choices: ["/f/ and /l/", "only /f/", "only /l/"], success: "You preserved both sounds in the blend.", retry: "Say flag slowly: /f/ /l/ ..." },
      { prompt: "Decode the blend accurately.", source: "stop", correct: "stop", choices: ["stop", "sop", "top"], success: "Both beginning consonant sounds stayed in the word.", retry: "Do not drop s or t." },
      { prompt: "Decode independently.", source: "plan", correct: "plan", choices: ["plan", "pan", "lan"], success: "Independent blend evidence logged.", retry: "Keep both /p/ and /l/." },
      { prompt: "Transfer to a new label.", source: "trip", correct: "trip", choices: ["trip", "tip", "rip"], success: "Blend decoding transferred to a new context.", retry: "Preserve both /t/ and /r/." },
    ],
  },
  {
    moduleId: "TEACH.CODE.SILENT_E",
    skillId: "CODE.006",
    title: "Notice the Final-e Pattern",
    notebookTitle: "Silent-e Pattern",
    reminder: "When a familiar vowel-consonant-e pattern appears, test the long-vowel reading before guessing.",
    discover: "A final e can change how an earlier vowel is read even when the e itself is not pronounced as a separate sound.",
    explanation: "Compare cap and cape. The final-e pattern often signals a long vowel: cap → cape, kit → kite, hop → hope.",
    modelSource: "cap → cape",
    modelThinking: "I notice vowel-consonant-e, so I test the long-a reading: cape.",
    practice: [
      { prompt: "Which word is printed?", source: "c a p e", correct: "cape", choices: ["cape", "cap", "cup"], success: "You used the final-e pattern.", retry: "Notice the final e and test long a." },
      { prompt: "Read the word with its vowel-consonant-e pattern.", source: "k i t e", correct: "kite", choices: ["kite", "kit", "kate"], success: "Long i pattern recognized.", retry: "The final e changes the earlier vowel pattern." },
      { prompt: "Decode independently.", source: "h o p e", correct: "hope", choices: ["hope", "hop", "heap"], success: "Independent silent-e evidence logged.", retry: "Test long o because of the final-e pattern." },
      { prompt: "Transfer to a new label.", source: "n o t e", correct: "note", choices: ["note", "not", "net"], success: "Silent-e decoding transferred to a new context.", retry: "Use the vowel-consonant-e pattern." },
    ],
  },
  {
    moduleId: "TEACH.CODE.VOWEL_TEAM",
    skillId: "CODE.007",
    title: "Read the Vowel Team as a Unit",
    notebookTitle: "Vowel Teams",
    reminder: "When a familiar vowel team appears, keep the letters together as one spelling pattern and test its known sound.",
    discover: "Two vowel letters can work together as one spelling pattern.",
    explanation: "Patterns such as ai, ee, oa, and ea often represent a vowel sound as a team. We learn each common pattern through words, not by guessing from one universal rule.",
    modelSource: "r ai n → rain",
    modelThinking: "I keep ai together as the middle spelling pattern, then blend r + ai + n: rain.",
    practice: [
      { prompt: "Which word matches this spelling?", source: "rain", correct: "rain", choices: ["rain", "ran", "rin"], success: "You kept ai together as a vowel-team clue.", retry: "Read ai as the middle spelling unit." },
      { prompt: "Decode the vowel team.", source: "seed", correct: "seed", choices: ["seed", "sed", "said"], success: "The ee pattern was used accurately.", retry: "Keep ee together before blending." },
      { prompt: "Decode independently.", source: "boat", correct: "boat", choices: ["boat", "bot", "bat"], success: "Independent vowel-team evidence logged.", retry: "Notice oa as the vowel team." },
      { prompt: "Transfer to a new document word.", source: "team", correct: "team", choices: ["team", "tem", "time"], success: "Vowel-team decoding transferred to a new context.", retry: "Keep ea together as the vowel spelling pattern." },
    ],
  },
  {
    moduleId: "TEACH.CODE.R_CONTROLLED",
    skillId: "CODE.008",
    title: "Notice Vowel + R",
    notebookTitle: "R-Controlled Vowels",
    reminder: "When a vowel is followed by r, read the vowel-r pattern as a unit before blending the rest.",
    discover: "A vowel followed by r often behaves differently from the same vowel in a simple short-vowel word.",
    explanation: "Common vowel-r patterns include ar, er, ir, or, and ur. Learn the pattern inside real words, then reuse it in unfamiliar words.",
    modelSource: "c ar d → card",
    modelThinking: "I notice ar and keep it together as the middle sound pattern: c + ar + d → card.",
    practice: [
      { prompt: "Which word is printed?", source: "card", correct: "card", choices: ["card", "cad", "cord"], success: "You used the ar pattern.", retry: "Keep a and r together." },
      { prompt: "Decode the vowel-r pattern.", source: "fork", correct: "fork", choices: ["fork", "folk", "fark"], success: "The or pattern was recognized.", retry: "Read or as the key middle pattern." },
      { prompt: "Decode independently.", source: "turn", correct: "turn", choices: ["turn", "tun", "torn"], success: "Independent r-controlled evidence logged.", retry: "Notice ur before blending the word." },
      { prompt: "Transfer to a new word.", source: "term", correct: "term", choices: ["term", "team", "tem"], success: "R-controlled decoding transferred to a new context.", retry: "Use er as the vowel-r unit." },
    ],
  },
  {
    moduleId: "TEACH.CODE.MULTISYLLABLE",
    skillId: "CODE.009",
    title: "Break a Long Word Into Readable Parts",
    notebookTitle: "Long-Word Strategy",
    reminder: "Do not attack a long word all at once. Find readable chunks, decode each, then recombine and check the result in context.",
    discover: "Long words become manageable when we divide them into smaller pronounceable parts.",
    explanation: "Look for syllable-sized chunks or familiar spelling units. Decode each part, blend the parts together, then ask whether the pronunciation fits the sentence.",
    modelSource: "sun / set → sunset",
    modelThinking: "I read sun, then set, and recombine them: sunset. Longer words use the same controlled chunking habit.",
    practice: [
      { prompt: "Which chunking helps you read picnic?", source: "picnic", correct: "pic / nic", choices: ["pic / nic", "p / icnic", "pi / cni / c"], success: "You selected workable reading chunks.", retry: "Choose chunks you can pronounce and recombine." },
      { prompt: "Recombine these readable parts.", source: "nap / kin", correct: "napkin", choices: ["napkin", "nap king", "napping"], success: "You recombined the word accurately.", retry: "Say nap, then kin, then blend the parts." },
      { prompt: "Read the longer word independently using chunks.", source: "in / spect / or", correct: "inspector", choices: ["inspector", "instructor", "inspect"], success: "Independent multisyllabic decoding logged.", retry: "Read each visible chunk, then recombine all of them." },
      { prompt: "Transfer the strategy to a document word.", source: "can / cel / la / tion", correct: "cancellation", choices: ["cancellation", "calculation", "cancel"], success: "Long-word decoding transferred to a document context.", retry: "Keep the chunks in order and recombine them without dropping syllables." },
    ],
  },
  {
    moduleId: "TEACH.VOCAB.CONTEXT",
    skillId: "VOCAB.001",
    title: "Use Context as Evidence",
    notebookTitle: "Context Clues",
    reminder: "Use nearby words to form a likely meaning, then check whether that meaning fits the whole sentence.",
    discover: "A sentence can give clues about an unfamiliar word without directly defining it.",
    explanation: "Context helps you make a hypothesis about meaning. Treat that hypothesis as evidence-based, not guaranteed, and verify when the exact meaning matters.",
    modelSource: "The path was narrow, so only one person could walk through at a time.",
    modelThinking: "The clue ‘only one person ... at a time’ suggests narrow means not wide.",
    practice: [
      { prompt: "What does chilly most likely mean here?", source: "The room was chilly, so Nia put on a sweater.", correct: "cool or cold", choices: ["cool or cold", "very loud", "bright"], success: "You used the sweater clue to infer meaning.", retry: "Ask what kind of room would make someone put on a sweater." },
      { prompt: "Use the sentence to estimate the meaning of fragile.", source: "Handle the glass carefully because it is fragile and can break easily.", correct: "easy to break", choices: ["easy to break", "very heavy", "hard to see"], success: "Context pointed to the likely meaning.", retry: "The phrase ‘can break easily’ is the strongest clue." },
      { prompt: "Infer the word meaning independently.", source: "The crowd dispersed; within minutes, people had left in different directions.", correct: "spread out and left", choices: ["spread out and left", "gathered closer", "became louder"], success: "Independent context-clue evidence logged.", retry: "Use what happened to the people after dispersed." },
      { prompt: "Transfer to a policy sentence.", source: "The request was denied because it did not meet the required conditions.", correct: "not approved", choices: ["not approved", "delayed for one hour", "automatically accepted"], success: "Context reasoning transferred to formal text.", retry: "The reason tells you what happened to the request." },
    ],
  },
  {
    moduleId: "TEACH.VOCAB.MULTIPLE",
    skillId: "VOCAB.002",
    title: "Choose the Meaning That Fits",
    notebookTitle: "Multiple Meanings",
    reminder: "When a word has several meanings, use the sentence to decide which meaning is active here.",
    discover: "The same printed word can mean different things in different sentences.",
    explanation: "Do not choose a familiar definition automatically. Read the whole sentence and select the meaning that makes the sentence coherent.",
    modelSource: "They sat on the bank of the river.",
    modelThinking: "Bank can mean a financial institution, but river tells me this bank is the land beside the water.",
    practice: [
      { prompt: "What does bat mean here?", source: "She swung the bat and hit the ball.", correct: "sports equipment", choices: ["sports equipment", "a flying animal", "a small bag"], success: "You selected the meaning that fits the sports sentence.", retry: "Use swung and hit the ball as context." },
      { prompt: "What does current mean here?", source: "The swimmer moved against the strong river current.", correct: "moving water", choices: ["moving water", "present time", "electrical flow"], success: "The river context controlled the meaning.", retry: "Look at swimmer and river." },
      { prompt: "Choose the active meaning independently.", source: "The latest issue of the magazine arrived today.", correct: "an edition of a publication", choices: ["an edition of a publication", "a problem", "to officially provide"], success: "Independent multiple-meaning evidence logged.", retry: "Magazine tells you which meaning of issue fits." },
      { prompt: "Transfer to workplace language.", source: "The office will issue new identification cards Monday.", correct: "provide officially", choices: ["provide officially", "a magazine edition", "a disagreement"], success: "Multiple-meaning reasoning transferred to workplace text.", retry: "Ask what the office is doing with the cards." },
    ],
  },
  {
    moduleId: "TEACH.SENT.PRONOUN",
    skillId: "SENT.002",
    title: "Track Who the Pronoun Points To",
    notebookTitle: "Pronoun Tracking",
    reminder: "When you see he, she, they, it, this, or that, identify the person, thing, or idea the word refers back to.",
    discover: "Writers use shorter reference words so they do not repeat the same name or noun every time.",
    explanation: "A pronoun only makes sense when you connect it to its referent. Keep track of who is doing each action across the sentence or passage.",
    modelSource: "Ava handed the key to Tia because she needed it.",
    modelThinking: "I cannot assume who she means without checking the surrounding meaning. I track the people, action, and the object it refers to.",
    practice: [
      { prompt: "Who does he refer to?", source: "Darius found the note. He read it aloud.", correct: "Darius", choices: ["Darius", "the note", "someone else"], success: "You kept the person reference connected.", retry: "Who was named immediately before He?" },
      { prompt: "What does it refer to?", source: "Maya opened the package and placed it on the table.", correct: "the package", choices: ["the package", "Maya", "the table"], success: "You tracked the object reference.", retry: "What object can logically be placed on the table?" },
      { prompt: "Track the reference independently.", source: "The committee revised the proposal. It will be reviewed Friday.", correct: "the proposal", choices: ["the proposal", "the committee", "Friday"], success: "Independent pronoun-reference evidence logged.", retry: "Ask what can be reviewed Friday." },
      { prompt: "Transfer to a policy note.", source: "The permit expires in June. It must be renewed before work continues.", correct: "the permit", choices: ["the permit", "June", "the work"], success: "Reference tracking transferred to formal text.", retry: "Identify what can expire and be renewed." },
    ],
  },
  {
    moduleId: "TEACH.SENT.CAUSE",
    skillId: "SENT.004",
    title: "Track Cause and Result Words",
    notebookTitle: "Cause/Result Connectors",
    reminder: "Words such as because, therefore, and consequently show how one stated idea connects to another.",
    discover: "Connector words can tell you whether one part of a sentence gives a cause or a result.",
    explanation: "Because usually introduces a reason or cause. Therefore and consequently often introduce a result. Read both sides before deciding the relationship.",
    modelSource: "The floor was wet because the pipe leaked.",
    modelThinking: "Because points me to the cause: the pipe leaked. Wet floor is the result.",
    practice: [
      { prompt: "What caused the game to move indoors?", source: "The game moved indoors because it started raining.", correct: "it started raining", choices: ["it started raining", "the game ended", "the room was full"], success: "You used because to locate the cause.", retry: "The words after because give the stated reason." },
      { prompt: "What is the result?", source: "The road was closed; therefore, the bus used another route.", correct: "the bus used another route", choices: ["the bus used another route", "the road opened", "the bus stopped forever"], success: "Therefore pointed to the result.", retry: "Look at the idea after therefore." },
      { prompt: "Identify the relationship independently.", source: "The form was incomplete. Consequently, processing was delayed.", correct: "The incomplete form led to a delay", choices: ["The incomplete form led to a delay", "The delay caused the form to be complete", "The ideas are unrelated"], success: "Independent cause/result evidence logged.", retry: "Consequently signals a result of the earlier condition." },
      { prompt: "Transfer to a procedure notice.", source: "The sensor overheated because airflow was blocked.", correct: "Blocked airflow is the stated cause", choices: ["Blocked airflow is the stated cause", "Overheating caused the blockage according to this sentence", "No cause is stated"], success: "Cause/result reading transferred to technical text.", retry: "Use the clause introduced by because." },
    ],
  },
  {
    moduleId: "TEACH.COMP.SEQUENCE",
    skillId: "COMP.002",
    title: "Put Events and Steps in Order",
    notebookTitle: "Sequence",
    reminder: "Track what happened first, next, and later—even when the text uses dates, steps, or transition words instead of numbers.",
    discover: "Understanding a process or event often depends on keeping the order straight.",
    explanation: "Look for sequence clues such as first, before, after, then, finally, dates, and numbered steps. Do not confuse what is mentioned first with what happened first if the text tells a different timeline.",
    modelSource: "First sign in. Then collect the folder. Finally enter Room 3.",
    modelThinking: "I build a timeline: sign in → collect folder → enter Room 3.",
    practice: [
      { prompt: "What happens first?", source: "Wash the cup. Then dry it. Finally place it on the shelf.", correct: "Wash the cup", choices: ["Wash the cup", "Dry the cup", "Place it on the shelf"], success: "You found the first step.", retry: "Follow the order words." },
      { prompt: "What happens after the alarm sounds?", source: "The alarm sounded. Next, the doors locked automatically.", correct: "The doors locked automatically", choices: ["The doors locked automatically", "The alarm became silent before it sounded", "Nothing"], success: "You tracked the stated sequence.", retry: "Use Next as the order clue." },
      { prompt: "Sequence the events independently.", source: "At 2:00 the package arrived. At 2:15 it was scanned. At 3:00 it left the facility.", correct: "arrived → scanned → left", choices: ["arrived → scanned → left", "scanned → arrived → left", "left → arrived → scanned"], success: "Independent sequence evidence logged.", retry: "Use the timestamps to build the timeline." },
      { prompt: "Transfer to a procedure.", source: "Record the starting temperature before turning on the heater.", correct: "Record the starting temperature first", choices: ["Record the starting temperature first", "Turn on the heater first", "The order does not matter"], success: "Sequence reading transferred to a procedure with consequences.", retry: "The word before tells which action must come first." },
    ],
  },
  {
    moduleId: "TEACH.COMP.MAIN_IDEA",
    skillId: "COMP.003",
    title: "Find the Big Idea the Details Support",
    notebookTitle: "Main Idea",
    reminder: "Ask what the details are mostly helping you understand—not merely which topic word appears most often.",
    discover: "Several details can work together to support one central understanding.",
    explanation: "The topic tells what the text is about. The main idea tells the important point the writer is making about that topic. Test a possible main idea by checking whether the details support it.",
    modelSource: "Trees provide shade, absorb rainwater, and reduce heat along sidewalks.",
    modelThinking: "The topic is trees. The details support a bigger idea: trees can improve neighborhood conditions.",
    practice: [
      { prompt: "What is the main idea?", source: "The library added evening hours, weekend tutoring, and more study tables so students have more ways to use the building.", correct: "The library expanded ways students can use its services", choices: ["The library expanded ways students can use its services", "Study tables are made of wood", "Tutoring only happens on weekends"], success: "Your main idea covers the important details.", retry: "Choose the idea that the evening hours, tutoring, and tables all support." },
      { prompt: "Which statement best captures the central idea?", source: "Heavy rain flooded two streets, delayed buses, and closed the park for the morning.", correct: "Heavy rain disrupted several parts of the community", choices: ["Heavy rain disrupted several parts of the community", "Only the park was affected", "Buses never run in rain"], success: "You combined the details into a central understanding.", retry: "Look for one idea that includes streets, buses, and the park." },
      { prompt: "Find the main idea independently.", source: "The new filter uses less energy, lasts longer, and needs fewer replacements than the old model.", correct: "The new filter offers several practical improvements", choices: ["The new filter offers several practical improvements", "Filters are always inexpensive", "The old model used no energy"], success: "Independent main-idea evidence logged.", retry: "Which statement is supported by all three comparison details?" },
      { prompt: "Transfer to an agreement notice.", source: "The updated policy adds a 30-day notice period, a written-cancellation requirement, and a final confirmation email.", correct: "The updated policy creates several steps for cancellation", choices: ["The updated policy creates several steps for cancellation", "Cancellation is impossible", "Email is the only form of communication"], success: "Main-idea reasoning transferred to formal text.", retry: "Find the central point that ties all three requirements together." },
    ],
  },
  {
    moduleId: "TEACH.COMP.DETAILS",
    skillId: "COMP.004",
    title: "Find the Details That Do Real Work",
    notebookTitle: "Supporting Details",
    reminder: "A supporting detail should explain, prove, illustrate, define, compare, or otherwise strengthen the central idea.",
    discover: "Not every sentence is equally important to the question you are solving.",
    explanation: "A supporting detail has a job. Ask how the detail connects to the main idea. A true but unrelated fact is not useful support for that particular idea.",
    modelSource: "Main idea: The garden helps the neighborhood. Detail: It provides fresh vegetables to 40 families each week.",
    modelThinking: "The number of families is specific evidence showing one way the garden helps.",
    practice: [
      { prompt: "Which detail best supports the idea that the program improved attendance?", source: "Attendance rose from 82% to 91% after the program began.", correct: "Attendance rose from 82% to 91%", choices: ["Attendance rose from 82% to 91%", "The school building is brick", "The program has a blue logo"], success: "You selected a detail that directly supports the idea.", retry: "Choose the detail that gives evidence about attendance." },
      { prompt: "Which detail explains why the route is faster?", source: "The new route removes three long detours and uses a direct bridge crossing.", correct: "It removes detours and uses a direct crossing", choices: ["It removes detours and uses a direct crossing", "The buses are painted white", "The route has a name"], success: "You identified an explanatory detail.", retry: "Ask which detail explains the time improvement." },
      { prompt: "Select the supporting detail independently.", source: "Claim: The repair reduced outages. Report: outages fell from nine last month to two this month.", correct: "Outages fell from nine to two", choices: ["Outages fell from nine to two", "The repair crew wore helmets", "The report is two pages long"], success: "Independent supporting-detail evidence logged.", retry: "Use the detail that measures the claimed change." },
      { prompt: "Transfer to a policy explanation.", source: "The policy aims to reduce late submissions. It now sends reminders 48 hours and 12 hours before the deadline.", correct: "The reminder schedule supports the policy goal", choices: ["The reminder schedule supports the policy goal", "The policy uses numbers", "Every submission will now be on time"], success: "Supporting-detail reasoning transferred to a policy context.", retry: "Which detail shows how the policy tries to reduce lateness?" },
    ],
  },
  {
    moduleId: "TEACH.COMP.INFERENCE",
    skillId: "COMP.005",
    title: "Infer Without Overreaching",
    notebookTitle: "Inference",
    reminder: "Combine text clues with reasonable background knowledge, then state only what the evidence supports—not more.",
    discover: "Writers do not always state every conclusion directly, so readers sometimes have to connect clues.",
    explanation: "An inference is supported by text clues plus reasonable background knowledge. It is different from a fact stated directly, and different from a guess with little evidence.",
    modelSource: "Andre shook rain from his jacket and placed his umbrella by the door.",
    modelThinking: "Umbrella plus water on the jacket strongly supports that it is or was raining. The text does not directly say rain, so I call it an inference, not an explicit fact.",
    practice: [
      { prompt: "What is the best-supported inference?", source: "The sidewalk was white, and Maya brushed snow from her boots before entering.", correct: "It has probably snowed", choices: ["It has probably snowed", "It is definitely midnight", "Maya owns the building"], success: "You used multiple clues without overstating certainty.", retry: "Use the white sidewalk and snow on the boots together." },
      { prompt: "Which conclusion is supported but not directly stated?", source: "The lights were off, the chairs were stacked, and the front door was locked.", correct: "The room is probably closed", choices: ["The room is probably closed", "The building has been sold", "A meeting starts in five minutes"], success: "The clues support a reasonable inference.", retry: "Choose the conclusion that fits all three clues." },
      { prompt: "Infer independently.", source: "The email says the shipment was delayed by a storm and gives a new arrival date two days later.", correct: "The storm likely affected the delivery schedule", choices: ["The storm likely affected the delivery schedule", "The package was stolen", "The company permanently closed"], success: "Independent inference evidence logged.", retry: "Stay close to the stated delay and storm." },
      { prompt: "Transfer to a real-world document clue.", source: "The application status changed from 'pending review' to 'additional documents required.'", correct: "The review likely cannot finish until more documents are supplied", choices: ["The review likely cannot finish until more documents are supplied", "The application is definitely approved", "The applicant is permanently banned"], success: "Inference transferred to a document context with calibrated certainty.", retry: "Use the status change without inventing an outcome the document does not state." },
    ],
  },
];

export const foundationTeachingModules: Record<string, TeachingModule> = Object.fromEntries(
  specs.map((spec) => [spec.moduleId, moduleFromSpec(spec)]),
);

export const foundationTeachingModuleBySkill: Record<string, TeachingModule> = Object.fromEntries(
  Object.values(foundationTeachingModules).map((module) => [module.skillId, module]),
);
