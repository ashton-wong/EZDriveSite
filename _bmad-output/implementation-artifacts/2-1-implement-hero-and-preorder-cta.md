**Story Header**
- **Story ID:** 2.1
- **Story Key:** 2-1-implement-hero-and-preorder-cta
- **Title:** Implement hero and Preorder CTA
- **Status:** ready-for-dev
- **Owner:** Ashton
- **Created:** 2026-05-14

**Story Requirements**
- **User Story:** As a visitor, I want a prominent `Preorder` CTA in the hero that scrolls or opens the embedded form so I can quickly access the preorder form from the top of the page.
- **Business Value:** Increases visibility of the preorder funnel and improves conversion rates.
- **Acceptance Criteria (BDD):**
  - Given the landing page is loaded, when I click the hero `Preorder` CTA, then the page smoothly scrolls to the embedded form section or opens the form modal.
  - Given the CTA is activated, when focus moves, then focus is placed in the first form field for keyboard users.
  - Given the CTA is rendered, when experiments run, then the CTA includes `data-cta-id` and the hero root includes `data-ab-variant` attributes for A/B test attribution.

**Developer Context & Guardrails**
- Use existing hero component patterns in `components/Hero.js` or `components/Hero` variants. If `Hero.js` does not exist, update `pages/index.js` hero markup.
- Implement smooth scroll using native `element.scrollIntoView({ behavior: 'smooth' })` or a small helper; ensure no additional heavy libraries are added.
- Ensure keyboard accessibility: CTA is a `<button>` or `<a role="button">` with clear `aria-label` and focus styles.
- Add `data-cta-id` and `data-ab-variant` attributes and ensure `lib/analytics.js` reads these for events.
- Do not change existing hero copy or layout without design approval; keep styles via Tailwind utilities.

**Files to update**
- `pages/index.js` (hero area) — add CTA wiring
- `components/Hero.js` (if present) — ensure CTA and data attributes

**Testing**
- Manual QA: click CTA, confirm scroll or modal, confirm focus, confirm data attributes present.
- Add a simple unit test for CTA `click` behavior if test harness exists.

**Next Steps**
1. Implement CTA wiring and data attributes. 2. Coordinate with design for copy/variant choices.
