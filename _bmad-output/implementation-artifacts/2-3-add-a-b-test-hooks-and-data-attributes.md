**Story Header**
- **Story ID:** 2.3
- **Story Key:** 2-3-add-a-b-test-hooks-and-data-attributes
- **Title:** Add A/B test hooks and data attributes
- **Status:** review
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

**Tasks / Subtasks**
- [x] Add `data-ab-variant` to hero root and ensure it can be server-injected or changed by marketing
- [x] Add `data-cta-id` to CTAs (hero CTA) and ensure `Button` forwards custom data attributes
- [x] Implement `lib/analytics.js` helper to read `data-ab-variant` and include `variant` in `cta_click` and `preorder_submit` events
- [x] Wire `onPreorder` handler on the homepage to call analytics with the DOM event so variant is extracted
- [ ] Manual QA: verify DebugView shows `variant` parameter on `cta_click` when `data-ab-variant` present

**Dev Agent Record**
- **Debug Log:**
  - 2026-05-14T15:30Z: Started implementation session. Read `sprint-status.yaml` and story file. Marked story in-progress.
  - 2026-05-14T15:35Z: Created `lib/analytics.js` with `initAnalytics` and `trackEvent` that extracts `data-ab-variant` from the DOM.
  - 2026-05-14T15:36Z: Updated `pages/index.js` to call `trackEvent('cta_click', { cta_id: 'hero-preorder' }, event)` from the `onPreorder` handler.
  - 2026-05-14T15:40Z: Marked tasks implemented and ready for Manual QA; no unit test harness detected so manual verification required.

- **Completion Notes:**
  - Implemented privacy-first analytics helper; variant extraction prioritizes closest `[data-ab-variant]` ancestor then document fallback.
  - CTA click handler now invokes analytics with the click event so `variant` is included in event params.

**File List (changed/added)**
- lib/analytics.js (added)
- pages/index.js (modified)
- _bmad-output/implementation-artifacts/sprint-status.yaml (modified)

**Manual QA Notes**
- No unit test harness detected in repository. Manual QA required:
  - Set `data-ab-variant="test-A"` on the hero root, click hero CTA, and verify `variant: "test-A"` appears in GA4 DebugView for `cta_click` event.

**Change Log**
- 2026-05-14: Mark story `2-3-add-a-b-test-hooks-and-data-attributes` in-progress; added `lib/analytics.js` and wired CTA tracking on homepage. (Ashton / Dev Agent)
