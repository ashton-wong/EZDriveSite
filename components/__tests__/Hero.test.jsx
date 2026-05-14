import React from 'react'
import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

test('renders hero with supplied marketing copy', () => {
  render(<Hero heroTitle="Test Title" heroSubtitle="Test subtitle" ctaText="Join" />)
  expect(screen.getByText('Test Title')).toBeInTheDocument()
  expect(screen.getByText('Test subtitle')).toBeInTheDocument()
  expect(screen.getByText('Join')).toBeInTheDocument()
})
