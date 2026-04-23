"use client";
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function FeatureBento() {
  const ref = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from('.bento-heading', { opacity: 0, y: 50, duration: 1, ease: 'power3.out' })
      gsap.from('.bento-sub', { opacity: 0, y: 30, duration: 1, delay: 0.15, ease: 'power3.out' })

      gsap.fromTo('.feature-img', { scale: 1.1 }, {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%'
        },
        scale: 1,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power3.out'
      })

      gsap.from('.feature-item', {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%'
        },
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out'
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-32 bg-white text-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="bento-heading text-5xl md:text-8xl font-semibold tracking-tighter">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-500">Unprecedented power.</span>
          <span className="block md:inline"> Remarkable design.</span>
        </h2>
        <p className="bento-sub mt-6 text-lg text-[#86868b] max-w-2xl">Engineered to go further and do more — every detail tuned to make a difference.</p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="feature-item md:col-span-7 rounded-3xl overflow-hidden bg-[#f5f5f7]">
            <div className="h-72 md:h-[520px] w-full">
              <img src="/images/apple-iphone-17-group-001-68cacd4eb0920.jpg" alt="Pro camera" className="feature-img w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <h3 className="mt-2 text-3xl md:text-4xl font-semibold">Pro camera system</h3>
              <p className="mt-3 text-[#86868b]">Capture cinematic photos and video with computational photography tuned for professional results.</p>
            </div>
          </div>

          <div className="md:col-span-5 grid grid-cols-1 gap-8">
            <div className="feature-item rounded-3xl overflow-hidden bg-[#f5f5f7] h-40 md:h-56">
              <img src="/images/BG-IPHONE-5334-2X1.webp" alt="Unprecedented power" className="feature-img w-full h-full object-cover" />
              <div className="p-6">
                <h4 className="text-2xl font-semibold">Unprecedented power</h4>
                <p className="mt-2 text-[#86868b]">A breakthrough chip delivers performance and efficiency that redefines what a phone can do.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="feature-item rounded-3xl overflow-hidden bg-[#f5f5f7] h-40">
                <img src="/images/tm-logo.png" alt="Battery life" className="feature-img w-full h-full object-cover" />
                <div className="p-6">
                  <h4 className="text-xl font-semibold">All‑day battery</h4>
                  <p className="mt-2 text-[#86868b]">Optimized hardware and software deliver more hours of creative and productive time.</p>
                </div>
              </div>

              <div className="feature-item rounded-3xl overflow-hidden bg-[#f5f5f7] h-40">
                <img src="/images/Apple_Keynote-Event_Tim-Cook_091019_big.jpg.large.jpg" alt="Crafted design" className="feature-img w-full h-full object-cover" />
                <div className="p-6">
                  <h4 className="text-xl font-semibold">Designed to make a difference</h4>
                  <p className="mt-2 text-[#86868b]">A premium, durable body with an environmentally conscious build — beautiful inside and out.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
