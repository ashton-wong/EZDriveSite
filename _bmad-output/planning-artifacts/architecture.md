---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2026-05-13'
inputDocuments:
  - _bmad-output/product-brief.md
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/project-context.md
workflowType: 'architecture'
project_name: 'EZDriveSite'
user_name: 'Ashton'
date: '2026-05-13'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Initialization Summary

- Created from template: .agents/skills/bmad-create-architecture/architecture-decision-template.md
- Input documents loaded:
  - _bmad-output/product-brief.md
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/project-context.md

## Project Context Analysis

### Requirements Overview

Functional Requirements (high-level)
- Lead capture via embedded Google Form; `/thank-you` conversion or full-page confirmation.
- Prominent hero `Preorder` CTA that opens/scrolls to the form and supports A/B testing.
- Three benefit cards + how‑it‑works flow; demo translator widget with canned examples (deeper interactions gated by email).
- GA4 integration with `preorder_submit` conversion event; email export controls and minimal PII (email + optional name).
- Accessibility: keyboard accessible controls, ARIA labels; WCAG 2.1 AA target.
- Mobile fallbacks: lazy-load 3D assets, static image on constrained devices.

Non‑Functional Requirements (architectural drivers)
- Performance: FCP ≤ 1.8s on 3G; Lighthouse ≥ 80 (desktop) / ≥ 60 (mobile).
- Bundle budget: initial route ≤ ~250KB gzipped; defer heavy 3D JS.
- Security & Privacy: HTTPS, minimize PII, GA4 IP anonymization, no VIN/telemetry collection.
- Reliability & Observability: reliable form capture, logging for failures, GA4 verification.
- Maintainability: follow Next.js + Tailwind patterns; avoid TypeScript or major build changes without approval.

Scale & Complexity
- Project scope: single-page marketing site (MVP) — complexity: medium (marketing site low scope; ecosystem larger).
- Primary domain: web_app (Next.js).
- Key components to implement/consider: `pages/index.js`, `pages/thank-you.js`, `components/QuoteReveal.js`, `components/FeatureBento.js`, `components/PhoneChat.js`, `components/ThreeDCanvas.js`, GA4 snippet in `pages/_app.js`.

Technical Constraints & Dependencies
- Tech stack: Next.js (JS), Tailwind, three.js + @react-three/fiber; prefer Google Form embed for MVP.
- Do not introduce TypeScript, new bundlers, or major build tools without team agreement.
- No CI/tests currently — propose adding lightweight testing later.

Cross‑Cutting Concerns
- Performance vs 3D visuals tradeoff (must lazy-load, provide static fallbacks).
- Privacy-first analytics and strict PII minimization.
- Accessibility and keyboard/assistive support across interactive demo and forms.
- Analytics hooks and A/B flags for marketing experiments.

Assessment Summary
- Complexity level: Medium (MVP landing low effort; production ecosystem larger).
- Architectural focus: optimize for performance, privacy, and reliability while enabling quick marketing iterations.
- Suggested next architectural topics: form reliability strategy (embed vs server relay), GA4 event design, 3D asset loading strategy, and accessibility testing approach.

## Starter Template Evaluation

### Primary Technology Domain

Identified domain: Web application (Next.js) based on PRD and project context.

### Starter Options Considered

- `create-next-app` (official Next.js starter) — minimal, maintained, flexible; choose JavaScript template to match project rules.
- Next.js + Tailwind manual setup — good when integrating with existing patterns and Tailwind config present in repo.
- T3 / full-stack starters — powerful but TypeScript-first and introduce opinions; not recommended due to project rule: JavaScript-only unless approved.

### Selected Starter: `create-next-app` (JavaScript) + Tailwind CSS

Rationale:
- Aligns with existing repo (Next.js, Tailwind). Keeps implementation simple and low-risk for a marketing site.
- Avoids TypeScript and heavy full-stack starter opinions; minimal surface area for performance tuning and 3D fallbacks.
- Easy to incrementally add features (GA4, `/thank-you`, demo widget) and stays consistent with `project-context.md` rules.

Initialization Commands (interactive — choose JavaScript when prompted):

```bash
# create project (use current repo if bootstrapping new project)
npx create-next-app@latest my-ezdrive-site --use-npm

# from the project root, install Tailwind and peers (if not already present)
npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
```

Tailwind setup notes:
- Add Tailwind directives to `styles/globals.css` and configure `tailwind.config.js` per Next.js docs.
- Use the existing `postcss.config.js` and `tailwind.config.js` in the repo where possible to remain consistent.

Architectural Decisions Provided by Starter:

Language & Runtime: JavaScript (React, Next.js App Router or Pages depending on repo).

Styling Solution: Tailwind CSS (already present in repo); starter integrates easily.

Build Tooling: Next.js defaults (Turbopack/webpack depending on environment) with production optimizations.

Testing Framework: None by default — recommend adding Vitest and @testing-library/react later.

Code Organization: Next.js pages/components conventions; keep `components/` and `pages/` as in existing repo.

Development Experience: Fast refresh, built-in image optimization, and easy Vercel deployment.

### Decision: Data Architecture

Context: MVP marketing landing page; lead capture via Google Form initially; no persistent product data needed for MVP.

Decision:
- Chosen option: Start with Google Forms embed (No DB) for MVP to minimize infra and speed time-to-market.
- Rationale: Fast, zero-maintenance, aligns with privacy-first approach and `project-context.md` rules.
- Deferred: Implement `pages/api/signup.js` server-relay as a post-MVP migration path to gain server-side control, validations, and provider forwarding.

Implications:
- If migrating to server-relay or DB later, we'll need API auth, rate-limiting, storage policies, and GDPR considerations.
- For now, ensure clear privacy note near the form and documented export controls for lead lists.

### Decision: Authentication & Security

Decision:
- Chosen option: Option 1 (No user authentication for MVP). Rationale: marketing site does not require user accounts; keeps scope minimal and avoids unnecessary complexity.
- If server-relay is later implemented, protect it with server-side secrets (env vars), require provider credentials for forwarding, and add rate-limiting and logging.

Implications:
- Ensure hosting uses HTTPS and any server routes sanitize and validate inputs.
- Document security requirements for any future `pages/api/*` endpoints (auth via env vars, rate-limiting, logging, and minimal data retention policies).

### Decision: API & Communication

Decision:
- Chosen option: Option 1 — No custom API for MVP; continue using Google Form embed and static `/thank-you` for conversion tracking.
- Rationale: Minimizes operational burden and aligns with MVP goals and privacy-first constraints.
- Deferred: `pages/api/signup.js` server-relay as a later implementation to enable validation and provider forwarding.

Implications:
- No immediate server-side endpoints required; plan for documentation if/when server-relay is implemented (auth via env vars, rate-limiting, provider creds).
- Ensure `/thank-you` page exists and GA4 conversion uses that pageview, or add client-side event handling for form submission if redirect is not possible.

### Decision: Frontend Architecture

Decision:
- Chosen option: Option 1 — Minimal approach using local component state and props; no global state library for the MVP.
- Rationale: Single-page marketing site with limited interactivity; minimizes bundle size and complexity while meeting performance targets.

Implications:
- Keep components small and composable; prefer prop drilling or small context where necessary.
- If the demo widget grows, consider a lightweight state library (Zustand/Jotai) later.

Next: Infrastructure & Deployment decision category — options available below.

### Decision: Infrastructure & Deployment

Decision:
- Chosen option: Option 1 — Vercel / CDN-backed static hosting (recommended and accepted).
- Rationale: Matches existing deployment; repo is already connected to Vercel via GitHub which simplifies deployments, previews, and CDN performance.

Implications & Actions:
- Keep deployment on Vercel; use Vercel environment variables for any future server-relay secrets (if `pages/api/*` is added later).
- Ensure `/thank-you` page is present in the repo and that the Google Form is configured to redirect there (or use client-side submission detection) so GA4 can record conversions.
- Document monitoring and logging approach: rely on Vercel logs for serverless functions and set up GA4 for analytics and conversion verification.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Data Architecture: Use Google Forms embed for MVP; server-relay deferred.
- API Surface: No custom API for MVP; `/thank-you` page used for conversion tracking.

**Important Decisions (Shape Architecture):**
- Frontend Architecture: Local component state and simple composition; no global state library.
- Infrastructure: Vercel hosting with GitHub integration for previews and deployments.
- Security: No user auth for MVP; secure any future server-relay with env secrets and rate-limiting.

**Deferred Decisions (Post-MVP):**
- Implement `pages/api/signup.js` server-relay with provider forwarding and validation.
- Add structured lead storage (Postgres/Supabase) and data retention policies.
- Introduce lightweight state library if demo interaction complexity increases.

### Data Architecture

- Chosen: Google Forms embed for MVP to minimize infra and privacy exposure.
- Rationale: Fast, maintenance-free, aligns with privacy minimization and marketing goals.

### Authentication & Security

- Chosen: No authentication for MVP; rely on HTTPS and sanitize any server routes.
- Rationale: Marketing site doesn't require accounts; keep scope minimal.

### API & Communication Patterns

- Chosen: No custom API initially. Use static `/thank-you` or client-side detection for GA4 conversion events.
- Rationale: Keeps deployment simple; add server-relay later if server-side control required.

### Frontend Architecture

- Chosen: Minimal local state, component-first design, Tailwind for styling.
- Rationale: Single-page site with limited interactions — small bundle and predictable performance.

### Infrastructure & Deployment

- Chosen: Vercel (existing GitHub → Vercel connection). Use Vercel env variables for any future server secrets.
- Rationale: CDN-backed performance, previews, simple CI/CD integration.

### Decision Impact Analysis

Implementation Sequence:
1. Add `/thank-you` page and confirm Google Form redirects or client-side detection for conversion.
2. Add GA4 snippet to `pages/_app.js` and verify `preorder_submit` event on `/thank-you`.
3. Add privacy note near the embedded form and document export controls.
4. Optionally scaffold `pages/api/signup.js` (post-MVP) and document auth/rate-limiting requirements.

Cross-Component Dependencies:
- GA4 integration affects `pages/_app.js` and `/thank-you` page.
- Any server-relay will require Vercel env vars, provider credentials, and logging setup.

---

## Implementation Patterns & Consistency Rules

### Overview

This section defines concrete patterns to prevent conflicting implementation choices by multiple AI agents. It focuses on naming, structure, formats, communication, and process rules aligned with the project's JavaScript + Next.js + Tailwind conventions.

### Critical Conflict Points Identified

- Naming (components, files, API routes, JSON fields)
- Project structure (where components, pages, and utilities live)
- API and event formats (response wrappers, error shapes, event payloads)
- State and interaction patterns (loading, errors, demo gating)

### Naming Patterns

- Component Files: Use PascalCase for React components and file names (e.g., `FeatureBento.js`, `PhoneChat.js`).
- Non-component files: use kebab-case for page-level or utility files where appropriate (e.g., `thank-you.js`, `api-client.js`).
- JavaScript identifiers: use camelCase for variables and functions (e.g., `getUserData`, `preorderSubmit`).
- JSON / API fields: use camelCase for keys (e.g., `firstName`, `email`, `utmCampaign`).
- REST routes: plural resource names (e.g., `/leads`) if APIs are added later.

### Structure Patterns

- Components: place reusable UI in `components/` and organize by feature when there are more than 3 components for a feature (e.g., `components/Preorder/*`).
- Pages: use `pages/` for routes; keep single-page landing content in `pages/index.js` and static `/thank-you` in `pages/thank-you.js`.
- Utilities: shared helpers in `lib/` or `utils/` (pick one and use consistently); prefer `lib/` for API clients and `components/` for UI helpers.

### Format Patterns

- API Response Shape (when APIs added): standard wrapper `{ data: <payload>, error: null }` on success, and `{ data: null, error: { code: string, message: string } }` on failure.
- Date/Time: use ISO 8601 strings (UTC) for all timestamps in JSON.
- Error codes: use short kebab-case strings for machine-readable codes (e.g., `rate-limit-exceeded`).
- Field names: camelCase consistently (no snake_case) to match frontend JavaScript conventions.

### Communication Patterns

- GA4 / Analytics events: use a consistent event name `preorder_submit` and include non-PII params like `variant` and `utm_campaign`.
- Client events: use lowerCamelCase for event keys and ensure payloads contain only non-PII values when sent to analytics.

### Process Patterns

- Loading states: components should expose a boolean `isLoading` prop/state and show an accessible spinner with `aria-busy` set appropriately.
- Error handling: UI components surface user-friendly messages; log technical details to server logs only (if server-relay exists).
- Demo gating: deeper demo interactions require email capture — enforce gating at UI layer by checking `hasCapturedEmail` boolean.

### Enforcement Guidelines

All AI agents MUST:
- Follow file and component naming rules (PascalCase for components, kebab-case for pages/utilities where noted).
- Use camelCase for all JS identifiers and JSON keys.
- Use the API response wrapper above for any new server routes.
- Add accessibility attributes for interactive elements (ARIA labels, focus management) and ensure keyboard operability.

Verification:
- Include a small README section (`docs/implementation-patterns.md`) documenting these rules when committing major changes.
- Code reviews must check for naming and format conformance; CI can later include lightweight linters to enforce rules.

### Examples

Good example (component file): `components/PreorderForm.js` exports `PreorderForm` and uses camelCase props like `onSubmit` and `isLoading`.

Good example (API response):

```json
{ "data": { "id": "abc123", "email": "redacted@example.com" }, "error": null }
```

Anti-patterns to avoid:
- Mixing snake_case and camelCase in JSON keys.
- Creating components as `preorder-form.js` (use `PreorderForm.js`) or exporting unnamed defaults without clear component names.

---

## Project Structure & Boundaries

### Complete Project Directory Structure (concrete)

```
EZDriveSite/
├── README.md
├── package.json
├── next.config.js
├── postcss.config.js
├── tailwind.config.js
├── .env.local
├── .env.example
├── .gitignore
├── .github/
│   └── workflows/
│       └── ci.yml
├── pages/
│   ├── _app.js
│   ├── index.js
   ├── thank-you.js
│   └── api/
│       └── (optional) signup.js  # scaffolded post-MVP if chosen
├── components/
│   ├── FeatureBento.js
│   ├── QuoteReveal.js
│   ├── PhoneChat.js
│   ├── SpecsDark.js
│   ├── StickyTextReveal.js
│   ├── ThreeDCanvas.js
│   └── ui/                     # small shared UI primitives (Button, Input, Modal)
├── lib/                        # utilities and API clients
│   ├── analytics.js
│   ├── api-client.js            # if server-relay added later
│   └── formatters.js
├── public/
│   ├── images/
│   └── models/
├── styles/
│   └── globals.css
├── scripts/
│   └── resolve_config.py
├── _bmad-output/
│   └── planning-artifacts/
│       └── architecture.md
└── tests/                       # optional: add when introducing tests
  ├── components/
  └── e2e/
```

### Architectural Boundaries

- API Boundaries: for MVP there are no server endpoints required. Any future `/api/*` route (e.g., `/api/signup`) must validate inputs, authenticate via env secret, and forward to provider; keep server logic minimal and stateless.
- Component Boundaries: UI components live in `components/`; keep presentational primitives in `components/ui/` and feature groups in top-level component files to avoid deep nesting.
- Data Boundaries: Leads are captured via Google Forms (external) for MVP. If local capture is added, store minimal PII (email, name) with clear retention rules.

### Requirements → Structure Mapping

- FR-1 Lead Capture → `components/QuoteReveal.js` (embed form) + `pages/thank-you.js` (conversion landing)
- FR-3 Submit Flow → `pages/thank-you.js` + `lib/analytics.js` for GA4 `preorder_submit` event
- FR-6 Demo Widget → `components/ThreeDCanvas.js` (fallback to `public/images/` on mobile)

### Integration Points

- Analytics: `lib/analytics.js` used by `pages/_app.js` to fire pageview and `preorder_submit` events.
- Forms: Google Form embed in `components/QuoteReveal.js` redirects to `/thank-you` (or client-side detection triggers `preorder_submit`).
- 3D Assets: `public/models/` served as static assets; `ThreeDCanvas.js` lazy-loads heavy modules.

### File Organization Patterns

- Config files at repo root: `next.config.js`, `tailwind.config.js`, `postcss.config.js`.
- Environment variables in `.env.local` for local dev; `.env.example` for templates. Vercel env vars used in production.

### Development & Deployment

- Development: `npm run dev` serves the app locally; follow Next.js conventions for `pages/` and `components/`.
- Deployment: GitHub ↔ Vercel integration (already configured). Use Vercel preview deployments for PRs and production on main branch.

---

## Architecture Validation Results

### Coherence Validation

Decision Compatibility:
- Technology choices are compatible: Next.js + Tailwind + three.js are commonly used together and match `project-context.md` declarations. No contradictory tech choices found.
- Minor note: exact library versions were listed in `project-context.md` (Next.js ^16.2.4, React ^19.2.5, three ^0.184.0). Decisions did not lock versions in the decisions section — recommend recording versions for any new dependencies.

Pattern Consistency:
- Implementation patterns (naming, structure, API shapes) align with the chosen stack and component conventions in the repo. Naming rules are consistent with existing component files.

Structure Alignment:
- Project structure supports the architectural decisions: `pages/`, `components/`, `lib/`, and `public/models/` are present and map to requirements like `/thank-you`, GA4, and 3D fallbacks.

### Requirements Coverage Validation

Functional Requirements Coverage:
- Lead capture (FR-1) — covered via Google Form embed in `components/QuoteReveal.js` and `/thank-you` flow.
- Privacy notice (FR-2) — addressed in PRD; architecture requires a visible privacy note near the form (implementation pending).
- Submit flow (FR-3) — `/thank-you` page and GA4 event planned; ensure Google Form redirect or client-side detection is configured.
- Demo widget (FR-7) — `ThreeDCanvas.js` exists and patterns mandate lazy-load + fallback; confirm static fallback assets are created in `public/images/`.
- Analytics (FR-8) — GA4 integration planned in `lib/analytics.js` and `pages/_app.js`.

Non-Functional Requirements Coverage:
- Performance (NFR-1/NFR-2) — addressed by lazy-loading 3D, Tailwind usage, and bundle budget guidance; implementation must enforce budgets (CI checks or manual review).
- Accessibility (NFR-3) — patterns require ARIA and keyboard support; actual accessibility testing framework is not yet added (recommend adding `axe` checks in CI).
- Privacy & Security (NFR-4/NFR-5) — architecture minimizes PII; server-relay deferred and server-side protections documented.

### Implementation Readiness Validation

Decision Completeness:
- Most critical decisions are documented, but explicit versions for newly-introduced libraries in decisions are not recorded (project-context lists current versions). This is an Important Gap.
- Implementation patterns are sufficiently detailed for AI agents to begin work (naming, file locations, API shapes).

Structure Completeness:
- Project directory tree is explicit and maps FRs to files. Tests are optional and not yet implemented — mark as an Important Gap if automated tests are required before release.

Pattern Completeness:
- Naming, format, and process patterns are defined with examples. Enforcement steps (README entry, CI linting) are suggested but not yet created.

### Gap Analysis Results

Critical Gaps (blockers):
- None blocking immediate MVP implementation.

Important Gaps:
- Versions: Decisions section does not pin or reference the exact dependency versions; add explicit versions for new dependencies and any additions.
- Privacy Policy page: PRD requires a Privacy Policy prior to major promotion; the site should include `pages/privacy.js` (not currently present).
- Accessibility automation: no automated a11y checks configured in CI.
- GA4 configuration details: the architecture references GA4 but lacks the exact setup snippet/measurement ID (add `lib/analytics.js` template and env var guidance).

Nice-to-Have Gaps:
- CI linting rules and lightweight tests (Vitest/@testing-library) are recommended but deferred.
- `pages/api/signup.js` scaffold and documentation for migration off Google Forms.

### Validation Issues Addressed

- Action items created from gaps: add `pages/privacy.js`, record dependency versions in decisions, add `lib/analytics.js` template with env var placeholders, and add basic a11y checks to CI (recommend `jest-axe` or `axe-core` in CI).

### Architecture Completeness Checklist

**Requirements Analysis**

- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**Architectural Decisions**

- [ ] Critical decisions documented with versions
- [x] Technology stack fully specified (in project-context)
- [x] Integration patterns defined
- [x] Performance considerations addressed

**Implementation Patterns**

- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**Project Structure**

- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY WITH MINOR GAPS

**Confidence Level:** medium — most decisions and patterns are in place; a few important gaps should be filled before broad rollout (privacy page, versions, a11y CI).

**Key Strengths:**
- Clear, minimal architecture focused on MVP goals.
- Strong performance and privacy-first guidance.
- Concrete project structure and implementation patterns for consistent agent implementation.

**Areas for Future Enhancement:**
- Add Privacy Policy page and privacy guidance copy near the form.
- Pin or document exact dependency versions for newly added libraries.
- Add basic automated accessibility checks and lightweight tests in CI.

### Implementation Handoff

AI Agent Guidelines:
- Follow documented patterns exactly; prefer small, incremental changes.
- Add `docs/implementation-patterns.md` to record any pattern updates.

First Implementation Priority:
- Create `pages/thank-you.js`, add `lib/analytics.js` with GA4 env var placeholders, add privacy note to `components/QuoteReveal.js`, and verify Google Form redirect behavior.

---

## Completion & Handoff

Congratulations — the Architecture workflow is complete.

Summary of what we achieved together:
- Documented project context, requirements, and constraints.
- Selected starter, core architectural decisions, and deployment strategy.
- Defined implementation patterns, naming rules, and project structure.
- Validated coverage against functional and non-functional requirements.
- Produced a prioritized gap list and first-implementation action items.

Immediate handoff guidance (next actions for implementation):
- Implement first priority: create [pages/thank-you.js](pages/thank-you.js) and confirm Google Form redirect or client-side detection.
- Add [lib/analytics.js](lib/analytics.js) template and place GA4 measurement ID in Vercel env var `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- Add a short privacy note beside the embedded form in [components/QuoteReveal.js](components/QuoteReveal.js) and scaffold [pages/privacy.js](pages/privacy.js).
- Pin any new dependency versions in the decisions section and update `package.json` accordingly.

Operational checklist before promotion:
- Ensure `pages/privacy.js` exists and privacy copy is visible near the form.
- Verify GA4 events fire on `/thank-you` (or fire `preorder_submit` client-side after redirect).
- Add lightweight a11y checks in CI (recommend `axe-core`/`jest-axe`) and run a quick Lighthouse audit.



