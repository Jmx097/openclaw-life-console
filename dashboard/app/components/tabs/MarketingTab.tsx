'use client'

export default function MarketingTab() {
  return (
    <div className="space-y-8">
      {/* Status Banner */}
      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <p className="text-yellow-200/80 text-sm">
          🌱 <strong>Seed Stage:</strong> Marketing analytics ready.
          Connect social APIs or start manual tracking.
        </p>
      </div>

      {/* Platform Overview */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Platforms</h3>
        <div className="grid grid-cols-2 gap-3">
          <PlatformCard 
            name="YouTube" 
            icon="🎬"
            followers={0} 
            target={1000} 
            thisWeek={0}
          />
          <PlatformCard 
            name="Instagram" 
            icon="📸"
            followers={0} 
            target={500} 
            thisWeek={0}
          />
          <PlatformCard 
            name="LinkedIn" 
            icon="💼"
            followers={0} 
            target={500} 
            thisWeek={0}
          />
          <PlatformCard 
            name="Skool" 
            icon="🎓"
            members={0} 
            target={100} 
            thisWeek={0}
          />
        </div>
      </section>

      {/* Content Pipeline */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Content Pipeline</h3>
        <div className="space-y-3">
          <PipelineStage name="Ideas" count={0} color="gray" />
          <PipelineStage name="In Progress" count={0} color="blue" />
          <PipelineStage name="Scheduled" count={0} color="yellow" />
          <PipelineStage name="Published" count={0} color="green" />
        </div>
      </section>

      {/* This Week */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">This Week</h3>
          <span className="text-white/40 text-sm">0 / 3 target</span>
        </div>
        <div className="p-4 bg-white/[0.02] rounded-xl">
          <p className="text-white/30 text-sm text-center py-4">No content published this week</p>
        </div>
      </section>

      {/* Funnel */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Conversion Funnel</h3>
        <div className="p-4 bg-white/[0.02] rounded-xl space-y-4">
          <FunnelStep label="Content Views" value="—" percentage={100} />
          <FunnelStep label="Skool Joins" value="—" percentage={0} />
          <FunnelStep label="Leads Generated" value="—" percentage={0} />
          <FunnelStep label="Discovery Calls" value="—" percentage={0} />
        </div>
      </section>
    </div>
  )
}

function PlatformCard({ name, icon, followers, target, members, thisWeek }: any) {
  const value = members !== undefined ? members : followers
  const label = members !== undefined ? 'members' : 'followers'
  
  return (
    <div className="p-4 bg-white/[0.02] rounded-xl">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{icon}</span>
        <span className="font-medium">{name}</span>
      </div>
      <p className="text-2xl font-light">{value}</p>
      <p className="text-white/30 text-xs">{label} · {thisWeek} this week</p>
      <div className="mt-2 w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 rounded-full" 
          style={{ width: `${Math.min((value / target) * 100, 100)}%` }} 
        />
      </div>
    </div>
  )
}

function PipelineStage({ name, count, color }: { name: string; count: number; color: string }) {
  const colors: Record<string, string> = {
    gray: 'bg-white/5',
    blue: 'bg-blue-500/10',
    yellow: 'bg-yellow-500/10',
    green: 'bg-green-500/10'
  }

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${colors[color]}`}>
      <span className="text-sm text-white/60">{name}</span>
      <span className="text-sm font-medium">{count}</span>
    </div>
  )
}

function FunnelStep({ label, value, percentage }: { label: string; value: string; percentage: number }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-white/60">{label}</span>
          <span className="text-white/40">{value}</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full" 
            style={{ width: `${percentage}%` }} 
          />
        </div>
      </div>
    </div>
  )
}
