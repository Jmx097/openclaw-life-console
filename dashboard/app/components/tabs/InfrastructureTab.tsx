'use client'

export default function InfrastructureTab() {
  return (
    <div className="space-y-8">
      {/* Status Overview */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Services</h3>
        <div className="space-y-3">
          <ServiceRow name="OpenClaw Gateway" status="operational" url="http://localhost:8080" />
          <ServiceRow name="LifeOS Dashboard" status="operational" url="http://localhost:3000" />
          <ServiceRow name="Grafana" status="operational" url="http://localhost:3001" />
          <ServiceRow name="Tailscale" status="unknown" />
          <ServiceRow name="UFW Firewall" status="unknown" />
        </div>
      </section>

      {/* Data Stores */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Data Stores</h3>
        <div className="grid grid-cols-3 gap-3">
          <DataStoreCard name="Sales" records={0} />
          <DataStoreCard name="Health" records={0} />
          <DataStoreCard name="Finance" records={0} />
          <DataStoreCard name="Content" records={0} />
          <DataStoreCard name="Productivity" records={0} />
          <DataStoreCard name="System" records={0} />
        </div>
      </section>

      {/* Integrations */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Integrations</h3>
        <div className="space-y-3">
          <IntegrationRow 
            name="Airtable CRM" 
            status="connected" 
            detail="Plinko Solutions Lead Base"
          />
          <IntegrationRow 
            name="ActivityWatch" 
            status="disconnected" 
            detail="Time tracking"
          />
          <IntegrationRow 
            name="Cal.com" 
            status="configured" 
            detail="Discovery calls"
          />
          <IntegrationRow 
            name="Wealthsimple" 
            status="planned" 
            detail="Trading & investing"
          />
          <IntegrationRow 
            name="Firefly III" 
            status="planned" 
            detail="Personal finance"
          />
        </div>
      </section>

      {/* API Status */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">API Endpoints</h3>
        <div className="p-4 bg-white/[0.02] rounded-xl font-mono text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-green-400">GET</span>
            <span className="text-white/60">/api/snapshot</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-400">POST</span>
            <span className="text-white/60">/api/health/weight</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-400">POST</span>
            <span className="text-white/60">/api/sales/lead</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-400">POST</span>
            <span className="text-white/60">/api/finance/trade</span>
          </div>
        </div>
      </section>
    </div>
  )
}

function ServiceRow({ name, status, url }: { name: string; status: string; url?: string }) {
  const colors: Record<string, string> = {
    operational: 'bg-green-500',
    degraded: 'bg-yellow-500',
    down: 'bg-red-500',
    unknown: 'bg-gray-500'
  }

  return (
    <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${colors[status]}`} />
        <span className="text-sm">{name}</span>
      </div>
      {url && (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-white/40 hover:text-white/60 transition-colors"
        >
          {url.replace('http://', '')}
        </a>
      )}
    </div>
  )
}

function DataStoreCard({ name, records }: { name: string; records: number }) {
  return (
    <div className="p-3 bg-white/[0.02] rounded-lg text-center">
      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{name}</p>
      <p className="text-xl font-light">{records}</p>
      <p className="text-white/30 text-xs">records</p>
    </div>
  )
}

function IntegrationRow({ name, status, detail }: { name: string; status: string; detail: string }) {
  const colors: Record<string, string> = {
    connected: 'text-green-400',
    configured: 'text-blue-400',
    disconnected: 'text-red-400',
    planned: 'text-white/30'
  }

  const labels: Record<string, string> = {
    connected: '●',
    configured: '◐',
    disconnected: '○',
    planned: '○'
  }

  return (
    <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg">
      <div>
        <span className="text-sm">{name}</span>
        <p className="text-white/30 text-xs">{detail}</p>
      </div>
      <span className={`text-sm ${colors[status]}`}>
        {labels[status]} {status}
      </span>
    </div>
  )
}
