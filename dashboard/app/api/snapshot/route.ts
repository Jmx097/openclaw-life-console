import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

const DATA_DIR = process.env.DATA_DIR || '/home/ubuntu/.openclaw/workspace/data'

export async function GET() {
  try {
    // Load domain data
    const health = loadDomain('health')
    const finance = loadDomain('finance')
    const sales = loadDomain('sales')
    const content = loadDomain('content')
    const productivity = loadDomain('productivity')
    const system = loadDomain('system')

    // Aggregate alerts
    const alerts = []
    
    // Health alerts
    if (!health?.weight?.current) {
      alerts.push({ id: 'health-weight', message: 'Weight not logged', severity: 'info', domain: 'health' })
    }
    if (health?.training?.thisWeek?.sessions === 0) {
      alerts.push({ id: 'health-workout', message: 'No workouts this week', severity: 'info', domain: 'health' })
    }

    // Business alerts
    if (sales?.leads?.thisWeek === 0) {
      alerts.push({ id: 'sales-leads', message: 'No new leads this week', severity: 'warning', domain: 'business' })
    }

    // Finance alerts
    if (finance?.debt?.velocity === 0) {
      alerts.push({ id: 'finance-debt', message: 'Debt payoff stalled', severity: 'info', domain: 'finance' })
    }

    // System alerts
    const budgetUsed = (system?.costs?.llm?.spent / system?.costs?.llm?.monthlyBudget) * 100
    if (budgetUsed >= 80) {
      alerts.push({ id: 'system-budget', message: `LLM budget at ${budgetUsed.toFixed(0)}%`, severity: 'warning', domain: 'system' })
    }

    // Calculate health score
    let score = 100
    if (!health?.weight?.current) score -= 5
    if (health?.training?.thisWeek?.sessions === 0) score -= 5
    if (sales?.leads?.thisWeek === 0) score -= 5
    if (finance?.debt?.velocity === 0) score -= 5
    if (productivity?.timeTracking?.status !== 'connected') score -= 5
    if (alerts.filter(a => a.severity === 'warning').length > 0) score -= 10
    if (alerts.filter(a => a.severity === 'critical').length > 0) score -= 20

    // Determine status
    let status: 'healthy' | 'degraded' | 'critical' = 'healthy'
    if (score < 60) status = 'critical'
    else if (score < 80) status = 'degraded'

    // Build metrics for tiles
    const snapshot = {
      generatedAt: new Date().toISOString(),
      domains: {
        health: {
          status: health?.weight?.current ? 'active' : 'seed',
          metrics: [
            { label: 'Weight', value: health?.weight?.current ? `${health.weight.current} lbs` : '—' },
            { label: 'Workouts', value: `${health?.training?.thisWeek?.sessions || 0}/${health?.training?.target || 4}` },
            { label: 'Sleep', value: health?.recovery?.sleepAvg ? `${health.recovery.sleepAvg}h` : '—' }
          ],
          alerts: health?.alerts || []
        },
        finance: {
          status: finance?.investments?.positions?.length > 0 ? 'active' : 'seed',
          metrics: [
            { label: 'Debt', value: `$${(finance?.debt?.remaining || 0).toLocaleString()}` },
            { label: 'Return', value: `${finance?.investments?.actualMonthlyReturn || 0}%`, change: 0, trend: 'flat' },
            { label: 'Positions', value: finance?.investments?.positions?.length || 0 }
          ],
          alerts: finance?.alerts || []
        },
        business: {
          status: sales?.mrr?.current > 0 ? 'active' : 'seed',
          metrics: [
            { label: 'MRR', value: `$${sales?.mrr?.current || 0}`, change: 0, trend: 'flat' },
            { label: 'Pipeline', value: `$${sales?.pipeline?.totalValue || 0}` },
            { label: 'Leads', value: sales?.leads?.thisWeek || 0 }
          ],
          alerts: sales?.alerts || []
        },
        system: {
          status: 'active',
          metrics: [
            { label: 'Cost', value: `$${system?.costs?.llm?.spent || 0}` },
            { label: 'Health', value: system?.healthChecks?.status === 'healthy' ? '✓' : '!' },
            { label: 'Agents', value: system?.agents?.active || 1 }
          ],
          alerts: system?.alerts || []
        }
      },
      summary: {
        score: Math.max(0, score),
        status,
        alerts: alerts.length
      }
    }

    return NextResponse.json(snapshot)
  } catch (error) {
    console.error('Snapshot error:', error)
    return NextResponse.json({ error: 'Failed to generate snapshot' }, { status: 500 })
  }
}

function loadDomain(domain: string) {
  try {
    return JSON.parse(readFileSync(join(DATA_DIR, `${domain}.json`), 'utf-8'))
  } catch (e) {
    return null
  }
}
