---
title: "3.4 Accessibility & performance tuning for demo"
story_id: 3.4
story_key: 3-4-accessibility-performance-tuning-for-demo
status: ready-for-dev
last_updated: 2026-05-14
epic: 3
---

## Summary

Improve accessibility and performance for the demo experience (ARIA, keyboard navigation, image sizes, lazy-loading behavior).

## Acceptance Criteria
- Demo controls are reachable via keyboard and have ARIA labels.
- Performance improvements (lazy-loading, optimized assets) decrease initial page load metrics.

## Developer Context
- Coordinate with lazy-load (3-2) and assets (3-3a/3-3b) work.

## Technical Requirements
- Add ARIA attributes and keyboard handlers where needed; ensure fallbacks are accessible.

## Testing Requirements
- Manual accessibility check with keyboard navigation and Lighthouse/perf spot checks.

## Status
ready-for-dev
