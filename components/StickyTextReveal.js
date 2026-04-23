"use client";
import React from 'react'

export default function StickyTextReveal() {
  return (
    <div className="font-sans antialiased py-12 space-y-4" style={{ perspective: '1000px' }}>
      <div className="h-[10vh]"></div>

      <div className="reveal-block opacity-10 scale-75 transform transition-none" style={{ minHeight: '20vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', transformStyle: 'preserve-3d', fontFamily: 'Inter, sans-serif' }}>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#1d1d1f]" style={{fontSize: '3rem'}}>Stop losing sleep.</h2>
        <p className="mt-4 text-xl md:text-2xl font-medium text-[#86868b]"style={{fontSize: '1.5rem'}}>56% of parents lose sleep over their child driving. Because 2 in 3 young drivers lack basic car literacy, a dashboard warning can quickly turn into a crisis. We replace the anxiety of the unknown with absolute clarity.</p>
      </div>

      <div className="reveal-block opacity-10 scale-75 transform transition-none" style={{ minHeight: '20vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', transformStyle: 'preserve-3d', fontFamily: 'Inter, sans-serif' }}>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#1d1d1f]"style={{fontSize: '3rem'}}>Peace of mind for the road ahead</h2>
        <p className="mt-4 text-xl md:text-2xl font-medium text-[#86868b]"style={{fontSize: '1.5rem'}}>Designed for the parents of young drivers. Whether they are commuting or away from home, our app instantly notifies both parent and driver, translating confusing car data into plain English.</p>
      </div>

      <div className="reveal-block opacity-10 scale-75 transform transition-none" style={{ minHeight: '20vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', transformStyle: 'preserve-3d', fontFamily: 'Inter, sans-serif' }}>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#1d1d1f]"style={{fontSize: '3rem'}}>Plug In, Drive Easy</h2>
        <p className="mt-4 text-xl md:text-2xl font-medium text-[#86868b]"style={{fontSize: '1.5rem'}}>Universal integration. Just connect the always-plugged-in scanner under the dash. The app translates the raw car data instantly, so you don't have to.</p>
      </div>

      <div className="reveal-block opacity-10 scale-75 transform transition-none" style={{ minHeight: '20vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', transformStyle: 'preserve-3d', fontFamily: 'Inter, sans-serif' }}>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#1d1d1f]"style={{fontSize: '3rem'}}>Maintenance, Mastered.</h2>
        <p className="mt-4 text-xl md:text-2xl font-medium text-[#86868b]"style={{fontSize: '1.5rem'}}>Proactive car care made simple. Get clear, actionable steps, issue severity levels, and trusted mechanic recommendations. All powered by AI.</p>
      </div>

      <div className="h-[10vh]"></div>
    </div>
  )
}
