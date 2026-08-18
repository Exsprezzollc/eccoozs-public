export const PROFILE_SCHEMA_VERSION = 10;

function freshStageProgress() {
  return {
    "Elementary": { rank: "Pathfinder", completedSessions: 0 },
    "Junior High": { rank: "Pathfinder", completedSessions: 0 },
    "High School": { rank: "Pathfinder", completedSessions: 0 }
  };
}

export function createInitialProfile() {
  return {
    schemaVersion: PROFILE_SCHEMA_VERSION,
    playerId: "local-vocabulary-adventure",
    onboardingComplete: false,
    stage: "Elementary",
    selectedCharacter: "elementary-pair",
    propertyName: "Cottage Garden",
    credits: 0,
    rank: "Pathfinder",
    completedSessions: 0,
    stageProgress: freshStageProgress(),
    mastery: {},
    recentWords: [],
    recentWordsByStage: { "Elementary": [], "Junior High": [], "High School": [] },
    challengeHistory: [],
    weakSkills: { spell: 0, meaning: 0, know: 0, synonym: 0, antonym: 0, use: 0, recall: 0 },
    ownedItems: [],
    construction: {},
    settings: {
      captions: true,
      autoPronounce: true,
      slowSpeech: false,
      reducedMotion: false,
      largeText: false,
      highContrast: false,
      readableType: false
    },
    creditTransactions: {},
    purchaseTransactions: {},
    activeSession: null,
    lastSession: null,
    appliedProjects: { active: null, completedBriefIds: [], history: [] },
    updatedAt: 0
  };
}
