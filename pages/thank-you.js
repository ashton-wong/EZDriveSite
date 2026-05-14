import Link from 'next/link'
import { useEffect } from 'react'

export default function ThankYou() {
  useEffect(() => {
    try {
      if (window && window.gtag) {
        window.gtag('event', 'preorder_submit', { method: 'google_form' })
      }
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
