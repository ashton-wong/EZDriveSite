import React from 'react'

export default function BenefitCards({ cards = defaultCards }) {
  return (
    <section aria-labelledby="benefits-heading" className="py-8">
      <div className="max-w-5xl mx-auto px-4 grid gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <article key={i} className="bg-white rounded-lg p-6 shadow-sm" aria-labelledby={`benefit-${i}`}>
            <h3 id={`benefit-${i}`} className="text-lg font-semibold mb-2">{c.title}</h3>
            <p className="text-sm text-gray-700">{c.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

const defaultCards = [
  { title: 'Fast setup', description: 'Get started quickly with minimal configuration.' },
  { title: 'Privacy-first', description: 'We minimize data collection and protect PII.' },
  { title: 'Demo-ready', description: 'Interactive demos that load progressively.' }
]

