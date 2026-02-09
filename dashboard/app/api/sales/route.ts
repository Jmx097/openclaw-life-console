import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const DATA_FILE = join(process.env.DATA_DIR || '/home/ubuntu/.openclaw/workspace/data', 'sales.json')

export async function GET() {
  try {
    const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load sales data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const update = await request.json()
    const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
    
    if (update.type === 'lead') {
      data.leads.thisWeek += 1
      data.leads.thisMonth += 1
      data.leads.total += 1
      data.leads.sources[update.source] = (data.leads.sources[update.source] || 0) + 1
    } else if (update.type === 'deal') {
      data.pipeline.activeDeals += 1
      data.pipeline.totalValue += update.value || 0
      data.pipeline.stages[update.stage].count += 1
      data.pipeline.stages[update.stage].value += update.value || 0
    } else if (update.type === 'sale') {
      data.offers[update.offer].sold += 1
      if (update.offer === 'care') {
        data.offers.care.mrr += update.price || 750
        data.mrr.current += update.price || 750
      } else {
        data.offers[update.offer].revenue += update.price || data.offers[update.offer].price
      }
    }
    
    data.metadata.lastUpdated = new Date().toISOString()
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update sales data' }, { status: 500 })
  }
}
