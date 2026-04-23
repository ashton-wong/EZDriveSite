"use client";
import React from 'react'

export default function QuoteReveal({
  title = 'Join our interest list',
  tagline = 'Be the first to know about updates and early access.',
  formUrl = ''
}) {
  return (
    <section className="min-h-screen bg-white">
      <div className="w-full h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="flex items-center justify-center px-8 md:px-16">
            <div className="text-center md:text-left max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-[#1d1d1f]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '60px' }}>{title}</h1>
              <p className="mt-6 text-lg text-gray-600 text-[#86868b]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '30px' }}>{tagline}</p>
            </div>
            <div className="w-full h-full bg-gray-50 overflow-hidden">
              {formUrl ? (
                <iframe
                  src={formUrl}
                  title="Interest Form"
                  className="w-full h-full border-0"
                  style={{ minHeight: '100%' }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">No form URL provided. Pass `formUrl` prop to embed your Google Form.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
