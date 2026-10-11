# Reading Detective v1.3.0 — Production QA Report

> **Historical record (v1.3.0).** Results for the current release are in [`RELEASE-REPORT-v1.4.4.md`](RELEASE-REPORT-v1.4.4.md).

**Result:** PASS for engine/content/static checks, production asset contracts, controlled-content stress testing, and interactive Chromium QA available in the current environment.

## Automated engine/content suites

- Core Engine — PASS
- Vertical Slice / Repair & Return — PASS
- Adaptive Placement — PASS
- Content Variation + Review Routing — PASS
- Curriculum + Evidence Board — PASS
- Teach-First Engine — PASS
- Educator Insight — PASS
- Junior High Source Intelligence — PASS
- High School Document Intelligence — PASS
- Research, Media & Decision Intelligence — PASS
- Curriculum Completeness + Literature / Applied Reading — PASS
- Capstone Progression + Graduation — PASS
- React/JSX offline static verification — PASS

## Production hardening suites

- Detective assets + voice contracts — PASS
  - 36 local portrait assets verified
  - all 18 detectives have FBA and Caucasian variants
  - voice-preview contracts verified
  - non-browser speech fallback verified
- Content stress — PASS
  - 30,300 generated controlled-review items
  - 143 stage-compatible scenario fingerprints exercised
  - 36 cases revalidated
  - 1,500 randomized learner routes exercised
- Interactive Chromium QA — PASS
  - Young Investigator onboarding → placement → Headquarters → case
  - Investigator onboarding → placement → Headquarters → case
  - Lead Investigator onboarding → placement → Headquarters → Teach-First/case gate
  - detective/appearance selection states
  - detective voice-preview wiring
  - keyboard skip navigation
  - accessible button names
  - accessibility control state changes
  - wrong-answer feedback interaction
  - minimum touch-target sampling
  - no horizontal overflow at 360px / 768px / 1440px
  - baseline topbar and primary-button contrast checks

## Corpus status

- Skill graph: **82 skills**
- Case library: **36 cases**
- Young Investigator Teach-First: **30/30**
- Investigator Teach-First: **33/33**
- Lead Investigator Teach-First: **54/54**
- Local detective portraits: **36**
- Retired names `Harper`, `Jordan`, and `Malik`: absent from curriculum/content QA
- Learner-facing grade-equivalent patterns: no violations found by Production QA

## Deployment configuration

- Dependency versions pinned
- Vite production configuration present
- Vercel security headers/CSP present
- local web app manifest present
- localStorage migration/failure guard present
- local detective art present
- browser Speech Synthesis voice controls present

## Explicit remaining release gate

The real npm/Vite production dependency graph could not be installed in this execution environment. A 25-second `npm install` attempt produced no `node_modules` because package-network access remains unavailable. The Chromium QA above runs the actual compiled Reading Detective UI/engine through a dedicated local compatibility harness; it does **not** substitute for a final React 18 + Vite deployment build.

A networked release runner must still execute:

```bash
npm install
npm run build
npm run qa:production
```

and smoke-test the resulting `dist/` output before public deployment.
