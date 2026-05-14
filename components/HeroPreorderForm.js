import React, { useState } from 'react'
import { useRouter } from 'next/router'

export default function HeroPreorderForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function validateEmail(value) {
    return /\S+@\S+\.\S+/.test(value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email.trim()) {
      setError('Email is required')
      return
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || 'Submission failed')
      }

      try {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'preorder_submit', { method: 'inline_form' })
        }
      } catch (e) {
        // analytics best-effort
      }

      router.push('/thank-you')
    } catch (e) {
      setError(e.message || 'Submission failed')
      setSubmitting(false)
    }
  }

  return (
    <section className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Preorder — join the interest list</h2>
        <p className="mt-2 text-slate-600">Enter your email to reserve early access and updates.</p>

        <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto">
          <label className="sr-only" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="you@example.com"
            aria-required="true"
          />

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

          <div className="mt-4">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center px-5 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-60"
            >
              {submitting ? 'Submitting...' : 'Preorder'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
