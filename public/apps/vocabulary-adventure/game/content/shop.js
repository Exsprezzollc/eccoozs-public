export const ranks = ["Pathfinder", "Seasoned", "Distinguished"];

const elementaryShop = [
  {
    id: "storybook-bench",
    stage: "Elementary",
    name: "Storybook Bench",
    category: "Garden Comfort",
    description: "A carved wooden bench beside the orchard path for reading and word collecting.",
    cost: 150,
    rank: "Pathfinder",
    construction: false,
    visual: "bench",
    placement: "orchard-left"
  },
  {
    id: "pollinator-patch",
    stage: "Elementary",
    name: "Pollinator Patch",
    category: "Gardens",
    description: "A bright patch of native flowers that invites butterflies and bees into the Cottage Garden.",
    cost: 210,
    rank: "Pathfinder",
    construction: false,
    visual: "pollinator",
    placement: "orchard-right"
  },
  {
    id: "birdbath-circle",
    stage: "Elementary",
    name: "Birdbath Circle",
    category: "Nature & Discovery",
    description: "A small stone birdbath surrounded by seed plants so young explorers can notice visiting birds.",
    cost: 245,
    rank: "Pathfinder",
    construction: false,
    visual: "birdbath",
    placement: "garden-center"
  },
  {
    id: "orchard-lanterns",
    stage: "Elementary",
    name: "Orchard Lanterns",
    category: "Landscaping",
    description: "Small warm lanterns mark the stepping-stone path as evening reaches the orchard.",
    cost: 290,
    rank: "Seasoned",
    construction: false,
    visual: "lanterns",
    placement: "path"
  },
  {
    id: "berry-trellis",
    stage: "Elementary",
    name: "Berry Trellis",
    category: "Gardens",
    description: "A low fruit trellis adds a living border where labels, colors, and seasonal changes can be observed.",
    cost: 325,
    rank: "Seasoned",
    construction: false,
    visual: "trellis",
    placement: "garden-left"
  },
  {
    id: "tiny-greenhouse",
    stage: "Elementary",
    name: "Learning Greenhouse",
    category: "Garden Buildings",
    description: "A small glass greenhouse where plants, labels, and new words can grow together.",
    cost: 430,
    rank: "Seasoned",
    construction: true,
    visual: "greenhouse",
    placement: "garden-right"
  },
  {
    id: "story-pond",
    stage: "Elementary",
    name: "Story Pond",
    category: "Water Features",
    description: "A shallow pond with stepping stones, reeds, and a quiet place to notice reflections and pond life.",
    cost: 470,
    rank: "Seasoned",
    construction: true,
    visual: "pond",
    placement: "lower-right"
  },
  {
    id: "woodland-bridge",
    stage: "Elementary",
    name: "Woodland Footbridge",
    category: "Architecture",
    description: "A small timber bridge turns the stream edge into another route through the learning garden.",
    cost: 520,
    rank: "Distinguished",
    construction: true,
    visual: "bridge",
    placement: "lower-center"
  },
  {
    id: "reading-arbor",
    stage: "Elementary",
    name: "Reading Arbor",
    category: "Architecture",
    description: "A vine-covered reading arbor that becomes a quiet home for mastered words.",
    cost: 560,
    rank: "Distinguished",
    construction: true,
    visual: "arbor",
    placement: "upper-right"
  },
  {
    id: "treehouse-nook",
    stage: "Elementary",
    name: "Treehouse Reading Nook",
    category: "Recreation",
    description: "A small elevated nook among the orchard branches for reading, drawing, and revisiting favorite words.",
    cost: 640,
    rank: "Distinguished",
    construction: true,
    visual: "treehouse",
    placement: "upper-left"
  },
  {
    id: "picnic-pavilion",
    stage: "Elementary",
    name: "Garden Picnic Pavilion",
    category: "Garden Buildings",
    description: "A covered little pavilion for story time, puzzles, and celebrating a completed word trail.",
    cost: 720,
    rank: "Distinguished",
    construction: true,
    visual: "pavilion",
    placement: "mid-right"
  },
  {
    id: "garden-observatory",
    stage: "Elementary",
    name: "Garden Discovery Lookout",
    category: "Nature & Discovery",
    description: "A child-sized lookout with a telescope for observing birds, clouds, and distant garden details.",
    cost: 790,
    rank: "Distinguished",
    construction: true,
    visual: "lookout",
    placement: "upper-center"
  }
];

const juniorHighShop = [
  {
    id: "lantern-walk",
    stage: "Junior High",
    name: "Lantern Walk",
    category: "Landscaping",
    description: "Warm brass lanterns illuminate the Garden House arrival path.",
    cost: 340,
    rank: "Pathfinder",
    construction: false,
    visual: "lanterns",
    placement: "arrival-path"
  },
  {
    id: "estate-bicycles",
    stage: "Junior High",
    name: "Estate Bicycle Pair",
    category: "Vehicles & Mobility",
    description: "Two classic estate bicycles add a quiet way to imagine moving between the garden, library, and recreation grounds.",
    cost: 390,
    rank: "Pathfinder",
    construction: false,
    visual: "bicycles",
    placement: "drive-left"
  },
  {
    id: "garden-arch",
    stage: "Junior High",
    name: "Sculptural Garden Arch",
    category: "Architecture",
    description: "A rose-covered framed vista for the east garden path.",
    cost: 480,
    rank: "Seasoned",
    construction: false,
    visual: "arbor",
    placement: "east-path"
  },
  {
    id: "terrace-dining",
    stage: "Junior High",
    name: "Terrace Dining Set",
    category: "Outdoor Living",
    description: "A stone terrace table and chairs create a gathering place overlooking the formal garden.",
    cost: 560,
    rank: "Seasoned",
    construction: false,
    visual: "terrace",
    placement: "terrace"
  },
  {
    id: "courtyard-fountain",
    stage: "Junior High",
    name: "Courtyard Fountain",
    category: "Water Features",
    description: "A hand-carved limestone fountain brings the center garden to life.",
    cost: 710,
    rank: "Seasoned",
    construction: true,
    visual: "fountain",
    placement: "courtyard"
  },
  {
    id: "sculpture-court",
    stage: "Junior High",
    name: "Sculpture Court",
    category: "Gardens",
    description: "A clipped green court with a stone sculpture creates a focal point for the formal grounds.",
    cost: 760,
    rank: "Seasoned",
    construction: true,
    visual: "sculpture",
    placement: "formal-garden"
  },
  {
    id: "reflecting-pool",
    stage: "Junior High",
    name: "Reflecting Pool",
    category: "Water Features",
    description: "A long still-water pool mirrors the garden house and softens the central lawn.",
    cost: 820,
    rank: "Seasoned",
    construction: true,
    visual: "reflecting-pool",
    placement: "central-lawn"
  },
  {
    id: "reading-room",
    stage: "Junior High",
    name: "Winter Reading Room",
    category: "Interiors",
    description: "A high-ceilinged room for a growing Word Collection.",
    cost: 930,
    rank: "Distinguished",
    construction: true,
    visual: "interior-reading",
    placement: "interior"
  },
  {
    id: "glass-conservatory",
    stage: "Junior High",
    name: "Glass Conservatory",
    category: "Architecture",
    description: "A glass-and-stone conservatory extends the estate into a year-round indoor garden.",
    cost: 1_020,
    rank: "Distinguished",
    construction: true,
    visual: "conservatory",
    placement: "house-right"
  },
  {
    id: "tennis-court",
    stage: "Junior High",
    name: "Garden Tennis Court",
    category: "Recreation",
    description: "A discreet green court adds an active recreation zone beyond the formal hedges.",
    cost: 1_080,
    rank: "Distinguished",
    construction: true,
    visual: "tennis",
    placement: "far-right"
  },
  {
    id: "swimming-pool",
    stage: "Junior High",
    name: "Garden Swimming Pool",
    category: "Pools",
    description: "A long rectangular pool with pale stone coping creates a calm recreation terrace.",
    cost: 1_180,
    rank: "Distinguished",
    construction: true,
    visual: "swimming-pool",
    placement: "lower-right"
  },
  {
    id: "pool-pavilion",
    stage: "Junior High",
    name: "Pool Pavilion",
    category: "Outdoor Living",
    description: "A compact pavilion adds shade, seating, and a finished edge to the pool terrace.",
    cost: 1_260,
    rank: "Distinguished",
    construction: true,
    visual: "pool-pavilion",
    placement: "pool-right"
  },
  {
    id: "guest-cottage",
    stage: "Junior High",
    name: "Orchard Guest Cottage",
    category: "Properties",
    description: "A small stone cottage turns the far orchard into a second architectural destination on the estate.",
    cost: 1_380,
    rank: "Distinguished",
    construction: true,
    visual: "guest-cottage",
    placement: "far-left"
  },
  {
    id: "library-wing",
    stage: "Junior High",
    name: "Estate Library Wing",
    category: "Interiors",
    description: "A dedicated library wing gives mastered words, roots, and language collections a permanent home.",
    cost: 1_460,
    rank: "Distinguished",
    construction: true,
    visual: "interior-library",
    placement: "interior"
  },
  {
    id: "music-room",
    stage: "Junior High",
    name: "Music & Listening Room",
    category: "Interiors",
    description: "A quiet listening room links spoken language, pronunciation, and a refined interior collection.",
    cost: 1_520,
    rank: "Distinguished",
    construction: true,
    visual: "interior-music",
    placement: "interior"
  },
  {
    id: "electric-garden-cart",
    stage: "Junior High",
    name: "Electric Estate Shuttle",
    category: "Vehicles & Mobility",
    description: "A small low-speed estate shuttle becomes a decorative mobility feature beside the Garden House drive.",
    cost: 1_640,
    rank: "Distinguished",
    construction: false,
    visual: "estate-cart",
    placement: "drive-right"
  }
];

export const shopItems = [...elementaryShop, ...juniorHighShop];
export const shopById = new Map(shopItems.map((item) => [item.id, item]));

export function getShopItemsForStage(stage = "Elementary") {
  return shopItems.filter((item) => item.stage === stage);
}

export function getShopCategoriesForStage(stage = "Elementary") {
  return [...new Set(getShopItemsForStage(stage).map((item) => item.category))];
}

export function getPropertyMilestone(stage = "Elementary", ownedItems = [], construction = {}) {
  const stageIds = new Set(getShopItemsForStage(stage).map((item) => item.id));
  const ownedStageIds = ownedItems.filter((id) => stageIds.has(id));
  const count = ownedStageIds.length;
  const finishedCount = ownedStageIds.filter((id) => {
    const item = shopById.get(id);
    return !item?.construction || construction?.[id]?.stage === "Installed";
  }).length;
  const milestones = stage === "Elementary"
    ? [
        { min: 0, name: "Seed Garden", note: "The first garden plans are waiting for learning to bring them to life." },
        { min: 3, name: "Growing Garden", note: "The orchard now has enough detail to feel like a place of your own." },
        { min: 6, name: "Discovery Garden", note: "Buildings, water, and nature-study spaces are beginning to connect." },
        { min: 9, name: "Storybook Grounds", note: "The Cottage Garden has become a layered world built from earned learning." },
        { min: 12, name: "Cottage Garden Complete", note: "Every current Elementary garden improvement has been earned and placed." }
      ]
    : [
        { min: 0, name: "Garden House", note: "The formal grounds are ready for their first earned improvement." },
        { min: 4, name: "Cultivated Grounds", note: "Architecture, landscaping, and gathering spaces now shape the estate." },
        { min: 8, name: "Garden Estate", note: "The property has developed distinct outdoor and interior destinations." },
        { min: 12, name: "Grand Garden Estate", note: "Recreation, water, architecture, and interiors now work as one estate." },
        { min: 16, name: "Distinguished Estate", note: "Every current Junior High lifestyle improvement has been earned and placed." }
      ];
  // Property chapters describe what the learner can actually return to and see.
  // A purchased construction project therefore does not advance the chapter until
  // later learning sessions have installed it. Ownership and completion remain
  // separate so the shop can still show what has been earned.
  let current = milestones[0];
  for (const milestone of milestones) if (finishedCount >= milestone.min) current = milestone;
  const next = milestones.find((milestone) => milestone.min > finishedCount) || null;
  return { ...current, count, finishedCount, total: stageIds.size, nextAt: next?.min ?? null, nextName: next?.name ?? null };
}

export function rankMeets(current, required) {
  return ranks.indexOf(current) >= ranks.indexOf(required);
}
