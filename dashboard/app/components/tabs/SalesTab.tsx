'use client'

export default function SalesTab() {
  return (
    <div className="space-y-8">
      {/* MRR Card */}
      <section>
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Monthly Recurring Revenue</p>
              <p className="text-5xl font-light">$0</p>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Target</p>
              <p className="text-2xl font-light text-blue-400">$10k</p>
            </div>
          </div>
          <div className="mt-4 w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '0%' }} />
          </div>
          <p className="text-white/30 text-xs mt-2">0% of $10k MRR target</p>
        </div>
      </section>

      {/* Pipeline */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Pipeline</h3>
        <div className="grid grid-cols-3 gap-3">
          <PipelineCard stage="Discovery" count={0} value={0} color="blue" />
          <PipelineCard stage="Proposal" count={0} value={0} color="yellow" />
          <PipelineCard stage="Negotiation" count={0} value={0} color="green" />
        </div>
      </section>

      {/* Offer Ladder */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Offer Ladder</h3>
        <div className="space-y-3">
          <OfferRow 
            name="Automation Scan" 
            price={247} 
            sold={0} 
            revenue={0}
            description="90-min audit + roadmap"
          />
          <OfferRow 
            name="Workflow Build" 
            price={2000} 
            sold={0} 
            revenue={0}
            description="1 workflow delivered"
          />
          <OfferRow 
            name="Care Plan" 
            price={750} 
            sold={0} 
            mrr={0}
            description="Monthly optimization"
            recurring
          />
        </div>
      </section>

      {/* Recent Leads */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Leads This Week</h3>
        <div className="p-4 bg-white/[0.02] rounded-xl">
          <p className="text-white/30 text-sm text-center py-4">No leads yet — set up lead capture</p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-2 gap-3">
        <button className="p-4 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] rounded-xl text-center transition-colors">
          <span className="text-2xl mb-2 block">➕</span>
          <span className="text-sm text-white/60">Add Lead</span>
        </button>
        <button className="p-4 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] rounded-xl text-center transition-colors">
          <span className="text-2xl mb-2 block">📊</span>
          <span className="text-sm text-white/60">Update Pipeline</span>
        </button>
      </section>
    </div>
  )
}

function PipelineCard({ stage, count, value, color }: { stage: string; count: number; value: number; color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-500/10 border-blue-500/20',
    yellow: 'bg-yellow-500/10 border-yellow-500/20',
    green: 'bg-green-500/10 border-green-500/20'
  }

  return (
    <div className={`p-4 border rounded-xl ${colors[color]}`}>
      <p className="text-white/40 text-xs uppercase tracking-wider mb-2">{stage}</p>
      <p className="text-3xl font-light">{count}</p>
      <p className="text-white/30 text-sm mt-1">${value.toLocaleString()}</p>
    </div>
  )
}

function OfferRow({ name, price, sold, revenue, mrr, description, recurring }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl">
      <div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{name}</span>
          {recurring && <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">MRR</span>}
        </div>
        <p className="text-white/40 text-xs mt-0.5">{description}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-light">${price}</p>
        <p className="text-white/30 text-xs">{sold} sold · ${(mrr || revenue).toLocaleString()}</p>
      </div>
    </div>
  )
}
