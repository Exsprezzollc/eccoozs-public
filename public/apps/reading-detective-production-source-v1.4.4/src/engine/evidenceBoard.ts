import type {
  EvidenceBoardConfig,
  EvidenceBoardGrade,
  EvidenceBoardState,
  EvidenceBoardCategoryId,
  InvestigationStep,
  ReadingCase,
} from "../domain";

export function createEvidenceBoardState(stepId: string, now = new Date().toISOString()): EvidenceBoardState {
  return {
    stepId,
    placements: {},
    zoom: {},
    updatedAt: now,
  };
}

export function placeEvidenceCard(
  state: EvidenceBoardState,
  cardId: string,
  categoryId: EvidenceBoardCategoryId,
  now = new Date().toISOString(),
): EvidenceBoardState {
  return {
    ...state,
    placements: { ...state.placements, [cardId]: categoryId },
    updatedAt: now,
  };
}

export function setEvidenceZoomSource(
  state: EvidenceBoardState,
  sourceId: string,
  now = new Date().toISOString(),
): EvidenceBoardState {
  return {
    ...state,
    zoom: { sourceId },
    updatedAt: now,
  };
}

export function setEvidenceZoomSentence(
  state: EvidenceBoardState,
  sentence: string,
  now = new Date().toISOString(),
): EvidenceBoardState {
  return {
    ...state,
    zoom: { ...state.zoom, sentence, phrase: undefined },
    updatedAt: now,
  };
}

export function setEvidenceZoomPhrase(
  state: EvidenceBoardState,
  phrase: string,
  now = new Date().toISOString(),
): EvidenceBoardState {
  return {
    ...state,
    zoom: { ...state.zoom, phrase },
    updatedAt: now,
  };
}

export function gradeEvidenceBoard(
  config: EvidenceBoardConfig,
  state: EvidenceBoardState,
): EvidenceBoardGrade {
  if (config.mode === "zoom") {
    const source = state.zoom.sourceId === config.target.sourceId;
    const sentence = state.zoom.sentence === config.target.sentence;
    const phrase = state.zoom.phrase === config.target.phrase;
    const correctTargets = [source, sentence, phrase].filter(Boolean).length;
    return {
      correct: source && sentence && phrase,
      totalTargets: 3,
      correctTargets,
      missingCardIds: [],
      incorrectCardIds: [],
      zoomMatches: { source, sentence, phrase },
    };
  }

  const expectedEntries = Object.entries(config.correctPlacements);
  const missingCardIds: string[] = [];
  const incorrectCardIds: string[] = [];
  let correctTargets = 0;

  for (const [cardId, expectedCategory] of expectedEntries) {
    const actual = state.placements[cardId];
    if (!actual) {
      missingCardIds.push(cardId);
      continue;
    }
    if (actual !== expectedCategory) {
      incorrectCardIds.push(cardId);
      continue;
    }
    correctTargets += 1;
  }

  return {
    correct: correctTargets === expectedEntries.length,
    totalTargets: expectedEntries.length,
    correctTargets,
    missingCardIds,
    incorrectCardIds,
  };
}

export function splitSourceIntoSentences(body: string): string[] {
  return body
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

export function validateEvidenceBoardStep(
  readingCase: ReadingCase,
  step: InvestigationStep,
): string[] {
  const config = step.evidenceBoard;
  if (!config) return [];
  const errors: string[] = [];
  const sourceIds = new Set(readingCase.sources.map((source) => source.id));

  if (config.mode === "zoom") {
    const source = readingCase.sources.find((candidate) => candidate.id === config.target.sourceId);
    if (!source) {
      errors.push(`Step ${step.id} evidence zoom references missing source ${config.target.sourceId}`);
      return errors;
    }
    if (!source.body.includes(config.target.sentence)) {
      errors.push(`Step ${step.id} target sentence is not present in source ${source.id}`);
    }
    if (!config.target.sentence.includes(config.target.phrase)) {
      errors.push(`Step ${step.id} target phrase is not inside the target sentence`);
    }
    if (!config.phraseOptions.includes(config.target.phrase)) {
      errors.push(`Step ${step.id} phrase options omit the correct target phrase`);
    }
    return errors;
  }

  const categoryIds = new Set(config.categories.map((category) => category.id));
  const cardIds = new Set(config.cards.map((card) => card.id));
  for (const card of config.cards) {
    if (card.sourceId && !sourceIds.has(card.sourceId)) {
      errors.push(`Step ${step.id} evidence card ${card.id} references missing source ${card.sourceId}`);
    }
  }
  for (const [cardId, categoryId] of Object.entries(config.correctPlacements)) {
    if (!cardIds.has(cardId)) errors.push(`Step ${step.id} placement references missing card ${cardId}`);
    if (!categoryIds.has(categoryId)) errors.push(`Step ${step.id} placement references missing category ${categoryId}`);
  }
  if (config.mode === "compare" && (config.minimumSources ?? 2) < 2) {
    errors.push(`Step ${step.id} compare board must require at least two sources`);
  }
  return errors;
}
