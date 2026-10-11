# Reading Detective v1.4.4 — Release Report

**Release type:** production-hardening (stabilization). No change to the skill graph (82 skills), the 36 cases, or the placement, teaching, evidence, review, repair, or capstone engines. No change to stage-aware presentation or visual identity (text colors were darkened slightly for contrast only). No new runtime dependencies.

**Determination:** ready for a **small, adult-supervised controlled pilot**. **Not yet production-ready for unsupervised general release**; see "Known limitations" and "Conditions for the pilot."

## 1. Baseline (v1.4.3 as received)

| Check | Baseline result |
|---|---|
| `npm run verify:all` (16 engine/content suites + UI type check) | PASS |
| `npm run build` | PASS |
| Interactive browser QA | **FAIL.** It hard-coded `/usr/bin/chromium`, then failed its first assertion: it expected the old `INVESTIGATION HEADQUARTERS` text on the Young Investigator screen, which now shows `🔎 HEADQUARTERS`. |
| `npm run qa:production` | **FAIL**, because of the browser QA failure. |

Other baseline defects found during the work:
- Version references were inconsistent (1.4.3 / 1.4.2 / 1.3.0).
- Phoneme instruction depended on raw browser text-to-speech.
- The "🔒" grown-up entry had no gate at all.
- There were no learner-data controls.
- A heuristic percentage was labelled "Evidence confidence."
- Eight text colors failed WCAG AA contrast.
- Two controls were below the 40px touch-target bar.
- One test message referred to a "server-side speech fallback," but no server exists.

## 2. What changed

1. **Browser QA repaired.**
   - Stage-aware assertions match the actual UI: Young Investigator wording and child controls; Investigator / Lead Investigator wording and the full controls panel.
   - Chromium is resolved robustly (`RD_CHROME_PATH`, then system paths, then Playwright's bundled browser).
   - New checks: reduced motion, narration speaking state, grown-up gate, executed reset/delete, and rendered text contrast.
2. **Version normalization.** Every reference to the current package reads 1.4.4, and the package-lock root version matches. Dependency versions are unchanged. Historical changelog entries and v1.3.0 records are preserved and labelled as historical.
3. **Phoneme-audio architecture.**
   - `src/content/audio/phonicsManifest.ts` holds 30 assets keyed to curriculum tokens.
   - `src/engine/phonicsAudio.ts` resolves audio deterministically and keeps pronunciation-critical sounds separate from narration.
   - A recorded asset plays its MP3.
   - A pending asset never presents text-to-speech as authoritative. It voices a clearer approximation and shows "Approximate sound — final recording coming soon."
   - Adding a recording is a data-only change.
4. **Encoding / production activities.**
   - New reusable `build` (grapheme tiles) and `spell` (typed) interactions, graded through the existing structured-answer path.
   - Examples: Young CVC builds `map`; Investigator CVC types `sun`.
   - Mastery rules are unchanged.
5. **Connected text.** Young CVC transfer is now a short controlled sentence ("The cat sat on a mat.").
6. **Grown-up gate.**
   - An arithmetic check guards all four entry points.
   - A wrong answer is rejected, and leaving the area re-locks it.
   - The screen states it is not a security lock.
7. **Learner data controls.**
   - Available: current-learner summary, readable export, JSON export, reset progress, and delete all data.
   - Destructive actions need a second confirmation.
   - Reset keeps the learner's detective and stage; delete removes every `rd.*` key. Neither touches other site data (verified in the browser).
8. **Evidence terminology.** The learner- and educator-facing label now reads "Evidence strength," with a note that it is a heuristic, not a statistically validated measure or test score. The internal `confidence` field is unchanged.
9. **Accessibility.**
   - Eight muted text colors were darkened with the same hue, from a worst case of 3.10:1 to at least 4.60:1.
   - Rendered contrast is now a permanent QA gate.
   - Shared buttons are at least 40px tall; read-aloud buttons are 44px.
   - The decorative-image check was corrected.
   - The touch-target check now measures the resting layout box rather than the animated size.
10. **Narration and motion regression tests.** `scripts/verify-narration-motion.cjs` covers:
    - speech start/end/error/repeat/disabled/unsupported;
    - the speaking-state guard;
    - reduced-motion kill-switches;
    - 11 retained keyframes;
    - non-blocking, non-looping motion.
11. **Unsupported claims.** No product-efficacy claims were found. "Proven" / "clinically proven" appear only in curriculum cases where learners critique such claims; these were intentionally kept.
12. **Security and privacy review.** No fixes were needed:
    - no network calls, analytics, or trackers;
    - no `innerHTML`, `dangerouslySetInnerHTML`, or `eval`;
    - no external resources and no secrets;
    - a strict CSP (`default-src 'self'`, `connect-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'`) plus nosniff, `DENY` framing, COOP, Referrer-Policy, and Permissions-Policy headers;
    - no source maps in the build;
    - `npm audit --omit=dev`: 0 vulnerabilities.
13. **One authoritative gate.** `npm run qa:production` runs all 21 gates (see §4).

## 3. Files changed (vs v1.4.3): 9 added, 23 modified, 0 removed

**Added:**
- `src/engine/phonicsAudio.ts`
- `src/content/audio/phonicsManifest.ts`
- `public/assets/audio/phonics/README.txt`
- `scripts/verify-phoneme-audio.cjs`
- `scripts/verify-encoding-activities.cjs`
- `scripts/verify-narration-motion.cjs`
- `scripts/generate-phonics-manifest-doc.cjs`
- `docs/RD-PHONEME-AUDIO-MANIFEST.md`
- `docs/RELEASE-REPORT-v1.4.4.md`

**Modified, source:**
- `src/App.tsx`
- `src/styles/app.css`
- `src/app/components/TeachingPracticeInteraction.tsx`
- `src/content/teachingModules.ts`
- `src/content/index.ts`
- `src/domain/teaching.ts`
- `src/engine/teaching.ts`
- `src/engine/index.ts`

**Modified, tests:**
- `scripts/verify-browser-interactive.py`
- `scripts/verify-production-assets.cjs` (output wording only)

**Modified, package and docs:**
- `package.json`
- `package-lock.json`
- `CHANGELOG.md`
- `README.md`
- `START-HERE.txt`
- `INSTALL-INSTRUCTIONS.txt`
- `INSTALL-READING-DETECTIVE.cmd`
- `BUILD-AND-INSTALL-READING-DETECTIVE.ps1`
- `verification-output.txt`
- `docs/RELEASE-CHECKLIST.md`
- `docs/PRODUCTION-QA-REPORT.md`
- `docs/RD-PRODUCTION-HARDENING.md`
- `docs/RD-CURRICULUM-TEACHING-COVERAGE-EDUCATOR-INSIGHT.md`

## 4. Test counts and results

Environment: Node 22.22.2, npm 10.9.7, Python 3.12.3, headless Chromium 131 (Playwright). Full log: `verification-output.txt`.

| Stage | Result |
|---|---|
| Install (`npm ci`) | PASS (100 packages) |
| `qa:production`: 19 engine/content suites | 19 / 19 PASS |
| `qa:production`: strict UI type check (`verify:ui-static`) | PASS |
| `qa:production`: interactive browser + responsive + accessibility QA | PASS |
| **`qa:production` total** | **21 / 21 PASS, 0 skipped** |
| Production build (`npm run build`) | PASS (153 modules, one ~780 KB / 214 KB-gzip chunk) |

The authoritative run: `npm ci` exit 0 → `qa:production` exit 0 → `build` exit 0.

What the suites cover:
- **Content validation:** 82 skills, 36 cases, full Teach-First coverage (30/30 Young, 33/33 Junior, 54/54 Lead).
- **Randomized learner routes:** 1,500, all passing.
- **Review-generation stress:** 30,300 controlled review items across 143 scenario fingerprints.
- **Phoneme audio:** 30 assets and 57 pronunciation-critical token occurrences.
- **Encoding:** 1 build, 1 spell, and 31 short connected-text items validated.
- **Narration and motion:** 5 lifecycle scenarios plus the motion contracts.

**Browser QA stability.** Since the final version of the browser suite was written, it has run 21 times: 20 passed and 1 failed.
- The failure happened in a 5-run check under a shortened 55-second external timeout, on the first run straight after a build. Its output was not captured.
- The failure did not recur in 12 dedicated follow-up runs (4 of them under the same 55-second limit).
- Every captured run took 39–45 seconds.
- The most likely cause is the timeout on a cold start, but this is not proven.
- `qa:production` imposes no wall-clock timeout.

## 5. Browser widths tested

- 1440px: Young Investigator, the full path from welcome to a case.
- 768px: Investigator and Lead Investigator.
- 360px: live case, overflow, and touch targets.

No horizontal overflow at any width.

## 6. Accessibility results

**Automated checks, all passing:**
- skip link and focus;
- no unnamed buttons;
- decorative images correctly labelled;
- child and full accessibility panels (spacing, high contrast, reduced motion, Less Movement);
- reduced-motion class applied;
- narration speaking state starts and clears;
- touch targets of at least 40px at 360px;
- rendered WCAG AA text contrast on five screens across three stages;
- the grown-up dialog is labelled; confirmations use `alertdialog`; status messages use `aria-live`.

**Not performed:**
- an axe-core scan (not added, to avoid a new dependency without a CI runner to host it);
- a manual screen-reader pass;
- text over photographic backgrounds (excluded from the automated contrast check);
- iOS Safari, Firefox, or real devices.

## 7. Known limitations

- **No approved phonics recordings exist.** All 30 are pending, so foundational phoneme audio is a labelled approximation (see §8).
- **Browser QA doesn't run the production build.** It exercises a CommonJS QA bundle on a React 16 compatibility layer with simulated speech, not the React 18 Vite bundle, and not real voices.
  - The production build is compile-verified only.
  - `docs/RELEASE-CHECKLIST.md` §5 (a `vite preview` smoke test on a networked runner) is still required.
- **Encoding content is representative, not complete** (one build, one spell, one sentence). The encoding interactions are validated in the engine suite but not driven in the browser suite.
- **One learner per browser.** There is no learner switching. Anyone with the device can pass the grown-up gate.
- **Export downloads** use a `blob:` link. Confirm they work under the deployed CSP (checklist §5).

## 8. Human-recorded audio still needed

**30 of 30 assets are pending.** Exact filenames, curriculum use, and the recording spec are in `docs/RD-PHONEME-AUDIO-MANIFEST.md`.

- 16 phonemes: /a/ /d/ /e/ /f/ /g/ /i/ /k/ /l/ /m/ /n/ /o/ /p/ /r/ /s/ /t/ /u/
- 1 digraph: /sh/
- 6 decoding sequences: map, red, sun, fog, lid, bin
- 7 decodable words: map, sun, red, sat, bin, cat, pin

16 of the 30 are used by current teaching audio; record those first.

## 9. Conditions for the pilot

1. Run `docs/RELEASE-CHECKLIST.md` §5 (real-build preview smoke test) on the release runner, including one iOS Safari device.
2. For foundation-level learners, either record and review the 16 referenced phonics assets first, or have the supervising adult model the target sounds.
3. Run `qa:production` on the release runner. If it passes, treat the single unreproduced browser-QA failure as closed; if it recurs, capture the output and fix before the pilot.
4. Tell pilot families that progress lives only in that browser, and show them the export controls.
