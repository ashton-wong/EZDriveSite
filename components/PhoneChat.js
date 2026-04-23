import React, { useEffect, useState } from 'react'

const messages = [
  { id: 1, sender: 'Teen', text: "I'm stranded on the side of the road" },
  { id: 2, sender: 'Teen', text: "I don't know what to do, help." },
  { id: 3, sender: 'Parent', text: "I'm too far away and can't see what's wrong." }
]

export default function PhoneChat() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setActive(prev => (prev + 1) % messages.length)
    }, 1800)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-[320px] h-[650px] bg-gray-900 border border-gray-700 rounded-[3rem] shadow-xl overflow-hidden">
        {/* Status Bar */}
        <div className="flex items-center justify-between text-xs text-white pt-3 px-4">
          <div>9:41</div>
          <div className="flex items-center gap-3 text-xs">
            <div>Verizon</div>
            <div>100%</div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex flex-col gap-3 p-4 h-[520px] overflow-auto">
          <div className="flex-1" /> {/* spacer to mimic bottom-aligned chat */}
          <div className="flex flex-col gap-3 p-0">
            {messages.map((m, i) => {
              const isParent = m.sender === 'Parent'
              const isActive = i === active
              return (
                <div
                  key={m.id}
                  className={`max-w-[75%] ${isParent ? 'self-end' : 'self-start'} transform transition-all duration-300 ${isActive ? 'scale-100 opacity-100' : 'opacity-80'}`}
                >
                  <div className={`text-[10px] mb-1 ${isParent ? 'text-gray-300 text-right' : 'text-gray-300 text-left'}`}>{m.sender}</div>
                  <div
                    className={`px-4 py-3 break-words rounded-2xl ${isParent ? 'bg-blue-500 text-white rounded-br-sm' : 'bg-gray-700 text-white rounded-bl-sm'}`}
                  >
                    {m.text}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer / Typing area */}
        <div className="h-16 flex items-center px-4 border-t border-gray-800">
          <div className="rounded-full bg-gray-800 text-gray-400 pl-4 py-2 w-full">iMessage</div>
        </div>
      </div>
    </div>
  )
}
