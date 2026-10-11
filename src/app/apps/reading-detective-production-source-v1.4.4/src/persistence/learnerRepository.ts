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

export interface LearnerRepository {
  getLearner(id: string): Promise<LearnerProfile | undefined>;
  saveLearner(profile: LearnerProfile): Promise<void>;

  getPlacementSession(learnerId: string): Promise<PlacementSession | undefined>;
  savePlacementSession(session: PlacementSession): Promise<void>;

  getTeachingSession(learnerId: string, moduleId: string): Promise<TeachingSession | undefined>;
  saveTeachingSession(session: TeachingSession): Promise<void>;

  appendEvidence(event: EvidenceEvent): Promise<void>;
  listEvidence(learnerId: string): Promise<EvidenceEvent[]>;

  getCaseSession(learnerId: string, caseId: string): Promise<CaseSessionState | undefined>;
  saveCaseSession(session: CaseSessionState): Promise<void>;

  listNotebookEntries(learnerId: string): Promise<DetectiveNotebookEntry[]>;
  saveNotebookEntry(entry: DetectiveNotebookEntry): Promise<void>;

  listCaseMapProgress(learnerId: string): Promise<CaseMapProgress[]>;
  saveCaseMapProgress(progress: CaseMapProgress): Promise<void>;

  listScheduledReviews(learnerId: string): Promise<ScheduledReview[]>;
  saveScheduledReview(review: ScheduledReview): Promise<void>;
}
