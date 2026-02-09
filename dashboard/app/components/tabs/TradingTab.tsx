'use client'

export default function TradingTab() {
  return (
    <div className="space-y-8">
      {/* Status Banner */}
      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <p className="text-yellow-200/80 text-sm">
          🌱 <strong>Seed Stage:</strong> Trading journal ready.
          Log trades to track performance vs 7% monthly target.
        </p>
      </div>

      {/* Monthly Target */}
      <section>
        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Monthly Return</p>
              <p className="text-5xl font-light">—</p>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Target</p>
              <p className="text-2xl font-light text-purple-400">7%</p>
            </div>
          </div>
          <div className="mt-4 w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: '0%' }} />
          </div>
        </div>
      </section>

      {/* Risk Rules */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Risk Rules</h3>
        <div className="grid grid-cols-3 gap-3">
          <RiskRuleCard label="Max/Trade" value="2%" status="ok" />
          <RiskRuleCard label="Stop Losses" value="Required" status="ok" />
          <RiskRuleCard label="Revenge Trading" value="None" status="ok" />
        </div>
      </section>

      {/* Open Trades */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Open Trades</h3>
        <div className="p-4 bg-white/[0.02] rounded-xl">
          <p className="text-white/30 text-sm text-center py-4">No open trades</p>
        </div>
      </section>

      {/* Trade History */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Recent Trades</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 border-b border-white/[0.06]">
                <th className="text-left py-2 font-medium">Date</th>
                <th className="text-left py-2 font-medium">Symbol</th>
                <th className="text-left py-2 font-medium">Type</th>
                <th className="text-right py-2 font-medium">Entry</th>
                <th className="text-right py-2 font-medium">Exit</th>
                <th className="text-right py-2 font-medium">P/L</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="text-center py-8 text-white/30">
                  No trades logged yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick Action */}
      <section className="grid grid-cols-2 gap-3">
        <button className="p-4 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-xl text-center transition-colors">
          <span className="text-2xl mb-2 block">📈</span>
          <span className="text-sm text-green-300">Log Buy</span>
        </button>
        <button className="p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-center transition-colors">
          <span className="text-2xl mb-2 block">📉</span>
          <span className="text-sm text-red-300">Log Sell</span>
        </button>
      </section>
    </div>
  )
}

function RiskRuleCard({ label, value, status }: { label: string; value: string; status: 'ok' | 'warn' | 'violated' }) {
  const colors = {
    ok: 'bg-green-500/10 border-green-500/20 text-green-400',
    warn: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
    violated: 'bg-red-500/10 border-red-500/20 text-red-400'
  }

  return (
    <div className={`p-3 border rounded-lg ${colors[status]}`}>
      <p className="text-xs opacity-60 mb-1">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}
