import React from 'react'
import { render, screen } from '@testing-library/react'
import FeatureBento from '../FeatureBento'

const sample = {
  heading: 'Test Heading',
  sub: 'Test sub',
  benefitCards: [
    { title: 'One', description: 'First' },
    { title: 'Two', description: 'Second' },
  ]
}

test('renders FeatureBento with heading and benefits from props', () => {
  render(<FeatureBento heading={sample.heading} sub={sample.sub} benefitCards={sample.benefitCards} />)
  expect(screen.getByText('Test Heading')).toBeInTheDocument()
  expect(screen.getByText('Test sub')).toBeInTheDocument()
  expect(screen.getByText('One')).toBeInTheDocument()
  expect(screen.getByText('Second')).toBeInTheDocument()
})
