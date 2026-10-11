import type {
  LiteratureIntelligenceConfig,
  MotiveAssessment,
  NarratorAssessment,
  ReadingCase,
  ThemeEvaluation,
  ThemeEvaluationInput,
} from "../domain";

function config(readingCase: ReadingCase): LiteratureIntelligenceConfig | undefined {
  return readingCase.literatureIntelligence;
}

export function assessMotive(
  readingCase: ReadingCase,
  motiveId: string,
): MotiveAssessment | undefined {
  const motive = config(readingCase)?.motives?.find((item) => item.id === motiveId);
  if (!motive) return undefined;
  const explanation = motive.strength === "explicit"
    ? "The text directly states this motive."
    : motive.strength === "strongly-supported"
      ? "The motive is strongly supported by the cited behavior and wording, but it remains an interpretation rather than a directly stated fact."
      : motive.strength === "plausible"
        ? "The motive is possible, but the available evidence does not justify treating it as certain."
        : "The supplied case evidence does not support this motive claim.";
  return {
    caseId: readingCase.id,
    motiveId: motive.id,
    character: motive.character,
    claim: motive.claim,
    strength: motive.strength,
    evidenceSourceIds: [...motive.evidenceSourceIds],
    explanation,
  };
}

export function evaluateTheme(
  readingCase: ReadingCase,
  themeId: string,
  input: ThemeEvaluationInput,
): ThemeEvaluation | undefined {
  const theme = config(readingCase)?.themes?.find((item) => item.id === themeId);
  if (!theme) return undefined;
  const selected = new Set(input.evidenceSourceIds);
  const matched = theme.evidenceSourceIds.filter((id) => selected.has(id));
  const missingEvidenceSourceIds = theme.evidenceSourceIds.filter((id) => !selected.has(id));
  const supported = matched.length >= theme.minimumEvidenceCount;
  return {
    caseId: readingCase.id,
    themeId,
    supported,
    missingEvidenceSourceIds,
    explanation: supported
      ? `The theme is supported because the response connects the larger idea to ${matched.length} relevant story evidence source${matched.length === 1 ? "" : "s"}.`
      : `A theme is more than a topic word. Connect the theme statement to at least ${theme.minimumEvidenceCount} relevant story evidence source${theme.minimumEvidenceCount === 1 ? "" : "s"}.`,
  };
}

export function assessNarrator(
  readingCase: ReadingCase,
  narratorId: string,
): NarratorAssessment | undefined {
  const narrator = config(readingCase)?.narrators?.find((item) => item.id === narratorId);
  if (!narrator) return undefined;
  return {
    caseId: readingCase.id,
    narratorId,
    perspective: narrator.perspective,
    caution: narrator.caution,
    contradictionSourceIds: [...(narrator.contradictionSourceIds ?? [])],
    explanation: narrator.explanation,
  };
}

export function validateLiteratureIntelligence(readingCase: ReadingCase): string[] {
  const cfg = config(readingCase);
  if (!cfg) return [];
  const errors: string[] = [];
  const sourceIds = new Set(readingCase.sources.map((source) => source.id));
  const ids = new Set<string>();
  const addId = (id: string, label: string) => {
    if (!id.trim()) errors.push(`${label} must have an id`);
    if (ids.has(id)) errors.push(`Duplicate literature intelligence id ${id}`);
    ids.add(id);
  };
  for (const motive of cfg.motives ?? []) {
    addId(motive.id, "Motive claim");
    if (!motive.evidenceSourceIds.length) errors.push(`Motive ${motive.id} needs evidence sources`);
    for (const sourceId of motive.evidenceSourceIds) if (!sourceIds.has(sourceId)) errors.push(`Motive ${motive.id} references missing source ${sourceId}`);
  }
  for (const theme of cfg.themes ?? []) {
    addId(theme.id, "Theme model");
    if (theme.minimumEvidenceCount < 1) errors.push(`Theme ${theme.id} minimumEvidenceCount must be at least 1`);
    if (theme.minimumEvidenceCount > theme.evidenceSourceIds.length) errors.push(`Theme ${theme.id} requires more evidence than it provides`);
    for (const sourceId of theme.evidenceSourceIds) if (!sourceIds.has(sourceId)) errors.push(`Theme ${theme.id} references missing source ${sourceId}`);
  }
  for (const narrator of cfg.narrators ?? []) {
    addId(narrator.id, "Narrator profile");
    for (const sourceId of narrator.contradictionSourceIds ?? []) if (!sourceIds.has(sourceId)) errors.push(`Narrator ${narrator.id} references missing contradiction source ${sourceId}`);
  }
  for (const tone of cfg.tones ?? []) {
    addId(tone.id, "Tone frame");
    if (!sourceIds.has(tone.sourceId)) errors.push(`Tone ${tone.id} references missing source ${tone.sourceId}`);
    if (!tone.evidencePhrases.length) errors.push(`Tone ${tone.id} needs evidence phrases`);
  }
  for (const symbolic of cfg.symbolism ?? []) {
    addId(symbolic.id, "Symbolic interpretation");
    for (const sourceId of symbolic.evidenceSourceIds) if (!sourceIds.has(sourceId)) errors.push(`Symbolism ${symbolic.id} references missing source ${sourceId}`);
  }
  return errors;
}
