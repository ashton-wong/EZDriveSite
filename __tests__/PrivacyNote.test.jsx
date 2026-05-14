import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import PrivacyNote from '../components/PrivacyNote'

jest.mock('../lib/analytics', () => ({
  trackEvent: jest.fn()
}))

import { trackEvent } from '../lib/analytics'

describe('PrivacyNote', () => {
  it('renders the privacy note and link to /privacy', () => {
    render(<PrivacyNote />)
    const link = screen.getByRole('link', { name: /Privacy Policy/i })
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href')).toBe('/privacy')
  })

  it('calls analytics on link click', () => {
    render(<PrivacyNote />)
    const link = screen.getByRole('link', { name: /Privacy Policy/i })
    fireEvent.click(link)
    expect(trackEvent).toHaveBeenCalledWith(expect.stringMatching(/privacy_link_click/), expect.any(Object), expect.any(Object))
  })
})
