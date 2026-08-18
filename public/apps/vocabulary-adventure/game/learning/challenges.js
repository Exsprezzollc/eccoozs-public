import { getVocabularyForStage, vocabulary } from "../content/vocabulary.js";
import { createRng, pick, shuffle, takeShuffled } from "./random.js";
import { useChallengeMode } from "./mastery.js";
import { getConfusedWords, getMisconceptionLesson } from "./misconceptions.js";

function stagePool(entry) {
  return getVocabularyForStage(entry.stage || "Junior High");
}

function teachingDefinition(entry) {
  return entry.stage === "Elementary" ? (entry.simpleDefinition || entry.definition) : entry.definition;
}

function definitionDistractors(entry, rng) {
  const lesson = getMisconceptionLesson(entry);
  const pairedMeanings = lesson
    ? lesson.terms.filter((term) => term.word !== entry.word).map((term) => term.meaning)
    : [];
  const confused = new Set(getConfusedWords(entry));
  const candidates = stagePool(entry)
    .filter((item) => item.id !== entry.id && !confused.has(item.word.toLowerCase()))
    .map((item) => teachingDefinition(item));
  const result = [];
  for (const meaning of shuffle(pairedMeanings, rng)) {
    if (!result.includes(meaning) && result.length < 3) result.push(meaning);
  }
  for (const meaning of takeShuffled(candidates, candidates.length, rng)) {
    if (!result.includes(meaning) && result.length < 3) result.push(meaning);
  }
  return result;
}

function replaceWordWithBlank(sentence, word) {
  return sentence.replace(new RegExp(`\\b${word}\\b`, "i"), "________");
}

function contextContainingTarget(entry, attempt) {
  const matcher = new RegExp(`\\b${entry.word}\\b`, "i");
  const exactContexts = entry.contexts.filter((context) => matcher.test(context));
  const pool = exactContexts.length ? exactContexts : entry.contexts;
  return pool[attempt % pool.length];
}

function recognitionUseChallenge(entry, rng, attempt) {
  const correct = contextContainingTarget(entry, attempt);
  const foreignPool = stagePool(entry).filter((item) => item.id !== entry.id);
  const foreignEntry = pick(foreignPool.length ? foreignPool : vocabulary.filter((item) => item.id !== entry.id), rng);
  const foreignMisuse = foreignEntry.incorrect.replace(
    new RegExp(`\\b${foreignEntry.word}\\b`, "i"),
    entry.word
  );
  const misconceptionAnswers = entry.misconception ? [entry.incorrect, ...getConfusedWords(entry)] : [];
  const options = shuffle([correct, entry.incorrect, foreignMisuse], rng);
  return {
    prompt: entry.stage === "Elementary"
      ? `Which sentence shows what ${entry.word} means?`
      : `Which sentence uses ${entry.word} correctly?`,
    options,
    answer: correct,
    useMode: "recognition",
    misconceptionAnswers
  };
}

function clozeUseChallenge(entry, attempt, recall = false) {
  const context = contextContainingTarget(entry, attempt);
  return {
    prompt: recall
      ? `Recall the precise word that completes this sentence: ${replaceWordWithBlank(context, entry.word)}`
      : `Type the vocabulary word that best completes this sentence: ${replaceWordWithBlank(context, entry.word)}`,
    answer: entry.word,
    inputMode: true,
    useMode: recall ? "recall-cloze" : "cloze",
    displayWord: !recall,
    misconceptionAnswers: getConfusedWords(entry)
  };
}

function diagnosticOptionPool(entry, rng) {
  const confused = getConfusedWords(entry);
  const extras = entry.distractors.filter((word) => {
    const normalized = String(word).toLowerCase();
    return normalized !== entry.word.toLowerCase() && !confused.includes(normalized);
  });
  const minimumSize = confused.length >= 2 ? 3 : 3;
  const optionPool = [entry.word, ...confused, ...takeShuffled(extras, Math.max(0, minimumSize - (1 + confused.length)), rng)];
  return [...new Set(optionPool)].slice(0, 4);
}

function precisionUseChallenge(entry, rng, attempt) {
  const context = replaceWordWithBlank(contextContainingTarget(entry, attempt), entry.word);
  const options = shuffle(diagnosticOptionPool(entry, rng), rng);
  return {
    prompt: entry.stage === "Elementary"
      ? `Which word fits this sentence best? ${context}`
      : `Choose the most precise term for this context: ${context}`,
    options,
    answer: entry.word,
    useMode: "precision",
    displayWord: false,
    misconceptionAnswers: getConfusedWords(entry)
  };
}

function distinguishChallenge(entry, rng, attempt) {
  const lesson = getMisconceptionLesson(entry);
  if (!lesson) return null;
  const context = replaceWordWithBlank(contextContainingTarget(entry, attempt), entry.word);
  return {
    prompt: `These terms can be confused. Which word precisely completes this sentence? ${context}`,
    options: shuffle(diagnosticOptionPool(entry, rng), rng),
    answer: entry.word,
    displayWord: false,
    misconceptionAnswers: getConfusedWords(entry),
    diagnosticTag: lesson.id
  };
}

function optionChallenge(entry, kind, rng, attempt, context = {}) {
  if (kind === "know") {
    const answer = teachingDefinition(entry);
    const options = shuffle([answer, ...definitionDistractors(entry, rng)], rng);
    return {
      prompt: entry.stage === "Elementary" ? `What does ${entry.word} mean?` : "Which meaning belongs to this word?",
      options,
      answer,
      misconceptionAnswers: getMisconceptionLesson(entry)
        ? getMisconceptionLesson(entry).terms.filter((term) => term.word !== entry.word).map((term) => term.meaning)
        : []
    };
  }
  if (kind === "synonym") {
    const answer = pick(entry.synonyms, rng);
    const options = shuffle([answer, ...takeShuffled(entry.distractors, 3, rng)], rng);
    return {
      prompt: entry.stage === "Elementary" ? `Which word means almost the same as ${entry.word}?` : `Which word is closest in meaning to ${entry.word}?`,
      options,
      answer
    };
  }
  if (kind === "antonym") {
    const answer = pick(entry.antonyms, rng);
    const decoys = [...entry.synonyms, ...entry.distractors];
    const options = shuffle([answer, ...takeShuffled(decoys, 3, rng)], rng);
    return {
      prompt: entry.stage === "Elementary" ? `Which word means the opposite of ${entry.word}?` : `Which word has the opposite meaning of ${entry.word}?`,
      options,
      answer
    };
  }
  if (kind === "distinguish") return distinguishChallenge(entry, rng, attempt) || optionChallenge(entry, "know", rng, attempt, context);

  const mode = useChallengeMode(context.record, context.sessionNumber || 0);
  if (mode === "recall-cloze") return clozeUseChallenge(entry, attempt, true);
  if (mode === "precision") return precisionUseChallenge(entry, rng, attempt);
  if (mode === "cloze") return clozeUseChallenge(entry, attempt, false);
  return recognitionUseChallenge(entry, rng, attempt);
}

export function createChallenge(entry, kind, seed, attempt = 0, context = {}) {
  const rng = createRng(`${seed}:${kind}:${attempt}`);
  const base = { id: `${seed}:${kind}:${attempt}`, wordId: entry.id, kind, attempt };

  if (kind === "discover") {
    return {
      ...base,
      prompt: `Meet the word ${entry.word}. First learn what it means, then you will try it yourself.`,
      answer: entry.word,
      displayWord: true,
      assessable: false,
      teaching: {
        definition: teachingDefinition(entry),
        example: contextContainingTarget(entry, attempt),
        syllables: entry.syllables,
        partOfSpeech: entry.partOfSpeech
      }
    };
  }

  if (kind === "hear") {
    return {
      ...base,
      prompt: "Listen to the word, then continue when you are ready.",
      answer: entry.word,
      displayWord: false,
      assessable: false
    };
  }

  if (kind === "build") {
    const letters = shuffle(entry.word.toUpperCase().split("").map((letter, index) => ({ id: `${index}-${letter}`, letter })), rng);
    return {
      ...base,
      prompt: entry.stage === "Elementary" ? "Build the word you just learned." : "Build the word you heard.",
      answer: entry.word.toLowerCase(),
      letters,
      displayWord: false,
      assessable: true,
      misconceptionAnswers: getConfusedWords(entry)
    };
  }

  const generated = optionChallenge(entry, kind, rng, attempt, context);
  return { ...base, displayWord: true, assessable: true, ...generated };
}

function normalizeAnswer(value) {
  return String(value).trim().toLowerCase().replace(/^[^a-z0-9]+|[^a-z0-9]+$/gi, "");
}

export function answerIsCorrect(challenge, response) {
  return normalizeAnswer(response) === normalizeAnswer(challenge.answer);
}

export function safeChallengeText(challenge) {
  const values = [challenge.prompt, ...(challenge.options || [])].join(" ").toLowerCase();
  return challenge.kind === "build" ? values.replaceAll(challenge.answer.toLowerCase(), "") : values;
}
