# Reading Detective v1.3.0 — Production Runtime + Interactive QA + Accessibility Hardening

> **Historical record (v1.3.0).** The current hardening release is documented in [`RELEASE-REPORT-v1.4.4.md`](RELEASE-REPORT-v1.4.4.md).

## Purpose

v1.3 turns the v1.2 curriculum/engine build into a deployable, testable application shell with real local detective art, functional browser speech, responsive behavior, accessibility hardening, content stress testing, and deployment security configuration.

## Detective assets

The approved detective-selection reference is preserved under `public/assets/reference/`. Thirty-six local portrait assets are derived from that approved screen: 18 detective identities with FBA and Caucasian appearance variants. The live UI now renders those assets rather than initials. Missing assets fall back to initials without breaking the learning flow.

## Voice system

`src/engine/voice.ts` uses the browser Speech Synthesis API. The learner can:

- preview the selected detective's voice;
- use an installed English browser/system voice;
- select a preferred installed voice in Reading Controls;
- control speech rate;
- keep the same instructional content regardless of detective or voice.

Detective personality changes pacing/pitch slightly, but never changes correctness, curriculum, mastery, or remediation logic. The engine degrades safely when Speech Synthesis is unavailable.

## Accessibility hardening

The application now includes:

- skip-to-main-content navigation;
- automatic main-content focus on screen changes;
- visible keyboard focus rings;
- `aria-pressed` state on detective and appearance choices;
- `aria-live` feedback regions;
- minimum interaction target sizing;
- persistent text scale, increased spacing, contrast, focus mode, reduced motion, narration, rate, and voice preferences;
- `prefers-reduced-motion` support;
- responsive layouts tested at 360px, 768px, and 1440px;
- overflow protection for long document/legal language.

Read-aloud remains skill-aware: decoding targets cannot be exposed when decoding is the skill being assessed.

## Interactive browser QA

The restricted execution environment cannot install the project's npm React/Vite dependencies. To avoid falsely claiming browser coverage, v1.3 adds a dedicated QA runtime:

1. TypeScript is compiled to a browser-test bundle.
2. A small compatibility harness supplies the React surface required by the current function-component/hook subset.
3. System Chromium is driven through Python Playwright.
4. Real application interactions are executed in the DOM.

The test covers all three presentation stages, detective/appearance selection, speech preview wiring, adaptive placement, Headquarters, case entry, wrong-answer feedback, accessibility controls, keyboard skip navigation, touch-target checks, and responsive overflow.

This harness is for **browser interaction QA only**. The deployment build remains the normal React 18 + Vite application defined in `package.json` and `vite.config.ts`.

## Content stress testing

`verify:content-stress` now:

- generates 30,300 controlled review items;
- reaches every stage-compatible scenario fingerprint;
- verifies correct-answer contracts after shuffling;
- rejects leaked variation tokens and duplicate answer labels;
- validates all 36 case contracts;
- validates Teach-First module registries;
- routes 1,500 randomized learner skill profiles and prevents presentation-stage crossover.

## Persistence hardening

Stored learner profiles are normalized against current accessibility defaults when loaded. Storage writes are guarded so localStorage quota/privacy failures do not crash the active learning session.

## Deployment hardening

- exact dependency versions replace `latest`;
- Vite target/build behavior is explicit;
- `vercel.json` defines security headers and a restrictive Content Security Policy;
- a web app manifest and theme color are included;
- app assets are local/self-hosted;
- no external font, image, analytics, or voice-service dependency is required for core operation.

## Remaining release boundary

`npm install` still cannot complete in this execution environment because package-network access is unavailable. Therefore the **actual Vite + React 18 production artifact has not been built here**. This is intentionally not marked as passed.

Before production deployment, run on a networked build runner:

```bash
npm install
npm run build
npm run qa:production
```

Then smoke-test the generated `dist/` build in the deployment environment.
