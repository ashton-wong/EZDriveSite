import React from 'react'

export default function Button({ children, onClick, type = 'button', className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-md bg-teal-700 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  )
}
