'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BentoTile from './components/BentoTile'
import HealthModal from './components/modals/HealthModal'
import FinanceModal from './components/modals/FinanceModal'
import BusinessModal from './components/modals/BusinessModal'
import SystemModal from './components/modals/SystemModal'

interface Snapshot {
  generatedAt: string
  domains: {
    health: DomainData
    finance: DomainData
    business: DomainData
    system: DomainData
  }
  summary: {
    score: number
    status: 'healthy' | 'degraded' | 'critical'
    alerts: number
  }
}

interface DomainData {
  status: 'active' | 'seed' | 'dormant'
  metrics: Metric[]
  alerts?: string[]
  lastUpdate?: string
}

interface Metric {
  label: string
  value: string | number
  change?: number
  trend?: 'up' | 'down' | 'flat'
}

export default function BentoDashboard() {
  const router = useRouter()
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeModal, setActiveModal] = useState<string | null>(null)

  useEffect(() => {
    fetchSnapshot()
    const interval = setInterval(fetchSnapshot, 60000)
    return () => clearInterval(interval)
  }, [])

  async function fetchSnapshot() {
    try {
      const res = await fetch('/api/snapshot')
      const data = await res.json()
      setSnapshot(data)
    } catch (e) {
      console.error('Failed to fetch snapshot')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white/40 text-sm tracking-wider">LOADING</p>
        </div>
      </div>
    )
  }

  const { domains, summary } = snapshot || { 
    domains: {}, 
    summary: { score: 0, status: 'healthy', alerts: 0 } 
  }

  const tiles = [
    {
      id: 'health',
      title: 'Health',
      subtitle: 'Fitness & Nutrition',
      icon: '💪',
      color: '#22c55e',
      size: 'large',
      data: domains.health
    },
    {
      id: 'finance',
      title: 'Finance',
      subtitle: 'Investing & Trading',
      icon: '💰',
      color: '#a855f7',
      size: 'large',
      data: domains.finance
    },
    {
      id: 'business',
      title: 'Business',
      subtitle: 'Sales, Marketing & Ops',
      icon: '🚀',
      color: '#3b82f6',
      size: 'large',
      data: domains.business
    },
    {
      id: 'system',
      title: 'System',
      subtitle: 'Infrastructure & Automation',
      icon: '⚙️',
      color: '#6b7280',
      size: 'small',
      data: domains.system
    }
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-12">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-light tracking-tight mb-2">
              Life<span className="font-semibold">OS</span>
            </h1>
            <p className="text-white/40 text-sm">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-3xl font-light">{summary.score}</div>
              <div className="text-white/40 text-xs uppercase tracking-wider">Health Score</div>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              summary.status === 'healthy' ? 'bg-green-500/20 text-green-400' :
              summary.status === 'degraded' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {summary.status === 'healthy' ? '✓' : summary.status === 'degraded' ? '!' : '✕'}
            </div>
          </div>
        </div>

        {summary.alerts > 0 && (
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center gap-3">
            <span className="text-yellow-400">⚠️</span>
            <span className="text-yellow-200/80 text-sm">
              {summary.alerts} alert{summary.alerts > 1 ? 's' : ''} require attention
            </span>
          </div>
        )}
      </header>

      {/* Bento Grid */}
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {tiles.map(tile => (
            <BentoTile
              key={tile.id}
              {...tile}
              onClick={() => setActiveModal(tile.id)}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center">
        <p className="text-white/20 text-xs">
          OpenClaw LifeOS v2.0 • Self-hosted • You own your data
        </p>
      </footer>

      {/* Modals */}
      {activeModal === 'health' && (
        <HealthModal onClose={() => setActiveModal(null)} data={domains.health} />
      )}
      {activeModal === 'finance' && (
        <FinanceModal onClose={() => setActiveModal(null)} data={domains.finance} />
      )}
      {activeModal === 'business' && (
        <BusinessModal onClose={() => setActiveModal(null)} data={domains.business} />
      )}
      {activeModal === 'system' && (
        <SystemModal onClose={() => setActiveModal(null)} data={domains.system} />
      )}
    </div>
  )
}
