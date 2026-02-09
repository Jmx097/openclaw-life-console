'use client'

import { useState } from 'react'

export default function FitnessTab() {
  const [weight, setWeight] = useState('')

  return (
    <div className="space-y-8">
      {/* Status Banner */}
      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <p className="text-yellow-200/80 text-sm">
          🌱 <strong>Seed Stage:</strong> Fitness tracking ready to plant. 
          Connect ActivityWatch or manual logging to activate.
        </p>
      </div>

      {/* Quick Actions */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Quick Log</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-4 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] rounded-xl text-left transition-colors">
            <span className="text-2xl mb-2 block">⚖️</span>
            <span className="text-sm font-medium">Log Weight</span>
          </button>
          <button className="p-4 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] rounded-xl text-left transition-colors">
            <span className="text-2xl mb-2 block">🏋️</span>
            <span className="text-sm font-medium">Log Workout</span>
          </button>
        </div>
      </section>

      {/* Metrics Grid */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">This Week</h3>
        <div className="grid grid-cols-3 gap-4">
          <MetricCard label="Workouts" value="0/4" subtext="Target: 4" />
          <MetricCard label="Weight" value="—" subtext="Not logged" />
          <MetricCard label="Sleep Avg" value="—" subtext="Not logged" />
        </div>
      </section>

      {/* Recovery Tracking */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Recovery</h3>
        <div className="p-4 bg-white/[0.02] rounded-xl space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white/60">Pain Level (0-10)</span>
            <span className="text-2xl font-light">—</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/60">Mobility Score</span>
            <span className="text-2xl font-light">—</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/60">Sleep Quality</span>
            <span className="text-2xl font-light">—</span>
          </div>
        </div>
      </section>

      {/* Future Expansion Placeholder */}
      <section className="pt-4 border-t border-white/[0.06]">
        <h3 className="text-sm font-medium text-white/40 mb-3">Coming Soon</h3>
        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/30">ActivityWatch Sync</span>
          <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/30">Workout Templates</span>
          <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/30">Progress Photos</span>
          <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/30">Volume Tracking</span>
        </div>
      </section>
    </div>
  )
}

function MetricCard({ label, value, subtext }: { label: string; value: string; subtext: string }) {
  return (
    <div className="p-4 bg-white/[0.02] rounded-xl">
      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{label}</p>
      <p className="text-3xl font-light">{value}</p>
      <p className="text-white/30 text-xs mt-1">{subtext}</p>
    </div>
  )
}
