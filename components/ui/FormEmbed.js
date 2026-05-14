import React from 'react'

export default function FormEmbed({ src, title = 'Preorder Form', className = '' }) {
  if (!src) {
    return <div className="text-sm text-red-600">No form source provided.</div>
  }

  return (
    <div className={`w-full ${className}`}>
      <iframe
        title={title}
        src={src}
        className="w-full min-h-[600px] border-0"
        aria-label={title}
      />
    </div>
  )
}
