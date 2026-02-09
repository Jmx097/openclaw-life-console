import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const DATA_FILE = join(process.env.DATA_DIR || '/home/ubuntu/.openclaw/workspace/data', 'content.json')

export async function GET() {
  try {
    const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load content data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const update = await request.json()
    const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
    
    if (update.type === 'post') {
      data.platforms[update.platform].thisWeek.posts += 1
      data.thisWeek.contentPieces += 1
    } else if (update.type === 'metrics') {
      data.platforms[update.platform].subscribers = update.subscribers
      data.platforms[update.platform].thisWeek.views = update.views
      data.platforms[update.platform].thisWeek.engagement = update.engagement
    } else if (update.type === 'pipeline') {
      data.pipeline[update.stage].push(update.item)
    }
    
    data.metadata.lastUpdated = new Date().toISOString()
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update content data' }, { status: 500 })
  }
}
