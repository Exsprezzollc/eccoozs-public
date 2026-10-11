import type {
  ContentVariationTemplate,
  MaterializedVariationChoice,
  MaterializedVariationItem,
  PresentationStage,
} from "../domain";

function hashString(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number): () => number {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function render(template: string, tokens: Readonly<Record<string, string>>): string {
  return template.replace(/\{\{([A-Za-z0-9_.-]+)\}\}/g, (_, key: string) => {
    if (!(key in tokens)) {
      throw new Error(`Missing variation token: ${key}`);
    }
    return tokens[key];
  });
}

function shuffled<T>(items: T[], seed: string): T[] {
  const result = [...items];
  const random = mulberry32(hashString(seed));
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

export function compatibleScenarios(
  template: ContentVariationTemplate,
  stage: PresentationStage,
) {
  return template.scenarios.filter((scenario) => scenario.stages.includes(stage));
}

export function materializeVariation(args: {
  template: ContentVariationTemplate;
  stage: PresentationStage;
  seed: string;
  recentFingerprints?: readonly string[];
}): MaterializedVariationItem {
  const candidates = compatibleScenarios(args.template, args.stage);
  if (candidates.length === 0) {
    throw new Error(
      `No ${args.stage} variation scenarios for template ${args.template.id}`,
    );
  }

  const recent = new Set(args.recentFingerprints ?? []);
  const unused = candidates.filter(
    (scenario) => !recent.has(`${args.template.id}:${scenario.id}`),
  );
  const pool = unused.length > 0 ? unused : candidates;
  const index = hashString(`${args.seed}:${args.template.id}`) % pool.length;
  const scenario = pool[index];
  const fingerprint = `${args.template.id}:${scenario.id}`;

  const choices: MaterializedVariationChoice[] = args.template.choices.map(
    (choice) => ({
      id: choice.id,
      label: render(choice.labelTemplate, scenario.tokens),
      misconceptionId: choice.misconceptionId,
    }),
  );

  return {
    templateId: args.template.id,
    scenarioId: scenario.id,
    fingerprint,
    skillId: args.template.skillId,
    sourceKind: args.template.sourceKind,
    sourceTitle: render(args.template.sourceTitleTemplate, scenario.tokens),
    sourceBody: render(args.template.sourceBodyTemplate, scenario.tokens),
    prompt: render(args.template.promptTemplate, scenario.tokens),
    choices: args.template.shuffleChoices
      ? shuffled(choices, `${args.seed}:${fingerprint}:choices`)
      : choices,
    correctChoiceIds: [...args.template.correctChoiceIds],
    clueLabId: args.template.clueLabId,
    evidenceContext: args.template.evidenceContext ?? "delayed-review",
  };
}

export function variationFingerprintsFromMetadata(
  events: readonly { metadata?: Readonly<Record<string, string | number | boolean>> }[],
  limit = 6,
): string[] {
  return events
    .map((event) => event.metadata?.variationFingerprint)
    .filter((value): value is string => typeof value === "string")
    .slice(-limit);
}
