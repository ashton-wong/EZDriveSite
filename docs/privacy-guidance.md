# Privacy Guidance (Marketing MVP)

This document provides recommended privacy copy and practical guidance for the marketing MVP. Replace any placeholder contact info and have legal review the final policy before public promotion.

## Short privacy note (for use beside the preorder form)

We recommend the following concise note adjacent to the preorder form:

"We only collect your email (and optional name) to send preorder updates. Read our Privacy Policy."

Link the phrase "Privacy Policy" to `/privacy`.

## Suggested privacy page sections

- What we collect (email, optional name)
- How we use it (preorder communications)
- Analytics (GA4 with IP anonymization; no PII in events)
- Data retention & export guidance
- Contact for privacy questions

## Analytics & Tracking

- Do not send emails, names, or other PII to analytics.
- Include non‑PII event parameters only (e.g., `variant`, `utm_campaign`).
- Configure GA4 with IP anonymization where supported.

## Lead export & retention guidance

- Exported lead lists must contain only `email` and `name`.
- Store exports in an access‑controlled location; document owners and retention period.
- Do not store raw IP addresses or device identifiers with leads.

## Prelaunch checklist items for privacy

1. Final legal-reviewed `pages/privacy.js` content is committed.
2. The preorder form area displays the short privacy note with a working link to `/privacy`.
3. `docs/lead-export.md` exists and documents export location and access controls.
4. Analytics events are reviewed to ensure no PII is sent.

## Contact

Replace `privacy@example.com` in `pages/privacy.js` with the legal contact before publishing.
