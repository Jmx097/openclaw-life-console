'use client'

import { useState, useEffect } from 'react'

interface Mission {
  id: string
  name: string
  priority: number
  status: string
  progress: number
  deadline: string
}

interface Lead {
  name: string
  status: string
  dealSize: number
  nextAction: string
}

export default function Dashboard() {
  const [missions, setMissions] = useState<Mission[]>([
    { id: '1', name: 'Plinko Sales Pipeline', priority: 1, status: 'in-progress', progress: 50, deadline: '2026-02-15' },
    { id: '2', name: 'Health Tracking', priority: 2, status: 'setup', progress: 20, deadline: '2026-02-10' },
    { id: '3', name: 'Finance Dashboard', priority: 3, status: 'setup', progress: 10, deadline: '2026-02-20' }
  ])

  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState({
    activeMissions: 6,
    inProgress: 1,
    blocked: 0,
    sprintProgress: 50
  })

  useEffect(() => {
    // Fetch Airtable data would go here
    // For now using mock data
  }, [])

  const getPriorityColor = (p: number) => {
    if (p === 1) return '🔴'
    if (p === 2) return '🟡'
    return '🟢'
  }

  const getStatusColor = (s: string) => {
    const colors: Record<string, string> = {
      'in-progress': 'bg-blue-500',
      'setup': 'bg-yellow-500',
      'done': 'bg-green-500',
      'blocked': 'bg-red-500'
    }
    return colors[s] || 'bg-gray-500'
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">OpenClaw Life Console</h1>
        <p className="text-gray-400">Personal Operating System Dashboard</p>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Active Missions" value={stats.activeMissions} color="blue" />
        <StatCard title="In Progress" value={stats.inProgress} color="yellow" />
        <StatCard title="Blocked" value={stats.blocked} color="red" />
        <StatCard title="Sprint Progress" value={`${stats.sprintProgress}%`} color="green" />
      </section>

      {/* Missions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">🎯 Mission Status</h2>
        <div className="grid gap-4">
          {missions.map(mission => (
            <div key={mission.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span>{getPriorityColor(mission.priority)}</span>
                  <span className="font-semibold">{mission.name}</span>
                </div>
                <span className="text-sm text-gray-400">Due: {mission.deadline}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getStatusColor(mission.status)}`}
                  style={{ width: `${mission.progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-400">{mission.status}</span>
                <span className="text-gray-400">{mission.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sales Pipeline */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">💼 Sales Pipeline</h2>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="grid grid-cols-4 gap-4 text-sm text-gray-400 mb-2">
            <span>Lead</span>
            <span>Status</span>
            <span>Deal Size</span>
            <span>Next Action</span>
          </div>
          {leads.length === 0 ? (
            <p className="text-gray-500 italic">No leads yet — Airtable integration pending</p>
          ) : (
            leads.map((lead, i) => (
              <div key={i} className="grid grid-cols-4 gap-4 py-2 border-t border-gray-700">
                <span>{lead.name}</span>
                <span className="capitalize">{lead.status}</span>
                <span>${lead.dealSize.toLocaleString()}</span>
                <span>{lead.nextAction}</span>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Budget */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">💰 Budget</h2>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span>Monthly LLM Budget</span>
            <span>$0 / $200</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div className="bg-green-500 h-4 rounded-full" style={{ width: '0%' }} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm pt-8">
        <p>OpenClaw Life Console • {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  )
}

function StatCard({ title, value, color }: { title: string, value: string | number, color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    green: 'bg-green-500'
  }
  
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className={`text-3xl font-bold ${colors[color]} bg-opacity-20 text-${color}-400 rounded-lg p-2 inline-block mb-2`}>
        {value}
      </div>
      <p className="text-gray-400 text-sm">{title}</p>
    </div>
  )
}
