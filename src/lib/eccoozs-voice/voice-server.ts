import "server-only";

import type { EccoozsVoiceAlias } from "./voice-config";

// Provider voice IDs stay server-only. Browser code must reference aliases.
export const ECCOOZS_PROVIDER_VOICE_IDS: Record<EccoozsVoiceAlias, string> = {
  ECCOOZS_FEMALE_01: "g1YV9jzmkScLtF01Ezuk",
  ECCOOZS_FEMALE_02: "uuI3oA3xuMZuAN7LUKtc",
  ECCOOZS_MALE_01: "NMXOum3U4s8L0bBWl3DD",
  ECCOOZS_MALE_02: "UxRTSYaOoeu78sSAOO5r",
};
