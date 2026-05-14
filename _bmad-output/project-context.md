---
project_name: 'EZDriveSite'
user_name: 'Ashton'
date: '2026-05-13'
sections_completed: ['technology_stack','testing','ci_cd','accessibility','security']
existing_patterns_found: 6
communication_language: 'English'
document_output_language: 'English'
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- Next.js: ^16.2.4
- React: ^19.2.5
- three: ^0.184.0
- @react-three/fiber: ^9.6.0
- @react-three/drei: ^10.7.7
- gsap: ^3.15.0
- Tailwind CSS: ^4.2.4 (with PostCSS & Autoprefixer)
- Language: JavaScript (no TypeScript detected)

## Project Structure & Patterns

- Next.js pages folder at `pages/` for route-driven pages.
- Reusable UI components live in `components/` and use PascalCase filenames.
- Global styles in `styles/globals.css`; Tailwind utilities used across components.
- Static assets under `public/` and 3D models under `public/models/`.

## Critical Implementation Rules (short, actionable)

1. Respect Next.js conventions: add pages under `pages/`; use default exports for page components.
2. Keep language JavaScript-only: do not introduce TypeScript without explicit team approval.
3. File naming: use PascalCase for React components (e.g., `FeatureBento.js`).
4. Styling: prefer Tailwind utility classes and minimal custom CSS; update `globals.css` only when necessary.
5. 3D/graphics: use `@react-three/fiber` and follow existing component patterns for scene setup and resource cleanup.
6. Dependencies: do not add major build tools or change bundler configs without team consent; prefer adding libraries declared in `package.json` range.
7. Tests & linting: no test or linting frameworks detected—propose additions before implementing enforcement rules.
8. Error handling: prefer explicit async/await with try/catch in data-fetching code; keep server/client separation per Next.js patterns.
9. Commit and PR conventions: follow existing repository structure—ask before introducing branch or commit policies.
10. Backwards compatibility: avoid large refactors; implement incremental changes with clear PR descriptions.

---

## Notes & Next Steps

- This is an initial draft focused on technology and high-priority rules.
- To expand: add sections for Testing, CI/CD, Accessibility, and Security rules.
--

## Testing

- Current state: No test framework detected in the repository.
- Recommendations and rules for AI agents:
	- Propose adding a lightweight unit testing stack (Vitest or Jest) with `@testing-library/react` for React components.
	- Place test files alongside implementation using the `.test.js` suffix (e.g., `FeatureBento.test.js`).
	- For components that use `three` / `@react-three/fiber`, mock renderer internals or abstract 3D scene setup into small, testable units; prefer integration tests over brittle DOM snapshots for canvas-heavy components.
	- Use `jest-axe` or `axe-core` in unit tests for automated accessibility checks.
	- Set a pragmatic coverage target (e.g., 60–80%) and require tests for new features and bug fixes.

## CI/CD

- Observations: No CI configuration detected. The project uses Next.js (deploy-friendly to Vercel).
- Recommendations and rules:
	- Use GitHub Actions to run `npm ci`, `npm run build`, and the test suite on PRs.
	- Require passing build + tests before merging; enable preview deployments (Vercel or GitHub Pages for static assets) for PR review when possible.
	- Linting step is recommended before running tests; add ESLint/Prettier if team agrees.
	- Secrets must be stored in the CI provider's secrets store; never commit them to the repo.

## Accessibility (A11y)

- Requirements and rules:
	- Follow WCAG 2.1 AA where practical: semantic HTML, proper ARIA usage, focus management, and keyboard navigation.
	- Provide descriptive `alt` text for images and meaningful labels for interactive controls.
	- Ensure color contrast and visible focus outlines; prefer Tailwind utility classes that preserve accessible states.
	- Run automated accessibility checks in CI (axe, Lighthouse) and include failures as gating criteria for PRs touching UI.

## Security

- Rules and best practices:
	- Do not commit secrets or private keys. Use environment variables and CI secrets.
	- Avoid using `eval`, `new Function`, or untrusted HTML insertion. Sanitize user input before rendering.
	- Keep dependencies up-to-date; prefer minor/patch upgrades and open PRs for major upgrades with testing.
	- Enforce Content Security Policy (CSP) on server responses where applicable and avoid unsafe-inline scripts.
	- For any new network integrations, validate inputs and fail safely; prefer server-side fetches for sensitive operations.

---

## How AI Agents Should Use This Document

- Treat this as a checklist before creating code: verify stack alignment, follow file naming, follow styling choices, and run tests locally when adding features.
- Ask the team before introducing TypeScript, new build tools, or CI providers.

