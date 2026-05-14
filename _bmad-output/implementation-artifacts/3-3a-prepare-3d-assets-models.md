---
title: "3.3a Prepare 3D assets / models"
story_id: 3.3
story_key: 3-3a-prepare-3d-assets-models
status: ready-for-dev
last_updated: 2026-05-14
epic: 3
---

## Summary

Prepare optimized 3D assets (models, LODs, compressed formats) and place them under `public/models` so the 3D demo uses performant assets.

## Acceptance Criteria
- Models are exported in compressed/GLB format and present under `public/models/` with sensible naming and metadata.
- File sizes remain within project performance targets (documented with file sizes).

## Developer Context
- Coordinate with `ThreeDCanvas` loader expectations (file names and paths).

## Technical Requirements
- Provide at least one Web-optimized format (GLB) and a small LOD variant.

## Testing Requirements
- Manual load check in dev server verifying models load and are rendered by `ThreeDCanvas`.

## Status
ready-for-dev
