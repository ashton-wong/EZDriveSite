---
title: "3.1 Implement canned translator demo widget"
story_id: 3.1
story_key: 3-1-implement-canned-translator-demo-widget
status: ready-for-dev
last_updated: 2026-05-14
epic: 3
---

## Summary

As a visitor, I want a small, self-contained canned translator demo widget so that I can try translation features quickly without leaving the demo page.

## Acceptance Criteria
- Given the demo page, when the widget loads, then a canned translator UI appears with sample input and language selector.
- Given the user selects a sample and triggers translate, then a canned (mock) translation result is displayed within the widget.
- The widget must be usable without network access (mocked responses) for demo fallback.

## Developer Context
- Relevant components: components/DemoPreview.js, components/ThreeDCanvas.js
- Keep UI styles consistent with existing site CSS (styles/globals.css).

## Technical Requirements
- Implement as a small React component under `components/` or `ui/` and export default so it can be imported into the demo page.
- No new backend endpoints required; use canned/mock responses stored in a JS module under `public/models` or inline for the demo.
- Accessibility: keyboard focusable controls, proper labels.

## Architecture Compliance
- Follow existing client-side patterns (functional React components, props-based configuration).
- Avoid introducing new runtime dependencies.

## File Structure Requirements
- Implementation suggestion: `components/CannedTranslatorDemo.js`.

## Testing Requirements
- Manual smoke test: render on demo page and verify canned translations and accessibility.

## Status
ready-for-dev — Ultimate context engine analysis completed.
