#!/usr/bin/env node
/**
 * Morning Brief Generator
 * Run at 7:00 AM daily
 * Generates a summary of the day's priorities and current state
 */

const fs = require('fs')
const path = require('path')

const DATA_DIR = process.env.DATA_DIR || '/home/ubuntu/.openclaw/workspace/data'
const OUTPUT_DIR = process.env.OUTPUT_DIR || '/home/ubuntu/.openclaw/workspace/output'

function loadDomain(domain) {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, `${domain}.json`), 'utf-8'))
  } catch (e) {
    return null
  }
}

function generateMorningBrief() {
  const now = new Date()
  const sales = loadDomain('sales')
  const health = loadDomain('health')
  const finance = loadDomain('finance')
  const content = loadDomain('content')
  const productivity = loadDomain('productivity')
  const system = loadDomain('system')

  // Build today's focus
  const priorities = []
  
  // Check for overdue actions across all domains
  const allActions = [
    ...(sales?.nextActions || []),
    ...(health?.nextActions || []),
    ...(finance?.nextActions || []),
    ...(content?.nextActions || []),
  ].filter(a => new Date(a.due) <= now)
  
  const highPriority = allActions.filter(a => a.priority === 'high')
  
  // Generate brief
  const brief = `# Morning Brief — ${now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}

## 🎯 Today's Top 3 Priorities

${highPriority.slice(0, 3).map((a, i) => `${i + 1}. ${a.task} ${new Date(a.due) < now ? '(OVERDUE)' : ''}`).join('\n') || '1. Review and update trackers\n2. Plan deep work blocks\n3. Check for new leads'}

## 💼 Sales Snapshot
- **MRR**: $${sales?.mrr?.current || 0} / $${sales?.mrr?.target || 10000} target
- **Pipeline Value**: $${sales?.pipeline?.totalValue || 0}
- **Active Deals**: ${sales?.pipeline?.activeDeals || 0}
- **Leads This Week**: ${sales?.leads?.thisWeek || 0}

## 💪 Health Check
- **Current Weight**: ${health?.weight?.current ? `${health.weight.current} lbs` : 'Not logged'}
- **Workouts This Week**: ${health?.training?.thisWeek?.sessions || 0}/${health?.training?.target || 4}
- **Sleep (avg)**: ${health?.recovery?.sleepAvg ? `${health.recovery.sleepAvg}h` : 'Not logged'}
- **Pain Level**: ${health?.recovery?.painLevel !== null ? `${health.recovery.painLevel}/10` : 'Not logged'}

## 💰 Finance
- **Debt Remaining**: $${finance?.debt?.remaining?.toLocaleString() || 21000}
- **Monthly Return**: ${finance?.investments?.actualMonthlyReturn || 0}% (target: 7%)
- **Open Positions**: ${finance?.investments?.positions?.length || 0}

## 📢 Content
- **Content This Week**: ${content?.thisWeek?.contentPieces || 0}/${content?.thisWeek?.target || 3}
- **YouTube Subs**: ${content?.platforms?.youtube?.subscribers || 0}
- **Skool Members**: ${content?.platforms?.skool?.members || 0}

## ⏱️ Productivity
- **Deep Work This Week**: ${productivity?.timeTracking?.thisWeek?.deepWorkHours || 0}/${productivity?.timeTracking?.thisWeek?.target || 20} hours
- **Time Tracking**: ${productivity?.timeTracking?.status === 'connected' ? '✅ Connected' : '⚠️ Not connected'}

## ⚙️ System
- **LLM Spend**: $${system?.costs?.llm?.spent || 0} / $${system?.costs?.llm?.monthlyBudget || 200}
- **Health Check**: ${system?.healthChecks?.status || 'Unknown'}

---

## 🌅 Today's Plan

### Morning
- [ ] Review overnight alerts (trading, leads)
- [ ] Weigh in and log
- [ ] Plan deep work blocks

### Throughout Day
- [ ] Log meals
- [ ] Track training session
- [ ] Log business activities

### Evening
- [ ] Complete daily reflection
- [ ] Review nutrition totals
- [ ] Prep for tomorrow

---

*Generated at ${now.toLocaleTimeString()}*
`

  // Write to output
  const filename = `morning-brief-${now.toISOString().split('T')[0]}.md`
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), brief)
  
  console.log(`Morning brief generated: ${filename}`)
  return brief
}

// Run if called directly
if (require.main === module) {
  console.log(generateMorningBrief())
}

module.exports = { generateMorningBrief }
