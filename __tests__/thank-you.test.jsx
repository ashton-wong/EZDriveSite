import React from 'react'
import { render, waitFor } from '@testing-library/react'
import ThankYou from '../pages/thank-you'

jest.mock('../lib/analytics', () => ({
  initAnalytics: jest.fn(),
  trackEvent: jest.fn(),
}))

import { initAnalytics, trackEvent } from '../lib/analytics'

beforeEach(() => {
  jest.clearAllMocks()
  delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
})

test('renders thank you message', () => {
  const { getByText } = render(<ThankYou />)
  expect(getByText(/Thank you/i)).toBeInTheDocument()
})

test('fires preorder_submit event on mount using lib/analytics', async () => {
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST'
  render(<ThankYou />)
  await waitFor(() => {
    expect(trackEvent).toHaveBeenCalledWith('preorder_submit', expect.any(Object))
  })
})
