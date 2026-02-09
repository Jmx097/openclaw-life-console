'use client'

export default function NutritionTab() {
  return (
    <div className="space-y-8">
      {/* Status Banner */}
      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <p className="text-yellow-200/80 text-sm">
          🌱 <strong>Seed Stage:</strong> Nutrition tracking ready to plant.
          Connect OpenFoodFacts API or start manual logging.
        </p>
      </div>

      {/* Today's Summary */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Today</h3>
        <div className="grid grid-cols-3 gap-4">
          <MetricCard label="Calories" value="—" subtext="Target: 2500" />
          <MetricCard label="Protein" value="—" subtext="Target: 150g" />
          <MetricCard label="Fiber" value="—" subtext="Target: 30g" />
        </div>
      </section>

      {/* Quick Log */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Quick Log</h3>
        <button className="w-full p-4 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] border-dashed rounded-xl text-center transition-colors">
          <span className="text-2xl mb-2 block">➕</span>
          <span className="text-sm text-white/60">Log a meal</span>
        </button>
      </section>

      {/* Weekly Adherence */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Weekly Adherence</h3>
        <div className="space-y-3">
          <AdherenceBar label="Protein Target" value={0} />
          <AdherenceBar label="Fiber Target" value={0} />
          <AdherenceBar label="Meal Logging" value={0} />
        </div>
      </section>

      {/* Restrictions */}
      <section className="p-4 bg-red-500/5 border border-red-500/10 rounded-lg">
        <h3 className="text-sm font-medium text-red-300/80 mb-2">Dietary Restrictions</h3>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-red-500/10 rounded-full text-xs text-red-300">🚫 Avocado</span>
          <span className="px-3 py-1 bg-red-500/10 rounded-full text-xs text-red-300">🚫 Mango</span>
        </div>
      </section>

      {/* Future Expansion */}
      <section className="pt-4 border-t border-white/[0.06]">
        <h3 className="text-sm font-medium text-white/40 mb-3">Coming Soon</h3>
        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/30">Barcode Scanner</span>
          <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/30">Meal Photos</span>
          <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/30">Recipe Import</span>
          <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/30">Macro Trends</span>
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

function AdherenceBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-white/60">{label}</span>
        <span className="text-white/40">{value}%</span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-green-500 rounded-full transition-all" 
          style={{ width: `${value}%` }} 
        />
      </div>
    </div>
  )
}
