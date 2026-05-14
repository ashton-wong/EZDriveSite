**Story Header**
- **Story ID:** 2.2
- **Story Key:** 2-2-build-benefit-cards-and-how-it-works-flow
- **Title:** Build benefit cards and how-it-works flow
- **Status:** ready-for-dev
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
