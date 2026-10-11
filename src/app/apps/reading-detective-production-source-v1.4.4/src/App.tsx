import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import type { CSSProperties, ChangeEvent } from "react";
import type {
  CaseMapProgress,
  CaseSessionState,
  DetectiveAppearance,
  DetectiveNotebookEntry,
  DetectiveProfile,
  DecisionEvaluation,
  GraduationEvaluation,
  EvidenceEvent,
  EvidenceBoardGrade,
  EvidenceBoardState,
  LearnerProfile,
  MaterializedVariationItem,
  PlacementSession,
  PresentationStage,
  ReadingCase,
  ScheduledReview,
  SupportLevel,
  TeachingSession,
} from "./domain";
import {
  cases,
  clueLabs,
  curriculumMap,
  detectives,
  diagnosticProbes,
  misconceptions,
  placementPlans,
  reviewVariations,
  skillGraph,
  teachingModules,
  teachingModuleBySkill,
  capstoneProgression,
  graduationDefinition,
} from "./content";
import {
  answerPlacementProbe,
  canReadAloud,
  caseSessionReducer,
  createCaseSession,
  createPlacementSession,
  decideAfterIncorrectResponse,
  decideAfterProbe,
  deriveEducatorInsightReport,
  deriveSkillStateForDefinition,
  getStepSupport,
  placementEvidenceEvent,
  placementSummary,
  readingDevelopmentForSkill,
  notebookEntryFromClueLab,
  scheduleReviewIfNeeded,
  completeScheduledReview,
  materializeVariation,
  routeNextLearningActivity,
  variationFingerprintsFromMetadata,
  supportMessage,
  nextSupportLevel,
  createTeachingSession,
  advanceTeachingSession,
  answerTeachingPractice,
  evidenceContextForTeachingPhase,
  notebookEntryFromTeachingModule,
  assessCapstoneReadiness,
  mentorPresenceFor,
  evaluateGraduation,
  voiceOptions,
  speakDetectiveText,
  detectiveVoicePreviewText,
  supportsSpeechSynthesis,
  resolveAudio,
} from "./engine";
import { createLearner } from "./app/factory";
import { EvidenceBoardPanel } from "./app/components/EvidenceBoardPanel";
import { DocumentNavigator } from "./app/components/DocumentNavigator";
import { ResearchMediaPanel } from "./app/components/ResearchMediaPanel";
import { DecisionWorkbench } from "./app/components/DecisionWorkbench";
import { LiteratureAnalysisPanel } from "./app/components/LiteratureAnalysisPanel";
import { AppliedReadingPanel } from "./app/components/AppliedReadingPanel";
import { TeachingPracticeInteraction } from "./app/components/TeachingPracticeInteraction";
import { LocalStorageLearnerRepository } from "./persistence";
import "./styles/app.css";

type Screen =
  | "welcome"
  | "detective"
  | "placement"
  | "placement-complete"
  | "case"
  | "complete"
  | "headquarters"
  | "case-map"
  | "notebook"
  | "progress"
  | "educator"
  | "review"
  | "teaching"
  | "graduation";

const ACTIVE_LEARNER_KEY = "rd.active-learner.v1";
const APP_VERSION = "1.4.4";
// Every localStorage key Reading Detective owns. Used by the grown-up data
// controls (§8) to export, reset, or delete learner data. Progress keys are the
// subset cleared by "reset progress" (the learner profile itself is kept).
const RD_PROGRESS_KEYS = [
  "rd.evidence.v1",
  "rd.placement.v1",
  "rd.teaching.v1",
  "rd.sessions.v1",
  "rd.notebook.v1",
  "rd.case-map.v1",
  "rd.reviews.v1",
];
const RD_ALL_KEYS = ["rd.learners.v1", ...RD_PROGRESS_KEYS, ACTIVE_LEARNER_KEY];

const stageMeta: Record<
  PresentationStage,
  { title: string; subtitle: string; color: string; firstCaseId: string }
> = {
  "young-investigator": {
    title: "Young Investigator",
    subtitle: "Warm, clue-by-clue reading investigations",
    color: "gold",
    firstCaseId: "CASE.ELEM.001",
  },
  investigator: {
    title: "Investigator",
    subtitle: "Meaning, evidence, sources, and reasoning",
    color: "blue",
    firstCaseId: "CASE.JR.001",
  },
  "lead-investigator": {
    title: "Lead Investigator",
    subtitle: "Real-world documents, evidence, and decisions",
    color: "purple",
    firstCaseId: "CASE.LEAD.001",
  },
};

const stageVoiceCopy: Record<PresentationStage, { icon: string; spoken: string; short: string }> = {
  "young-investigator": {
    icon: "🧩",
    short: "Learn reading clues together",
    spoken: "Young Investigator. We will learn reading clues together, one small step at a time.",
  },
  investigator: {
    icon: "🔎",
    short: "Solve bigger reading mysteries",
    spoken: "Investigator. We will solve bigger reading mysteries with meaning, evidence, and sources.",
  },
  "lead-investigator": {
    icon: "📂",
    short: "Investigate real-world information",
    spoken: "Lead Investigator. We will investigate real-world documents, evidence, and decisions.",
  },
};

function spokenChoiceLabel(label: string): string {
  return label.replace(/[^A-Za-z0-9 .,'’!?-]+/g, " ").replace(/\s+/g, " ").trim();
}

function newEvent(args: Omit<EvidenceEvent, "id" | "timestamp">): EvidenceEvent {
  return {
    ...args,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };
}

function displayDetectiveInitial(name: string): string {
  return name
    .replace(/^(Attorney|Journalist|Dr\.|Engineer|Analyst|Advocate)\s+/, "")
    .slice(0, 1);
}

function detectivePortraitPath(detective: DetectiveProfile, appearance: DetectiveAppearance): string {
  return `assets/detectives/${detective.id}-${appearance}.jpg`;
}

function stageEnvironmentPath(stage: PresentationStage): string {
  return `assets/environments/${stage}.jpg`;
}

function DetectiveAvatar({
  detective,
  appearance,
  small = false,
}: {
  detective: DetectiveProfile;
  appearance: DetectiveAppearance;
  small?: boolean;
}) {
  return (
    <span className={`avatar portrait ${small ? "small" : ""}`} aria-hidden="true">
      <img
        src={detectivePortraitPath(detective, appearance)}
        alt=""
        loading="lazy"
        decoding="async"
        onError={(event: { currentTarget: HTMLImageElement }) => {
          event.currentTarget.style.display = "none";
          const fallback = event.currentTarget.parentElement?.querySelector(".avatar-fallback") as HTMLElement | null;
          if (fallback) fallback.style.display = "grid";
        }}
      />
      <span className="avatar-fallback">{displayDetectiveInitial(detective.name)}</span>
    </span>
  );
}

export default function App() {
  const repository = useMemo(() => new LocalStorageLearnerRepository(), []);
  const [booting, setBooting] = useState(() => !(globalThis as typeof globalThis & { __RD_BROWSER_QA__?: boolean }).__RD_BROWSER_QA__);
  const [screen, setScreen] = useState<Screen>("welcome");
  const [learner, setLearner] = useState<LearnerProfile>(() =>
    createLearner("young-investigator"),
  );
  const [caseId, setCaseId] = useState("CASE.ELEM.001");
  const initialCase = cases["CASE.ELEM.001"] as ReadingCase;
  const [session, dispatchSession] = useReducer(
    caseSessionReducer,
    createCaseSession({ learnerId: learner.id, readingCase: initialCase }),
  );
  const [events, setEvents] = useState<EvidenceEvent[]>([]);
  const [feedback, setFeedback] = useState("");
  const [notebook, setNotebook] = useState<DetectiveNotebookEntry[]>([]);
  const [caseMap, setCaseMap] = useState<CaseMapProgress[]>([]);
  const [reviews, setReviews] = useState<ScheduledReview[]>([]);
  const [activeReview, setActiveReview] = useState<{ review: ScheduledReview; item: MaterializedVariationItem }>();
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [placementSession, setPlacementSession] = useState<PlacementSession>(() =>
    createPlacementSession({
      learner,
      plan: placementPlans[learner.presentationStage],
    }),
  );
  const [teachingSession, setTeachingSession] = useState<TeachingSession>();
  const [narrationUse, setNarrationUse] = useState<Record<string, boolean>>({});
  const [graduationEvaluation, setGraduationEvaluation] = useState<GraduationEvaluation>();
  const [availableVoices, setAvailableVoices] = useState(() => voiceOptions());
  const automaticNarrationKey = useRef<string>();
  const automaticCaseNarrationKey = useRef<string>();
  const automaticUiNarrationKey = useRef<string>();
  const automaticRepairNarrationKey = useRef<string>();

  // Reflects whether the detective is currently reading something aloud. While
  // true the interface stays calm; when it becomes false the learner's next
  // action is gently invited. This is what keeps a beginning reader from being
  // rushed to answer while directions are still being spoken.
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceSeq = useRef(0);
  // A short-lived signal used to play a gentle celebration (correct) or a soft,
  // non-punitive nudge (retry). Purely decorative — it never advances anything.
  const [celebration, setCelebration] = useState<{ id: number; tone: "correct" | "retry" } | undefined>();
  const celebrationTimer = useRef<ReturnType<typeof setTimeout>>();
  // Transient caption shown when instructionally critical phonics is voiced by a
  // browser-TTS approximation because the approved recording is still pending.
  const [phonicsNotice, setPhonicsNotice] = useState("");
  const phonicsNoticeTimer = useRef<ReturnType<typeof setTimeout>>();
  // Grown-up gate (§7): an intentional, honest speed-bump before the educator /
  // data area. It is a simple arithmetic check that keeps a young learner from
  // opening the area by accident. It is explicitly NOT a security control.
  const [grownUpVerified, setGrownUpVerified] = useState(false);
  const [grownUpGate, setGrownUpGate] = useState<{ a: number; b: number } | undefined>();
  const [gateAnswer, setGateAnswer] = useState("");
  const [gateError, setGateError] = useState("");
  // Two-step confirmation for destructive data actions (§8).
  const [pendingDataAction, setPendingDataAction] = useState<"reset" | "delete" | undefined>();
  const [dataMessage, setDataMessage] = useState("");

  // Each call captures its own sequence id, so the onEnd of an utterance that
  // was cancelled by a newer one cannot clear the speaking state belonging to
  // the newer utterance.
  const speakingHandlers = () => {
    const id = (utteranceSeq.current ?? 0) + 1;
    utteranceSeq.current = id;
    return {
      onStart: () => {
        if (id === utteranceSeq.current) setIsSpeaking(true);
      },
      onEnd: () => {
        if (id === utteranceSeq.current) setIsSpeaking(false);
      },
    };
  };

  const signalResult = (correct: boolean) => {
    const id = Date.now();
    setCelebration({ id, tone: correct ? "correct" : "retry" });
    if (celebrationTimer.current) clearTimeout(celebrationTimer.current);
    celebrationTimer.current = setTimeout(() => {
      setCelebration((current) => (current?.id === id ? undefined : current));
    }, correct ? 1600 : 900);
  };

  useEffect(() => () => {
    if (celebrationTimer.current) clearTimeout(celebrationTimer.current);
    if (phonicsNoticeTimer.current) clearTimeout(phonicsNoticeTimer.current);
  }, []);

  const readingCase = cases[caseId as keyof typeof cases] as ReadingCase;
  const detective = useMemo(
    () => detectives.find((item) => item.id === learner.detective.id) ?? detectives[0],
    [learner.detective.id],
  );
  const currentStep = readingCase?.steps[session.stepIndex];
  const currentSupport = currentStep
    ? getStepSupport(session, currentStep.id)
    : "independent";
  const activeTeachingModule = teachingSession
    ? teachingModules[teachingSession.moduleId]
    : undefined;
  const activeTeachingVariant = activeTeachingModule
    ? activeTeachingModule.variants[learner.presentationStage]
    : undefined;
  const currentStepTeachingModule = currentStep
    ? teachingModuleBySkill[currentStep.skillId]
    : undefined;
  const currentStepMastery = currentStep
    ? learner.skillStates[currentStep.skillId]?.mastery ?? "not-introduced"
    : "not-introduced";
  const currentStepNeedsTeaching = Boolean(
    currentStepTeachingModule &&
      currentStepTeachingModule.stages.includes(learner.presentationStage) &&
      currentStepTeachingModule.variants[learner.presentationStage] &&
      ["not-introduced", "introduced"].includes(currentStepMastery),
  );
  const placementPlan = placementPlans[learner.presentationStage];
  const placementProbe = placementSession.currentProbeId
    ? placementPlan.probes[placementSession.currentProbeId]
    : undefined;
  const educatorReport = useMemo(
    () =>
      deriveEducatorInsightReport({
        learner,
        events,
        skillGraph,
        curriculum: curriculumMap,
        teachingModulesBySkill: teachingModuleBySkill,
        misconceptions,
      }),
    [learner, events],
  );
  const capstoneReadiness = useMemo(
    () => assessCapstoneReadiness({ learner, progression: capstoneProgression }),
    [learner],
  );
  const mentorPresence = learner.presentationStage === "lead-investigator"
    ? mentorPresenceFor({ learner, readiness: capstoneReadiness, inCapstone: Boolean(readingCase?.capstone) })
    : "full";
  const isYoungLearner = learner.presentationStage === "young-investigator";

  useEffect(() => {
    if (!supportsSpeechSynthesis()) return;
    const refreshVoices = () => setAvailableVoices(voiceOptions());
    refreshVoices();
    globalThis.speechSynthesis.addEventListener?.("voiceschanged", refreshVoices);
    return () => globalThis.speechSynthesis.removeEventListener?.("voiceschanged", refreshVoices);
  }, []);

  // Narration is part of the teaching contract, not an optional afterthought.
  // Directions and explanations are spoken automatically when narration is enabled.
  // Decoding targets remain protected during practice: the detective reads the prompt,
  // but does not pronounce the printed target word unless the lesson explicitly supplies
  // an auditory clue.
  useEffect(() => {
    if (screen !== "teaching" || !teachingSession || !activeTeachingModule || !activeTeachingVariant) return;
    if (!learner.accessibility.narrationEnabled || !supportsSpeechSynthesis()) return;

    const key = [
      activeTeachingModule.id,
      learner.presentationStage,
      teachingSession.phase,
      learner.accessibility.voiceName ?? "default",
      learner.accessibility.speechRate,
    ].join(":");
    if (automaticNarrationKey.current === key) return;

    const skill = skillGraph[activeTeachingModule.skillId];
    let text = "";
    if (teachingSession.phase === "discover") {
      text = `${activeTeachingVariant.discover.title}. ${activeTeachingVariant.discover.body}`;
    } else if (teachingSession.phase === "explain") {
      text = `What is happening? ${activeTeachingVariant.explanation}`;
    } else if (teachingSession.phase === "model") {
      const modelSource = activeTeachingVariant.model.sourceBody ? ` Example: ${activeTeachingVariant.model.sourceBody}.` : "";
      const modelAudio = activeTeachingVariant.model.audioText ? ` Listen: ${activeTeachingVariant.model.audioText}.` : "";
      text = `Watch how I work this clue.${modelSource}${modelAudio} ${detective.name} thinks aloud. ${activeTeachingVariant.model.thinking}`;
    } else if (["together", "supported", "independent", "transfer"].includes(teachingSession.phase)) {
      const item = teachingSession.phase === "together"
        ? activeTeachingVariant.together
        : teachingSession.phase === "supported"
          ? activeTeachingVariant.supported
          : teachingSession.phase === "independent"
            ? activeTeachingVariant.independent
            : activeTeachingVariant.transfer;
      const spokenSource = item.sourceBody && skill?.domain !== "decoding" ? ` ${item.sourceBody}.` : "";
      const auditoryClue = item.audioText ? ` Listen carefully: ${item.audioText}.` : "";
      text = `${item.prompt}.${spokenSource}${auditoryClue}`;
    }

    if (!text.trim()) return;
    automaticNarrationKey.current = key;
    const spoke = speakDetectiveText({
      text,
      detective,
      preferences: learner.accessibility,
      onUnavailable: () => setFeedback("Audio playback is not available in this browser."),
      ...speakingHandlers(),
    });
    if (spoke && ["together", "supported", "independent", "transfer"].includes(teachingSession.phase)) {
      const item = teachingSession.phase === "together"
        ? activeTeachingVariant.together
        : teachingSession.phase === "supported"
          ? activeTeachingVariant.supported
          : teachingSession.phase === "independent"
            ? activeTeachingVariant.independent
            : activeTeachingVariant.transfer;
      if (item.sourceBody && skill?.domain !== "decoding") {
        setNarrationUse((current) => ({ ...current, [item.id]: true }));
      }
    }
  }, [
    screen,
    teachingSession?.phase,
    activeTeachingModule?.id,
    activeTeachingVariant,
    learner.presentationStage,
    learner.accessibility.narrationEnabled,
    learner.accessibility.voiceName,
    learner.accessibility.speechRate,
    detective,
  ]);

  useEffect(() => {
    if (screen !== "case" || !readingCase || !currentStep || session.status !== "active") return;
    if (!learner.accessibility.narrationEnabled || !supportsSpeechSynthesis()) return;
    const key = [readingCase.id, currentStep.id, session.stepIndex, learner.accessibility.voiceName ?? "default", learner.accessibility.speechRate].join(":");
    if (automaticCaseNarrationKey.current === key) return;
    const skill = skillGraph[currentStep.skillId];
    const visibleSources = readingCase.sources.filter((source) => currentStep.sourceIds.includes(source.id));
    const sourceText = skill?.domain === "decoding" ? "" : visibleSources.map((source) => `${source.title}. ${source.body}`).join(" ");
    const text = `${currentStep.prompt}. ${sourceText}`.trim();
    automaticCaseNarrationKey.current = key;
    const spoke = speakDetectiveText({
      text,
      detective,
      preferences: learner.accessibility,
      onUnavailable: () => setFeedback("Audio playback is not available in this browser."),
      ...speakingHandlers(),
    });
    if (spoke && sourceText) {
      setNarrationUse((current) => ({ ...current, [currentStep.id]: true }));
    }
  }, [
    screen,
    readingCase?.id,
    currentStep?.id,
    session.status,
    session.stepIndex,
    learner.accessibility.narrationEnabled,
    learner.accessibility.voiceName,
    learner.accessibility.speechRate,
    detective,
  ]);

  // Young Investigator critical navigation is voice + visual first. Printed copy is reinforcement,
  // never the only way a beginning reader can know what to do.
  useEffect(() => {
    if (!isYoungLearner || !learner.accessibility.narrationEnabled || !supportsSpeechSynthesis()) return;
    let text = "";
    let key: string = screen;
    if (screen === "detective") {
      text = `Pick your detective. Tap a face to hear the detective. Pick the one you want to learn with.`;
    } else if (screen === "placement" && placementProbe) {
      key = `${screen}:${placementProbe.id}`;
      text = placementProbe.prompt;
    } else if (screen === "headquarters") {
      text = `You are at Investigation Headquarters. Your case is ${readingCase.title}. Tap Continue My Case when you are ready.`;
    } else if (screen === "case-map") {
      text = `These are your cases. Tap a case to open it.`;
    } else if (screen === "notebook") {
      text = `This is your Detective Notebook. It keeps the reading tools you have learned.`;
    } else if (screen === "progress") {
      text = `This page shows the reading tools that are growing stronger.`;
    }
    if (!text || automaticUiNarrationKey.current === key) return;
    automaticUiNarrationKey.current = key;
    speakDetectiveText({ text, detective, preferences: learner.accessibility, ...speakingHandlers() });
  }, [screen, isYoungLearner, placementProbe?.id, readingCase?.title, learner.accessibility.narrationEnabled, learner.accessibility.voiceName, learner.accessibility.speechRate, detective]);

  useEffect(() => {
    if (!isYoungLearner || screen !== "case" || session.status !== "repairing" || !session.activeRepair) return;
    if (!learner.accessibility.narrationEnabled || !supportsSpeechSynthesis()) return;
    const lab = clueLabs[session.activeRepair.clueLabId];
    const phase = session.activeRepair.phase;
    const key = `${lab.id}:${phase}`;
    if (automaticRepairNarrationKey.current === key) return;
    automaticRepairNarrationKey.current = key;
    const text = phase === "discover"
      ? `${lab.title}. ${lab.concept}. Here is an example. ${lab.model}`
      : `${phase === "guided" ? "Let’s try one together." : "Now try a new clue."} ${phase === "guided" ? lab.guided.prompt : lab.transfer.prompt}`;
    speakDetectiveText({ text, detective, preferences: learner.accessibility, ...speakingHandlers() });
  }, [screen, session.status, session.activeRepair?.clueLabId, session.activeRepair?.phase, isYoungLearner, learner.accessibility.narrationEnabled, learner.accessibility.voiceName, learner.accessibility.speechRate, detective]);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!(main instanceof HTMLElement)) return;
    main.tabIndex = -1;
    main.focus({ preventScroll: true });
  }, [screen]);

  useEffect(() => {
    let cancelled = false;
    const restore = async () => {
      const activeId = globalThis.localStorage?.getItem(ACTIVE_LEARNER_KEY);
      if (!activeId) {
        setBooting(false);
        return;
      }

      const savedLearner = await repository.getLearner(activeId);
      if (!savedLearner || cancelled) {
        setBooting(false);
        return;
      }

      const restoredCaseId = savedLearner.currentCaseId ?? stageMeta[savedLearner.presentationStage].firstCaseId;
      const restoredCase = cases[restoredCaseId as keyof typeof cases] as ReadingCase;
      const [savedSession, savedEvents, savedNotebook, savedMap, savedReviews, savedPlacement, savedTeaching] =
        await Promise.all([
          repository.getCaseSession(savedLearner.id, restoredCaseId),
          repository.listEvidence(savedLearner.id),
          repository.listNotebookEntries(savedLearner.id),
          repository.listCaseMapProgress(savedLearner.id),
          repository.listScheduledReviews(savedLearner.id),
          repository.getPlacementSession(savedLearner.id),
          savedLearner.currentTeachingModuleId
            ? repository.getTeachingSession(savedLearner.id, savedLearner.currentTeachingModuleId)
            : Promise.resolve(undefined),
        ]);

      if (cancelled) return;
      setLearner(savedLearner);
      setCaseId(restoredCaseId);
      setEvents(savedEvents);
      setNotebook(savedNotebook);
      setCaseMap(savedMap);
      setReviews(savedReviews);
      const restoredPlacement =
        savedPlacement ??
        createPlacementSession({
          learner: savedLearner,
          plan: placementPlans[savedLearner.presentationStage],
        });
      setPlacementSession(restoredPlacement);
      setTeachingSession(savedTeaching);
      dispatchSession({
        type: "HYDRATE",
        state:
          savedSession ??
          createCaseSession({ learnerId: savedLearner.id, readingCase: restoredCase }),
      });
      const legacyLearnerWithEvidence = !savedLearner.placement && savedEvents.length > 0;
      if (!savedLearner.placement && !legacyLearnerWithEvidence) {
        setScreen(restoredPlacement.status === "complete" ? "placement-complete" : "placement");
      } else if (savedTeaching && savedTeaching.phase !== "complete") {
        setScreen("teaching");
      } else {
        setScreen(savedSession?.status === "complete" ? "headquarters" : "case");
      }
      setBooting(false);
    };
    void restore();
    return () => {
      cancelled = true;
    };
  }, [repository]);

  useEffect(() => {
    if (booting) return;
    void repository.saveLearner(learner);
    globalThis.localStorage?.setItem(ACTIVE_LEARNER_KEY, learner.id);
  }, [booting, learner, repository]);

  useEffect(() => {
    if (booting || session.learnerId !== learner.id || session.caseId !== caseId) return;
    void repository.saveCaseSession(session);
  }, [booting, caseId, learner.id, repository, session]);

  useEffect(() => {
    if (booting || placementSession.learnerId !== learner.id) return;
    void repository.savePlacementSession(placementSession);
  }, [booting, learner.id, placementSession, repository]);

  useEffect(() => {
    if (booting || !teachingSession || teachingSession.learnerId !== learner.id) return;
    void repository.saveTeachingSession(teachingSession);
  }, [booting, learner.id, repository, teachingSession]);

  const refreshSupportingStores = async (learnerId = learner.id) => {
    const [savedNotebook, savedMap, savedReviews] = await Promise.all([
      repository.listNotebookEntries(learnerId),
      repository.listCaseMapProgress(learnerId),
      repository.listScheduledReviews(learnerId),
    ]);
    setNotebook(savedNotebook);
    setCaseMap(savedMap);
    setReviews(savedReviews);
  };

  const chooseStage = (stage: PresentationStage) => {
    const next = createLearner(stage);
    const firstCase = cases[stageMeta[stage].firstCaseId as keyof typeof cases] as ReadingCase;
    next.currentCaseId = firstCase.id;
    setLearner(next);
    setCaseId(firstCase.id);
    setEvents([]);
    setNotebook([]);
    setCaseMap([]);
    setReviews([]);
    setTeachingSession(undefined);
    setFeedback("");
    setNarrationUse({});
    setGraduationEvaluation(undefined);
    setPlacementSession(
      createPlacementSession({ learner: next, plan: placementPlans[stage] }),
    );
    dispatchSession({
      type: "HYDRATE",
      state: createCaseSession({ learnerId: next.id, readingCase: firstCase }),
    });
    setScreen("detective");
  };

  const chooseDetective = (id: string, appearance?: DetectiveAppearance) => {
    setLearner((current) => ({
      ...current,
      detective: {
        id,
        appearance: appearance ?? current.detective.appearance,
      },
      updatedAt: new Date().toISOString(),
    }));
  };

  const beginPlacement = async () => {
    const plan = placementPlans[learner.presentationStage];
    const existing = await repository.getPlacementSession(learner.id);
    const nextPlacement =
      existing?.status === "active"
        ? existing
        : createPlacementSession({ learner, plan });
    setPlacementSession(nextPlacement);
    await repository.savePlacementSession(nextPlacement);
    setFeedback("");
    setScreen("placement");
  };

  const answerPlacement = async (answerId: string) => {
    if (!placementProbe || placementSession.status !== "active") return;
    const { session: nextPlacement, response } = answerPlacementProbe({
      session: placementSession,
      plan: placementPlan,
      answerId,
    });
    const event = placementEvidenceEvent({
      learnerId: learner.id,
      plan: placementPlan,
      response,
    });
    const nextEvents = [...events, event];
    await recordEvidence(event);
    setPlacementSession(nextPlacement);
    await repository.savePlacementSession(nextPlacement);

    if (nextPlacement.status !== "complete") {
      setFeedback(
        response.correct
          ? "Clue logged. The investigation is adjusting to find the next useful reading tool."
          : "That clue tells us where to look next. This is not a score or a grade label.",
      );
      return;
    }

    const summary = placementSummary(nextPlacement);
    const nextSkillStates = { ...learner.skillStates };
    for (const observedSkillId of new Set(nextPlacement.responses.map((item) => item.skillId))) {
      const definition = skillGraph[observedSkillId];
      if (definition) {
        nextSkillStates[observedSkillId] = deriveSkillStateForDefinition(
          definition,
          nextEvents,
        );
      }
    }

    const nextLearner: LearnerProfile = {
      ...learner,
      placement: summary,
      readingDevelopment: readingDevelopmentForSkill(summary.recommendedSkillId),
      skillStates: nextSkillStates,
      currentCaseId: stageMeta[learner.presentationStage].firstCaseId,
      updatedAt: new Date().toISOString(),
    };
    setLearner(nextLearner);
    await repository.saveLearner(nextLearner);
    setFeedback("");
    setScreen("placement-complete");
  };

  const startCase = async (nextCaseId = caseId, routeMode: "full" | "sample" = "full") => {
    const nextCase = cases[nextCaseId as keyof typeof cases] as ReadingCase;
    const saved = await repository.getCaseSession(learner.id, nextCase.id);
    const resumeSaved =
      saved?.status === "active" || saved?.status === "probing" || saved?.status === "repairing";
    const transferIndex = nextCase.steps.reduce(
      (found, step, index) => (step.evidenceContext === "transfer" ? index : found),
      -1,
    );
    const sampleIndex = Math.max(0, transferIndex >= 0 ? transferIndex : nextCase.steps.length - 1);
    const nextSession = resumeSaved
      ? saved
      : createCaseSession({
          learnerId: learner.id,
          readingCase: nextCase,
          startStepIndex: routeMode === "sample" ? sampleIndex : 0,
          routeMode,
        });

    setCaseId(nextCase.id);
    dispatchSession({ type: "HYDRATE", state: nextSession });
    setLearner((current) => ({
      ...current,
      currentCaseId: nextCase.id,
      updatedAt: new Date().toISOString(),
    }));
    const progress: CaseMapProgress = {
      learnerId: learner.id,
      caseId: nextCase.id,
      status: "in-progress",
      lastVisitedAt: new Date().toISOString(),
    };
    await repository.saveCaseMapProgress(progress);
    await refreshSupportingStores();
    setFeedback("");
    setScreen("case");
  };

  const recordEvidence = async (event: EvidenceEvent) => {
    setEvents((current) => [...current, event]);
    await repository.appendEvidence(event);
  };

  const beginTeaching = async (
    moduleId: string,
    returnTo?: { caseId: string; stepIndex: number },
  ) => {
    const module = teachingModules[moduleId];
    if (!module) {
      setFeedback("This reading tool does not have a teaching module yet.");
      return;
    }

    const saved = await repository.getTeachingSession(learner.id, moduleId);
    const canResume =
      saved &&
      saved.phase !== "complete" &&
      saved.presentationStage === learner.presentationStage &&
      saved.returnTo?.caseId === returnTo?.caseId &&
      saved.returnTo?.stepIndex === returnTo?.stepIndex;
    const nextTeaching = canResume
      ? saved
      : createTeachingSession({
          learner,
          module,
          returnTo,
        });

    setTeachingSession(nextTeaching);
    const nextLearner = {
      ...learner,
      currentTeachingModuleId: moduleId,
      updatedAt: new Date().toISOString(),
    };
    setLearner(nextLearner);
    await Promise.all([
      repository.saveLearner(nextLearner),
      repository.saveTeachingSession(nextTeaching),
    ]);
    setFeedback("");
    setScreen("teaching");
  };

  const advanceTeachingInformation = async () => {
    if (!teachingSession || !activeTeachingModule) return;
    if (!["discover", "explain", "model"].includes(teachingSession.phase)) return;

    const event = newEvent({
      learnerId: learner.id,
      skillId: activeTeachingModule.skillId,
      caseId: teachingSession.returnTo?.caseId ?? `TEACH:${activeTeachingModule.id}`,
      itemId: `${activeTeachingModule.id}:${teachingSession.phase}`,
      outcome: "presented",
      support: "worked-example",
      context: "instruction",
      modality: skillGraph[activeTeachingModule.skillId]?.primaryModality ?? "print",
      metadata: { teachingModuleId: activeTeachingModule.id, teachingPhase: teachingSession.phase },
    });
    await recordEvidence(event);
    const next = advanceTeachingSession(teachingSession);
    setTeachingSession(next);
    await repository.saveTeachingSession(next);
  };

  const answerTeaching = async (answerId?: string, correctness?: boolean) => {
    if (!teachingSession || !activeTeachingModule) return;
    const phase = teachingSession.phase;
    const context = evidenceContextForTeachingPhase(phase);
    if (!context || !["together", "supported", "independent", "transfer"].includes(phase)) return;

    const result = answerTeachingPractice({
      session: teachingSession,
      module: activeTeachingModule,
      answerId,
      correctness,
    });
    const support: SupportLevel =
      phase === "together"
        ? "worked-example"
        : phase === "supported"
          ? "concept-reminder"
          : "independent";
    const event = newEvent({
      learnerId: learner.id,
      skillId: activeTeachingModule.skillId,
      caseId: teachingSession.returnTo?.caseId ?? `TEACH:${activeTeachingModule.id}`,
      itemId: result.item.id,
      outcome: result.correct ? "correct" : "incorrect",
      support,
      context,
      modality: narrationUse[result.item.id]
        ? "mixed"
        : skillGraph[activeTeachingModule.skillId]?.primaryModality ?? "print",
      metadata: { teachingModuleId: activeTeachingModule.id, teachingPhase: phase },
    });
    const nextEvents = [...events, event];
    await recordEvidence(event);
    setTeachingSession(result.session);
    await repository.saveTeachingSession(result.session);
    signalResult(result.correct);

    if (!result.correct) {
      setFeedback(result.item.retryMessage);
      return;
    }

    setFeedback(result.item.successMessage);
    if (result.session.phase !== "complete") return;

    const definition = skillGraph[activeTeachingModule.skillId];
    const nextSkillStates = { ...learner.skillStates };
    if (definition) {
      nextSkillStates[activeTeachingModule.skillId] = deriveSkillStateForDefinition(
        definition,
        nextEvents,
      );
    }

    const notebookEntry = notebookEntryFromTeachingModule({
      learnerId: learner.id,
      module: activeTeachingModule,
      sourceCaseId: teachingSession.returnTo?.caseId,
    });
    if (notebookEntry) {
      await repository.saveNotebookEntry(notebookEntry);
    }

    const scheduled = scheduleReviewIfNeeded({
      existing: reviews,
      learnerId: learner.id,
      skillId: activeTeachingModule.skillId,
      sourceCaseId: teachingSession.returnTo?.caseId,
      delayDays: 7,
      reason: "retention-check",
    });
    if (scheduled.created) {
      await repository.saveScheduledReview(scheduled.review);
    }

    const nextLearner: LearnerProfile = {
      ...learner,
      skillStates: nextSkillStates,
      currentTeachingModuleId: undefined,
      updatedAt: new Date().toISOString(),
    };
    setLearner(nextLearner);
    await repository.saveLearner(nextLearner);
    await refreshSupportingStores();

    if (teachingSession.returnTo) {
      const returnCase = cases[teachingSession.returnTo.caseId as keyof typeof cases] as ReadingCase;
      const savedCase = await repository.getCaseSession(learner.id, returnCase.id);
      const restored = savedCase && savedCase.status !== "complete"
        ? savedCase
        : createCaseSession({
            learnerId: learner.id,
            readingCase: returnCase,
            startStepIndex: teachingSession.returnTo.stepIndex,
          });
      setCaseId(returnCase.id);
      dispatchSession({ type: "HYDRATE", state: { ...restored, stepIndex: teachingSession.returnTo.stepIndex, status: "active", completedAt: undefined } });
      setFeedback("Tool strengthened. Now apply it immediately to the case that needed it.");
      setScreen("case");
      return;
    }

    setScreen("headquarters");
  };

  const completeCurrentStep = async (nextEvents: EvidenceEvent[]) => {
    if (!currentStep) return;
    const isLast = session.stepIndex + 1 >= readingCase.steps.length;
    dispatchSession({
      type: "COMPLETE_STEP",
      stepId: currentStep.id,
      totalSteps: readingCase.steps.length,
    });

    if (!isLast) return;

    const nextSkillStates = { ...learner.skillStates };
    for (const targetSkill of readingCase.targetSkills) {
      const definition = skillGraph[targetSkill];
      if (definition) {
        nextSkillStates[targetSkill] = deriveSkillStateForDefinition(definition, nextEvents);
      }
    }
    const nextLearner: LearnerProfile = {
      ...learner,
      skillStates: nextSkillStates,
      currentCaseId: readingCase.id,
      updatedAt: new Date().toISOString(),
    };
    setLearner(nextLearner);
    await repository.saveLearner(nextLearner);

    await repository.saveCaseMapProgress({
      learnerId: learner.id,
      caseId: readingCase.id,
      status: "completed",
      lastVisitedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    });

    if (readingCase.delayedReview) {
      let reviewPool = [...reviews];
      for (const skillId of readingCase.delayedReview.skillIds) {
        const scheduled = scheduleReviewIfNeeded({
          existing: reviewPool,
          learnerId: learner.id,
          skillId,
          sourceCaseId: readingCase.id,
          delayDays: readingCase.delayedReview.afterDays,
          reason: "retention-check",
        });
        if (scheduled.created) {
          await repository.saveScheduledReview(scheduled.review);
          reviewPool = [...reviewPool, scheduled.review];
        }
      }
    }

    if (readingCase.capstone) {
      const evaluation = evaluateGraduation({
        definition: graduationDefinition,
        events: nextEvents,
        caseCompleted: true,
      });
      const graduatedLearner: LearnerProfile = {
        ...nextLearner,
        graduation: {
          status: evaluation.status,
          caseId: evaluation.caseId,
          evaluatedAt: evaluation.evaluatedAt,
          passedCompetencies: evaluation.passedCompetencies,
          totalCompetencies: evaluation.totalCompetencies,
        },
        updatedAt: new Date().toISOString(),
      };
      setLearner(graduatedLearner);
      setGraduationEvaluation(evaluation);
      await repository.saveLearner(graduatedLearner);
      await refreshSupportingStores();
      setScreen("graduation");
      return;
    }

    await refreshSupportingStores();
    setScreen("complete");
  };

  const updateEvidenceBoard = (board: EvidenceBoardState) => {
    if (!currentStep) return;
    dispatchSession({ type: "SET_EVIDENCE_BOARD", stepId: currentStep.id, board });
  };

  const submitEvidenceBoard = async (grade: EvidenceBoardGrade) => {
    if (!currentStep || !currentStep.evidenceBoard || session.status !== "active") return;
    const context =
      currentStep.evidenceContext ??
      (currentSupport === "independent" ? "independent" : "supported-practice");
    const event = newEvent({
      learnerId: learner.id,
      skillId: currentStep.skillId,
      caseId: readingCase.id,
      itemId: currentStep.id,
      outcome: grade.correct ? "correct" : "incorrect",
      support: currentSupport,
      context,
      modality: narrationUse[currentStep.id]
        ? "mixed"
        : skillGraph[currentStep.skillId]?.primaryModality ?? "print",
      metadata: {
        evidenceBoardMode: currentStep.evidenceBoard.mode,
        correctTargets: grade.correctTargets,
        totalTargets: grade.totalTargets,
      },
    });
    const nextEvents = [...events, event];
    await recordEvidence(event);

    if (!grade.correct) {
      const support = nextSupportLevel(currentSupport);
      dispatchSession({
        type: "SET_SUPPORT",
        stepId: currentStep.id,
        support,
        wrongAnswerId: "EVIDENCE_BOARD",
      });
      if (grade.zoomMatches) {
        const matched = grade.correctTargets;
        setFeedback(`You matched ${matched} of 3 evidence levels. Keep the correct parts and inspect where the source → sentence → phrase path changes.`);
      } else {
        setFeedback(`You placed ${grade.correctTargets} of ${grade.totalTargets} clues accurately. Re-check what each source actually establishes before moving any card.`);
      }
      return;
    }

    setFeedback(
      currentStep.evidenceContext === "transfer"
        ? "You proved the conclusion with evidence in a new context. That is transfer."
        : "Evidence locked. You did not just choose an answer—you showed where it came from.",
    );
    await completeCurrentStep(nextEvents);
  };

  const submitDecisionWorkbench = async (evaluation: DecisionEvaluation) => {
    if (!currentStep || !currentStep.decisionId || session.status !== "active") return;
    const event = newEvent({
      learnerId: learner.id,
      skillId: currentStep.skillId,
      caseId: readingCase.id,
      itemId: currentStep.id,
      outcome: evaluation.defensible ? "correct" : "incorrect",
      support: currentSupport,
      context: currentStep.evidenceContext ?? "independent",
      modality: "mixed",
      metadata: {
        decisionId: currentStep.decisionId,
        optionId: evaluation.optionId,
        missingEvidence: evaluation.missingEvidenceSourceIds.join("|"),
        missingCriteria: evaluation.missingCriterionIds.join("|"),
        missingTradeoffs: evaluation.missingTradeoffs.join("|"),
      },
    });
    const nextEvents = [...events, event];
    await recordEvidence(event);
    if (!evaluation.defensible) {
      const support = nextSupportLevel(currentSupport);
      dispatchSession({ type: "SET_SUPPORT", stepId: currentStep.id, support, wrongAnswerId: "DECISION_WORKBENCH" });
      setFeedback(evaluation.explanation);
      return;
    }
    setFeedback(`Decision defended with evidence. ${evaluation.explanation}`);
    await completeCurrentStep(nextEvents);
  };

  const continueLearningRoute = async () => {
    const route = routeNextLearningActivity({
      learner,
      cases,
      caseMap,
      reviews,
      variationTemplates: reviewVariations,
      skillGraph,
      teachingModulesBySkill: teachingModuleBySkill,
      capstoneProgression,
      activeCaseId: caseId,
      activeCaseStatus: session.status,
    });

    if (route.kind === "teaching") {
      await beginTeaching(
        route.moduleId,
        route.caseId ? { caseId: route.caseId, stepIndex: 0 } : undefined,
      );
      setFeedback(
        route.reason === "prerequisite-gap"
          ? `Before the next case, Reading Detective found one prerequisite to strengthen: ${skillGraph[route.skillId]?.name ?? route.skillId}.`
          : route.reason === "new-skill"
            ? "This tool is new, so Reading Detective will teach it before asking you to prove it in a case."
            : "Your evidence shows this tool is still developing. We’ll strengthen it before the next independent case clue.",
      );
      return;
    }

    if (route.kind === "resume-case") {
      await startCase(route.caseId);
      return;
    }

    if (route.kind === "review-insertion") {
      const template = reviewVariations[route.variationTemplateId];
      const item = materializeVariation({
        template,
        stage: learner.presentationStage,
        seed: `${learner.id}:${route.review.id}`,
        recentFingerprints: variationFingerprintsFromMetadata(events),
      });
      setActiveReview({ review: route.review, item });
      setFeedback(
        route.reason === "repair-follow-up"
          ? "A reading tool you repaired is showing up naturally in a new clue."
          : "An older reading tool is back in a new context so we can check whether it lasted.",
      );
      setScreen("review");
      return;
    }

    if (route.kind === "case") {
      await startCase(route.caseId, route.mode);
      if (route.mode === "sample") {
        setFeedback("Your prior evidence is strong, so this case is sampling transfer instead of making you repeat everything.");
      }
      return;
    }

    if (route.kind === "capstone") {
      await startCase(route.caseId, "full");
      setFeedback(
        route.reason === "capstone-retry"
          ? "The Final Case is reopening so you can add the independent evidence graduation still needs. Your earlier evidence remains in the ledger."
          : "The Final Case is unlocked. Your detective is now on request instead of leading every step—the investigation belongs to you.",
      );
      return;
    }

    if (route.kind === "skill-repair") {
      setFeedback(
        `The engine found a prerequisite worth strengthening first: ${skillGraph[route.skillId]?.name ?? route.skillId}. We’ll keep the same age-respecting presentation while the case checks that tool.`,
      );
      await startCase(route.caseId ?? stageMeta[learner.presentationStage].firstCaseId);
      return;
    }

    setFeedback("Your currently available Reading Detective skills are stable. New cases can be added without forcing unnecessary repetition.");
    setScreen("progress");
  };

  const answerReview = async (answerId: string) => {
    if (!activeReview) return;
    const { review, item } = activeReview;
    const choice = item.choices.find((candidate) => candidate.id === answerId);
    const correct = item.correctChoiceIds.includes(answerId);
    const event = newEvent({
      learnerId: learner.id,
      skillId: item.skillId,
      caseId: review.sourceCaseId ?? `REVIEW:${review.id}`,
      itemId: `REVIEW:${review.id}:${item.scenarioId}`,
      outcome: correct ? "correct" : "incorrect",
      support: "independent",
      context: "delayed-review",
      modality: skillGraph[item.skillId]?.primaryModality ?? "print",
      misconceptionId: choice?.misconceptionId,
      metadata: {
        reviewId: review.id,
        variationTemplateId: item.templateId,
        variationFingerprint: item.fingerprint,
      },
    });
    const nextEvents = [...events, event];
    await recordEvidence(event);

    const completedReview = completeScheduledReview(review);
    await repository.saveScheduledReview(completedReview);
    let nextReviews = reviews.map((candidate) =>
      candidate.id === completedReview.id ? completedReview : candidate,
    );

    if (!correct) {
      const scheduled = scheduleReviewIfNeeded({
        existing: nextReviews,
        learnerId: learner.id,
        skillId: item.skillId,
        sourceCaseId: review.sourceCaseId,
        reason: "repair-follow-up",
        delayDays: 2,
      });
      if (scheduled.created) {
        await repository.saveScheduledReview(scheduled.review);
        nextReviews = [...nextReviews, scheduled.review];
      }
    }

    const definition = skillGraph[item.skillId];
    const nextSkillStates = { ...learner.skillStates };
    if (definition) {
      nextSkillStates[item.skillId] = deriveSkillStateForDefinition(definition, nextEvents);
    }
    const nextLearner = {
      ...learner,
      skillStates: nextSkillStates,
      updatedAt: new Date().toISOString(),
    };
    setLearner(nextLearner);
    await repository.saveLearner(nextLearner);
    setReviews(nextReviews);
    setActiveReview(undefined);
    setFeedback(
      correct
        ? "Retention confirmed in a different context. That evidence now counts toward durable mastery."
        : "This clue needs another look. Reading Detective recorded the exact skill and will bring it back soon without restarting the whole unit.",
    );
    setScreen("headquarters");
  };

  const beginRepair = (clueLabId: string, misconceptionId?: string) => {
    if (!currentStep) return;
    dispatchSession({
      type: "BEGIN_REPAIR",
      repair: {
        clueLabId,
        misconceptionId,
        phase: "discover",
        bookmark: {
          caseId: readingCase.id,
          stepIndex: session.stepIndex,
          stepId: currentStep.id,
          supportBeforeRepair: currentSupport,
        },
      },
    });
    setFeedback("We found the exact clue to strengthen. Repair it, then return to this same case.");
  };

  const answer = async (answerId: string) => {
    if (!currentStep || session.status !== "active") return;
    const choice = currentStep.choices?.find((item) => item.id === answerId);
    const isCorrect = currentStep.correctAnswerIds?.includes(answerId) ?? false;
    const context =
      currentStep.evidenceContext ??
      (currentSupport === "independent" ? "independent" : "supported-practice");
    const event = newEvent({
      learnerId: learner.id,
      skillId: currentStep.skillId,
      caseId: readingCase.id,
      itemId: currentStep.id,
      outcome: isCorrect ? "correct" : "incorrect",
      support: currentSupport,
      context,
      modality: narrationUse[currentStep.id]
        ? "mixed"
        : skillGraph[currentStep.skillId]?.primaryModality ?? "print",
      misconceptionId: choice?.misconceptionId,
    });

    const nextEvents = [...events, event];
    await recordEvidence(event);
    signalResult(isCorrect);

    if (!isCorrect) {
      const decision = decideAfterIncorrectResponse({
        step: currentStep,
        misconceptionId: choice?.misconceptionId,
        currentSupport,
        events: nextEvents,
        misconceptions,
        probes: diagnosticProbes,
      });

      if (decision.kind === "support") {
        dispatchSession({
          type: "SET_SUPPORT",
          stepId: currentStep.id,
          support: decision.support,
          wrongAnswerId: answerId,
        });
        setFeedback(
          supportMessage({
            support: decision.support,
            step: currentStep,
            skill: skillGraph[currentStep.skillId],
            sourceTitle: readingCase.sources.find((source) =>
              currentStep.sourceIds.includes(source.id),
            )?.title,
          }),
        );
        return;
      }

      if (decision.kind === "probe") {
        dispatchSession({
          type: "SET_SUPPORT",
          stepId: currentStep.id,
          support: currentSupport,
          wrongAnswerId: answerId,
        });
        dispatchSession({
          type: "BEGIN_PROBE",
          probe: {
            probeId: decision.probe.id,
            misconceptionId: decision.misconceptionId,
            originatingStepId: currentStep.id,
          },
        });
        setFeedback("Before we reteach anything, let’s check exactly which clue caused the problem.");
        return;
      }

      dispatchSession({
        type: "SET_SUPPORT",
        stepId: currentStep.id,
        support: currentSupport,
        wrongAnswerId: answerId,
      });
      beginRepair(decision.clueLabId, decision.misconceptionId);
      return;
    }

    setFeedback(
      currentStep.evidenceContext === "transfer"
        ? "You used the same reading tool in a new example. That is transfer."
        : detective.dialogue.evidence_prompt ?? "Good evidence work.",
    );

    await completeCurrentStep(nextEvents);
  };

  const answerProbe = async (answerId: string) => {
    const pending = session.pendingProbe;
    if (!pending) return;
    const probe = diagnosticProbes[pending.probeId];
    const misconception = misconceptions[pending.misconceptionId];
    const correct = probe.correctAnswerIds.includes(answerId);
    const probeEvent = newEvent({
      learnerId: learner.id,
      skillId: misconception.skillId,
      caseId: readingCase.id,
      itemId: probe.id,
      outcome: correct ? "correct" : "incorrect",
      support: "concept-reminder",
      context: "diagnostic-probe",
      modality: skillGraph[misconception.skillId]?.primaryModality ?? "print",
      misconceptionId: pending.misconceptionId,
    });
    await recordEvidence(probeEvent);

    const decision = decideAfterProbe({ misconception, correct });
    if (decision.kind === "return") {
      dispatchSession({ type: "CLEAR_PROBE" });
      setFeedback(
        "Good. That check suggests the concept itself may be intact. Return to the case and inspect the original evidence again.",
      );
      return;
    }

    beginRepair(decision.clueLabId, pending.misconceptionId);
  };

  const answerRepair = async (answerId: string) => {
    const repair = session.activeRepair;
    if (!repair) return;
    const lab = clueLabs[repair.clueLabId];
    const item = repair.phase === "guided" ? lab.guided : lab.transfer;
    const isCorrect = item.correctAnswerIds.includes(answerId);
    const repairEvent = newEvent({
      learnerId: learner.id,
      skillId: lab.skillId,
      caseId: readingCase.id,
      itemId: item.id,
      outcome: isCorrect ? "correct" : "incorrect",
      support: "reteach",
      context: repair.phase === "transfer" ? "transfer" : "guided-practice",
      modality: skillGraph[lab.skillId]?.primaryModality ?? "print",
      misconceptionId: repair.misconceptionId,
      metadata: { clueLabId: lab.id },
    });
    await recordEvidence(repairEvent);

    if (!isCorrect) {
      setFeedback(
        repair.phase === "guided"
          ? "Use the model above and try the guided clue again."
          : "This is the transfer clue. Apply the same tool without changing the rule you just learned.",
      );
      return;
    }

    if (repair.phase === "guided") {
      dispatchSession({ type: "SET_REPAIR_PHASE", phase: "transfer" });
      setFeedback("Good. Now use the same tool in a different example.");
      return;
    }

    const note = notebookEntryFromClueLab({
      learnerId: learner.id,
      clueLab: lab,
      sourceCaseId: readingCase.id,
    });
    await repository.saveNotebookEntry(note);
    const scheduledRepairReview = scheduleReviewIfNeeded({
      existing: reviews,
      learnerId: learner.id,
      skillId: lab.skillId,
      sourceCaseId: readingCase.id,
      delayDays: 3,
      reason: "repair-follow-up",
    });
    if (scheduledRepairReview.created) {
      await repository.saveScheduledReview(scheduledRepairReview.review);
    }
    await refreshSupportingStores();
    dispatchSession({ type: "RETURN_FROM_REPAIR" });
    setFeedback(lab.returnMessage);
  };

  const playPlacementAudio = () => {
    if (!placementProbe?.audioText || !learner.accessibility.narrationEnabled) return;
    speakDetectiveText({
      text: placementProbe.audioText,
      detective,
      preferences: learner.accessibility,
      onUnavailable: () => setFeedback("Audio playback is not available in this browser."),
    });
  };

  const updateAccessibility = <K extends keyof LearnerProfile["accessibility"]>(
    key: K,
    value: LearnerProfile["accessibility"][K],
  ) => {
    setLearner((current) => ({
      ...current,
      accessibility: { ...current.accessibility, [key]: value },
      updatedAt: new Date().toISOString(),
    }));
  };

  const noteApproximatePhonics = (message: string) => {
    setPhonicsNotice(message);
    if (phonicsNoticeTimer.current) clearTimeout(phonicsNoticeTimer.current);
    phonicsNoticeTimer.current = setTimeout(() => setPhonicsNotice(""), 4000);
  };

  const playTeachingAudio = (text: string) => {
    if (!learner.accessibility.narrationEnabled) {
      setFeedback("Read-aloud is currently turned off in Reading Controls.");
      return;
    }
    // Pronunciation-critical phonics is routed through the phonics policy so that
    // approved human recordings are used when present, and browser TTS is never
    // treated as the authoritative pronunciation while a recording is pending.
    const resolution = resolveAudio(text);
    if (resolution.category === "authoritative-phonics") {
      if (resolution.status === "recorded") {
        setPhonicsNotice("");
        const audio = new Audio(resolution.url);
        audio.play().catch(() => {
          noteApproximatePhonics("Approximate sound — final recording coming soon.");
          speakDetectiveText({
            text: resolution.asset.ttsApproximation ?? text,
            detective,
            preferences: learner.accessibility,
            ...speakingHandlers(),
          });
        });
        return;
      }
      // Recording still pending: voice a clearer approximation and mark it.
      noteApproximatePhonics("Approximate sound — final recording coming soon.");
      speakDetectiveText({
        text: resolution.ttsApproximation ?? text,
        detective,
        preferences: learner.accessibility,
        onUnavailable: () => setFeedback("Audio playback is not available in this browser."),
        ...speakingHandlers(),
      });
      return;
    }
    setPhonicsNotice("");
    speakDetectiveText({
      text,
      detective,
      preferences: learner.accessibility,
      onUnavailable: () => setFeedback("Audio playback is not available in this browser."),
      ...speakingHandlers(),
    });
  };

  const playCurrentTeachingNarration = () => {
    if (!teachingSession || !activeTeachingModule || !activeTeachingVariant) return;
    const skill = skillGraph[activeTeachingModule.skillId];
    let text = "";
    if (teachingSession.phase === "discover") {
      text = `${activeTeachingVariant.discover.title}. ${activeTeachingVariant.discover.body}`;
    } else if (teachingSession.phase === "explain") {
      text = `What is happening? ${activeTeachingVariant.explanation}`;
    } else if (teachingSession.phase === "model") {
      const modelSource = activeTeachingVariant.model.sourceBody ? ` Example: ${activeTeachingVariant.model.sourceBody}.` : "";
      const modelAudio = activeTeachingVariant.model.audioText ? ` Listen: ${activeTeachingVariant.model.audioText}.` : "";
      text = `Watch how I work this clue.${modelSource}${modelAudio} ${detective.name} thinks aloud. ${activeTeachingVariant.model.thinking}`;
    } else if (["together", "supported", "independent", "transfer"].includes(teachingSession.phase)) {
      const item = teachingSession.phase === "together"
        ? activeTeachingVariant.together
        : teachingSession.phase === "supported"
          ? activeTeachingVariant.supported
          : teachingSession.phase === "independent"
            ? activeTeachingVariant.independent
            : activeTeachingVariant.transfer;
      const spokenSource = item.sourceBody && skill?.domain !== "decoding" ? ` ${item.sourceBody}.` : "";
      const auditoryClue = item.audioText ? ` Listen carefully: ${item.audioText}.` : "";
      text = `${item.prompt}.${spokenSource}${auditoryClue}`;
    }
    if (text) playTeachingAudio(text);
  };

  // --- Grown-up gate (§7) -------------------------------------------------
  const enterGrownUpArea = () => {
    setAccessibilityOpen(false);
    if (grownUpVerified) {
      setScreen("educator");
      return;
    }
    setGateAnswer("");
    setGateError("");
    setGrownUpGate({ a: 3 + Math.floor(Math.random() * 6), b: 2 + Math.floor(Math.random() * 6) });
  };

  const submitGrownUpGate = () => {
    if (!grownUpGate) return;
    if (Number(gateAnswer.trim()) === grownUpGate.a + grownUpGate.b) {
      setGrownUpVerified(true);
      setGrownUpGate(undefined);
      setGateError("");
      setScreen("educator");
    } else {
      setGateError("That is not the answer. Please try again.");
    }
  };

  // --- Learner data management (§8) ---------------------------------------
  const collectLearnerData = () => {
    const store: Record<string, unknown> = {};
    for (const key of RD_ALL_KEYS) {
      const raw = globalThis.localStorage?.getItem(key);
      if (raw != null) {
        try {
          store[key] = JSON.parse(raw);
        } catch {
          store[key] = raw;
        }
      }
    }
    const masteredCount = Object.values(learner.skillStates ?? {}).filter(
      (state) => state.mastery === "independent" || state.mastery === "transferred" || state.mastery === "secure",
    ).length;
    return {
      exportedAt: new Date().toISOString(),
      app: "Reading Detective",
      version: APP_VERSION,
      note: "This file contains only what is stored in this browser on this device. It is not uploaded anywhere.",
      learner: {
        id: learner.id,
        presentationStage: learner.presentationStage,
        readingDevelopment: learner.readingDevelopment,
        detective: learner.detective,
        skillsWithEvidence: Object.keys(learner.skillStates ?? {}).length,
        skillsMasteredOrTransferred: masteredCount,
      },
      rawStorage: store,
    };
  };

  const downloadFile = (filename: string, contents: string, type: string) => {
    try {
      const blob = new Blob([contents], { type });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      setTimeout(() => URL.revokeObjectURL(url), 0);
      setDataMessage(`Saved ${filename} to this device's downloads.`);
    } catch {
      setDataMessage("This browser blocked the download. You can try again or use a different browser.");
    }
  };

  const exportLearnerJson = () => {
    downloadFile(`reading-detective-${learner.id}.json`, JSON.stringify(collectLearnerData(), null, 2), "application/json");
  };

  const exportLearnerReadable = () => {
    const data = collectLearnerData();
    const lines = [
      "Reading Detective — Learner Data Summary",
      `Exported: ${data.exportedAt}`,
      "",
      `Presentation stage: ${data.learner.presentationStage}`,
      `Reading development: ${data.learner.readingDevelopment}`,
      `Detective: ${data.learner.detective?.id ?? "—"}`,
      `Skills with recorded evidence: ${data.learner.skillsWithEvidence}`,
      `Skills mastered or transferred: ${data.learner.skillsMasteredOrTransferred}`,
      "",
      "This summary reflects only data stored in this browser on this device.",
      "It is not a test score, diagnosis, or grade level.",
    ];
    downloadFile(`reading-detective-${learner.id}-summary.txt`, lines.join("\n"), "text/plain");
  };

  const resetProgress = async () => {
    for (const key of RD_PROGRESS_KEYS) globalThis.localStorage?.removeItem(key);
    const clearedLearner: LearnerProfile = { ...learner, skillStates: {}, placement: undefined };
    await repository.saveLearner(clearedLearner);
    setPendingDataAction(undefined);
    setDataMessage("Learning progress was reset for this learner. Reloading a fresh start…");
    setTimeout(() => globalThis.location?.reload(), 400);
  };

  const deleteAllData = () => {
    for (const key of RD_ALL_KEYS) globalThis.localStorage?.removeItem(key);
    setPendingDataAction(undefined);
    setDataMessage("All Reading Detective data on this device was deleted. Reloading…");
    setTimeout(() => globalThis.location?.reload(), 400);
  };

  const playUiNarration = (text: string) => {
    if (!learner.accessibility.narrationEnabled) {
      setFeedback("Voice is off. Turn Voice on in the speaker controls.");
      return;
    }
    speakDetectiveText({
      text,
      detective,
      preferences: learner.accessibility,
      onUnavailable: () => setFeedback("Audio playback is not available in this browser."),
      ...speakingHandlers(),
    });
  };

  const playRepairNarration = () => {
    if (!session.activeRepair) return;
    const lab = clueLabs[session.activeRepair.clueLabId];
    const phase = session.activeRepair.phase;
    const text = phase === "discover"
      ? `${lab.title}. ${lab.concept}. Here is an example. ${lab.model}`
      : `${phase === "guided" ? "Let’s try one together." : "Now try a new clue."} ${phase === "guided" ? lab.guided.prompt : lab.transfer.prompt}`;
    playUiNarration(text);
  };

  const requestMentorClue = () => {
    if (!currentStep || session.status !== "active") return;
    const support = nextSupportLevel(currentSupport);
    dispatchSession({ type: "SET_SUPPORT", stepId: currentStep.id, support });
    setFeedback(
      supportMessage({
        support,
        step: currentStep,
        skill: skillGraph[currentStep.skillId],
        sourceTitle: readingCase.sources.find((source) => currentStep.sourceIds.includes(source.id))?.title,
      }),
    );
  };

  const speak = (text: string, target: "target-word" | "sentence" | "instructions" | "source") => {
    if (!learner.accessibility.narrationEnabled || !currentStep) return;
    const skill = skillGraph[currentStep.skillId];
    if (!canReadAloud(skill, target, true)) {
      setFeedback("This clue stays silent because decoding the word is the skill being measured.");
      return;
    }
    if (target === "source" || target === "sentence") {
      setNarrationUse((current) => ({ ...current, [currentStep.id]: true }));
    }
    speakDetectiveText({
      text,
      detective,
      preferences: learner.accessibility,
      onUnavailable: () => setFeedback("Audio playback is not available in this browser."),
      ...speakingHandlers(),
    });
  };

  if (booting) {
    return <main id="main-content" className="boot-screen">Opening Reading Detective…</main>;
  }

  const appClass = [
    "app",
    `stage-${stageMeta[learner.presentationStage].color}`,
    learner.accessibility.increasedSpacing ? "spacing-increased" : "",
    learner.accessibility.contrast === "high" ? "contrast-high" : "",
    learner.accessibility.reducedMotion ? "reduced-motion" : "",
    learner.accessibility.focusMode ? "focus-mode" : "",
    isSpeaking ? "app-speaking" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={appClass}
      style={{ "--reader-scale": learner.accessibility.textScale } as CSSProperties}
    >
      <a className="skip-link" href="#main-content">Skip to main content</a>
      {celebration && (
        <div className={`result-flourish tone-${celebration.tone}`} aria-hidden="true" key={celebration.id}>
          {celebration.tone === "correct" ? (
            <>
              <span className="flourish-badge">✓</span>
              {isYoungLearner && (
                <span className="flourish-stars">
                  {["✦", "★", "✧", "✦", "★", "✧"].map((star, index) => (
                    <span className="flourish-star" style={{ "--star-index": index } as CSSProperties} key={index}>{star}</span>
                  ))}
                </span>
              )}
            </>
          ) : (
            <span className="flourish-badge retry">↻</span>
          )}
        </div>
      )}
      {phonicsNotice && (
        <p className="phonics-notice" role="status" aria-live="polite">
          <span aria-hidden="true">🎧</span> {phonicsNotice}
        </p>
      )}
      {grownUpGate && (
        <div className="gate-backdrop" role="dialog" aria-modal="true" aria-labelledby="gate-title">
          <div className="gate-card">
            <h2 id="gate-title"><span aria-hidden="true">🔒</span> Grown-Up Check</h2>
            <p>This area is for grown-ups. Please answer to continue:</p>
            <p className="gate-question">What is {grownUpGate.a} + {grownUpGate.b}?</p>
            <label className="gate-field">
              <span className="visually-hidden">Answer</span>
              <input
                type="number"
                inputMode="numeric"
                className="spell-input"
                value={gateAnswer}
                onChange={(event) => setGateAnswer(event.target.value)}
                onKeyDown={(event) => { if (event.key === "Enter") submitGrownUpGate(); }}
                autoFocus
              />
            </label>
            {gateError && <p className="gate-error" role="alert">{gateError}</p>}
            <div className="interaction-actions">
              <button className="secondary" onClick={() => { setGrownUpGate(undefined); setGateError(""); }}>Cancel</button>
              <button className="primary" onClick={submitGrownUpGate}>Enter</button>
            </div>
            <p className="quiet gate-note">This keeps the area from being opened by accident. It is not a secure lock and does not protect against a determined child or another person on this device.</p>
          </div>
        </div>
      )}
      <header className="topbar">
        <button className="brand-button" onClick={() => setScreen(screen === "welcome" ? "welcome" : "headquarters")}>
          <span className="brand">READING DETECTIVE</span>
          <span className="tagline">EVERY WORD LEAVES CLUES.</span>
        </button>
        <div className="core-loop" aria-label="Reading Detective learning loop">
          <span>Investigate</span><span>Understand</span><span>Prove</span><span>Decide</span>
        </div>
        <button className="utility-button" onClick={() => setAccessibilityOpen((value) => !value)}>
          Accessibility
        </button>
      </header>

      <div
        className={`stage-environment ${screen === "welcome" ? "welcome-environment" : ""}`}
        aria-hidden="true"
        style={{ backgroundImage: `url(${screen === "welcome" ? "assets/environments/welcome-headquarters.jpg" : stageEnvironmentPath(learner.presentationStage)})` }}
      />

      {accessibilityOpen && (
        isYoungLearner && screen !== "educator" ? (
          <aside className="accessibility-panel child-controls" aria-label="Young Investigator controls">
            <div className="panel-heading">
              <strong><span aria-hidden="true">🎛️</span> My Controls</strong>
              <button aria-label="Close controls" onClick={() => setAccessibilityOpen(false)}>✕</button>
            </div>
            <div className="child-control-grid">
              <button
                className={learner.accessibility.narrationEnabled ? "active" : ""}
                onClick={() => {
                  const next = !learner.accessibility.narrationEnabled;
                  updateAccessibility("narrationEnabled", next);
                  if (next) setTimeout(() => playUiNarration("Voice is on."), 20);
                }}
              ><span aria-hidden="true">🔊</span><strong>Voice</strong><small>{learner.accessibility.narrationEnabled ? "On" : "Off"}</small></button>
              <button onClick={() => {
                const next = learner.accessibility.textScale >= 1.4 ? 1 : learner.accessibility.textScale + 0.2;
                updateAccessibility("textScale", Number(next.toFixed(1)));
                playUiNarration(next > 1 ? "Words are bigger." : "Words are regular size.");
              }}><span aria-hidden="true">🔠</span><strong>Bigger Words</strong><small>Tap to change</small></button>
              <button
                className={learner.accessibility.focusMode ? "active" : ""}
                onClick={() => { const next = !learner.accessibility.focusMode; updateAccessibility("focusMode", next); playUiNarration(next ? "Clear screen is on." : "Clear screen is off."); }}
              ><span aria-hidden="true">👁️</span><strong>Clear Screen</strong><small>{learner.accessibility.focusMode ? "On" : "Off"}</small></button>
              <button
                className={learner.accessibility.reducedMotion ? "active" : ""}
                onClick={() => { const next = !learner.accessibility.reducedMotion; updateAccessibility("reducedMotion", next); playUiNarration(next ? "Movement is reduced." : "Movement is on."); }}
              ><span aria-hidden="true">⏸️</span><strong>Less Movement</strong><small>{learner.accessibility.reducedMotion ? "On" : "Off"}</small></button>
            </div>
            <button className="big-listen-button" onClick={() => playUiNarration(detectiveVoicePreviewText(detective))}>🔊 Hear {detective.name}</button>
            <button className="grownup-link" onClick={enterGrownUpArea}>🔒 Grown-Up Settings</button>
          </aside>
        ) : (
          <aside className="accessibility-panel" aria-label="Accessibility controls">
            <div className="panel-heading">
              <strong>Reading Controls</strong>
              <button onClick={() => setAccessibilityOpen(false)}>Close</button>
            </div>
            <label>Text size<input type="range" min="0.9" max="1.5" step="0.1" value={learner.accessibility.textScale} onChange={(event: ChangeEvent<HTMLInputElement>) => updateAccessibility("textScale", Number(event.target.value))} /></label>
            <label><input type="checkbox" checked={learner.accessibility.increasedSpacing} onChange={(event: ChangeEvent<HTMLInputElement>) => updateAccessibility("increasedSpacing", event.target.checked)} /> Increased spacing</label>
            <label><input type="checkbox" checked={learner.accessibility.contrast === "high"} onChange={(event: ChangeEvent<HTMLInputElement>) => updateAccessibility("contrast", event.target.checked ? "high" : "standard")} /> High contrast</label>
            <label><input type="checkbox" checked={learner.accessibility.focusMode} onChange={(event: ChangeEvent<HTMLInputElement>) => updateAccessibility("focusMode", event.target.checked)} /> Focus mode</label>
            <label><input type="checkbox" checked={learner.accessibility.reducedMotion} onChange={(event: ChangeEvent<HTMLInputElement>) => updateAccessibility("reducedMotion", event.target.checked)} /> Reduced motion</label>
            <label><input type="checkbox" checked={learner.accessibility.narrationEnabled} onChange={(event: ChangeEvent<HTMLInputElement>) => updateAccessibility("narrationEnabled", event.target.checked)} /> Read aloud available</label>
            <label>Voice speed<input type="range" min="0.6" max="1.4" step="0.1" value={learner.accessibility.speechRate} onChange={(event: ChangeEvent<HTMLInputElement>) => updateAccessibility("speechRate", Number(event.target.value))} /></label>
            <label>Detective voice<select value={learner.accessibility.voiceName ?? ""} onChange={(event: ChangeEvent<HTMLSelectElement>) => updateAccessibility("voiceName", event.target.value || undefined)}><option value="">Browser default</option>{availableVoices.map((voice) => (<option key={`${voice.name}:${voice.lang}`} value={voice.name}>{voice.name} ({voice.lang})</option>))}</select></label>
            <button className="secondary" onClick={() => speakDetectiveText({ text: detectiveVoicePreviewText(detective), detective, preferences: learner.accessibility, onUnavailable: () => setFeedback("Voice preview is not available in this browser.") })}>Preview {detective.name}'s Voice</button>
          </aside>
        )
      )}

      {screen === "welcome" && (
        <main id="main-content" className="welcome shell voice-first-welcome">
          <section className="welcome-guide-card">
            <DetectiveAvatar detective={detective} appearance={learner.detective.appearance} />
            <div>
              <p className="eyebrow">ECCOOZS LEARNING APP</p>
              <h1>Welcome, Investigator.</h1>
              <button className="big-listen-button" onClick={() => playUiNarration("Welcome to Reading Detective. Pick the picture that feels right for you. You can listen to every choice.")}>🔊 Hear What To Do</button>
            </div>
          </section>
          <p className="pre-reader-action-cue"><span aria-hidden="true">👇</span> Pick a path. Tap the speaker if you want to hear it.</p>
          <div className="stage-grid stage-choice-grid">
            {(Object.keys(stageMeta) as PresentationStage[]).map((stage) => (
              <article className="stage-choice" key={stage}>
                <button className="stage-card" onClick={() => chooseStage(stage)}>
                  <span className="stage-picture" aria-hidden="true">{stageVoiceCopy[stage].icon}</span>
                  <strong>{stageMeta[stage].title}</strong>
                  <span>{stageVoiceCopy[stage].short}</span>
                </button>
                <button className="stage-hear-button" aria-label={`Hear about ${stageMeta[stage].title}`} onClick={() => playUiNarration(stageVoiceCopy[stage].spoken)}>🔊</button>
              </article>
            ))}
          </div>
          <button className="secondary grownup-entry" onClick={enterGrownUpArea}>🔒 Grown-Up / Educator</button>
        </main>
      )}

      {screen === "detective" && (
        <main id="main-content" className="shell">
          <p className="eyebrow">STEP 2</p>
          <h1>Choose Your Detective</h1>
          <p className="lede">{isYoungLearner ? "Tap a face to hear the detective. Pick the one you want to learn with." : "Pick the guide whose style you want. The instruction stays equally rigorous for every detective."}</p>
          {isYoungLearner && <button className="big-listen-button" onClick={() => playUiNarration("Tap a detective picture. You will hear the detective say hello. Pick the detective you want.")}>🔊 Hear What To Do</button>}
          <div className="detective-grid">
            {detectives
              .filter((item) => item.stages.includes(learner.presentationStage))
              .map((item) => (
                <button
                  key={item.id}
                  className={`detective-card ${learner.detective.id === item.id ? "selected" : ""}`}
                  aria-pressed={learner.detective.id === item.id}
                  data-testid={`detective-${item.id}`}
                  onClick={() => { chooseDetective(item.id); if (isYoungLearner) speakDetectiveText({ text: `Hi! I am ${item.name}. ${item.descriptor}. Pick me if you want to learn together.`, detective: item, preferences: learner.accessibility }); }}
                >
                  <DetectiveAvatar detective={item} appearance={learner.detective.id === item.id ? learner.detective.appearance : "fba"} />
                  <strong>{item.name}</strong>
                  <span>{item.descriptor}</span>
                </button>
              ))}
          </div>
          <div className="appearance-panel">
            <div><strong>Appearance</strong><p>Personality, voice, and teaching style stay the same.</p></div>
            <div className="segmented">
              <button aria-pressed={learner.detective.appearance === "fba"} className={learner.detective.appearance === "fba" ? "active" : ""} onClick={() => chooseDetective(learner.detective.id, "fba")}>FBA</button>
              <button aria-pressed={learner.detective.appearance === "caucasian"} className={learner.detective.appearance === "caucasian" ? "active" : ""} onClick={() => chooseDetective(learner.detective.id, "caucasian")}>Caucasian</button>
            </div>
          </div>
          <div className="detective-preview-actions">
            <button
              className="secondary"
              onClick={() => speakDetectiveText({
                text: detectiveVoicePreviewText(detective),
                detective,
                preferences: learner.accessibility,
                onUnavailable: () => setFeedback("Voice preview is not available in this browser."),
              })}
            >
              🔊 Preview {detective.name}'s Voice
            </button>
            <span className="quiet">Voice uses your browser's installed speech voices and your Reading Controls.</span>
          </div>
          {feedback && <p className="feedback" role="status" aria-live="polite">{feedback}</p>}
          <button className="primary" data-testid="begin-placement" onClick={() => void beginPlacement()}>{isYoungLearner ? "▶ Start My First Case" : "Begin First Investigation"}</button>
        </main>
      )}

      {screen === "placement" && placementProbe && (
        <main id="main-content" className="shell placement-case">
          <p className="eyebrow">FIRST INVESTIGATION</p>
          <h1>{placementPlan.caseTitle}</h1>
          <p className="lede">{placementPlan.briefing}</p>
          <div className="placement-layout">
            <section className="placement-source">
              <small>CLUE {placementSession.responses.length + 1}</small>
              {placementProbe.modality === "audio" ? (
                <div className="audio-clue-card">
                  <strong>Spoken Clue</strong>
                  {!isYoungLearner && <p>This clue is intentionally heard rather than shown as text so Reading Detective can separate listening understanding from print reading.</p>}
                  <button className="primary big-play-clue" onClick={playPlacementAudio}>▶ {isYoungLearner ? "Play Sound" : "Play Clue"}</button>
                </div>
              ) : (
                <article className="source-card placement-source-card">
                  <small>{placementProbe.sourceTitle ?? "Case Clue"}</small>
                  <p>{placementProbe.sourceBody}</p>
                </article>
              )}
            </section>
            <aside className="question-panel">
              <div className="mentor-chip">
                <DetectiveAvatar detective={detective} appearance={learner.detective.appearance} small />
                <div><strong>{detective.name}</strong><span>{detective.descriptor}</span></div>
              </div>
              <p className="question-count">{isYoungLearner ? `🔎 Clue ${placementSession.responses.length + 1}` : "Adaptive clue check"}</p>
              <button className="big-listen-button" onClick={() => playUiNarration(placementProbe.prompt)}>🔊 {isYoungLearner ? "Hear What To Do" : "Read directions"}</button>
              <h2>{placementProbe.prompt}</h2>
              <div className={`choice-list ${isYoungLearner ? "pre-reader-choice-list" : ""}`}>
                {placementProbe.choices.map((choice) => (
                  <div className="choice-audio-row" key={choice.id}>
                    <button className="choice-answer" onClick={() => void answerPlacement(choice.id)}>{choice.label}</button>
                    {isYoungLearner && placementProbe.modality === "audio" && (
                      <button className="inline-audio" aria-label={`Hear ${spokenChoiceLabel(choice.label)}`} onClick={() => playUiNarration(spokenChoiceLabel(choice.label))}>🔊</button>
                    )}
                  </div>
                ))}
              </div>
              {feedback && <p className="feedback" role="status" aria-live="polite">{feedback}</p>}
              {!isYoungLearner && <p className="quiet">This investigation adapts to your answers. It does not assign or display a grade level.</p>}
            </aside>
          </div>
        </main>
      )}

      {screen === "placement-complete" && learner.placement && (
        <main id="main-content" className="shell complete">
          <p className="eyebrow">INVESTIGATION COMPLETE</p>
          <h1>We Found a Good Place to Begin</h1>
          <p className="lede">Your Detective Toolkit records reading evidence by skill. It does not turn the result into a grade-equivalent label.</p>
          <div className="profile-grid">
            {Array.from(new Set(placementSession.responses.map((item) => item.skillId))).map((skillId) => {
              const state = learner.skillStates[skillId];
              return (
                <article className="profile-card" key={skillId}>
                  <small>{skillGraph[skillId]?.name ?? skillId}</small>
                  <strong>{state?.mastery ?? "introduced"}</strong>
                  <span>Evidence strength {Math.round((state?.confidence ?? 0) * 100)}%</span>
                </article>
              );
            })}
          </div>
          {learner.placement.printAccessGapSkillIds.length > 0 && (
            <div className="placement-insight">
              <strong>Useful discovery</strong>
              <p>You understood at least one clue better when you heard it than when you read it. Reading Detective will strengthen access to the print while keeping the thinking level age-respectful.</p>
            </div>
          )}
          <p className="quiet">Next instructional focus: {skillGraph[learner.placement.recommendedSkillId]?.name ?? "the next useful reading tool"}.</p>
          <button className="primary" onClick={() => setScreen("headquarters")}>Enter Headquarters</button>
        </main>
      )}

      {screen === "teaching" && teachingSession && activeTeachingModule && activeTeachingVariant && (
        <main id="main-content" className={`shell teaching-shell ${isYoungLearner ? "young-teaching" : ""}`}>
          <p className="eyebrow">{isYoungLearner ? "🔎 NEW READING CLUE" : "READING TOOL — TEACH FIRST"}</p>
          <div className="teaching-header">
            <div>
              <h1>{activeTeachingModule.title}</h1>
              <p className="lede">{isYoungLearner ? "Listen. Watch. Try." : "Reading Detective teaches the tool before asking you to use it independently."}</p>
            </div>
            <aside className="teaching-mentor-panel" aria-label={`${detective.name}, your detective guide`}>
              <DetectiveAvatar detective={detective} appearance={learner.detective.appearance} />
              <div>
                <strong>{detective.name}</strong>
                <span>{detective.descriptor}</span>
                <p>{detective.dialogue.evidence_prompt}</p>
                <button className="mentor-replay" onClick={playCurrentTeachingNarration}>🔊 {isYoungLearner ? "Hear" : "Replay this step"}</button>
              </div>
            </aside>
          </div>
          {isYoungLearner ? (
            <div className="young-phase-dots" aria-label="Lesson progress">
              {["discover", "explain", "model", "together", "supported", "independent", "transfer"].map((phase, index) => (
                <span key={phase} aria-label={`Step ${index + 1}`} className={teachingSession.phase === phase ? "active" : teachingSession.completedPhases.includes(phase as typeof teachingSession.phase) ? "done" : ""}>{teachingSession.phase === phase ? "★" : index + 1}</span>
              ))}
            </div>
          ) : (
            <div className="teaching-phase-strip">
              {["discover", "explain", "model", "together", "supported", "independent", "transfer"].map((phase) => (
                <span key={phase} className={teachingSession.phase === phase ? "active" : teachingSession.completedPhases.includes(phase as typeof teachingSession.phase) ? "done" : ""}>{phase.replace("-", " ")}</span>
              ))}
            </div>
          )}
          <section className="teaching-card">
            {teachingSession.phase === "discover" && (
              <>
                <p className="eyebrow">{isYoungLearner ? "👀 LOOK + LISTEN" : "DISCOVER"}</p>
                <h2>{activeTeachingVariant.discover.title}</h2>
                <p>{activeTeachingVariant.discover.body}</p>
                <button className="big-listen-button" onClick={playCurrentTeachingNarration}>🔊 {isYoungLearner ? "Hear Again" : "Hear this explanation again"}</button>
                <button className="primary" onClick={() => void advanceTeachingInformation()}>{isYoungLearner ? "▶ Next" : "Explain the Clue"}</button>
              </>
            )}
            {teachingSession.phase === "explain" && (
              <>
                <p className="eyebrow">{isYoungLearner ? "💡 WHAT IT MEANS" : "EXPLAIN"}</p>
                <h2>What is happening?</h2>
                <p>{activeTeachingVariant.explanation}</p>
                <button className="big-listen-button" onClick={playCurrentTeachingNarration}>🔊 {isYoungLearner ? "Hear Again" : "Hear this explanation again"}</button>
                <button className="primary" onClick={() => void advanceTeachingInformation()}>{isYoungLearner ? "▶ Show Me" : "Watch a Model"}</button>
              </>
            )}
            {teachingSession.phase === "model" && (
              <>
                <p className="eyebrow">{isYoungLearner ? "👀 WATCH" : "MODEL"}</p>
                {activeTeachingVariant.model.sourceBody && (
                  <article className="source-card teaching-source">
                    <small>{activeTeachingVariant.model.sourceTitle ?? "Example"}</small>
                    <p>{activeTeachingVariant.model.sourceBody}</p>
                  </article>
                )}
                {activeTeachingVariant.model.audioText && (
                  <button className="secondary" onClick={() => playTeachingAudio(activeTeachingVariant.model.audioText!)}>🔊 Hear the sound clue</button>
                )}
                <button className="big-listen-button" onClick={playCurrentTeachingNarration}>🔊 {isYoungLearner ? "Hear + Watch Again" : "Replay model and thinking"}</button>
                <h2>{detective.name} thinks aloud</h2>
                <p>{activeTeachingVariant.model.thinking}</p>
                <button className="primary" onClick={() => void advanceTeachingInformation()}>{isYoungLearner ? "▶ My Turn" : "Practice Together"}</button>
              </>
            )}
            {["together", "supported", "independent", "transfer"].includes(teachingSession.phase) && (() => {
              const item = teachingSession.phase === "together"
                ? activeTeachingVariant.together
                : teachingSession.phase === "supported"
                  ? activeTeachingVariant.supported
                  : teachingSession.phase === "independent"
                    ? activeTeachingVariant.independent
                    : activeTeachingVariant.transfer;
              return (
                <>
                  <p className="eyebrow">{isYoungLearner ? (teachingSession.phase === "together" ? "🤝 TRY WITH ME" : teachingSession.phase === "supported" ? "🧩 YOUR TURN" : teachingSession.phase === "independent" ? "⭐ YOU DO IT" : "🔎 NEW CLUE") : teachingSession.phase.toUpperCase()}</p>
                  {item.sourceBody && (
                    <article className="source-card teaching-source">
                      <small>{item.sourceTitle ?? "Clue"}</small>
                      <p>{item.sourceBody}</p>
                    </article>
                  )}
                  {item.audioText && (
                    <button className="secondary" onClick={() => playTeachingAudio(item.audioText!)}>🔊 Hear the clue again</button>
                  )}
                  <button className="big-listen-button" onClick={playCurrentTeachingNarration}>🔊 {isYoungLearner ? "Hear What To Do" : "Read the directions again"}</button>
                  <h2>{item.prompt}</h2>
                  <TeachingPracticeInteraction
                    item={item}
                    onChoice={(answerId) => void answerTeaching(answerId)}
                    onStructuredAnswer={(correct) => void answerTeaching(undefined, correct)}
                    onSpeak={(text) => playTeachingAudio(text)}
                    simpleMode={isYoungLearner}
                    allowChoiceAudio={isYoungLearner && skillGraph[activeTeachingModule.skillId]?.domain !== "decoding" && (skillGraph[activeTeachingModule.skillId]?.primaryModality === "audio" || ["together", "supported"].includes(teachingSession.phase))}
                  />
                </>
              );
            })()}
          </section>
          {feedback && <p className="feedback" role="status" aria-live="polite">{feedback}</p>}
          {!isYoungLearner && <p className="quiet">{teachingSession.returnTo ? `After this tool, you return directly to Clue ${teachingSession.returnTo.stepIndex + 1} in the case.` : "Your evidence determines how much instruction is needed; strong skills can enter later in the sequence."}</p>}
        </main>
      )}

      {screen === "case" && readingCase && currentStep && (
        session.status === "repairing" && session.activeRepair ? (
          <main id="main-content" className="shell clue-lab">
            <p className="eyebrow">{isYoungLearner ? "🧪 CLUE LAB" : "CLUE LAB — REPAIR & RETURN"}</p>
            <div className="clue-lab-guide"><DetectiveAvatar detective={detective} appearance={learner.detective.appearance} /><div><h1>{clueLabs[session.activeRepair.clueLabId].title}</h1><button className="big-listen-button" onClick={playRepairNarration}>🔊 Hear {isYoungLearner ? "Skylar Help" : "this clue"}</button></div></div>
            <div className="lab-card">
              <h2>{isYoungLearner ? "👀 Look + Listen" : "Discover"}</h2>
              <p>{clueLabs[session.activeRepair.clueLabId].concept}</p>
              <h2>{isYoungLearner ? "👀 Watch" : "Model"}</h2>
              <p>{clueLabs[session.activeRepair.clueLabId].model}</p>
              {session.activeRepair.phase === "discover" && (
                <button className="primary" onClick={() => dispatchSession({ type: "SET_REPAIR_PHASE", phase: "guided" })}>{isYoungLearner ? "▶ My Turn" : "Practice Together"}</button>
              )}
              {session.activeRepair.phase !== "discover" && (() => {
                const lab = clueLabs[session.activeRepair!.clueLabId];
                const item = session.activeRepair!.phase === "guided" ? lab.guided : lab.transfer;
                return (
                  <div className="repair-practice">
                    <p className="eyebrow">{session.activeRepair!.phase === "guided" ? "GUIDED PRACTICE" : "TRANSFER"}</p>
                    <h2>{item.prompt}</h2>
                    <div className="choice-list">
                      {item.choices.map((choice) => (
                        <button key={choice.id} onClick={() => void answerRepair(choice.id)}>{choice.label}</button>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
            {feedback && <p className="feedback" role="status" aria-live="polite">{feedback}</p>}
            {!isYoungLearner && <p className="quiet">Your exact case location is saved. You will return to Clue {session.activeRepair.bookmark.stepIndex + 1}.</p>}
          </main>
        ) : currentStepNeedsTeaching && currentStepTeachingModule ? (
          <main id="main-content" className={`shell teach-first-gate ${isYoungLearner ? "young-teach-gate" : ""}`}>
            {isYoungLearner ? (
              <>
                <div className="young-gate-guide">
                  <DetectiveAvatar detective={detective} appearance={learner.detective.appearance} />
                  <div><p className="eyebrow">🔎 NEW CLUE</p><h1>I’ll show you first.</h1><button className="big-listen-button" onClick={() => playUiNarration(`Before the next clue, I will teach you ${currentStepTeachingModule.title}. Then you can try it.`)}>🔊 Hear {detective.name}</button></div>
                </div>
                <article className="profile-card visual-tool-card"><span aria-hidden="true">🧩</span><strong>{currentStepTeachingModule.title}</strong></article>
                <button className="primary giant-action" onClick={() => void beginTeaching(currentStepTeachingModule.id, { caseId: readingCase.id, stepIndex: session.stepIndex })}>▶ Learn With {detective.name}</button>
              </>
            ) : (
              <>
                <p className="eyebrow">TEACH FIRST</p>
                <h1>Before this clue, learn the tool it uses.</h1>
                <p className="lede">Reading Detective will not test a reading skill that has not been taught or already demonstrated.</p>
                <article className="profile-card"><small>READING TOOL</small><strong>{skillGraph[currentStep.skillId]?.name ?? currentStep.skillId}</strong><span>{currentStepTeachingModule.title}</span></article>
                <button className="primary" onClick={() => void beginTeaching(currentStepTeachingModule.id, { caseId: readingCase.id, stepIndex: session.stepIndex })}>Learn This Tool</button>
                <p className="quiet">Your exact case position is saved. After teaching, you return here and apply the skill immediately.</p>
              </>
            )}
          </main>
        ) : (
          <main id="main-content" className={`shell case-layout ${currentStep.evidenceBoard ? "evidence-case-layout" : ""}`}>
            <section className="case-evidence-area">
              <p className="eyebrow">ACTIVE CASE</p>
              <h1>{readingCase.title}</h1>
              <p className="lede">{readingCase.briefing}</p>
              <div className="source-grid">
                {readingCase.sources
                  .filter((source) => currentStep.sourceIds.includes(source.id))
                  .map((source) => (
                    <article className="source-card" key={source.id}>
                      <div className="source-card-heading">
                        <small>{source.title}</small>
                        <button onClick={() => speak(source.body, currentStep.skillId === "CODE.002" ? "target-word" : "source")}>Read</button>
                      </div>
                      <p>{source.body}</p>
                      {source.intelligence && (
                        <div className="source-intelligence-strip" aria-label="Source information">
                          {source.intelligence.creator && <span><strong>Creator:</strong> {source.intelligence.creator}</span>}
                          {source.intelligence.purpose && <span><strong>Purpose:</strong> {source.intelligence.purpose}</span>}
                          {source.intelligence.proximity && <span><strong>Origin:</strong> {source.intelligence.proximity.replace("-", " ")}</span>}
                          {source.intelligence.originalSourceId && <span><strong>Reposts:</strong> {readingCase.sources.find((item) => item.id === source.intelligence?.originalSourceId)?.title ?? source.intelligence.originalSourceId}</span>}
                        </div>
                      )}
                    </article>
                  ))}
              </div>
              {readingCase.documentIntelligence && <DocumentNavigator readingCase={readingCase} />}
              <ResearchMediaPanel readingCase={readingCase} step={currentStep} />
              <LiteratureAnalysisPanel readingCase={readingCase} />
              <AppliedReadingPanel readingCase={readingCase} />
            </section>
            <aside className="question-panel">
              {mentorPresence === "full" ? (
                <div className="mentor-chip">
                  <DetectiveAvatar detective={detective} appearance={learner.detective.appearance} small />
                  <div><strong>{detective.name}</strong><span>{detective.descriptor}</span></div>
                </div>
              ) : (
                <div className="mentor-on-request">
                  <div>
                    <strong>{readingCase.capstone ? "You lead this investigation." : "Your detective is stepping back."}</strong>
                    <span>{detective.name} is available if you want a clue.</span>
                  </div>
                  <button onClick={requestMentorClue}>Ask Detective</button>
                </div>
              )}
              <p className="question-count">Clue {session.stepIndex + 1} of {readingCase.steps.length}{session.routeMode === "sample" ? " · Transfer Sample" : readingCase.capstone ? " · Final Case" : ""}</p>
              {session.status === "probing" && session.pendingProbe ? (
                <div className="diagnostic-probe">
                  <p className="eyebrow">QUICK CLUE CHECK</p>
                  <h2>{diagnosticProbes[session.pendingProbe.probeId].prompt}</h2>
                  <p className="quiet">This check helps us identify the exact reading tool to strengthen. It is not a penalty.</p>
                  <div className="choice-list">
                    {diagnosticProbes[session.pendingProbe.probeId].choices.map((choice) => (
                      <button key={choice.id} onClick={() => void answerProbe(choice.id)}>{choice.label}</button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2>{currentStep.prompt}</h2>
                  <button className={isYoungLearner ? "big-listen-button" : "question-audio-button"} onClick={() => speak(currentStep.prompt, "instructions")}>🔊 {isYoungLearner ? "Hear What To Do" : "Read directions"}</button>
                  <p className={`support-chip support-${currentSupport}`}>Support: {currentSupport.replace("-", " ")}</p>
                  {currentStep.evidenceBoard ? (
                    <EvidenceBoardPanel
                      readingCase={readingCase}
                      step={currentStep}
                      state={session.evidenceBoards?.[currentStep.id]}
                      onChange={updateEvidenceBoard}
                      onSubmit={(grade) => void submitEvidenceBoard(grade)}
                    />
                  ) : currentStep.responseType === "decision-workbench" && currentStep.decisionId ? (
                    <DecisionWorkbench
                      readingCase={readingCase}
                      decisionId={currentStep.decisionId}
                      onSubmit={(evaluation) => void submitDecisionWorkbench(evaluation)}
                    />
                  ) : (
                    <div className={`choice-list ${isYoungLearner ? "pre-reader-choice-list" : ""}`}>
                      {currentStep.choices?.map((choice) => (
                        <div className="choice-audio-row" key={choice.id}>
                          <button className="choice-answer" onClick={() => void answer(choice.id)}>{choice.label}</button>
                          {isYoungLearner && skillGraph[currentStep.skillId]?.domain !== "decoding" && (
                            <button className="inline-audio" aria-label={`Hear ${spokenChoiceLabel(choice.label)}`} onClick={() => speak(spokenChoiceLabel(choice.label), "instructions")}>🔊</button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              {feedback && <p className="feedback" role="status" aria-live="polite">{feedback}</p>}
            </aside>
          </main>
        )
      )}

      {screen === "review" && activeReview && (
        <main id="main-content" className="shell case-layout">
          <section className="case-evidence-area">
            <p className="eyebrow">NATURAL REVIEW CLUE</p>
            <h1>{activeReview.review.reason === "repair-follow-up" ? "A Repaired Tool Returns" : "An Earlier Tool Returns"}</h1>
            <p className="lede">This is not a repeat worksheet. Reading Detective is checking the same skill in a different context.</p>
            <article className="source-card">
              <div className="source-card-heading">
                <small>{activeReview.item.sourceTitle}</small>
              </div>
              <p>{activeReview.item.sourceBody}</p>
            </article>
          </section>
          <aside className="question-panel">
            <div className="mentor-chip">
              <DetectiveAvatar detective={detective} appearance={learner.detective.appearance} small />
              <div><strong>{detective.name}</strong><span>{detective.descriptor}</span></div>
            </div>
            <p className="question-count">Quiet retention check</p>
            <h2>{activeReview.item.prompt}</h2>
            <div className="choice-list">
              {activeReview.item.choices.map((choice) => (
                <button key={choice.id} onClick={() => void answerReview(choice.id)}>{choice.label}</button>
              ))}
            </div>
            {feedback && <p className="feedback" role="status" aria-live="polite">{feedback}</p>}
            <p className="quiet">The wording, scenario, and answer position can change. The reading skill being checked does not.</p>
          </aside>
        </main>
      )}

      {screen === "complete" && (
        <main id="main-content" className="shell complete">
          <p className="eyebrow">INVESTIGATION COMPLETE</p>
          <h1>Case Closed</h1>
          <p className="lede">We found useful evidence about your reading tools. Your profile records skills—not a stigmatizing grade label.</p>
          <div className="profile-grid">
            {readingCase.targetSkills.map((skillId) => {
              const state = learner.skillStates[skillId];
              return (
                <article className="profile-card" key={skillId}>
                  <small>{skillGraph[skillId]?.name ?? skillId}</small>
                  <strong>{state?.mastery ?? "introduced"}</strong>
                  <span>Evidence strength {Math.round((state?.confidence ?? 0) * 100)}%</span>
                </article>
              );
            })}
          </div>
          <p className="quiet">Delayed retention checks scheduled: {reviews.filter((review) => review.status === "scheduled").length}</p>
          <button className="primary" onClick={() => setScreen("headquarters")}>Enter Headquarters</button>
        </main>
      )}

      {screen === "graduation" && graduationEvaluation && (
        <main id="main-content" className="shell graduation-screen">
          <p className="eyebrow">THE FINAL CASE</p>
          <h1>{graduationEvaluation.status === "graduated" ? "Case Closed." : "Final Case Evidence Review"}</h1>
          <p className="lede">{graduationEvaluation.explanation}</p>
          <div className="graduation-summary">
            <article>
              <small>Competencies demonstrated</small>
              <strong>{graduationEvaluation.passedCompetencies} / {graduationEvaluation.totalCompetencies}</strong>
            </article>
            <article>
              <small>Supported correct attempts</small>
              <strong>{graduationEvaluation.supportedCorrectAttempts}</strong>
            </article>
            <article>
              <small>Status</small>
              <strong>{graduationEvaluation.status === "graduated" ? "Lead Investigator" : "More independent evidence needed"}</strong>
            </article>
          </div>
          <div className="graduation-competencies">
            {graduationEvaluation.competencies.map((competency) => (
              <article key={competency.id} className={competency.passed ? "passed" : "needs-evidence"}>
                <small>{competency.domain.replaceAll("-", " ")}</small>
                <h2>{competency.label}</h2>
                <p>{competency.description}</p>
                <strong>{competency.independentCorrect} of {competency.requiredIndependentCorrect} independent evidence targets demonstrated</strong>
              </article>
            ))}
          </div>
          {graduationEvaluation.status === "graduated" ? (
            <>
              <blockquote className="graduation-message">You didn't just solve the case. You knew what to look for.</blockquote>
              <p className="quiet">Your Detective Notebook and learning evidence remain available. Graduation means the mentor can step back; it does not erase the tools you built.</p>
              <button className="primary" onClick={() => setScreen("headquarters")}>Return to Headquarters</button>
            </>
          ) : (
            <>
              <p className="quiet">There is no failure reset. Reading Detective keeps the evidence you already demonstrated and can target only the independent evidence that remains.</p>
              <button className="primary" onClick={() => void startCase(capstoneProgression.capstoneCaseId, "full")}>Reopen Final Case</button>
              <button className="secondary" onClick={() => setScreen("progress")}>Review Readiness</button>
            </>
          )}
        </main>
      )}

      {screen === "headquarters" && (
        <main id="main-content" className="shell headquarters">
          {isYoungLearner ? (
            <section className="young-hq-guide">
              <DetectiveAvatar detective={detective} appearance={learner.detective.appearance} />
              <div><p className="eyebrow">🔎 HEADQUARTERS</p><h1>Hi, Investigator!</h1><button className="big-listen-button" onClick={() => playUiNarration(`You are at Investigation Headquarters. Your case is ${readingCase.title}. Tap Continue My Case when you are ready.`)}>🔊 Hear {detective.name}</button></div>
            </section>
          ) : (
            <div><p className="eyebrow">INVESTIGATION HEADQUARTERS</p><h1>{stageMeta[learner.presentationStage].title}</h1><p className="lede">The active case stays central. Your tools support the investigation instead of competing with it.</p></div>
          )}
          <div className="active-case-banner">
            <div><small>ACTIVE CASE</small><strong>{readingCase.title}</strong><span>{session.status === "complete" ? "Case closed — revisit anytime" : `Clue ${session.stepIndex + 1} of ${readingCase.steps.length}`}</span></div>
            <button className="primary" onClick={() => void continueLearningRoute()}>{isYoungLearner ? "▶ Continue My Case" : "Continue Investigation"}</button>
          </div>
          {learner.presentationStage === "lead-investigator" && (
            <section className={`capstone-readiness ${capstoneReadiness.ready ? "ready" : "locked"}`}>
              <div>
                <small>FINAL CASE</small>
                <h2>{learner.graduation?.status === "graduated" ? "Lead Investigator — Graduated" : capstoneReadiness.ready ? "The Final Case is unlocked" : "Capstone readiness"}</h2>
                <p>
                  {learner.graduation?.status === "graduated"
                    ? "You proved that the Reading Detective tools can work together independently across a complex multi-source investigation."
                    : capstoneReadiness.ready
                      ? capstoneProgression.learnerMessageWhenReady
                      : capstoneProgression.learnerMessageWhenNotReady}
                </p>
                <div className="readiness-meter" aria-label="Capstone readiness">
                  <span style={{ width: `${Math.round(capstoneReadiness.readinessRate * 100)}%` }} />
                </div>
                <small>{Math.round(capstoneReadiness.readinessRate * 100)}% of capstone evidence tools currently meet the configured readiness thresholds</small>
              </div>
              {learner.graduation?.status === "graduated" ? (
                <span className="graduation-badge">CASE CLOSED · LEAD INVESTIGATOR</span>
              ) : (
                <button
                  className="primary"
                  disabled={!capstoneReadiness.ready}
                  onClick={() => void startCase(capstoneProgression.capstoneCaseId, "full")}
                >
                  {learner.graduation?.status === "needs-more-independent-evidence" ? "Reopen Final Case" : "Open Final Case"}
                </button>
              )}
            </section>
          )}
          {isYoungLearner ? (
            <>
              <div className="hq-grid young-hq-grid">
                <button onClick={() => setScreen("case-map")}><span className="hq-icon" aria-hidden="true">🗺️</span><strong>My Cases</strong></button>
                <button onClick={() => setScreen("notebook")}><span className="hq-icon" aria-hidden="true">📖</span><strong>My Notebook</strong></button>
                <button onClick={() => setScreen("progress")}><span className="hq-icon" aria-hidden="true">⭐</span><strong>My Progress</strong></button>
                <button onClick={() => setAccessibilityOpen(true)}><span className="hq-icon" aria-hidden="true">🔊</span><strong>My Controls</strong></button>
              </div>
              <button className="grownup-link hq-grownup" onClick={enterGrownUpArea}>🔒 Grown-Up / Educator</button>
            </>
          ) : (
            <div className="hq-grid">
              <button onClick={() => setScreen("case-map")}><strong>Case Map</strong><span>Your investigation path</span></button>
              <button onClick={() => setScreen("notebook")}><strong>Detective Notebook</strong><span>{notebook.length} tools collected</span></button>
              <button onClick={() => setScreen("progress")}><strong>My Progress</strong><span>Skills and recent growth</span></button>
              <button onClick={enterGrownUpArea}><strong>Educator Insight</strong><span>Evidence, support, repairs, and next focus</span></button>
              <button onClick={() => setAccessibilityOpen(true)}><strong>Reading Controls</strong><span>Text, narration, focus, motion</span></button>
            </div>
          )}
        </main>
      )}

      {screen === "case-map" && (
        <main id="main-content" className="shell">
          <p className="eyebrow">CASE MAP</p>
          <h1>Your Investigation Path</h1>
          <div className="case-map-grid">
            {Object.values(cases)
              .filter((item) => item.presentationStages.includes(learner.presentationStage))
              .map((item) => {
                const progress = caseMap.find((entry) => entry.caseId === item.id);
                const capstoneLocked = Boolean(item.capstone && !capstoneReadiness.ready && learner.graduation?.status !== "graduated");
                return (
                  <article className={`map-case-card ${capstoneLocked ? "locked" : ""}`} key={item.id}>
                    <small>{capstoneLocked ? "locked — readiness evidence required" : item.capstone && learner.graduation?.status === "graduated" ? "graduated" : progress?.status ?? "available"}</small>
                    <h2>{item.title}</h2>
                    <p>{item.briefing}</p>
                    {item.capstone && capstoneLocked && capstoneReadiness.nextGapSkillId && (
                      <p className="quiet">Next readiness gap: {skillGraph[capstoneReadiness.nextGapSkillId]?.name ?? capstoneReadiness.nextGapSkillId}</p>
                    )}
                    <button disabled={capstoneLocked} onClick={() => void startCase(item.id)}>{capstoneLocked ? "Final Case Locked" : progress?.status === "in-progress" ? "Continue" : item.capstone ? "Open Final Case" : "Open Case"}</button>
                  </article>
                );
              })}
          </div>
          <button className="secondary" onClick={() => setScreen("headquarters")}>Back to Headquarters</button>
        </main>
      )}

      {screen === "notebook" && (
        <main id="main-content" className="shell">
          <p className="eyebrow">DETECTIVE NOTEBOOK</p>
          <h1>Your Reading Tools</h1>
          {notebook.length === 0 ? (
            <p className="lede">Tools you genuinely learn in Clue Labs will appear here. The notebook grows with you.</p>
          ) : (
            <div className="notebook-grid">
              {notebook.map((entry) => (
                <article className="notebook-card" key={entry.id}>
                  <small>{skillGraph[entry.skillId]?.name ?? entry.skillId}</small>
                  <h2>{entry.title}</h2>
                  <p>{entry.summary}</p>
                </article>
              ))}
            </div>
          )}
          <button className="secondary" onClick={() => setScreen("headquarters")}>Back to Headquarters</button>
        </main>
      )}

      {screen === "educator" && (
        <main id="main-content" className="shell educator-dashboard">
          <p className="eyebrow">GROWN-UP / EDUCATOR</p>
          <h1>Educator Insight</h1>
          <p className="lede">This view explains the reading evidence underneath performance: strengths, developing tools, support use, repairs, and the next instructional focus. It does not produce a diagnosis or grade-equivalent label.</p>

          <div className="profile-grid">
            <article className="profile-card">
              <small>Independent performance</small>
              <strong>{educatorReport.support.independentAccuracy == null ? "Not enough evidence" : `${Math.round(educatorReport.support.independentAccuracy * 100)}%`}</strong>
              <span>{educatorReport.support.independentCorrect} of {educatorReport.support.independentAttempts} independent attempts correct</span>
            </article>
            <article className="profile-card">
              <small>Support use</small>
              <strong>{educatorReport.support.supportedAttemptRate == null ? "Not enough evidence" : `${Math.round(educatorReport.support.supportedAttemptRate * 100)}%`}</strong>
              <span>of practice attempts used some instructional support</span>
            </article>
            <article className="profile-card">
              <small>Foundation teaching coverage</small>
              <strong>{Math.round(educatorReport.teachingCoverage.foundationCoverageRate * 100)}%</strong>
              <span>{educatorReport.teachingCoverage.foundationCoveredSkillCount} of {educatorReport.teachingCoverage.foundationSkillCount} foundation skills have age-respecting Teach-First modules for this presentation stage</span>
            </article>
            <article className="profile-card">
              <small>Pending retention checks</small>
              <strong>{reviews.filter((review) => review.status === "scheduled").length}</strong>
              <span>skills scheduled to reappear naturally in new contexts</span>
            </article>
          </div>

          {educatorReport.nextFocus && (
            <div className="placement-insight">
              <strong>Suggested next focus: {educatorReport.nextFocus.name}</strong>
              <p>{educatorReport.nextFocus.rationale}</p>
              <p><strong>Instructional response:</strong> {educatorReport.nextFocus.suggestedSupport}</p>
            </div>
          )}

          <h2>Strengths</h2>
          <p className="quiet">Evidence strength is a heuristic summary of the practice and transfer a learner has demonstrated. It is not a statistically validated confidence measure or a test score.</p>
          <div className="profile-grid">
            {educatorReport.strengths.length === 0 ? <p className="quiet">Independent or transferred strengths will appear as evidence accumulates.</p> : educatorReport.strengths.slice(0, 8).map((item) => (
              <article className="profile-card" key={`strength-${item.skillId}`}><small>{item.domain}</small><strong>{item.name}</strong><span>{item.mastery} · {Math.round(item.confidence * 100)}% evidence strength</span></article>
            ))}
          </div>

          <h2>Growing tools</h2>
          <div className="profile-grid">
            {educatorReport.growingTools.length === 0 ? <p className="quiet">No developing tools are currently confirmed.</p> : educatorReport.growingTools.slice(0, 8).map((item) => (
              <article className="profile-card" key={`growing-${item.skillId}`}><small>{item.domain}</small><strong>{item.name}</strong><span>{item.mastery} · independent accuracy {item.independentAccuracy == null ? "not established" : `${Math.round(item.independentAccuracy * 100)}%`}</span></article>
            ))}
          </div>

          <h2>New tools coming next</h2>
          <div className="profile-grid">
            {educatorReport.newTools.slice(0, 6).map((item) => (
              <article className="profile-card" key={`new-${item.skillId}`}><small>{item.domain}</small><strong>{item.name}</strong><span>{item.mastery === "not-introduced" ? "Not yet introduced" : "Introduced; more evidence needed"}</span></article>
            ))}
          </div>

          {educatorReport.reviewNeeded.length > 0 && (
            <>
              <h2>Review needed</h2>
              <div className="profile-grid">{educatorReport.reviewNeeded.map((item) => (
                <article className="profile-card" key={`review-${item.skillId}`}><small>{item.domain}</small><strong>{item.name}</strong><span>Recent evidence suggests a fresh transfer check rather than restarting the whole unit.</span></article>
              ))}</div>
            </>
          )}

          <h2>Confirmed misconception evidence</h2>
          {educatorReport.confirmedMisconceptions.length === 0 ? (
            <p className="quiet">No misconception pattern has enough evidence to be considered confirmed. A single wrong response is never enough.</p>
          ) : (
            <div className="profile-grid">{educatorReport.confirmedMisconceptions.map((item) => (
              <article className="profile-card" key={`mis-${item.misconceptionId}`}><small>{skillGraph[item.skillId]?.name ?? item.skillId}</small><strong>{item.label}</strong><span>{item.diagnosticProbeConfirmed ? "Confirmed by diagnostic probe" : `Confirmed after ${item.incorrectEvidenceCount} related errors`}</span></article>
            ))}</div>
          )}

          <h2>Recently repaired tools</h2>
          {educatorReport.recentRepairs.length === 0 ? (
            <p className="quiet">Repair & Return successes will appear here after a Clue Lab transfer is completed.</p>
          ) : (
            <div className="profile-grid">{educatorReport.recentRepairs.map((item) => (
              <article className="profile-card" key={`repair-${item.skillId}`}><small>Repair & Return</small><strong>{item.name}</strong><span>Transferred successfully after targeted repair.</span></article>
            ))}</div>
          )}

          <h2>Reading vs listening observations</h2>
          {educatorReport.modalityObservations.length === 0 ? (
            <p className="quiet">Reading Detective waits for repeated evidence in both print and audio before surfacing a modality pattern.</p>
          ) : educatorReport.modalityObservations.map((item) => (
            <div className="placement-insight" key={`modality-${item.skillId}`}><strong>{item.name}</strong><p>{item.observation}</p><p>Print: {Math.round((item.printAccuracy ?? 0) * 100)}% across {item.printAttempts} attempts · Listening: {Math.round((item.audioAccuracy ?? 0) * 100)}% across {item.audioAttempts} attempts.</p></div>
          ))}

          <h2>Educator guardrails</h2>
          {educatorReport.notes.map((note) => <p className="quiet" key={note}>{note}</p>)}

          <h2>Learner data</h2>
          <div className="data-controls">
            <p className="quiet">This learner's progress is stored only in this browser on this device. Reading Detective has no account system and sends learner data to no server. Clearing this browser's data, or using a different browser or device, means this progress will not be available.</p>
            <div className="data-current">
              <strong>Current learner</strong>
              <span>Stage: {stageMeta[learner.presentationStage].title} · Detective: {detective.name} · Skills with evidence: {Object.keys(learner.skillStates ?? {}).length}</span>
            </div>
            {dataMessage && <p className="data-message" role="status" aria-live="polite">{dataMessage}</p>}
            <div className="data-actions">
              <button className="secondary" onClick={exportLearnerReadable}>Export readable summary</button>
              <button className="secondary" onClick={exportLearnerJson}>Export full data (JSON)</button>
            </div>
            <div className="data-danger">
              <h3>Careful: these change or remove data</h3>
              {pendingDataAction === "reset" ? (
                <div className="data-confirm" role="alertdialog" aria-label="Confirm reset progress">
                  <p><strong>Reset this learner's progress?</strong> Evidence, placement, and review history will be cleared and the learner will start again. The detective and stage are kept. This cannot be undone.</p>
                  <div className="interaction-actions">
                    <button className="secondary" onClick={() => setPendingDataAction(undefined)}>Keep my progress</button>
                    <button className="danger" onClick={() => void resetProgress()}>Yes, reset progress</button>
                  </div>
                </div>
              ) : pendingDataAction === "delete" ? (
                <div className="data-confirm" role="alertdialog" aria-label="Confirm delete all data">
                  <p><strong>Delete all Reading Detective data on this device?</strong> Every learner profile and all progress stored in this browser will be permanently removed. This cannot be undone.</p>
                  <div className="interaction-actions">
                    <button className="secondary" onClick={() => setPendingDataAction(undefined)}>Cancel</button>
                    <button className="danger" onClick={deleteAllData}>Yes, delete everything</button>
                  </div>
                </div>
              ) : (
                <div className="interaction-actions">
                  <button className="secondary" onClick={() => { setDataMessage(""); setPendingDataAction("reset"); }}>Reset progress…</button>
                  <button className="secondary" onClick={() => { setDataMessage(""); setPendingDataAction("delete"); }}>Delete all data…</button>
                </div>
              )}
            </div>
          </div>

          <button className="secondary" onClick={() => { setGrownUpVerified(false); setScreen(learner.placement ? "headquarters" : "welcome"); }}>{learner.placement ? "Back to Headquarters" : "Back to Welcome"}</button>
        </main>
      )}

      {screen === "progress" && (
        <main id="main-content" className="shell">
          <p className="eyebrow">MY INVESTIGATOR PROFILE</p>
          <h1>Skills, Not Labels</h1>
          <div className="profile-grid">
            {Object.values(learner.skillStates).length === 0 ? (
              <p className="lede">Complete investigations to build your evidence profile.</p>
            ) : (
              Object.values(learner.skillStates).map((state) => (
                <article className="profile-card" key={state.skillId}>
                  <small>{skillGraph[state.skillId]?.name ?? state.skillId}</small>
                  <strong>{state.mastery}</strong>
                  <span>Evidence strength {Math.round(state.confidence * 100)}%</span>
                </article>
              ))
            )}
          </div>
          {learner.presentationStage === "lead-investigator" && (
            <section className="progress-readiness">
              <h2>Final Case Readiness</h2>
              <div className="readiness-gates">
                {capstoneReadiness.requirements.map((requirement) => (
                  <article key={requirement.id} className={requirement.satisfied ? "gate-ready" : "gate-growing"}>
                    <small>{requirement.domain.replaceAll("-", " ")}</small>
                    <strong>{requirement.label}</strong>
                    <span>{requirement.satisfied ? "Ready" : `${requirement.satisfiedSkillIds.length} of ${requirement.minimumSatisfied} required tools currently ready`}</span>
                  </article>
                ))}
              </div>
            </section>
          )}
          <p className="quiet">Scheduled retention checks: {reviews.filter((review) => review.status === "scheduled").length}</p>
          <button className="secondary" onClick={() => setScreen("headquarters")}>Back to Headquarters</button>
        </main>
      )}
    </div>
  );
}
