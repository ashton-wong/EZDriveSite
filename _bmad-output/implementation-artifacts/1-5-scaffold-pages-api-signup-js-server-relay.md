**Story Header**
- **Story ID:** 1.5
- **Story Key:** 1-5-scaffold-pages-api-signup-js-server-relay
- **Title:** Scaffold `pages/api/signup.js` server-relay (post-MVP scaffold)
- **Status:** ready-for-dev
- **Owner:** Ashton
- **Created:** 2026-05-14

**Story Requirements**
- **User Story:** As a developer, I want a scaffolded server endpoint to accept form submissions and forward to marketing systems so we can migrate off Google Forms post-MVP.
- **Business Value:** Enables server-side validation, secure forwarding, and better control over lead exports while preserving privacy constraints.
- **Acceptance Criteria (BDD):**
  - Given a POST to `/api/signup` with `{ email, name }`, when inputs are valid, then the endpoint responds `200` with `{ data: null, error: null }`.
  - Given invalid input, when `email` is missing or malformed, then the endpoint returns `400` with a standardized error shape and does not forward the data.
  - Given rate limiting is triggered, when too many requests come from a single origin, then the endpoint returns `429` and logs the event.

**Developer Context**
- **Scaffold only:** Implement a minimal scaffold with validation, env-configured provider forwarding placeholder, and clear TODOs for auth/rate-limiting provider integration.
- **Security:** Read provider credentials from env vars (e.g., `SIGNUP_PROVIDER_API_KEY`); do not commit secrets. Add comments explaining production hardening (auth, rate-limiting, logging, retries).

**Technical Requirements & Guardrails**
- Create `pages/api/signup.js` that:
  - Accepts only POST requests with JSON body `{ email, name? }`.
  - Validates email format and required fields server-side.
  - Returns JSON in the shape `{ data: <payload|null>, error: <object|null> }`.
  - Reads provider credentials from env vars; if missing, logs a non-sensitive warning and returns `501` or forwards to a safe no-op path.
  - Includes rate-limiting comments and a simple in-memory counter example (for scaffold only) with TODO to replace with production middleware.
- Add inline comments on privacy: do not log PII in server logs; redact email if logging is necessary.

**Testing & QA**
- Unit tests: small tests for validation logic (accept valid email, reject invalid), and endpoint responses for success and validation errors.
- Manual QA: run `curl -X POST /api/signup -d '{"email":"x@example.com"}'` locally and verify expected JSON response and no PII in logs.

**File Changes Suggested**
- `pages/api/signup.js` — new API route scaffold
- `docs/lead-export.md` — cross-reference for privacy and export guidance

**Next Steps**
1. Implement scaffold and add to repo as a minimal feature-flagged endpoint (disabled by default via env var).
2. Replace scaffold later with secure provider integration and rate-limiting middleware.