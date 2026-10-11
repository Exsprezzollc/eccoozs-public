/**
 * Phonics Audio Policy / Loader
 * -----------------------------
 * Decides, for a given piece of audio text, whether it is ordinary narration
 * (safe for browser SpeechSynthesis) or instructionally critical phonics that
 * requires an approved human recording.
 *
 * Contract:
 *   - Narration (directions, UI, story, explanations) -> browser TTS is fine.
 *   - Authoritative phonics (phonemes, letter-sounds, blends, modeled decoding,
 *     decodable/irregular target words) -> a recorded asset is required.
 *       - status "recorded": return the asset url to play.
 *       - status "pending":  return an explicit pending result. Callers must
 *         present any TTS output only as a clearly labeled approximation, never
 *         as the authoritative pronunciation.
 *
 * The engine is pure and deterministic so it can be unit-tested without a DOM.
 */

import {
  PHONICS_AUDIO_BASE,
  phonicsAssetByToken,
  phonicsAudioAssets,
  type PhonicsAudioAsset,
} from "../content/audio/phonicsManifest";

export type AudioCategory = "narration" | "authoritative-phonics";

export type PhonicsResolution =
  | { category: "narration"; text: string }
  | {
      category: "authoritative-phonics";
      status: "recorded";
      asset: PhonicsAudioAsset;
      url: string;
    }
  | {
      category: "authoritative-phonics";
      status: "pending";
      asset: PhonicsAudioAsset;
      /** May be voiced by TTS ONLY as a clearly labeled approximation. */
      ttsApproximation?: string;
    };

/** Absolute-within-app url for a recorded phonics asset. */
export function phonicsAssetUrl(asset: PhonicsAudioAsset): string {
  return `${PHONICS_AUDIO_BASE}/${asset.file}`;
}

/** The manifest asset a piece of audio text maps to, if any. */
export function findPhonicsAsset(text: string | undefined): PhonicsAudioAsset | undefined {
  if (!text) return undefined;
  return phonicsAssetByToken(text);
}

/** Whether a piece of audio text is pronunciation-critical phonics. */
export function classifyAudioText(text: string | undefined): AudioCategory {
  return findPhonicsAsset(text) ? "authoritative-phonics" : "narration";
}

/**
 * Resolve how a piece of audio text should be produced. Narration falls through
 * to TTS; authoritative phonics returns either a recorded url or an explicit
 * pending status so the caller never treats browser TTS as authoritative.
 */
export function resolveAudio(text: string): PhonicsResolution {
  const asset = findPhonicsAsset(text);
  if (!asset) return { category: "narration", text };
  if (asset.status === "recorded") {
    return { category: "authoritative-phonics", status: "recorded", asset, url: phonicsAssetUrl(asset) };
  }
  return {
    category: "authoritative-phonics",
    status: "pending",
    asset,
    ttsApproximation: asset.ttsApproximation,
  };
}

/** Assets still awaiting an approved human recording (for QA / manifests). */
export function pendingPhonicsAssets(): PhonicsAudioAsset[] {
  return phonicsAudioAssets.filter((asset) => asset.status === "pending");
}

/** True only when an authoritative recording is available for the text. */
export function hasRecordedPronunciation(text: string): boolean {
  const asset = findPhonicsAsset(text);
  return Boolean(asset && asset.status === "recorded");
}
