'use client'

import { ReactNode } from 'react'

interface ModalProps {
  onClose: () => void
  title: string
  icon: string
  color: string
  children: ReactNode
}

export default function Modal({ onClose, title, icon, color, children }: ModalProps) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0f0f14] border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col"
        style={{ boxShadow: `0 0 100px ${color}10` }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${color}15` }}
            >
              {icon}
            </div>
            <h2 className="text-2xl font-semibold">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  )
}
