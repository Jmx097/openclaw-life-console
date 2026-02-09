'use client'

interface Alert {
  id: string
  message: string
  severity: 'info' | 'warning' | 'critical'
  domain: string
}

export default function AlertBanner({ alert }: { alert: Alert }) {
  const colors = {
    info: 'bg-blue-500/20 border-blue-500/50 text-blue-300',
    warning: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300',
    critical: 'bg-red-500/20 border-red-500/50 text-red-300'
  }

  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    critical: '🚨'
  }

  return (
    <div className={`mb-3 p-4 rounded-lg border ${colors[alert.severity]} flex items-center gap-3`}>
      <span className="text-xl">{icons[alert.severity]}</span>
      <div className="flex-1">
        <span className="text-xs uppercase tracking-wider opacity-70">{alert.domain}</span>
        <p className="font-medium">{alert.message}</p>
      </div>
    </div>
  )
}
