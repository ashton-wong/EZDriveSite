# EZDrive — Website Product Brief (PRD Precursor)

Date: 2026-05-13
Author: Ashton
Intended recipient: John

---

## Purpose

This brief summarizes the website goals, audience, core messaging, success metrics, and immediate implementation tasks for the EZDrive preorder landing page. Deliverable is a single-page marketing site to explain the product and collect preorder interest via an embedded Google Form.

## Product Summary

EZDrive is an OBD‑II hardware device + connected mobile app that translates raw car diagnostics into actionable feedback and easy-to-understand alerts. The website is a marketing and lead capture tool to generate preorder interest from parents of young drivers.

## Audience

- Primary: Parents of young drivers (safety-conscious, value peace of mind)
- Secondary: Early adopter drivers interested in vehicle health and cost savings

## Goals & Target

- Primary goal: Capture preorder signups / interest list entries.
- Target: 50 preorder signups within 2 months of campaign start.

## Key Metrics

- Preorder signups (absolute count)
- Landing conversion rate (visitors → signups)
- Email capture cost per lead (CPL)
- Time on page and bounce rate (qualitative engagement)

## Primary Messaging

- Hero headline: "Plug in, Drive Easy"
- Supporting tagline: "Providing peace of mind to parents of young drivers"
- CTA label: "Preorder"

Tone & Positioning: Reassuring, family-first, safety-focused. Model tone after family safety apps (e.g., Life360) while keeping messaging distinctive to device + diagnostics value.

## Page Structure (single-page recommended)

1. Hero — Headline, one-line subtag, 3D device/phone visual, prominent `Preorder` CTA (Google Form embed). See: `pages/index.js` and `components/QuoteReveal.js` in repo.
2. Quick Benefits — three parent-focused benefits (Safety alerts, Simple diagnostics, Parental dashboard). Use `components/FeatureBento.js` as layout.
3. How It Works — 3-step flow (Plug device → App reads OBD → Actionable guidance & alerts).
4. Use Cases / Stories — short parent/teen micro-scenarios; use `components/PhoneChat.js` for visual storytelling.
5. Specs & Timeline — condensed technical specs and estimated preorder timeline; add FAQ and shipping expectations (`components/SpecsDark.js`).
6. Preorder Form — embedded Google Form in iframe (current implementation). Add privacy note nearby.
7. Footer — short privacy note and links (Privacy Policy, Contact).

## Implementation Decisions (MVP)

- Keep existing Google Form embed (fast, no backend). Current embed is set in `QuoteReveal` and used on the home page.
- Add minimal privacy reassurance copy adjacent to the form.
- Track conversions via GA4 and a `/thank-you` page that the Google Form can redirect to after submission (or use a visible post-submit message and treat it as a soft signal).

## Immediate Actionable Tasks (short task list)

1. Update hero copy & CTA
   - Change headline to "Plug in, Drive Easy" and CTA to `Preorder`.
   - Files: `pages/index.js`, `components/QuoteReveal.js`.

2. Add preorder privacy line
   - Add a short sentence below the embedded form: "We’ll only use your email to share product updates and preorder instructions. See our Privacy Policy."
   - File: `components/QuoteReveal.js`.

3. Add conversion tracking
   - Add GA4 snippet to `pages/_app.js` and create a static `/thank-you` page to record the conversion pageview.
   - Configure the Google Form to redirect to the `/thank-you` URL (or add instructions for manual conversion tracking if redirect not possible).

4. Content polish
   - Draft three benefit cards and short FAQ items; integrate into `FeatureBento.js` and `SpecsDark.js`.

5. Preorder timeline
   - Add a short timeline block in the Specs/FAQ area: preorder window, estimated ship date, and basic refund/cancellation policy.

6. (Optional, post-MVP) Migrate capture
   - Scaffold `pages/api/signup.js` to accept `POST` submissions and forward to an email provider (Mailchimp/SendGrid) or store in a secure database.

## Analytics & Tracking (practical steps)

- Add GA4 (or existing analytics) to `pages/_app.js`.
- Create `/thank-you` static page in Next.js and configure the Google Form to redirect there after submission. Record a successful pageview event as conversion in GA4.
- If redirect is not feasible, consider adding a visible on-page thank-you link and track clicks as a weaker conversion signal.

## Privacy & Compliance

- Show a short privacy note beside the form. Do not collect sensitive PII beyond email and optional first/last name.
- Because primary users are parents of young drivers, avoid collecting information about minors directly. Target communications at parents only.
- Add a proper Privacy Policy page before large-scale promotion.

## Assets

- Use the provided logo in `public/images/ezdrive-logo.png` for header and meta images.
- Use existing visuals and 3D models in `public/models/` and `components/ThreeDCanvas.js` for hero imagery.

## Timeline & Next Milestones

- Immediate (0–2 days): Update hero copy, add privacy note, create `/thank-you` page, deploy small copy changes.
- Short (1–2 weeks): Content polish (benefits, FAQ), GA4 setup and conversion testing, basic A/B copy test for CTA wording.
- Mid (pre-launch, 2–8 weeks): Marketing push to achieve target of 50 preorders; monitor metrics and iterate.

## Risks & Mitigations

- Risk: Google Form embed limits conversion tracking and user experience. Mitigation: plan migration to internal capture before paid marketing.
- Risk: No Privacy Policy / legal copy. Mitigation: draft a minimal Privacy Policy page before major marketing.

## Hand-off Notes for John

- This document is a PRD precursor for the website. Code locations and implementation notes are in the repo: `pages/index.js`, `components/QuoteReveal.js`, `components/FeatureBento.js`, `components/PhoneChat.js`, `components/SpecsDark.js`, `pages/_app.js`.
- John can act on immediate tasks (hero copy updates, privacy line, GA setup) or assign frontend work to implement them.