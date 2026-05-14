---
title: "3.2 Lazy-load 3D canvas and provide static fallbacks"
story_id: 3.2
story_key: 3-2-lazy-load-3d-canvas-and-provide-static-fallbacks
status: ready-for-dev
last_updated: 2026-05-14
epic: 3
---

## Summary

Improve page performance by lazy-loading the heavy 3D canvas (`ThreeDCanvas`) and showing static fallback images while loading or when WebGL is unavailable.

## Acceptance Criteria
- On page load, the static fallback image is shown immediately; `ThreeDCanvas` is dynamically imported only when in-view or on user interaction.
- When `ThreeDCanvas` finishes loading, it replaces the fallback without layout shift.
- If WebGL is unsupported, the static fallback remains and no errors are thrown.

## Developer Context
- Component: `components/ThreeDCanvas.js` exists; use Next.js dynamic import with SSR false.
- Static fallbacks: place optimized images in `public/images/` and reference them.

## Technical Requirements
- Use `next/dynamic` or client-only dynamic import to defer the component.
- Ensure proper sizing placeholders (CSS) to avoid CLS.

## Architecture Compliance
- Conform to existing patterns for code-splitting and performance.

## File Structure Requirements
- Modify `components/ThreeDCanvas.js` usage sites (e.g., pages/index.js) to load dynamically.

## Testing Requirements
- Manual test across desktop/mobile and simulate no-WebGL to verify fallback.

## Status
ready-for-dev
