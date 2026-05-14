import React from 'react'
import Button from './ui/Button'

export default function Hero({ onPreorder }) {
  return (
    <section className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Keep teen drivers safer with EZDrive</h1>
        <p className="mt-4 text-slate-600">Simple OBD-II monitoring and parent alerts — preorder now to reserve a device.</p>
        <div className="mt-6">
          <Button onClick={onPreorder}>Preorder</Button>
        </div>
      </div>
    </section>
  )
}
