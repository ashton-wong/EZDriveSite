import React from 'react'
import { render, screen } from '@testing-library/react'
import BenefitCards from '../components/BenefitCards'

describe('BenefitCards', () => {
  test('renders three benefit card headings and descriptions', () => {
    render(<BenefitCards />)

    // Expectation per story: three benefit cards render with headings and descriptions
    const cards = screen.getAllByRole('article')
    expect(cards.length).toBe(3)
    const headings = screen.getAllByRole('heading')
    expect(headings.some(h => /Fast setup|Privacy-first|Demo-ready/i.test(h.textContent))).toBe(true)
  })
})
