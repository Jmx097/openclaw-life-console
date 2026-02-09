'use client'

interface Metric {
  label: string
  value: string | number
  target?: string | number
}

interface DomainCardProps {
  domain: string
  title: string
  data: any
  metrics: Metric[]
  color: 'blue' | 'green' | 'purple' | 'orange' | 'cyan' | 'gray'
}

export default function DomainCard({ domain, title, data, metrics, color }: DomainCardProps) {
  const colorClasses = {
    blue: 'border-blue-500/30 hover:border-blue-500/60 bg-blue-500/5',
    green: 'border-green-500/30 hover:border-green-500/60 bg-green-500/5',
    purple: 'border-purple-500/30 hover:border-purple-500/60 bg-purple-500/5',
    orange: 'border-orange-500/30 hover:border-orange-500/60 bg-orange-500/5',
    cyan: 'border-cyan-500/30 hover:border-cyan-500/60 bg-cyan-500/5',
    gray: 'border-gray-500/30 hover:border-gray-500/60 bg-gray-500/5'
  }

  const accentColors = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    orange: 'text-orange-400',
    cyan: 'text-cyan-400',
    gray: 'text-gray-400'
  }

  const nextActions = data?.nextActions?.slice(0, 2) || []

  return (
    <div className={`rounded-xl border ${colorClasses[color]} p-5 transition-all cursor-pointer group`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold group-hover:text-white transition-colors">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded bg-gray-800 ${accentColors[color]}`}>
          {domain}
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {metrics.map((metric, i) => (
          <div key={i} className="text-center">
            <div className={`text-2xl font-bold ${accentColors[color]}`}>{metric.value}</div>
            <div className="text-xs text-gray-500">{metric.label}</div>
            {metric.target && (
              <div className="text-xs text-gray-600">target: {metric.target}</div>
            )}
          </div>
        ))}
      </div>

      {/* Progress bars for key metrics */}
      {metrics.map((metric, i) => {
        if (!metric.target || typeof metric.value !== 'string') return null
        const current = parseFloat(String(metric.value).replace(/[^0-9.]/g, '')) || 0
        const target = parseFloat(String(metric.target).replace(/[^0-9.]/g, '')) || 1
        const progress = Math.min((current / target) * 100, 100)
        
        return (
          <div key={`progress-${i}`} className="mb-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{metric.label}</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full bg-${color}-500`}
                style={{ width: `${progress}%`, backgroundColor: `var(--color-${color})` }}
              />
            </div>
          </div>
        )
      })}

      {/* Next Actions Preview */}
      {nextActions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          <p className="text-xs text-gray-500 mb-2">Next Actions</p>
          {nextActions.map((action: any) => (
            <div key={action.id} className="flex items-center gap-2 text-sm">
              <span className={action.priority === 'high' ? 'text-red-400' : 'text-yellow-400'}>
                {action.priority === 'high' ? '🔴' : '🟡'}
              </span>
              <span className="text-gray-300 truncate">{action.task}</span>
              <span className="text-xs text-gray-600 ml-auto">{action.due}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
