import React from 'react'
import FeatureBento from '../components/FeatureBento'
import BenefitCards from '../components/BenefitCards'
import HowItWorks from '../components/HowItWorks'
import ThreeDCanvas from '../components/ThreeDCanvas'
import SpecsDark from '../components/SpecsDark'
import HeroPreorderForm from '../components/HeroPreorderForm'
import Hero from '../components/Hero'
import { useCallback } from 'react'
import { trackEvent } from '../lib/analytics'
import marketingCopy from '../content/marketing-copy.json'

export default function Home() {
  const { heroTitle, heroSubtitle, ctaText, benefitCards, bentoHeading, bentoSub } = marketingCopy

  const handlePreorder = useCallback((e) => {
    try {
      trackEvent('cta_click', { cta_id: 'hero-preorder' }, e)
    } catch (err) {
      // ignore analytics errors
    }
    if (typeof document === 'undefined') return
    const el = document.getElementById('preorder-form')
    if (el && 'scrollIntoView' in el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      const focusable = el.querySelector('input, button, textarea, [tabindex]')
      if (focusable && typeof focusable.focus === 'function') {
        focusable.focus()
      }
    }
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* Full-screen pinned storytelling (3D canvas drives the sequence) */}
      <ThreeDCanvas modelPath="../models/phone.glb" />
      <Hero heroTitle={heroTitle} heroSubtitle={heroSubtitle} ctaText={ctaText} onPreorder={handlePreorder} />
      <HeroPreorderForm />
      <FeatureBento heading={bentoHeading} sub={bentoSub} benefitCards={benefitCards} />
      <BenefitCards cards={benefitCards} />
      <HowItWorks />

    </main>
  )
}
