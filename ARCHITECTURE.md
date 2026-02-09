# LifeOS Dashboard Architecture

**System**: OpenClaw Life Console  
**Version**: 2.0  
**Date**: 2026-02-09  

## Overview

A self-hosted, extensible personal operating system that aggregates data from 6 life domains, provides actionable dashboards, and automates the heartbeat cadence (daily briefs, weekly reviews, monthly reports).

## Core Principles

1. **File-First Data**: JSON/markdown as source of truth, git-tracked
2. **API Layer**: RESTful endpoints for each domain
3. **Reactive UI**: Next.js dashboard with real-time updates
4. **Automation-Ready**: Cron-friendly scripts for heartbeat cadence
5. **Zero External Dependencies**: Works offline, syncs optional

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Next.js   │  │   Grafana   │  │   CLI / WhatsApp Bot    │  │
│  │  Dashboard  │  │  Dashboards │  │   (heartbeat alerts)    │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                      API LAYER (Next.js API Routes)             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ /sales  │ │ /health │ │ /finance│ │/content │ │  /time  │   │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                           │
│  │/snapshot│ │/heartbeat│ │ /alerts │                           │
│  └─────────┘ └─────────┘ └─────────┘                           │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  Domain     │  │   Time-     │  │      Configuration      │  │
│  │  JSON Stores│  │   Series    │  │      & Secrets          │  │
│  │             │  │   (CSV)     │  │                         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                  INTEGRATION LAYER                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ Airtable │ │ Activity │ │  Manual  │ │  Future  │           │
│  │   CRM    │ │  Watch   ││   Input  │ │   APIs   │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

## Domain Data Stores

Each domain has a canonical JSON file that serves as the single source of truth:

```
data/
├── sales.json          # Pipeline, leads, MRR, conversion rates
├── health.json         # Weight, workouts, recovery metrics
├── finance.json        # Debt, investments, net worth
├── content.json        # Platform metrics, content pipeline
├── productivity.json   # Time tracking, deep work scores
└── system.json         # Infra health, costs, agent logs
```

### Sales Schema
```json
{
  "mrr": { "current": 0, "target": 10000, "history": [...] },
  "pipeline": [
    { "id": "...", "name": "...", "stage": "...", "value": 0 }
  ],
  "leads": { "thisWeek": 0, "conversionRate": 0 },
  "deals": { "active": 0, "value": 0 }
}
```

### Health Schema
```json
{
  "weight": { "current": 0, "target": 0, "history": [...] },
  "training": { "thisWeek": 0, "adherence": 0 },
  "recovery": { "painLevel": 0, "sleepAvg": 0 },
  "nutrition": { "adherence": 0, "proteinAvg": 0 }
}
```

### Finance Schema
```json
{
  "debt": { "remaining": 21000, "original": 21000, "velocity": 0 },
  "investments": { "monthlyReturn": 0, "target": 7, "positions": [...] },
  "netWorth": 0,
  "monthlySpend": 0
}
```

## API Contract

### GET /api/snapshot
Returns aggregated state across all domains for dashboard rendering.

```json
{
  "generatedAt": "2026-02-09T22:57:00Z",
  "domains": {
    "sales": { /* sales data */ },
    "health": { /* health data */ },
    "finance": { /* finance data */ },
    "content": { /* content data */ },
    "productivity": { /* time data */ },
    "system": { /* infra data */ }
  },
  "alerts": [...],
  "summary": {
    "score": 85,
    "topPriority": "...",
    "status": "healthy"
  }
}
```

### POST /api/health/weight
Log a weight measurement.

```json
{ "weight": 180, "date": "2026-02-09", "notes": "..." }
```

### POST /api/finance/trade
Log a trade.

```json
{ "symbol": "AAPL", "type": "buy", "shares": 10, "price": 150 }
```

## Automation Layer

Scripts in `automation/` handle heartbeat cadence:

```
automation/
├── morning-brief.js       # Generate 7 AM brief
├── evening-prompt.js      # Generate 10 PM reflection
├── weekly-review.js       # Sunday evening synthesis
├── monthly-brief.js       # First Sunday of month
└── health-check.js        # Real-time monitors
```

Each script:
1. Reads domain data stores
2. Applies threshold logic
3. Generates markdown output to `output/`
4. Sends alerts via configured channels

## Dashboard UI Structure

```
app/
├── page.tsx              # Main dashboard (overview)
├── layout.tsx            # Root layout with nav
├── globals.css           # Tailwind + custom styles
├── domains/
│   ├── sales/
│   │   └── page.tsx      # Sales detail view
│   ├── health/
│   │   └── page.tsx      # Health detail view
│   ├── finance/
│   │   └── page.tsx      # Finance detail view
│   └── ...
├── api/
│   ├── snapshot/route.ts
│   ├── sales/route.ts
│   ├── health/route.ts
│   └── ...
└── components/
    ├── DomainCard.tsx    # Reusable domain summary
    ├── MetricChart.tsx   # Time-series visualization
    ├── AlertBanner.tsx   # Critical alerts
    └── Navigation.tsx    # Domain switcher
```

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS, Recharts
- **Backend**: Next.js API Routes (Edge runtime where possible)
- **Data**: JSON files (git-tracked), CSV for time-series
- **Integration**: Airtable SDK, ActivityWatch API (future)
- **Automation**: Node.js scripts, OpenClaw cron
- **Monitoring**: Grafana (existing), custom health checks

## Extensibility

Adding a new domain:

1. Create `data/{domain}.json` with schema
2. Add API route `app/api/{domain}/route.ts`
3. Create detail page `app/domains/{domain}/page.tsx`
4. Update snapshot aggregator
5. Add to heartbeat scripts if needed

## Security

- API routes validate auth tokens (configurable)
- No secrets in JSON data files
- Secrets in `.env`, never committed
- Dashboard runs local-only by default

## Future Integrations

- ActivityWatch (time tracking)
- Firefly III (finance)
- Gadgetbridge (wearables)
- OpenFoodFacts (nutrition)
- Cal.com (calendar)

---

*Living document — evolves with the system*
