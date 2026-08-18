import { normalizeProfile } from "./repository.js";

export const BACKUP_KIND = "eccoozs-vocabulary-adventure-backup";
export const BACKUP_FORMAT_VERSION = 1;

export function createProfileBackup(profile, exportedAt = Date.now()) {
  return {
    kind: BACKUP_KIND,
    formatVersion: BACKUP_FORMAT_VERSION,
    exportedAt,
    profile: normalizeProfile(profile)
  };
}

export function parseProfileBackup(candidate) {
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
    return { ok: false, message: "That file is not a Vocabulary Adventure backup." };
  }
  if (candidate.kind !== BACKUP_KIND || candidate.formatVersion !== BACKUP_FORMAT_VERSION) {
    return { ok: false, message: "That file is not a supported Vocabulary Adventure backup." };
  }
  if (!candidate.profile || typeof candidate.profile !== "object" || Array.isArray(candidate.profile)) {
    return { ok: false, message: "The backup does not contain a learner profile." };
  }
  if (candidate.profile.playerId !== "local-vocabulary-adventure") {
    return { ok: false, message: "The backup learner profile could not be verified." };
  }
  const profile = normalizeProfile(candidate.profile);
  if (profile.playerId !== "local-vocabulary-adventure") {
    return { ok: false, message: "The backup learner profile could not be verified." };
  }
  return { ok: true, profile };
}

export function backupFilename(date = new Date()) {
  const stamp = date.toISOString().slice(0, 10);
  return `ECCOOZS_Vocabulary_Adventure_Backup_${stamp}.json`;
}
