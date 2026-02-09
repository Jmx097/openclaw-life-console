#!/usr/bin/env node
/**
 * Weekly Review Generator
 * Run Sunday evenings
 * Synthesizes week across all domains
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

function generateWeeklyReview() {
  const now = new Date()
  const weekNum = getWeekNumber(now)
  
  const sales = loadDomain('sales')
  const health = loadDomain('health')
  const finance = loadDomain('finance')
  const content = loadDomain('content')
  const productivity = loadDomain('productivity')
  const system = loadDomain('system')
  
  // Calculate adherence rates
  const workoutAdherence = health?.training?.target 
    ? Math.round((health.training.thisWeek.sessions / health.training.target) * 100)
    : 0
  
  const deepWorkAdherence = productivity?.timeTracking?.thisWeek?.target
    ? Math.round((productivity.timeTracking.thisWeek.deepWorkHours / productivity.timeTracking.thisWeek.target) * 100)
    : 0

  const review = `# Weekly Review — Week ${weekNum}, ${now.getFullYear()}

## 📊 Quantitative Summary

### Sales & Revenue
| Metric | Value | Target |
|--------|-------|--------|
| MRR | $${sales?.mrr?.current || 0} | $${sales?.mrr?.target || 10000} |
| Leads | ${sales?.leads?.thisWeek || 0} | — |
| Pipeline Value | $${sales?.pipeline?.totalValue || 0} | — |
| Conversion Rate | ${sales?.leads?.conversionRate || 0}% | — |

### Fitness & Health
| Metric | Value | Target | Adherence |
|--------|-------|--------|-----------|
| Workouts | ${health?.training?.thisWeek?.sessions || 0} | ${health?.training?.target || 4} | ${workoutAdherence}% |
| Avg Sleep | ${health?.recovery?.sleepAvg || '—'}h | 7-8h | — |
| Pain Level | ${health?.recovery?.painLevel !== null ? `${health.recovery.painLevel}/10` : '—'} | <3/10 | — |
| Nutrition | ${health?.nutrition?.thisWeek?.adherence || '—'}% | 80%+ | — |

### Finance & Investments
| Metric | Value | Target |
|--------|-------|--------|
| Debt Paid This Week | $${(finance?.debt?.original - finance?.debt?.remaining) || 0} | — |
| Debt Remaining | $${finance?.debt?.remaining?.toLocaleString() || 21000} | $0 |
| Monthly Return | ${finance?.investments?.actualMonthlyReturn || 0}% | 7% |
| Open Positions | ${finance?.investments?.positions?.length || 0} | — |

### Content & Audience
| Metric | Value | Target |
|--------|-------|--------|
| Content Pieces | ${content?.thisWeek?.contentPieces || 0} | ${content?.thisWeek?.target || 3} |
| YouTube Subs | ${content?.platforms?.youtube?.subscribers || 0} | ${content?.platforms?.youtube?.target || 1000} |
| Skool Members | ${content?.platforms?.skool?.members || 0} | ${content?.platforms?.skool?.target || 100} |

### Productivity
| Metric | Value | Target | Adherence |
|--------|-------|--------|-----------|
| Deep Work | ${productivity?.timeTracking?.thisWeek?.deepWorkHours || 0}h | ${productivity?.timeTracking?.thisWeek?.target || 20}h | ${deepWorkAdherence}% |

### System Health
| Metric | Value |
|--------|-------|
| LLM Spend | $${system?.costs?.llm?.spent || 0} / $${system?.costs?.llm?.monthlyBudget || 200} |
| Health Checks | ${system?.healthChecks?.status || 'Unknown'} |

---

## 🏆 Top 3 Wins This Week

1. 
2. 
3. 

## 😤 Top 2 Misses / Lessons

1. 
2. 

## 🔍 Patterns Observed

*(Correlations, trends, surprises)*

---

## 🎯 Next Week: Key Outcomes

1. 
2. 
3. 

## 🧪 Experiments to Try

1. 
2. 

---

## 📅 Calendar Preview

| Day | Focus |
|-----|-------|
| Monday | |
| Tuesday | |
| Wednesday | |
| Thursday | |
| Friday | |

---

*Generated ${now.toLocaleString()}*
`

  const filename = `weekly-review-${now.getFullYear()}-W${weekNum}.md`
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), review)
  
  console.log(`Weekly review generated: ${filename}`)
  return review
}

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}

if (require.main === module) {
  console.log(generateWeeklyReview())
}

module.exports = { generateWeeklyReview }
