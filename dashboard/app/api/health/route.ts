import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const DATA_FILE = join(process.env.DATA_DIR || '/home/ubuntu/.openclaw/workspace/data', 'health.json')

export async function GET() {
  try {
    const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load health data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const update = await request.json()
    const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
    
    // Handle different update types
    if (update.type === 'weight') {
      data.weight.current = update.weight
      data.weight.lastWeighed = update.date || new Date().toISOString().split('T')[0]
      data.weight.history.push({
        date: update.date || new Date().toISOString().split('T')[0],
        value: update.weight,
        notes: update.notes || ''
      })
    } else if (update.type === 'workout') {
      data.training.thisWeek.sessions += 1
      data.training.lastSession = update.date || new Date().toISOString()
      // Add to tracking/health/fitness-log.md in real implementation
    } else if (update.type === 'recovery') {
      data.recovery.painLevel = update.painLevel
      data.recovery.sleepAvg = update.sleep
    }
    
    data.metadata.lastUpdated = new Date().toISOString()
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update health data' }, { status: 500 })
  }
}
