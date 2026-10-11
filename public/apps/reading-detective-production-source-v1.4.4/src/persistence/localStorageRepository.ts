import type {
  CaseMapProgress,
  CaseSessionState,
  DetectiveNotebookEntry,
  EvidenceEvent,
  LearnerProfile,
  PlacementSession,
  ScheduledReview,
  TeachingSession,
} from "../domain";
import { DEFAULT_ACCESSIBILITY } from "../domain";
import type { LearnerRepository } from "./learnerRepository";

const LEARNERS_KEY = "rd.learners.v1";
const EVIDENCE_KEY = "rd.evidence.v1";
const PLACEMENT_KEY = "rd.placement.v1";
const TEACHING_KEY = "rd.teaching.v1";
const SESSIONS_KEY = "rd.sessions.v1";
const NOTEBOOK_KEY = "rd.notebook.v1";
const CASE_MAP_KEY = "rd.case-map.v1";
const REVIEWS_KEY = "rd.reviews.v1";

function storage(): Storage | undefined {
  try {
    return globalThis.localStorage;
  } catch {
    return undefined;
  }
}

function readJson<T>(key: string, fallback: T): T {
  const raw = storage()?.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}


function normalizeLearnerProfile(profile: LearnerProfile): LearnerProfile {
  return {
    ...profile,
    accessibility: { ...DEFAULT_ACCESSIBILITY, ...(profile.accessibility ?? {}) },
    skillStates: profile.skillStates ?? {},
  };
}

function writeJson(key: string, value: unknown): void {
  try {
    storage()?.setItem(key, JSON.stringify(value));
  } catch {
    // Persistence failure must never crash the learning session. The app can continue in-memory.
  }
}

export class LocalStorageLearnerRepository implements LearnerRepository {
  async getLearner(id: string): Promise<LearnerProfile | undefined> {
    const learners = readJson<Record<string, LearnerProfile>>(LEARNERS_KEY, {});
    return learners[id] ? normalizeLearnerProfile(structuredClone(learners[id])) : undefined;
  }

  async saveLearner(profile: LearnerProfile): Promise<void> {
    const learners = readJson<Record<string, LearnerProfile>>(LEARNERS_KEY, {});
    learners[profile.id] = structuredClone(profile);
    writeJson(LEARNERS_KEY, learners);
  }

  async getPlacementSession(learnerId: string): Promise<PlacementSession | undefined> {
    const sessions = readJson<Record<string, PlacementSession>>(PLACEMENT_KEY, {});
    const value = sessions[learnerId];
    return value ? structuredClone(value) : undefined;
  }

  async savePlacementSession(session: PlacementSession): Promise<void> {
    const sessions = readJson<Record<string, PlacementSession>>(PLACEMENT_KEY, {});
    sessions[session.learnerId] = structuredClone(session);
    writeJson(PLACEMENT_KEY, sessions);
  }


  async getTeachingSession(
    learnerId: string,
    moduleId: string,
  ): Promise<TeachingSession | undefined> {
    const sessions = readJson<Record<string, TeachingSession>>(TEACHING_KEY, {});
    const value = sessions[`${learnerId}:${moduleId}`];
    return value ? structuredClone(value) : undefined;
  }

  async saveTeachingSession(session: TeachingSession): Promise<void> {
    const sessions = readJson<Record<string, TeachingSession>>(TEACHING_KEY, {});
    sessions[`${session.learnerId}:${session.moduleId}`] = structuredClone(session);
    writeJson(TEACHING_KEY, sessions);
  }

  async appendEvidence(event: EvidenceEvent): Promise<void> {
    const events = readJson<EvidenceEvent[]>(EVIDENCE_KEY, []);
    events.push(structuredClone(event));
    writeJson(EVIDENCE_KEY, events);
  }

  async listEvidence(learnerId: string): Promise<EvidenceEvent[]> {
    const events = readJson<EvidenceEvent[]>(EVIDENCE_KEY, []);
    return events
      .filter((event) => event.learnerId === learnerId)
      .map((event) => structuredClone(event));
  }

  async getCaseSession(
    learnerId: string,
    caseId: string,
  ): Promise<CaseSessionState | undefined> {
    const sessions = readJson<Record<string, CaseSessionState>>(SESSIONS_KEY, {});
    const value = sessions[`${learnerId}:${caseId}`];
    return value ? structuredClone(value) : undefined;
  }

  async saveCaseSession(session: CaseSessionState): Promise<void> {
    const sessions = readJson<Record<string, CaseSessionState>>(SESSIONS_KEY, {});
    sessions[`${session.learnerId}:${session.caseId}`] = structuredClone(session);
    writeJson(SESSIONS_KEY, sessions);
  }

  async listNotebookEntries(learnerId: string): Promise<DetectiveNotebookEntry[]> {
    const entries = readJson<Record<string, DetectiveNotebookEntry>>(NOTEBOOK_KEY, {});
    return Object.values(entries)
      .filter((entry) => entry.learnerId === learnerId)
      .map((entry) => structuredClone(entry));
  }

  async saveNotebookEntry(entry: DetectiveNotebookEntry): Promise<void> {
    const entries = readJson<Record<string, DetectiveNotebookEntry>>(NOTEBOOK_KEY, {});
    entries[entry.id] = structuredClone(entry);
    writeJson(NOTEBOOK_KEY, entries);
  }

  async listCaseMapProgress(learnerId: string): Promise<CaseMapProgress[]> {
    const map = readJson<Record<string, CaseMapProgress>>(CASE_MAP_KEY, {});
    return Object.values(map)
      .filter((entry) => entry.learnerId === learnerId)
      .map((entry) => structuredClone(entry));
  }

  async saveCaseMapProgress(progress: CaseMapProgress): Promise<void> {
    const map = readJson<Record<string, CaseMapProgress>>(CASE_MAP_KEY, {});
    map[`${progress.learnerId}:${progress.caseId}`] = structuredClone(progress);
    writeJson(CASE_MAP_KEY, map);
  }

  async listScheduledReviews(learnerId: string): Promise<ScheduledReview[]> {
    const reviews = readJson<Record<string, ScheduledReview>>(REVIEWS_KEY, {});
    return Object.values(reviews)
      .filter((review) => review.learnerId === learnerId)
      .map((review) => structuredClone(review));
  }

  async saveScheduledReview(review: ScheduledReview): Promise<void> {
    const reviews = readJson<Record<string, ScheduledReview>>(REVIEWS_KEY, {});
    reviews[review.id] = structuredClone(review);
    writeJson(REVIEWS_KEY, reviews);
  }
}
