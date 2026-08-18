import { getPropertyMilestone, getShopCategoriesForStage, getShopItemsForStage, rankMeets, shopItems } from "./game/content/shop.js";
import { getVocabularyForStage, getVocabularyWord, vocabulary } from "./game/content/vocabulary.js";
import { displayRank, getStageDefinition, stageDefinitions } from "./game/content/stages.js";
import { getElementaryConceptSupport, getElementaryZone } from "./game/content/elementarySupports.js";
import { civicProjects, domainCompletion, getCivicProject, highSchoolDomains, nextCivicProject } from "./game/content/highSchoolProjects.js";
import { createChallenge, answerIsCorrect } from "./game/learning/challenges.js";
import { getElementaryTeachingResponse } from "./game/learning/elementaryGuidance.js";
import { buildHighSchoolEducatorInsights } from "./game/learning/educatorInsights.js";
import { buildEducatorReport, educatorReportFilename, educatorReportToCSV } from "./game/learning/progressExport.js";
import { createProfileBackup, parseProfileBackup, backupFilename } from "./game/persistence/profileBackup.js";
import { createPlayerRepository } from "./game/persistence/repository.js";
import {
  advanceChallenge,
  completeSession,
  purchaseItem,
  recordChallengeResult,
  retryChallenge,
  startSession,
  switchStage
} from "./game/state/gameDomain.js";
import { speakSequence, speakWord } from "./game/audio/speech.js";
import {
  advanceAppliedStep,
  appliedProjectView,
  completeAppliedProject,
  recordAppliedReasoning,
  recordAppliedRecommendation,
  recordAppliedVocabulary,
  recordDecisionRevisionImpact,
  recordDecisionRevisionResponse,
  recordAssumptionCheck,
  recordControllingConstraint,
  recordEvidenceChainSupport,
  recordSourceConfidence,
  recordSourceLimitation,
  recordSourceStrength,
  reviewProjectEvidence,
  saveAppliedRationale,
  startAppliedProject,
  toggleEvidenceChainSupport
} from "./game/state/appliedProjectDomain.js";

const repository = createPlayerRepository();
const app = document.querySelector("#app");
const validScreens = new Set(["home", "trail", "project", "shop", "estate", "collection", "settings", "progress", "summary"]);
const requestedScreen = new URLSearchParams(window.location.search).get("screen");

let profile = repository.load();
let screen = profile.onboardingComplete && validScreens.has(requestedScreen) ? requestedScreen : "home";
let ui = freshTransientState();

function freshTransientState() {
  return {
    selectedOption: null,
    typedResponse: "",
    buildTokens: [],
    feedback: null,
    hintShown: false,
    notice: "",
    previewItemId: null,
    shopCategory: "All",
    resetArmed: false,
    resetPhrase: "",
    projectFeedback: null,
    projectSelectedIndex: null
  };
}

let pendingVisualDiff = null;
let lastRenderedScreen = null;

function visualProfileSnapshot(source = profile) {
  return {
    credits: Number(source?.credits || 0),
    stage: source?.stage || "Elementary",
    trailProgress: Number.isInteger(source?.activeSession?.encounterIndex) ? source.activeSession.encounterIndex : null,
    ownedItems: new Set(source?.ownedItems || []),
    construction: Object.fromEntries(Object.entries(source?.construction || {}).map(([id, record]) => [id, record?.stage || "Installed"]))
  };
}

function save(nextProfile) {
  const before = visualProfileSnapshot(profile);
  profile = repository.save(nextProfile);
  const after = visualProfileSnapshot(profile);
  const newlyOwned = [...after.ownedItems].filter((id) => !before.ownedItems.has(id));
  const constructionChanged = Object.keys(after.construction).filter((id) => before.construction[id] && before.construction[id] !== after.construction[id]);
  pendingVisualDiff = {
    creditsDelta: after.credits - before.credits,
    trailFrom: before.trailProgress,
    trailTo: after.trailProgress,
    stage: after.stage,
    newlyOwned,
    constructionChanged
  };
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function downloadTextFile(filename, text, mimeType = "text/plain;charset=utf-8") {
  const blob = new Blob([text], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportLearnerBackup() {
  const backup = createProfileBackup(profile, Date.now());
  downloadTextFile(backupFilename(new Date(backup.exportedAt)), JSON.stringify(backup, null, 2), "application/json;charset=utf-8");
  ui.notice = "Learner backup downloaded. Keep it somewhere private if it contains a real learner’s progress.";
  render();
}

function exportEducatorReport(format = "csv") {
  const report = buildEducatorReport(profile, Date.now());
  if (format === "json") {
    downloadTextFile(educatorReportFilename(profile.stage, new Date(report.exportedAt), "json"), JSON.stringify(report, null, 2), "application/json;charset=utf-8");
  } else {
    downloadTextFile(educatorReportFilename(profile.stage, new Date(report.exportedAt), "csv"), educatorReportToCSV(report), "text/csv;charset=utf-8");
  }
  ui.notice = `Adult / Educator ${format.toUpperCase()} report downloaded without answer keys.`;
  render();
}

function isTextEntryTarget(target) {
  return Boolean(target?.closest?.('input, textarea, select, [contenteditable="true"]'));
}

function icon(name, size = 20) {
  const paths = {
    arrow: '<path d="M5 12h14M14 6l6 6-6 6"/>',
    back: '<path d="M19 12H5m6-6-6 6 6 6"/>',
    book: '<path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22V5.5Zm16 0A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22V5.5Z"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    coins: '<ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v4c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 9v4c0 1.7 3.1 3 7 3s7-1.3 7-3V9M5 13v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4"/>',
    estate: '<path d="M3 21h18M5 21V9l7-6 7 6v12M9 21v-6h6v6M8 10h.01M16 10h.01"/>',
    home: '<path d="M3 11.5 12 4l9 7.5M5.5 10.5V21h13V10.5M9 21v-6h6v6"/>',
    leaf: '<path d="M20 4C12 4 5 7 5 14c0 3 2 5 5 5 7 0 10-7 10-15Z"/><path d="M4 21c3-6 7-9 13-12"/>',
    map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15"/>',
    sound: '<path d="M11 5 6 9H3v6h3l5 4V5Zm4 4a4 4 0 0 1 0 6m3-9a8 8 0 0 1 0 12"/>',
    spark: '<path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Zm7 11 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14ZM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z"/>',
    shop: '<path d="M6 8V6a6 6 0 0 1 12 0v2M4 8h16l-1 13H5L4 8Zm5 4v1m6-1v1"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.4 2.4 0 1 1 3 2.3c-.8.3-.8 1-.8 1.7M12 17h.01"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>'
  };
  return `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.spark}</svg>`;
}

function header() {
  if (!profile.onboardingComplete) {
    return `
      <header class="top-rail welcome-rail">
        <div class="brand-lockup" aria-label="ECCOOZS Vocabulary Adventure">
          <span class="brand-mark">E</span>
          <span><strong>ECCOOZS</strong><em>Vocabulary Adventure</em></span>
        </div>
        <div class="stage-chip"><span>First visit</span><strong>Choose your learning path</strong></div>
        <div class="welcome-header-note">You can change paths later.</div>
      </header>`;
  }
  const activeStage = getStageDefinition(profile.stage);
  const rankName = displayRank(profile.stage, profile.rank);
  return `
    <header class="top-rail">
      <button class="brand-lockup" data-action="go-home" aria-label="ECCOOZS home">
        <span class="brand-mark">E</span>
        <span><strong>ECCOOZS</strong><em>Vocabulary Adventure</em></span>
      </button>
      <div class="stage-chip"><span>Learning path</span><strong>${escapeHTML(activeStage.label)}</strong></div>
      <div class="status-cluster" aria-label="Player status">
        <div class="rank-pill"><span>${escapeHTML(activeStage.rankTitle)}</span><strong>${escapeHTML(rankName)}</strong></div>
        <div class="credit-pill">${icon("coins", 18)}<span><strong>${profile.credits.toLocaleString()}</strong><em>Estate Credits</em></span></div>
        <button class="round-button" data-action="go-settings" aria-label="Open settings">${icon("gear", 19)}</button>
      </div>
    </header>`;
}

function bottomNavigation(active = "") {
  const stage = getStageDefinition(profile.stage);
  const links = profile.stage === "High School"
    ? [
        ["home", "home", "Home"],
        ["project", "map", "Career Projects"],
        ["collection", "book", "My Vocabulary"],
        ["estate", "estate", "My Work"]
      ]
    : [
        ["estate", "estate", stage.homeLabel],
        ["collection", "book", stage.archiveLabel],
        ["trail", "map", profile.stage === "Elementary" ? "Garden Trail" : "East Garden"],
        ["shop", "shop", profile.stage === "Elementary" ? "Garden Shop" : "Lifestyle Shop"]
      ];
  return `<nav class="bottom-nav" aria-label="Primary">
    ${links.map(([target, iconName, label]) => `<button class="${active === target ? "active" : ""}" data-action="go-${target}">${icon(iconName, 21)}<span>${escapeHTML(label)}</span></button>`).join("")}
  </nav>`;
}

function stageSelector() {
  return `<div class="stage-selector" aria-label="Developmental learning paths">
    ${stageDefinitions.map((stage) => {
      const selected = profile.stage === stage.label;
      const available = stage.status === "available";
      if (!available) {
        return `<div class="stage-choice locked"><span>${stage.order}</span><strong>${escapeHTML(stage.label)}</strong><em>Coming next</em></div>`;
      }
      return `<button class="stage-choice ${selected ? "selected" : ""}" data-action="select-stage" data-stage="${escapeHTML(stage.label)}" aria-pressed="${selected}"><span>${stage.order}</span><strong>${escapeHTML(stage.label)}</strong><em>${selected ? "Current path" : "Switch path"}</em></button>`;
    }).join("")}
  </div>`;
}


const learningPathCopy = {
  "Elementary": {
    title: "Explore & Learn",
    summary: "Start with small, clear teaching steps, concrete examples, Maya guidance, and a bright garden trail.",
    cue: "Best when you want the word taught before you are asked to use it."
  },
  "Junior High": {
    title: "Discover & Reason",
    summary: "Build spelling, compare meanings, repair confusing word pairs, and solve with increasing independence.",
    cue: "Best when you are ready to reason through vocabulary with less guidance."
  },
  "High School": {
    title: "Apply & Decide",
    summary: "Use precise vocabulary inside realistic professional briefs, evidence review, constraints, and recommendations.",
    cue: "Best when you are ready to use words as tools for real-world decisions."
  }
};

function learningPathCards(action = "choose-start-stage", showCurrent = false) {
  return stageDefinitions.map((stage) => {
    const copy = learningPathCopy[stage.label];
    const selected = showCurrent && profile.stage === stage.label;
    return `<button class="learning-path-card ${selected ? "selected" : ""}" data-action="${action}" data-stage="${escapeHTML(stage.label)}" ${showCurrent ? `aria-pressed="${selected}"` : ""}>
      <span class="learning-path-art" style="background-image:url('${escapeHTML(stage.worldAsset)}')"><b>${escapeHTML(stage.order)}</b></span>
      <span class="learning-path-copy">
        <em>${escapeHTML(stage.label)}</em>
        <strong>${escapeHTML(copy.title)}</strong>
        <p>${escapeHTML(copy.summary)}</p>
        <small>${escapeHTML(copy.cue)}</small>
      </span>
    </button>`;
  }).join("");
}

function onboardingScreen() {
  return `<main class="scene onboarding-scene" id="main-content">
    <section class="onboarding-shell">
      <div class="onboarding-heading">
        <p class="eyebrow">Welcome to Vocabulary Adventure</p>
        <h1>Where would you<br><i>like to begin?</i></h1>
        <p>Choose the experience that fits you today. This is a starting point, not a permanent label, and you can change paths later without erasing progress from the others.</p>
      </div>
      <div class="learning-path-grid" aria-label="Choose a starting learning path">${learningPathCards()}</div>
      <div class="onboarding-note">${icon("spark", 17)} <span><strong>Not sure?</strong> Elementary gives the most explicit teaching, Junior High adds independent reasoning, and High School applies vocabulary in professional situations.</span></div>
    </section>
  </main>`;
}

function ambientAtmosphere() {
  const stage = getStageDefinition(profile.stage);
  const particleCount = profile.stage === "Elementary" ? 12 : profile.stage === "Junior High" ? 14 : 10;
  const particles = Array.from({ length: particleCount }, (_, index) => `<i style="--ambient-i:${index};--ambient-x:${(index * 37 + 11) % 97}%;--ambient-delay:${-((index * 0.83) % 8).toFixed(2)}s"></i>`).join("");
  return `<div class="ambient-atmosphere ambient-${escapeHTML(stage.id)}" aria-hidden="true"><span class="ambient-light"></span><span class="ambient-depth"></span><div class="ambient-particles">${particles}</div></div>`;
}

function trailPairPosition(stage, progress = 0) {
  const elementary = stage === "Elementary";
  const positions = elementary
    ? [
        { left: 20, bottom: -18, scale: .78 },
        { left: 27, bottom: -7, scale: .69 },
        { left: 34, bottom: 3, scale: .60 },
        { left: 40, bottom: 12, scale: .52 },
        { left: 46, bottom: 20, scale: .44 },
        { left: 50, bottom: 27, scale: .36 }
      ]
    : [
        { left: 24, bottom: -13, scale: 1 },
        { left: 31, bottom: -5, scale: .88 },
        { left: 38, bottom: 3, scale: .76 },
        { left: 43, bottom: 10, scale: .65 },
        { left: 47, bottom: 17, scale: .54 },
        { left: 50, bottom: 24, scale: .43 }
      ];
  return positions[Math.max(0, Math.min(Number(progress) || 0, positions.length - 1))];
}

function animateRenderedChanges(previousScreen) {
  if (profile.settings.reducedMotion) {
    pendingVisualDiff = null;
    return;
  }
  const experience = app.querySelector(".experience");
  if (experience && previousScreen !== screen) {
    experience.classList.add("screen-entering");
    window.setTimeout(() => experience.classList.remove("screen-entering"), 520);
  }

  const diff = pendingVisualDiff;
  if (!diff) return;
  const credit = app.querySelector(".credit-pill");
  if (credit && diff.creditsDelta) {
    credit.dataset.delta = `${diff.creditsDelta > 0 ? "+" : ""}${diff.creditsDelta}`;
    credit.classList.add(diff.creditsDelta > 0 ? "credit-gain" : "credit-spend");
    window.setTimeout(() => {
      credit.classList.remove("credit-gain", "credit-spend");
      delete credit.dataset.delta;
    }, 1050);
  }

  if (screen === "trail" && Number.isInteger(diff.trailFrom) && Number.isInteger(diff.trailTo) && diff.trailFrom !== diff.trailTo) {
    const pair = app.querySelector(".learner-pair");
    if (pair && typeof pair.animate === "function") {
      const from = trailPairPosition(diff.stage, diff.trailFrom);
      const to = trailPairPosition(diff.stage, diff.trailTo);
      pair.animate([
        { left: `${from.left}%`, bottom: `${from.bottom}%`, transform: `translateX(-50%) scale(${from.scale})` },
        { left: `${(from.left + to.left) / 2}%`, bottom: `${Math.max(from.bottom, to.bottom) + 2.5}%`, transform: `translateX(-50%) scale(${(from.scale + to.scale) / 2})` },
        { left: `${to.left}%`, bottom: `${to.bottom}%`, transform: `translateX(-50%) scale(${to.scale})` }
      ], { duration: 980, easing: "cubic-bezier(.2,.76,.24,1)" });
    }
    app.querySelector(`.stone-${Math.min(diff.trailTo + 1, 5)}`)?.classList.add("just-reached");
  }

  const changedIds = [...diff.newlyOwned, ...diff.constructionChanged];
  changedIds.forEach((id) => {
    app.querySelectorAll(`[data-property-id="${id}"]`).forEach((element) => element.classList.add("property-just-changed"));
  });
  pendingVisualDiff = null;
}

function highSchoolImpactOverlay(limit = 7) {
  const history = profile.appliedProjects?.history || [];
  const seen = new Set();
  const markers = [];
  for (const record of [...history].reverse()) {
    if (seen.has(record.briefId)) continue;
    const project = civicProjects.find((item) => item.id === record.briefId);
    if (!project) continue;
    seen.add(record.briefId);
    markers.push(project);
    if (markers.length >= limit) break;
  }
  if (!markers.length) return "";
  return `<div class="world-impact-overlay" aria-label="Visible professional impacts">${markers.map((project, index) => `<span class="world-impact-marker domain-${escapeHTML(project.domainId)}" style="--impact-index:${index};--impact-offset:${index % 2 ? -13 : 0}px"><i>${icon("spark", 12)}</i><b>${escapeHTML(project.consequence.worldChange.replace(" ACTIVATED", ""))}</b><em>${escapeHTML(project.domainName)}</em></span>`).join("")}</div>`;
}

function highSchoolHomeScreen() {
  const active = profile.appliedProjects?.active;
  const activeProject = active ? getCivicProject(active.briefId) : null;
  const completed = profile.appliedProjects?.completedBriefIds?.length || 0;
  const wordIds = new Set(getVocabularyForStage("High School").map((entry) => entry.id));
  const records = Object.values(profile.mastery).filter((record) => wordIds.has(record.wordId));
  const domains = domainCompletion(profile);
  const touched = domains.filter((domain) => domain.completed > 0).length;
  return `<main class="scene high-school-home hs-guided-home" id="main-content">
    <div class="high-school-home-shade"></div>
    <section class="hs-home-copy">
      <p class="eyebrow">${icon("spark", 16)} High School · Applied Vocabulary</p>
      <h1>Put powerful words<br><i>to work.</i></h1>
      <div class="hs-value-card">
        <strong>Why this level matters</strong>
        <p>High School helps you use advanced vocabulary the way adults use it: to understand information, explain what evidence means, and make thoughtful decisions in real-world situations.</p>
      </div>
      <div class="hs-how-card" aria-label="What you will do">
        <span><b>1</b><strong>Read a real situation</strong><em>You receive a short career-based assignment. No career experience is required.</em></span>
        <span><b>2</b><strong>Use the right words</strong><em>You learn and choose precise vocabulary while reviewing evidence.</em></span>
        <span><b>3</b><strong>Make a decision</strong><em>You recommend what should happen and adjust your thinking if new evidence changes the case.</em></span>
      </div>
      <div class="hero-actions hs-home-actions">
        <button class="primary-action hs-start-action" data-action="start-project" ${active ? `data-project="${escapeHTML(active.briefId)}"` : ""}>${active ? "Continue my project" : "Start my first project"} ${icon("arrow", 18)}</button>
        <button class="quiet-action" data-action="go-progress">See how I’m doing ${icon("arrow", 16)}</button>
      </div>
      ${activeProject ? `<div class="hs-role-card"><span>CURRENT PROJECT</span><strong>${escapeHTML(activeProject.title)}</strong><em>${escapeHTML(activeProject.domainName)} · You are working as ${escapeHTML(activeProject.role)}.</em></div>` : `<div class="hs-role-card start-here-card"><span>START HERE</span><strong>Click “Start my first project.”</strong><em>The game chooses an assignment and guides you through every step.</em></div>`}
    </section>
    <div class="hs-home-pair" aria-hidden="true"><img src="/apps/vocabulary-adventure/assets/high-school-pair.webp" alt=""></div>
    ${highSchoolImpactOverlay()}
    ${completed ? `<aside class="hs-status-ledger"><p class="folio-label">Your progress</p><div><span>Projects finished</span><strong>${completed}</strong></div><div><span>Career areas explored</span><strong>${touched}/${highSchoolDomains.length}</strong></div><div><span>Vocabulary used</span><strong>${records.length}</strong></div></aside>` : ""}
  </main>${bottomNavigation("home")}`;
}

function homeScreen() {
  if (profile.stage === "High School") return highSchoolHomeScreen();
  const stage = getStageDefinition(profile.stage);
  const stageWordIds = new Set(getVocabularyForStage(profile.stage).map((entry) => entry.id));
  const records = Object.values(profile.mastery).filter((record) => stageWordIds.has(record.wordId));
  const practiced = records.filter((record) => record.stage !== "New").length;
  const strong = records.filter((record) => ["Strong", "Mastered"].includes(record.stage)).length;
  const resume = Boolean(profile.activeSession);
  const elementary = profile.stage === "Elementary";
  const hero = elementary
    ? `<section class="hero-copy elementary-hero">
        <p class="eyebrow">${icon("leaf", 15)} Cottage Garden · Elementary</p>
        <h1>Every word opens<br><i>a new path.</i></h1>
        <p class="hero-intro">Explore the orchard with two learning partners. Maya teaches each new word in small, clear steps before you build it, match its meaning, and use it.</p>
        <div class="hero-actions">
          <button class="primary-action" data-action="start-trail">${resume ? "Continue the orchard trail" : "Find a new word"} ${icon("arrow", 18)}</button>
          <button class="quiet-action" data-action="go-estate">Visit my garden ${icon("arrow", 16)}</button>
        </div>
        <button class="home-path-change" data-action="go-settings">Change learning path</button>
      </section>
      <div class="elementary-home-pair" aria-hidden="true"><img src="/apps/vocabulary-adventure/assets/elementary-pair.webp" alt=""></div>`
    : `<section class="hero-copy">
        <p class="eyebrow">${icon("leaf", 15)} Garden House · Junior High</p>
        <h1>Words make<br><i>the world move.</i></h1>
        <p class="hero-intro">Explore an animated estate trail with two learning partners. Listen closely, build accurately, reason through meaning, and use each word in context.</p>
        <div class="hero-actions">
          <button class="primary-action" data-action="start-trail">${resume ? "Resume East Garden" : "Enter East Garden"} ${icon("arrow", 18)}</button>
          <button class="quiet-action" data-action="go-estate">Visit my estate ${icon("arrow", 16)}</button>
        </div>
        <button class="home-path-change" data-action="go-settings">Change learning path</button>
      </section>`;
  return `
    <main class="scene home-scene" id="main-content">
      <div class="scene-shade"></div>
      ${hero}
      <aside class="estate-ledger">
        <p class="folio-label">${elementary ? "Today in the garden" : "Tonight at the estate"}</p>
        <div class="ledger-property">${icon("estate", 25)}<span><strong>${escapeHTML(profile.propertyName)}</strong><em>${profile.ownedItems.filter((id) => shopItems.find((item) => item.id === id)?.stage === profile.stage).length} improvement${profile.ownedItems.filter((id) => shopItems.find((item) => item.id === id)?.stage === profile.stage).length === 1 ? "" : "s"} placed</em></span></div>
        <div class="ledger-stat"><span>${escapeHTML(stage.archiveLabel)}</span><strong>${practiced} explored · ${strong} strong</strong></div>
        <div class="ledger-stat"><span>${elementary ? "Garden adventures" : "Garden sessions"}</span><strong>${profile.completedSessions} completed</strong></div>
      </aside>
    </main>
    ${bottomNavigation("home")}`;
}

function activeChallengeState() {
  const session = profile.activeSession;
  if (!session || session.gateOpen) return null;
  const encounter = session.plan[session.encounterIndex];
  if (!encounter) return null;
  const entry = getVocabularyWord(encounter.wordId);
  const kind = encounter.kinds[session.challengeIndex];
  const challenge = createChallenge(entry, kind, encounter.seed, session.attempt, {
    record: profile.mastery[entry.id],
    sessionNumber: profile.completedSessions,
    stage: profile.stage
  });
  const zone = profile.stage === "Elementary" ? getElementaryZone(encounter.zoneId) : null;
  return { session, encounter, entry, kind, challenge, zone };
}

function phaseName(kind) {
  return { discover: "Meet It", hear: "Hear", build: "Build It", know: "Know It", synonym: "Connect", antonym: "Contrast", distinguish: "Distinguish", use: "Use It" }[kind] || "Know It";
}

function trailWorld(session) {
  const progress = session?.encounterIndex || 0;
  const gateOpen = Boolean(session?.gateOpen);
  const elementary = profile.stage === "Elementary";
  const stones = Array.from({ length: 5 }, (_, index) => {
    const state = index < progress ? "lit" : index === progress && !gateOpen ? "current" : "waiting";
    return `<span class="trail-stone stone-${index + 1} ${state}" aria-label="Vocabulary stone ${index + 1}: ${state}"><i>${elementary ? icon("leaf", 12) : index + 1}</i></span>`;
  }).join("");
  const pair = trailPairPosition(profile.stage, progress);
  const pairAsset = elementary ? "/apps/vocabulary-adventure/assets/elementary-pair.webp" : "/apps/vocabulary-adventure/assets/learner-pair.webp";
  const pathSegments = Array.from({ length: 5 }, (_, index) => `<i class="path-segment path-segment-${index + 1} ${index < progress ? "lit" : index === progress && !gateOpen ? "current" : ""}"></i>`).join("");
  return `<div class="trail-world ${elementary ? "elementary-world" : "junior-world"} ${gateOpen ? "gate-open" : ""}" aria-hidden="true">
    <div class="path-glow" style="--progress:${progress / 5}"></div>
    <div class="path-lighting">${pathSegments}</div>
    ${stones}
    <div class="garden-gate"><span></span><span></span><b>${icon("leaf", 24)}</b></div>
    <div class="learner-pair ${elementary ? "younger-pair" : ""}" data-pair-left="${pair.left}" data-pair-bottom="${pair.bottom}" data-pair-scale="${pair.scale}" style="--pair-left:${pair.left}%;--pair-bottom:${pair.bottom}%;--pair-scale:${pair.scale}"><img src="${pairAsset}" alt=""><span class="pair-shadow"></span></div>
    <div class="fireflies">${Array.from({ length: elementary ? 7 : 10 }, (_, index) => `<i style="--i:${index}"></i>`).join("")}</div>
  </div>`;
}

function phaseRail(state) {
  const { session, encounter } = state;
  return `<div class="phase-rail" aria-label="Challenge phases">
    ${encounter.kinds.map((kind, index) => `<span class="${index < session.challengeIndex ? "done" : index === session.challengeIndex ? "current" : ""}"><i>${index < session.challengeIndex ? icon("check", 11) : index + 1}</i>${phaseName(kind)}</span>`).join("")}
  </div>`;
}

function conceptVisual(kind) {
  const art = {
    observe: `<svg viewBox="0 0 240 120"><path class="stem" d="M54 83c26-20 43-37 57-58"/><path class="leaf-shape" d="M43 80c5-29 30-43 63-48-4 33-21 57-53 61"/><circle class="glass" cx="151" cy="54" r="27"/><path class="glass-handle" d="m170 75 28 28"/><circle class="detail-dot" cx="143" cy="47" r="3"/><circle class="detail-dot" cx="158" cy="61" r="3"/></svg>`,
    strength: `<svg viewBox="0 0 240 120"><rect class="object-solid" x="34" y="54" width="69" height="39" rx="5"/><path class="impact" d="M66 29v18M49 36l9 13M82 36l-9 13"/><rect class="ground" x="25" y="94" width="88" height="4"/><path class="check-line" d="m142 69 15 15 34-42"/></svg>`,
    fragile: `<svg viewBox="0 0 240 120"><path class="glass-vase" d="M54 26h56l-9 25v34c0 12-9 19-19 19s-19-7-19-19V51Z"/><path class="crack" d="m81 50-10 16 14 5-12 20"/><path class="gentle-hands" d="M135 78c18-17 35-17 51-3M135 90c20 10 39 9 58-4"/></svg>`,
    protect: `<svg viewBox="0 0 240 120"><path class="umbrella" d="M39 61c15-43 76-43 92 0-10-8-20-8-30 0-10-8-20-8-30 0-10-8-21-8-32 0Z"/><path class="umbrella-stem" d="M85 59v39c0 10 15 11 15 0"/><path class="seedling" d="M164 95V67m0 7c-18-3-24-14-25-27 15 1 25 8 25 27Zm0 4c17-3 23-13 24-25-14 1-23 7-24 25Z"/><path class="ground" d="M139 97h51"/></svg>`,
    collect: `<svg viewBox="0 0 240 120"><circle class="token" cx="68" cy="60" r="10"/><circle class="token" cx="91" cy="52" r="10"/><circle class="token" cx="85" cy="77" r="10"/><circle class="token" cx="111" cy="70" r="10"/><path class="arrow-line" d="M150 42c18 2 30 12 37 29m-9-8 10 9 5-12"/><rect class="basket" x="151" y="78" width="58" height="25" rx="5"/></svg>`,
    scatter: `<svg viewBox="0 0 240 120"><circle class="token" cx="115" cy="61" r="10"/><path class="arrow-line" d="M105 51 72 25m34 47-42 18m61-39 36-27m-32 48 48 20"/><circle class="token faint" cx="58" cy="20" r="8"/><circle class="token faint" cx="48" cy="95" r="8"/><circle class="token faint" cx="176" cy="20" r="8"/><circle class="token faint" cx="190" cy="98" r="8"/></svg>`,
    compare: `<svg viewBox="0 0 240 120"><path class="leaf-shape small" d="M31 76c9-31 34-42 61-40-3 31-23 51-52 49"/><path class="leaf-shape large" d="M139 84c6-45 34-62 69-60-1 42-27 70-64 68"/><path class="compare-line" d="M101 38v52m26-52v52"/><path class="check-line" d="m104 31 7 7 12-15"/></svg>`,
    predict: `<svg viewBox="0 0 240 120"><path class="cloud" d="M31 54c1-16 17-25 30-18 7-18 36-14 39 5 17-2 25 21 9 30H45c-18 0-24-17-14-27"/><path class="arrow-line" d="M120 58h38m-10-10 10 10-10 10"/><path class="rain" d="M177 50v15m16-10v15m-30-3v15"/><path class="puddle" d="M155 91c15-8 38-7 55 0-14 8-39 8-55 0Z"/></svg>`,
    narrow: `<svg viewBox="0 0 240 120"><path class="path-wide" d="M20 101 72 20h39L91 101Z"/><path class="path-narrow" d="m140 101 22-81h15l3 81Z"/><path class="compare-line" d="M119 32v60"/></svg>`,
    distance: `<svg viewBox="0 0 240 120"><path class="ground" d="M18 98h204"/><path class="near-tree" d="M55 92V52m-20 4c5-27 38-27 43 0-5 20-37 22-43 0Z"/><path class="far-mountain" d="m136 87 24-38 20 25 15-20 29 33Z"/><circle class="sun" cx="192" cy="30" r="11"/></svg>`,
    shelter: `<svg viewBox="0 0 240 120"><path class="roof" d="m49 58 48-35 49 35"/><path class="house" d="M60 55v47h74V55"/><path class="door" d="M91 102V76h16v26"/><path class="rain" d="M166 32v18m19-10v18m18-28v18"/></svg>`,
    patient: `<svg viewBox="0 0 240 120"><path class="ground" d="M17 96h206"/><path class="seed" d="M37 88c10-13 20-13 30 0-10 9-20 9-30 0Z"/><path class="arrow-line" d="M79 64h31m-8-8 8 8-8 8M143 64h31m-8-8 8 8-8 8"/><path class="seedling" d="M128 95V64m0 8c-14-2-20-10-20-21 12 1 20 7 20 21Z"/><path class="tree" d="M196 96V58m-24 0c5-28 43-28 48 0-6 22-42 22-48 0Z"/></svg>`,
    habitat: `<svg viewBox="0 0 240 120"><path class="pond" d="M22 84c31-20 72-20 101 0-31 20-73 20-101 0Z"/><path class="reed" d="M48 79V45m15 34V53m14 25V42"/><path class="frog" d="M77 82c7-13 27-13 34 0-8 12-27 12-34 0Z"/><path class="shelter-tree" d="M178 96V52m-30 5c6-31 49-31 55 0-7 24-48 24-55 0Z"/></svg>`,
    adapt: `<svg viewBox="0 0 240 120"><path class="ground" d="M23 98h193"/><path class="plant-stem" d="M93 95c0-32 6-51 32-67"/><path class="leaf-shape small" d="M91 67c-21 1-31-9-34-25 18-2 31 5 34 25Zm12-15c9-18 23-23 37-17-5 16-16 24-37 17Z"/><circle class="sun" cx="180" cy="28" r="14"/><path class="sun-ray" d="M180 5v10m0 26v10m-23-23h10m26 0h10"/></svg>`
  };
  return `<div class="concept-visual concept-${escapeHTML(kind)}" aria-hidden="true">${art[kind] || art.observe}</div>`;
}

function conceptSupportCard(entry) {
  const support = getElementaryConceptSupport(entry.id);
  if (!support) return "";
  return `<div class="concept-support-card">
    <div><span>Picture it</span><strong>${escapeHTML(support.title)}</strong><p>${escapeHTML(support.prompt)}</p></div>
    ${conceptVisual(support.visual)}
    <em>${escapeHTML(support.memoryLine)}</em>
  </div>`;
}

function discoverChallenge(state) {
  const teaching = state.challenge.teaching;
  const partPlain = {
    noun: "A noun names a person, place, thing, or idea.",
    verb: "A verb tells about an action or what something does.",
    adjective: "An adjective gives more information about a person, place, or thing."
  }[state.entry.partOfSpeech] || "This word has a job in a sentence.";
  return `<div class="discover-panel">
    <div class="maya-note"><span class="maya-badge">M</span><div><strong>Maya's garden note</strong><p>First we learn the word. You do not have to guess.</p></div></div>
    <div class="meaning-card"><span>It means</span><strong>${escapeHTML(teaching.definition)}</strong></div>
    ${conceptSupportCard(state.entry)}
    <div class="example-card"><span>Example</span><p>${escapeHTML(teaching.example)}</p></div>
    <div class="word-parts"><span>${teaching.syllables.map((part) => `<b>${escapeHTML(part)}</b>`).join("<i>·</i>")}</span><em>${escapeHTML(partPlain)}</em></div>
    <div class="discover-actions"><button class="quiet-action" data-action="speak-word">${icon("sound", 18)} Hear the word</button><button class="primary-action compact" data-action="submit-challenge">I understand ${icon("arrow", 16)}</button></div>
  </div>`;
}

function hearChallenge(state) {
  const caption = profile.settings.captions ? `<p class="audio-caption">“${escapeHTML(state.entry.word)}” · ${escapeHTML(state.entry.pronunciation)}</p>` : `<p class="audio-caption muted">Transcript hidden · turn on captions in Settings</p>`;
  return `<div class="hear-panel">
    <button class="sound-orb" data-action="speak-word" aria-label="Play the vocabulary word">${icon("sound", 34)}<span>Play word</span><i></i></button>
    ${caption}
    <button class="primary-action compact" data-action="submit-challenge">I heard it ${icon("arrow", 16)}</button>
  </div>`;
}

function buildChallenge(state) {
  const selected = new Set(ui.buildTokens);
  const built = ui.buildTokens.map((id) => state.challenge.letters.find((token) => token.id === id)?.letter || "");
  const slots = Array.from({ length: state.challenge.letters.length }, (_, index) => `<button class="letter-slot ${built[index] ? "filled" : ""}" data-action="remove-letter" data-index="${index}" aria-label="${built[index] ? `Remove ${built[index]}` : `Empty letter ${index + 1}`}">${built[index] || ""}</button>`).join("");
  const tray = state.challenge.letters.map((token) => `<button class="letter-token" data-action="choose-letter" data-token="${token.id}" ${selected.has(token.id) ? "disabled" : ""}>${token.letter}</button>`).join("");
  return `<div class="build-panel">
    <div class="audio-clue"><button class="round-button" data-action="speak-word" aria-label="Replay word">${icon("sound", 19)}</button><span>Replay audio clue</span></div>
    <div class="letter-slots" aria-label="Built word">${slots}</div>
    <div class="letter-tray" aria-label="Available letters">${tray}</div>
    <div class="build-actions"><button class="text-action" data-action="clear-letters" ${built.length ? "" : "disabled"}>Clear</button><button class="primary-action compact" data-action="submit-challenge" ${built.length === state.challenge.letters.length ? "" : "disabled"}>Check word ${icon("arrow", 16)}</button></div>
  </div>`;
}

function optionChallenge(state) {
  return `<div class="option-stack">
    ${state.challenge.options.map((option, index) => `<button class="answer-option ${ui.selectedOption === index ? "selected" : ""}" data-action="select-option" data-index="${index}" aria-pressed="${ui.selectedOption === index}"><span>${String.fromCharCode(65 + index)}</span><strong>${escapeHTML(option)}</strong></button>`).join("")}
    <button class="primary-action compact option-submit" data-action="submit-challenge" ${ui.selectedOption == null ? "disabled" : ""}>Submit response ${icon("arrow", 16)}</button>
  </div>`;
}

function inputChallenge(state) {
  const label = state.challenge.useMode === "recall-cloze" ? "Recall the word" : "Type the word";
  return `<div class="input-challenge">
    <label><span>${label}</span><input type="text" data-response-input autocomplete="off" spellcheck="false" value="${escapeHTML(ui.typedResponse)}" aria-label="${label}"></label>
    <button class="primary-action compact" data-action="submit-challenge" ${ui.typedResponse.trim() ? "" : "disabled"}>Check response ${icon("arrow", 16)}</button>
  </div>`;
}

function challengeFolio(state) {
  const elementary = profile.stage === "Elementary";
  const wordVisible = state.challenge.displayWord !== false && !["hear", "build"].includes(state.kind);
  const hint = ui.hintShown
    ? elementary
      ? `<div class="hint-note elementary-hint">${icon("leaf", 15)} <span><strong>Maya's clue:</strong> Say the word in parts: ${state.entry.syllables.map(escapeHTML).join(" · ")}. ${escapeHTML(state.entry.simpleDefinition || state.entry.definition)}</span></div>`
      : `<div class="hint-note">${icon("spark", 15)} <span><strong>Garden clue:</strong> This ${state.entry.partOfSpeech} has ${state.entry.syllables.length} syllable${state.entry.syllables.length === 1 ? "" : "s"}. ${state.kind === "build" ? state.entry.definition : `Its root points to “${state.entry.root.meaning}.”`}</span></div>`
    : "";
  let body;
  if (state.kind === "discover") body = discoverChallenge(state);
  else if (state.kind === "hear") body = hearChallenge(state);
  else if (state.kind === "build") body = buildChallenge(state);
  else if (state.challenge.inputMode) body = inputChallenge(state);
  else body = optionChallenge(state);
  return `<section class="challenge-folio ${elementary ? "elementary-folio" : ""}" aria-labelledby="challenge-title">
    <div class="folio-rule"></div>
    <div class="challenge-topline"><p class="challenge-kicker">${elementary && state.zone ? `${escapeHTML(state.zone.name)} · ` : ""}${phaseName(state.kind)} · ${state.encounter.review ? "Review stone" : "Stone"} ${state.session.encounterIndex + 1} of ${state.session.plan.length}</p><span>${state.session.stats.creditsEarned} credits earned</span></div>
    <div class="word-row">
      <div><h2 id="challenge-title">${wordVisible ? escapeHTML(state.entry.word) : phaseName(state.kind)}</h2><p>${wordVisible ? `${escapeHTML(state.entry.partOfSpeech)} · ${escapeHTML(state.entry.pronunciation)}` : state.kind === "hear" || state.kind === "build" ? (elementary ? "Remember the word you just learned." : "Listen carefully—the spelling stays concealed.") : "Use the context to retrieve the precise word."}</p></div>
      ${wordVisible ? `<button class="round-button" data-action="speak-word" aria-label="Pronounce ${escapeHTML(state.entry.word)}">${icon("sound", 19)}</button>` : ""}
    </div>
    <p class="challenge-prompt">${escapeHTML(state.challenge.prompt)}</p>
    ${ui.notice ? `<div class="inline-notice" role="status">${escapeHTML(ui.notice)}</div>` : ""}
    ${hint}
    ${body}
    ${!["hear", "discover"].includes(state.kind) ? `<button class="hint-button" data-action="toggle-hint">${icon(elementary ? "leaf" : "question", 15)} ${ui.hintShown ? "Hide clue" : elementary ? "Ask Maya for a clue" : "Use a clue"}</button>` : ""}
  </section>`;
}

function feedbackFolio() {
  const feedback = ui.feedback;
  if (!feedback) return "";
  const entry = feedback.entry;
  const correctAnswer = feedback.challenge.answer;
  const elementary = profile.stage === "Elementary";
  const definition = elementary ? (entry.simpleDefinition || entry.definition) : entry.definition.charAt(0).toLowerCase() + entry.definition.slice(1);
  const note = feedback.correct
    ? ["hear", "discover"].includes(feedback.challenge.kind)
      ? elementary
        ? `You met <strong>${escapeHTML(entry.word)}</strong>. Now the word is ready for you to build and use.`
        : `You heard the word. Listening is recorded as exposure, not proof of mastery. Now you will build it.`
      : `<strong>${escapeHTML(entry.word)}</strong> means ${escapeHTML(definition)}`
    : elementary
      ? `Almost. <strong>${escapeHTML(entry.word)}</strong> means ${escapeHTML(definition)}. We will change the example and try again.`
      : `<strong>${escapeHTML(entry.word)}</strong> means ${escapeHTML(definition)} The best response was “${escapeHTML(correctAnswer)}.”`;
  const guidance = !feedback.correct && elementary ? getElementaryTeachingResponse(entry, feedback.challenge, feedback.response) : null;
  const guidanceCard = guidance
    ? `<div class="maya-coach-card"><span class="maya-badge">M</span><div><p class="eyebrow">Maya changes the clue</p><h3>${escapeHTML(guidance.title)}</h3><p>${escapeHTML(guidance.message)}</p><em>${escapeHTML(guidance.strategy)}</em></div></div>`
    : "";
  const diagnosis = !feedback.correct && !elementary && feedback.diagnosis
    ? `<div class="diagnosis-card">
        <span class="diagnosis-tag">${escapeHTML(feedback.diagnosis.label)}</span>
        <div><p class="eyebrow">What the miss tells us</p><h3>${escapeHTML(feedback.diagnosis.title)}</h3><p>${escapeHTML(feedback.diagnosis.message)}</p><em><strong>Repair strategy:</strong> ${escapeHTML(feedback.diagnosis.strategy)}</em></div>
      </div>`
    : "";
  const misconception = feedback.misconception
    ? `<div class="misconception-card diagnostic-lesson">
        <div class="misconception-heading"><div><p class="eyebrow">Let’s look closer · ${escapeHTML(feedback.misconception.category || "Confusable words")}</p><h3>${escapeHTML(feedback.misconception.title)}</h3></div><button class="quiet-action mini" data-action="hear-misconception">${icon("sound", 16)} Hear ${feedback.misconception.audioWords?.length > 2 ? "the words" : "both words"}</button></div>
        <div class="confusion-grid ${feedback.misconception.terms.length > 2 ? "three-way" : ""}">${feedback.misconception.terms.map((term) => `<article class="${feedback.misconception.selectedWord === term.word ? "selected-trap" : ""}"><strong>${escapeHTML(term.word)}</strong><span>${escapeHTML(term.job || "word")}</span><b>${escapeHTML(term.meaning)}</b><em>${escapeHTML(term.example)}</em></article>`).join("")}</div>
        <div class="memory-key"><span>Memory key</span><strong>${escapeHTML(feedback.misconception.memoryCue || feedback.misconception.strategy)}</strong></div>
        <p>${escapeHTML(feedback.misconception.teachingNote)}</p>
        <p class="retry-cue"><strong>On the new example:</strong> ${escapeHTML(feedback.misconception.retryCue || feedback.diagnosis?.retryCue || "Use the meaning again before choosing.")}</p>
      </div>`
    : "";
  return `<section class="feedback-folio ${elementary ? "elementary-folio" : ""} ${feedback.correct ? "correct" : "teach"}" role="status">
    <div class="feedback-mark">${feedback.correct ? icon("check", 28) : icon(elementary ? "leaf" : "question", 28)}</div>
    <p class="eyebrow">${feedback.correct ? (elementary ? "The garden remembers" : "Path illuminated") : feedback.misconception ? "A precise correction" : elementary ? "Let’s learn from it" : "A useful correction"}</p>
    <h2>${feedback.correct ? (elementary ? "You grew this word." : "Knowledge moves the garden.") : feedback.misconception ? "These two need different meanings." : elementary ? "That try taught us something." : "Let’s hold onto this word."}</h2>
    <p>${note}</p>
    ${guidanceCard}
    ${diagnosis}
    ${misconception}
    <p class="feedback-example">${escapeHTML(entry.contexts[(feedback.challenge.attempt || 0) % entry.contexts.length])}</p>
    ${feedback.reward ? `<div class="award-line">${icon("coins", 17)} +${feedback.reward} Estate Credits ${feedback.previousStage !== feedback.nextStage ? `<span>· ${feedback.nextStage} now</span>` : ""}</div>` : ""}
    <button class="primary-action" data-action="continue-feedback">${feedback.correct ? (elementary ? "Go to the next tiny step" : "Continue along the trail") : elementary ? "Try a new example" : "Try a new version"} ${icon("arrow", 17)}</button>
  </section>`;
}

function gateFolio(session) {
  const elementary = profile.stage === "Elementary";
  return `<section class="gate-folio ${elementary ? "elementary-folio" : ""}">
    <div class="gate-seal">${icon("leaf", 32)}</div>
    <p class="eyebrow">${elementary ? "Five word stones found" : "Five stones illuminated"}</p>
    <h1>${elementary ? `The orchard path<br><i>opens farther.</i>` : `The East Garden<br><i>opens for you.</i>`}</h1>
    <p>${elementary ? "You learned first, then practiced. Finish the adventure to save your words, keep your Estate Credits, and grow your Cottage Garden." : "Your answers carried both learning partners to the gate. Complete the session to bank the progress, advance construction, and reveal tonight’s estate options."}</p>
    <div class="gate-stats"><span><strong>${session.stats.correct}</strong> ${elementary ? "successful tries" : "accurate responses"}</span><span><strong>${session.stats.creditsEarned}</strong> credits earned</span></div>
    <button class="primary-action" data-action="complete-session">${elementary ? "Finish this garden adventure" : "Open the gate"} ${icon("arrow", 18)}</button>
  </section>`;
}

function trailScreen() {
  const elementary = profile.stage === "Elementary";
  if (!profile.activeSession) {
    return `<main class="scene trail-scene" id="main-content">${trailWorld(null)}<section class="trail-intro ${elementary ? "elementary-intro" : ""}"><p class="eyebrow">${icon("map", 15)} ${elementary ? "Orchard Word Trail" : "East Garden"}</p><h1>${elementary ? `Let’s find<br><i>five new words.</i>` : `Five stones.<br><i>One opening gate.</i>`}</h1><p>${elementary ? "At every stone, Maya teaches the word first. Then you build it, learn its meaning, and use it. You never have to guess a word you have not been taught." : "Every stop moves through listening, spelling, meaning, and use. Misses become teaching moments, then the challenge changes before you retry."}</p><button class="primary-action" data-action="start-trail">${elementary ? "Go to the first word stone" : "Begin the trail"} ${icon("arrow", 18)}</button></section></main>${bottomNavigation("trail")}`;
  }
  const state = activeChallengeState();
  const session = profile.activeSession;
  return `<main class="scene trail-scene" id="main-content">
    ${trailWorld(session)}
    <aside class="trail-brief ${elementary ? "elementary-brief" : ""}">
      <p class="eyebrow">${icon("map", 14)} ${elementary ? "Cottage Garden" : "East Garden Trail"}</p>
      <strong>${session.gateOpen ? (elementary ? "The orchard path is ready" : "The gate is ready") : elementary && state?.zone ? `${escapeHTML(state.zone.name)} · ${state.encounter.review ? "Memory stone" : `Word stone ${session.encounterIndex + 1}`}` : `Word stone ${session.encounterIndex + 1}`}</strong>
      ${elementary && state?.zone && !session.gateOpen ? `<em class="zone-note">${escapeHTML(state.zone.note)}</em>` : ""}
      <div class="trail-meter"><i style="width:${Math.max(4, session.encounterIndex * 20)}%"></i></div>
      <span>${session.encounterIndex} of ${session.plan.length} word stones complete</span>
      <button class="text-action" data-action="leave-trail">Save & return home</button>
    </aside>
    ${state ? phaseRail(state) : ""}
    <div class="modal-zone">${ui.feedback ? feedbackFolio() : session.gateOpen ? gateFolio(session) : state ? challengeFolio(state) : ""}</div>
  </main>`;
}


function projectStepLabel(index) {
  return ["Brief", "Evidence", "Source Judgment", "Precision", "Reasoning", "Evidence Chain", "Preliminary Recommendation", "Decision Revision", "Rationale", "Impact"][index] || "Impact";
}

function projectFeedbackBlock() {
  if (!ui.projectFeedback) return "";
  const tone = ui.projectFeedback.correct ? "correct" : "wrong";
  return `<div class="project-feedback ${tone}" role="status">${icon(ui.projectFeedback.correct ? "check" : "question", 18)}<div><strong>${ui.projectFeedback.correct ? "Professional reasoning supports that choice." : "Review the evidence and try again."}</strong><p>${escapeHTML(ui.projectFeedback.teaching || "Use the evidence, the constraint, and the exact meaning of the term before deciding again.")}</p>${ui.projectFeedback.reward ? `<em>+${ui.projectFeedback.reward} Estate Credits</em>` : ""}</div></div>`;
}

function sourceJudgmentSummary(project, active, view, compact = false) {
  const strongestEvidenceId = active.decisions?.sourceStrength?.evidenceId;
  const strongest = view.sourceCards.find((item) => item.evidenceId === strongestEvidenceId);
  const confidenceId = active.decisions?.sourceConfidence?.confidenceId;
  const confidence = view.sourceConfidenceOptions.find((item) => item.id === confidenceId);
  return `<section class="source-judgment-summary ${compact ? "compact" : ""}" aria-label="Source judgment summary">
    <p class="folio-label">Source judgment</p>
    <div class="source-summary-row"><span>Best-fit source</span><strong>${strongest ? escapeHTML(strongest.source) : "Not filed yet"}</strong></div>
    <div class="source-summary-row"><span>Limitation check</span><strong>${active.decisions?.sourceLimitation?.correct ? "Important limitation identified" : "Not filed yet"}</strong></div>
    <div class="source-summary-row"><span>Claim confidence</span><strong>${confidence ? escapeHTML(confidence.label) : "Not filed yet"}</strong></div>
  </section>`;
}

function renderSourceJudgmentStep(project, active, view) {
  const strengthDone = Boolean(active.decisions?.sourceStrength?.correct);
  const limitationDone = Boolean(active.decisions?.sourceLimitation?.correct);
  const confidenceDone = Boolean(active.decisions?.sourceConfidence?.correct);
  const stageClass = strengthDone ? (limitationDone ? (confidenceDone ? "complete" : "confidence") : "limitation") : "strength";
  const stageRail = `<div class="source-stage-rail ${stageClass}"><span class="${strengthDone ? "done" : "current"}">1 · Source fit</span><span class="${limitationDone ? "done" : strengthDone ? "current" : ""}">2 · Limitation</span><span class="${confidenceDone ? "done" : limitationDone ? "current" : ""}">3 · Confidence</span></div>`;
  const evidenceById = new Map(project.evidence.map((item) => [item.id, item]));

  if (!strengthDone) {
    return `<div class="project-step source-judgment-step">${stageRail}<p class="folio-label">Evidence Quality · Source Judgment</p><h2>${escapeHTML(view.sourceStrengthPrompt)}</h2><p>Compare how each source was collected, what it actually covers, and how directly it answers the claim. A source can be trustworthy and still be the wrong source for a particular question.</p><div class="source-card-grid">${view.sourceCards.map((source, index) => {
      const evidence = evidenceById.get(source.evidenceId);
      return `<button class="source-card ${ui.projectSelectedIndex === index ? "selected" : ""}" data-action="select-project-option" data-index="${index}"><span class="source-card-kicker">${escapeHTML(evidence?.label || source.evidenceId)}</span><strong>${escapeHTML(source.source)}</strong><p>${escapeHTML(source.method)}</p><dl><div><dt>Scope</dt><dd>${escapeHTML(source.scope)}</dd></div><div><dt>Timing</dt><dd>${escapeHTML(source.timing)}</dd></div><div><dt>Caution</dt><dd>${escapeHTML(source.caveat)}</dd></div></dl></button>`;
    }).join("")}</div>${projectFeedbackBlock()}<div class="project-step-actions"><button class="primary-action" data-action="submit-source-strength" ${ui.projectSelectedIndex == null ? "disabled" : ""}>Check source fit ${icon("arrow", 16)}</button></div></div>`;
  }

  if (!limitationDone) {
    return `<div class="project-step source-judgment-step">${stageRail}<p class="folio-label">Evidence Quality · Limitation Check</p><h2>What is the most important caution to keep visible?</h2><p>Professional evidence is rarely perfect. Identify the limitation that changes how strongly the team should speak—not a reason to throw useful evidence away.</p><div class="project-options long source-limitation-options">${view.sourceLimitationOptions.map((option, index) => `<button class="${ui.projectSelectedIndex === index ? "selected" : ""}" data-action="select-project-option" data-index="${index}">${escapeHTML(option)}</button>`).join("")}</div>${projectFeedbackBlock()}<div class="project-step-actions"><button class="primary-action" data-action="submit-source-limitation" ${ui.projectSelectedIndex == null ? "disabled" : ""}>Check limitation</button></div></div>`;
  }

  if (!confidenceDone) {
    return `<div class="project-step source-judgment-step">${stageRail}<p class="folio-label">Evidence Quality · Claim Strength</p><h2>${escapeHTML(view.sourceConfidencePrompt)}</h2><p>Choose how strongly a careful professional can speak from the evidence that exists right now.</p><div class="confidence-options">${view.sourceConfidenceOptions.map((option, index) => `<button class="confidence-option ${ui.projectSelectedIndex === index ? "selected" : ""}" data-action="select-project-option" data-index="${index}"><strong>${escapeHTML(option.label)}</strong><span>${escapeHTML(option.detail)}</span></button>`).join("")}</div>${projectFeedbackBlock()}<div class="project-step-actions"><button class="primary-action" data-action="submit-source-confidence" ${ui.projectSelectedIndex == null ? "disabled" : ""}>Set evidence confidence</button></div></div>`;
  }

  return `<div class="project-step source-judgment-step source-complete">${stageRail}<p class="folio-label">Evidence Quality · Source Judgment</p><h2>You know what the evidence can—and cannot—earn.</h2><p>The next steps must stay inside those boundaries. Strong professional reasoning is not only choosing evidence; it is refusing to make a source say more than it says.</p>${sourceJudgmentSummary(project, active, view)}<div class="project-step-actions"><button class="primary-action" data-action="advance-project-step">Continue to precise language ${icon("arrow", 16)}</button></div></div>`;
}

function evidenceChainSummary(project, active, compact = false) {
  const evidenceById = new Map(project.evidence.map((item) => [item.id, item]));
  const selectedEvidence = (active.decisions?.evidenceSupport?.selectedIds || []).map((id) => evidenceById.get(id)).filter(Boolean);
  const constraintIndex = active.decisions?.constraint?.selectedIndex;
  const constraint = Number.isInteger(constraintIndex) ? project.constraints[constraintIndex] : null;
  return `<section class="evidence-chain-summary ${compact ? "compact" : ""}" aria-label="Evidence chain summary">
    <p class="folio-label">Evidence chain</p>
    <div class="chain-link"><span>1</span><div><strong>Evidence</strong>${selectedEvidence.length ? selectedEvidence.map((item) => `<em>${escapeHTML(item.label)} · ${escapeHTML(item.value)}</em>`).join("") : `<em>Not filed yet</em>`}</div></div>
    <div class="chain-link"><span>2</span><div><strong>Controlling constraint</strong><em>${constraint ? escapeHTML(constraint) : "Not filed yet"}</em></div></div>
    <div class="chain-link"><span>3</span><div><strong>Assumption check</strong><em>${active.decisions?.assumption?.correct ? "Unsupported claim identified and rejected." : "Not filed yet"}</em></div></div>
  </section>`;
}

function renderEvidenceChainStep(project, active, view) {
  const evidenceDone = Boolean(active.decisions?.evidenceSupport?.correct);
  const constraintDone = Boolean(active.decisions?.constraint?.correct);
  const assumptionDone = Boolean(active.decisions?.assumption?.correct);
  const selected = new Set(active.chainDraft?.evidenceIds || []);
  const required = view.evidenceChain.supportingEvidenceCount;
  const stageClass = evidenceDone ? (constraintDone ? (assumptionDone ? "complete" : "assumption") : "constraint") : "evidence";
  const stageRail = `<div class="chain-stage-rail ${stageClass}"><span class="${evidenceDone ? "done" : "current"}">1 · Evidence</span><span class="${constraintDone ? "done" : evidenceDone ? "current" : ""}">2 · Constraint</span><span class="${assumptionDone ? "done" : constraintDone ? "current" : ""}">3 · Assumption</span></div>`;

  if (!evidenceDone) {
    return `<div class="project-step evidence-chain-step">${stageRail}<p class="folio-label">Evidence Chain Studio</p><h2>Which evidence actually carries the decision?</h2><p>Select exactly ${required} evidence cards that most directly support the professional recommendation. A fact can be important background without being one of the strongest links in the decision.</p><div class="evidence-cards chain-evidence-cards">${view.evidence.map((item) => `<button class="evidence-card chain-choice ${selected.has(item.id) ? "selected" : ""}" data-action="toggle-chain-evidence" data-evidence="${item.id}"><span>${selected.has(item.id) ? icon("check", 15) : icon("question", 15)}</span><div><strong>${escapeHTML(item.label)}</strong><p>${escapeHTML(item.value)}</p></div></button>`).join("")}</div>${projectFeedbackBlock()}<div class="project-step-actions"><button class="primary-action" data-action="submit-evidence-chain" ${selected.size === required ? "" : "disabled"}>Lock evidence links ${icon("arrow", 16)}</button></div></div>`;
  }

  if (!constraintDone) {
    return `<div class="project-step evidence-chain-step">${stageRail}<p class="folio-label">Evidence Chain Studio</p><h2>Which constraint controls the decision?</h2><p>Choose the guardrail that most directly limits what the team may recommend or claim in this brief.</p><div class="project-options long constraint-options">${view.constraints.map((constraint, index) => `<button class="${ui.projectSelectedIndex === index ? "selected" : ""}" data-action="select-project-option" data-index="${index}">${escapeHTML(constraint)}</button>`).join("")}</div>${projectFeedbackBlock()}<div class="project-step-actions"><button class="primary-action" data-action="submit-controlling-constraint" ${ui.projectSelectedIndex == null ? "disabled" : ""}>Check controlling constraint</button></div></div>`;
  }

  if (!assumptionDone) {
    return `<div class="project-step evidence-chain-step">${stageRail}<p class="folio-label">Evidence Chain Studio</p><h2>Which statement is an assumption?</h2><p>Find the claim that goes beyond what was measured, observed, documented, or required. Professionals separate evidence from what they merely expect to be true.</p><div class="project-options long assumption-options">${view.assumptionOptions.map((statement, index) => `<button class="${ui.projectSelectedIndex === index ? "selected" : ""}" data-action="select-project-option" data-index="${index}">${escapeHTML(statement)}</button>`).join("")}</div>${projectFeedbackBlock()}<div class="project-step-actions"><button class="primary-action" data-action="submit-assumption-check" ${ui.projectSelectedIndex == null ? "disabled" : ""}>Separate evidence from assumption</button></div></div>`;
  }

  return `<div class="project-step evidence-chain-step complete-chain">${stageRail}<p class="folio-label">Evidence Chain Studio</p><h2>Your recommendation now has a traceable chain.</h2><p>Nothing was graded by guessing what you meant. The chain is built from explicit evidence selection, a published constraint, and a clear assumption check.</p>${evidenceChainSummary(project, active)}<div class="project-step-actions"><button class="primary-action" data-action="advance-project-step">Build the recommendation ${icon("arrow", 16)}</button></div></div>`;
}


function decisionRevisionSummary(active, view, compact = false) {
  const impactId = active.decisions?.decisionImpact?.impactId;
  const responseId = active.decisions?.decisionResponse?.responseId;
  const impact = view.decisionRevision.impactOptions.find((item) => item.id === impactId);
  const response = view.decisionRevision.responseOptions.find((item) => item.id === responseId);
  return `<section class="decision-revision-summary ${compact ? "compact" : ""}" aria-label="Decision revision summary">
    <p class="folio-label">Late-evidence decision</p>
    <div class="source-summary-row"><span>Update impact</span><strong>${impact ? escapeHTML(impact.label) : "Not filed yet"}</strong></div>
    <div class="source-summary-row"><span>Professional response</span><strong>${response ? escapeHTML(response.label) : "Not filed yet"}</strong></div>
    ${response ? `<p>${escapeHTML(view.decisionRevision.filedResult)}</p>` : ""}
  </section>`;
}

function renderDecisionRevisionStep(project, active, view) {
  const impactDone = Boolean(active.decisions?.decisionImpact?.correct);
  const responseDone = Boolean(active.decisions?.decisionResponse?.correct);
  const recommendationIndex = active.decisions?.recommendation?.selectedIndex;
  const recommendation = Number.isInteger(recommendationIndex) ? project.recommendation.options[recommendationIndex] : null;
  const update = view.decisionRevision.update;
  const stageRail = `<div class="revision-stage-rail ${impactDone ? (responseDone ? "complete" : "response") : "impact"}"><span class="${impactDone ? "done" : "current"}">1 · Interpret update</span><span class="${responseDone ? "done" : impactDone ? "current" : ""}">2 · Revise responsibly</span></div>`;
  const updateCard = `<section class="late-evidence-card"><span class="late-evidence-kicker">New credible evidence received</span><strong>${escapeHTML(update.source)}</strong><dl><div><dt>Method</dt><dd>${escapeHTML(update.method)}</dd></div><div><dt>Timing</dt><dd>${escapeHTML(update.timing)}</dd></div><div><dt>Finding</dt><dd>${escapeHTML(update.finding)}</dd></div><div><dt>Boundary</dt><dd>${escapeHTML(update.limitation)}</dd></div></dl></section>`;

  if (!impactDone) {
    return `<div class="project-step decision-revision-step">${stageRail}<p class="folio-label">Decision Revision Studio</p><h2>The record changed after your preliminary recommendation.</h2><p>A professional decision is not a promise to defend the first answer. Read the late evidence and decide what it does to the case you already built.</p>${recommendation ? `<div class="filed-recommendation preliminary"><span>Preliminary recommendation</span><strong>${escapeHTML(recommendation.label)}</strong><p>${escapeHTML(recommendation.detail)}</p></div>` : ""}${updateCard}<h3>${escapeHTML(view.decisionRevision.impactPrompt)}</h3><div class="revision-impact-options">${view.decisionRevision.impactOptions.map((option, index) => `<button class="revision-impact-option ${ui.projectSelectedIndex === index ? "selected" : ""}" data-action="select-project-option" data-index="${index}"><strong>${escapeHTML(option.label)}</strong><span>${escapeHTML(option.detail)}</span></button>`).join("")}</div>${projectFeedbackBlock()}<div class="project-step-actions"><button class="primary-action" data-action="submit-decision-impact" ${ui.projectSelectedIndex == null ? "disabled" : ""}>Interpret the update ${icon("arrow", 16)}</button></div></div>`;
  }

  if (!responseDone) {
    return `<div class="project-step decision-revision-step">${stageRail}<p class="folio-label">Decision Revision Studio · Professional Response</p><h2>${escapeHTML(view.decisionRevision.responsePrompt)}</h2><p>The evidence impact is now identified. Choose what a careful professional should do next instead of protecting the first recommendation out of habit.</p>${updateCard}<div class="revision-response-options">${view.decisionRevision.responseOptions.map((option, index) => `<button class="revision-response-option ${ui.projectSelectedIndex === index ? "selected" : ""}" data-action="select-project-option" data-index="${index}"><strong>${escapeHTML(option.label)}</strong><span>${escapeHTML(option.detail)}</span></button>`).join("")}</div>${projectFeedbackBlock()}<div class="project-step-actions"><button class="primary-action" data-action="submit-decision-response" ${ui.projectSelectedIndex == null ? "disabled" : ""}>File the professional response</button></div></div>`;
  }

  return `<div class="project-step decision-revision-step revision-complete">${stageRail}<p class="folio-label">Decision Revision Studio</p><h2>Good reasoning can change when the evidence changes.</h2><p>The update has been interpreted and the professional response is now part of the record. Your field note should explain the final position—not merely defend the preliminary one.</p>${decisionRevisionSummary(active, view)}<div class="project-step-actions"><button class="primary-action" data-action="advance-project-step">Write the final field-note rationale ${icon("arrow", 16)}</button></div></div>`;
}

function renderProjectStep(project, active) {
  const step = active.stepIndex;
  const view = appliedProjectView(project, active);
  project = view.project;
  if (step === 0) {
    return `<div class="project-step brief-step"><p class="folio-label">${escapeHTML(project.briefNumber)} · ${escapeHTML(project.domainName)}</p><span class="scenario-chip">Scenario · ${escapeHTML(project.scenarioLabel || "Core field condition")}</span><h2>${escapeHTML(project.title)}</h2><p class="project-problem">${escapeHTML(project.problem)}</p><div class="constraint-list"><strong>Constraints</strong>${project.constraints.map((item) => `<span>${icon("check", 13)} ${escapeHTML(item)}</span>`).join("")}</div><button class="primary-action" data-action="advance-project-step">Begin evidence review ${icon("arrow", 16)}</button></div>`;
  }
  if (step === 1) {
    const reviewed = new Set(active.reviewedEvidence || []);
    const ready = reviewed.size === project.evidence.length;
    return `<div class="project-step evidence-step"><p class="folio-label">Review evidence</p><h2>Inspect before you recommend.</h2><p>Open every evidence card. The cards and answer positions change from brief to brief so the work cannot be solved by memorizing a screen pattern.</p><div class="evidence-cards">${view.evidence.map((item) => `<button class="evidence-card ${reviewed.has(item.id) ? "reviewed" : ""}" data-action="review-evidence" data-evidence="${item.id}"><span>${reviewed.has(item.id) ? icon("check", 15) : icon("question", 15)}</span><div><strong>${escapeHTML(item.label)}</strong><p>${escapeHTML(item.value)}</p></div></button>`).join("")}</div><button class="primary-action" data-action="advance-project-step" ${ready ? "" : "disabled"}>Continue to source judgment ${icon("arrow", 16)}</button></div>`;
  }
  if (step === 2) return renderSourceJudgmentStep(project, active, view);
  if (step === 3) {
    const done = Boolean(active.decisions.vocabulary?.correct);
    const repair = !done ? active.precisionRepair : null;
    return `<div class="project-step decision-step"><p class="folio-label">Precise term</p><h2>${repair ? "Use the repair, then try a new context." : "Choose the term the evidence earns."}</h2>${repair ? `<section class="precision-repair" aria-label="Precision repair"><div class="repair-heading">${icon("question", 18)}<span><b>${escapeHTML(repair.title)}</b><em>Professional precision repair</em></span></div><div class="repair-contrast"><article><span>You chose</span><strong>${escapeHTML(repair.chosen)}</strong><p>${escapeHTML(repair.chosenMeaning)}</p></article><article><span>The evidence needs</span><strong>${escapeHTML(repair.target)}</strong><p>${escapeHTML(repair.targetMeaning)}</p></article></div><p>${escapeHTML(repair.principle)}</p><small>${escapeHTML(repair.cue)}</small></section>` : ""}<p class="decision-stem">${escapeHTML(view.vocabularyStem)}</p><div class="project-options">${view.vocabularyOptions.map((option, index) => `<button class="${ui.projectSelectedIndex === index ? "selected" : ""}" data-action="select-project-option" data-index="${index}">${escapeHTML(option)}</button>`).join("")}</div>${projectFeedbackBlock()}<div class="project-step-actions">${done ? `<button class="primary-action" data-action="advance-project-step">Continue to reasoning ${icon("arrow", 16)}</button>` : `<button class="primary-action" data-action="submit-applied-vocab" ${ui.projectSelectedIndex == null ? "disabled" : ""}>${repair ? "Try the changed context" : "Check precision"}</button>`}</div></div>`;
  }
  if (step === 4) {
    const done = Boolean(active.decisions.reasoning?.correct);
    return `<div class="project-step reasoning-step"><p class="folio-label">Evidence reasoning</p><h2>${escapeHTML(project.reasoning.prompt)}</h2><div class="project-options long">${view.reasoningOptions.map((option, index) => `<button class="${ui.projectSelectedIndex === index ? "selected" : ""}" data-action="select-project-option" data-index="${index}">${escapeHTML(option)}</button>`).join("")}</div>${projectFeedbackBlock()}<div class="project-step-actions">${done ? `<button class="primary-action" data-action="advance-project-step">Build an evidence chain ${icon("arrow", 16)}</button>` : `<button class="primary-action" data-action="submit-applied-reasoning" ${ui.projectSelectedIndex == null ? "disabled" : ""}>Review reasoning</button>`}</div></div>`;
  }
  if (step === 5) return renderEvidenceChainStep(project, active, view);
  if (step === 6) {
    const done = Boolean(active.decisions.recommendation?.correct);
    return `<div class="project-step recommendation-step"><p class="folio-label">Professional recommendation</p><h2>${escapeHTML(project.recommendation.prompt)}</h2>${sourceJudgmentSummary(project, active, view, true)}${evidenceChainSummary(project, active, true)}<div class="recommendation-options">${view.recommendationOptions.map((option, index) => `<button class="${ui.projectSelectedIndex === index ? "selected" : ""}" data-action="select-project-option" data-index="${index}"><strong>${escapeHTML(option.label)}</strong><span>${escapeHTML(option.detail)}</span></button>`).join("")}</div>${projectFeedbackBlock()}<div class="project-step-actions">${done ? `<button class="primary-action" data-action="advance-project-step">Review late evidence ${icon("arrow", 16)}</button>` : `<button class="primary-action" data-action="submit-applied-recommendation" ${ui.projectSelectedIndex == null ? "disabled" : ""}>Check preliminary recommendation</button>`}</div></div>`;
  }
  if (step === 7) return renderDecisionRevisionStep(project, active, view);
  if (step === 8) {
    const rationaleReady = String(active.rationale || "").trim().length >= 40;
    const recommendationIndex = active.decisions?.recommendation?.selectedIndex;
    const recommendation = Number.isInteger(recommendationIndex) ? project.recommendation.options[recommendationIndex] : null;
    return `<div class="project-step rationale-step"><p class="folio-label">Field-note rationale</p><h2>Explain the chain in your own words.</h2><p>This writing is saved in your portfolio but is not auto-graded. Explain the final professional position, including what the late evidence changed, confirmed, weakened, or forced you to investigate.</p>${sourceJudgmentSummary(project, active, view)}${evidenceChainSummary(project, active)}${decisionRevisionSummary(active, view)}${recommendation ? `<div class="filed-recommendation"><span>Recommendation selected</span><strong>${escapeHTML(recommendation.label)}</strong><p>${escapeHTML(recommendation.detail)}</p></div>` : ""}<label class="rationale-field"><span>Your field-note rationale <em>saved locally · not auto-graded</em></span><textarea data-project-rationale maxlength="800" placeholder="Explain how the original evidence supported your preliminary recommendation, what the late evidence changed or confirmed, and why your final professional response is responsible.">${escapeHTML(active.rationale || "")}</textarea><small>${String(active.rationale || "").trim().length}/40 minimum characters</small></label><div class="project-step-actions"><button class="primary-action" data-action="advance-project-step" data-rationale-gate ${rationaleReady ? "" : "disabled"}>Submit for impact review ${icon("arrow", 16)}</button></div></div>`;
  }
  return `<div class="project-step impact-step"><p class="folio-label">${escapeHTML(project.domainName)} impact</p><h2>${escapeHTML(project.consequence.headline)}</h2><div class="impact-signal">${icon("spark", 25)}<span>${escapeHTML(project.consequence.worldChange)}</span></div><p>${escapeHTML(project.consequence.summary)}</p><div class="impact-next"><strong>Next objective</strong><span>${escapeHTML(project.consequence.nextObjective)}</span></div><button class="primary-action" data-action="complete-applied-project">File final evidence record ${icon("arrow", 16)}</button></div>`;
}

function projectScreen() {
  if (profile.stage !== "High School") return trailScreen();
  const active = profile.appliedProjects?.active;
  if (!active) {
    const domains = domainCompletion(profile);
    return `<main class="scene project-scene project-intro-scene" id="main-content"><div class="project-world-shade"></div><section class="project-intro-card network-intro-card guided-project-start"><p class="eyebrow">${icon("map", 16)} Career Projects</p><h1>Start here.</h1><p class="network-start-note">Choose the gold button. You will get one short real-world assignment, and the game will explain what to do at every step.</p><div class="project-purpose"><strong>What happens in a project?</strong><p>You read a situation, review evidence, learn precise vocabulary, and make a recommendation. You do not need to know the career beforehand.</p></div><button class="primary-action network-start-action" data-action="start-project">Start my first project ${icon("arrow", 18)}</button><p class="network-domain-heading">Projects can come from these career areas:</p><div class="network-domain-list large-domain-list">${domains.map((domain) => `<span class="${domain.completed ? "touched" : ""}"><b>${escapeHTML(domain.shortName)}</b><em>${domain.completed ? `${domain.completed} completed` : "Projects waiting"}</em></span>`).join("")}</div></section><div class="project-intro-pair" aria-hidden="true"><img src="/apps/vocabulary-adventure/assets/high-school-pair.webp" alt=""></div></main>${bottomNavigation("project")}`;
  }
  const baseProject = getCivicProject(active.briefId);
  const project = appliedProjectView(baseProject, active).project;
  const progress = Math.round(((active.stepIndex + 1) / 10) * 100);
  return `<main class="scene project-scene domain-${escapeHTML(project.domainId)}" id="main-content">
    <div class="project-world-shade"></div>
    <div class="project-pair" aria-hidden="true"><img src="/apps/vocabulary-adventure/assets/high-school-pair.webp" alt=""></div>
    <aside class="project-brief-rail"><p class="eyebrow">${escapeHTML(project.district)}</p><span class="domain-badge">${escapeHTML(project.domainName)}</span><span class="rail-scenario">${escapeHTML(project.scenarioLabel || "Core field condition")}</span><div class="role-line"><span>TEAM ROLE</span><strong>${escapeHTML(project.role)}</strong></div><strong>${escapeHTML(project.briefNumber)}</strong><p>${escapeHTML(project.objective)}</p><div class="field-label-stack">${project.labels.map((label) => `<span>${escapeHTML(label)}</span>`).join("")}</div><button class="text-action" data-action="go-home">Save & leave field review</button></aside>
    <section class="project-tablet">${renderProjectStep(project, active)}</section>
    <footer class="project-progress"><span>Project Progress</span><div class="project-progress-track"><i style="width:${progress}%"></i>${Array.from({length:10}, (_, index) => `<b class="${index < active.stepIndex ? "done" : index === active.stepIndex ? "current" : ""}" title="${projectStepLabel(index)}"></b>`).join("")}</div><strong>${active.stepIndex + 1} of 10 · ${escapeHTML(projectStepLabel(active.stepIndex))}</strong></footer>
  </main>${bottomNavigation("project")}`;
}

function pageBack(label = "Home", action = "go-home") {
  return `<button class="back-button" data-action="${escapeHTML(action)}">${icon("back", 16)} ${escapeHTML(label)}</button>`;
}

function shopScreen() {
  const allItems = getShopItemsForStage(profile.stage);
  const categories = getShopCategoriesForStage(profile.stage);
  const activeCategory = ui.shopCategory === "All" || categories.includes(ui.shopCategory) ? ui.shopCategory : "All";
  const stageItems = activeCategory === "All" ? allItems : allItems.filter((item) => item.category === activeCategory);
  const selectedId = ui.previewItemId || stageItems[0]?.id;
  const selected = stageItems.find((item) => item.id === selectedId) || stageItems[0];
  const elementary = profile.stage === "Elementary";
  const ownedCount = allItems.filter((item) => profile.ownedItems.includes(item.id)).length;
  const milestone = getPropertyMilestone(profile.stage, profile.ownedItems, profile.construction);
  const completion = allItems.length ? Math.round((milestone.finishedCount / allItems.length) * 100) : 0;
  const previewImage = selected?.placement === "interior" ? "/apps/vocabulary-adventure/assets/word-library.webp" : elementary ? "/apps/vocabulary-adventure/assets/elementary-orchard.webp" : "/apps/vocabulary-adventure/assets/garden-house.webp";
  return `<main class="scene page-scene shop-scene" id="main-content">
    ${pageBack()}
    <section class="page-heading"><p class="eyebrow">${icon("shop", 15)} ${elementary ? "Garden Shop" : "Lifestyle Shop"}</p><h1>${elementary ? `Choose something<br><i>your learning can grow.</i>` : `Build a place<br><i>worth returning to.</i>`}</h1><p>${elementary ? "Estate Credits come only from learning. Every purchase becomes a persistent part of the Cottage Garden." : "Estate improvements are earned only through learning. Architecture, interiors, gardens, recreation, water, and mobility now build one persistent estate."}</p></section>
    ${ui.notice ? `<div class="notice" role="status">${icon("spark", 16)} ${escapeHTML(ui.notice)}</div>` : ""}
    <section class="shop-overview" aria-label="Property progress"><div><span>Property chapter</span><strong>${escapeHTML(milestone.name)}</strong><em>${ownedCount}/${allItems.length} earned · ${milestone.finishedCount} installed</em></div><div><span>Completion</span><strong>${completion}%</strong><em>${milestone.nextName ? `Next: ${escapeHTML(milestone.nextName)} at ${milestone.nextAt} installed` : "Current catalog complete"}</em></div><div><span>Available credits</span><strong>${profile.credits.toLocaleString()}</strong><em>Earned through learning only</em></div></section>
    <div class="shop-category-bar" role="group" aria-label="Shop categories">
      ${["All", ...categories].map((category) => `<button class="${activeCategory === category ? "active" : ""}" data-action="filter-shop" data-category="${escapeHTML(category)}">${escapeHTML(category)}</button>`).join("")}
    </div>
    <div class="shop-layout expanded-catalog">
      <section class="shop-list" aria-label="Property improvements">
        ${stageItems.map((item) => {
          const owned = profile.ownedItems.includes(item.id);
          const unlocked = rankMeets(profile.rank, item.rank);
          const affordable = profile.credits >= item.cost;
          const project = profile.construction[item.id];
          return `<article class="shop-item ${selected?.id === item.id ? "selected" : ""} ${owned ? "owned" : ""}">
            <button class="item-select" data-action="select-shop-item" data-item="${item.id}" aria-label="Preview ${escapeHTML(item.name)}"><span>${icon(item.construction ? "estate" : "leaf", 23)}</span><div><p>${escapeHTML(item.category)}</p><h2>${escapeHTML(item.name)}</h2><em>${escapeHTML(item.description)}</em>${project ? `<small class="build-chip">${escapeHTML(constructionDescription(item.id))}</small>` : ""}</div></button>
            <div class="item-price">${owned ? `<span class="owned-mark">${icon("check", 14)} ${project && project.stage !== "Installed" ? escapeHTML(project.stage) : "Owned"}</span>` : `<small>${escapeHTML(displayRank(profile.stage, item.rank))} rank</small><strong>${icon("coins", 15)} ${item.cost.toLocaleString()}</strong><button data-action="purchase-item" data-item="${item.id}" ${!unlocked || !affordable ? "disabled" : ""}>${!unlocked ? `${icon("lock", 13)} Locked` : !affordable ? "Earn more" : "Purchase"}</button>`}</div>
          </article>`;
        }).join("")}
      </section>
      ${selected ? `<aside class="shop-preview">
        <div class="preview-image"><img src="${previewImage}" alt="${escapeHTML(selected.name)} preview"><span class="preview-ornament ${selected.id}">${icon(selected.construction ? "estate" : "spark", 28)}</span></div>
        <p class="folio-label">${escapeHTML(selected.category)} · Property preview</p><h2>${escapeHTML(selected.name)}</h2><p>${escapeHTML(selected.description)}</p>
        <div class="preview-specs"><span><b>Rank</b>${escapeHTML(displayRank(profile.stage, selected.rank))}</span><span><b>Placement</b>${selected.placement === "interior" ? "Interior collection" : "Visible grounds"}</span><span><b>Build</b>${selected.construction ? "3-stage construction" : "Placed immediately"}</span></div>
        <button class="quiet-action" data-action="preview-estate" data-item="${selected.id}">Preview on my property ${icon("arrow", 15)}</button>
      </aside>` : ""}
    </div>
  </main>${bottomNavigation("shop")}`;
}

function constructionDescription(itemId) {
  const project = profile.construction[itemId];
  if (!project) return "Awaiting an earned improvement";
  if (project.stage === "Surveyed") return "Surveyed · 2 learning sessions to completion";
  if (project.stage === "Foundation") return "Foundation · 1 learning session to completion";
  return "Installed · construction complete";
}

function propertyVisualMarkup(item, preview = false, order = 0) {
  if (!item || item.placement === "interior") return "";
  const project = profile.construction[item.id];
  const buildStage = project?.stage || "Installed";
  const ghost = preview ? "ghost" : "";
  const construction = item.construction ? `construction-visual stage-${buildStage.toLowerCase()}` : "";
  const common = `${ghost} ${construction}`.trim();
  const attrs = `data-property-id="${escapeHTML(item.id)}" style="--property-order:${order}"`;
  const fireflies = (count = 7) => Array.from({ length: count }, (_, index) => `<i style="--i:${index}"></i>`).join("");
  switch (item.visual) {
    case "bench": return `<div class="bench-visual property-visual ${common}" ${attrs}><i></i><span></span></div>`;
    case "pollinator": return `<div class="pollinator-field property-visual ${common}" ${attrs}>${fireflies(11)}</div>`;
    case "birdbath": return `<div class="birdbath-visual property-visual ${common}" ${attrs}><i></i><span></span></div>`;
    case "lanterns": return `<div class="lantern-field property-visual ${profile.stage === "Elementary" ? "elementary-lanterns" : ""} ${common}" ${attrs}>${fireflies(7)}</div>`;
    case "trellis": return `<div class="trellis-visual property-visual ${common}" ${attrs}><i></i><i></i><span></span></div>`;
    case "greenhouse": return `<div class="greenhouse-visual property-visual ${common}" ${attrs}><i></i><span></span></div>`;
    case "pond": return `<div class="pond-visual property-visual ${common}" ${attrs}><i></i><span></span></div>`;
    case "bridge": return `<div class="bridge-visual property-visual ${common}" ${attrs}><i></i><span></span></div>`;
    case "arbor": return `<div class="garden-arch-visual property-visual ${profile.stage === "Elementary" ? "elementary-arbor" : ""} ${common}" ${attrs}><i></i><i></i><span>${icon(profile.stage === "Elementary" ? "book" : "leaf", 19)}</span></div>`;
    case "treehouse": return `<div class="treehouse-visual property-visual ${common}" ${attrs}><i></i><span></span></div>`;
    case "pavilion": return `<div class="pavilion-visual property-visual ${common}" ${attrs}><i></i><span></span></div>`;
    case "lookout": return `<div class="lookout-visual property-visual ${common}" ${attrs}><i></i><span></span></div>`;
    case "bicycles": return `<div class="bicycles-visual property-visual ${common}" ${attrs}><i></i><i></i><span></span></div>`;
    case "terrace": return `<div class="terrace-visual property-visual ${common}" ${attrs}><i></i><span></span><b></b></div>`;
    case "fountain": return `<div class="fountain-visual property-visual ${common}" ${attrs}><i></i><span></span></div>`;
    case "sculpture": return `<div class="sculpture-visual property-visual ${common}" ${attrs}><i></i><span></span></div>`;
    case "reflecting-pool": return `<div class="reflecting-pool-visual property-visual ${common}" ${attrs}><i></i></div>`;
    case "conservatory": return `<div class="conservatory-visual property-visual ${common}" ${attrs}><i></i><span></span></div>`;
    case "tennis": return `<div class="tennis-visual property-visual ${common}" ${attrs}><i></i><span></span></div>`;
    case "swimming-pool": return `<div class="swimming-pool-visual property-visual ${common}" ${attrs}><i></i><span></span></div>`;
    case "pool-pavilion": return `<div class="pool-pavilion-visual property-visual ${common}" ${attrs}><i></i><span></span></div>`;
    case "guest-cottage": return `<div class="guest-cottage-visual property-visual ${common}" ${attrs}><i></i><span></span><b></b></div>`;
    case "estate-cart": return `<div class="estate-cart-visual property-visual ${common}" ${attrs}><i></i><i></i><span></span></div>`;
    default: return "";
  }
}

function highSchoolPropertyScreen() {
  const completedIds = profile.appliedProjects?.completedBriefIds || [];
  const history = profile.appliedProjects?.history || [];
  const completedProjects = completedIds.map((id) => civicProjects.find((project) => project.id === id)).filter(Boolean);
  const domains = domainCompletion(profile);
  const hasWork = completedProjects.length > 0;
  return `<main class="scene hs-property-scene ${hasWork ? "" : "empty-work-scene"}" id="main-content">
    <div class="hs-property-shade"></div>
    <section class="hs-property-copy">
      <p class="eyebrow">${icon("estate", 16)} My Work</p>
      <h1>${hasWork ? `Your completed<br><i>projects.</i>` : `Your work will<br><i>live here.</i>`}</h1>
      <p>${hasWork ? "Every finished career project is saved here so you can look back at the situation, the recommendation you made, and your written reasoning." : "This is your High School portfolio. After you finish your first project, your recommendation and reasoning will be saved here automatically."}</p>
      ${hasWork ? `<div class="estate-badges"><span>${icon("spark", 14)} ${escapeHTML(displayRank("High School", profile.rank))}</span><span>${icon("map", 14)} ${completedIds.length} completed project${completedIds.length === 1 ? "" : "s"}</span></div><div class="portfolio-domain-grid">${domains.filter((domain) => domain.completed).map((domain) => `<span class="active"><b>${escapeHTML(domain.shortName)}</b><em>${domain.completed} completed</em></span>`).join("")}</div>` : `<div class="empty-work-explainer"><strong>Nothing is missing.</strong><p>You simply have not completed a project yet.</p></div>`}
      <button class="primary-action" data-action="go-project">${hasWork ? "Start another project" : "Start my first project"} ${icon("arrow", 18)}</button>
    </section>
    <section class="portfolio-board ${hasWork ? "" : "simple-empty-board"}"><p class="folio-label">${hasWork ? "Completed recommendations" : "Your portfolio"}</p>${hasWork ? completedProjects.map((project) => { const record = [...history].reverse().find((item) => item.briefId === project.id); return `<article><span>${icon("check", 16)}</span><div><small>${escapeHTML(project.domainName)}</small><strong>${escapeHTML(project.title)}</strong><em>${escapeHTML(project.briefNumber)} · ${escapeHTML(record?.scenarioLabel || "Core field condition")}</em><p>${record?.rationale ? escapeHTML(record.rationale) : "Recommendation completed."}</p></div></article>`; }).join("") : `<div class="portfolio-empty guided-empty"><span>${icon("map", 34)}</span><strong>Your first project is waiting.</strong><p>Go to Career Projects and click “Start my first project.” The game will guide you from there.</p><button class="primary-action" data-action="go-project">Go to Career Projects ${icon("arrow", 18)}</button></div>`}</section>
  </main>${bottomNavigation("estate")}`;
}

function estateScreen() {
  if (profile.stage === "High School") return highSchoolPropertyScreen();
  const stageItems = getShopItemsForStage(profile.stage);
  const preview = ui.previewItemId && !profile.ownedItems.includes(ui.previewItemId) ? stageItems.find((item) => item.id === ui.previewItemId) : null;
  const elementary = profile.stage === "Elementary";
  const ownedItems = stageItems.filter((item) => profile.ownedItems.includes(item.id));
  const placedItems = stageItems.filter((item) => profile.ownedItems.includes(item.id) || preview?.id === item.id);
  const outdoorVisuals = placedItems.map((item, index) => propertyVisualMarkup(item, preview?.id === item.id, index)).join("");
  const interiorItems = placedItems.filter((item) => item.placement === "interior");
  const milestone = getPropertyMilestone(profile.stage, profile.ownedItems, profile.construction);
  const completion = milestone.total ? Math.round((milestone.finishedCount / milestone.total) * 100) : 0;
  return `<main class="scene estate-scene" id="main-content">
    ${pageBack()}
    <div class="estate-world ${preview ? "previewing" : ""}">${outdoorVisuals}</div>
    <section class="estate-copy ${elementary ? "elementary-estate-copy" : ""}">
      <p class="eyebrow">${icon("estate", 15)} ${elementary ? "My Garden" : "My Estate"}</p>
      <h1>${escapeHTML(milestone.name)}</h1>
      <p>${escapeHTML(milestone.note)}</p>
      <div class="estate-badges"><span>${icon("spark", 14)} ${escapeHTML(displayRank(profile.stage, profile.rank))}</span><span>${icon("estate", 14)} ${milestone.finishedCount}/${milestone.total} improvements complete</span></div>
      <div class="property-completion"><span><b style="width:${completion}%"></b></span><strong>${completion}% current catalog complete</strong><em>${milestone.finishedCount < milestone.count ? `${milestone.count - milestone.finishedCount} earned construction project${milestone.count - milestone.finishedCount === 1 ? " is" : "s are"} still taking shape.` : milestone.nextName ? `${milestone.nextAt - milestone.finishedCount} more completed improvement${milestone.nextAt - milestone.finishedCount === 1 ? "" : "s"} to ${escapeHTML(milestone.nextName)}` : "Every current property improvement is complete."}</em></div>
      ${preview ? `<div class="preview-note"><strong>Previewing ${escapeHTML(preview.name)}</strong><span>No credits spent yet. ${preview.placement === "interior" ? "This appears in the interior collection." : "The placement is shown on the grounds."}</span></div>` : ""}
      <button class="primary-action" data-action="go-shop">${elementary ? "Choose a garden improvement" : "Browse Lifestyle Shop"} ${icon("arrow", 17)}</button>
    </section>
    ${interiorItems.length ? `<section class="estate-interior-gallery" aria-label="Estate interiors"><p class="folio-label">Interior collection</p><div>${interiorItems.map((item) => { const project = profile.construction[item.id]; const previewing = preview?.id === item.id; return `<article class="${previewing ? "ghost" : ""}"><span>${icon(item.visual === "interior-music" ? "sound" : "book", 18)}</span><div><strong>${escapeHTML(item.name)}</strong><em>${previewing ? "Placement preview" : project ? escapeHTML(constructionDescription(item.id)) : "Interior ready"}</em></div></article>`; }).join("")}</div></section>` : ""}
    <div class="estate-markers">
      ${stageItems.map((item) => {
        const owned = profile.ownedItems.includes(item.id);
        const previewing = preview?.id === item.id;
        const project = profile.construction[item.id];
        const detail = owned ? (project ? constructionDescription(item.id) : item.placement === "interior" ? "Interior ready" : "Placed on your grounds") : previewing ? "Placement preview" : `${displayRank(profile.stage, item.rank)} · ${item.cost} credits`;
        return `<article class="estate-marker ${owned || previewing ? "active" : ""} ${project && project.stage !== "Installed" ? "construction-active" : ""}" data-property-id="${escapeHTML(item.id)}" style="--marker-order:${stageItems.indexOf(item)}"><span>${icon(owned ? "check" : item.construction ? "estate" : "leaf", 16)}</span><div><strong>${escapeHTML(item.name)}</strong><em>${escapeHTML(detail)}</em></div></article>`;
      }).join("")}
    </div>
  </main>${bottomNavigation("estate")}`;
}

function evidenceDots(record) {
  const evidence = record?.evidence || {};
  const exposure = record?.exposureCount || 0;
  const labels = profile.stage === "High School"
    ? [["meaning", "Reason", evidence.meaning || 0], ["use", "Applied", evidence.use || 0], ["recall", "Later use", evidence.recall || 0]]
    : [["exposure", "Heard", exposure], ["spell", "Build", evidence.spell || 0], ["meaning", "Know", evidence.meaning || 0], ["use", "Use", evidence.use || 0], ["recall", "Recall", evidence.recall || 0]];
  return labels.map(([key, label, value]) => `<span class="evidence ${value > 0 ? "earned" : ""}" title="${label}: ${value}"><i></i>${label}</span>`).join("");
}

function collectionScreen() {
  const stageWords = getVocabularyForStage(profile.stage);
  const studied = stageWords.filter((entry) => profile.mastery[entry.id]);
  const elementary = profile.stage === "Elementary";
  const highSchool = profile.stage === "High School";
  const stage = getStageDefinition(profile.stage);
  return `<main class="scene page-scene collection-scene" id="main-content">
    ${pageBack()}
    <section class="page-heading compact"><p class="eyebrow">${icon("book", 15)} ${escapeHTML(stage.archiveLabel)}</p><h1>${elementary ? `Words you have<br><i>grown and gathered.</i>` : highSchool ? `Terms you have<br><i>used in the field.</i>` : `Words you can<br><i>carry forward.</i>`}</h1><p>${elementary ? "You learn a word in small steps. Later adventures bring it back so we can see what you truly remember." : highSchool ? "Words appear here after you use them in a career project. This lets you see which advanced terms you have practiced in real situations." : "Mastery requires varied evidence and a later recall—not one lucky answer."}</p></section>
    <section class="collection-sheet">
      ${studied.length ? studied.map((entry) => {
        const record = profile.mastery[entry.id];
        return `<article><div class="word-title"><h2>${escapeHTML(entry.word)}</h2><p>${escapeHTML(entry.partOfSpeech)} · ${escapeHTML(entry.pronunciation)}</p></div><span class="stage-badge ${record.stage.toLowerCase()}">${record.stage}</span><p class="word-definition">${escapeHTML(elementary ? (entry.simpleDefinition || entry.definition) : entry.definition)}</p><div class="evidence-row">${evidenceDots(record)}</div><div class="word-origin"><span>${entry.syllables.map(escapeHTML).join(" · ")}</span><span>${escapeHTML(entry.root.origin)} <b>${escapeHTML(entry.root.form)}</b>: ${escapeHTML(entry.root.meaning)}</span></div></article>`;
      }).join("") : `<div class="collection-empty">${icon("book", 31)}<h2>${elementary ? "Your first word is waiting." : highSchool ? "Your first field term is waiting." : "Your first words are waiting."}</h2><p>${elementary ? "Enter the orchard. Maya will teach the word before you are asked to use it." : highSchool ? "Start a career project. The game introduces advanced words as you use them to understand evidence and make a decision." : "Enter the East Garden. Every completed vocabulary stone adds evidence here."}</p><button class="primary-action" data-action="${highSchool ? "go-project" : "start-trail"}">${elementary ? "Find my first word" : highSchool ? "Start a career project" : "Begin the trail"} ${icon("arrow", 17)}</button></div>`}
    </section>
  </main>${bottomNavigation("collection")}`;
}

function settingsScreen() {
  const stage = getStageDefinition(profile.stage);
  const elementary = profile.stage === "Elementary";
  const highSchool = profile.stage === "High School";
  const activeWork = Boolean(profile.activeSession || profile.appliedProjects?.active);
  const resetReady = ui.resetPhrase.trim().toUpperCase() === "RESET";
  return `<main class="scene page-scene settings-scene" id="main-content">
    ${pageBack()}
    <section class="page-heading compact"><p class="eyebrow">${icon("gear", 15)} Settings & learner supports</p><h1>Make the experience<br><i>work for you.</i></h1><p>Learning supports stay with this browser profile. They change presentation and access—not the academic standard or the meaning of mastery.</p></section>
    ${ui.notice ? `<div class="notice" role="status">${escapeHTML(ui.notice)}</div>` : ""}
    <section class="settings-folio phase14-settings">
      <div class="settings-section-heading"><span>Learning supports</span><strong>Audio, reading, motion, and visual access</strong></div>
      <label class="setting-row"><span><strong>Spoken-word captions</strong><em>${elementary ? "Keep the written word visible while it is introduced." : highSchool ? "Keep professional vocabulary readable when a field brief introduces it." : "Show the written word during the Hear phase. The Build phase still conceals it."}</em></span><input type="checkbox" data-setting="captions" ${profile.settings.captions ? "checked" : ""}><i></i></label>
      <label class="setting-row"><span><strong>Pronounce new words automatically</strong><em>Play the word when a Meet It / Hear encounter opens. The sound button still works when this is off.</em></span><input type="checkbox" data-setting="autoPronounce" ${profile.settings.autoPronounce ? "checked" : ""}><i></i></label>
      <label class="setting-row"><span><strong>Slower pronunciation</strong><em>Play vocabulary at a more deliberate pace without changing the word or challenge.</em></span><input type="checkbox" data-setting="slowSpeech" ${profile.settings.slowSpeech ? "checked" : ""}><i></i></label>
      <label class="setting-row"><span><strong>Larger learning text</strong><em>Increase instructional text, answer choices, field evidence, and learner-written work without enlarging decorative headings.</em></span><input type="checkbox" data-setting="largeText" ${profile.settings.largeText ? "checked" : ""}><i></i></label>
      <label class="setting-row"><span><strong>Higher contrast</strong><em>Strengthen panel, text, focus, and control contrast while preserving the stage artwork.</em></span><input type="checkbox" data-setting="highContrast" ${profile.settings.highContrast ? "checked" : ""}><i></i></label>
      <label class="setting-row"><span><strong>Readable learning type</strong><em>Use the clean interface typeface for instructional paragraphs and response text instead of decorative serif styling.</em></span><input type="checkbox" data-setting="readableType" ${profile.settings.readableType ? "checked" : ""}><i></i></label>
      <label class="setting-row"><span><strong>Reduced motion</strong><em>Quiet stones, particles, path glow, construction reveals, and other decorative motion. Learning information remains visible in text.</em></span><input type="checkbox" data-setting="reducedMotion" ${profile.settings.reducedMotion ? "checked" : ""}><i></i></label>

      <div class="settings-section-heading"><span>Learning path</span><strong>Choose the experience that fits you now</strong></div>
      <div class="settings-path-grid" aria-label="Change learning path">${learningPathCards("select-stage", true)}</div>
      <p class="path-switch-note">Each path keeps its own rank and completed-session progress. If a trail or professional brief is currently open, finish or save that work before switching.</p>

      <div class="settings-section-heading"><span>Keyboard & touch</span><strong>No mouse is required</strong></div>
      <div class="accessibility-guide" aria-label="Keyboard shortcuts"><span><kbd>Tab</kbd><em>Move through controls</em></span><span><kbd>1–9</kbd><em>Select a visible single-choice response</em></span><span><kbd>P</kbd><em>Pronounce the active trail word</em></span><span><kbd>Esc</kbd><em>Leave an active trail or field brief for Home</em></span></div>
      <div class="profile-row"><span><strong>Active experience</strong><em>${escapeHTML(stage.label)} · ${elementary ? "explicit teaching before independent practice" : highSchool ? "evidence, precision, professional reasoning, and consequential recommendations" : "two equal learning partners with increasing independence"}</em></span><b>${stage.order}</b></div>

      <div class="settings-section-heading"><span>Progress & portability</span><strong>Adult / educator tools without answer keys</strong></div>
      <div class="progress-entry"><span><strong>Adult / Educator progress</strong><em>See mastery, review needs, first-attempt patterns, and applied transfer. Future questions, correct choices, and challenge scripts stay hidden.</em></span><button class="quiet-action" data-action="go-educator-progress">Open educator report ${icon("arrow", 15)}</button></div>
      <div class="data-action-row"><span><strong>Full learner backup</strong><em>Save the complete local learner state before changing devices, clearing browser data, or resetting progress.</em></span><div><button class="quiet-action" data-action="export-backup">Download backup</button><button class="text-action" data-action="trigger-restore">Restore backup</button><input class="visually-hidden-file" type="file" accept="application/json,.json" data-restore-backup tabindex="-1" aria-label="Choose Vocabulary Adventure backup file"></div></div>

      <div class="settings-section-heading danger-heading"><span>Local data</span><strong>Reset is intentionally difficult to do by accident</strong></div>
      <div class="reset-row"><span><strong>Reset local progress</strong><em>Erase mastery, credits, purchases, construction, settings, and applied-project history from this browser.${activeWork ? " There is unfinished learning work in progress." : ""}</em></span><button class="danger-action" data-action="arm-reset">${ui.resetArmed ? "Reset review open" : "Review reset"}</button></div>
      ${ui.resetArmed ? `<div class="reset-confirm-panel" role="group" aria-label="Confirm local progress reset"><strong>Before erasing anything</strong><p>Download a backup if this progress may be needed later. Then type <b>RESET</b> exactly. This action cannot be undone from inside the app.</p><div class="reset-safeguard-actions"><button class="quiet-action" data-action="export-backup">Download backup first</button><label><span>Type RESET</span><input type="text" autocomplete="off" spellcheck="false" data-reset-confirm value="${escapeHTML(ui.resetPhrase)}"></label><button class="danger-action" data-action="confirm-reset" ${resetReady ? "" : "disabled"}>Erase all local progress</button><button class="text-action" data-action="cancel-reset">Cancel</button></div></div>` : ""}
    </section>
  </main>${bottomNavigation("settings")}`;
}

function clampPercent(value) {
  return Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
}

function highSchoolLearnerProgressScreen() {
  const completed = profile.appliedProjects?.completedBriefIds?.length || 0;
  const domains = domainCompletion(profile);
  const touched = domains.filter((domain) => domain.completed > 0).length;
  const wordIds = new Set(getVocabularyForStage("High School").map((entry) => entry.id));
  const records = Object.values(profile.mastery).filter((record) => wordIds.has(record.wordId));
  const active = profile.appliedProjects?.active;
  const activeProject = active ? getCivicProject(active.briefId) : null;
  return `<main class="scene page-scene hs-learner-progress-scene" id="main-content">
    ${pageBack("Home", "go-home")}
    <section class="page-heading hs-progress-heading"><p class="eyebrow">${icon("spark", 15)} High School · My Progress</p><h1>Your career project<br><i>journey.</i></h1><p>This is your learner view. It shows what you have completed and what to do next without educator-only analytics.</p></section>
    <section class="hs-progress-shell">
      <article class="hs-progress-next">
        <p class="folio-label">What to do next</p>
        <h2>${activeProject ? "Continue your current project" : completed ? "Start another career project" : "Start your first career project"}</h2>
        <p>${activeProject ? `You are working as ${escapeHTML(activeProject.role)} in ${escapeHTML(activeProject.domainName)}. Continue where you left off.` : "Choose a career project. You will investigate a situation, review evidence, use precise vocabulary, and make a recommendation."}</p>
        <button class="primary-action" data-action="start-project" ${active ? `data-project="${escapeHTML(active.briefId)}"` : ""}>${activeProject ? "Continue my project" : "Start a career project"} ${icon("arrow", 18)}</button>
      </article>
      <div class="hs-progress-overview">
        <article><span>Career projects finished</span><strong>${completed}</strong><em>Completed recommendations saved in My Work</em></article>
        <article><span>Career areas explored</span><strong>${touched}/${highSchoolDomains.length}</strong><em>Planning, health, business, engineering, environment, and civic communication</em></article>
        <article><span>Professional words used</span><strong>${records.length}</strong><em>Vocabulary used inside real-world decisions</em></article>
        <article><span>Current rank</span><strong>${escapeHTML(displayRank("High School", profile.rank))}</strong><em>Your rank grows through completed applied work</em></article>
      </div>
      <section class="hs-progress-explainer">
        <p class="folio-label">How a career project works</p>
        <h2>One project, three big moves</h2>
        <div class="hs-progress-steps"><article><b>1</b><strong>Investigate</strong><p>Read the assignment and decide which evidence matters.</p></article><article><b>2</b><strong>Use the right words</strong><p>Choose precise professional vocabulary and explain what the evidence supports.</p></article><article><b>3</b><strong>Make the call</strong><p>Recommend an action. If new evidence arrives, decide whether your recommendation should stay, narrow, pause, or change.</p></article></div>
      </section>
      <section class="hs-progress-domains">
        <p class="folio-label">Career areas</p><h2>Where you have worked</h2>
        <div class="hs-domain-cards">${domains.map((domain) => `<article class="${domain.completed ? "active" : ""}"><strong>${escapeHTML(domain.shortName)}</strong><span>${domain.completed} of ${domain.total} completed</span><em>${domain.completed ? "Experience recorded" : "Projects waiting"}</em></article>`).join("")}</div>
      </section>
      <p class="hs-educator-note">Need detailed mastery, first-attempt, or transfer data? The Adult / Educator report is available in Settings.</p>
    </section>
  </main>${bottomNavigation("progress")}`;
}

function progressScreen() {
  const now = Date.now();
  const stageWords = getVocabularyForStage(profile.stage);
  const stageIds = new Set(stageWords.map((entry) => entry.id));
  const records = Object.values(profile.mastery).filter((record) => stageIds.has(record.wordId));
  const events = profile.challengeHistory.filter((event) => event.learningStage === profile.stage && event.skill !== "exposure");
  const correct = events.filter((event) => event.correct).length;
  const accuracy = events.length ? Math.round((correct / events.length) * 100) : 0;
  const due = records.filter((record) => record.nextReviewAt <= now);
  const mastered = records.filter((record) => record.stage === "Mastered").length;
  const strong = records.filter((record) => record.stage === "Strong").length;
  const practicing = records.filter((record) => ["Familiar", "Practicing"].includes(record.stage)).length;
  const elementary = profile.stage === "Elementary";
  const highSchool = profile.stage === "High School";
  const highSchoolInsights = highSchool ? buildHighSchoolEducatorInsights(profile) : null;
  const skillLabels = highSchool
    ? [["meaning", "Evidence reasoning"], ["use", "Applied precision"], ["recall", "Later reuse"]]
    : [["spell", "Build"], ["meaning", "Meaning"], ["use", "Use"], ["recall", "Later recall"]];
  const skills = skillLabels.map(([key, label]) => {
    const earned = records.reduce((sum, record) => sum + Math.min(3, record.evidence?.[key] || 0), 0);
    const possible = Math.max(1, records.length * 3);
    return { key, label, percent: clampPercent((earned / possible) * 100) };
  });
  const needsSupport = [...records]
    .filter((record) => record.wrongTotal > 0 || ["New", "Familiar"].includes(record.stage))
    .sort((a, b) => (b.wrongTotal - a.wrongTotal) || (a.correctTotal - b.correctTotal))
    .slice(0, 8);
  const repairLabels = {
    "confusable-term": "Confusable words",
    "letter-order": "Spelling structure",
    "relationship-reversal": "Same vs. opposite",
    "definition-mismatch": "Core meaning",
    "precision-pair": "Word precision",
    "context-recall": "Context recall",
    "precision-choice": "Precise term choice",
    "context-mismatch": "Context fit",
    "meaning-neighbor": "Meaning relationship"
  };
  const repairCounts = events.filter((event) => !event.correct && event.errorType).reduce((counts, event) => {
    counts[event.errorType] = (counts[event.errorType] || 0) + 1;
    return counts;
  }, {});
  const repairPatterns = Object.entries(repairCounts).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const misconceptionCounts = events.filter((event) => !event.correct && event.misconceptionId).reduce((counts, event) => {
    counts[event.misconceptionId] = (counts[event.misconceptionId] || 0) + 1;
    return counts;
  }, {});
  const repeatedConfusions = Object.entries(misconceptionCounts).sort((a, b) => b[1] - a[1]).filter(([, count]) => count > 1).slice(0, 3);
  const stageCards = stageDefinitions.map((stage) => {
    const progress = stage.label === profile.stage
      ? { rank: profile.rank, completedSessions: profile.completedSessions }
      : (profile.stageProgress?.[stage.label] || { rank: "Pathfinder", completedSessions: 0 });
    return `<article class="stage-progress-card ${stage.label === profile.stage ? "active" : ""}"><span>${stage.order}</span><div><strong>${escapeHTML(stage.label)}</strong><em>${stage.status === "available" ? `${escapeHTML(displayRank(stage.label, progress.rank))} · ${progress.completedSessions} ${stage.label === "High School" ? `brief${progress.completedSessions === 1 ? "" : "s"}` : `session${progress.completedSessions === 1 ? "" : "s"}`}` : "Applied experience coming next"}</em></div></article>`;
  }).join("");

  return `<main class="scene page-scene progress-scene" id="main-content">
    ${pageBack("Settings", "go-settings")}
    <section class="page-heading compact"><p class="eyebrow">${icon("book", 15)} Adult / Educator progress</p><h1>See the learning,<br><i>not an answer key.</i></h1><p>This view summarizes evidence already earned. It does not expose future questions, correct choices, or challenge scripts.</p></section>
    <div class="progress-export-bar" aria-label="Progress report actions"><button class="quiet-action" data-action="export-progress-csv">Download CSV report</button><button class="quiet-action" data-action="export-progress-json">Download JSON report</button><button class="text-action" data-action="print-progress">Print / Save PDF</button><span>Exports contain learning evidence and support patterns only—never answer keys.</span></div>
    <section class="progress-dashboard">
      <div class="progress-overview">
        <article><span>Words introduced</span><strong>${records.length}</strong><em>of ${stageWords.length} in the current bank</em></article>
        <article><span>Strong / Mastered</span><strong>${strong + mastered}</strong><em>${mastered} mastered with later recall</em></article>
        <article><span>${highSchool ? "Briefs filed" : "Review ready"}</span><strong>${highSchool ? (profile.appliedProjects?.completedBriefIds?.length || 0) : due.length}</strong><em>${elementary ? "At most two due words enter one garden adventure when fresh words are available." : highSchool ? "Completed recommendations remain in the Applied Work Portfolio." : "Due words are prioritized on the next trail."}</em></article>
        <article><span>Assessed accuracy</span><strong>${accuracy}%</strong><em>${events.length} scored response${events.length === 1 ? "" : "s"}; teaching exposures excluded</em></article>
      </div>
      <div class="progress-columns">
        <section class="progress-panel"><p class="folio-label">Evidence by skill</p><h2>What the learner can show</h2><div class="skill-bars">${skills.map((skill) => `<div><span><b>${escapeHTML(skill.label)}</b><em>${skill.percent}%</em></span><i><b style="width:${skill.percent}%"></b></i></div>`).join("")}</div><p class="privacy-note">A low bar means the learner needs more varied evidence. It is not a grade.</p></section>
        <section class="progress-panel"><p class="folio-label">Needs another look</p><h2>${needsSupport.length ? "Words to revisit" : "No support flags yet"}</h2>${needsSupport.length ? `<div class="support-word-list">${needsSupport.map((record) => { const entry = getVocabularyWord(record.wordId); return `<article><strong>${escapeHTML(entry.word)}</strong><span>${escapeHTML(record.stage)}</span><em>${record.wrongTotal} miss${record.wrongTotal === 1 ? "" : "es"} · ${record.correctTotal} successful response${record.correctTotal === 1 ? "" : "s"}</em></article>`; }).join("")}</div>` : `<p class="empty-progress">${highSchool ? "Complete a professional field brief and this area will identify terms that need another applied encounter." : "Complete a learning adventure and this area will identify words that need another encounter."}</p>`}${!elementary && repairPatterns.length ? `<div class="repair-patterns"><p class="folio-label">Repair patterns</p>${repairPatterns.map(([type, count]) => `<span><b>${escapeHTML(repairLabels[type] || type)}</b><em>${count} observed</em></span>`).join("")}${repeatedConfusions.length ? `<small>${repeatedConfusions.length} repeated confusable-word famil${repeatedConfusions.length === 1 ? "y" : "ies"} will receive targeted comparison again.</small>` : ""}</div>` : ""}</section>
      </div>
      ${highSchool && highSchoolInsights ? `<section class="progress-panel applied-domain-insights"><p class="folio-label">Applied strength by professional context</p><h2>Can the learner use the idea where the work changes?</h2><p class="privacy-note">These are evidence summaries, not grades. First-attempt patterns matter because repeated retries should not hide where support was needed.</p><div class="domain-insight-grid">${highSchoolInsights.domains.map((domain) => `<article><div><strong>${escapeHTML(domain.shortName)}</strong><span>${escapeHTML(domain.evidenceLevel)}</span></div><b>${domain.firstAttemptAccuracy == null ? "—" : `${domain.firstAttemptAccuracy}%`}</b><em>${domain.filed} filed brief${domain.filed === 1 ? "" : "s"} · first-attempt evidence</em><small>Source judgment ${domain.sourceJudgmentAccuracy == null ? "—" : `${domain.sourceJudgmentAccuracy}%`} · Precision ${domain.vocabularyAccuracy == null ? "—" : `${domain.vocabularyAccuracy}%`} · Reasoning ${domain.reasoningAccuracy == null ? "—" : `${domain.reasoningAccuracy}%`} · Evidence chain ${domain.evidenceChainAccuracy == null ? "—" : `${domain.evidenceChainAccuracy}%`} · Preliminary rec ${domain.recommendationAccuracy == null ? "—" : `${domain.recommendationAccuracy}%`} · Decision revision ${domain.decisionRevisionAccuracy == null ? "—" : `${domain.decisionRevisionAccuracy}%`}</small></article>`).join("")}</div></section><section class="progress-panel transfer-insights"><p class="folio-label">Transfer evidence</p><h2>${highSchoolInsights.crossDomainTransfer.length ? "Words carried into a different field" : "Cross-domain transfer is still being built"}</h2>${highSchoolInsights.transfer.length ? `<div class="transfer-list">${highSchoolInsights.transfer.slice(0, 8).map((item) => `<article class="${item.level === "Cross-domain transfer" ? "transferred" : ""}"><span>${icon(item.level === "Cross-domain transfer" ? "spark" : "book", 17)}</span><div><strong>${escapeHTML(item.word)}</strong><em>${escapeHTML(item.level)}</em><small>${escapeHTML(item.domainNames.join(" → "))}</small></div></article>`).join("")}</div>` : `<p class="empty-progress">When a professional term is used successfully in more than one district, this view will distinguish repeated exposure from genuine cross-domain transfer.</p>`}${highSchoolInsights.precisionRepairs.length ? `<div class="hs-repair-patterns"><p class="folio-label">Precision repairs observed</p>${highSchoolInsights.precisionRepairs.slice(0, 5).map(([type, count]) => `<span><b>${escapeHTML(type.replaceAll("-", " "))}</b><em>${count} repair${count === 1 ? "" : "s"}</em></span>`).join("")}</div>` : ""}</section>` : ""}
      <section class="progress-panel stage-progress"><p class="folio-label">Developmental paths</p><h2>One learner, three experiences</h2><div class="stage-progress-grid">${stageCards}</div></section>
    </section>
  </main>${bottomNavigation("settings")}`;
}


function highSchoolSummaryScreen() {
  const stats = profile.lastSession || { creditsEarned: 0, wrong: 0, exposures: 0 };
  const history = profile.appliedProjects?.history || [];
  const latest = history[history.length - 1];
  const project = latest ? getCivicProject(latest.briefId) : nextCivicProject(profile);
  return `<main class="scene summary-scene hs-summary-scene" id="main-content">
    <section class="summary-folio hs-summary-folio">
      <div class="summary-seal">${icon("map", 31)}</div>
      <p class="eyebrow">Professional brief filed</p>
      <h1>${escapeHTML(project.title)}<br><i>entered the portfolio.</i></h1>
      <p>${escapeHTML(project.consequence.summary)}</p>
      <div class="session-stats"><span><strong>${stats.exposures || 0}</strong> Evidence cards</span><span><strong>${Math.max(0, 3)}</strong> Decisions supported</span><span><strong>${stats.creditsEarned || 0}</strong> Credits</span><span><strong>${stats.wrong || 0}</strong> Revisions</span></div>
      <div class="summary-reveal">${icon("spark", 22)}<span><strong>${escapeHTML(displayRank("High School", profile.rank))}</strong><em>Applied progress grows from evidence-based decisions across different briefs.</em></span></div>
      <div class="summary-actions"><button class="primary-action" data-action="go-estate">Open my portfolio ${icon("arrow", 17)}</button><button class="quiet-action" data-action="go-project">Return to Career Projects</button><button class="text-action" data-action="go-home">High School home</button></div>
    </section>
  </main>`;
}

function summaryScreen() {
  if (profile.stage === "High School") return highSchoolSummaryScreen();
  const stats = profile.lastSession || { correct: 0, wrong: 0, exposures: 0, creditsEarned: 0, strengthened: 0, mastered: 0 };
  const elementary = profile.stage === "Elementary";
  return `<main class="scene summary-scene" id="main-content">
    <section class="summary-folio ${elementary ? "elementary-folio" : ""}">
      <div class="summary-seal">${icon("leaf", 31)}</div>
      <p class="eyebrow">${elementary ? "Garden adventure complete" : "East Garden complete"}</p>
      <h1>${elementary ? `You helped five words<br><i>take root.</i>` : `The path remembers<br><i>what you learned.</i>`}</h1>
      <p>${elementary ? "Your words, Estate Credits, and garden progress are saved. Some words will return later so you can show what you still remember." : "Your session is safely stored. The garden, Word Archive, rank, credits, and construction will be here when you return."}</p>
      <div class="session-stats"><span><strong>${stats.exposures || 0}</strong> ${elementary ? "Taught" : "Heard"}</span><span><strong>${stats.correct}</strong> Accurate</span><span><strong>${stats.creditsEarned}</strong> Credits</span><span><strong>${stats.strengthened}</strong> Strengthened</span><span><strong>${stats.mastered}</strong> Mastered</span></div>
      <div class="summary-reveal">${icon("spark", 22)}<span><strong>${escapeHTML(displayRank(profile.stage, profile.rank))}</strong><em>${profile.rank === "Seasoned" ? (elementary ? "New Cottage Garden choices are now available." : "New estate improvements are now available.") : "Keep building varied evidence across later adventures."}</em></span></div>
      <div class="summary-actions"><button class="primary-action" data-action="go-shop">${elementary ? "Visit Garden Shop" : "Visit Lifestyle Shop"} ${icon("arrow", 17)}</button><button class="quiet-action" data-action="go-estate">${elementary ? "See my garden" : "See my estate"}</button><button class="text-action" data-action="start-new-trail">${elementary ? "Find five more words" : "Begin another trail"}</button></div>
    </section>
  </main>`;
}

function screenContent() {
  if (!profile.onboardingComplete) return onboardingScreen();
  if (screen === "trail") return trailScreen();
  if (screen === "project") return projectScreen();
  if (screen === "shop") return shopScreen();
  if (screen === "estate") return estateScreen();
  if (screen === "collection") return collectionScreen();
  if (screen === "settings") return settingsScreen();
  if (screen === "progress") return profile.stage === "High School" ? highSchoolLearnerProgressScreen() : progressScreen();
  if (screen === "educator-progress") return progressScreen();
  if (screen === "summary") return summaryScreen();
  return homeScreen();
}

function decorateKeyboardChoices() {
  const choices = [...app.querySelectorAll('[data-action="select-option"], [data-action="select-project-option"]')];
  choices.forEach((button, index) => {
    if (index < 9) button.setAttribute("aria-keyshortcuts", String(index + 1));
    button.setAttribute("aria-pressed", String(button.classList.contains("selected")));
  });
  app.querySelectorAll('[data-action="toggle-chain-evidence"]').forEach((button) => {
    button.setAttribute("aria-pressed", String(button.classList.contains("selected")));
  });
  const speak = app.querySelector('[data-action="speak-word"]');
  if (speak) speak.setAttribute("aria-keyshortcuts", "P");
}

function render(focusHeading = false, focusSelector = null) {
  document.documentElement.dataset.reducedMotion = String(profile.settings.reducedMotion);
  document.documentElement.dataset.largeText = String(profile.settings.largeText);
  document.documentElement.dataset.highContrast = String(profile.settings.highContrast);
  document.documentElement.dataset.readableType = String(profile.settings.readableType);
  const screenTitles = {
    home: profile.onboardingComplete ? "Home" : "Choose Your Learning Path",
    trail: profile.stage === "Elementary" ? "Garden Trail" : "East Garden",
    project: "Career Projects",
    shop: profile.stage === "Elementary" ? "Garden Shop" : "Lifestyle Shop",
    estate: profile.stage === "High School" ? "My Work" : profile.stage === "Elementary" ? "My Garden" : "My Estate",
    collection: getStageDefinition(profile.stage).archiveLabel,
    settings: "Settings & Learner Supports",
    progress: profile.stage === "High School" ? "My Progress" : "Adult / Educator Progress",
    "educator-progress": "Adult / Educator Progress",
    summary: "Learning Summary"
  };
  document.title = `${screenTitles[screen] || "Vocabulary Adventure"} · ECCOOZS Vocabulary Adventure`;
  const stageClass = `stage-${getStageDefinition(profile.stage).id}`;
  const previousScreen = lastRenderedScreen;
  app.innerHTML = `<a class="skip-link" href="#main-content">Skip to content</a><div class="experience screen-${screen} ${stageClass}" data-stage="${escapeHTML(profile.stage)}">${header()}${ambientAtmosphere()}${screenContent()}<div class="sr-live" aria-live="polite" aria-atomic="true">${escapeHTML(ui.notice)}</div></div>`;
  decorateKeyboardChoices();
  if (focusSelector) {
    const target = app.querySelector(focusSelector);
    if (target) target.focus({ preventScroll: true });
  } else if (focusHeading) {
    const heading = app.querySelector("main h1, main h2");
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  }
  lastRenderedScreen = screen;
  window.requestAnimationFrame(() => animateRenderedChanges(previousScreen));
}

function go(destination, options = {}) {
  screen = destination;
  ui = { ...freshTransientState(), previewItemId: options.previewItemId || null };
  const url = new URL(window.location.href);
  url.searchParams.set("screen", destination);
  window.history.replaceState({}, "", url);
  render(true);
}

function resetChallengeUI() {
  ui.selectedOption = null;
  ui.typedResponse = "";
  ui.buildTokens = [];
  ui.feedback = null;
  ui.hintShown = false;
  ui.notice = "";
}

function playActiveWord() {
  const state = activeChallengeState();
  if (!state) return;
  const played = speakWord(state.entry.word, profile.settings.slowSpeech);
  if (!played) {
    save({ ...profile, settings: { ...profile.settings, captions: true } });
    ui.notice = "Audio is unavailable in this browser, so the spoken-word caption was enabled automatically.";
    render();
  }
}

function beginOrResumeTrail(forceNew = false) {
  if (forceNew && profile.activeSession) return;
  if (!profile.activeSession) save(startSession(profile, Date.now(), Date.now()));
  go("trail");
  if (profile.settings.autoPronounce) window.setTimeout(playActiveWord, 80);
}

function beginOrResumeProject(projectId = null) {
  if (profile.stage !== "High School") return go("home");
  if (!profile.appliedProjects?.active) save(startAppliedProject(profile, projectId || null, Date.now(), Date.now()));
  go("project");
}

function resolveActiveChallenge() {
  const state = activeChallengeState();
  if (!state || ui.feedback) return;
  let response = state.challenge.answer;
  if (state.kind === "build") {
    response = ui.buildTokens.map((id) => state.challenge.letters.find((token) => token.id === id)?.letter || "").join("");
  } else if (state.challenge.inputMode) {
    if (!ui.typedResponse.trim()) return;
    response = ui.typedResponse.trim();
  } else if (state.challenge.options) {
    if (ui.selectedOption == null) return;
    response = state.challenge.options[ui.selectedOption];
  }
  const correct = ["hear", "discover"].includes(state.kind) ? true : answerIsCorrect(state.challenge, response);
  const result = recordChallengeResult(profile, state.challenge, correct, ui.hintShown ? 1 : 0, Date.now(), response);
  save(result.profile);
  ui.feedback = { ...result, correct, challenge: state.challenge, response };
  render();
}

function continueAfterFeedback() {
  if (!ui.feedback) return;
  const wasCorrect = ui.feedback.correct;
  save(wasCorrect ? advanceChallenge(profile) : retryChallenge(profile));
  resetChallengeUI();
  render();
  const next = activeChallengeState();
  if (profile.settings.autoPronounce && ["hear", "discover"].includes(next?.kind)) window.setTimeout(playActiveWord, 80);
}

app.addEventListener("click", (event) => {
  const control = event.target.closest("[data-action]");
  if (!control || control.disabled) return;
  const action = control.dataset.action;

  if (action === "choose-start-stage") {
    const nextStage = control.dataset.stage;
    if (!stageDefinitions.some((stage) => stage.label === nextStage && stage.status === "available")) return;
    let nextProfile = profile;
    if (profile.stage !== nextStage) {
      const result = switchStage(profile, nextStage);
      if (result.status !== "changed") {
        ui.notice = result.message;
        return render();
      }
      nextProfile = result.profile;
    }
    save({ ...nextProfile, onboardingComplete: true });
    screen = "home";
    ui = freshTransientState();
    ui.notice = `${nextStage} is your starting learning path. You can change paths later without losing the others.`;
    const url = new URL(window.location.href);
    url.searchParams.set("screen", "home");
    window.history.replaceState({}, "", url);
    return render(true);
  }

  if (action === "select-stage") {
    const result = switchStage(profile, control.dataset.stage);
    if (result.status === "changed") {
      save(result.profile);
      screen = "home";
      ui = freshTransientState();
      ui.notice = result.message;
      const url = new URL(window.location.href);
      url.searchParams.set("screen", "home");
      window.history.replaceState({}, "", url);
      return render(true);
    }
    ui.notice = result.message;
    return render();
  }

  if (action === "go-home" || action === "leave-trail") return go("home");
  if (action === "go-settings") return go("settings");
  if (action === "go-progress") return go("progress");
  if (action === "go-educator-progress") return go("educator-progress");
  if (action === "export-backup") return exportLearnerBackup();
  if (action === "export-progress-csv") return exportEducatorReport("csv");
  if (action === "export-progress-json") return exportEducatorReport("json");
  if (action === "print-progress") return window.print();
  if (action === "trigger-restore") {
    app.querySelector("[data-restore-backup]")?.click();
    return;
  }
  if (action === "go-project") return go("project");
  if (action === "go-shop") return profile.stage === "High School" ? go("project") : go("shop");
  if (action === "go-estate") return go("estate");
  if (action === "go-collection") return go("collection");
  if (action === "go-trail" || action === "start-trail") return profile.stage === "High School" ? beginOrResumeProject() : beginOrResumeTrail();
  if (action === "start-new-trail") return beginOrResumeTrail(true);
  if (action === "speak-word") return playActiveWord();
  if (action === "hear-misconception") {
    const words = ui.feedback?.misconception?.audioWords || [];
    speakSequence(words, profile.settings.slowSpeech);
    return;
  }

  if (action === "start-project") return beginOrResumeProject(control.dataset.project || null);
  if (action === "review-evidence") {
    save(reviewProjectEvidence(profile, control.dataset.evidence));
    return render();
  }
  if (action === "toggle-chain-evidence") {
    save(toggleEvidenceChainSupport(profile, control.dataset.evidence));
    ui.projectFeedback = null;
    return render();
  }
  if (action === "advance-project-step") {
    save(advanceAppliedStep(profile));
    ui.projectFeedback = null;
    ui.projectSelectedIndex = null;
    return render();
  }
  if (action === "select-project-option") {
    ui.projectSelectedIndex = Number(control.dataset.index);
    ui.projectFeedback = null;
    return render(false, `[data-action="select-project-option"][data-index="${ui.projectSelectedIndex}"]`);
  }
  if (action === "submit-source-strength") {
    if (ui.projectSelectedIndex == null) return;
    const result = recordSourceStrength(profile, ui.projectSelectedIndex, Date.now());
    save(result.profile);
    ui.projectFeedback = result;
    if (result.correct) ui.projectSelectedIndex = null;
    return render();
  }
  if (action === "submit-source-limitation") {
    if (ui.projectSelectedIndex == null) return;
    const result = recordSourceLimitation(profile, ui.projectSelectedIndex, Date.now());
    save(result.profile);
    ui.projectFeedback = result;
    if (result.correct) ui.projectSelectedIndex = null;
    return render();
  }
  if (action === "submit-source-confidence") {
    if (ui.projectSelectedIndex == null) return;
    const result = recordSourceConfidence(profile, ui.projectSelectedIndex, Date.now());
    save(result.profile);
    ui.projectFeedback = result;
    if (result.correct) ui.projectSelectedIndex = null;
    return render();
  }
  if (action === "submit-applied-vocab") {
    if (ui.projectSelectedIndex == null) return;
    const active = profile.appliedProjects?.active;
    const project = active ? getCivicProject(active.briefId) : null;
    if (!project) return;
    const response = appliedProjectView(project, active).vocabularyOptions[ui.projectSelectedIndex];
    const result = recordAppliedVocabulary(profile, response, Date.now());
    save(result.profile);
    ui.projectFeedback = result;
    ui.projectSelectedIndex = null;
    return render();
  }
  if (action === "submit-applied-reasoning") {
    if (ui.projectSelectedIndex == null) return;
    const result = recordAppliedReasoning(profile, ui.projectSelectedIndex, Date.now());
    save(result.profile);
    ui.projectFeedback = result;
    if (result.correct) ui.projectSelectedIndex = null;
    return render();
  }
  if (action === "submit-evidence-chain") {
    const result = recordEvidenceChainSupport(profile, Date.now());
    save(result.profile);
    ui.projectFeedback = result;
    ui.projectSelectedIndex = null;
    return render();
  }
  if (action === "submit-controlling-constraint") {
    if (ui.projectSelectedIndex == null) return;
    const result = recordControllingConstraint(profile, ui.projectSelectedIndex, Date.now());
    save(result.profile);
    ui.projectFeedback = result;
    if (result.correct) ui.projectSelectedIndex = null;
    return render();
  }
  if (action === "submit-assumption-check") {
    if (ui.projectSelectedIndex == null) return;
    const result = recordAssumptionCheck(profile, ui.projectSelectedIndex, Date.now());
    save(result.profile);
    ui.projectFeedback = result;
    if (result.correct) ui.projectSelectedIndex = null;
    return render();
  }
  if (action === "submit-applied-recommendation") {
    if (ui.projectSelectedIndex == null) return;
    const result = recordAppliedRecommendation(profile, ui.projectSelectedIndex, Date.now());
    save(result.profile);
    ui.projectFeedback = result;
    if (result.correct) ui.projectSelectedIndex = null;
    return render();
  }
  if (action === "submit-decision-impact") {
    if (ui.projectSelectedIndex == null) return;
    const result = recordDecisionRevisionImpact(profile, ui.projectSelectedIndex, Date.now());
    save(result.profile);
    ui.projectFeedback = result;
    if (result.correct) ui.projectSelectedIndex = null;
    return render();
  }
  if (action === "submit-decision-response") {
    if (ui.projectSelectedIndex == null) return;
    const result = recordDecisionRevisionResponse(profile, ui.projectSelectedIndex, Date.now());
    save(result.profile);
    ui.projectFeedback = result;
    if (result.correct) ui.projectSelectedIndex = null;
    return render();
  }
  if (action === "complete-applied-project") {
    save(completeAppliedProject(profile, Date.now()));
    return go("summary");
  }

  if (action === "choose-letter") {
    if (!ui.buildTokens.includes(control.dataset.token)) ui.buildTokens.push(control.dataset.token);
    return render();
  }
  if (action === "remove-letter") {
    const index = Number(control.dataset.index);
    if (Number.isInteger(index) && index >= 0 && index < ui.buildTokens.length) ui.buildTokens.splice(index, 1);
    return render();
  }
  if (action === "clear-letters") {
    ui.buildTokens = [];
    return render();
  }
  if (action === "select-option") {
    ui.selectedOption = Number(control.dataset.index);
    return render(false, `[data-action="select-option"][data-index="${ui.selectedOption}"]`);
  }
  if (action === "toggle-hint") {
    ui.hintShown = !ui.hintShown;
    return render(false, '[data-action="toggle-hint"]');
  }
  if (action === "submit-challenge") return resolveActiveChallenge();
  if (action === "continue-feedback") return continueAfterFeedback();

  if (action === "complete-session") {
    save(completeSession(profile, Date.now()));
    return go("summary");
  }

  if (action === "filter-shop") {
    ui.shopCategory = control.dataset.category || "All";
    ui.previewItemId = null;
    ui.notice = "";
    return render();
  }
  if (action === "select-shop-item") {
    ui.previewItemId = control.dataset.item;
    ui.notice = "";
    return render();
  }
  if (action === "preview-estate") return go("estate", { previewItemId: control.dataset.item });
  if (action === "purchase-item") {
    const result = purchaseItem(profile, control.dataset.item);
    save(result.profile);
    ui.notice = result.message;
    ui.previewItemId = control.dataset.item;
    return render();
  }
  if (action === "arm-reset") {
    ui.resetArmed = true;
    ui.resetPhrase = "";
    ui.notice = "Reset review opened. Download a backup first if this progress may be needed later.";
    return render(false, "[data-reset-confirm]");
  }
  if (action === "cancel-reset") {
    ui.resetArmed = false;
    ui.resetPhrase = "";
    ui.notice = "Reset canceled. No learner data was erased.";
    return render(false, '[data-action="arm-reset"]');
  }
  if (action === "confirm-reset") {
    if (ui.resetPhrase.trim().toUpperCase() !== "RESET") {
      ui.notice = "Type RESET exactly before local progress can be erased.";
      return render(false, "[data-reset-confirm]");
    }
    profile = repository.reset();
    screen = "home";
    ui = freshTransientState();
    ui.notice = "Local progress has been reset. Choose the learning path you want to begin with.";
    const url = new URL(window.location.href);
    url.searchParams.set("screen", "home");
    window.history.replaceState({}, "", url);
    return render(true);
  }
});

app.addEventListener("input", (event) => {
  const resetConfirm = event.target.closest("[data-reset-confirm]");
  if (resetConfirm) {
    ui.resetPhrase = resetConfirm.value;
    const button = app.querySelector('[data-action="confirm-reset"]');
    if (button) button.disabled = ui.resetPhrase.trim().toUpperCase() !== "RESET";
    return;
  }
  const rationale = event.target.closest("[data-project-rationale]");
  if (rationale) {
    save(saveAppliedRationale(profile, rationale.value));
    const counter = rationale.parentElement?.querySelector("small");
    if (counter) counter.textContent = `${rationale.value.trim().length}/40 minimum characters`;
    const button = app.querySelector('[data-rationale-gate]');
    if (button) button.disabled = rationale.value.trim().length < 40;
    return;
  }
  const input = event.target.closest("[data-response-input]");
  if (!input) return;
  ui.typedResponse = input.value;
  const button = app.querySelector('[data-action="submit-challenge"]');
  if (button) button.disabled = !ui.typedResponse.trim();
});

app.addEventListener("change", async (event) => {
  const restoreInput = event.target.closest("[data-restore-backup]");
  if (restoreInput) {
    const file = restoreInput.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      ui.notice = "That backup is too large to restore safely in this local build.";
      restoreInput.value = "";
      return render();
    }
    try {
      const parsed = JSON.parse(await file.text());
      const result = parseProfileBackup(parsed);
      if (!result.ok) {
        ui.notice = result.message;
        restoreInput.value = "";
        return render();
      }
      profile = repository.save(result.profile);
      screen = "settings";
      ui = freshTransientState();
      ui.notice = "Learner backup restored. Progress, supports, credits, construction, and field work were loaded from the backup.";
      const url = new URL(window.location.href);
      url.searchParams.set("screen", "settings");
      window.history.replaceState({}, "", url);
      restoreInput.value = "";
      return render(true);
    } catch {
      ui.notice = "That backup file could not be read. Choose an unmodified Vocabulary Adventure JSON backup.";
      restoreInput.value = "";
      return render();
    }
  }
  const input = event.target.closest("[data-setting]");
  if (!input) return;
  const settingName = input.dataset.setting;
  save({ ...profile, settings: { ...profile.settings, [settingName]: input.checked } });
  render(false, `[data-setting="${settingName}"]`);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && ((screen === "trail" && profile.activeSession) || (screen === "project" && profile.appliedProjects?.active))) {
    event.preventDefault();
    return go("home");
  }
  if (isTextEntryTarget(event.target) || event.ctrlKey || event.metaKey || event.altKey) return;
  if (screen === "trail" && event.key.toLowerCase() === "p" && activeChallengeState()) {
    event.preventDefault();
    return playActiveWord();
  }
  if (/^[1-9]$/.test(event.key)) {
    const choices = [...app.querySelectorAll('[data-action="select-option"], [data-action="select-project-option"]')].filter((button) => !button.disabled && button.offsetParent !== null);
    const choice = choices[Number(event.key) - 1];
    if (choice) {
      event.preventDefault();
      choice.click();
    }
  }
});

window.addEventListener("pointermove", (event) => {
  if (profile.settings.reducedMotion || event.pointerType === "touch") return;
  const experience = app.querySelector(".experience");
  if (!experience) return;
  const x = ((event.clientX / Math.max(window.innerWidth, 1)) - .5) * 2;
  const y = ((event.clientY / Math.max(window.innerHeight, 1)) - .5) * 2;
  experience.style.setProperty("--pointer-x", x.toFixed(3));
  experience.style.setProperty("--pointer-y", y.toFixed(3));
  experience.style.setProperty("--parallax-x", `${(-x * 5).toFixed(2)}px`);
  experience.style.setProperty("--parallax-y", `${(-y * 3).toFixed(2)}px`);
}, { passive: true });

render();
