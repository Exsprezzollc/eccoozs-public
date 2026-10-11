# Reading Detective v1.4.4 — Release Checklist

This checklist is the final networked-runner gate before a public deployment.

## 1. Environment

- Node must satisfy `>=20.19 <23`.
- npm must satisfy `>=10`.
- Run from a clean checkout/extraction.
- Do not reuse an old `node_modules` directory.

## 2. Install the pinned dependency graph

```bash
npm ci
```

Release is blocked if installation fails or resolves a dependency outside the pinned `package.json` contract.

## 3. Run the full production QA suite

```bash
npm run qa:production
```

This must pass all 19 engine/content suites, the strict UI type check, and interactive Chromium QA (21 gates). If Chromium is not at a standard location, set `RD_CHROME_PATH`.

## 4. Build the real React 18 + Vite application

```bash
npm run build
```

The `dist/` directory must be produced without TypeScript or Vite errors.

## 5. Preview the exact production output

```bash
npx vite preview --host 0.0.0.0
```

Smoke-test at minimum:

- Welcome → presentation → detective → appearance → first investigation.
- Young, Investigator, and Lead Investigator presentations.
- Detective portrait and browser voice preview.
- Adaptive placement and Detective Toolkit.
- Teach-First gate, wrong-answer diagnosis, Clue Lab, Repair & Return.
- Evidence Board and source → sentence → phrase interactions.
- Document/Source/Research/Decision workspaces.
- Grown-up gate before Educator Insight (wrong answer rejected; leaving re-locks it).
- Educator Insight, including the "Evidence strength" heuristic note.
- Learner data: readable + JSON export download under the deployed CSP; reset progress and delete all data each require a second confirmation.
- Foundation encoding: build `map` from tiles (Young CVC) and type `sun` (Investigator CVC); connected-text sentence.
- Phonics audio: pending sounds show "Approximate sound — final recording coming soon."; recorded sounds play the MP3.
- Final Case readiness and graduation behavior.
- Reload/resume persistence.
- Keyboard-only navigation and visible focus.
- Read Aloud guard during decoding targets.
- Text scaling, spacing, contrast, focus mode, reduced motion, voice rate/selection.
- 360px, 768px, and 1440px layouts with no horizontal scrolling.
- Real devices: iOS Safari and Android Chrome (speech voices, audio playback, touch targets).
- One screen-reader pass (VoiceOver or NVDA) over onboarding, a teaching step, and the grown-up area.

## 6. Security/deployment checks

- Confirm `vercel.json` headers are present in deployed responses.
- Confirm CSP does not block local detective portraits, styles, speech, phonics MP3 playback (`media-src 'self'`), or the data-export download.
- Confirm HTTPS is active.
- Confirm no source maps are published by the production build.
- Confirm no secrets, credentials, or private keys are present in the bundle.

## 7. Content release checks

```bash
npm run verify:content-stress
npm run verify:production-assets
npm run verify:capstone-qa
```

Confirm the release still reports:

- 82 prerequisite-aware skills.
- 36 cases.
- 30/30 Young Investigator Teach-First coverage.
- 33/33 Investigator Teach-First coverage.
- 54/54 Lead Investigator Teach-First coverage.
- 36 local detective portraits.
- No retired detective names in learner-facing source/content.

## 8. Phonics audio assets

- Check `docs/RD-PHONEME-AUDIO-MANIFEST.md` for pending recordings. Foundational pronunciation stays a labelled approximation until each asset is recorded, reviewed, and switched to `recorded`.

## 9. Release decision

Ship only after the **real React 18 + Vite build and preview** pass on the networked release runner. The local browser compatibility harness is an additional interaction test; it is not a substitute for this final build gate.
