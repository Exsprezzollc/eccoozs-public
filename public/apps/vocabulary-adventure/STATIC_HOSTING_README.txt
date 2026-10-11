ECCOOZS Vocabulary Adventure — Static Site 2.16.1

This directory contains the already-built public site.

HOW TO RUN IT
- Quick local test: open index.html directly in a browser (double-click). It works
  without a server.
- Web hosting: upload every file in this folder to any static host. It works at the
  site root (https://example.com/) or in a subfolder
  (https://example.com/apps/vocabulary-adventure/). All paths are relative.
  If you use a subfolder, link to it WITH the trailing slash.

Important: learner progress is stored in browser localStorage for the exact origin
(and, when opened from a file, for that browser's file storage). Keep the final
public URL stable, or learners will appear to lose their progress. Use
Settings > "Download learner backup" before moving between URLs or devices.

EDITING THE CODE
index.html loads app.bundle.js, a single file built from app.js and the game/ folder.
After changing app.js or anything in game/, rebuild the bundle (Node.js required):

  npx esbuild@0.24.0 app.js --bundle --minify --format=iife --target=es2020 --legal-comments=none --outfile=app.bundle.js

styles.css and assets/ are used directly and need no rebuild.

CHANGES IN 2.16.1
- Fixed: blank page when hosted at a site root or any path other than
  /apps/vocabulary-adventure/ (all URLs were hard-coded to that path).
- Fixed: blank page when index.html was opened directly from a folder (ES modules
  are blocked on file://); the app now ships as one bundled script.
- Fixed: blank page when the browser blocks localStorage; the app now runs without
  saving instead of crashing.
- Fixed: unreadable saved progress was silently replaced by a fresh profile; the
  original data is now kept under a "...unreadable-<time>" key.
- Fixed: opening screens by URL could show the wrong path's content (e.g. the Junior
  High trail or shop inside High School) or an invented "session complete" summary.
- Fixed: reloading the Adult / Educator report returned to Home.
- Fixed: on the Elementary trail the main "I understand" / "Check word" button was
  hidden below the card on most laptop and phone screens; action buttons now stay
  pinned to the bottom of the card.
- Fixed: bottom navigation labels overflowed on phones.
- Fixed: low-contrast "Save & return home" link on the Elementary trail.
- Added: Enter submits a typed answer.
- manifest.webmanifest start_url/scope are now relative, so "Install app" works at
  any location.
