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
- `pages/index.js` — read copy from JSON
- `docs/editing-marketing-copy.md` — small doc explaining workflow

**Testing**
- Manual: edit `content/marketing-copy.json`, rebuild, and confirm changed copy appears.
