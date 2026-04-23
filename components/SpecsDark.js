"use client";
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SpecsDark() {
  const ref = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from('.specs-heading', { opacity: 0, y: 40, duration: 1, ease: 'power3.out' })

      gsap.from('.spec-row', {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%'
        },
        opacity: 0,
        x: -30,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out'
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-48 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="specs-heading text-5xl md:text-8xl font-semibold tracking-tighter">Technical Specifications</h2>
        <p className="mt-6 text-lg text-[#86868b] max-w-2xl">Everything you need to know — engineered for professionals and everyday users alike.</p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="spec-row flex justify-between items-center bg-[#1d1d1f] rounded-[2rem] p-6">
              <span className="text-[#86868b]">Chip</span>
              <span className="font-medium">A16 Pro — 6‑core CPU</span>
            </div>

            <div className="spec-row flex justify-between items-center bg-[#1d1d1f] rounded-[2rem] p-6">
              <span className="text-[#86868b]">Display</span>
              <span className="font-medium">6.7‑inch Super Retina XDR</span>
            </div>

            <div className="spec-row flex justify-between items-center bg-[#1d1d1f] rounded-[2rem] p-6">
              <span className="text-[#86868b]">Battery</span>
              <span className="font-medium">Up to 30 hours video playback</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="spec-row flex justify-between items-center bg-[#1d1d1f] rounded-[2rem] p-6">
              <span className="text-[#86868b]">Camera</span>
              <span className="font-medium">48MP Main, Ultra Wide, Telephoto</span>
            </div>

            <div className="spec-row flex justify-between items-center bg-[#1d1d1f] rounded-[2rem] p-6">
              <span className="text-[#86868b]">Storage</span>
              <span className="font-medium">128GB / 256GB / 512GB / 1TB</span>
            </div>

            <div className="spec-row flex justify-between items-center bg-[#1d1d1f] rounded-[2rem] p-6">
              <span className="text-[#86868b]">Connectivity</span>
              <span className="font-medium">5G, Wi‑Fi 6E, Bluetooth 5.3</span>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a className="inline-block bg-white text-black font-semibold px-8 py-3 rounded-3xl" href="#">Learn more</a>
        </div>
      </div>
    </section>
  )
}
