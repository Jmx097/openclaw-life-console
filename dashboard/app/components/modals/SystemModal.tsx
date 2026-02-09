'use client'

import Modal from './Modal'

interface SystemModalProps {
  onClose: () => void
  data?: any
}

export default function SystemModal({ onClose, data }: SystemModalProps) {
  return (
    <Modal onClose={onClose} title="System" icon="⚙️" color="#6b7280">
      <div className="p-6 space-y-6">
        {/* System Status */}
        <section>
          <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Infrastructure</h3>
          <div className="space-y-3">
            <StatusRow label="OpenClaw Gateway" status="operational" />
            <StatusRow label="Dashboard API" status="operational" />
            <StatusRow label="Data Stores" status="operational" />
            <StatusRow label="Automation Jobs" status="operational" />
          </div>
        </section>

        {/* Cost Tracking */}
        <section>
          <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Costs</h3>
          <div className="p-4 bg-white/[0.02] rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/60">LLM Budget</span>
              <span className="text-white">$0 / $200</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '0%' }} />
            </div>
          </div>
        </section>

        {/* Automation Schedule */}
        <section>
          <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Heartbeat</h3>
          <div className="space-y-2">
            <ScheduleRow label="Morning Brief" time="7:00 AM" />
            <ScheduleRow label="Evening Reflection" time="10:00 PM" />
            <ScheduleRow label="Weekly Review" time="Sunday 6:00 PM" />
            <ScheduleRow label="Health Check" time="Every 15 min" />
          </div>
        </section>
      </div>
    </Modal>
  )
}

function StatusRow({ label, status }: { label: string; status: 'operational' | 'degraded' | 'down' }) {
  const colors = {
    operational: 'bg-green-500',
    degraded: 'bg-yellow-500',
    down: 'bg-red-500'
  }
  
  return (
    <div className="flex items-center justify-between py-2 px-3 bg-white/[0.02] rounded-lg">
      <span className="text-sm">{label}</span>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${colors[status]}`} />
        <span className="text-xs text-white/60 capitalize">{status}</span>
      </div>
    </div>
  )
}

function ScheduleRow({ label, time }: { label: string; time: string }) {
  return (
    <div className="flex items-center justify-between py-2 px-3 bg-white/[0.02] rounded-lg">
      <span className="text-sm">{label}</span>
      <span className="text-xs text-white/40">{time}</span>
    </div>
  )
}
