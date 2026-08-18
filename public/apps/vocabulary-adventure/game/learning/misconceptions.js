const lessons = {
  "stationary-stationery": {
    id: "stationary-stationery",
    category: "Homophones",
    title: "These words sound alike, but they do different jobs.",
    strategy: "Decide whether the sentence is about staying still or writing materials before you choose the spelling.",
    memoryCue: "stationEry has an E, like Envelope.",
    terms: [
      { word: "stationary", job: "adjective", meaning: "not moving; staying in one place", example: "The bicycle remained stationary beside the gate." },
      { word: "stationery", job: "noun", meaning: "paper, envelopes, and writing materials", example: "She chose blue stationery for the handwritten note." }
    ],
    teachingNote: "The sound does not settle this pair. Meaning does: stationary describes something that is still; stationery names writing materials.",
    retryCue: "On the retry, name the job first: stillness or writing materials?",
    audioWords: ["stationary", "stationery"]
  },
  "affect-effect": {
    id: "affect-effect",
    category: "Commonly confused jobs",
    title: "One usually names an action; the other usually names a result.",
    strategy: "Ask: Is something influencing something else, or am I naming the result that followed?",
    memoryCue: "Affect is usually the Action. Effect is usually the End result.",
    terms: [
      { word: "affect", job: "usually a verb", meaning: "to influence or cause a change in something", example: "Heavy shade can affect how quickly the pavement dries." },
      { word: "effect", job: "usually a noun", meaning: "a result or consequence of a change", example: "One effect of the trees was a cooler walkway." }
    ],
    teachingNote: "In most Junior High contexts, affect is the action of influencing and effect is the result. English has advanced exceptions, but this distinction handles the common use precisely.",
    retryCue: "Find the action or the result before looking at the spelling.",
    audioWords: ["affect", "effect"]
  },
  "accept-except": {
    id: "accept-except",
    category: "Near-homophones",
    title: "Receiving something is different from leaving something out.",
    strategy: "Ask whether the sentence means receive/agree, or whether it introduces an exclusion.",
    memoryCue: "Accept = take in. Except = leave out.",
    terms: [
      { word: "accept", job: "verb", meaning: "to receive, agree to, or say yes to something", example: "The committee will accept the revised proposal." },
      { word: "except", job: "preposition or conjunction", meaning: "not including; leaving one thing out", example: "Every path is open except the one under repair." }
    ],
    teachingNote: "Accept is an action. Except marks an exclusion. They can sound similar in quick speech, so the sentence job matters more than the sound.",
    retryCue: "Say the sentence with “receive” or “not including.” Which meaning fits?",
    audioWords: ["accept", "except"]
  },
  "principal-principle": {
    id: "principal-principle",
    category: "Homophones",
    title: "A person or main thing is not the same as a guiding rule.",
    strategy: "Ask whether the sentence names a person/main item or an idea/rule that guides decisions.",
    memoryCue: "The principal can be your pal; a principle is a rule or belief.",
    terms: [
      { word: "principal", job: "noun or adjective", meaning: "a person in charge, or the main/most important thing", example: "The principal reason for the redesign was pedestrian safety." },
      { word: "principle", job: "noun", meaning: "a rule, belief, or basic idea that guides decisions", example: "Accessibility is a guiding principle of the design." }
    ],
    teachingNote: "Principal can name a leader or mean main. Principle names a rule, belief, or foundational idea.",
    retryCue: "Is this about who/what is main, or about a rule that guides thinking?",
    audioWords: ["principal", "principle"]
  },
  "complement-compliment": {
    id: "complement-compliment",
    category: "Near-homophones",
    title: "Completing a whole is different from giving praise.",
    strategy: "Ask whether two things work well together or whether someone is saying something positive.",
    memoryCue: "Complement completes. Compliment praises.",
    terms: [
      { word: "complement", job: "noun or verb", meaning: "something that completes, balances, or works well with another thing", example: "Native flowers complement the stone walkway." },
      { word: "compliment", job: "noun or verb", meaning: "a polite expression of praise or admiration", example: "The visitor gave the team a compliment on the clear signage." }
    ],
    teachingNote: "Complement is about fit or completion. Compliment is about praise. The meanings, not the similar sound, decide the word.",
    retryCue: "Would “complete/work well with” fit, or would “praise” fit?",
    audioWords: ["complement", "compliment"]
  },
  "cite-site-sight": {
    id: "cite-site-sight",
    category: "Three-way homophones",
    title: "The same sound can point to evidence, a place, or vision.",
    strategy: "Classify the sentence first: source/evidence, location, or seeing.",
    memoryCue: "Cite = source. Site = place. Sight = seeing.",
    terms: [
      { word: "cite", job: "verb", meaning: "to name a source or evidence that supports a claim", example: "The report should cite the survey that supplied the data." },
      { word: "site", job: "noun", meaning: "a place or location where something exists or happens", example: "The team inspected the construction site before the meeting." },
      { word: "sight", job: "noun", meaning: "the ability to see, or something that is seen", example: "The restored garden was an impressive sight at sunset." }
    ],
    teachingNote: "Because all three sound alike, listening alone cannot solve the choice. The sentence must tell you whether it needs evidence, a location, or seeing.",
    retryCue: "Label the blank: evidence, place, or seeing. Then choose the spelling.",
    audioWords: ["cite", "site", "sight"]
  }
};

export const misconceptionLessons = Object.freeze(lessons);

function normalize(value) {
  return String(value || "").trim().toLowerCase().replace(/^[^a-z0-9]+|[^a-z0-9]+$/gi, "");
}

export function getMisconceptionLesson(entryOrId) {
  const id = typeof entryOrId === "string" ? entryOrId : entryOrId?.misconception?.id;
  return id ? misconceptionLessons[id] || null : null;
}

export function getConfusedWords(entry) {
  const raw = entry?.misconception?.confusedWith;
  if (!raw) return [];
  return (Array.isArray(raw) ? raw : [raw]).map(normalize).filter(Boolean);
}

function targetedPairDiagnosis(entry, challenge, response) {
  const lesson = getMisconceptionLesson(entry);
  if (!lesson) return null;
  const normalized = normalize(response);
  const confusedWords = new Set(getConfusedWords(entry));
  const selectedKnownTrap = (challenge?.misconceptionAnswers || []).some((answer) => normalize(answer) === normalized);
  const selectedConfusedWord = confusedWords.has(normalized);
  if (!selectedKnownTrap && !selectedConfusedWord) return null;

  const selectedTerm = lesson.terms.find((term) => normalize(term.word) === normalized);
  return {
    type: "confusable-term",
    label: lesson.category,
    title: selectedTerm
      ? `You chose “${selectedTerm.word},” a real word with a different job.`
      : "The response followed the sound, but not the meaning.",
    message: selectedTerm
      ? `${selectedTerm.word} means ${selectedTerm.meaning}. That meaning does not fit this sentence.`
      : "This is a known confusion pattern, so the game is switching from correction to comparison.",
    strategy: lesson.strategy,
    retryCue: lesson.retryCue,
    misconception: { ...lesson, selectedWord: selectedTerm?.word || null }
  };
}

export function diagnoseError(entry, challenge, response) {
  const pair = targetedPairDiagnosis(entry, challenge, response);
  if (pair) return pair;

  const normalized = normalize(response);
  const synonyms = new Set((entry?.synonyms || []).map(normalize));
  const antonyms = new Set((entry?.antonyms || []).map(normalize));

  if (challenge?.kind === "build") {
    return {
      type: "letter-order",
      label: "Spelling pattern",
      title: "The right letters landed in the wrong order.",
      message: "This is a spelling-structure miss, not a meaning miss.",
      strategy: `Rebuild by word parts: ${(entry.syllables || []).join(" · ")}.`,
      retryCue: "Say each part, then place only the letters for that part before moving on.",
      misconception: null
    };
  }

  if (challenge?.kind === "synonym" && antonyms.has(normalized)) {
    return {
      type: "relationship-reversal",
      label: "Meaning relationship",
      title: "You found an opposite when the question asked for a close meaning.",
      message: "You recognized a real relationship to the word, but reversed its direction.",
      strategy: "Translate the instruction first: synonym = same or nearly the same; antonym = opposite.",
      retryCue: "Before reading the choices, say “same” or “opposite” out loud in your head.",
      misconception: null
    };
  }

  if (challenge?.kind === "antonym" && synonyms.has(normalized)) {
    return {
      type: "relationship-reversal",
      label: "Meaning relationship",
      title: "You found a close meaning when the question asked for an opposite.",
      message: "You recognized the word family, but chose the wrong relationship.",
      strategy: "Translate the instruction first: antonym = opposite; synonym = same or nearly the same.",
      retryCue: "Name the direction of the relationship before comparing choices.",
      misconception: null
    };
  }

  if (challenge?.kind === "know") {
    return {
      type: "definition-mismatch",
      label: "Core meaning",
      title: "That definition belongs somewhere else.",
      message: "Return to the word’s central meaning rather than matching by tone or familiar wording.",
      strategy: `Anchor ${entry.word} to one short idea: ${entry.definition}`,
      retryCue: "Paraphrase the word in your own few words, then compare the new choices.",
      misconception: null
    };
  }

  if (challenge?.kind === "distinguish") {
    return {
      type: "precision-pair",
      label: "Precision",
      title: "The words are related by sound or spelling, but the sentence needs a different job.",
      message: "Use grammar and meaning together instead of choosing by resemblance.",
      strategy: "Name what the blank must do in this sentence, then select the term that does that job.",
      retryCue: "On the new sentence, identify the job before looking at the choices.",
      misconception: null
    };
  }

  if (challenge?.kind === "use" && challenge?.inputMode) {
    return {
      type: "context-recall",
      label: "Context recall",
      title: "The idea is not yet retrievable from context alone.",
      message: "This later step asks you to recall the vocabulary word without seeing it first.",
      strategy: "Use the sentence clues: what meaning, part of speech, and level of precision does the blank require?",
      retryCue: "Read the whole sentence once before filling the blank.",
      misconception: null
    };
  }

  if (challenge?.kind === "use") {
    return {
      type: challenge?.useMode === "precision" ? "precision-choice" : "context-mismatch",
      label: challenge?.useMode === "precision" ? "Precision" : "Context",
      title: challenge?.useMode === "precision" ? "The choice was possible-sounding, but not the most precise." : "The sentence and the word meaning do not agree yet.",
      message: "A vocabulary word must fit the whole situation, not just one nearby clue.",
      strategy: "Substitute the word’s meaning into the sentence and check whether the idea still makes sense.",
      retryCue: "The retry changes the context so you can reason again instead of memorizing the old answer.",
      misconception: null
    };
  }

  return {
    type: "meaning-neighbor",
    label: "Meaning",
    title: "The choice was related enough to feel plausible, but it missed the exact relationship.",
    message: "The next version will change the choices so you must use the meaning again.",
    strategy: `Keep the core meaning in view: ${entry.definition}`,
    retryCue: "Compare each choice to the definition, not to the previous answer.",
    misconception: null
  };
}

export function identifyMisconception(entry, challenge, response) {
  return diagnoseError(entry, challenge, response)?.misconception || null;
}
