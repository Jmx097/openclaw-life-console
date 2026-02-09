import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const DATA_FILE = join(process.env.DATA_DIR || '/home/ubuntu/.openclaw/workspace/data', 'productivity.json')

export async function GET() {
  try {
    const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load productivity data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const update = await request.json()
    const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
    
    if (update.type === 'deep_work') {
      data.timeTracking.thisWeek.deepWorkHours += update.hours
      data.categories.deepWork.thisWeek += update.hours
    } else if (update.type === 'category') {
      data.categories[update.category].thisWeek += update.hours
    } else if (update.type === 'streak') {
      data.streaks[update.streak] = update.value
    }
    
    data.metadata.lastUpdated = new Date().toISOString()
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update productivity data' }, { status: 500 })
  }
}
