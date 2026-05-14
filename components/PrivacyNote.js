import React from 'react'
import { trackEvent } from '../lib/analytics'

export default function PrivacyNote({ id = 'privacy-note' }) {
  function handleClick(e) {
    try {
      trackEvent('privacy_link_click', { utm_campaign: 'hero_preorder' }, e)
    } catch (err) {
      // best-effort analytics
    }
  }

  return (
    <div id={id} className="mt-4 text-sm text-slate-600" aria-live="polite">
      <p>
        We only collect your email (and optional name) for preorder communications.{' '}
        <a
          href="/privacy"
          onClick={handleClick}
          className="text-teal-600 hover:underline focus:outline-teal-400"
          aria-label="Privacy Policy"
        >
          Privacy Policy
        </a>
      </p>
    </div>
  )
}
