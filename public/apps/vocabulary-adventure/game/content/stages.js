export const stageDefinitions = [
  {
    id: "elementary",
    order: "01",
    label: "Elementary",
    worldName: "Cottage Garden",
    trailName: "Orchard Word Trail",
    status: "available",
    characterAsset: "/apps/vocabulary-adventure/assets/elementary-pair.webp",
    worldAsset: "/apps/vocabulary-adventure/assets/elementary-orchard.webp",
    homeLabel: "My Garden",
    archiveLabel: "My Words",
    rankTitle: "Vocabulary Rank",
    rankNames: {
      Pathfinder: "Garden Explorer",
      Seasoned: "Word Gardener",
      Distinguished: "Garden Scholar"
    },
    philosophy: "Teach from zero knowledge with concrete examples, spoken guidance, and immediately playable practice."
  },
  {
    id: "junior-high",
    order: "02",
    label: "Junior High",
    worldName: "Garden House",
    trailName: "East Garden Trail",
    status: "available",
    characterAsset: "/apps/vocabulary-adventure/assets/learner-pair.webp",
    worldAsset: "/apps/vocabulary-adventure/assets/east-garden.webp",
    homeLabel: "My Estate",
    archiveLabel: "Word Archive",
    rankTitle: "Applied Vocabulary Rank",
    rankNames: {
      Pathfinder: "Pathfinder",
      Seasoned: "Seasoned",
      Distinguished: "Distinguished"
    },
    philosophy: "Increase independence through spelling, meaning, contrast, misconception repair, and contextual use."
  },
  {
    id: "high-school",
    order: "03",
    label: "High School",
    worldName: "Professional District Network",
    trailName: "Field Briefs",
    status: "available",
    characterAsset: "/apps/vocabulary-adventure/assets/high-school-pair.webp",
    worldAsset: "/apps/vocabulary-adventure/assets/high-school-civic.webp",
    homeLabel: "My Property",
    archiveLabel: "Word Archive",
    rankTitle: "Applied Vocabulary Rank",
    rankNames: {
      Pathfinder: "Analyst",
      Seasoned: "Project Analyst",
      Distinguished: "Senior Analyst"
    },
    philosophy: "Rotate through professional domains using evidence, constraints, precise vocabulary, and consequential recommendations."
  }
];

export function getStageDefinition(label = "Elementary") {
  return stageDefinitions.find((stage) => stage.label === label) || stageDefinitions[0];
}

export function isStageAvailable(label) {
  const stage = stageDefinitions.find((definition) => definition.label === label);
  return Boolean(stage && stage.status === "available");
}

export function displayRank(stageLabel, canonicalRank) {
  const stage = getStageDefinition(stageLabel);
  return stage.rankNames?.[canonicalRank] || canonicalRank;
}
