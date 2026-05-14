---
title: "3.3c Assets documentation and regeneration"
story_id: 3.3
story_key: 3-3c-assets-documentation-and-regeneration
status: ready-for-dev
last_updated: 2026-05-14
epic: 3
---

## Summary

Document the asset pipeline (how models and fallbacks are produced) and provide scripts or notes for regenerating optimized assets.

## Acceptance Criteria
- `docs/` or `implementation` contains a short guide describing source files, export steps, and recommended tools.
- Any simple scripts used to optimize assets are included or referenced.

## Developer Context
- Helpful for future asset updates and for handoff to designers/3D artists.

## Technical Requirements
- Add a small README in `public/models/` or `docs/` describing naming, sizes, and regeneration steps.

## Testing Requirements
- Verify the documented steps reproduce at least one sample optimized asset (manual run).

## Status
ready-for-dev
