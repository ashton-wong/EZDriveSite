// Minimal analytics helper (privacy-first, no PII)
export function initAnalytics() {
  // Placeholder: initialize GA4 when NEXT_PUBLIC_GA_MEASUREMENT_ID is present
  if (typeof window === 'undefined') return
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return
  // No-op for now; integration may add gtag script in _app.js
}

function extractVariantFromElement(element) {
  try {
    if (!element && typeof document !== 'undefined') {
      const docEl = document.querySelector('[data-ab-variant]')
      return docEl ? docEl.getAttribute('data-ab-variant') : undefined
    }
    // If passed an Event, try event.target
    const el = (element && element.target) ? element.target : element
    if (!el) return undefined
    if (el.closest) {
      const root = el.closest('[data-ab-variant]')
      if (root) return root.getAttribute('data-ab-variant')
    }
    // Direct attribute on element
    return el.getAttribute ? el.getAttribute('data-ab-variant') : undefined
  } catch (e) {
    return undefined
  }
}

export function trackEvent(name, params = {}, element = null) {
  // Ensure we do not send PII. Add variant param from DOM attributes if available.
  const variant = params.variant || extractVariantFromElement(element)
  const safeParams = { ...params }
  if (variant) safeParams.variant = variant

  // If GA is available, call gtag. Otherwise no-op but log for local debugging.
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', name, safeParams)
    } catch (e) {
      // swallow errors to avoid breaking UI
      // eslint-disable-next-line no-console
      console.debug('gtag error', e)
    }
  } else {
    // Debugging-friendly no-op: do not expose PII
    // eslint-disable-next-line no-console
    if (process.env.NODE_ENV !== 'production') console.debug('trackEvent', name, safeParams)
  }
}

export default { initAnalytics, trackEvent }
