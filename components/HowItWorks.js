import React from 'react'

export default function HowItWorks({ steps = defaultSteps }) {
  return (
    <section aria-labelledby="how-heading" className="py-8 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 id="how-heading" className="text-xl font-bold mb-4">How it works</h2>
        <ol className="list-decimal list-inside space-y-3">
          {steps.map((s, i) => (
            <li key={i}>
              <h3 className="text-md font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-700">{s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const defaultSteps = [
  { title: 'Discover', description: 'Learn product capabilities through quick examples.' },
  { title: 'Try', description: 'Interact with the demo and customize inputs.' },
  { title: 'Preorder', description: 'Submit minimal info to reserve early access.' }
]
