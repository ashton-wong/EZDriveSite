**Story Header**
- **Story ID:** 2.4
- **Story Key:** 2-4-content-placeholders-for-marketing-copy
- **Title:** Content placeholders for marketing copy
- **Status:** ready-for-dev
- **Owner:** Ashton
- **Created:** 2026-05-14

**Story Requirements**
- **User Story:** As a marketing operator, I want simple, easy-to-edit copy placeholders for hero and benefit text so marketing can iterate without changing React source files.
- **Business Value:** Speeds copy changes and reduces developer friction for marketing experiments.
- **Acceptance Criteria (BDD):**
  - Given the repo is checked out, when marketing updates `content/marketing-copy.json`, then the landing page displays updated hero and benefit text at build-time or via a lightweight runtime include.
  - Documentation `docs/editing-marketing-copy.md` explains the file format and update workflow.

**Developer Context & Guardrails**
- Add `content/marketing-copy.json` with fields for `heroTitle`, `heroSubtitle`, `ctaText`, and `benefitCards` array. Read at build time in `getStaticProps` or import directly in `pages/index.js`.
- Keep the file small and avoid adding a CMS. If runtime editing is desired later, discuss a lightweight JSON store or headless CMS.

**Files to add/update**
- `content/marketing-copy.json` (new)
- `pages/index.js` — updated to import marketing copy and pass to components
- `components/Hero.js` — updated to accept configurable copy props
- `components/FeatureBento.js` — updated to accept configurable copy and benefit cards
- `docs/editing-marketing-copy.md` — small doc explaining workflow

**File List (this change)**
- content/marketing-copy.json (added)
- docs/editing-marketing-copy.md (added)
- pages/index.js (modified)
- components/Hero.js (modified)
- components/FeatureBento.js (modified)

**Change Log**
- 2026-05-14: Initial implementation — added `content/marketing-copy.json`, updated `pages/index.js`, `components/Hero.js`, `components/FeatureBento.js`, and documentation. (Dev: GitHub Copilot)

**Dev Agent Record**
- Implementation Plan: Import marketing copy JSON at build time, surface copy through component props with safe defaults, document editing workflow.
- Debug Log: Created files and updated components to accept external copy. Manual verification required (build and visually confirm). 

**Status:** in-progress

**Testing**
- Manual: edit `content/marketing-copy.json`, rebuild, and confirm changed copy appears.
