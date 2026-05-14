**Story Header**
- **Story ID:** 1.3
- **Story Key:** 1-3-create-thank-you-confirmation-page-and-ga4-hook
- **Title:** Create `/thank-you` confirmation page and GA4 conversion hook
- **Status:** ready-for-dev
- **Owner:** Ashton
- **Created:** 2026-05-14

**Story Requirements**
- **User Story:** As a visitor who submitted the preorder form, I want to receive a clear confirmation page so my conversion is recorded and I know next steps.
- **Business Value:** Provides verifiable conversion signal for GA4 and improves user trust with explicit confirmation.
- **Acceptance Criteria (BDD):**
  - Given a successful form submission (Google Form redirect or client-side detection), when the process completes, then the user lands on `/thank-you` (or sees equivalent full-page confirmation).
  - Given `/thank-you` loads, when the page mounts on the client, then a GA4 `preorder_submit` event is fired with only non‑PII params (`variant`, `utm_campaign`).
  - Given `/thank-you` is visited directly, when visited, then the page shows confirmation copy and no PII in analytics.

**Developer Context**
- **What to build:** A lightweight `pages/thank-you.js` page containing confirmation copy, optional next-step CTA, and a client hook that triggers `trackEvent('preorder_submit', params)` from `lib/analytics.js`.
- **Edge cases:** If Google Forms redirects to a different domain or cannot redirect, implement client-side detection (e.g., query param `?preorder=success`) to show confirmation and fire the event.

**Technical Requirements & Guardrails**
- Implement `pages/thank-you.js` using existing Next.js pages conventions. Keep it static (SSG) with client-only analytics firing in `useEffect` to avoid server-side PII exposure.
- Add or reuse `lib/analytics.js` helper exporting `initAnalytics()` and `trackEvent()`.
- Ensure `trackEvent` strips PII and only sends `variant`, `utm_campaign`, and other non-identifying params.
- Use `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var. The app must gracefully no-op analytics calls when the env var is missing.
- Do NOT send email or name to analytics. Ensure any logging or debug output is non-PII.

**Testing & QA**
- Manual QA: confirm redirect flow from embedded form to `/thank-you` works, confirm pageview and `preorder_submit` appear in GA4 DebugView (non-PII), and confirm copy and CTA display correctly.
- Automated: provide a small unit/integration test demonstrating `trackEvent` called on mount when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is present (mock analytics helper).

**File Changes Suggested**
- `pages/thank-you.js` — new page file
- `lib/analytics.js` — add/ensure `initAnalytics()` and `trackEvent()` helpers
- (Optional) small e2e or integration test under `tests/` to validate event firing

**Next Steps**
1. Implement `pages/thank-you.js` with confirmation copy and `trackEvent('preorder_submit', {...})` on mount.
2. Verify GA4 DebugView logs the `preorder_submit` event without PII.