import React from 'react'
import FeatureBento from '../components/FeatureBento'
import ThreeDCanvas from '../components/ThreeDCanvas'
import SpecsDark from '../components/SpecsDark'
import HeroPreorderForm from '../components/HeroPreorderForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Full-screen pinned storytelling (3D canvas drives the sequence) */}
      <ThreeDCanvas modelPath="../models/phone.glb" />
        {/* full-viewport blank screen so user scrolls past the canvas first */}
        {/* <div className="min-h-screen bg-white" /> */}
        <HeroPreorderForm />

    </main>
  )
}
