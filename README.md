# ECCOOZS History — Reconstruction v1

## Stopping point
This first Reconstruction build deliberately stops in **1871**.

## Included routes
- `/history/reconstruction`
- `/history/reconstruction/freedom-was-not-the-finish-line`
- `/history/reconstruction/who-was-a-citizen`
- `/history/reconstruction/who-could-vote`
- `/history/reconstruction/black-americans-enter-government`
- `/history/reconstruction/a-right-on-paper-needed-enforcement`

## Files
- `app/history/reconstruction/**` — page files and shared CSS module
- `components/history/ReconstructionShell.tsx` — shared page shell and content primitives
- `public/history/reconstruction/black-congressmen-1872.png` — user-provided archival image

## Integration
This bundle is written for **Next.js App Router**. Copy the three top-level folders (`app`, `components`, `public`) into the ECCOOZS project, preserving paths. If the project already contains files with the same paths, merge rather than overwrite.

The CSS intentionally keeps the established ECCOOZS History visual language—midnight/black, parchment, cream, restrained bronze-gold—but uses more breathing room than the existing “Who Decided Your Race?” page.

## Content scope
No Freedmen section and no tribe-by-tribe profiles are included. Those subjects remain parked for later research.

## Source policy
Each page includes a small “Sources & Records” section linking to National Archives, U.S. Senate, U.S. House historical collections, and (for one contextual participation estimate) History.com.
