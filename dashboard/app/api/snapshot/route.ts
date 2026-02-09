import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

const DATA_DIR = process.env.DATA_DIR || '/home/ubuntu/.openclaw/workspace/data'

export async function GET() {
  try {
    const domains = ['sales', 'health', 'finance', 'content', 'productivity', 'system']
    const snapshot: any = {
      generatedAt: new Date().toISOString(),
      domains: {},
      alerts: [],
      summary: {
        score: 0,
        topPriority: '',
        status: 'healthy'
      }
    }

    // Load all domain data
    for (const domain of domains) {
      try {
        const data = JSON.parse(readFileSync(join(DATA_DIR, `${domain}.json`), 'utf-8'))
        snapshot.domains[domain] = data
        
        // Collect alerts
        if (data.alerts && data.alerts.length > 0) {
          snapshot.alerts.push(...data.alerts.map((a: any) => ({ ...a, domain })))
        }
      } catch (e) {
        snapshot.domains[domain] = { error: 'Failed to load' }
      }
    }

    // Calculate overall health score
    let score = 100
    const health = snapshot.domains.health
    const sales = snapshot.domains.sales
    const finance = snapshot.domains.finance
    const productivity = snapshot.domains.productivity

    // Deduct for missing critical data
    if (!health.weight.current) score -= 10
    if (!health.training.thisWeek.sessions && health.training.thisWeek.sessions !== 0) score -= 5
    if (sales.mrr.current === 0) score -= 5
    if (finance.debt.remaining === finance.debt.original) score -= 5
    if (!productivity.timeTracking.thisWeek.deepWorkHours) score -= 5

    // Check for overdue actions
    const allActions = Object.values(snapshot.domains).flatMap((d: any) => d.nextActions || [])
    const overdue = allActions.filter((a: any) => new Date(a.due) < new Date())
    score -= overdue.length * 3

    snapshot.summary.score = Math.max(0, score)
    snapshot.summary.status = score >= 80 ? 'healthy' : score >= 50 ? 'degraded' : 'critical'
    
    // Find top priority
    const highPriority = allActions.filter((a: any) => a.priority === 'high')
    snapshot.summary.topPriority = highPriority.length > 0 ? highPriority[0].task : 'No high priority items'

    return NextResponse.json(snapshot)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate snapshot' }, { status: 500 })
  }
}
