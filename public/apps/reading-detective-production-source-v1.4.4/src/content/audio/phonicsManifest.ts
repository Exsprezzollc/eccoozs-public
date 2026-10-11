/**
 * Phonics Audio Manifest
 * ----------------------
 * Instructionally critical pronunciation (phonemes, letter-sounds, blends,
 * modeled decoding sequences, and decodable/irregular target words) must NOT
 * rely on generic browser text-to-speech, which pronounces isolated sounds,
 * letters, and symbols inconsistently across operating systems and voices.
 *
 * This manifest is the single source of truth for which foundational audio is
 * pronunciation-critical and therefore requires an approved human recording.
 * Each entry maps a stable asset id to the curriculum tokens that trigger it,
 * the file that must be dropped in under `public/assets/audio/phonics/`, and a
 * status flag. Until an approved recording exists an entry stays `pending`;
 * the runtime engine (see `engine/phonicsAudio.ts`) then reports that status
 * explicitly instead of silently passing the sound to browser TTS as if it
 * were authoritative.
 *
 * Adding a professionally recorded asset later is a data-only change: drop the
 * file in, flip `status` to `"recorded"`. No lesson logic changes.
 */

export type PhonicsAssetKind =
  | "phoneme" // isolated sound, e.g. /m/
  | "letter-sound" // grapheme -> sound mapping
  | "blend" // consonant blend or digraph, e.g. /sh/
  | "decoding-sequence" // modeled blending, e.g. /m/ ... /a/ ... /p/
  | "decodable-word" // whole regularly-decodable word, e.g. map
  | "irregular-word"; // high-frequency irregular word requiring modeled pronunciation

export type PhonicsAssetStatus = "recorded" | "pending";

export interface PhonicsAudioAsset {
  /** Stable, unique id (also used to name/trace the file). */
  id: string;
  kind: PhonicsAssetKind;
  /** Human-facing label of the exact sound or word to pronounce. */
  label: string;
  /**
   * Curriculum `audioText` tokens that resolve to this asset. Matching is
   * exact after trimming/whitespace-normalization, so both `/m/ ... /a/ ... /p/`
   * and the plain `m ... a ... p` variant can point at the same recording.
   */
  matches: string[];
  /** Filename to drop in under public/assets/audio/phonics/. */
  file: string;
  /** Curriculum linkage for traceability in QA and educator review. */
  curriculum: {
    domains: string[];
    note?: string;
  };
  /** `pending` until an approved human recording is supplied. */
  status: PhonicsAssetStatus;
  /**
   * A plain-language string that browser TTS *may* voice ONLY as a clearly
   * labeled approximation while the recording is pending. It is never treated
   * as the authoritative pronunciation.
   */
  ttsApproximation?: string;
  /** Direction for the voice talent when the recording is produced. */
  recordingNote?: string;
}

/** Web path (relative to the app base) where recorded phonics assets live. */
export const PHONICS_AUDIO_BASE = "assets/audio/phonics";

/** Default container format expected for recordings. */
export const PHONICS_AUDIO_FORMAT = "mp3";

const VOWELS = new Set(["a", "e", "i", "o", "u"]);
const STOPS = new Set(["p", "t", "d", "g", "k", "b"]);
const VOWEL_EXAMPLE: Record<string, string> = { a: "map", e: "red", i: "bin", o: "fog", u: "sun" };

function phonemeRecordingNote(letter: string): string {
  if (VOWELS.has(letter)) {
    return `Short-vowel sound as in '${VOWEL_EXAMPLE[letter]}', held briefly; not the letter name.`;
  }
  if (STOPS.has(letter)) {
    return `Clipped stop sound with no added vowel (say /${letter}/, not '${letter}uh').`;
  }
  return `Continuant sound held about one second with no added vowel (say /${letter}/, not '${letter}uh').`;
}

const phoneme = (
  letter: string,
  label: string,
  approximation: string,
  domains: string[] = ["phonemic-awareness", "decoding"],
): PhonicsAudioAsset => ({
  id: `phoneme.${letter}`,
  kind: label.startsWith("/") && label.length > 3 ? "blend" : "phoneme",
  label,
  matches: [label],
  file: `phoneme-${letter}.${PHONICS_AUDIO_FORMAT}`,
  curriculum: { domains, note: "Isolated phoneme used in foundation teaching audio." },
  status: "pending",
  ttsApproximation: approximation,
  recordingNote: phonemeRecordingNote(letter),
});

const decodableWord = (word: string, domains: string[] = ["decoding"]): PhonicsAudioAsset => ({
  id: `word.${word}`,
  kind: "decodable-word",
  label: word,
  matches: [word],
  file: `word-${word}.${PHONICS_AUDIO_FORMAT}`,
  curriculum: { domains, note: "Decodable target word modeled at natural pace." },
  status: "pending",
  ttsApproximation: word,
  recordingNote: "Say the whole word once at a natural, unhurried pace.",
});

/**
 * Manifest entries are grounded in the phoneme/word tokens that actually appear
 * as `audioText` in the foundation curriculum (see verify-phoneme-audio.cjs,
 * which fails if a pronunciation-critical token in content has no entry here).
 */
export const phonicsAudioAssets: PhonicsAudioAsset[] = [
  // --- Isolated phonemes (continuants and stops) ---
  phoneme("a", "/a/", "ah"),
  phoneme("d", "/d/", "d"),
  phoneme("e", "/e/", "eh"),
  phoneme("f", "/f/", "fff"),
  phoneme("g", "/g/", "g"),
  phoneme("i", "/i/", "ih"),
  phoneme("k", "/k/", "k"),
  phoneme("l", "/l/", "lll"),
  phoneme("m", "/m/", "mmm"),
  phoneme("n", "/n/", "nnn"),
  phoneme("o", "/o/", "ah"),
  phoneme("p", "/p/", "p"),
  phoneme("r", "/r/", "rrr"),
  phoneme("s", "/s/", "sss"),
  phoneme("t", "/t/", "t"),
  phoneme("u", "/u/", "uh"),
  // --- Digraph ---
  phoneme("sh", "/sh/", "shh"),
  // --- Modeled decoding (blending) sequences ---
  {
    id: "sequence.map",
    kind: "decoding-sequence",
    label: "/m/ ... /a/ ... /p/ -> map",
    matches: ["/m/ ... /a/ ... /p/", "m ... a ... p"],
    file: `sequence-map.${PHONICS_AUDIO_FORMAT}`,
    curriculum: { domains: ["decoding"], note: "Modeled blend of m-a-p into 'map'." },
    status: "pending",
    ttsApproximation: "mmm aaa p, map",
    recordingNote: "Sound each phoneme, then blend into the whole word 'map'.",
  },
  {
    id: "sequence.red",
    kind: "decoding-sequence",
    label: "/r/ ... /e/ ... /d/ -> red",
    matches: ["/r/ ... /e/ ... /d/"],
    file: `sequence-red.${PHONICS_AUDIO_FORMAT}`,
    curriculum: { domains: ["decoding"], note: "Modeled blend of r-e-d into 'red'." },
    status: "pending",
    ttsApproximation: "rrr eh d, red",
    recordingNote: "Sound each phoneme, then blend into 'red'.",
  },
  {
    id: "sequence.sun",
    kind: "decoding-sequence",
    label: "/s/ ... /u/ ... /n/ -> sun",
    matches: ["/s/ ... /u/ ... /n/"],
    file: `sequence-sun.${PHONICS_AUDIO_FORMAT}`,
    curriculum: { domains: ["decoding"], note: "Modeled blend of s-u-n into 'sun'." },
    status: "pending",
    ttsApproximation: "sss uh nnn, sun",
    recordingNote: "Sound each phoneme, then blend into 'sun'.",
  },
  {
    id: "sequence.fog",
    kind: "decoding-sequence",
    label: "/f/ ... /o/ ... /g/ -> fog",
    matches: ["/f/ ... /o/ ... /g/"],
    file: `sequence-fog.${PHONICS_AUDIO_FORMAT}`,
    curriculum: { domains: ["decoding"], note: "Modeled blend of f-o-g into 'fog'." },
    status: "pending",
    ttsApproximation: "fff ah g, fog",
    recordingNote: "Sound each phoneme, then blend into 'fog'.",
  },
  {
    id: "sequence.lid",
    kind: "decoding-sequence",
    label: "/l/ ... /i/ ... /d/ -> lid",
    matches: ["/l/ ... /i/ ... /d/"],
    file: `sequence-lid.${PHONICS_AUDIO_FORMAT}`,
    curriculum: { domains: ["decoding"], note: "Modeled blend of l-i-d into 'lid'." },
    status: "pending",
    ttsApproximation: "lll ih d, lid",
    recordingNote: "Sound each phoneme, then blend into 'lid'.",
  },
  {
    id: "sequence.bin",
    kind: "decoding-sequence",
    label: "b ... i ... n -> bin",
    matches: ["b ... i ... n"],
    file: `sequence-bin.${PHONICS_AUDIO_FORMAT}`,
    curriculum: { domains: ["decoding"], note: "Modeled letter-name/sound sequence for 'bin'." },
    status: "pending",
    ttsApproximation: "b ih nnn, bin",
    recordingNote: "Sound each phoneme, then blend into 'bin'.",
  },
  // --- Decodable target words used in encoding / connected-text practice ---
  decodableWord("map"),
  decodableWord("sun"),
  decodableWord("red"),
  decodableWord("sat"),
  decodableWord("bin"),
  decodableWord("cat"),
  decodableWord("pin"),
];

const assetById = new Map(phonicsAudioAssets.map((asset) => [asset.id, asset]));
const assetByMatch = new Map<string, PhonicsAudioAsset>();
for (const asset of phonicsAudioAssets) {
  for (const token of asset.matches) {
    assetByMatch.set(token.trim().toLowerCase(), asset);
  }
}

export function phonicsAssetById(id: string): PhonicsAudioAsset | undefined {
  return assetById.get(id);
}

export function phonicsAssetByToken(token: string): PhonicsAudioAsset | undefined {
  return assetByMatch.get(token.trim().toLowerCase());
}
