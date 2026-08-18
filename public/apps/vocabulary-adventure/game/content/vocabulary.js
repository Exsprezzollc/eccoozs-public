import { elementaryVocabulary } from "./elementaryVocabulary.js";
import { highSchoolVocabulary } from "./highSchoolVocabulary.js";

/** @typedef {'hear'|'build'|'know'|'use'|'synonym'|'antonym'} ChallengeKind */

const juniorHighVocabularyBase = [
  {
    id: "meticulous", word: "meticulous", partOfSpeech: "adjective", pronunciation: "meh-TIK-yuh-luhs",
    syllables: ["me", "tic", "u", "lous"], definition: "Extremely careful and precise.",
    contexts: [
      "The architect made a meticulous model before construction began.",
      "Her meticulous notes included every measurement and material.",
      "A meticulous gardener checks each seedling for signs of stress."
    ], incorrect: "He was meticulous because he rushed without checking anything.",
    synonyms: ["careful", "precise", "thorough"], antonyms: ["careless", "sloppy"],
    distractors: ["ordinary", "speedy", "fortunate"], family: ["meticulously", "meticulousness"],
    root: { form: "metus", meaning: "fear or excessive care", origin: "Latin" }, difficulty: 2, baseReward: 22
  },
  {
    id: "reluctant", word: "reluctant", partOfSpeech: "adjective", pronunciation: "rih-LUHK-tuhnt",
    syllables: ["re", "luc", "tant"], definition: "Unwilling or hesitant to do something.",
    contexts: [
      "Maya was reluctant to cross the bridge until its railing was repaired.",
      "He felt reluctant to speak before reviewing the evidence.",
      "The cat was reluctant to leave its warm hiding place."
    ], incorrect: "She was reluctant, so she eagerly volunteered before anyone asked.",
    synonyms: ["hesitant", "unwilling", "uncertain"], antonyms: ["eager", "willing"],
    distractors: ["joyful", "silent", "careful"], family: ["reluctance", "reluctantly"],
    root: { form: "luctari", meaning: "to struggle", origin: "Latin" }, difficulty: 1, baseReward: 18
  },
  {
    id: "cultivate", word: "cultivate", partOfSpeech: "verb", pronunciation: "KUHL-tuh-vayt",
    syllables: ["cul", "ti", "vate"], definition: "To prepare and care for growth or development.",
    contexts: [
      "The gardener will cultivate the soil before planting herbs.",
      "Reading widely can cultivate curiosity.",
      "The team worked to cultivate trust with the neighborhood."
    ], incorrect: "They cultivated the broken chair by throwing it away.",
    synonyms: ["nurture", "develop", "foster"], antonyms: ["neglect", "discourage"],
    distractors: ["measure", "divide", "conceal"], family: ["cultivation", "cultivator"],
    root: { form: "cultus", meaning: "care or cultivation", origin: "Latin" }, difficulty: 1, baseReward: 18
  },
  {
    id: "elaborate", word: "elaborate", partOfSpeech: "adjective", pronunciation: "ih-LAB-uh-ruht",
    syllables: ["e", "lab", "o", "rate"], definition: "Detailed, complicated, and carefully arranged.",
    contexts: [
      "An elaborate iron pattern decorated the garden gate.",
      "The celebration included an elaborate arrangement of flowers.",
      "Her elaborate plan explained every stage of the project."
    ], incorrect: "The plain white card had no details, so it was elaborate.",
    synonyms: ["intricate", "detailed", "ornate"], antonyms: ["simple", "plain"],
    distractors: ["fragile", "narrow", "early"], family: ["elaborately", "elaboration"],
    root: { form: "labor", meaning: "work", origin: "Latin" }, difficulty: 2, baseReward: 21
  },
  {
    id: "preserve", word: "preserve", partOfSpeech: "verb", pronunciation: "prih-ZURV",
    syllables: ["pre", "serve"], definition: "To protect something and keep it in good condition.",
    contexts: [
      "The restoration will preserve the oldest trees in the garden.",
      "Cold storage helps preserve fresh food.",
      "The archive preserves letters for future researchers."
    ], incorrect: "They preserved the document by tearing it into pieces.",
    synonyms: ["protect", "maintain", "conserve"], antonyms: ["destroy", "neglect"],
    distractors: ["predict", "borrow", "combine"], family: ["preservation", "preservative"],
    root: { form: "servare", meaning: "to keep safe", origin: "Latin" }, difficulty: 1, baseReward: 18
  },
  {
    id: "scarce", word: "scarce", partOfSpeech: "adjective", pronunciation: "SKAIRS",
    syllables: ["scarce"], definition: "Available only in a small amount; hard to find.",
    contexts: [
      "Water became scarce during the long dry season.",
      "Tickets were scarce because the hall had few seats.",
      "Native seeds were scarce until the greenhouse saved a new crop."
    ], incorrect: "The apples were scarce because every shelf was overflowing with them.",
    synonyms: ["limited", "rare", "insufficient"], antonyms: ["abundant", "plentiful"],
    distractors: ["quiet", "smooth", "ancient"], family: ["scarcity", "scarcely"],
    root: { form: "escars", meaning: "restricted or scant", origin: "Old French" }, difficulty: 1, baseReward: 17
  },
  {
    id: "bewildered", word: "bewildered", partOfSpeech: "adjective", pronunciation: "bih-WIL-derd",
    syllables: ["be", "wil", "dered"], definition: "Very confused and unsure what to do.",
    contexts: [
      "The missing trail signs left the visitors bewildered.",
      "He looked bewildered until the engineer explained the diagram.",
      "The sudden change in instructions made the team feel bewildered."
    ], incorrect: "She understood every step perfectly and was therefore bewildered.",
    synonyms: ["confused", "puzzled", "perplexed"], antonyms: ["certain", "clearheaded"],
    distractors: ["grateful", "patient", "generous"], family: ["bewilder", "bewilderment"],
    root: { form: "wilder", meaning: "to lead astray", origin: "English" }, difficulty: 2, baseReward: 21
  },
  {
    id: "immense", word: "immense", partOfSpeech: "adjective", pronunciation: "ih-MENS",
    syllables: ["im", "mense"], definition: "Extremely large in size or degree.",
    contexts: [
      "The immense oak shaded nearly the entire courtyard.",
      "Restoring the estate required an immense amount of planning.",
      "The telescope revealed the immense distance between stars."
    ], incorrect: "The grain of sand was immense compared with the mountain.",
    synonyms: ["enormous", "vast", "huge"], antonyms: ["tiny", "slight"],
    distractors: ["polite", "flexible", "hidden"], family: ["immensely", "immensity"],
    root: { form: "immensus", meaning: "unmeasured", origin: "Latin" }, difficulty: 1, baseReward: 18
  },
  {
    id: "peculiar", word: "peculiar", partOfSpeech: "adjective", pronunciation: "pih-KYOOL-yur",
    syllables: ["pe", "cu", "liar"], definition: "Strange, unusual, or distinctive.",
    contexts: [
      "A peculiar humming sound came from the old fountain pump.",
      "The plant has a peculiar leaf shape found nowhere else nearby.",
      "The map used a peculiar symbol that needed explanation."
    ], incorrect: "The completely ordinary chair was peculiar because it matched every other chair.",
    synonyms: ["unusual", "odd", "distinctive"], antonyms: ["ordinary", "typical"],
    distractors: ["honest", "distant", "gentle"], family: ["peculiarity", "peculiarly"],
    root: { form: "peculium", meaning: "private property", origin: "Latin" }, difficulty: 2, baseReward: 20
  },
  {
    id: "sustain", word: "sustain", partOfSpeech: "verb", pronunciation: "suh-STAYN",
    syllables: ["sus", "tain"], definition: "To support, maintain, or keep something going over time.",
    contexts: [
      "Collected rainwater can sustain the garden during dry weeks.",
      "A strong plan can sustain the project after funding changes.",
      "Healthy soil helps sustain plant life."
    ], incorrect: "The cracked support sustained the roof by causing it to collapse.",
    synonyms: ["maintain", "support", "continue"], antonyms: ["abandon", "weaken"],
    distractors: ["predict", "decorate", "translate"], family: ["sustainable", "sustainability"],
    root: { form: "tenere", meaning: "to hold", origin: "Latin" }, difficulty: 2, baseReward: 22
  },
  {
    id: "mitigate", word: "mitigate", partOfSpeech: "verb", pronunciation: "MIT-ih-gayt",
    syllables: ["mit", "i", "gate"], definition: "To reduce the severity or harmful effect of something.",
    contexts: [
      "Permeable paving can mitigate stormwater runoff.",
      "Shade trees help mitigate extreme summer heat.",
      "Early repairs can mitigate further damage to the bridge."
    ], incorrect: "The new rule mitigated the delay by making it twice as long.",
    synonyms: ["reduce", "lessen", "ease"], antonyms: ["worsen", "intensify"],
    distractors: ["eliminate", "postpone", "announce"], family: ["mitigation", "mitigating"],
    root: { form: "mitis", meaning: "mild", origin: "Latin" }, difficulty: 3, baseReward: 26
  },
  {
    id: "resilient", word: "resilient", partOfSpeech: "adjective", pronunciation: "rih-ZIL-yuhnt",
    syllables: ["re", "sil", "ient"], definition: "Able to recover or remain strong after difficulty.",
    contexts: [
      "Native plants are resilient during sudden weather changes.",
      "The resilient community rebuilt after the flood.",
      "A resilient material bends without breaking easily."
    ], incorrect: "The fragile glass shattered immediately, proving it was resilient.",
    synonyms: ["strong", "adaptable", "durable"], antonyms: ["fragile", "vulnerable"],
    distractors: ["formal", "silent", "remote"], family: ["resilience", "resiliency"],
    root: { form: "salire", meaning: "to leap back", origin: "Latin" }, difficulty: 2, baseReward: 22
  },
  {
    id: "coherent", word: "coherent", partOfSpeech: "adjective", pronunciation: "koh-HEER-uhnt",
    syllables: ["co", "her", "ent"], definition: "Logical, consistent, and easy to understand.",
    contexts: [
      "The planner gave a coherent explanation of the new walkway.",
      "Arrange the evidence into one coherent argument.",
      "Her report was coherent because each idea connected to the next."
    ], incorrect: "The random sentences had no connection, making the report coherent.",
    synonyms: ["logical", "clear", "consistent"], antonyms: ["confusing", "disjointed"],
    distractors: ["expensive", "ancient", "cheerful"], family: ["coherence", "coherently"],
    root: { form: "haerere", meaning: "to stick together", origin: "Latin" }, difficulty: 3, baseReward: 25
  },
  {
    id: "feasible", word: "feasible", partOfSpeech: "adjective", pronunciation: "FEE-zuh-buhl",
    syllables: ["fea", "si", "ble"], definition: "Possible and practical to accomplish.",
    contexts: [
      "The smaller bridge is feasible within the current budget.",
      "The team tested whether the irrigation plan was feasible.",
      "A feasible schedule leaves enough time for careful inspection."
    ], incorrect: "The plan required impossible materials, so everyone agreed it was feasible.",
    synonyms: ["practical", "possible", "workable"], antonyms: ["impossible", "impractical"],
    distractors: ["colorful", "temporary", "generous"], family: ["feasibility", "feasibly"],
    root: { form: "faire", meaning: "to do or make", origin: "French" }, difficulty: 3, baseReward: 25
  },
  {
    id: "stationary", word: "stationary", partOfSpeech: "adjective", pronunciation: "STAY-shuh-nair-ee",
    syllables: ["sta", "tion", "ar", "y"], definition: "Not moving; remaining in one place.",
    contexts: [
      "The bicycle remained stationary beside the gate.",
      "The camera stayed stationary while the gardeners crossed the path.",
      "A stationary bench cannot roll away in the wind."
    ], incorrect: "She bought envelopes and pens from the stationary store.",
    synonyms: ["still", "motionless", "fixed"], antonyms: ["moving", "mobile"],
    distractors: ["stationery", "temporary", "accurate"], family: ["station", "stationed"],
    misconception: { id: "stationary-stationery", confusedWith: ["stationery"] },
    root: { form: "statio", meaning: "a standing place", origin: "Latin" }, difficulty: 2, baseReward: 23
  },
  {
    id: "discern", word: "discern", partOfSpeech: "verb", pronunciation: "dih-SURN",
    syllables: ["dis", "cern"], definition: "To recognize or understand something clearly, especially when it is not obvious.",
    contexts: [
      "From the faded map, the team could discern the outline of an older path.",
      "Careful readers discern the difference between evidence and opinion.",
      "At dusk, we could barely discern the gate beyond the trees."
    ], incorrect: "He discerned the instructions by refusing to look at or understand them.",
    synonyms: ["detect", "recognize", "perceive"], antonyms: ["overlook", "miss"],
    distractors: ["decorate", "postpone", "multiply"], family: ["discernment", "discernible"],
    root: { form: "discernere", meaning: "to separate or distinguish", origin: "Latin" }, difficulty: 2, baseReward: 22
  },
  {
    id: "allocate", word: "allocate", partOfSpeech: "verb", pronunciation: "AL-uh-kayt",
    syllables: ["al", "lo", "cate"], definition: "To set aside or distribute something for a particular purpose.",
    contexts: [
      "The committee will allocate part of the budget to repair the bridge.",
      "We should allocate enough time for testing before launch.",
      "The gardener allocated one bed to native herbs."
    ], incorrect: "They allocated the supplies by hiding them so nobody could use them for any purpose.",
    synonyms: ["assign", "distribute", "designate"], antonyms: ["withhold", "misplace"],
    distractors: ["observe", "imitate", "wander"], family: ["allocation", "allocated"],
    root: { form: "locare", meaning: "to place", origin: "Latin" }, difficulty: 2, baseReward: 22
  },
  {
    id: "ambiguous", word: "ambiguous", partOfSpeech: "adjective", pronunciation: "am-BIG-yoo-us",
    syllables: ["am", "big", "u", "ous"], definition: "Open to more than one interpretation; not completely clear.",
    contexts: [
      "The sign was ambiguous, so visitors were unsure which path to take.",
      "An ambiguous instruction can lead two teams to different conclusions.",
      "The ending of the story is intentionally ambiguous."
    ], incorrect: "The exact measurement was completely unambiguous, which made it ambiguous.",
    synonyms: ["unclear", "uncertain", "vague"], antonyms: ["clear", "definite"],
    distractors: ["durable", "generous", "rapid"], family: ["ambiguity", "ambiguously"],
    root: { form: "ambiguus", meaning: "uncertain or doubtful", origin: "Latin" }, difficulty: 3, baseReward: 25
  },
  {
    id: "concise", word: "concise", partOfSpeech: "adjective", pronunciation: "kuhn-SISE",
    syllables: ["con", "cise"], definition: "Brief but clear, with no unnecessary words.",
    contexts: [
      "Her concise summary explained the problem in three sentences.",
      "A concise label helped visitors understand the exhibit quickly.",
      "The engineer gave a concise update before the inspection."
    ], incorrect: "The ten-page answer repeated every point many times, making it concise.",
    synonyms: ["brief", "succinct", "compact"], antonyms: ["wordy", "lengthy"],
    distractors: ["fragile", "remote", "cheerful"], family: ["concisely", "conciseness"],
    root: { form: "concidere", meaning: "to cut down", origin: "Latin" }, difficulty: 2, baseReward: 22
  },
  {
    id: "credible", word: "credible", partOfSpeech: "adjective", pronunciation: "KRED-uh-buhl",
    syllables: ["cred", "i", "ble"], definition: "Believable and worthy of trust.",
    contexts: [
      "The report was credible because it cited measurements from several inspections.",
      "A credible witness explains what was observed without inventing details.",
      "The team looked for a credible source before changing the plan."
    ], incorrect: "The rumor had no source or evidence, so it was automatically credible.",
    synonyms: ["believable", "trustworthy", "reliable"], antonyms: ["doubtful", "unreliable"],
    distractors: ["ornate", "silent", "flexible"], family: ["credibility", "credibly"],
    root: { form: "credere", meaning: "to believe", origin: "Latin" }, difficulty: 2, baseReward: 22
  },
  {
    id: "diminish", word: "diminish", partOfSpeech: "verb", pronunciation: "dih-MIN-ish",
    syllables: ["di", "min", "ish"], definition: "To make or become smaller, weaker, or less important.",
    contexts: [
      "Extra shade can diminish heat on the plaza.",
      "The noise diminished as the train moved farther away.",
      "Ignoring the leak will not diminish the risk of damage."
    ], incorrect: "The storm doubled in strength, so its force diminished.",
    synonyms: ["reduce", "lessen", "decrease"], antonyms: ["increase", "intensify"],
    distractors: ["preserve", "announce", "assemble"], family: ["diminished", "diminishing"],
    root: { form: "diminuere", meaning: "to make smaller", origin: "Latin" }, difficulty: 2, baseReward: 22
  },
  {
    id: "plausible", word: "plausible", partOfSpeech: "adjective", pronunciation: "PLAW-zuh-buhl",
    syllables: ["plau", "si", "ble"], definition: "Seeming reasonable or likely to be true.",
    contexts: [
      "The engineer offered a plausible explanation for the sudden pressure drop.",
      "Both routes were plausible, so the team compared cost and safety.",
      "Her theory became more plausible after new evidence appeared."
    ], incorrect: "The explanation contradicted every known fact, which made it obviously plausible.",
    synonyms: ["reasonable", "believable", "possible"], antonyms: ["unlikely", "implausible"],
    distractors: ["colorful", "stationary", "generous"], family: ["plausibility", "plausibly"],
    root: { form: "plausibilis", meaning: "worthy of approval", origin: "Latin" }, difficulty: 3, baseReward: 25
  },
  {
    id: "relevant", word: "relevant", partOfSpeech: "adjective", pronunciation: "REL-uh-vuhnt",
    syllables: ["rel", "e", "vant"], definition: "Closely connected to the matter being considered.",
    contexts: [
      "Rainfall data is relevant when evaluating the drainage plan.",
      "She removed details that were interesting but not relevant to the question.",
      "The inspector asked for records relevant to the damaged section."
    ], incorrect: "A recipe for cake was relevant to calculating the bridge load.",
    synonyms: ["related", "applicable", "pertinent"], antonyms: ["irrelevant", "unrelated"],
    distractors: ["ancient", "fragile", "scarce"], family: ["relevance", "relevantly"],
    root: { form: "relevare", meaning: "to raise or relate", origin: "Latin" }, difficulty: 2, baseReward: 21
  },
  {
    id: "justify", word: "justify", partOfSpeech: "verb", pronunciation: "JUHS-tuh-fy",
    syllables: ["jus", "ti", "fy"], definition: "To give sound reasons or evidence for a decision or belief.",
    contexts: [
      "The team used traffic data to justify adding a safer crossing.",
      "You must justify your recommendation with evidence from the site.",
      "The cost savings alone did not justify ignoring the safety concern."
    ], incorrect: "He justified the decision by saying there was no reason and no evidence at all.",
    synonyms: ["defend", "support", "explain"], antonyms: ["invalidate", "disprove"],
    distractors: ["decorate", "wander", "conceal"], family: ["justification", "justifiable"],
    root: { form: "justus", meaning: "right or lawful", origin: "Latin" }, difficulty: 2, baseReward: 22
  },
  {
    id: "efficient", word: "efficient", partOfSpeech: "adjective", pronunciation: "ih-FISH-uhnt",
    syllables: ["ef", "fi", "cient"], definition: "Working well without wasting time, energy, or resources.",
    contexts: [
      "The efficient irrigation system uses less water without harming the plants.",
      "An efficient route reduced travel time and fuel use.",
      "The team created an efficient process for checking each measurement."
    ], incorrect: "The machine wasted twice as much energy, so it became more efficient.",
    synonyms: ["effective", "economical", "productive"], antonyms: ["wasteful", "inefficient"],
    distractors: ["peculiar", "reluctant", "ornate"], family: ["efficiency", "efficiently"],
    root: { form: "efficere", meaning: "to accomplish", origin: "Latin" }, difficulty: 2, baseReward: 22
  },
  {
    id: "substantial", word: "substantial", partOfSpeech: "adjective", pronunciation: "sub-STAN-shuhl",
    syllables: ["sub", "stan", "tial"], definition: "Large or important enough to have a noticeable effect.",
    contexts: [
      "The renovation required a substantial investment of time and materials.",
      "A substantial drop in water use changed the budget forecast.",
      "The bridge showed substantial damage after the storm."
    ], incorrect: "The change was too tiny to measure, so everyone called it substantial.",
    synonyms: ["considerable", "significant", "major"], antonyms: ["minor", "slight"],
    distractors: ["stationary", "cheerful", "hidden"], family: ["substantially", "substance"],
    root: { form: "substantia", meaning: "substance or being", origin: "Latin" }, difficulty: 3, baseReward: 25
  },
  {
    id: "inevitable", word: "inevitable", partOfSpeech: "adjective", pronunciation: "in-EV-uh-tuh-buhl",
    syllables: ["in", "ev", "i", "ta", "ble"], definition: "Certain to happen; impossible to avoid.",
    contexts: [
      "Without maintenance, some deterioration was inevitable.",
      "A delay was not inevitable because the team still had several workable options.",
      "Once the gate closed automatically, the final click was inevitable."
    ], incorrect: "The event could easily be prevented, so it was completely inevitable.",
    synonyms: ["unavoidable", "certain", "inescapable"], antonyms: ["avoidable", "uncertain"],
    distractors: ["concise", "remote", "generous"], family: ["inevitably", "inevitability"],
    root: { form: "evitare", meaning: "to avoid", origin: "Latin" }, difficulty: 3, baseReward: 26
  },
  {
    id: "interpret", word: "interpret", partOfSpeech: "verb", pronunciation: "in-TUR-prit",
    syllables: ["in", "ter", "pret"], definition: "To explain or determine the meaning of information, words, or events.",
    contexts: [
      "Students interpret the graph before deciding which trend matters.",
      "The planner interpreted the markings as evidence of an older boundary.",
      "Two readers may interpret an ambiguous sentence differently."
    ], incorrect: "She interpreted the chart by refusing to look at any of its information.",
    synonyms: ["explain", "understand", "analyze"], antonyms: ["misread", "ignore"],
    distractors: ["allocate", "decorate", "transport"], family: ["interpretation", "interpreter"],
    root: { form: "interpretari", meaning: "to explain or translate", origin: "Latin" }, difficulty: 2, baseReward: 22
  },
  {
    id: "consequence", word: "consequence", partOfSpeech: "noun", pronunciation: "KON-suh-kwens",
    syllables: ["con", "se", "quence"], definition: "A result or effect that follows from an action or condition.",
    contexts: [
      "One consequence of poor drainage is repeated flooding after heavy rain.",
      "The team considered each consequence before changing the design.",
      "A lower energy bill was a welcome consequence of the upgrade."
    ], incorrect: "The consequence happened before the cause and had no connection to it.",
    synonyms: ["result", "effect", "outcome"], antonyms: ["cause", "origin"],
    distractors: ["location", "decoration", "measurement"], family: ["consequent", "consequently"],
    root: { form: "consequi", meaning: "to follow after", origin: "Latin" }, difficulty: 2, baseReward: 22
  },
  {
    id: "adjacent", word: "adjacent", partOfSpeech: "adjective", pronunciation: "uh-JAY-suhnt",
    syllables: ["ad", "ja", "cent"], definition: "Next to or very near something else.",
    contexts: [
      "The rain garden sits adjacent to the pedestrian walkway.",
      "Two adjacent rooms share the same wall.",
      "Workers closed the path adjacent to the construction zone."
    ], incorrect: "The two parks were on opposite sides of the country, so they were adjacent.",
    synonyms: ["neighboring", "nearby", "adjoining"], antonyms: ["distant", "separate"],
    distractors: ["credible", "scarce", "elaborate"], family: ["adjacency", "adjacently"],
    root: { form: "adjacere", meaning: "to lie near", origin: "Latin" }, difficulty: 1, baseReward: 18
  },
  {
    id: "stationery", word: "stationery", partOfSpeech: "noun", pronunciation: "STAY-shuh-nair-ee",
    syllables: ["sta", "tion", "er", "y"], definition: "Paper, envelopes, and other materials used for writing letters or notes.",
    contexts: [
      "The archive shop sells recycled stationery for handwritten notes.",
      "She selected cream stationery and a dark blue pen for the invitation.",
      "The desk drawer held stationery, stamps, and envelopes."
    ], incorrect: "The bicycle stayed stationery beside the garden gate.",
    synonyms: ["writing paper", "paper goods", "letter paper"], antonyms: ["movement", "motion"],
    distractors: ["stationary", "directory", "equipment"], family: ["stationer", "stationery set"],
    misconception: { id: "stationary-stationery", confusedWith: ["stationary"] },
    root: { form: "stationer", meaning: "a seller of books and writing materials", origin: "English/French" }, difficulty: 2, baseReward: 22
  },
  {
    id: "affect", word: "affect", partOfSpeech: "verb", pronunciation: "uh-FEKT",
    syllables: ["af", "fect"], definition: "To influence or cause a change in something.",
    contexts: [
      "Tree cover can affect how hot the plaza becomes in summer.",
      "A delayed shipment may affect the construction schedule.",
      "Noise from traffic can affect how people use the reading garden."
    ], incorrect: "The shade had a cooling affect on the walkway.",
    synonyms: ["influence", "alter", "change"], antonyms: ["leave unchanged", "preserve"],
    distractors: ["effect", "announce", "measure"], family: ["affected", "affecting"],
    misconception: { id: "affect-effect", confusedWith: ["effect"] },
    root: { form: "afficere", meaning: "to act upon or influence", origin: "Latin" }, difficulty: 2, baseReward: 22
  },
  {
    id: "effect", word: "effect", partOfSpeech: "noun", pronunciation: "ih-FEKT",
    syllables: ["ef", "fect"], definition: "A result or consequence produced by an action or condition.",
    contexts: [
      "One effect of the new shade trees was a cooler pedestrian route.",
      "The team measured the effect of permeable paving after the storm.",
      "A quieter plaza was an unexpected effect of moving delivery traffic."
    ], incorrect: "Heavy rain can effect how quickly the river rises.",
    synonyms: ["result", "outcome", "consequence"], antonyms: ["cause", "source"],
    distractors: ["affect", "location", "proposal"], family: ["effective", "effectively"],
    misconception: { id: "affect-effect", confusedWith: ["affect"] },
    root: { form: "effectus", meaning: "accomplishment or result", origin: "Latin" }, difficulty: 2, baseReward: 22
  },
  {
    id: "accept", word: "accept", partOfSpeech: "verb", pronunciation: "ak-SEPT",
    syllables: ["ac", "cept"], definition: "To receive, agree to, or say yes to something offered or proposed.",
    contexts: [
      "The committee will accept the revised design after the final safety review.",
      "Residents may accept or reject the proposed meeting time.",
      "The museum agreed to accept the donated maps."
    ], incorrect: "Every entrance is open accept the service gate.",
    synonyms: ["receive", "approve", "agree to"], antonyms: ["reject", "refuse"],
    distractors: ["except", "collect", "inspect"], family: ["accepted", "acceptance"],
    misconception: { id: "accept-except", confusedWith: ["except"] },
    root: { form: "accipere", meaning: "to receive", origin: "Latin" }, difficulty: 1, baseReward: 18
  },
  {
    id: "except", word: "except", partOfSpeech: "preposition", pronunciation: "ik-SEPT",
    syllables: ["ex", "cept"], definition: "Not including; leaving one person or thing out of a group or statement.",
    contexts: [
      "All garden paths are open except the bridge under repair.",
      "The survey included every block except the one closed for construction.",
      "Everyone submitted a response except one team member."
    ], incorrect: "The archive will except the donated photographs tomorrow.",
    synonyms: ["excluding", "apart from", "other than"], antonyms: ["including", "together with"],
    distractors: ["accept", "beside", "within"], family: ["exception", "exceptional"],
    misconception: { id: "accept-except", confusedWith: ["accept"] },
    root: { form: "excipere", meaning: "to take out or exclude", origin: "Latin" }, difficulty: 1, baseReward: 18
  },
  {
    id: "principal", word: "principal", partOfSpeech: "adjective", pronunciation: "PRIN-suh-puhl",
    syllables: ["prin", "ci", "pal"], definition: "Main or most important; it can also name a person in charge of a school or organization.",
    contexts: [
      "The principal reason for widening the path was pedestrian safety.",
      "Stormwater control became the principal concern in the revised plan.",
      "The school principal joined the neighborhood design meeting."
    ], incorrect: "Accessibility is a design principal that guides every decision.",
    synonyms: ["main", "primary", "chief"], antonyms: ["minor", "secondary"],
    distractors: ["principle", "ordinary", "adjacent"], family: ["principally", "principalship"],
    misconception: { id: "principal-principle", confusedWith: ["principle"] },
    root: { form: "principalis", meaning: "first or chief", origin: "Latin" }, difficulty: 2, baseReward: 22
  },
  {
    id: "principle", word: "principle", partOfSpeech: "noun", pronunciation: "PRIN-suh-puhl",
    syllables: ["prin", "ci", "ple"], definition: "A basic rule, belief, or idea that guides decisions or explains how something works.",
    contexts: [
      "Universal access is a guiding principle of the public-space design.",
      "The team used the principle of water conservation when selecting plants.",
      "A scientific principle should help explain why the result occurs."
    ], incorrect: "Safety was the principle reason the crossing was redesigned.",
    synonyms: ["rule", "standard", "guideline"], antonyms: ["exception", "violation"],
    distractors: ["principal", "schedule", "measurement"], family: ["principled", "principles"],
    misconception: { id: "principal-principle", confusedWith: ["principal"] },
    root: { form: "principium", meaning: "beginning or foundation", origin: "Latin" }, difficulty: 2, baseReward: 22
  },
  {
    id: "complement", word: "complement", partOfSpeech: "verb", pronunciation: "KOM-pluh-ment",
    syllables: ["com", "ple", "ment"], definition: "To complete, balance, or work especially well with something else.",
    contexts: [
      "Native grasses complement the warm stone used along the walkway.",
      "The small reading pavilion will complement the larger community garden.",
      "Soft lighting can complement the historic character of the courtyard."
    ], incorrect: "The visitor gave the team a complement on its careful work.",
    synonyms: ["complete", "balance", "enhance"], antonyms: ["clash", "conflict"],
    distractors: ["compliment", "replace", "postpone"], family: ["complementary", "complemented"],
    misconception: { id: "complement-compliment", confusedWith: ["compliment"] },
    root: { form: "complementum", meaning: "that which fills up or completes", origin: "Latin" }, difficulty: 2, baseReward: 22
  },
  {
    id: "compliment", word: "compliment", partOfSpeech: "noun", pronunciation: "KOM-pluh-ment",
    syllables: ["com", "pli", "ment"], definition: "A polite expression of praise or admiration.",
    contexts: [
      "The architect received a compliment on the clarity of the presentation.",
      "Her compliment recognized the students' careful field notes.",
      "A sincere compliment can acknowledge work that was done well."
    ], incorrect: "The new benches compliment the brick paving by completing the color scheme.",
    synonyms: ["praise", "admiration", "approval"], antonyms: ["criticism", "insult"],
    distractors: ["complement", "evidence", "instruction"], family: ["complimentary", "complimented"],
    misconception: { id: "complement-compliment", confusedWith: ["complement"] },
    root: { form: "compliment", meaning: "an expression of courtesy", origin: "French/Italian" }, difficulty: 1, baseReward: 19
  },
  {
    id: "cite", word: "cite", partOfSpeech: "verb", pronunciation: "SITE",
    syllables: ["cite"], definition: "To name a source, example, or evidence that supports a statement.",
    contexts: [
      "The report should cite the traffic survey that supplied the numbers.",
      "Writers cite reliable sources so readers can trace the evidence.",
      "The planner cited three inspections to justify the repair."
    ], incorrect: "The team visited the construction cite beside the river.",
    synonyms: ["quote", "reference", "mention as evidence"], antonyms: ["omit", "ignore"],
    distractors: ["site", "sight", "summarize"], family: ["citation", "cited"],
    misconception: { id: "cite-site-sight", confusedWith: ["site", "sight"] },
    root: { form: "citare", meaning: "to call or summon", origin: "Latin" }, difficulty: 2, baseReward: 21
  },
  {
    id: "site", word: "site", partOfSpeech: "noun", pronunciation: "SITE",
    syllables: ["site"], definition: "A place or location where something exists, happened, or will be built.",
    contexts: [
      "The team inspected the construction site before approving the next phase.",
      "A former parking lot became the site of the new rain garden.",
      "The map marks the proposed site for the pedestrian bridge."
    ], incorrect: "The report should site the survey that provided the evidence.",
    synonyms: ["location", "place", "area"], antonyms: ["source", "reference"],
    distractors: ["cite", "sight", "route"], family: ["worksite", "site plan"],
    misconception: { id: "cite-site-sight", confusedWith: ["cite", "sight"] },
    root: { form: "situs", meaning: "position or place", origin: "Latin" }, difficulty: 1, baseReward: 18
  },
  {
    id: "sight", word: "sight", partOfSpeech: "noun", pronunciation: "SITE",
    syllables: ["sight"], definition: "The ability to see, or something that can be seen.",
    contexts: [
      "The restored fountain was an impressive sight at sunset.",
      "Clear signs should remain within sight of people entering the plaza.",
      "The tower came into sight as the group crossed the bridge."
    ], incorrect: "The engineer included a sight from the inspection report as evidence.",
    synonyms: ["view", "vision", "scene"], antonyms: ["blindness", "concealment"],
    distractors: ["cite", "site", "sound"], family: ["sighted", "eyesight"],
    misconception: { id: "cite-site-sight", confusedWith: ["cite", "site"] },
    root: { form: "siht", meaning: "something seen", origin: "Old English" }, difficulty: 1, baseReward: 18
  },
  {
    "id": "abundant",
    "word": "abundant",
    "partOfSpeech": "adjective",
    "pronunciation": "uh-BUN-duhnt",
    "syllables": [
      "a",
      "bun",
      "dant"
    ],
    "definition": "Existing in large amounts; more than enough.",
    "contexts": [
      "After the rainy spring, wildflowers were abundant along the trail.",
      "The archive had abundant evidence from several independent sources.",
      "Fresh water is abundant in some regions and scarce in others."
    ],
    "incorrect": "The supply was abundant because only one tiny piece remained for hundreds of people.",
    "synonyms": [
      "plentiful",
      "ample",
      "copious"
    ],
    "antonyms": [
      "scarce",
      "limited"
    ],
    "distractors": [
      "abrupt",
      "courteous",
      "deliberate"
    ],
    "family": [
      "abundance",
      "abundantly"
    ],
    "root": {
      "form": "abundare",
      "meaning": "to overflow",
      "origin": "Latin"
    },
    "difficulty": 1,
    "baseReward": 18
  },
  {
    "id": "abrupt",
    "word": "abrupt",
    "partOfSpeech": "adjective",
    "pronunciation": "uh-BRUPT",
    "syllables": [
      "a",
      "brupt"
    ],
    "definition": "Sudden and unexpected, or sharply broken off.",
    "contexts": [
      "The abrupt temperature drop surprised everyone outside.",
      "Her abrupt ending left the explanation unfinished.",
      "An abrupt turn in the path appears just beyond the bridge."
    ],
    "incorrect": "The change was abrupt because it happened slowly and predictably over six months.",
    "synonyms": [
      "sudden",
      "sharp",
      "unexpected"
    ],
    "antonyms": [
      "gradual",
      "smooth"
    ],
    "distractors": [
      "abundant",
      "retain",
      "courteous"
    ],
    "family": [
      "abruptly",
      "abruptness"
    ],
    "root": {
      "form": "abruptus",
      "meaning": "broken off",
      "origin": "Latin"
    },
    "difficulty": 1,
    "baseReward": 18
  },
  {
    "id": "compel",
    "word": "compel",
    "partOfSpeech": "verb",
    "pronunciation": "kum-PEL",
    "syllables": [
      "com",
      "pel"
    ],
    "definition": "To force, strongly drive, or make something necessary.",
    "contexts": [
      "The safety rule can compel the contractor to correct the hazard.",
      "The evidence compelled the team to reconsider its first explanation.",
      "A court order may compel a person to provide required records."
    ],
    "incorrect": "The optional suggestion compelled everyone because no one had to follow it.",
    "synonyms": [
      "force",
      "require",
      "drive"
    ],
    "antonyms": [
      "allow",
      "discourage"
    ],
    "distractors": [
      "retain",
      "modify",
      "abundant"
    ],
    "family": [
      "compelled",
      "compelling"
    ],
    "root": {
      "form": "compellere",
      "meaning": "to drive together",
      "origin": "Latin"
    },
    "difficulty": 1,
    "baseReward": 19
  },
  {
    "id": "courteous",
    "word": "courteous",
    "partOfSpeech": "adjective",
    "pronunciation": "KUR-tee-us",
    "syllables": [
      "cour",
      "te",
      "ous"
    ],
    "definition": "Polite, respectful, and considerate toward other people.",
    "contexts": [
      "The courteous speaker disagreed without insulting anyone.",
      "A courteous reply can still be firm and clear.",
      "The student was courteous while asking the librarian for help."
    ],
    "incorrect": "His courteous response included mocking the other person and interrupting every sentence.",
    "synonyms": [
      "polite",
      "respectful",
      "considerate"
    ],
    "antonyms": [
      "rude",
      "discourteous"
    ],
    "distractors": [
      "abrupt",
      "abundant",
      "evident"
    ],
    "family": [
      "courtesy",
      "courteously"
    ],
    "root": {
      "form": "cortois",
      "meaning": "polite or courtly",
      "origin": "Old French"
    },
    "difficulty": 1,
    "baseReward": 18
  },
  {
    "id": "deliberate",
    "word": "deliberate",
    "partOfSpeech": "adjective",
    "pronunciation": "dih-LIB-er-it",
    "syllables": [
      "de",
      "lib",
      "er",
      "ate"
    ],
    "definition": "Done intentionally and with careful thought rather than by accident.",
    "contexts": [
      "The deliberate pause gave the speaker time to choose precise words.",
      "The team made a deliberate choice to test the safest option first.",
      "Her deliberate notes were organized for later review."
    ],
    "incorrect": "The accidental spill was deliberate even though no one intended it.",
    "synonyms": [
      "intentional",
      "careful",
      "planned"
    ],
    "antonyms": [
      "accidental",
      "hasty"
    ],
    "distractors": [
      "abrupt",
      "flexible",
      "evident"
    ],
    "family": [
      "deliberately",
      "deliberation"
    ],
    "root": {
      "form": "deliberare",
      "meaning": "to weigh carefully",
      "origin": "Latin"
    },
    "difficulty": 1,
    "baseReward": 19
  },
  {
    "id": "evident",
    "word": "evident",
    "partOfSpeech": "adjective",
    "pronunciation": "EV-ih-dent",
    "syllables": [
      "ev",
      "i",
      "dent"
    ],
    "definition": "Clear enough to be seen, understood, or recognized from the available information.",
    "contexts": [
      "The leak became evident when water appeared beneath the pipe.",
      "It was evident from the graph that attendance had increased.",
      "Her preparation was evident in the detailed presentation."
    ],
    "incorrect": "The cause was evident because there were no clues or observations pointing to it.",
    "synonyms": [
      "clear",
      "apparent",
      "obvious"
    ],
    "antonyms": [
      "hidden",
      "unclear"
    ],
    "distractors": [
      "abundant",
      "courteous",
      "retain"
    ],
    "family": [
      "evidence",
      "evidently"
    ],
    "root": {
      "form": "evidens",
      "meaning": "clear or visible",
      "origin": "Latin"
    },
    "difficulty": 1,
    "baseReward": 18
  },
  {
    "id": "flexible",
    "word": "flexible",
    "partOfSpeech": "adjective",
    "pronunciation": "FLEK-suh-buhl",
    "syllables": [
      "flex",
      "i",
      "ble"
    ],
    "definition": "Able to bend, change, or adjust without breaking or failing.",
    "contexts": [
      "The flexible schedule allowed the team to respond to weather delays.",
      "A flexible material bends before it cracks.",
      "Good plans can be flexible when new evidence changes the situation."
    ],
    "incorrect": "The plan was flexible because it could never be changed under any condition.",
    "synonyms": [
      "adaptable",
      "adjustable",
      "versatile"
    ],
    "antonyms": [
      "rigid",
      "inflexible"
    ],
    "distractors": [
      "abrupt",
      "abundant",
      "courteous"
    ],
    "family": [
      "flexibility",
      "flexibly"
    ],
    "root": {
      "form": "flectere",
      "meaning": "to bend",
      "origin": "Latin"
    },
    "difficulty": 1,
    "baseReward": 19
  },
  {
    "id": "hinder",
    "word": "hinder",
    "partOfSpeech": "verb",
    "pronunciation": "HIN-dur",
    "syllables": [
      "hin",
      "der"
    ],
    "definition": "To make progress more difficult or slow something down.",
    "contexts": [
      "Heavy traffic can hinder emergency vehicles.",
      "Missing information hindered the investigation.",
      "A damaged hinge may hinder the gate from closing properly."
    ],
    "incorrect": "The shortcut hindered progress by helping everyone arrive sooner.",
    "synonyms": [
      "obstruct",
      "delay",
      "impede"
    ],
    "antonyms": [
      "help",
      "assist"
    ],
    "distractors": [
      "retain",
      "modify",
      "evident"
    ],
    "family": [
      "hindrance",
      "hindered"
    ],
    "root": {
      "form": "hindrian",
      "meaning": "to harm or obstruct",
      "origin": "Old English"
    },
    "difficulty": 1,
    "baseReward": 18
  },
  {
    "id": "modify",
    "word": "modify",
    "partOfSpeech": "verb",
    "pronunciation": "MAH-duh-fy",
    "syllables": [
      "mod",
      "i",
      "fy"
    ],
    "definition": "To change something, usually in a limited or specific way.",
    "contexts": [
      "The designer modified the plan to preserve the accessible entrance.",
      "We modified the experiment after the first measurement failed.",
      "A teacher may modify an assignment without changing its main goal."
    ],
    "incorrect": "We modified the document by leaving every word exactly unchanged.",
    "synonyms": [
      "change",
      "adjust",
      "revise"
    ],
    "antonyms": [
      "preserve unchanged",
      "keep"
    ],
    "distractors": [
      "retain",
      "abrupt",
      "abundant"
    ],
    "family": [
      "modification",
      "modified"
    ],
    "root": {
      "form": "modificare",
      "meaning": "to limit or shape",
      "origin": "Latin"
    },
    "difficulty": 1,
    "baseReward": 19
  },
  {
    "id": "retain",
    "word": "retain",
    "partOfSpeech": "verb",
    "pronunciation": "rih-TAYN",
    "syllables": [
      "re",
      "tain"
    ],
    "definition": "To keep, continue to have, or hold onto something.",
    "contexts": [
      "The revised design retains the historic stone wall.",
      "Soil with more organic matter may retain more moisture.",
      "The summary should retain the main idea while removing unnecessary details."
    ],
    "incorrect": "The file retained the photo by deleting it permanently.",
    "synonyms": [
      "keep",
      "preserve",
      "hold"
    ],
    "antonyms": [
      "discard",
      "lose"
    ],
    "distractors": [
      "modify",
      "hinder",
      "abrupt"
    ],
    "family": [
      "retention",
      "retained"
    ],
    "root": {
      "form": "retinere",
      "meaning": "to hold back or keep",
      "origin": "Latin"
    },
    "difficulty": 1,
    "baseReward": 19
  },
  {
    "id": "advocate",
    "word": "advocate",
    "partOfSpeech": "verb",
    "pronunciation": "AD-vuh-kayt",
    "syllables": [
      "ad",
      "vo",
      "cate"
    ],
    "definition": "To publicly support, recommend, or argue for a cause, policy, or course of action.",
    "contexts": [
      "Residents may advocate for safer crossings near the school.",
      "The report advocates a phased approach rather than immediate expansion.",
      "She advocated for the proposal by citing its documented benefits."
    ],
    "incorrect": "He advocated for the plan by arguing that everyone should reject it.",
    "synonyms": [
      "support",
      "promote",
      "argue for"
    ],
    "antonyms": [
      "oppose",
      "discourage"
    ],
    "distractors": [
      "assess",
      "derive",
      "illustrate"
    ],
    "family": [
      "advocacy",
      "advocate"
    ],
    "root": {
      "form": "advocare",
      "meaning": "to call to one's aid",
      "origin": "Latin"
    },
    "difficulty": 2,
    "baseReward": 22
  },
  {
    "id": "assess",
    "word": "assess",
    "partOfSpeech": "verb",
    "pronunciation": "uh-SESS",
    "syllables": [
      "as",
      "sess"
    ],
    "definition": "To evaluate the condition, value, quality, risk, or importance of something using information or criteria.",
    "contexts": [
      "Inspectors assessed the bridge before reopening it.",
      "The team assessed the proposal against the published requirements.",
      "We assessed the evidence before drawing a conclusion."
    ],
    "incorrect": "The reviewer assessed the application by refusing to examine it.",
    "synonyms": [
      "evaluate",
      "judge",
      "appraise"
    ],
    "antonyms": [
      "ignore",
      "guess"
    ],
    "distractors": [
      "advocate",
      "derive",
      "maintain"
    ],
    "family": [
      "assessment",
      "assessor"
    ],
    "root": {
      "form": "assidere",
      "meaning": "to sit beside for judgment",
      "origin": "Latin"
    },
    "difficulty": 2,
    "baseReward": 22
  },
  {
    "id": "contradict",
    "word": "contradict",
    "partOfSpeech": "verb",
    "pronunciation": "kon-truh-DIKT",
    "syllables": [
      "con",
      "tra",
      "dict"
    ],
    "definition": "To state or show the opposite of something, making both claims unable to be true in the same way at the same time.",
    "contexts": [
      "The new measurement contradicts the earlier claim that the pipe is level.",
      "Two witnesses may contradict each other about the sequence of events.",
      "The graph contradicts the statement that sales fell every month."
    ],
    "incorrect": "The second statement contradicted the first by saying exactly the same thing.",
    "synonyms": [
      "oppose",
      "conflict with",
      "dispute"
    ],
    "antonyms": [
      "confirm",
      "support"
    ],
    "distractors": [
      "derive",
      "illustrate",
      "maintain"
    ],
    "family": [
      "contradiction",
      "contradictory"
    ],
    "root": {
      "form": "contradicere",
      "meaning": "to speak against",
      "origin": "Latin"
    },
    "difficulty": 2,
    "baseReward": 23
  },
  {
    "id": "conventional",
    "word": "conventional",
    "partOfSpeech": "adjective",
    "pronunciation": "kun-VEN-shuh-nuhl",
    "syllables": [
      "con",
      "ven",
      "tion",
      "al"
    ],
    "definition": "Following a widely accepted, traditional, or usual method or standard.",
    "contexts": [
      "The conventional design uses a standard curb and gutter system.",
      "Her solution was less conventional but still met every requirement.",
      "Conventional punctuation helps readers understand sentence structure."
    ],
    "incorrect": "The completely novel method with no precedent was conventional because no one had ever used anything like it.",
    "synonyms": [
      "traditional",
      "standard",
      "customary"
    ],
    "antonyms": [
      "unconventional",
      "novel"
    ],
    "distractors": [
      "derive",
      "objective",
      "tentative"
    ],
    "family": [
      "convention",
      "conventionally"
    ],
    "root": {
      "form": "convenire",
      "meaning": "to come together or agree",
      "origin": "Latin"
    },
    "difficulty": 2,
    "baseReward": 22
  },
  {
    "id": "derive",
    "word": "derive",
    "partOfSpeech": "verb",
    "pronunciation": "dih-RYVE",
    "syllables": [
      "de",
      "rive"
    ],
    "definition": "To obtain, develop, or trace something from a source.",
    "contexts": [
      "The estimate is derived from three months of measured data.",
      "Many English words derive from Latin or Greek roots.",
      "The team derived the total by adding the category amounts."
    ],
    "incorrect": "The result was derived from the data even though the data were never used.",
    "synonyms": [
      "obtain",
      "come from",
      "deduce"
    ],
    "antonyms": [
      "invent without basis",
      "separate from"
    ],
    "distractors": [
      "advocate",
      "illustrate",
      "maintain"
    ],
    "family": [
      "derivation",
      "derived"
    ],
    "root": {
      "form": "derivare",
      "meaning": "to draw off from a source",
      "origin": "Latin"
    },
    "difficulty": 2,
    "baseReward": 22
  },
  {
    "id": "distinguish",
    "word": "distinguish",
    "partOfSpeech": "verb",
    "pronunciation": "dih-STING-gwish",
    "syllables": [
      "dis",
      "tin",
      "guish"
    ],
    "definition": "To recognize or explain the difference between things that may seem similar.",
    "contexts": [
      "The analyst distinguished observed facts from assumptions.",
      "Good readers distinguish the author's claim from supporting evidence.",
      "The label helps users distinguish the two similar controls."
    ],
    "incorrect": "I distinguished the two terms by pretending they meant exactly the same thing.",
    "synonyms": [
      "differentiate",
      "tell apart",
      "separate"
    ],
    "antonyms": [
      "confuse",
      "equate"
    ],
    "distractors": [
      "derive",
      "maintain",
      "priority"
    ],
    "family": [
      "distinction",
      "distinguishable"
    ],
    "root": {
      "form": "distinguere",
      "meaning": "to separate or mark apart",
      "origin": "Latin"
    },
    "difficulty": 2,
    "baseReward": 22
  },
  {
    "id": "enhance",
    "word": "enhance",
    "partOfSpeech": "verb",
    "pronunciation": "en-HANS",
    "syllables": [
      "en",
      "hance"
    ],
    "definition": "To improve the quality, value, strength, or effectiveness of something.",
    "contexts": [
      "New lighting can enhance visibility without changing the street layout.",
      "The revision enhanced the explanation by adding clearer evidence.",
      "Native planting can enhance habitat along the stream."
    ],
    "incorrect": "The change enhanced the bridge by making it weaker and less safe.",
    "synonyms": [
      "improve",
      "strengthen",
      "increase"
    ],
    "antonyms": [
      "weaken",
      "diminish"
    ],
    "distractors": [
      "derive",
      "objective",
      "tentative"
    ],
    "family": [
      "enhancement",
      "enhanced"
    ],
    "root": {
      "form": "enhauncer",
      "meaning": "to raise or increase",
      "origin": "Old French"
    },
    "difficulty": 2,
    "baseReward": 22
  },
  {
    "id": "formulate",
    "word": "formulate",
    "partOfSpeech": "verb",
    "pronunciation": "FOR-myuh-layt",
    "syllables": [
      "for",
      "mu",
      "late"
    ],
    "definition": "To develop or express an idea, plan, rule, or solution carefully and systematically.",
    "contexts": [
      "The team formulated a response after reviewing the evidence.",
      "Scientists formulate hypotheses that can be tested.",
      "The writer formulated a concise thesis for the essay."
    ],
    "incorrect": "We formulated the plan by refusing to decide what the plan should contain.",
    "synonyms": [
      "develop",
      "devise",
      "compose"
    ],
    "antonyms": [
      "abandon",
      "improvise blindly"
    ],
    "distractors": [
      "derive",
      "illustrate",
      "maintain"
    ],
    "family": [
      "formulation",
      "formula"
    ],
    "root": {
      "form": "formula",
      "meaning": "a set form or rule",
      "origin": "Latin"
    },
    "difficulty": 2,
    "baseReward": 23
  },
  {
    "id": "hypothesis",
    "word": "hypothesis",
    "partOfSpeech": "noun",
    "pronunciation": "hy-PAH-thuh-sis",
    "syllables": [
      "hy",
      "poth",
      "e",
      "sis"
    ],
    "definition": "A testable explanation or prediction proposed before all the evidence is known.",
    "contexts": [
      "The class tested the hypothesis that darker soil warms faster.",
      "A good hypothesis can be supported or challenged by evidence.",
      "The researcher revised the hypothesis after the first results."
    ],
    "incorrect": "The hypothesis was a proven fact that could not be tested or questioned.",
    "synonyms": [
      "testable explanation",
      "proposal",
      "prediction"
    ],
    "antonyms": [
      "established fact",
      "certainty"
    ],
    "distractors": [
      "objective",
      "priority",
      "illustration"
    ],
    "family": [
      "hypotheses",
      "hypothesize"
    ],
    "root": {
      "form": "hypothesis",
      "meaning": "a placing under or supposition",
      "origin": "Greek"
    },
    "difficulty": 2,
    "baseReward": 23
  },
  {
    "id": "illustrate",
    "word": "illustrate",
    "partOfSpeech": "verb",
    "pronunciation": "IL-uh-strayt",
    "syllables": [
      "il",
      "lus",
      "trate"
    ],
    "definition": "To explain or make something clear by giving an example, image, or comparison.",
    "contexts": [
      "The diagram illustrates how water moves through the system.",
      "One example can illustrate the difference between the two terms.",
      "The chart illustrates the trend across five years."
    ],
    "incorrect": "The blank page illustrated the process by showing no example, image, or explanation.",
    "synonyms": [
      "demonstrate",
      "show",
      "exemplify"
    ],
    "antonyms": [
      "obscure",
      "confuse"
    ],
    "distractors": [
      "derive",
      "maintain",
      "priority"
    ],
    "family": [
      "illustration",
      "illustrative"
    ],
    "root": {
      "form": "illustrare",
      "meaning": "to make clear or bright",
      "origin": "Latin"
    },
    "difficulty": 2,
    "baseReward": 22
  },
  {
    "id": "maintain",
    "word": "maintain",
    "partOfSpeech": "verb",
    "pronunciation": "mayn-TAYN",
    "syllables": [
      "main",
      "tain"
    ],
    "definition": "To keep something in a particular condition, continue something, or state and defend a position.",
    "contexts": [
      "Crews maintain the trail so it remains safe to use.",
      "The report maintains that more evidence is needed before expansion.",
      "Regular updates help maintain accurate records."
    ],
    "incorrect": "The team maintained the equipment by neglecting it until it failed.",
    "synonyms": [
      "keep",
      "preserve",
      "sustain"
    ],
    "antonyms": [
      "neglect",
      "abandon"
    ],
    "distractors": [
      "derive",
      "illustrate",
      "priority"
    ],
    "family": [
      "maintenance",
      "maintained"
    ],
    "root": {
      "form": "manu tenere",
      "meaning": "to hold in the hand",
      "origin": "Latin/French"
    },
    "difficulty": 2,
    "baseReward": 22
  },
  {
    "id": "objective",
    "word": "objective",
    "partOfSpeech": "adjective",
    "pronunciation": "ub-JEK-tiv",
    "syllables": [
      "ob",
      "jec",
      "tive"
    ],
    "definition": "Based on observable facts or fair criteria rather than personal feelings or preferences.",
    "contexts": [
      "An objective review applies the same criteria to every proposal.",
      "The measurement provides objective information about the temperature.",
      "The editor tried to make the summary objective and evidence-based."
    ],
    "incorrect": "The review was objective because the reviewer chose only what matched a personal favorite.",
    "synonyms": [
      "unbiased",
      "factual",
      "impartial"
    ],
    "antonyms": [
      "subjective",
      "biased"
    ],
    "distractors": [
      "priority",
      "tentative",
      "variable"
    ],
    "family": [
      "objectivity",
      "objectively"
    ],
    "root": {
      "form": "objectum",
      "meaning": "thing placed before the mind",
      "origin": "Latin"
    },
    "difficulty": 2,
    "baseReward": 23
  },
  {
    "id": "perspective",
    "word": "perspective",
    "partOfSpeech": "noun",
    "pronunciation": "pur-SPEK-tiv",
    "syllables": [
      "per",
      "spec",
      "tive"
    ],
    "definition": "A particular way of viewing, understanding, or thinking about something.",
    "contexts": [
      "The resident and engineer brought different perspectives to the meeting.",
      "The narrator's perspective shapes which details the reader learns.",
      "Looking from another perspective can reveal a problem you missed."
    ],
    "incorrect": "Everyone had a different perspective because they all understood the issue in exactly the same way.",
    "synonyms": [
      "viewpoint",
      "outlook",
      "point of view"
    ],
    "antonyms": [
      "single shared view",
      "blindness"
    ],
    "distractors": [
      "priority",
      "tentative",
      "variable"
    ],
    "family": [
      "perspectives",
      "perspective"
    ],
    "root": {
      "form": "perspicere",
      "meaning": "to look through",
      "origin": "Latin"
    },
    "difficulty": 2,
    "baseReward": 22
  },
  {
    "id": "precise",
    "word": "precise",
    "partOfSpeech": "adjective",
    "pronunciation": "prih-SYSE",
    "syllables": [
      "pre",
      "cise"
    ],
    "definition": "Exact, specific, and carefully expressed or measured.",
    "contexts": [
      "Use precise vocabulary so the claim does not promise more than the evidence shows.",
      "The technician recorded the precise measurement.",
      "A precise direction tells the reader exactly what to do."
    ],
    "incorrect": "The instruction was precise because it was vague and could mean almost anything.",
    "synonyms": [
      "exact",
      "specific",
      "accurate"
    ],
    "antonyms": [
      "vague",
      "imprecise"
    ],
    "distractors": [
      "priority",
      "tentative",
      "variable"
    ],
    "family": [
      "precision",
      "precisely"
    ],
    "root": {
      "form": "praecidere",
      "meaning": "to cut off or define closely",
      "origin": "Latin"
    },
    "difficulty": 2,
    "baseReward": 23
  },
  {
    "id": "priority",
    "word": "priority",
    "partOfSpeech": "noun",
    "pronunciation": "pry-OR-uh-tee",
    "syllables": [
      "pri",
      "or",
      "i",
      "ty"
    ],
    "definition": "Something treated as more important or urgent than other things.",
    "contexts": [
      "Safety is the first priority during the repair.",
      "The team set priorities based on documented risk.",
      "Finishing the required work became a higher priority than decoration."
    ],
    "incorrect": "The lowest-priority item was the priority because it was intentionally placed last and mattered least.",
    "synonyms": [
      "precedence",
      "importance",
      "urgency"
    ],
    "antonyms": [
      "low importance",
      "afterthought"
    ],
    "distractors": [
      "tentative",
      "variable",
      "illustration"
    ],
    "family": [
      "prioritize",
      "priorities"
    ],
    "root": {
      "form": "prior",
      "meaning": "earlier or first",
      "origin": "Latin"
    },
    "difficulty": 2,
    "baseReward": 22
  },
  {
    "id": "reinforce",
    "word": "reinforce",
    "partOfSpeech": "verb",
    "pronunciation": "ree-in-FORS",
    "syllables": [
      "re",
      "in",
      "force"
    ],
    "definition": "To strengthen something or make an idea, structure, or behavior more firmly supported.",
    "contexts": [
      "Extra bracing can reinforce the weak frame.",
      "The second source reinforced the original finding.",
      "Practice can reinforce a newly learned skill."
    ],
    "incorrect": "The repair reinforced the wall by removing its strongest supports.",
    "synonyms": [
      "strengthen",
      "support",
      "bolster"
    ],
    "antonyms": [
      "weaken",
      "undermine"
    ],
    "distractors": [
      "priority",
      "tentative",
      "variable"
    ],
    "family": [
      "reinforcement",
      "reinforced"
    ],
    "root": {
      "form": "force",
      "meaning": "strength",
      "origin": "French"
    },
    "difficulty": 2,
    "baseReward": 22
  },
  {
    "id": "scrutinize",
    "word": "scrutinize",
    "partOfSpeech": "verb",
    "pronunciation": "SKROO-tuh-nyze",
    "syllables": [
      "scru",
      "ti",
      "nize"
    ],
    "definition": "To examine something very carefully, especially for details, problems, or accuracy.",
    "contexts": [
      "Reviewers scrutinized the budget before approving the request.",
      "The class scrutinized the source for evidence of bias.",
      "Engineers scrutinize measurements when a result falls near a limit."
    ],
    "incorrect": "I scrutinized the report by glancing at the title and refusing to read anything else.",
    "synonyms": [
      "inspect",
      "examine closely",
      "analyze"
    ],
    "antonyms": [
      "skim",
      "ignore"
    ],
    "distractors": [
      "priority",
      "tentative",
      "variable"
    ],
    "family": [
      "scrutiny",
      "scrutinized"
    ],
    "root": {
      "form": "scrutari",
      "meaning": "to search thoroughly",
      "origin": "Latin"
    },
    "difficulty": 2,
    "baseReward": 24
  },
  {
    "id": "tentative",
    "word": "tentative",
    "partOfSpeech": "adjective",
    "pronunciation": "TEN-tuh-tiv",
    "syllables": [
      "ten",
      "ta",
      "tive"
    ],
    "definition": "Not final; offered cautiously because more information may still change the conclusion.",
    "contexts": [
      "The team made a tentative schedule while waiting for the permit date.",
      "The early result is tentative because only a few samples are available.",
      "She gave a tentative answer and explained what evidence was still missing."
    ],
    "incorrect": "The final signed decision was tentative because nothing could change it and no uncertainty remained.",
    "synonyms": [
      "provisional",
      "uncertain",
      "preliminary"
    ],
    "antonyms": [
      "final",
      "certain"
    ],
    "distractors": [
      "priority",
      "variable",
      "illustration"
    ],
    "family": [
      "tentatively",
      "tentativeness"
    ],
    "root": {
      "form": "tentare",
      "meaning": "to try or test",
      "origin": "Latin"
    },
    "difficulty": 2,
    "baseReward": 23
  },
  {
    "id": "valid",
    "word": "valid",
    "partOfSpeech": "adjective",
    "pronunciation": "VAL-id",
    "syllables": [
      "val",
      "id"
    ],
    "definition": "Logically sound, well-founded, or officially acceptable for the purpose being considered.",
    "contexts": [
      "The permit remains valid until its expiration date.",
      "A valid conclusion must follow from the evidence used.",
      "The test is valid only if it actually measures the skill it claims to measure."
    ],
    "incorrect": "The argument was valid because its conclusion contradicted every fact it relied on.",
    "synonyms": [
      "sound",
      "legitimate",
      "well-founded"
    ],
    "antonyms": [
      "invalid",
      "unsound"
    ],
    "distractors": [
      "priority",
      "tentative",
      "variable"
    ],
    "family": [
      "validity",
      "validate"
    ],
    "root": {
      "form": "validus",
      "meaning": "strong or effective",
      "origin": "Latin"
    },
    "difficulty": 2,
    "baseReward": 23
  },
  {
    "id": "variable",
    "word": "variable",
    "partOfSpeech": "noun",
    "pronunciation": "VAIR-ee-uh-buhl",
    "syllables": [
      "var",
      "i",
      "a",
      "ble"
    ],
    "definition": "A factor, quantity, or condition that can change or take different values.",
    "contexts": [
      "Temperature was the variable that changed during the experiment.",
      "The analyst tracked several variables that might affect travel time.",
      "Keep every other variable constant while testing the new material."
    ],
    "incorrect": "The variable could never vary because it was fixed at one value forever.",
    "synonyms": [
      "factor",
      "changing quantity",
      "condition"
    ],
    "antonyms": [
      "constant",
      "fixed value"
    ],
    "distractors": [
      "priority",
      "tentative",
      "illustration"
    ],
    "family": [
      "variation",
      "vary"
    ],
    "root": {
      "form": "variabilis",
      "meaning": "changeable",
      "origin": "Latin"
    },
    "difficulty": 2,
    "baseReward": 23
  },
  {
    "id": "corroborate",
    "word": "corroborate",
    "partOfSpeech": "verb",
    "pronunciation": "kuh-RAH-buh-rayt",
    "syllables": [
      "cor",
      "rob",
      "o",
      "rate"
    ],
    "definition": "To strengthen or confirm a claim by providing independent supporting evidence.",
    "contexts": [
      "A second camera angle corroborated the witness account.",
      "The field test corroborated the earlier laboratory result.",
      "Independent records can corroborate a timeline without being identical sources."
    ],
    "incorrect": "The new evidence corroborated the claim by directly proving the opposite.",
    "synonyms": [
      "confirm",
      "support",
      "verify"
    ],
    "antonyms": [
      "contradict",
      "undermine"
    ],
    "distractors": [
      "discrepancy",
      "nuanced",
      "paradox"
    ],
    "family": [
      "corroboration",
      "corroborative"
    ],
    "root": {
      "form": "corroborare",
      "meaning": "to strengthen",
      "origin": "Latin"
    },
    "difficulty": 3,
    "baseReward": 26
  },
  {
    "id": "discrepancy",
    "word": "discrepancy",
    "partOfSpeech": "noun",
    "pronunciation": "dih-SKREP-un-see",
    "syllables": [
      "dis",
      "crep",
      "an",
      "cy"
    ],
    "definition": "A difference or inconsistency between things that are expected to agree.",
    "contexts": [
      "The reviewer investigated a discrepancy between the invoice and the purchase order.",
      "A measurement discrepancy appeared when the two instruments gave different readings.",
      "The timeline contained a discrepancy that required clarification."
    ],
    "incorrect": "The two totals matched exactly, creating a large discrepancy between them.",
    "synonyms": [
      "difference",
      "inconsistency",
      "mismatch"
    ],
    "antonyms": [
      "agreement",
      "match"
    ],
    "distractors": [
      "corroborate",
      "nuanced",
      "paradox"
    ],
    "family": [
      "discrepant",
      "discrepancies"
    ],
    "root": {
      "form": "discrepare",
      "meaning": "to sound differently or disagree",
      "origin": "Latin"
    },
    "difficulty": 3,
    "baseReward": 26
  },
  {
    "id": "empirical",
    "word": "empirical",
    "partOfSpeech": "adjective",
    "pronunciation": "em-PEER-ih-kuhl",
    "syllables": [
      "em",
      "pir",
      "i",
      "cal"
    ],
    "definition": "Based on observation, measurement, or experience rather than only theory or opinion.",
    "contexts": [
      "The claim was supported by empirical data from repeated field measurements.",
      "An empirical test can reveal whether the model matches observed behavior.",
      "The researchers separated empirical findings from assumptions."
    ],
    "incorrect": "The conclusion was empirical because it relied only on an unsupported opinion and no observation.",
    "synonyms": [
      "observed",
      "evidence-based",
      "measured"
    ],
    "antonyms": [
      "theoretical only",
      "speculative"
    ],
    "distractors": [
      "corroborate",
      "nuanced",
      "paradox"
    ],
    "family": [
      "empiricism",
      "empirically"
    ],
    "root": {
      "form": "empeiria",
      "meaning": "experience",
      "origin": "Greek"
    },
    "difficulty": 3,
    "baseReward": 27
  },
  {
    "id": "nuanced",
    "word": "nuanced",
    "partOfSpeech": "adjective",
    "pronunciation": "NOO-ahnst",
    "syllables": [
      "nu",
      "anced"
    ],
    "definition": "Showing careful attention to subtle differences, qualifications, or complexity.",
    "contexts": [
      "The nuanced explanation recognized both benefits and limitations.",
      "A nuanced comparison avoids treating every case as identical.",
      "Her nuanced interpretation changed when she considered the historical context."
    ],
    "incorrect": "The analysis was nuanced because it reduced every complex issue to one simplistic rule.",
    "synonyms": [
      "subtle",
      "qualified",
      "careful"
    ],
    "antonyms": [
      "simplistic",
      "absolute"
    ],
    "distractors": [
      "corroborate",
      "discrepancy",
      "paradox"
    ],
    "family": [
      "nuance",
      "nuances"
    ],
    "root": {
      "form": "nuance",
      "meaning": "shade or subtle distinction",
      "origin": "French"
    },
    "difficulty": 3,
    "baseReward": 26
  },
  {
    "id": "paradox",
    "word": "paradox",
    "partOfSpeech": "noun",
    "pronunciation": "PAIR-uh-doks",
    "syllables": [
      "par",
      "a",
      "dox"
    ],
    "definition": "A statement or situation that seems contradictory but may reveal a deeper truth or unexpected relationship.",
    "contexts": [
      "The efficiency paradox was that adding one more lane increased congestion later.",
      "The story presents a paradox: the character gains freedom by accepting a strict routine.",
      "A paradox can force readers to examine assumptions more carefully."
    ],
    "incorrect": "The statement was a paradox because it was a simple fact with no apparent contradiction.",
    "synonyms": [
      "contradiction",
      "puzzle",
      "apparent inconsistency"
    ],
    "antonyms": [
      "obvious fact",
      "straightforward statement"
    ],
    "distractors": [
      "corroborate",
      "discrepancy",
      "nuanced"
    ],
    "family": [
      "paradoxical",
      "paradoxically"
    ],
    "root": {
      "form": "paradoxon",
      "meaning": "contrary to expectation",
      "origin": "Greek"
    },
    "difficulty": 3,
    "baseReward": 27
  },
  {
    "id": "pragmatic",
    "word": "pragmatic",
    "partOfSpeech": "adjective",
    "pronunciation": "prag-MAT-ik",
    "syllables": [
      "prag",
      "mat",
      "ic"
    ],
    "definition": "Focused on practical results and what is workable in real conditions.",
    "contexts": [
      "The team chose a pragmatic repair that could be completed before winter.",
      "A pragmatic plan balances ideals with budget and time limits.",
      "Her pragmatic response solved the immediate problem while preserving future options."
    ],
    "incorrect": "The approach was pragmatic because it ignored every real-world limit and could never be carried out.",
    "synonyms": [
      "practical",
      "realistic",
      "workable"
    ],
    "antonyms": [
      "impractical",
      "idealized"
    ],
    "distractors": [
      "rigorous",
      "skeptical",
      "viable"
    ],
    "family": [
      "pragmatism",
      "pragmatically"
    ],
    "root": {
      "form": "pragma",
      "meaning": "deed or action",
      "origin": "Greek"
    },
    "difficulty": 3,
    "baseReward": 26
  },
  {
    "id": "reconcile",
    "word": "reconcile",
    "partOfSpeech": "verb",
    "pronunciation": "REK-un-syle",
    "syllables": [
      "rec",
      "on",
      "cile"
    ],
    "definition": "To bring apparently conflicting information, accounts, or positions into agreement or explain why they differ.",
    "contexts": [
      "The accountant reconciled the bank statement with the ledger.",
      "The researchers tried to reconcile two studies that reached different results.",
      "A final report should reconcile the revised measurement with the earlier record."
    ],
    "incorrect": "We reconciled the two totals by leaving the unexplained difference unresolved and pretending it did not exist.",
    "synonyms": [
      "resolve",
      "harmonize",
      "bring into agreement"
    ],
    "antonyms": [
      "conflict",
      "separate"
    ],
    "distractors": [
      "rigorous",
      "skeptical",
      "viable"
    ],
    "family": [
      "reconciliation",
      "reconciled"
    ],
    "root": {
      "form": "reconciliare",
      "meaning": "to bring together again",
      "origin": "Latin"
    },
    "difficulty": 3,
    "baseReward": 27
  },
  {
    "id": "rigorous",
    "word": "rigorous",
    "partOfSpeech": "adjective",
    "pronunciation": "RIG-er-us",
    "syllables": [
      "rig",
      "or",
      "ous"
    ],
    "definition": "Extremely careful, thorough, and demanding about methods, evidence, or standards.",
    "contexts": [
      "The study used a rigorous method with repeated measurements and clear controls.",
      "A rigorous review checks both the evidence and the reasoning.",
      "The safety test is rigorous because the consequences of failure are serious."
    ],
    "incorrect": "The process was rigorous because no one checked the work, recorded the method, or followed a standard.",
    "synonyms": [
      "thorough",
      "strict",
      "careful"
    ],
    "antonyms": [
      "sloppy",
      "lax"
    ],
    "distractors": [
      "pragmatic",
      "skeptical",
      "viable"
    ],
    "family": [
      "rigor",
      "rigorously"
    ],
    "root": {
      "form": "rigor",
      "meaning": "stiffness or strictness",
      "origin": "Latin"
    },
    "difficulty": 3,
    "baseReward": 27
  },
  {
    "id": "skeptical",
    "word": "skeptical",
    "partOfSpeech": "adjective",
    "pronunciation": "SKEP-tih-kuhl",
    "syllables": [
      "skep",
      "ti",
      "cal"
    ],
    "definition": "Not easily convinced; willing to question a claim until sufficient evidence supports it.",
    "contexts": [
      "The editor was skeptical of the dramatic claim because no source was cited.",
      "A skeptical scientist asks whether another explanation fits the data.",
      "Being skeptical does not mean refusing all evidence; it means checking it carefully."
    ],
    "incorrect": "She was skeptical because she believed every claim immediately without asking for evidence.",
    "synonyms": [
      "doubtful",
      "questioning",
      "unconvinced"
    ],
    "antonyms": [
      "gullible",
      "credulous"
    ],
    "distractors": [
      "pragmatic",
      "rigorous",
      "viable"
    ],
    "family": [
      "skepticism",
      "skeptically"
    ],
    "root": {
      "form": "skeptesthai",
      "meaning": "to examine or consider",
      "origin": "Greek"
    },
    "difficulty": 3,
    "baseReward": 27
  },
  {
    "id": "undermine",
    "word": "undermine",
    "partOfSpeech": "verb",
    "pronunciation": "un-der-MYNE",
    "syllables": [
      "un",
      "der",
      "mine"
    ],
    "definition": "To weaken, damage, or reduce the strength or credibility of something.",
    "contexts": [
      "A missing control group may undermine confidence in the conclusion.",
      "Repeated delays undermined trust in the schedule.",
      "The crack can undermine the wall if it continues to spread."
    ],
    "incorrect": "The new evidence undermined the claim by strongly confirming it from several independent sources.",
    "synonyms": [
      "weaken",
      "damage",
      "erode"
    ],
    "antonyms": [
      "strengthen",
      "reinforce"
    ],
    "distractors": [
      "pragmatic",
      "rigorous",
      "viable"
    ],
    "family": [
      "undermined",
      "undermining"
    ],
    "root": {
      "form": "under + mine",
      "meaning": "to dig beneath",
      "origin": "English"
    },
    "difficulty": 3,
    "baseReward": 26
  },
  {
    "id": "unprecedented",
    "word": "unprecedented",
    "partOfSpeech": "adjective",
    "pronunciation": "un-PRES-uh-den-tid",
    "syllables": [
      "un",
      "prec",
      "e",
      "dent",
      "ed"
    ],
    "definition": "Never known, done, or experienced before in the relevant record or context.",
    "contexts": [
      "The city recorded unprecedented rainfall during the storm.",
      "The program saw unprecedented demand after opening enrollment.",
      "Calling an event unprecedented requires a clear comparison with the available record."
    ],
    "incorrect": "The event was unprecedented because it happened every year in exactly the same way.",
    "synonyms": [
      "unexampled",
      "novel",
      "never-before-seen"
    ],
    "antonyms": [
      "common",
      "precedented"
    ],
    "distractors": [
      "pragmatic",
      "rigorous",
      "viable"
    ],
    "family": [
      "precedent",
      "unprecedentedly"
    ],
    "root": {
      "form": "praecedere",
      "meaning": "to go before",
      "origin": "Latin"
    },
    "difficulty": 3,
    "baseReward": 27
  },
  {
    "id": "viable",
    "word": "viable",
    "partOfSpeech": "adjective",
    "pronunciation": "VY-uh-buhl",
    "syllables": [
      "vi",
      "a",
      "ble"
    ],
    "definition": "Capable of working successfully or continuing under the actual conditions and constraints.",
    "contexts": [
      "The proposal is viable only if the funding and staffing can support it.",
      "Engineers tested whether the repair was viable before closing the design.",
      "A viable plan must work outside the presentation slide."
    ],
    "incorrect": "The plan was viable because it required money, equipment, and laws that could never exist.",
    "synonyms": [
      "workable",
      "feasible",
      "practical"
    ],
    "antonyms": [
      "unworkable",
      "impossible"
    ],
    "distractors": [
      "pragmatic",
      "rigorous",
      "skeptical"
    ],
    "family": [
      "viability",
      "viably"
    ],
    "root": {
      "form": "vita",
      "meaning": "life",
      "origin": "Latin"
    },
    "difficulty": 3,
    "baseReward": 27
  }
];

export const juniorHighVocabulary = juniorHighVocabularyBase.map((entry) => ({ ...entry, stage: "Junior High" }));
export const vocabulary = [...elementaryVocabulary, ...juniorHighVocabulary, ...highSchoolVocabulary];

export const vocabularyById = new Map(vocabulary.map((entry) => [entry.id, entry]));

export function getVocabularyWord(id) {
  const entry = vocabularyById.get(id);
  if (!entry) throw new Error(`Unknown vocabulary word: ${id}`);
  return entry;
}

export function getVocabularyForStage(stage = "Junior High") {
  return vocabulary.filter((entry) => entry.stage === stage);
}
