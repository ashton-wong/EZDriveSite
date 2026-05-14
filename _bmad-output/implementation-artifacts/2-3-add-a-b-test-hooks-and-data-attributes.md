**Story Header**
- **Story ID:** 2.3
- **Story Key:** 2-3-add-a-b-test-hooks-and-data-attributes
- **Title:** Add A/B test hooks and data attributes
- **Status:** ready-for-dev
- **Owner:** Ashton
- **Created:** 2026-05-14

**Story Requirements**
- **User Story:** As a marketing operator, I want data-layer hooks and data attributes on hero and CTA elements so experiments can vary hero copy and CTA text and record variant in analytics.
- **Business Value:** Enables controlled experiments to improve conversion.
- **Acceptance Criteria (BDD):**
  - Given the hero and CTA are rendered, when an experiment is configured, then the hero root element includes `data-ab-variant="<variant-id>"` and the CTA includes `data-cta-id`.
  - Given a CTA click, when the event is fired, then the `cta_click` or `preorder_submit` GA4 events include `variant` populated from the data attribute.

**Developer Context & Guardrails**
- Implement attributes on root hero and CTA elements; expose easy API for marketing to change `data-ab-variant` (data attribute or small JS helper).
- Add non-PII event mapping in `lib/analytics.js` to include `variant` from `data-ab-variant` when firing `cta_click` or `preorder_submit`.
- Do not persist variant in localStorage unless approved; prefer data attributes or server-rendered variant injection.

**Files to update**
- `pages/index.js`, `components/Hero.js`, and `lib/analytics.js` (ensure it reads data attributes)

**Testing**
- Manual QA: set `data-ab-variant` and click CTA; verify analytics payload contains `variant` in DebugView.
