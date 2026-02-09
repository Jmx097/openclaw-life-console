import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const DATA_FILE = join(process.env.DATA_DIR || '/home/ubuntu/.openclaw/workspace/data', 'system.json')

export async function GET() {
  try {
    const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load system data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const update = await request.json()
    const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
    
    if (update.type === 'cost') {
      data.costs.llm.spent += update.amount
      data.costs.llm.remaining = data.costs.llm.monthlyBudget - data.costs.llm.spent
    } else if (update.type === 'health_check') {
      data.healthChecks.lastRun = new Date().toISOString()
      data.healthChecks.status = update.status
      if (update.failures) {
        data.healthChecks.failures = update.failures
      }
    } else if (update.type === 'alert') {
      data.alerts.push({
        id: Date.now().toString(),
        message: update.message,
        severity: update.severity,
        createdAt: new Date().toISOString()
      })
    }
    
    data.metadata.lastUpdated = new Date().toISOString()
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update system data' }, { status: 500 })
  }
}
