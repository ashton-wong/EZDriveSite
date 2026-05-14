# EZDriveSite - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for EZDriveSite, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: The site shall present a preorder form embedded via Google Forms in the hero or modal that collects email (required) and name (optional).
FR2: The site shall display a concise privacy note adjacent to the form with a link to the full Privacy Policy.
FR3: When the user submits the form, the site shall navigate to `/thank-you` or show a full-page confirmation that is addressable by GA4 for conversion measurement.
FR4: The site shall provide an internal API endpoint `pages/api/signup.js` (nice-to-have) to accept form submissions server-side and forward to marketing systems; if not implemented, continue using Google Forms embed.
FR5: The site shall include a prominent `Preorder` CTA in the hero that opens or scrolls to the embedded form and is A/B testable.
FR6: The site shall include three concise benefit cards and a short how-it-works flow section to support the hero message.
FR7: The site shall include a non-PII demo translator widget showing canned example inputs → humanized outputs; deeper interaction should require email capture.
FR8: The site shall include GA4 pageview tracking and a conversion event fired on `/thank-you` (or on successful submission) with event name `preorder_submit` and relevant non-PII parameters (e.g., `variant`, `utm_campaign`).
FR9: The site or associated admin workflow shall ensure exported lead lists contain only collected fields (email, name) and have access controls; PII minimization required.
FR10: All interactive elements (form, CTA, demo) shall be keyboard accessible and provide ARIA labels; key pages must meet WCAG 2.1 AA conformance.
FR11: Heavy 3D components shall lazy-load; on constrained devices, show a static image or simplified UI of the 3D visual.
FR12: The site shall include attributes or data-layer hooks to vary hero copy and CTA text for A/B testing via the marketing stack.
FR13: The site shall configure GA4 with IP anonymization where available and avoid sending raw PII into analytic events.

### NonFunctional Requirements

NFR1: The site shall achieve Lighthouse Performance score >= 80 on desktop and >= 60 on mobile with real-content audits; target FCP <= 1.8s on simulated 3G throttling for core content above the fold.
NFR2: Total JS payload for initial route shall be <= 250KB gzipped where possible; heavy 3D code must be deferred and lazy-loaded.
NFR3: Pages shall meet WCAG 2.1 AA for key flows (hero, form, demo). All interactive controls must be keyboard accessible and include ARIA attributes where necessary.
NFR4: The site shall collect only email and optional name; no raw IPs or device identifiers shall be stored alongside leads. GA4 shall be configured with IP anonymization where supported.
NFR5: Use HTTPS for all pages and assets; sanitize and validate any server-side capture endpoint; implement rate-limiting on `pages/api/signup.js` if enabled.
NFR6: The embedded form or internal endpoint shall return success/failure responses; the site shall show clear retry or contact options on failure.
NFR7: Implement basic logging for form submission failures and GA4 conversion checks; marketing ops must be able to verify conversions in GA4 within 24 hours.
NFR8: Avoid sending PII to analytics; use event parameters that are non-identifying and normalized (e.g., `variant`, `utm_campaign`).
NFR9: On devices with <2G or low CPU, 3D canvas shall be replaced with a static image and simplified interactions.

### Additional Requirements

- Starter template: use `create-next-app` (JavaScript) + Tailwind CSS to align with existing repo patterns.
- Hosting/deploy: Vercel or CDN-backed static hosting recommended; use Vercel env vars for any future server-relay secrets.
- Pages to implement: `pages/index.js`, `pages/thank-you.js`, and `pages/privacy.js` (privacy page required before promotion).
- Components referenced: `components/QuoteReveal.js` (form embed), `components/FeatureBento.js`, `components/PhoneChat.js`, `components/ThreeDCanvas.js` (lazy-load + fallback), `components/QuoteReveal.js` should include privacy note.
- Analytics: add `lib/analytics.js` and place GA4 measurement ID in `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var; fire `preorder_submit` on `/thank-you` or on client-side detection.
- Data & Privacy: use Google Forms embed for MVP; document export controls and minimize PII; defer server-relay `pages/api/signup.js` to post-MVP with auth, rate-limiting, and logging.
- Performance: lazy-load heavy 3D modules, provide static image fallbacks in `public/images/`, and enforce bundle budget via review/CI.
- Accessibility: include ARIA, keyboard support, and run a11y checks (recommend `axe`/`jest-axe` in CI).
- Implementation patterns: follow naming, file structure, and camelCase conventions defined in the Architecture document.

### UX Design Requirements

No UX design document was found in the planning artifacts; UX-specific requirements will be added if/when a UX spec is provided.

### FR Coverage Map

FR1: Epic 1 - Lead capture embed + form UI
FR2: Epic 1 - Privacy note + Privacy page link
FR3: Epic 1 - Submit → `/thank-you` or confirmation flow
FR4: Epic 1 / Epic 5 - Deferred server-relay (post-MVP)
FR5: Epic 2 - Hero CTA behavior & A/B hooks
FR6: Epic 2 - Benefit cards & how‑it‑works flow
FR7: Epic 3 - Demo widget with canned examples
FR8: Epic 4 - GA4 `preorder_submit` event tracking
FR9: Epic 1 - Lead export controls / PII minimization
FR10: Epic 5 - Keyboard accessible ARIA + WCAG conformance
FR11: Epic 3 - 3D lazy-load + static fallbacks
FR12: Epic 2 - Attributes/data-layer for A/B tests
FR13: Epic 4 - GA4 IP anonymization / privacy-safe analytics

## Epic List

### Epic 1: Preorder Capture & Confirmation
Visitors can submit a preorder (email ± name) and receive a verifiable confirmation.
**FRs covered:** FR1, FR2, FR3, FR9

### Epic 2: Marketing Experience & Conversion Hooks
High-conversion marketing content (hero, benefit cards, demo teaser) that guides visitors to preorder.
**FRs covered:** FR5, FR6, FR12

### Epic 3: Demo & Visuals (3D Fallbacks)
A safe, performant demo that showcases the AI translator using canned examples with mobile/low-bandwidth fallbacks.
**FRs covered:** FR7, FR11

### Epic 4: Analytics, Observability & Privacy-Safe Tracking
Reliable measurement of conversions and observability while preserving user privacy.
**FRs covered:** FR8, FR13

### Epic 5: Performance, Accessibility & Release Readiness
Ensure the site meets performance and accessibility targets required for promotion.
**FRs/NFRs covered:** FR10, NFR1, NFR2, NFR3, NFR9

## Epic 1: Preorder Capture & Confirmation (Stories)

### Story 1.1: Embed Preorder Form in Hero

As a visitor,
I want to see and complete a preorder form embedded in the hero or modal,
So that I can quickly submit my email to preorder without leaving the page.

**Acceptance Criteria:**

**Given** the landing page has loaded,
**When** I click the `Preorder` CTA or scroll to the form section,
**Then** an embedded Google Form is visible in the hero or modal with email (required) and name (optional) fields,
**And** the email field enforces basic email format validation,
**And** the embedded form is accessible (has title, accessible name, and is keyboard focusable).

### Story 1.2: Add Privacy Note and Privacy Page Link

As a privacy-conscious visitor,
I want to see a concise privacy note beside the preorder form with a link to the Privacy Policy,
So that I understand what data is collected and how it's used before I submit.

**Acceptance Criteria:**

**Given** the embedded form is visible,
**When** I view the form area,
**Then** a short privacy note is displayed adjacent to the form mentioning that only email (and optional name) are collected,
**And** a visible link labeled `Privacy Policy` navigates to `/privacy` (or opens the privacy page),
**And** the privacy note is readable by screen readers and meets contrast requirements.

### Story 1.3: Create `/thank-you` Confirmation Page and GA4 Hook

As a visitor who submitted the form,
I want to receive a confirmation page after submission,
So that my conversion is recorded and I get a clear confirmation message.

**Acceptance Criteria:**

**Given** I successfully submit the embedded Google Form,
**When** the form submission completes,
**Then** the user is redirected to `/thank-you` (or shown a full-page confirmation) and the pageview fires a GA4 `preorder_submit` event,
**And** the `/thank-you` page contains the confirmation copy and next-step instructions,
**And** the GA4 event contains only non‑PII parameters (e.g., `variant`, `utm_campaign`) and respects IP anonymization if configured.

### Story 1.4: Document Lead Export Controls and PII Minimization

As a marketing operator,
I want documentation and a simple checklist for lead exports and PII minimization,
So that exported lead lists contain only permitted fields and follow access controls.

**Acceptance Criteria:**

**Given** the Google Form capture is active,
**When** a marketing operator requests lead exports,
**Then** a short document exists in the repo (e.g., `docs/lead-export.md`) describing which fields are exported (email, name), where exports are stored, and who can access them,
**And** the document includes retention guidance and a note to avoid storing raw IPs or device identifiers with leads.

### Story 1.5 (Optional/Post‑MVP): Scaffold `pages/api/signup.js` Server‑Relay

As a developer,
I want a scaffolded server endpoint to accept form submissions and forward to marketing systems,
So that we can migrate off Google Forms in the future while preserving validation and privacy controls.

**Acceptance Criteria:**

**Given** the need to migrate off Google Forms,
**When** this scaffold is implemented,
**Then** a minimal `pages/api/signup.js` route exists that accepts POST `{ email, name }`, validates input, and returns `{ data: null, error: null }` on success,
**And** the endpoint reads provider credentials from env vars and includes basic rate-limiting notes in the code comments,
**And** the implementation does not send PII to analytics and logs only non-identifying events.

## Epic 2: Marketing Experience & Conversion Hooks (Stories)

### Story 2.1: Implement Hero and Preorder CTA

As a visitor,
I want a prominent `Preorder` CTA in the hero that scrolls or opens the embedded form,
So that I can quickly access the preorder form from the top of the page.

**Acceptance Criteria:**

**Given** the landing page is loaded,
**When** I click the hero `Preorder` CTA,
**Then** the page smoothly scrolls to the embedded form section or opens the form modal,
**And** focus is moved into the first form field for keyboard users,
**And** a `cta_click` data-layer event is pushed with a `variant` attribute indicating the hero variant.

### Story 2.2: Build Benefit Cards and How‑It‑Works Flow

As a new visitor,
I want concise benefit cards and a short how‑it‑works flow on the landing page,
So that I can understand the product value quickly and decide to preorder.

**Acceptance Criteria:**

**Given** the landing page is loaded,
**When** I view the benefits section,
**Then** three benefit cards are visible with headings, one-sentence descriptions, and optional icons,
**And** the how‑it‑works flow (3 steps) is present below the hero,
**And** all content is responsive, semantic (headings, lists), and accessible (alt text for icons, sufficient contrast).

### Story 2.3: Add A/B Test Hooks and Data Attributes

As a marketing operator,
I want data-layer hooks and data attributes on hero and CTA elements,
So that experiments can vary hero copy and CTA text and record variant in analytics.

**Acceptance Criteria:**

**Given** the hero and CTA are rendered,
**When** an experiment is configured,
**Then** the hero root element includes `data-ab-variant="<variant-id>"` and the CTA includes `data-cta-id` attributes,
**And** the `cta_click` or `preorder_submit` GA4 events include the `variant` parameter populated from these attributes,
**And** toggling the `data-ab-variant` on the page reflects the variant in analytics events for testing verification.

### Story 2.4 (Optional): Content Placeholders for Marketing Copy

As a marketing operator,
I want simple, easy-to-edit copy placeholders for hero and benefit text (in a small JSON or markdown file),
So that marketing can iterate on copy without changing React source files.

**Acceptance Criteria:**

**Given** the repo is checked out,
**When** marketing updates `content/marketing-copy.json` (or similar),
**Then** the landing page reads the values at build-time or from a single small file and displays updated hero and benefit text,
**And** documentation is added (`docs/editing-marketing-copy.md`) describing the file format and update workflow.

## Epic 3: Demo & Visuals (3D Fallbacks) (Stories)

### Story 3.1: Implement Canned Translator Demo Widget

As a curious visitor,
I want to see a safe, canned-demo translator widget that maps example diagnostic codes to plain‑English guidance,
So that I can understand the product capability without submitting any live device data.

**Acceptance Criteria:**

**Given** the landing page is loaded,
**When** I interact with the demo widget,
**Then** the widget displays only pre-defined, canned examples and returns corresponding plain-English outputs,
**And** deeper or custom inputs are gated behind email capture (show a lock or CTA to capture email),
**And** the widget does not accept or transmit live OBD‑II data.

### Story 3.2: Lazy‑load 3D Canvas and Provide Static Fallbacks

As a mobile or slow‑network visitor,
I want heavy 3D visuals to defer loading and show a static image fallback,
So that the page loads quickly and remains useful on constrained devices.

**Acceptance Criteria:**

**Given** the landing page is loaded on any device,
**When** the ThreeDCanvas component is present,
**Then** the 3D bundle and `@react-three/fiber` modules are lazy‑loaded only after first interaction or viewport intersection,
**And** a static fallback image from `public/images/` is shown immediately on small screens or when network is slow,
**And** the fallback image includes descriptive `alt` text and an accessible `aria-label` for the visual.

### Story 3.3a: Prepare 3D Assets (Models)

As a frontend engineer,
I want prepared, optimized 3D model files in `public/models/`,
So that the demo can lazy-load small, optimized assets on capable devices.

**Acceptance Criteria:**

**Given** the asset pipeline is available,
**When** models are added,
**Then** low-poly or optimized glTF files are placed in `public/models/` with names following `demo-model-<variant>.glb`,
**And** model sizes are documented and targeted to be under recommended thresholds (e.g., each model < 300KB gzip for MVP where feasible).

### Story 3.3b: Prepare Static Fallback Images

As a frontend engineer,
I want optimized static fallback images in `public/images/`,
So that constrained devices show lightweight visuals while 3D assets load lazily.

**Acceptance Criteria:**

**Given** the images pipeline is available,
**When** images are added,
**Then** compressed fallback images are placed in `public/images/` following `demo-fallback-<variant>.jpg` and include descriptive `alt` text,
**And** images are sized for mobile-first delivery (e.g., <= 100KB where possible).

### Story 3.3c: Assets Documentation and Regeneration

As a developer,
I want documentation describing asset locations and regeneration steps,
So that future contributors can optimize or replace assets consistently.

**Acceptance Criteria:**

**Given** new assets are added,
**When** a contributor reviews the repo,
**Then** `docs/assets.md` documents where assets live (`public/models/`, `public/images/`), file naming conventions, and commands or tools used to regenerate optimized versions.

### Story 3.4: Accessibility & Performance Tuning for Demo

As a product owner,
I want the demo and visuals to meet accessibility and performance targets,
So that the demo doesn't degrade core metrics or exclude assistive users.

**Acceptance Criteria:**

**Given** the demo is implemented,
**When** automated checks run,
**Then** core demo interactions report zero critical axe violations (axe-core severity: critical = 0) in CI or local runs,
**And** the initial hero + demo view meets the performance threshold of First Contentful Paint (FCP) ≤ 1.8s in a local Lighthouse emulation (desktop throttling for core content) and Largest Contentful Paint (LCP) ≤ 2.5s where applicable,
**And** instructions for running a quick Lighthouse and axe check are added to `docs/dev-checks.md` including exact commands and expected pass thresholds.

## Epic 4: Analytics, Observability & Privacy‑Safe Tracking (Stories)

### Story 4.1: Add `lib/analytics.js` and GA4 Initialization

As a developer,
I want a small `lib/analytics.js` helper that initializes GA4 from `NEXT_PUBLIC_GA_MEASUREMENT_ID`,
So that analytics initialization is centralized and easy to reuse.

**Acceptance Criteria:**

**Given** the repo has env vars configured,
**When** the site loads,
**Then** `lib/analytics.js` exports `initAnalytics()` and `trackEvent(name, params)` helpers that read `NEXT_PUBLIC_GA_MEASUREMENT_ID` and initialize GA only when present,
**And** initialization avoids sending PII and supports IP anonymization if the environment or GA config supports it,
**And** `pages/_app.js` demonstrates usage by calling `initAnalytics()` on client load.

### Story 4.2: Implement Privacy‑Safe `preorder_submit` Event

As a marketing operator,
I want the `preorder_submit` event to contain only non‑PII fields (e.g., `variant`, `utm_campaign`),
So that conversions can be measured without exposing user identities.

**Acceptance Criteria:**

**Given** a successful preorder submission,
**When** the `/thank-you` page loads or client-side submission is detected,
**Then** `trackEvent('preorder_submit', { variant, utm_campaign })` is called,
**And** no email or other PII is sent to GA events,
**And** documentation (`docs/analytics.md`) explains which parameters are safe to include.

### Story 4.3: Add Observability for Form Failures

As an engineer,
I want lightweight logging of form submission failures (client + server if applicable),
So that marketing ops can be alerted to capture issues and troubleshoot lead capture reliability.

**Acceptance Criteria:**

**Given** a form submission failure (network or embed failure),
**When** failure occurs,
**Then** a non‑PII `form_submission_failure` event is logged via `trackEvent` with an error code and non-identifying metadata (e.g., `errorCode`, `timestamp`),
**And** `docs/observability.md` includes steps for checking logs and verifying recent failures.

### Story 4.4: Verification Runbook and Dashboard Checks

As a marketing operator,
I want a simple verification runbook and a suggested GA4 dashboard to validate conversions,
So that I can confirm preorders are tracked correctly after deployment.

**Acceptance Criteria:**

**Given** the site is deployed to a preview or production environment,
**When** marketing runs the verification checklist,
**Then** `docs/analytics.md` contains step-by-step verification instructions that explicitly reference GA4 locations to check (DebugView and Realtime reports), how to use the GA4 DebugView extension/Debug mode, and sample test steps to trigger a `preorder_submit` event,
**And** the runbook enumerates expected event names (`preorder_submit`, `form_submission_failure`) and example non‑PII parameter values (e.g., `variant: 'hero-A'`, `utm_campaign: 'launch-test'`),
**And** the runbook includes acceptance criteria for verification (event observed in DebugView within 30s and appears in Realtime within 5 minutes) and a short troubleshooting checklist.

### Story 4.5: Secure GA4 Measurement ID Handling

As a developer,
I want the GA4 measurement ID documented and loaded from `NEXT_PUBLIC_GA_MEASUREMENT_ID`,
So that we avoid committing secrets and have a clear env var policy for analytics.

**Acceptance Criteria:**

**Given** local and production environments,
**When** developers run or deploy the site,
**Then** `NEXT_PUBLIC_GA_MEASUREMENT_ID` is documented in `docs/analytics.md` and `.env.example` is updated with a placeholder,
**And** code paths gracefully handle a missing measurement ID (no analytics initialized).

## Epic 5: Performance, Accessibility & Release Readiness (Stories)

### Story 5.1a: Define Performance Budget

As an engineering lead,
I want explicit performance budget thresholds documented,
So that teams have measurable targets before implementing optimizations.

**Acceptance Criteria:**

**Given** the project requirements,
**When** the budget is published,
**Then** a short `docs/performance-budget.md` defines thresholds (e.g., FCP ≤ 1.8s desktop, LCP ≤ 2.5s, total initial JS ≤ 250KB gzipped) and how to measure them locally.

### Story 5.1b: Local Lighthouse Audit Script

As a developer,
I want a runnable local audit script that executes Lighthouse with defined emulation settings,
So that we can reproduce performance checks easily.

**Acceptance Criteria:**

**Given** the repo is checked out,
**When** I run `npm run audit:perf`,
**Then** Lighthouse CLI runs against the local server with the specified emulation settings and fails the script if FCP > 1.8s or initial JS > 250KB gzipped,
**And** output includes a short summary of key metrics and a link to the full Lighthouse report.

### Story 5.1c: CI Integration for Performance Checks

As a CI maintainer,
I want performance checks to run in CI for pull requests,
So that regressions are caught before merge.

**Acceptance Criteria:**

**Given** a PR is opened,
**When** CI runs,
**Then** the performance audit runs in CI (or a lightweight emulation) and fails the PR if thresholds in `docs/performance-budget.md` are not met, or marks the check as advisory if CI resource limits prevent strict enforcement.

### Story 5.2: Accessibility Fixes and ARIA Requirements

As an accessibility reviewer,
I want the landing page and form interactions to meet WCAG 2.1 AA for core flows,
So that users with assistive technologies can complete the preorder flow.

**Acceptance Criteria:**

**Given** the implemented UI,
**When** automated axe checks are run,
**Then** there are no critical violations for core flows (hero, form, demo) and focus order is preserved,
**And** interactive controls include appropriate ARIA attributes and visible focus styles.

### Story 5.3: Bundle Optimization and Code‑Splitting

As a frontend developer,
I want large dependencies and demo code split out of the initial bundle,
So that the initial route stays within the specified payload budget.

**Acceptance Criteria:**

**Given** the project build,
**When** the production build completes,
**Then** 3D libraries and demo code are dynamically imported and not included in the main initial chunk,
**And** build output comments or docs describe the chunk sizes and where to inspect them.

### Story 5.4: Add `pages/privacy.js` and Privacy Copy

As a legal/marketing stakeholder,
I want a visible Privacy Policy page and concise privacy copy near the form,
So that users have explicit access to privacy terms before submitting.

**Acceptance Criteria:**

**Given** the repo,
**When** the site is deployed or run locally,
**Then** `pages/privacy.js` exists with the project's privacy copy stub, the preorder form area links to `/privacy`, and `docs/privacy-guidance.md` includes recommended copy for the final policy.

### Story 5.5: Release Readiness Checklist

As a release manager,
I want a short pre-launch checklist covering performance, accessibility, analytics, and privacy,
So that the team can verify readiness before promoting the site.

**Acceptance Criteria:**

**Given** a candidate release,
**When** the checklist is run,
**Then** the checklist in `docs/release-checklist.md` verifies Lighthouse thresholds, a11y smoke checks, GA4 verification steps, privacy page presence, and that the Google Form redirect or server-relay is configured.



