'use client'

import { useState } from 'react'

interface BentoTileProps {
  id: string
  title: string
  subtitle: string
  icon: string
  color: string
  size: 'large' | 'small'
  data?: {
    status?: 'active' | 'seed' | 'dormant'
    metrics?: Array<{
      label: string
      value: string | number
      change?: number
      trend?: 'up' | 'down' | 'flat'
    }>
    alerts?: string[]
  }
  onClick: () => void
}

export default function BentoTile({ 
  title, 
  subtitle, 
  icon, 
  color, 
  size,
  data,
  onClick 
}: BentoTileProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const status = data?.status || 'seed'
  const metrics = data?.metrics || []
  const hasAlerts = data?.alerts && data.alerts.length > 0

  // Size classes
  const sizeClasses = size === 'large' 
    ? 'md:col-span-1 lg:col-span-1 row-span-1' 
    : 'md:col-span-1 row-span-1'

  return (
    <div
      className={`
        relative group cursor-pointer overflow-hidden rounded-2xl
        bg-white/[0.02] border border-white/[0.06]
        hover:border-white/[0.12] hover:bg-white/[0.04]
        transition-all duration-300 ease-out
        ${sizeClasses}
      `}
      style={{
        boxShadow: isHovered ? `0 0 40px ${color}10` : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${color}15, transparent 60%)`
        }}
      />

      {/* Content */}
      <div className="relative h-full p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ backgroundColor: `${color}15` }}
            >
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-white/40 text-xs">{subtitle}</p>
            </div>
          </div>
          
          {/* Status Indicator */}
          <div className={`
            w-2 h-2 rounded-full
            ${status === 'active' ? 'bg-green-400 animate-pulse' : 
              status === 'seed' ? 'bg-yellow-400' : 'bg-gray-500'}
          `} />
        </div>

        {/* Metrics */}
        {metrics.length > 0 ? (
          <div className="flex-1 space-y-4">
            {metrics.slice(0, 3).map((metric, i) => (
              <div key={i} className="flex items-end justify-between">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider">{metric.label}</p>
                  <p className="text-2xl font-light">{metric.value}</p>
                </div>
                {metric.change !== undefined && (
                  <span className={`
                    text-xs px-2 py-1 rounded-full
                    ${metric.trend === 'up' ? 'bg-green-500/20 text-green-400' :
                      metric.trend === 'down' ? 'bg-red-500/20 text-red-400' :
                      'bg-white/10 text-white/60'}
                  `}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${color}10` }}
              >
                🌱
              </div>
              <p className="text-white/30 text-sm">Ready to plant seeds</p>
            </div>
          </div>
        )}

        {/* Alert Badge */}
        {hasAlerts && (
          <div className="absolute top-4 right-4 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-bold text-black">
            {data?.alerts?.length}
          </div>
        )}

        {/* Expand Hint */}
        <div className="mt-auto pt-4 flex items-center justify-between text-white/30 text-xs">
          <span>Click to expand</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>

      {/* Corner Accent */}
      <div 
        className="absolute bottom-0 right-0 w-32 h-32 opacity-20 group-hover:opacity-30 transition-opacity"
        style={{
          background: `radial-gradient(circle at 100% 100%, ${color}, transparent 70%)`
        }}
      />
    </div>
  )
}
