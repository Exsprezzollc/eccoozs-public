# Steps to Mastery — Phase 1 Production Integration

Addition vertical slice integrated into the production Math Trail codebase.
Subtraction, Multiplication, Division and Mixed Operations remain unavailable.

## Files changed

| File | Change | Detail |
|---|---|---|
| `src/app/apps/math-trail/source.ts` | **Modified** | +84,383 chars, **all pure insertions** |
| `src/app/apps/math-trail/assets.ts` | **Modified** | 17 assets appended (indices 24–40) |
| `src/app/apps/math-trail/route.ts` | **Unchanged** | byte-for-byte identical |

`route.ts` needed no change: Steps to Mastery is a screen inside the Math Trail app,
rendered into the existing `#app` container via the existing `data-nav` delegation.

## How it was integrated

`source.ts` stores the app as a **double-quoted string literal** with placeholder asset
paths that `mathTrailHtml` resolves from `mathAssets` at build time. The literal round-trips
byte-identically through `JSON.parse`/`JSON.stringify`, so the integration decoded it,
applied the patches to the raw HTML, and re-encoded — no hand-escaping, no drift.

Because it is a double-quoted literal rather than a template literal, the module's
backticks and `${...}` are inert and required no escaping. That was the risk flagged
before the files were supplied; it does not apply to this codebase.

### `source.ts` — three insertions plus the module

1. **Steps entry** added to the home screen after `quickTools()`, in the artwork-layer
   `renderWelcome` override. Existing "Choose Your Trail" / Grades 1–6 untouched.
2. **Nav route** `n==='steps'` appended to the existing `data-nav` click handler.
3. **Boot** now calls `window.stmDefaults()` between `mtEnsureAnalytics()` and the first
   render, to safe-merge `state.stepsMastery` and apply the motion preference.
4. **Artwork + module** inserted immediately before the boot IIFE and after the
   artwork/reporting layer. Ordering is load-bearing: the module decorates
   `renderSettings`, `resetAll`, `renderParent`, `mtTopicStats` and `mtRepeatedMisses`,
   so those must already exist.

Verified by diff: **0 characters deleted, 0 replacement blocks.** Every existing line of
Guided Math Trail code is untouched.

### `assets.ts` — additive only

Original 24 entries preserved in order and byte-identical. 17 appended:

| Index | Asset | Index | Asset |
|---|---|---|---|
| 24–29 | backgrounds: meadow, forest, river, canyon, summit, celebrate | 30–31 | characters: plus, times |
| 32–40 | icons: star, check, heart, trophy, flame, sound, close, gear, hint | | |

Converted to **WebP** to match the existing pipeline (all 24 originals are WebP): 26 MB of
supplied source art → 916 KB, and the characters dropped from 172 KB to 41 KB with alpha
intact. `export const mathAssets`, the `] as const;` terminator, and CRLF line endings are
all preserved.

`STEPS_ART` references build placeholders (`/learning-assets/math-trail/asset-24.webp`),
never inline base64 — consistent with how the existing app consumes assets.

## Artwork mapping

Stages 1–4 and 6 use the newly supplied scenes; the celebration clearing backs
stage-complete, perfect-round and mastery screens. **Stage 5 (Highlands) continues to use
the existing production background**, since no Highlands scene was supplied — one line in
`STAGE_BG` when it is.

Trail Fox artwork, grade outfits, badges and all Guided environments are used from the
existing `assets.ts` and were not replaced or approximated.

## Verification

**139 automated checks, all passing**, run against HTML built by reproducing the exact
`mathAssets.reduce(...)` pipeline from `source.ts`:

| Suite | Checks | Covers |
|---|---|---|
| `test_accept.js` | 18 | original acceptance, anti-star-farming, sponsor placement |
| `test_corrections.js` | 33 | settings, reset, analytics, Match It, Find It, celebrations |
| `test_misses.js` | 32 | miss derivation per resolution kind |
| `test_live_misses.js` | 8 | miss counts from real gameplay |
| `verify_prod.js` | 24 | file integrity, additive-only, operations still locked |
| `test_migration.js` | 24 | existing `mathtrail:v2` user data survives |

Build integrity: 41 assets resolved, **0 unreplaced placeholders**, built output 2.36 MB.

### Migration

Tested with a realistic pre-integration `mathtrail:v2` blob (name, grade, mastery,
topicIdx, stars, streak, reviewQueue, sheetPos, voice settings, gradesDone, autoNext,
analytics). Every field survives; `stepsMastery` merges in fresh and empty; existing stars
are unchanged by entering Steps.

## Deferred to Phase 2

Subtraction, Multiplication, Division and Mixed Operations (configuration + fact
generators only — the engines are in place); Build It and Fact Family game modes; timed
challenge; original applause/cheer audio files to replace the synthesized fallbacks;
a Highlands scene for stage 5.

## Not yet verified

Browser rendering. The suites confirm behaviour, state and data integrity in a headless
DOM, but cannot judge how the new WebP backgrounds and characters look on a real phone or
tablet, real audio, or real speech synthesis. Worth checking before release.
