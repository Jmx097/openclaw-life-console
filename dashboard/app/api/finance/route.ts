import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const DATA_FILE = join(process.env.DATA_DIR || '/home/ubuntu/.openclaw/workspace/data', 'finance.json')

export async function GET() {
  try {
    const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load finance data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const update = await request.json()
    const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
    
    if (update.type === 'debt_payment') {
      data.debt.remaining -= update.amount
      data.debt.paid += update.amount
      data.debt.velocity = update.velocity || data.debt.velocity
      data.debt.history.push({
        date: new Date().toISOString().split('T')[0],
        remaining: data.debt.remaining
      })
    } else if (update.type === 'trade') {
      data.investments.positions.push({
        symbol: update.symbol,
        type: update.type_trade,
        shares: update.shares,
        price: update.price,
        date: new Date().toISOString()
      })
    } else if (update.type === 'monthly_close') {
      data.investments.actualMonthlyReturn = update.return_pct
      data.monthly.spend = update.spend
      data.monthly.save = update.save
      data.monthly.invest = update.invest
      data.monthly.debtPayment = update.debtPayment
    }
    
    data.metadata.lastUpdated = new Date().toISOString()
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update finance data' }, { status: 500 })
  }
}
