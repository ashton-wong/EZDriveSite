---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-finalization
releaseMode: single-release
inputDocuments:
  - _bmad-output/product-brief.md
  - _bmad-output/project-context.md
workflowType: 'prd'
productBriefCount: 1
researchCount: 0
brainstormingCount: 0
projectDocsCount: 1
classification:
  projectType: web_app
  domain: automotive
  complexity: medium
  projectContext: brownfield
---

# Product Requirements Document - EZDriveSite

**Author:** Ashton
**Date:** 2026-05-13

## Initialization Report

- Created from template: .agents/skills/bmad-create-prd/templates/prd-template.md
- Output file: _bmad-output/planning-artifacts/prd.md
- Input documents discovered and loaded:
  - _bmad-output/product-brief.md
  - _bmad-output/project-context.md

## Files Loaded (full contents available in workspace)

- Product brief: _bmad-output/product-brief.md
- Project context: _bmad-output/project-context.md


## Executive Summary

EZDrive provides parents of young drivers with peace of mind by translating raw OBD‑II diagnostic data into clear, actionable alerts delivered to a parent’s phone. The initial deliverable is a single‑page marketing site to validate demand and capture preorders for an AI‑enabled OBD‑II device + app that explains vehicle issues in plain English and recommends next steps.

### What Makes This Special

- Immediate parent notification when a teen’s vehicle has an issue the teen didn’t notice.
- Plain‑English, step‑by‑step remediation guidance for non‑technical users (e.g., "Replace brake pads" vs P0420 code).
- An AI translation layer that maps diagnostic codes to prioritized, contextualized actions — enabling trust and adoption.

### Project Classification

- Project Type: web_app (Next.js marketing site)
- Domain: automotive
- Complexity: medium (marketing site is low scope; product ecosystem including device/backend raises complexity)
- Project Context: brownfield (existing site code present)

## Success Criteria

### User Success (marketing site)

- Messaging clarity: 90% of 5–10 usability testers can state the core value ("peace of mind via plain‑English car alerts") within 20s of landing.
- CTA engagement: Preorder CTA click rate ≥ 3% for engaged visitors during initial campaign.
- Form visibility & trust: Embedded form and privacy note visible on first viewport on mobile; 95% of testers find the privacy note clear.
- Content engagement: Median time on page ≥ 90s for users who interact with benefits/how‑it‑works.

### Business Success

- Preorder target: 50 preorder signups within 60 days of campaign start.
- Email capture: Cost per lead (CPL) < $10 during initial paid outreach.
- Lead engagement: ≥ 25% of captured leads open at least one follow-up email within 30 days.

### Technical Success (site)

- Submission reliability: Form captures 100% of submissions (no data loss) during first 30 days.
- Performance: First Contentful Paint (FCP) ≤ 1.8s on 3G emulation; Lighthouse Performance score ≥ 80.
- Analytics: GA4 records pageviews and `/thank-you` conversions; no broken redirects.
- Privacy baseline: Only collect email (+ optional name); privacy note present beside the form.

### Measurable Outcomes

- Conversion rate (visitors → signups) ≥ 2.5% for organic traffic test.
- Median time on page ≥ 90s for engaged users.
- Follow-up CTA click-through ≥ 20% among signups.

### Product-level metrics (OUT OF SCOPE for this marketing site; track separately in product roadmap)

- Notification delivery latency, translation accuracy, and actionable-alert effectiveness belong to device/app success criteria and will be tracked by the product team.

## Project-Type: web_app — Technical Requirements (Recommended Defaults)

### Project-Type Overview

- Project type: `web_app` (Next.js). Recommended delivery: static site with server-side rendering only where beneficial (SSG/ISR for pages, SSR for any dynamic server-rendered content). This maximizes performance and SEO while retaining flexibility.

### Key Decisions (Recommended)

1. Rendering: Use Next.js SSG for primary landing pages with ISR where content may change (e.g., `/thank-you` variants); use SSR only if server-side personalization becomes required.
2. Browser Support: Target "last 2 versions" of major browsers, include Safari iOS 15+ and recent Chrome/Edge/Firefox releases.
3. SEO: Yes — site optimized for organic acquisition. Include meta tags, Open Graph (`og:`) tags, and structured data for product/organization where appropriate.
4. Real-time features: None required for MVP marketing site; avoid websockets or live feeds on the landing page.
5. Accessibility: WCAG 2.1 AA target for core content and form controls.
6. Performance Targets: FCP ≤ 1.8s on 3G emulation and Lighthouse Performance ≥ 80 for the landing page.
7. 3D/Model Strategy: Defer heavy 3D assets on mobile; provide lightweight static/fallback imagery or low-poly alternatives. Use `loading=lazy` and progressive enhancement for `ThreeDCanvas` scenes.

### Technical Architecture Considerations

- Hosting/deploy: Vercel or equivalent CDN-backed static hosting with support for ISR and serverless API routes (`pages/api/*`).
- Asset strategy: Serve optimized images via `next/image` or equivalent, compress models, and host large model files in `public/models/` with caching headers.
- Analytics: GA4 integration in `pages/_app.js` with pageview and `/thank-you` conversion events; respect Do Not Track and support cookie consent if required later.
- Forms: Start with embedded Google Form for MVP; plan migration path to `pages/api/signup.js` for server-side capture and secure forwarding to an email provider.
- Performance budget: Keep initial page payload < 200KB gzipped where possible; defer non-critical JS and 3D code until after first interaction.

### Required Sections (from CSV mapping)

- `browser_matrix`: Support matrix: Chrome (latest), Safari iOS 15+, Firefox (latest), Edge (latest); graceful degradation for older browsers.
- `responsive_design`: Mobile-first responsive layouts, hero and CTA visible above the fold on standard mobile viewports.
- `performance_targets`: FCP ≤ 1.8s, Lighthouse ≥ 80, Lighthouse accessibility ≥ 90 for core flows.
- `seo_strategy`: Meta tags, canonical URLs, structured data for product preorders, Open Graph and Twitter Card tags, sitemap.xml.
- `accessibility_level`: WCAG 2.1 AA compliance for content, forms, and interactive components.

### Implementation Considerations

- Use Tailwind CSS utilities and `styles/globals.css` for consistent responsive behavior.
- Provide fallbacks for `ThreeDCanvas` components: show static image or lightweight SVG on mobile or slow networks.
- Implement `/_document.js` and `/_app.js` appropriately for SEO and analytics snippets; avoid inline scripts that break CSP.
- Add a simple `/thank-you` static page and instruct Google Form redirect to it (or implement client-side detection of submission). Ensure GA4 records the `/thank-you` pageview.

## Project Scoping — Single Release (MVP Marketing Site)

### Strategy & Philosophy

**Approach:** Single release focused on validating demand and capturing preorders via a high-conversion marketing landing page. The release prioritizes clarity of message, lead capture reliability, performance, and accessibility.

**Resource Requirements (recommended):** 1 frontend engineer, 1 designer/UX, 1 copywriter, 1 part‑time marketing/ops for GA4 and campaign setup. Delivery target: 1–2 week sprint for an initial polished MVP depending on availability.

### Complete Feature Set (Single Release)

**Core User Journeys Supported:** Visitor → Preorder; Mobile visitor → Preorder; Share/Referral; Marketing ops optimization.

**Must-Have Capabilities:**
- Hero with clear value proposition and `Preorder` CTA
- Three benefit cards and a concise how‑it‑works flow
- Embedded Google Form (email + optional name) with visible privacy note
- `/thank-you` page or visible post‑submit confirmation for conversion tracking
- GA4 integrated for pageviews and `/thank-you` conversions
- Mobile‑first responsive design and performance fallbacks for 3D content
- Basic A/B test readiness for CTA copy

**Nice-to-Have (defer if needed):**
- Internal server-side form capture (`pages/api/signup.js`) and provider integration
- Additional marketing pages (FAQ expansion, timeline) beyond single-page content
- Advanced personalization or dynamic hero variations

### Risk Mitigation Strategy

**Technical Risks:** 3D assets and heavy client JS could harm performance. Mitigation: lazy-load 3D, provide static fallbacks, enforce performance budgets.

**Market Risks:** Low initial conversion. Mitigation: run A/B tests on hero/CTA, monitor CPL, and iterate quickly on messaging.

**Resource Risks:** Limited engineering time. Mitigation: focus scope tightly on core content and use Google Form embed instead of building backend initially.

## Functional Requirements (Step 9 — Capability Contract)

The marketing landing page MVP will implement the following capability areas and concrete functional requirements. Each FR is scoped for a single-page marketing site with lead capture and conversion tracking.

Core capability areas:
- Lead capture and confirmation
- Marketing content & hero flow
- Analytics and conversion tracking
- Privacy & compliance copy
- Performance and 3D content fallback

Functional Requirements (numbered):

- FR-1 Lead Capture: The site shall present a preorder form embedded via Google Forms in the hero or modal that collects email (required) and name (optional).
- FR-2 Privacy Notice: The site shall display a concise privacy note adjacent to the form with a link to the full Privacy Policy.
- FR-3 Submit Flow: When the user submits the form, the site shall navigate to `/thank-you` or show a full-page confirmation that is addressable by GA4 for conversion measurement.
- FR-4 Server Relay (Deferred): The site shall provide an internal API endpoint `pages/api/signup.js` (nice-to-have) to accept form submissions server-side and forward to marketing systems; if not implemented, continue using Google Forms embed.
- FR-5 Hero CTA: The site shall include a prominent `Preorder` CTA in the hero that opens or scrolls to the embedded form and is A/B testable.
- FR-6 Benefit Sections: The site shall include three concise benefit cards and a short how-it-works flow section to support the hero message.
- FR-7 Demo Widget (Canned): The site shall include a non-PII demo translator widget showing canned example inputs → humanized outputs; deeper interaction should require email capture.
- FR-8 GA4 Integration: The site shall include GA4 pageview tracking and a conversion event fired on `/thank-you` (or on successful submission) with event name `preorder_submit` and relevant non-PII parameters (e.g., `variant`, `utm_campaign`).
- FR-9 Email Export Controls: The site or associated admin workflow shall ensure exported lead lists contain only collected fields (email, name) and have access controls; PII minimization required.
- FR-10 Accessibility: All interactive elements (form, CTA, demo) shall be keyboard accessible and provide ARIA labels; key pages must meet WCAG 2.1 AA conformance.
- FR-11 Mobile Fallbacks: Heavy 3D components shall lazy-load; on constrained devices, show a static image or simplified UI of the 3D visual.
- FR-12 A/B Test Hooks: The site shall include attributes or data-layer hooks to vary hero copy and CTA text for A/B testing via the marketing stack.
- FR-13 Privacy Preserving Analytics: The site shall configure GA4 with IP anonymization where available and avoid sending raw PII into analytic events.

## Non-Functional Requirements (Step 10)

These NFRs apply to the single-release marketing landing page MVP and enforce performance, security, privacy, and accessibility targets.

- NFR-1 Performance: The site shall achieve Lighthouse Performance score >= 80 on desktop and >= 60 on mobile with real-content audits; target FCP <= 1.8s on simulated 3G throttling for core content above the fold.
- NFR-2 Bundle Budget: Total JS payload for initial route shall be <= 250KB gzipped where possible; heavy 3D code must be deferred and lazy-loaded.
- NFR-3 Accessibility: Pages shall meet WCAG 2.1 AA for key flows (hero, form, demo). All interactive controls must be keyboard accessible and include ARIA attributes where necessary.
- NFR-4 Privacy & Data Protection: The site shall collect only email and optional name; no raw IPs or device identifiers shall be stored alongside leads. GA4 shall be configured with IP anonymization where supported.
- NFR-5 Security: Use HTTPS for all pages and assets; sanitize and validate any server-side capture endpoint; implement rate-limiting on `pages/api/signup.js` if enabled.
- NFR-6 Reliability: The embedded form or internal endpoint shall return success/failure responses; the site shall show clear retry or contact options on failure.
- NFR-7 Observability: Implement basic logging for form submission failures and GA4 conversion checks; marketing ops must be able to verify conversions in GA4 within 24 hours.
- NFR-8 Privacy-First Analytics: Avoid sending PII to analytics; use event parameters that are non-identifying and normalized (e.g., `variant`, `utm_campaign`).
- NFR-9 Mobile Fallbacks: On devices with <2G or low CPU, 3D canvas shall be replaced with a static image and simplified interactions.

## Domain-Specific Requirements (Marketing Site — Brief)

Context: The project domain is `automotive` with medium overall complexity, but the current scope is a marketing/preorder landing page. Domain requirements below focus on marketing‑site implications only.

### Compliance & Regulatory

- Avoid collecting sensitive vehicle identifiers (VINs) or health/safety telemetry on the marketing site.
- Do not target or collect data about minors; direct communications to parents only. (COPPA applies for <13; our primary audience is parents of teen drivers, but avoid collecting age or minor identifiers.)
- Display a clear privacy note beside the preorder form and link to a Privacy Policy before broad promotion.

### Technical Constraints (site)

- Limit data collection to email and optional name; no device telemetry on the landing page.
- Use GA4 for analytics with IP anonymization where supported; avoid storing raw IPs or device identifiers in lead exports.
- Ensure the embedded form or capture endpoint does not leak PII to third‑party scripts; prefer server-side relay if migrating away from Google Forms.

### Integration Requirements

- None required for MVP marketing capture. If migrating to internal capture later, plan secure forwarding to an email provider and minimal retention policies.

### Risks & Mitigations (marketing scope)

- Risk: Unclear privacy practices harm trust. Mitigation: Add concise privacy copy adjacent to form and include a link to a full Privacy Policy.
- Risk: Lead export contains PII. Mitigation: Limit exported fields, store only necessary contact info, and protect exports with access controls.
- Risk: Mis‑targeting minors. Mitigation: Marketing should target parents; avoid youth‑targeted ad placements and language.

## Innovation & Novel Patterns (Draft)

### Detected Innovation Areas

- AI translational layer: The core product innovation is an AI layer that converts OBD‑II codes into prioritized, plain‑English guidance for non‑technical parents. While the translation lives in the device/app, the marketing site can validate this innovation by demonstrating a lightweight, safe translator demo (example inputs → humanized outputs) without collecting live device data.
- Interactive demo as validation: A sandbox translator widget on the landing page showing anonymized sample codes mapped to clear actions; this serves as both proof of concept and conversion hook.
- Trust‑building UX: Realistic, bounded demo responses plus clear disclaimers and privacy notes to manage expectations and liability.

### Market Context & Competitive Landscape

- Existing players: Several OBD‑II dongles and apps provide raw codes or simplified explanations, but few prioritize parent‑facing alerts with AI‑grade translation and actionable next steps.
- Positioning opportunity: Lead with "AI‑powered translation" as the differentiator and use the demo to make the capability tangible for non‑technical buyers.

### Validation Approach

- On‑site demo: Implement a non‑interactive or lightly interactive demo using canned examples to showcase translation quality; require email capture before unlocking deeper examples to validate intent.
- Usability testing: Run 5–10 quick moderated sessions to ensure visitors understand the demo and can state the value proposition in 20s.
- Conversion experiments: A/B test hero messaging (translation‑first vs peace‑of‑mind‑first) and measure preorder CTA lift.

### Risk Mitigation

- Translation errors / liability: Avoid claims of diagnostic certainty on the site; use clear language like "interpretation guidance" and provide a small disclaimer for high‑severity issues recommending professional inspection.
- Privacy & data safety: Use only canned or anonymized example inputs for demos; do not accept live diagnostic data on the marketing site.
- Expectation management: Use UI signals (confidence tiers, severity levels) in demo responses and in site copy to set realistic expectations.

## User Journeys (Marketing Site — Draft)

### 1) Visitor → Parent (Landing → Preorder)

Opening Scene: A parent clicks an ad or organic result and lands on the homepage. The hero communicates the value in one sentence.

Rising Action: The parent scans benefits and how‑it‑works sections, watches a quick visual, and sees the `Preorder` CTA near the hero and again after benefits.

Climax: Parent clicks `Preorder`, completes the embedded form (email + optional name), and is redirected to `/thank-you` or sees an on‑page confirmation.

Resolution: Parent receives a follow‑up email with next steps and an invitation to join updates; marketing captures the lead.

Journey Requirements Summary:
- Strong hero messaging and visual that conveys value in 20s
- Prominent `Preorder` CTA and accessible embedded form
- Visible privacy note near form and working `/thank-you` flow
- GA4 conversion tracking and form reliability

### 2) Mobile Visitor (Slow Network / Small Screen)

Opening Scene: Parent visits from mobile on a weak network.

Rising Action: Page loads progressively; hero and CTA visible quickly; lightweight visuals or fallbacks shown.

Climax: Parent taps CTA and the form loads reliably; privacy note is readable; submission completes without data loss.

Resolution: Parent gets confirmation; conversion tracked despite constrained conditions.

Journey Requirements Summary:
- Performance optimizations and responsive layout
- Minimal initial payload and fallbacks for 3D/large assets
- Mobile-first form UX and visible privacy copy

### 3) Curious Visitor → Share (Discovery → Social Share)

Opening Scene: A visitor is intrigued by the hero and clicks a "Share" or "Tell a friend" CTA.

Rising Action: A share modal or link prepopulates with short value proposition and a link to the landing page.

Climax: Visitor shares the link via messaging or social; a friend clicks through and repeats the flow.

Resolution: Viral referrals increase organic traffic and lead captures.

Journey Requirements Summary:
- Prebuilt share links/messages and social metadata (OG tags)
- Short, compelling messaging for shares

### 4) Marketing Ops (Campaign → Optimization)

Opening Scene: Marketing lead reviews campaign results and landing performance.

Rising Action: Ops inspects GA4 funnels, checks `/thank-you` redirects, and runs a copy A/B test for CTA wording.

Climax: Ops identifies a CTA that improves conversion and updates live content; lead list exported for nurture.

Resolution: Campaign metrics improve and leads are nurtured into preorder conversions.

Journey Requirements Summary:
- GA4 integration, conversion funnel dashboards, and exportable lead lists
- Simple CMS or editable copy locations for rapid A/B tests

---

## Finalization (Step 11)

### Deliverables
- Final PRD saved to `_bmad-output/planning-artifacts/prd.md` (this file).
- Actionable implementation checklist for the MVP marketing site: hero/CTA copy update, embedded form + privacy note, `/thank-you` page, GA4 integration, accessibility fixes, and performance fallbacks.

### Acceptance Criteria
- FRs and NFRs present in the PRD and approved by the author.
- Form submission and `/thank-you` flow instrumented and verifiable in GA4 with `preorder_submit` events.
- Lighthouse Performance >= 80 (desktop) and mobile fallback behavior validated; WCAG 2.1 AA checks for core flows pass.

### Owners & Roles
- Author / Product: Ashton (owner of this PRD)
- Frontend: TBD (implement hero, form, `/thank-you`, GA4)
- Design/UX: TBD (update hero visuals, ensure accessibility)
- Marketing Ops: TBD (GA4, campaigns, lead exports)

### Next Steps (Immediate)
1. Implement hero copy and `Preorder` CTA in `pages/index.js` and ensure it links/scrolls to the embedded form. (Frontend)
2. Add concise privacy note near the form and link to the site's Privacy Policy. (Design + Frontend)
3. Create `/thank-you` page and fire `preorder_submit` GA4 event on success. (Frontend + Marketing Ops)
4. Integrate GA4 snippet in `pages/_app.js` or tag manager and verify events. (Marketing Ops)
5. Run a focused Lighthouse & accessibility sweep and remediate major regressions. (Frontend)

### Timeline
- Target: 1–2 week sprint for the initial MVP release, dependent on resource availability.

### Artifacts & Links
- PRD: `_bmad-output/planning-artifacts/prd.md`
- Product brief: `_bmad-output/product-brief.md`
- Project context: `_bmad-output/project-context.md`

