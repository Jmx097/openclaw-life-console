'use client'

export default function InvestingTab() {
  return (
    <div className="space-y-8">
      {/* Status Banner */}
      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <p className="text-yellow-200/80 text-sm">
          🌱 <strong>Seed Stage:</strong> Investment tracking ready. 
          Connect Wealthsimple or manual tracking to activate.
        </p>
      </div>

      {/* Net Worth */}
      <section>
        <div className="p-6 bg-white/[0.02] rounded-xl">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Net Worth</p>
          <p className="text-5xl font-light">—</p>
          <p className="text-white/30 text-sm mt-2">Connect accounts to see your net worth</p>
        </div>
      </section>

      {/* Portfolio Overview */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Portfolio</h3>
        <div className="grid grid-cols-2 gap-4">
          <MetricCard label="Total Invested" value="—" />
          <MetricCard label="Total Return" value="—" />
        </div>
      </section>

      {/* Asset Allocation */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Asset Allocation</h3>
        <div className="p-4 bg-white/[0.02] rounded-xl">
          <p className="text-white/30 text-sm text-center py-8">No positions logged yet</p>
        </div>
      </section>

      {/* Positions Table */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Positions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 border-b border-white/[0.06]">
                <th className="text-left py-2 font-medium">Symbol</th>
                <th className="text-right py-2 font-medium">Shares</th>
                <th className="text-right py-2 font-medium">Price</th>
                <th className="text-right py-2 font-medium">Value</th>
                <th className="text-right py-2 font-medium">Return</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="text-center py-8 text-white/30">
                  No positions yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick Action */}
      <section>
        <button className="w-full p-4 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] border-dashed rounded-xl text-center transition-colors">
          <span className="text-2xl mb-2 block">➕</span>
          <span className="text-sm text-white/60">Log a position</span>
        </button>
      </section>
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 bg-white/[0.02] rounded-xl">
      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-light">{value}</p>
    </div>
  )
}
