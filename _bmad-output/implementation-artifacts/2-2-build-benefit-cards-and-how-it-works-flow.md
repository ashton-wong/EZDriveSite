**Story Header**
- **Story ID:** 2.2
- **Story Key:** 2-2-build-benefit-cards-and-how-it-works-flow
- **Title:** Build benefit cards and how-it-works flow
- **Status:** ready-for-dev
 - **Status:** in-progress
- **Owner:** Ashton
- **Created:** 2026-05-14

**Story Requirements**
- **User Story:** As a new visitor, I want concise benefit cards and a short how-it-works flow on the landing page so I can understand the product value quickly.
- **Business Value:** Improves persuasion and informs visitors before they convert.
- **Acceptance Criteria (BDD):**
  - Given the landing page is loaded, when I view the benefits section, then three benefit cards are visible with headings and one-sentence descriptions.
  - Given the how-it-works section is present, when viewed, then three steps are shown with concise copy and semantic markup (headings, lists).
  - All items are responsive, include alt text for icons, and meet contrast/accessibility requirements.

**Developer Context & Guardrails**
- Create a small presentational component `components/BenefitCards.js` or update `components/FeatureBento.js` if present.
- Use Tailwind utility classes and responsive design patterns; do not add global CSS.
- Ensure semantic HTML (use `<section>`, `<h3>`, `<p>`, `<ul>`/`<li>` as appropriate) and include `alt` text for any icon images.

**Files to add/update**
- `components/BenefitCards.js` or update `components/FeatureBento.js`
- `pages/index.js` — mount benefit cards and how-it-works flow below hero

**Testing**
- Manual QA for layout on mobile/desktop and keyboard accessibility. Run contrast checks.

**Next Steps**
1. Implement components and confirm copy with marketing.

**Tasks / Subtasks**
- [x] Implement `components/BenefitCards.js` with headings, descriptions, and accessible markup
- [x] Implement `components/HowItWorks.js` (three-step flow) or integrate into `BenefitCards` as appropriate
- [x] Mount components in `pages/index.js` below the hero
- [ ] Manual QA: mobile/desktop layout, keyboard accessibility, contrast checks
- [x] Update `File List` and `Change Log` with actual changed files
- [x] Add Dev Agent Record entries (Implementation Plan, Debug Log, Completion Notes)

**Dev Agent Record**
 - **Implementation Plan:** Implement presentational components using Tailwind utilities and semantic HTML; create/modify files listed in File List; run manual QA.
 - **Debug Log:**
   - 2026-05-14: Workflow started — story marked in-progress in sprint-status.yaml.
   - 2026-05-14: Added tests, installed Jest/RTL, implemented `components/BenefitCards.js` and `components/HowItWorks.js`, mounted components in `pages/index.js`.
 - **Completion Notes:**
   - Implemented three responsive benefit cards with semantic markup and accessible headings.
   - Implemented a three-step `How it works` flow with semantic ordered list.
   - Wrote unit tests verifying component rendering; test suite passes.

**File List (actual)**
- components/BenefitCards.js (new)
- components/HowItWorks.js (new)
- __tests__/BenefitCards.test.jsx (new)
- jest.setup.js (new)
- babel.config.js (new)
- pages/index.js (modified)
- package.json (modified)

**Change Log (session)**
- 2026-05-14: Started implementation session; updated story status to in-progress; prepared Tasks/Subtasks and Dev Agent Record.
- 2026-05-14: Added testing framework and tests; implemented `BenefitCards` and `HowItWorks`; mounted on homepage; tests pass.

