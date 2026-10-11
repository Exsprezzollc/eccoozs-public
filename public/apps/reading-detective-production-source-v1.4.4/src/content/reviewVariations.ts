import type { ContentVariationTemplate, PresentationStage } from "../domain";

export const reviewVariations: Record<string, ContentVariationTemplate> = {
  "VAR.REVIEW.CODE.CVC": {
    id: "VAR.REVIEW.CODE.CVC",
    skillId: "CODE.002",
    sourceKind: "notice",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{wordUpper}}",
    promptTemplate: "Blend every sound in {{wordSpaced}}. Which word matches the clue?",
    choices: [
      { id: "correct", labelTemplate: "{{wordLower}}" },
      { id: "vowel", labelTemplate: "{{vowelDistractor}}", misconceptionId: "CODE.001" },
      { id: "ending", labelTemplate: "{{endingDistractor}}", misconceptionId: "CODE.001" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    clueLabId: "CLUE.CODE.CVC",
    scenarios: [
      {
        id: "map-library",
        stages: ["young-investigator"],
        tokens: {
          sourceTitle: "Book Cart Label",
          wordUpper: "MAP",
          wordSpaced: "m-a-p",
          wordLower: "map",
          vowelDistractor: "mop",
          endingDistractor: "mat",
        },
      },
      {
        id: "sit-library",
        stages: ["young-investigator"],
        tokens: {
          sourceTitle: "Reading Corner Label",
          wordUpper: "SIT",
          wordSpaced: "s-i-t",
          wordLower: "sit",
          vowelDistractor: "sat",
          endingDistractor: "sip",
        },
      },
      {
        id: "bin-locker",
        stages: ["investigator"],
        tokens: {
          sourceTitle: "Equipment Bin Tag",
          wordUpper: "BIN",
          wordSpaced: "b-i-n",
          wordLower: "bin",
          vowelDistractor: "ban",
          endingDistractor: "bit",
        },
      },
      {
        id: "tag-club",
        stages: ["investigator"],
        tokens: {
          sourceTitle: "Club Storage Tag",
          wordUpper: "TAG",
          wordSpaced: "t-a-g",
          wordLower: "tag",
          vowelDistractor: "tog",
          endingDistractor: "tap",
        },
      },
      {
        id: "bin-parcel",
        stages: ["lead-investigator"],
        tokens: {
          sourceTitle: "Parcel Inventory Tag",
          wordUpper: "BIN",
          wordSpaced: "b-i-n",
          wordLower: "bin",
          vowelDistractor: "ban",
          endingDistractor: "bit",
        },
      },
      {
        id: "map-record",
        stages: ["lead-investigator"],
        tokens: {
          sourceTitle: "Facilities Record Code",
          wordUpper: "MAP",
          wordSpaced: "m-a-p",
          wordLower: "map",
          vowelDistractor: "mop",
          endingDistractor: "mat",
        },
      },
    ],
  },

  "VAR.REVIEW.COMP.EXPLICIT": {
    id: "VAR.REVIEW.COMP.EXPLICIT",
    skillId: "COMP.001",
    sourceKind: "notice",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "According to the clue, {{question}}",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      {
        id: "blue-shelf",
        stages: ["young-investigator"],
        tokens: {
          sourceTitle: "Library Note",
          body: "The storybook is on the blue shelf.",
          question: "where is the storybook?",
          correct: "On the blue shelf",
          distractor: "On the front desk",
        },
      },
      {
        id: "green-table",
        stages: ["young-investigator"],
        tokens: {
          sourceTitle: "Room Note",
          body: "The puzzle box is under the green table.",
          question: "where is the puzzle box?",
          correct: "Under the green table",
          distractor: "Beside the window",
        },
      },
      {
        id: "club-room",
        stages: ["investigator"],
        tokens: {
          sourceTitle: "Club Update",
          body: "Photography Club will meet in Room 308 on Thursday.",
          question: "where will Photography Club meet?",
          correct: "Room 308",
          distractor: "Room 214",
        },
      },
      {
        id: "practice-time",
        stages: ["investigator"],
        tokens: {
          sourceTitle: "Team Notice",
          body: "Practice begins at 4:15 PM in the east gym.",
          question: "when does practice begin?",
          correct: "4:15 PM",
          distractor: "4:45 PM",
        },
      },
      {
        id: "delivery-record",
        stages: ["lead-investigator"],
        tokens: {
          sourceTitle: "Carrier Record",
          body: "The carrier recorded delivery to reception at 1:42 PM.",
          question: "what does the record directly state?",
          correct: "Delivery was recorded to reception at 1:42 PM",
          distractor: "The package definitely remained at reception",
        },
      },
      {
        id: "policy-date",
        stages: ["lead-investigator"],
        tokens: {
          sourceTitle: "Policy Notice",
          body: "The revised attendance policy takes effect September 1.",
          question: "when does the revised policy take effect?",
          correct: "September 1",
          distractor: "Immediately when the notice is read",
        },
      },
    ],
  },

  "VAR.REVIEW.COND": {
    id: "VAR.REVIEW.COND",
    skillId: "SENT.005",
    sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "{{question}}",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}", misconceptionId: "COND.001" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    clueLabId: "CLUE.COND.IF",
    scenarios: [
      {
        id: "club-if",
        stages: ["investigator"],
        tokens: {
          sourceTitle: "Club Rule",
          body: "Students may enter the media room if a staff member is present.",
          question: "When may students enter the media room?",
          correct: "If a staff member is present",
          distractor: "At any time",
        },
      },
      {
        id: "event-unless",
        stages: ["investigator"],
        tokens: {
          sourceTitle: "Event Notice",
          body: "The outdoor event will continue unless lightning is reported nearby.",
          question: "What can stop the outdoor event from continuing?",
          correct: "A nearby lightning report",
          distractor: "Nothing; it must always continue",
        },
      },
      {
        id: "parcel-if",
        stages: ["lead-investigator"],
        tokens: {
          sourceTitle: "Delivery Policy",
          body: "Drivers may use the secure parcel room if reception is unattended.",
          question: "When may a driver use the secure parcel room?",
          correct: "If reception is unattended",
          distractor: "For every delivery",
        },
      },
      {
        id: "renewal-unless",
        stages: ["lead-investigator"],
        tokens: {
          sourceTitle: "Subscription Terms",
          body: "The plan renews monthly unless the customer cancels before the renewal date.",
          question: "What prevents the automatic monthly renewal?",
          correct: "Canceling before the renewal date",
          distractor: "Doing nothing",
        },
      },
    ],
  },

  "VAR.REVIEW.EVID.BOUNDARY": {
    id: "VAR.REVIEW.EVID.BOUNDARY",
    skillId: "EVID.004",
    sourceKind: "message",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "What does this source actually establish?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}", misconceptionId: "EVID.001" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    clueLabId: "CLUE.EVID.TEXT_ONLY",
    scenarios: [
      {
        id: "group-chat",
        stages: ["investigator"],
        tokens: {
          sourceTitle: "Group Chat",
          body: "I think the missing charger belongs to somebody from Robotics Club.",
          correct: "The writer is making a guess about ownership",
          distractor: "The message proves who owns the charger",
        },
      },
      {
        id: "witness-limits",
        stages: ["investigator"],
        tokens: {
          sourceTitle: "Witness Note",
          body: "I saw a red bike near the gym, but I did not see who left it there.",
          correct: "A red bike was seen near the gym",
          distractor: "The witness knows who left the bike",
        },
      },
      {
        id: "neighbor-guess",
        stages: ["lead-investigator"],
        tokens: {
          sourceTitle: "Neighbor Message",
          body: "I bet the delivery driver left the package at the side entrance.",
          correct: "The neighbor is guessing about the delivery location",
          distractor: "The message proves the package was at the side entrance",
        },
      },
      {
        id: "headline-claim",
        stages: ["lead-investigator"],
        tokens: {
          sourceTitle: "Comment Thread",
          body: "Everyone says the company is shutting down next week.",
          correct: "The comment reports a claim but does not prove the closure",
          distractor: "The comment confirms the company will close next week",
        },
      },
    ],
  },

  "VAR.REVIEW.LEGAL.OBLIGATION": {
    id: "VAR.REVIEW.LEGAL.OBLIGATION",
    skillId: "LEGAL.001",
    sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "Who has the stated obligation?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}", misconceptionId: "LEGAL.004" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    clueLabId: "CLUE.LEGAL.WHO_MUST",
    scenarios: [
      {
        id: "tenant-notice",
        stages: ["lead-investigator"],
        tokens: {
          sourceTitle: "Lease Clause",
          body: "The tenant must notify management in writing of a maintenance issue.",
          correct: "The tenant",
          distractor: "Management",
        },
      },
      {
        id: "employer-equipment",
        stages: ["lead-investigator"],
        tokens: {
          sourceTitle: "Safety Policy",
          body: "The employer must provide required protective equipment.",
          correct: "The employer",
          distractor: "The employee",
        },
      },
      {
        id: "customer-return",
        stages: ["lead-investigator"],
        tokens: {
          sourceTitle: "Service Agreement",
          body: "The customer must return the loaned device within 10 days after cancellation.",
          correct: "The customer",
          distractor: "The company",
        },
      },
    ],
  },
  "VAR.REVIEW.SENT.MEANING": {
    id: "VAR.REVIEW.SENT.MEANING",
    skillId: "SENT.001",
    sourceKind: "text",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "{{question}}",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      {
        id: "book-table",
        stages: ["young-investigator"],
        tokens: {
          sourceTitle: "Library Clue",
          body: "The red book is under the table.",
          question: "What does the sentence tell us about the red book?",
          correct: "It is under the table",
          distractor: "It is on the shelf",
        },
      },
      {
        id: "dog-gate",
        stages: ["young-investigator"],
        tokens: {
          sourceTitle: "Yard Clue",
          body: "The dog waits beside the gate.",
          question: "Where is the dog waiting?",
          correct: "Beside the gate",
          distractor: "Inside the house",
        },
      },
      {
        id: "club-library",
        stages: ["investigator"],
        tokens: {
          sourceTitle: "Club Message",
          body: "The debate team moved its meeting to the library.",
          question: "What changed about the debate-team meeting?",
          correct: "It moved to the library",
          distractor: "It was canceled",
        },
      },
      {
        id: "office-delay",
        stages: ["lead-investigator"],
        tokens: {
          sourceTitle: "Office Notice",
          body: "The inspection was postponed until Tuesday.",
          question: "What does the notice say happened to the inspection?",
          correct: "It was moved to Tuesday",
          distractor: "It was completed early",
        },
      },
    ],
  },

  "VAR.REVIEW.EVID.LOCATE": {
    id: "VAR.REVIEW.EVID.LOCATE",
    skillId: "EVID.001",
    sourceKind: "notice",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "Which clue best supports the conclusion: {{conclusion}}?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}", misconceptionId: "EVID.001" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    clueLabId: "CLUE.EVID.TEXT_ONLY",
    scenarios: [
      {
        id: "maps-shelf",
        stages: ["young-investigator"],
        tokens: {
          sourceTitle: "Shelf Clues",
          body: "Official shelf label: MAPS. Friend note: Maybe travel books.",
          conclusion: "the map book belongs on the MAPS shelf",
          correct: "The official shelf label says MAPS",
          distractor: "A friend guessed travel books",
        },
      },
      {
        id: "playground-open",
        stages: ["young-investigator"],
        tokens: {
          sourceTitle: "Playground Clues",
          body: "Official sign: BALL FIELD OPEN. Friend note: I think the garden opens later.",
          conclusion: "the ball field is open now",
          correct: "The official sign says BALL FIELD OPEN",
          distractor: "A friend guessed about the garden later",
        },
      },
      {
        id: "club-room",
        stages: ["investigator"],
        tokens: {
          sourceTitle: "Club Sources",
          body: "Official schedule: Robotics — Room 214. Chat: I think it moved.",
          conclusion: "Robotics is scheduled in Room 214",
          correct: "The official schedule lists Room 214",
          distractor: "Someone in chat thinks it moved",
        },
      },
      {
        id: "carrier-record",
        stages: ["lead-investigator"],
        tokens: {
          sourceTitle: "Delivery Sources",
          body: "Carrier record: Delivered to reception. Neighbor: I bet it went to the side door.",
          conclusion: "the carrier recorded delivery to reception",
          correct: "The carrier record states delivery to reception",
          distractor: "The neighbor guessed about the side door",
        },
      },
    ],
  },

  "VAR.REVIEW.SENT.CONTRAST": {
    id: "VAR.REVIEW.SENT.CONTRAST",
    skillId: "SENT.003",
    sourceKind: "notice",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "What relationship does {{connector}} signal?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      {
        id: "however-time",
        stages: ["investigator"],
        tokens: {
          sourceTitle: "Event Notice",
          body: "Doors open at 6:00. However, the program begins at 6:30.",
          connector: "‘however’",
          correct: "The second idea contrasts with the first",
          distractor: "The second idea simply repeats the first",
        },
      },
      {
        id: "although-choice",
        stages: ["investigator"],
        tokens: {
          sourceTitle: "Student Statement",
          body: "Although Maya wanted to leave, she stayed until the meeting ended.",
          connector: "‘although’",
          correct: "What Maya wanted contrasts with what she did",
          distractor: "Both parts describe the same action",
        },
      },
      {
        id: "however-policy",
        stages: ["lead-investigator"],
        tokens: {
          sourceTitle: "Policy Update",
          body: "Requests may be submitted online. However, approval is not guaranteed.",
          connector: "‘however’",
          correct: "The approval statement limits or contrasts with the permission to request",
          distractor: "Submitting a request guarantees approval",
        },
      },
    ],
  },


  "VAR.REVIEW.CODE.SHORT_VOWEL": {
    id: "VAR.REVIEW.CODE.SHORT_VOWEL",
    skillId: "CODE.003",
    sourceKind: "notice",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "Which word matches the target {{target}}?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "d1", labelTemplate: "{{d1}}", misconceptionId: "CODE.001" },
      { id: "d2", labelTemplate: "{{d2}}", misconceptionId: "CODE.001" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "elem-short-i", stages: ["young-investigator"], tokens: { sourceTitle: "Word Clue", body: "SIT / SAT / SIP", target: "word ‘sit’", correct: "SIT", d1: "SAT", d2: "SIP" } },
      { id: "jr-short-a", stages: ["investigator"], tokens: { sourceTitle: "Equipment Tags", body: "TAG / TUG / TAP", target: "word ‘tag’", correct: "TAG", d1: "TUG", d2: "TAP" } },
      { id: "lead-short-i", stages: ["lead-investigator"], tokens: { sourceTitle: "Inventory Code", body: "BIN / BAN / BIT", target: "word ‘bin’", correct: "BIN", d1: "BAN", d2: "BIT" } },
    ],
  },

  "VAR.REVIEW.COMP.SEQUENCE": {
    id: "VAR.REVIEW.COMP.SEQUENCE",
    skillId: "COMP.002",
    sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "{{question}}",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "elem-sequence", stages: ["young-investigator"], tokens: { sourceTitle: "Directions", body: "First zip the bag. Next place it on the cart.", question: "What happens before the bag goes on the cart?", correct: "Zip the bag", distractor: "Move the cart" } },
      { id: "jr-sequence", stages: ["investigator"], tokens: { sourceTitle: "Lab Steps", body: "Record the starting temperature, then heat the sample.", question: "Which step must happen first?", correct: "Record the starting temperature", distractor: "Heat the sample" } },
      { id: "lead-sequence", stages: ["lead-investigator"], tokens: { sourceTitle: "Procedure", body: "Verify identity before releasing the record.", question: "What must happen before the record is released?", correct: "Verify identity", distractor: "Release the record" } },
    ],
  },

  "VAR.REVIEW.EVID.RELEVANCE": {
    id: "VAR.REVIEW.EVID.RELEVANCE",
    skillId: "EVID.002",
    sourceKind: "message",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "Which clue is most relevant to {{question}}?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "jr-room", stages: ["investigator"], tokens: { sourceTitle: "Meeting Clues", body: "Official notice: Room 204. Comment: The snacks are good.", question: "where the meeting is", correct: "Official notice: Room 204", distractor: "The snacks are good" } },
      { id: "lead-deadline", stages: ["lead-investigator"], tokens: { sourceTitle: "Policy Clues", body: "Policy: appeal within 10 days. Comment: the form is confusing.", question: "the appeal deadline", correct: "Policy: appeal within 10 days", distractor: "The form is confusing" } },
    ],
  },

  "VAR.REVIEW.EVID.STRENGTH": {
    id: "VAR.REVIEW.EVID.STRENGTH",
    skillId: "EVID.003",
    sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "Which evidence more directly supports {{claim}}?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "jr-attendance", stages: ["investigator"], tokens: { sourceTitle: "Evidence Comparison", body: "Attendance record: 412 students present. Comment: It felt crowded.", claim: "how many students were present", correct: "The attendance record", distractor: "The comment that it felt crowded" } },
      { id: "lead-warranty", stages: ["lead-investigator"], tokens: { sourceTitle: "Evidence Comparison", body: "Warranty clause states the exclusion. Online post says warranties always replace products.", claim: "what this warranty promises", correct: "The warranty clause", distractor: "The online generalization" } },
    ],
  },

  "VAR.REVIEW.LEGAL.DEFINED_TERM": {
    id: "VAR.REVIEW.LEGAL.DEFINED_TERM",
    skillId: "LEGAL.008",
    sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "Under this document's definition, {{question}}",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "business-day", stages: ["lead-investigator"], tokens: { sourceTitle: "Defined Terms", body: "‘Business day’ means Monday through Friday excluding federal holidays.", question: "does Sunday count as a business day?", correct: "No", distractor: "Yes, because Sunday is a calendar day" } },
      { id: "written-notice", stages: ["lead-investigator"], tokens: { sourceTitle: "Lease Definition", body: "‘Written notice’ means a portal message or a letter delivered to management.", question: "does the definition automatically include a personal text message?", correct: "No, not under the listed definition", distractor: "Yes, because every typed message must count" } },
    ],
  },


  "VAR.REVIEW.CODE.DIGRAPH": {
    id: "VAR.REVIEW.CODE.DIGRAPH",
    skillId: "CODE.004",
    sourceKind: "notice",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "Which letter pair works together as one sound?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "elem-sh", stages: ["young-investigator"], tokens: { sourceTitle: "Word Clue", body: "SHIP", correct: "sh", distractor: "ip" } },
      { id: "jr-ch", stages: ["investigator"], tokens: { sourceTitle: "Label", body: "CHECK", correct: "ch", distractor: "ck" } },
      { id: "lead-th", stages: ["lead-investigator"], tokens: { sourceTitle: "Document Word", body: "THEME", correct: "th", distractor: "he" } },
    ],
  },

  "VAR.REVIEW.CODE.BLEND": {
    id: "VAR.REVIEW.CODE.BLEND",
    skillId: "CODE.005",
    sourceKind: "notice",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "Which beginning keeps both consonant sounds?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "elem-st", stages: ["young-investigator"], tokens: { sourceTitle: "Word Clue", body: "STOP", correct: "st", distractor: "to" } },
      { id: "jr-bl", stages: ["investigator"], tokens: { sourceTitle: "Word Clue", body: "BLOCK", correct: "bl", distractor: "lo" } },
      { id: "lead-tr", stages: ["lead-investigator"], tokens: { sourceTitle: "Workplace Word", body: "TRACK", correct: "tr", distractor: "ra" } },
    ],
  },

  "VAR.REVIEW.COMP.MAIN_IDEA": {
    id: "VAR.REVIEW.COMP.MAIN_IDEA",
    skillId: "COMP.003",
    sourceKind: "text",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "What is this mostly explaining?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "elem-trees", stages: ["young-investigator"], tokens: { sourceTitle: "Park Note", body: "Trees shade the benches, cool the path, and help soak up rain.", correct: "Ways trees help the park", distractor: "Only that rain falls" } },
      { id: "jr-library", stages: ["investigator"], tokens: { sourceTitle: "Library Update", body: "The library added evening hours, more study tables, and weekend tutoring.", correct: "New services and access at the library", distractor: "Only the number of tables" } },
      { id: "lead-policy", stages: ["lead-investigator"], tokens: { sourceTitle: "Policy Summary", body: "The revision adds a notice deadline, an appeal window, and a documented review process.", correct: "The revision creates a clearer review process", distractor: "Only that deadlines exist" } },
    ],
  },

  "VAR.REVIEW.COMP.DETAIL": {
    id: "VAR.REVIEW.COMP.DETAIL",
    skillId: "COMP.004",
    sourceKind: "text",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "Which detail directly supports the main idea: {{mainIdea}}?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "elem-shade", stages: ["young-investigator"], tokens: { sourceTitle: "Garden Note", body: "The trees give shade and cool the play area.", mainIdea: "the trees help the play area", correct: "The trees give shade", distractor: "The notice was printed on paper" } },
      { id: "jr-transit", stages: ["investigator"], tokens: { sourceTitle: "Transit Note", body: "The route now runs every 15 minutes and adds two evening stops.", mainIdea: "service was expanded", correct: "Two evening stops were added", distractor: "The bus is blue" } },
      { id: "lead-work", stages: ["lead-investigator"], tokens: { sourceTitle: "Workplace Summary", body: "The new system reduces duplicate entries and records each approval step.", mainIdea: "the system improves record handling", correct: "It records each approval step", distractor: "The office has three windows" } },
    ],
  },

  "VAR.REVIEW.SOURCE.CORROBORATE": {
    id: "VAR.REVIEW.SOURCE.CORROBORATE",
    skillId: "SOURCE.003",
    sourceKind: "message",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "Which conclusion is supported by agreement between the sources?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "jr-event", stages: ["investigator"], tokens: { sourceTitle: "Two Updates", body: "Office: event remains Friday. Student Council: we are setting up Friday afternoon.", correct: "Both sources support that the event is still planned for Friday", distractor: "Both sources prove the event was canceled" } },
      { id: "lead-delivery", stages: ["lead-investigator"], tokens: { sourceTitle: "Delivery Records", body: "Carrier: delivered to reception. Reception log: parcel received at 1:42 PM.", correct: "Both records support delivery to reception", distractor: "Both records support delivery to the side entrance" } },
    ],
  },

  "VAR.REVIEW.SOURCE.PURPOSE": {
    id: "VAR.REVIEW.SOURCE.PURPOSE",
    skillId: "SOURCE.002",
    sourceKind: "advertisement",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "What is this source mainly trying to do?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "jr-ad", stages: ["investigator"], tokens: { sourceTitle: "Product Ad", body: "Try FocusFast today—stay sharp longer!", correct: "Persuade someone to try the product", distractor: "Create a neutral scientific record" } },
      { id: "lead-policy", stages: ["lead-investigator"], tokens: { sourceTitle: "Safety Procedure", body: "Disconnect power before opening the equipment housing.", correct: "Instruct the reader how to act safely", distractor: "Sell the equipment" } },
    ],
  },

  "VAR.REVIEW.ARG.CLAIM": {
    id: "VAR.REVIEW.ARG.CLAIM",
    skillId: "ARG.001",
    sourceKind: "advertisement",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "Which statement is the claim the writer wants you to accept?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "jr-product", stages: ["investigator"], tokens: { sourceTitle: "Ad", body: "BrightSip helps you focus. Our can is blue.", correct: "BrightSip helps you focus", distractor: "The can is blue" } },
      { id: "lead-service", stages: ["lead-investigator"], tokens: { sourceTitle: "Service Pitch", body: "Our plan saves customers money. Enrollment opens Monday.", correct: "The plan saves customers money", distractor: "Enrollment opens Monday" } },
    ],
  },

  "VAR.REVIEW.LEGAL.PERMISSION": {
    id: "VAR.REVIEW.LEGAL.PERMISSION",
    skillId: "LEGAL.002",
    sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "What is permitted rather than required?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "lead-entry", stages: ["lead-investigator"], tokens: { sourceTitle: "Lease Clause", body: "Management may enter during reasonable hours after notice is received.", correct: "Management is permitted to enter under the stated condition", distractor: "Management is required to enter immediately" } },
      { id: "lead-request", stages: ["lead-investigator"], tokens: { sourceTitle: "Work Policy", body: "Employees may request a schedule change with seven days' notice.", correct: "Employees are permitted to request a change", distractor: "The employer must approve every request" } },
    ],
  },

  "VAR.REVIEW.LEGAL.TERMINATION": {
    id: "VAR.REVIEW.LEGAL.TERMINATION",
    skillId: "LEGAL.005",
    sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "What does the clause say can end or limit the agreement or coverage?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "lead-subscription", stages: ["lead-investigator"], tokens: { sourceTitle: "Subscription Terms", body: "The subscriber may cancel before the next renewal date.", correct: "Cancellation before the next renewal date", distractor: "The plan can never be canceled" } },
      { id: "lead-warranty", stages: ["lead-investigator"], tokens: { sourceTitle: "Warranty", body: "Coverage does not apply to misuse, except where law requires otherwise.", correct: "Misuse generally limits this coverage, subject to the stated exception", distractor: "Misuse is always covered" } },
    ],
  },


  "VAR.REVIEW.LEGAL.WAIVER": {
    id: "VAR.REVIEW.LEGAL.WAIVER",
    skillId: "LEGAL.003",
    sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "What does the waiver language specifically name?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "lead-paper", stages: ["lead-investigator"], tokens: { sourceTitle: "Notice Preference", body: "Member waives the right to mailed renewal reminders and selects email delivery.", correct: "The right to mailed renewal reminders", distractor: "Every legal right the member has" } },
      { id: "lead-ticket", stages: ["lead-investigator"], tokens: { sourceTitle: "Event Terms", body: "Attendee waives the option to receive a physical ticket and selects mobile entry.", correct: "The option to receive a physical ticket", distractor: "The right to enter the event" } },
    ],
  },

  "VAR.REVIEW.LEGAL.LIABILITY": {
    id: "VAR.REVIEW.LEGAL.LIABILITY",
    skillId: "LEGAL.004",
    sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "Which responsibility is actually stated?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "lead-keys", stages: ["lead-investigator"], tokens: { sourceTitle: "Rental Clause", body: "Renter is responsible for replacement cost for keys lost by the renter.", correct: "Replacement cost for keys the renter loses", distractor: "Every cost connected with the rental" } },
      { id: "lead-shipping", stages: ["lead-investigator"], tokens: { sourceTitle: "Return Terms", body: "Customer is responsible for return shipping for non-defective items.", correct: "Return shipping for non-defective items", distractor: "All future product costs" } },
    ],
  },

  "VAR.REVIEW.LEGAL.ARBITRATION": {
    id: "VAR.REVIEW.LEGAL.ARBITRATION",
    skillId: "LEGAL.006",
    sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "What dispute process does the clause state?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "lead-review", stages: ["lead-investigator"], tokens: { sourceTitle: "Dispute Terms", body: "Billing disputes shall be resolved by arbitration after internal review, unless a timely opt-out applies.", correct: "Arbitration after internal review, subject to the stated opt-out exception", distractor: "A court trial is guaranteed with no conditions" } },
      { id: "lead-small-claims", stages: ["lead-investigator"], tokens: { sourceTitle: "Dispute Clause", body: "Covered disputes must be arbitrated, except eligible individual small-claims matters.", correct: "Arbitration is the stated general rule with a small-claims exception", distractor: "Every matter must be arbitrated with no exception" } },
    ],
  },

  "VAR.REVIEW.LEGAL.GOVERNING": {
    id: "VAR.REVIEW.LEGAL.GOVERNING",
    skillId: "LEGAL.007",
    sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "What function does the governing-law language perform?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "lead-state", stages: ["lead-investigator"], tokens: { sourceTitle: "Governing Law", body: "These terms are governed by the laws of State K, except where applicable consumer law requires otherwise.", correct: "It states a general governing-law rule and an express exception", distractor: "It sets the monthly subscription price" } },
      { id: "lead-forum", stages: ["lead-investigator"], tokens: { sourceTitle: "Court Proceedings", body: "Permitted court proceedings must be filed in County L, State K.", correct: "It identifies a stated filing location for permitted court proceedings", distractor: "It defines the customer's mailing address" } },
    ],
  },


  "VAR.REVIEW.SOURCE.PERSPECTIVE": {
    id: "VAR.REVIEW.SOURCE.PERSPECTIVE",
    skillId: "SOURCE.004",
    sourceKind: "text",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "What is the strongest source-reading move?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "jr-organizer", stages: ["investigator"], tokens: { sourceTitle: "Organizer Statement", body: "The organizer says the event was a major success.", correct: "Note the organizer's role and check specific claims against other evidence", distractor: "Assume the entire statement is false because the organizer was involved" } },
      { id: "lead-vendor", stages: ["lead-investigator"], tokens: { sourceTitle: "Vendor Report", body: "The vendor says its own service exceeded expectations.", correct: "Treat the vendor's interest as context and evaluate the specific performance evidence", distractor: "Treat every vendor statement as automatically false" } },
    ],
  },

  "VAR.REVIEW.SOURCE.UTILITY": {
    id: "VAR.REVIEW.SOURCE.UTILITY",
    skillId: "SOURCE.005",
    sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "Which source is most direct for this question: {{question}}?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "jr-schedule", stages: ["investigator"], tokens: { sourceTitle: "Source Lens", body: "Sources include an official schedule and a student rumor.", question: "What time does the program officially begin", correct: "The official schedule", distractor: "The student rumor" } },
      { id: "lead-inspection", stages: ["lead-investigator"], tokens: { sourceTitle: "Source Lens", body: "Sources include an inspection report and a company advertisement.", question: "What did inspectors find", correct: "The inspection report", distractor: "The company advertisement" } },
    ],
  },

  "VAR.REVIEW.ARG.MATCH": {
    id: "VAR.REVIEW.ARG.MATCH",
    skillId: "ARG.003",
    sourceKind: "text",
    sourceTitleTemplate: "{{sourceTitle}}",
    sourceBodyTemplate: "{{body}}",
    promptTemplate: "Which evidence best supports the stated claim?",
    choices: [
      { id: "correct", labelTemplate: "{{correct}}" },
      { id: "distractor", labelTemplate: "{{distractor}}" },
    ],
    correctChoiceIds: ["correct"],
    shuffleChoices: true,
    scenarios: [
      { id: "jr-bus", stages: ["investigator"], tokens: { sourceTitle: "Argument Check", body: "Claim: the late bus is needed because club students lack rides home.", correct: "A survey showing many club students have no ride after meetings", distractor: "The school mascot won an award" } },
      { id: "lead-speed", stages: ["lead-investigator"], tokens: { sourceTitle: "Argument Check", body: "Claim: the new process is faster.", correct: "Benchmark records comparing completion time before and after the change", distractor: "A redesigned company logo" } },
    ],
  },


  "VAR.REVIEW.MEDIA.HEADLINE": {
    id: "VAR.REVIEW.MEDIA.HEADLINE", skillId: "MEDIA.001", sourceKind: "text",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "Which reading best compares the headline with the source?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [{ id: "lead-headline", stages: ["lead-investigator"], tokens: { sourceTitle: "Headline Check", body: "Headline: DEVICE SOLVES DISTRACTION. Source: a small pilot found a modest improvement on one attention task.", correct: "The headline is stronger and broader than the source", distractor: "The headline is a precise restatement" } }, { id: "lead-headline-health", stages: ["lead-investigator"], tokens: { sourceTitle: "Health Headline Check", body: "Headline: ROUTINE ENDS FATIGUE. Source: participants reported a small average change over two weeks.", correct: "The headline overstates a narrow short-term finding", distractor: "The source proves fatigue ended for everyone" } }],
  },
  "VAR.REVIEW.RESEARCH.CAUSATION": {
    id: "VAR.REVIEW.RESEARCH.CAUSATION", skillId: "RESEARCH.002", sourceKind: "text",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "What relationship does this evidence support?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [{ id: "lead-correlation", stages: ["lead-investigator"], tokens: { sourceTitle: "Study Summary", body: "An observational survey found that people who commute longer also report more stress.", correct: "An association between commute length and reported stress", distractor: "Proof that longer commutes cause all stress" } }, { id: "lead-correlation-exercise", stages: ["lead-investigator"], tokens: { sourceTitle: "Research Note", body: "People who exercised more also reported better sleep in an observational study.", correct: "Exercise and reported sleep were associated in the observed data", distractor: "The study proves exercise caused better sleep for everyone" } }],
  },
  "VAR.REVIEW.RESEARCH.SAMPLE": {
    id: "VAR.REVIEW.RESEARCH.SAMPLE", skillId: "RESEARCH.003", sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "Which conclusion respects the sample?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [{ id: "lead-sample", stages: ["lead-investigator"], tokens: { sourceTitle: "Survey Note", body: "Fifty volunteers from one training center tested the tool.", correct: "The result directly describes the tested volunteers and should not be generalized automatically to everyone", distractor: "The result proves the same outcome for every worker everywhere" } }, { id: "lead-sample-campus", stages: ["lead-investigator"], tokens: { sourceTitle: "Campus Poll", body: "A poll surveyed 200 students from one college residence hall.", correct: "The result directly describes the surveyed sample and needs caution before broader generalization", distractor: "The poll proves all college students agree" } }],
  },
  "VAR.REVIEW.RESEARCH.INTEREST": {
    id: "VAR.REVIEW.RESEARCH.INTEREST", skillId: "RESEARCH.004", sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "How should the funding relationship affect your reading?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [{ id: "lead-interest", stages: ["lead-investigator"], tokens: { sourceTitle: "Research Disclosure", body: "The maker of the tested product funded the study.", correct: "Treat the funding as relevant context, inspect methods, and seek independent evidence", distractor: "Assume the study is automatically false" } }, { id: "lead-interest-advocacy", stages: ["lead-investigator"], tokens: { sourceTitle: "Funding Note", body: "An advocacy organization commissioned the report supporting its policy position.", correct: "Note the organization’s interest and inspect methods, sources, and independent corroboration", distractor: "Assume every cited fact is false because the group advocates" } }],
  },
  "VAR.REVIEW.MEDIA.CONTEXT": {
    id: "VAR.REVIEW.MEDIA.CONTEXT", skillId: "MEDIA.003", sourceKind: "image",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "What should you verify before accepting the conclusion?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [{ id: "lead-crop", stages: ["lead-investigator"], tokens: { sourceTitle: "Cropped Screenshot", body: "A screenshot shows only the words ‘approved today’ with no date, account name, or surrounding text.", correct: "Find the original source, date, and surrounding context", distractor: "Accept the conclusion because the screenshot looks authentic" } }, { id: "lead-clip", stages: ["lead-investigator"], tokens: { sourceTitle: "Short Video Clip", body: "The clip begins after an argument starts and ends before anyone responds.", correct: "Find the longer original recording and timeline before concluding what caused the argument", distractor: "The short clip proves the entire event" } }],
  },
  "VAR.REVIEW.DATA.RELATIVE": {
    id: "VAR.REVIEW.DATA.RELATIVE", skillId: "DATA.001", sourceKind: "chart",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "Which reading gives both relative and absolute change?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [{ id: "lead-percent", stages: ["lead-investigator"], tokens: { sourceTitle: "Risk Table", body: "Estimated risk changes from 1 in 5,000 to 2 in 5,000.", correct: "The relative risk doubled, while the absolute change is 1 additional case per 5,000", distractor: "The risk became 100%" } }, { id: "lead-percent-sales", stages: ["lead-investigator"], tokens: { sourceTitle: "Sales Table", body: "Weekly sales changed from 20 units to 30 units.", correct: "Sales rose by 10 units, a 50% relative increase from the baseline", distractor: "Sales rose by 50 units" } }],
  },
  "VAR.REVIEW.DATA.GRAPH": {
    id: "VAR.REVIEW.DATA.GRAPH", skillId: "DATA.002", sourceKind: "chart",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "What should you notice about the graph scale?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [{ id: "lead-axis", stages: ["lead-investigator"], tokens: { sourceTitle: "Performance Graph", body: "Values rise from 98 to 100; the y-axis begins at 97.", correct: "The increase is real, but the narrow axis can make it look visually dramatic", distractor: "A nonzero axis proves the data are fake" } }, { id: "lead-axis-cost", stages: ["lead-investigator"], tokens: { sourceTitle: "Cost Graph", body: "Costs change from 995 to 1000; the y-axis runs from 990 to 1002.", correct: "Read the 5-unit change directly and note that the narrow axis amplifies the visual slope", distractor: "The graph proves costs doubled" } }],
  },
  "VAR.REVIEW.DATA.CONSISTENCY": {
    id: "VAR.REVIEW.DATA.CONSISTENCY", skillId: "DATA.003", sourceKind: "chart",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "Does the written claim match the data?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [{ id: "lead-chart-text", stages: ["lead-investigator"], tokens: { sourceTitle: "Quarterly Table", body: "Claim: sales increased every quarter. Values: 100, 103, 101, 105.", correct: "No; one quarter decreased from 103 to 101", distractor: "Yes; every quarter increased" } }, { id: "lead-chart-text-regions", stages: ["lead-investigator"], tokens: { sourceTitle: "Regional Table", body: "Claim: every region improved. Values: North +4, South -1, West +2.", correct: "No; South declined even though the other regions improved", distractor: "Yes; every region improved" } }],
  },
  "VAR.REVIEW.ARG.ASSUMPTION": {
    id: "VAR.REVIEW.ARG.ASSUMPTION", skillId: "ARG.004", sourceKind: "text",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "What assumption does this argument need?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [{ id: "lead-assume", stages: ["lead-investigator"], tokens: { sourceTitle: "Proposal", body: "This tool is better because more people downloaded it.", correct: "Download count reliably indicates quality for the decision in question", distractor: "The tool can be downloaded" } }, { id: "lead-assume-supervision", stages: ["lead-investigator"], tokens: { sourceTitle: "Workplace Argument", body: "Remote staff are less productive because managers cannot see them in person.", correct: "In-person observation is necessary for productivity", distractor: "Managers have eyes" } }],
  },
  "VAR.REVIEW.ARG.COUNTER": {
    id: "VAR.REVIEW.ARG.COUNTER", skillId: "ARG.005", sourceKind: "text",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "Which response actually answers the counterclaim?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [{ id: "lead-counter", stages: ["lead-investigator"], tokens: { sourceTitle: "Debate Note", body: "Counterclaim: the plan exceeds the budget.", correct: "Provide a cost analysis and funding source that addresses the budget concern", distractor: "Say critics dislike change" } }, { id: "lead-counter-safety", stages: ["lead-investigator"], tokens: { sourceTitle: "Safety Debate", body: "Counterclaim: the device may fail below freezing.", correct: "Provide cold-weather test evidence or acknowledge the limitation", distractor: "Say the device has a modern design" } }],
  },
  "VAR.REVIEW.ARG.FLAW": {
    id: "VAR.REVIEW.ARG.FLAW", skillId: "ARG.006", sourceKind: "text",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "What is wrong with the reasoning?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [{ id: "lead-flaw", stages: ["lead-investigator"], tokens: { sourceTitle: "Comment", body: "Either you agree with this proposal or you do not care about safety.", correct: "The statement unfairly limits the possible positions to two", distractor: "The statement proves only two positions exist" } }, { id: "lead-flaw-generalize", stages: ["lead-investigator"], tokens: { sourceTitle: "Review Thread", body: "Two people complained, so this company always gives terrible service.", correct: "Two examples are too little evidence for an ‘always’ conclusion about all service", distractor: "Two complaints prove every customer experience" } }],
  },
  "VAR.REVIEW.DECISION.CRITERIA": {
    id: "VAR.REVIEW.DECISION.CRITERIA", skillId: "DECISION.001", sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "Which evidence is most relevant to the stated decision goal?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [{ id: "lead-criteria", stages: ["lead-investigator"], tokens: { sourceTitle: "Decision Brief", body: "Goal: choose the plan with predictable monthly cost and enough data for remote work.", correct: "Monthly price, fees, and data allowance", distractor: "Advertisement color" } }, { id: "lead-criteria-job", stages: ["lead-investigator"], tokens: { sourceTitle: "Job Decision", body: "Goal: choose a job that fits evening classes and provides at least 25 hours weekly.", correct: "Required schedule and guaranteed weekly hours", distractor: "Office wall color" } }],
  },
  "VAR.REVIEW.DECISION.WEIGH": {
    id: "VAR.REVIEW.DECISION.WEIGH", skillId: "DECISION.002", sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "Which response is evidence-weighted?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [{ id: "lead-weigh", stages: ["lead-investigator"], tokens: { sourceTitle: "Option Comparison", body: "Option A costs less; Option B meets the required recovery-time target.", correct: "Choose using the stated recovery requirement, cite the specifications, and acknowledge cost", distractor: "Choose the cheapest option without checking the requirement" } }, { id: "lead-weigh-commute", stages: ["lead-investigator"], tokens: { sourceTitle: "Offer Comparison", body: "Offer A pays more per hour; Offer B has more guaranteed hours and a shorter commute.", correct: "Use the learner’s stated priorities, cite the offer terms, and acknowledge the tradeoff", distractor: "Pick the higher hourly number and ignore every other criterion" } }],
  },
  "VAR.REVIEW.DECISION.CONFIDENCE": {
    id: "VAR.REVIEW.DECISION.CONFIDENCE", skillId: "DECISION.003", sourceKind: "message",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "What confidence level fits the evidence?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [{ id: "lead-confidence", stages: ["lead-investigator"], tokens: { sourceTitle: "Case Packet", body: "A rumor says the store will close; no official notice or independent confirmation is included.", correct: "Uncertain / insufficient evidence for a confirmed closure", distractor: "Confirmed closure" } }, { id: "lead-confidence-witness", stages: ["lead-investigator"], tokens: { sourceTitle: "Incident Packet", body: "Two witnesses agree on the time but neither saw who opened the door.", correct: "The time is strongly supported, but who opened the door remains unknown", distractor: "Every detail of the incident is confirmed" } }],
  },
  "VAR.REVIEW.DECISION.ALTERNATE": {
    id: "VAR.REVIEW.DECISION.ALTERNATE", skillId: "DECISION.004", sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "Can different conclusions both be defensible here?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [{ id: "lead-alternate", stages: ["lead-investigator"], tokens: { sourceTitle: "Tradeoff Case", body: "Option A is cheaper; Option B has a much shorter commute.", correct: "Yes, if the reader states the priority, cites the evidence, and acknowledges the tradeoff", distractor: "No, one option must be universally correct" } }, { id: "lead-alternate-service", stages: ["lead-investigator"], tokens: { sourceTitle: "Service Decision", body: "Plan A has lower fees; Plan B includes broader coverage.", correct: "Different priorities can support different defensible choices when evidence and tradeoffs are explicit", distractor: "One plan must be best for every person" } }],
  },

  "VAR.REVIEW.CODE.HIGH_FREQUENCY": {
    id: "VAR.REVIEW.CODE.HIGH_FREQUENCY", skillId: "CODE.010", sourceKind: "notice",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "Which strategy keeps the word connected to print and sound?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [
      { id: "young-said", stages: ["young-investigator"], tokens: { sourceTitle: "Word Clue", body: "said", correct: "Map the familiar sounds and remember the unusual middle spelling", distractor: "Memorize only the word shape" } },
      { id: "jr-was", stages: ["investigator"], tokens: { sourceTitle: "Message Word", body: "was", correct: "Keep the whole spelling and explicitly learn the word-specific pronunciation", distractor: "Guess from the first letter" } },
      { id: "lead-does", stages: ["lead-investigator"], tokens: { sourceTitle: "Field Note Word", body: "does", correct: "Map the spelling to the spoken word and remember the unusual vowel pronunciation", distractor: "Skip the printed word and infer from context" } },
    ],
  },
  "VAR.REVIEW.SENT.PUNCTUATION": {
    id: "VAR.REVIEW.SENT.PUNCTUATION", skillId: "SENT.006", sourceKind: "message",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "What does the punctuation tell the reader?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [
      { id: "young-question", stages: ["young-investigator"], tokens: { sourceTitle: "Message", body: "You found it?", correct: "The writer is asking a question", distractor: "The writer is making a plain statement" } },
      { id: "jr-quote", stages: ["investigator"], tokens: { sourceTitle: "Witness Note", body: "Asha said, “Meet me at the desk.”", correct: "Quotation marks identify the exact spoken words", distractor: "Quotation marks make the words optional" } },
      { id: "lead-comma", stages: ["lead-investigator"], tokens: { sourceTitle: "Procedure", body: "Before activating the account, verify approval.", correct: "The comma separates the prerequisite phrase from the action", distractor: "The comma means approval is optional" } },
    ],
  },
  "VAR.REVIEW.FLUENCY.PHRASE": {
    id: "VAR.REVIEW.FLUENCY.PHRASE", skillId: "FLUENCY.001", sourceKind: "text",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "Which phrasing best preserves meaning?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [
      { id: "young-phrase", stages: ["young-investigator"], tokens: { sourceTitle: "Story Line", body: "The small dog ran home.", correct: "The small dog / ran home.", distractor: "The / small / dog / ran / home." } },
      { id: "jr-phrase", stages: ["investigator"], tokens: { sourceTitle: "School Rule", body: "When the bell rings, students may enter.", correct: "When the bell rings, / students may enter.", distractor: "When / the bell / rings students / may enter." } },
      { id: "lead-phrase", stages: ["lead-investigator"], tokens: { sourceTitle: "Policy", body: "After approval is recorded, the account may be activated.", correct: "After approval is recorded, / the account may be activated.", distractor: "Read the line as fast as possible without phrasing" } },
    ],
  },
  "VAR.REVIEW.LIT.THEME": {
    id: "VAR.REVIEW.LIT.THEME", skillId: "LIT.003", sourceKind: "text",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "Which answer is a supportable theme rather than only a topic?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [
      { id: "jr-theme", stages: ["investigator"], tokens: { sourceTitle: "Story Pattern", body: "A character repeatedly avoids telling the truth, loses trust, then rebuilds the relationship by accepting responsibility.", correct: "Trust can begin to recover when dishonesty is replaced by responsibility and honesty", distractor: "Honesty" } },
      { id: "lead-theme", stages: ["lead-investigator"], tokens: { sourceTitle: "Literary Pattern", body: "A protagonist rejects help to appear independent, then succeeds only after accepting another person's expertise.", correct: "Independence does not require refusing useful help", distractor: "Help" } },
    ],
  },
  "VAR.REVIEW.PROC.PREREQ": {
    id: "VAR.REVIEW.PROC.PREREQ", skillId: "PROC.002", sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "What prerequisite controls the later action?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [
      { id: "jr-procedure", stages: ["investigator"], tokens: { sourceTitle: "Lab Procedure", body: "Record the starting temperature before heating the sample.", correct: "Record the starting temperature before heating", distractor: "Heat first and estimate the starting temperature later" } },
      { id: "lead-procedure", stages: ["lead-investigator"], tokens: { sourceTitle: "Shutdown Procedure", body: "Verify zero energy before removing the access guard.", correct: "Zero-energy verification must occur before guard removal", distractor: "Guard removal can happen first" } },
    ],
  },
  "VAR.REVIEW.FORM.CERTIFY": {
    id: "VAR.REVIEW.FORM.CERTIFY", skillId: "FORM.002", sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "What does the signature statement actually affirm?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [
      { id: "lead-certify", stages: ["lead-investigator"], tokens: { sourceTitle: "Application Certification", body: "By signing, I certify that the information in this application is accurate to the best of my knowledge.", correct: "The signer affirms the stated accuracy certification", distractor: "The signer agrees to every future policy not named here" } },
      { id: "lead-ack", stages: ["lead-investigator"], tokens: { sourceTitle: "Receipt Acknowledgement", body: "I acknowledge receipt of the safety handbook.", correct: "The signer acknowledges receiving the handbook", distractor: "The signer authorizes unlimited payroll deductions" } },
    ],
  },
  "VAR.REVIEW.CIVIC.NOTICE": {
    id: "VAR.REVIEW.CIVIC.NOTICE", skillId: "CIVIC.001", sourceKind: "notice",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "Which reading correctly identifies who must act and by when?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [
      { id: "lead-civic", stages: ["lead-investigator"], tokens: { sourceTitle: "Public Notice", body: "Residents appealing a denied permit must submit Form A-2 by October 4.", correct: "Residents appealing a denied permit must submit Form A-2 by October 4", distractor: "Every resident must submit Form A-2" } },
      { id: "lead-school", stages: ["lead-investigator"], tokens: { sourceTitle: "District Notice", body: "Families requesting a transportation change must file Route Form B by August 1.", correct: "Only families requesting a transportation change have the stated filing requirement", distractor: "Every family has the same filing requirement" } },
    ],
  },

  "VAR.REVIEW.LIT.MOTIVE": {
    id: "VAR.REVIEW.LIT.MOTIVE", skillId: "LIT.001", sourceKind: "text",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "Which conclusion matches the strength of the evidence?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [
      { id: "jr-motive", stages: ["investigator"], tokens: { sourceTitle: "Story Clue", body: "A student checks the doorway repeatedly and relaxes when her sister arrives.", correct: "She may have been waiting or worried about her sister; the behavior supports that inference", distractor: "The text explicitly states her exact private motive" } },
      { id: "lead-motive", stages: ["lead-investigator"], tokens: { sourceTitle: "Narrative Extract", body: "The manager rereads the resignation email twice and closes the office door before answering.", correct: "The behavior may signal concern or caution, but the exact motive remains inferred", distractor: "The text proves the manager is furious" } },
    ],
  },
  "VAR.REVIEW.LIT.POV": {
    id: "VAR.REVIEW.LIT.POV", skillId: "LIT.002", sourceKind: "text",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "What can this narrator know directly?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [
      { id: "jr-pov", stages: ["investigator"], tokens: { sourceTitle: "First-Person Scene", body: "I saw the envelope, but I did not know who had left it.", correct: "The narrator can report seeing the envelope but not the unknown sender", distractor: "The narrator knows every hidden fact" } },
      { id: "lead-pov", stages: ["lead-investigator"], tokens: { sourceTitle: "Witness Narrative", body: "From the balcony I saw the door open, but I could not hear the conversation below.", correct: "The narrator has visual evidence about the door but limited evidence about what was said", distractor: "The narrator knows the full conversation" } },
    ],
  },
  "VAR.REVIEW.LIT.TONE": {
    id: "VAR.REVIEW.LIT.TONE", skillId: "LIT.004", sourceKind: "text",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "Which wording creates the tone?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [
      { id: "jr-tone", stages: ["investigator"], tokens: { sourceTitle: "Narration", body: "He finally admitted the obvious mistake.", correct: "finally and obvious add an impatient or critical attitude", distractor: "the words are completely neutral" } },
      { id: "lead-tone", stages: ["lead-investigator"], tokens: { sourceTitle: "Commentary", body: "Another brilliant decision from management.", correct: "another and brilliant can signal sarcasm in context", distractor: "the sentence can only be neutral praise" } },
    ],
  },
  "VAR.REVIEW.LIT.NARRATOR": {
    id: "VAR.REVIEW.LIT.NARRATOR", skillId: "LIT.005", sourceKind: "text",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "How should the narrator's claim be calibrated?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [
      { id: "lead-narrator", stages: ["lead-investigator"], tokens: { sourceTitle: "Narrator + Record", body: "Narrator: nobody entered after I left. Record: badge entry at 8:14 PM.", correct: "Recheck the nobody-entered claim against the record without declaring every narration detail false", distractor: "Ignore the record or reject every narrator statement automatically" } },
      { id: "lead-narrator-knowledge", stages: ["lead-investigator"], tokens: { sourceTitle: "Narrative", body: "I knew she refused because she was jealous, though she never told me why.", correct: "The narrator presents an inferred motive as certainty", distractor: "The narrator has direct access to another person's private thoughts" } },
    ],
  },
  "VAR.REVIEW.LIT.AMBIGUITY": {
    id: "VAR.REVIEW.LIT.AMBIGUITY", skillId: "LIT.006", sourceKind: "text",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "Which interpretation is evidence-based without pretending the text has only one possible meaning?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [
      { id: "lead-symbol", stages: ["lead-investigator"], tokens: { sourceTitle: "Recurring Image", body: "A broken clock appears in several scenes about regret and missed chances.", correct: "The clock may symbolize lost time or regret; repeated scenes can support that reading while alternatives remain possible", distractor: "The clock has one guaranteed symbolic meaning even without textual evidence" } },
      { id: "lead-ending", stages: ["lead-investigator"], tokens: { sourceTitle: "Ambiguous Ending", body: "The character smiles while holding an unopened letter; the contents are never shown.", correct: "Several interpretations remain possible and should be tested against earlier evidence", distractor: "The reader can know the exact letter contents without evidence" } },
    ],
  },
  "VAR.REVIEW.PROC.STRENGTH": {
    id: "VAR.REVIEW.PROC.STRENGTH", skillId: "PROC.001", sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "How strong is this instruction?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [
      { id: "jr-strength", stages: ["investigator"], tokens: { sourceTitle: "Equipment Guide", body: "A carrying cart is optional. Disconnect power before opening the panel.", correct: "The cart is optional; disconnecting power is required before opening", distractor: "Both actions are equally optional" } },
      { id: "lead-strength", stages: ["lead-investigator"], tokens: { sourceTitle: "Safety Procedure", body: "Do not remove the guard until isolation is complete. A second technician is recommended.", correct: "Guard removal is prohibited before isolation; the second technician is a recommendation", distractor: "The recommendation and prohibition have the same force" } },
    ],
  },
  "VAR.REVIEW.FORM.FIELDS": {
    id: "VAR.REVIEW.FORM.FIELDS", skillId: "FORM.001", sourceKind: "document",
    sourceTitleTemplate: "{{sourceTitle}}", sourceBodyTemplate: "{{body}}", promptTemplate: "Which field can remain blank under the stated rules?",
    choices: [{ id: "correct", labelTemplate: "{{correct}}" }, { id: "distractor", labelTemplate: "{{distractor}}" }], correctChoiceIds: ["correct"], shuffleChoices: true,
    scenarios: [
      { id: "lead-fields", stages: ["lead-investigator"], tokens: { sourceTitle: "Application", body: "Name* | Email* | Middle Name (optional)", correct: "Middle Name may remain blank", distractor: "Email may remain blank because it appears second" } },
      { id: "lead-conditional-field", stages: ["lead-investigator"], tokens: { sourceTitle: "Registration Form", body: "Employer Name — complete only if Currently Employed is Yes.", correct: "Employer Name is conditional on the employment answer", distractor: "Employer Name is required for every applicant" } },
    ],
  },

};

export function reviewVariationTemplateFor(
  skillId: string,
  stage: PresentationStage,
): ContentVariationTemplate | undefined {
  return Object.values(reviewVariations).find(
    (template) =>
      template.skillId === skillId &&
      template.scenarios.some((scenario) => scenario.stages.includes(stage)),
  );
}
