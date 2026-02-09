'use client'

import { useState, useEffect } from 'react'
import DomainCard from './components/DomainCard'
import AlertBanner from './components/AlertBanner'
import SnapshotHeader from './components/SnapshotHeader'

interface Snapshot {
  generatedAt: string
  domains: {
    sales: any
    health: any
    finance: any
    content: any
    productivity: any
    system: any
  }
  alerts: Alert[]
  summary: {
    score: number
    topPriority: string
    status: 'healthy' | 'degraded' | 'critical'
  }
}

interface Alert {
  id: string
  message: string
  severity: 'info' | 'warning' | 'critical'
  domain: string
}

export default function Dashboard() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSnapshot()
    const interval = setInterval(fetchSnapshot, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  async function fetchSnapshot() {
    try {
      const res = await fetch('/api/snapshot')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setSnapshot(data)
      setError(null)
    } catch (e) {
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Life Console...</p>
        </div>
      </div>
    )
  }

  if (error || !snapshot) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-red-400">
          <p className="text-xl mb-2">⚠️ {error || 'Unknown error'}</p>
          <button 
            onClick={fetchSnapshot}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const { domains, alerts, summary } = snapshot

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <SnapshotHeader 
        score={summary.score}
        status={summary.status}
        topPriority={summary.topPriority}
        generatedAt={snapshot.generatedAt}
      />

      {/* Alerts */}
      {alerts.length > 0 && (
        <section className="mb-6">
          {alerts.map(alert => (
            <AlertBanner key={alert.id} alert={alert} />
          ))}
        </section>
      )}

      {/* Domain Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <DomainCard
          domain="sales"
          title="💼 Sales & Revenue"
          data={domains.sales}
          metrics={[
            { label: 'MRR', value: `$${domains.sales?.mrr?.current || 0}`, target: `$${domains.sales?.mrr?.target || 0}` },
            { label: 'Pipeline', value: `$${domains.sales?.pipeline?.totalValue || 0}` },
            { label: 'Leads', value: domains.sales?.leads?.thisWeek || 0 },
          ]}
          color="blue"
        />
        
        <DomainCard
          domain="health"
          title="💪 Fitness & Health"
          data={domains.health}
          metrics={[
            { label: 'Weight', value: domains.health?.weight?.current ? `${domains.health.weight.current} lbs` : '—' },
            { label: 'Workouts', value: `${domains.health?.training?.thisWeek?.sessions || 0}/${domains.health?.training?.target || 4}` },
            { label: 'Sleep', value: domains.health?.recovery?.sleepAvg ? `${domains.health.recovery.sleepAvg}h` : '—' },
          ]}
          color="green"
        />
        
        <DomainCard
          domain="finance"
          title="💰 Finance & Investments"
          data={domains.finance}
          metrics={[
            { label: 'Debt', value: `$${domains.finance?.debt?.remaining?.toLocaleString() || 0}` },
            { label: 'Return', value: `${domains.finance?.investments?.actualMonthlyReturn || 0}%`, target: '7%' },
            { label: 'Positions', value: domains.finance?.investments?.positions?.length || 0 },
          ]}
          color="purple"
        />
        
        <DomainCard
          domain="content"
          title="📢 Content & Audience"
          data={domains.content}
          metrics={[
            { label: 'YouTube', value: domains.content?.platforms?.youtube?.subscribers || 0 },
            { label: 'Content', value: `${domains.content?.thisWeek?.contentPieces || 0}/${domains.content?.thisWeek?.target || 3}` },
            { label: 'Skool', value: domains.content?.platforms?.skool?.members || 0 },
          ]}
          color="orange"
        />
        
        <DomainCard
          domain="productivity"
          title="⏱️ Productivity & Time"
          data={domains.productivity}
          metrics={[
            { label: 'Deep Work', value: `${domains.productivity?.timeTracking?.thisWeek?.deepWorkHours || 0}h`, target: `${domains.productivity?.timeTracking?.thisWeek?.target || 20}h` },
            { label: 'Status', value: domains.productivity?.timeTracking?.status === 'connected' ? '✅' : '⚠️' },
            { label: 'Streak', value: `${domains.productivity?.streaks?.dailyReflection || 0} days` },
          ]}
          color="cyan"
        />
        
        <DomainCard
          domain="system"
          title="⚙️ Systems & Automation"
          data={domains.system}
          metrics={[
            { label: 'Cost', value: `$${domains.system?.costs?.llm?.spent || 0}`, target: `$${domains.system?.costs?.llm?.monthlyBudget || 200}` },
            { label: 'Health', value: domains.system?.healthChecks?.status === 'healthy' ? '✅' : '⚠️' },
            { label: 'Agents', value: domains.system?.agents?.active || 1 },
          ]}
          color="gray"
        />
      </section>

      {/* Quick Actions */}
      <section className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">⚡ Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <QuickActionButton label="Log Weight" onClick={() => {}} />
          <QuickActionButton label="Log Workout" onClick={() => {}} />
          <QuickActionButton label="Add Lead" onClick={() => {}} />
          <QuickActionButton label="Log Trade" onClick={() => {}} />
          <QuickActionButton label="Daily Reflection" onClick={() => {}} />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>OpenClaw Life Console v2.0 • {new Date(snapshot.generatedAt).toLocaleString()}</p>
        <p className="mt-1">Data stored locally • Self-hosted • You own everything</p>
      </footer>
    </div>
  )
}

function QuickActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
    >
      {label}
    </button>
  )
}
