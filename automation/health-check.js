#!/usr/bin/env node
/**
 * System Health Check
 * Run every 15 minutes
 * Checks all systems and generates alerts if needed
 */

const fs = require('fs')
const path = require('path')

const DATA_DIR = process.env.DATA_DIR || '/home/ubuntu/.openclaw/workspace/data'

function loadDomain(domain) {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, `${domain}.json`), 'utf-8'))
  } catch (e) {
    return null
  }
}

function saveDomain(domain, data) {
  fs.writeFileSync(path.join(DATA_DIR, `${domain}.json`), JSON.stringify(data, null, 2))
}

function runHealthCheck() {
  const now = new Date()
  const alerts = []
  const failures = []
  
  // Load system data
  const system = loadDomain('system')
  const sales = loadDomain('sales')
  const health = loadDomain('health')
  const finance = loadDomain('finance')
  
  // Check 1: LLM Budget
  const budgetUsed = (system?.costs?.llm?.spent / system?.costs?.llm?.monthlyBudget) * 100
  if (budgetUsed >= 100) {
    alerts.push({ id: 'budget-critical', message: 'LLM budget exhausted! Stopping non-essential agents.', severity: 'critical', domain: 'system' })
    failures.push('llm_budget_exhausted')
  } else if (budgetUsed >= 80) {
    alerts.push({ id: 'budget-warning', message: `LLM budget at ${budgetUsed.toFixed(0)}%`, severity: 'warning', domain: 'system' })
  } else if (budgetUsed >= 50) {
    alerts.push({ id: 'budget-info', message: `LLM budget at ${budgetUsed.toFixed(0)}%`, severity: 'info', domain: 'system' })
  }
  
  // Check 2: Missing Health Data
  if (!health?.weight?.current) {
    const lastWeighed = health?.weight?.lastWeighed
    if (lastWeighed) {
      const daysSince = Math.floor((now.getTime() - new Date(lastWeighed).getTime()) / (1000 * 60 * 60 * 24))
      if (daysSince > 7) {
        alerts.push({ id: 'weight-stale', message: `No weight logged for ${daysSince} days`, severity: 'warning', domain: 'health' })
      }
    }
  }
  
  // Check 3: No Leads (business concern)
  if (sales?.leads?.thisWeek === 0) {
    const dayOfWeek = now.getDay()
    if (dayOfWeek >= 5) { // Weekend check
      alerts.push({ id: 'no-leads', message: 'No new leads this week — review lead sources', severity: 'warning', domain: 'sales' })
    }
  }
  
  // Check 4: Debt Progress Stalled
  if (finance?.debt?.velocity === 0 && finance?.debt?.remaining < finance?.debt?.original) {
    alerts.push({ id: 'debt-stalled', message: 'Debt payoff velocity is zero — check payments', severity: 'warning', domain: 'finance' })
  }
  
  // Update system data with check results
  system.healthChecks.lastRun = now.toISOString()
  system.healthChecks.status = failures.length === 0 ? 'healthy' : 'degraded'
  system.healthChecks.failures = failures
  system.alerts = alerts
  
  saveDomain('system', system)
  
  console.log(`Health check completed at ${now.toLocaleString()}`)
  console.log(`Status: ${system.healthChecks.status}`)
  console.log(`Alerts: ${alerts.length}`)
  
  if (alerts.length > 0) {
    alerts.forEach(a => console.log(`  [${a.severity.toUpperCase()}] ${a.domain}: ${a.message}`))
  }
  
  return { status: system.healthChecks.status, alerts, failures }
}

if (require.main === module) {
  runHealthCheck()
}

module.exports = { runHealthCheck }
