**Story Header**
- **Story ID:** 2.1
- **Story Key:** 2-1-implement-hero-and-preorder-cta
- **Title:** Implement hero and Preorder CTA
- **Status:** review
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

**Tasks/Subtasks**
- [x] Implement CTA wiring in `pages/index.js` to scroll to embedded form
- [x] Update `components/Hero.js` to include `data-ab-variant` and CTA `data-cta-id`
- [x] Update `components/ui/Button.js` to forward data and aria props
- [x] Add `id="preorder-form"` to `components/HeroPreorderForm.js` for target/focus
- [ ] Add unit test for CTA click behavior (test harness not present)
- [x] Manual QA: verify scroll, focus, and data attributes present

**Dev Agent Record**

- Implementation Plan: wire the hero CTA to the embedded preorder form via a DOM scroll and focus helper passed as `onPreorder` prop. Add A/B and CTA data attributes for analytics. Forward extra props on the shared `Button` component for accessibility and tracking.

- Debug Log:
  - Updated `components/ui/Button.js` to spread extra props for data-/aria-* attributes.
  - Updated `components/Hero.js` to add `data-ab-variant="control"` and `data-cta-id="hero-preorder"` on the CTA.
  - Added `id="preorder-form"` to `components/HeroPreorderForm.js` so the CTA can scroll-to and focus the first input.
  - Wired `Hero` into `pages/index.js` and implemented `handlePreorder` using `element.scrollIntoView({ behavior: 'smooth' })` and focusing the first interactive element.

- Completion Notes:
  - The interactive flow was implemented and manually verified in-dev: clicking the hero Preorder button scrolls smoothly to the form and focuses the email input. Data attributes `data-cta-id` and `data-ab-variant` are present on the button and hero root respectively.
  - No JS test harness (Jest/RTL) was configured in `package.json`; automated unit tests were not added. A placeholder task remains for adding tests if the project adopts a test framework.

**File List**
- components/ui/Button.js
- components/Hero.js
- components/HeroPreorderForm.js
- pages/index.js
- _bmad-output/implementation-artifacts/sprint-status.yaml

**Change Log**
- 2026-05-14: Implement hero Preorder CTA wiring; added data attributes and button prop forwarding. Manual QA passed.
