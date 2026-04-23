import React from 'react'
import FeatureBento from '../components/FeatureBento'
import ThreeDCanvas from '../components/ThreeDCanvas'
import SpecsDark from '../components/SpecsDark'
import QuoteReveal from '../components/QuoteReveal'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Full-screen pinned storytelling (3D canvas drives the sequence) */}
      <ThreeDCanvas modelPath="../models/phone.glb" />
        {/* full-viewport blank screen so user scrolls past the canvas first */}
        {/* <div className="min-h-screen bg-white" /> */}
        <QuoteReveal
          title={"Sign up for updates"}
          tagline={"Join our interest list for early access and updates."}
          formUrl={"https://docs.google.com/forms/d/e/1FAIpQLSfYGn4c0DuutVq_mhXF_xsIC-SSOhYY6RCDkIc9P_cpyvHR1Q/viewform?embedded=true"}
        />

    </main>
  )
}
