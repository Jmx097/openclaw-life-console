'use client'

interface SnapshotHeaderProps {
  score: number
  status: 'healthy' | 'degraded' | 'critical'
  topPriority: string
  generatedAt: string
}

export default function SnapshotHeader({ score, status, topPriority, generatedAt }: SnapshotHeaderProps) {
  const statusConfig = {
    healthy: { color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/50', icon: '✅' },
    degraded: { color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', icon: '⚠️' },
    critical: { color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/50', icon: '🚨' }
  }

  const config = statusConfig[status]

  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">OpenClaw Life Console</h1>
          <p className="text-gray-400">Personal Operating System Dashboard</p>
        </div>
        
        <div className={`flex items-center gap-4 px-6 py-4 rounded-xl border ${config.bg} ${config.border}`}>
          <div className="text-center">
            <div className={`text-4xl font-bold ${config.color}`}>{score}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Health Score</div>
          </div>
          <div className="h-12 w-px bg-gray-700"></div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{config.icon}</span>
              <span className={`font-semibold capitalize ${config.color}`}>{status}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Updated {new Date(generatedAt).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Top Priority Banner */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎯</span>
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Top Priority</span>
            <p className="text-lg font-medium">{topPriority}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
