"use client";
import React from 'react'

export default function QuoteReveal({
  title = 'Join our interest list',
  tagline = 'Be the first to know about updates and early access.',
  formUrl = ''
}) {
  return (
    <section className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-4xl px-6">
        <div className="flex flex-col items-center text-center gap-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-[#1d1d1f]" style={{ fontFamily: 'Inter, sans-serif' }}>{title}</h1>
          <p className="text-lg text-gray-600 text-[#86868b]" style={{ fontFamily: 'Inter, sans-serif' }}>{tagline}</p>

          <div className="w-full max-w-3xl h-[70vh] bg-gray-50 rounded shadow overflow-hidden">
            {formUrl ? (
              <iframe
                src={formUrl}
                title="Interest Form"
                className="w-full h-full border-0"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">No form URL provided. Pass `formUrl` prop to embed your Google Form.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
