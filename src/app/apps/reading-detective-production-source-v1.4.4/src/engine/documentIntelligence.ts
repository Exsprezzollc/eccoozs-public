import type {
  DerivedDocumentQuestionLens,
  DerivedDocumentRule,
  DocumentSearchResult,
  ReadingCase,
} from "../domain";

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function sourceById(readingCase: ReadingCase, sourceId: string) {
  return readingCase.sources.find((source) => source.id === sourceId);
}

function sectionBySource(readingCase: ReadingCase, sourceId: string) {
  return readingCase.documentIntelligence?.sections.find((section) => section.sourceId === sourceId);
}

export function documentRuleById(
  readingCase: ReadingCase,
  ruleId: string,
): DerivedDocumentRule | undefined {
  const rule = readingCase.documentIntelligence?.rules.find((candidate) => candidate.id === ruleId);
  if (!rule) return undefined;
  const source = sourceById(readingCase, rule.sourceId);
  if (!source) return undefined;
  const section = sectionBySource(readingCase, rule.sourceId);
  return {
    ...rule,
    sourceTitle: source.title,
    sectionHeading: section?.heading,
  };
}

export function documentQuestionForCase(
  readingCase: ReadingCase,
  lensId: string,
): DerivedDocumentQuestionLens | undefined {
  const lens = readingCase.documentIntelligence?.questions.find((candidate) => candidate.id === lensId);
  if (!lens) return undefined;
  const rules = lens.ruleIds
    .map((ruleId) => documentRuleById(readingCase, ruleId))
    .filter((rule): rule is DerivedDocumentRule => Boolean(rule));
  return {
    caseId: readingCase.id,
    lensId: lens.id,
    question: lens.question,
    conclusionStrength: lens.conclusionStrength,
    plainLanguageConclusion: lens.plainLanguageConclusion,
    professionalReviewRecommended:
      Boolean(lens.professionalReviewRecommended) ||
      rules.some((rule) => Boolean(rule.professionalReviewRecommended)),
    rules,
  };
}

export function definedTermForCase(
  readingCase: ReadingCase,
  term: string,
): DerivedDocumentRule | undefined {
  const needle = normalize(term);
  const rule = readingCase.documentIntelligence?.rules.find(
    (candidate) =>
      candidate.kind === "definition" &&
      candidate.term &&
      normalize(candidate.term) === needle,
  );
  return rule ? documentRuleById(readingCase, rule.id) : undefined;
}

export function documentRulesForParty(
  readingCase: ReadingCase,
  party: string,
): DerivedDocumentRule[] {
  const needle = normalize(party);
  return (readingCase.documentIntelligence?.rules ?? [])
    .filter((rule) => rule.party && normalize(rule.party) === needle)
    .map((rule) => documentRuleById(readingCase, rule.id))
    .filter((rule): rule is DerivedDocumentRule => Boolean(rule));
}

export function searchDocumentSections(
  readingCase: ReadingCase,
  query: string,
): DocumentSearchResult[] {
  const config = readingCase.documentIntelligence;
  if (!config) return [];
  const queryTerms = normalize(query).split(/\s+/).filter(Boolean);
  if (!queryTerms.length) return [];

  const results = config.sections.map((section) => {
    const source = sourceById(readingCase, section.sourceId);
    const haystackParts = [
      section.heading,
      ...section.searchTerms,
      source?.title ?? "",
      source?.body ?? "",
    ].map(normalize);
    const matchedTerms = queryTerms.filter((term) => haystackParts.some((part) => part.includes(term)));
    const heading = normalize(section.heading);
    const searchTerms = section.searchTerms.map(normalize);
    let score = 0;
    for (const term of matchedTerms) {
      if (heading.includes(term)) score += 5;
      if (searchTerms.some((candidate) => candidate.includes(term))) score += 3;
      if (normalize(source?.title ?? "").includes(term)) score += 2;
      if (normalize(source?.body ?? "").includes(term)) score += 1;
    }
    return {
      sourceId: section.sourceId,
      sourceTitle: source?.title ?? section.sourceId,
      sectionId: section.id,
      sectionHeading: section.heading,
      score,
      matchedTerms,
      order: section.order,
    };
  });

  return results
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .map(({ order: _order, ...result }) => result);
}

export function validateDocumentIntelligence(readingCase: ReadingCase): string[] {
  const errors: string[] = [];
  const config = readingCase.documentIntelligence;
  if (!config) return errors;

  const sourceIds = new Set(readingCase.sources.map((source) => source.id));
  const sectionIds = new Set<string>();
  const sectionSourceIds = new Set<string>();
  const ruleIds = new Set<string>();
  const questionIds = new Set<string>();

  for (const section of config.sections) {
    if (sectionIds.has(section.id)) errors.push(`Duplicate document section id ${section.id}`);
    sectionIds.add(section.id);
    if (!sourceIds.has(section.sourceId)) errors.push(`Document section ${section.id} references missing source ${section.sourceId}`);
    if (sectionSourceIds.has(section.sourceId)) errors.push(`Document source ${section.sourceId} appears in more than one section`);
    sectionSourceIds.add(section.sourceId);
    if (!section.heading.trim()) errors.push(`Document section ${section.id} needs a heading`);
    if (!Number.isFinite(section.order)) errors.push(`Document section ${section.id} needs a numeric order`);
  }

  for (const rule of config.rules) {
    if (ruleIds.has(rule.id)) errors.push(`Duplicate document rule id ${rule.id}`);
    ruleIds.add(rule.id);
    if (!sourceIds.has(rule.sourceId)) errors.push(`Document rule ${rule.id} references missing source ${rule.sourceId}`);
    if (!rule.clauseText.trim()) errors.push(`Document rule ${rule.id} needs clause text`);
    if (!rule.plainLanguage.trim()) errors.push(`Document rule ${rule.id} needs a plain-language explanation`);
    if (rule.kind === "definition" && (!rule.term?.trim() || !rule.definition?.trim())) {
      errors.push(`Definition rule ${rule.id} needs term and definition`);
    }
  }

  for (const question of config.questions) {
    if (questionIds.has(question.id)) errors.push(`Duplicate document question id ${question.id}`);
    questionIds.add(question.id);
    if (!question.question.trim()) errors.push(`Document question ${question.id} needs question text`);
    if (!question.plainLanguageConclusion.trim()) errors.push(`Document question ${question.id} needs a plain-language conclusion`);
    if (!question.ruleIds.length) errors.push(`Document question ${question.id} must reference at least one rule`);
    for (const ruleId of question.ruleIds) {
      if (!ruleIds.has(ruleId)) errors.push(`Document question ${question.id} references missing rule ${ruleId}`);
    }
  }

  for (const step of readingCase.steps) {
    if (step.documentLensId && !questionIds.has(step.documentLensId)) {
      errors.push(`Step ${step.id} references missing document lens ${step.documentLensId}`);
    }
  }

  return errors;
}
