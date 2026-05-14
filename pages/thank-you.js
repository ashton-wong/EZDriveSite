import React, { useEffect } from 'react'
import Link from 'next/link'
import { initAnalytics, trackEvent } from '../lib/analytics'

export default function ThankYou() {
  useEffect(() => {
    initAnalytics()
    try {
      if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return
      const params = {}
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)
        const utm = url.searchParams.get('utm_campaign')
        const variant = url.searchParams.get('variant')
        if (utm) params.utm_campaign = utm
        if (variant) params.variant = variant
      }
      trackEvent('preorder_submit', params)
    } catch (e) {
      // silent
    }
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Thank you — you're on the list</h1>
        <p className="mt-4 text-slate-600">We've received your preorder interest. Check your email for timeline and next steps.</p>
        <div className="mt-6">
          <Link href="/">
            <a className="text-teal-600 underline">Return to home</a>
          </Link>
        </div>
      </div>
    </main>
  )
}
