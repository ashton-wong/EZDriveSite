import React from 'react'

export default function DemoPreview({ onUnlock }) {
  return (
    <div className="bg-slate-50 p-4 rounded-md shadow-sm">
      <div className="h-48 bg-gradient-to-br from-teal-50 to-white rounded-md flex items-center justify-center">
        <div className="text-slate-700">Canned demo preview (static)</div>
      </div>
      <div className="mt-3 flex gap-2 items-center justify-center">
        <button onClick={onUnlock} className="text-sm text-teal-600 underline">Unlock demo</button>
        <span className="text-sm text-slate-500">or continue browsing</span>
      </div>
    </div>
  )
}
