# LifeOS Dashboard v2.0 — Build Status

**Status**: ✅ Core Architecture Complete  
**Date**: 2026-02-09  
**Commit**: 7ead9ec

---

## What Was Built

### 1. Data Layer (`/data/`)
Six JSON data stores serving as single source of truth:

| File | Domain | Key Metrics |
|------|--------|-------------|
| `sales.json` | Sales & Revenue | MRR, pipeline, leads, conversion rates |
| `health.json` | Fitness & Health | Weight, workouts, recovery, nutrition |
| `finance.json` | Finance & Investments | Debt, investments, returns, net worth |
| `content.json` | Content & Audience | Platform metrics, content pipeline |
| `productivity.json` | Productivity & Time | Deep work hours, time tracking |
| `system.json` | Systems & Automation | Costs, health checks, infrastructure |

### 2. API Layer (`/dashboard/app/api/`)
RESTful endpoints for each domain:

```
GET  /api/snapshot          → Full system state
GET  /api/sales             → Sales data
POST /api/sales             → Log lead/deal/sale
GET  /api/health            → Health data
POST /api/health            → Log weight/workout/recovery
GET  /api/finance           → Finance data
POST /api/finance           → Log trade/debt payment
GET  /api/content           → Content data
POST /api/content           → Log post/metrics
GET  /api/productivity      → Productivity data
POST /api/productivity      → Log deep work
GET  /api/system            → System data
POST /api/system            → Log cost/health check
```

### 3. Dashboard UI (`/dashboard/app/`)
Next.js 14 application with:

- **Main Dashboard** (`page.tsx`): 6-domain grid, health score, alerts
- **Components**:
  - `SnapshotHeader`: Health score + status + top priority
  - `DomainCard`: Reusable domain summary with metrics + progress bars
  - `AlertBanner`: Severity-based alert display
- **Styling**: Tailwind CSS, dark theme, custom scrollbar

### 4. Automation Scripts (`/automation/`)
Heartbeat cadence automation:

| Script | Frequency | Output |
|--------|-----------|--------|
| `morning-brief.js` | Daily 7:00 AM | `output/morning-brief-YYYY-MM-DD.md` |
| `evening-prompt.js` | Daily 10:00 PM | `output/evening-reflection-YYYY-MM-DD.md` |
| `weekly-review.js` | Sunday 6:00 PM | `output/weekly-review-YYYY-W##.md` |
| `health-check.js` | Every 15 min | Updates `data/system.json` alerts |

### 5. Documentation

- `ARCHITECTURE.md` — System architecture, API contracts, extensibility guide
- `dashboard/README.md` — Quick start, API reference, development guide

---

## File Structure

```
workspace/
├── ARCHITECTURE.md              # System architecture
├── data/                        # JSON data stores (6 domains)
│   ├── sales.json
│   ├── health.json
│   ├── finance.json
│   ├── content.json
│   ├── productivity.json
│   └── system.json
├── dashboard/                   # Next.js application
│   ├── README.md
│   ├── app/
│   │   ├── api/                 # API routes (7 endpoints)
│   │   ├── components/          # React components (3)
│   │   ├── page.tsx             # Main dashboard
│   │   ├── layout.tsx           # Root layout
│   │   └── globals.css          # Tailwind + custom styles
│   ├── package.json             # Scripts: dev, build, export
│   └── next.config.js           # Static export config
├── automation/                  # Heartbeat scripts (4)
│   ├── morning-brief.js
│   ├── evening-prompt.js
│   ├── weekly-review.js
│   └── health-check.js
└── output/                      # Generated briefs/reports
```

---

## Running the Dashboard

### Development Mode
```bash
cd /home/ubuntu/.openclaw/workspace/dashboard
npm run dev
# Opens at http://localhost:3000
```

### Build for Production
```bash
cd /home/ubuntu/.openclaw/workspace/dashboard
npm run build
# Output in dashboard/dist/
```

### Run Automation Scripts
```bash
cd /home/ubuntu/.openclaw/workspace

# Morning brief
node automation/morning-brief.js

# Evening reflection
node automation/evening-prompt.js

# Weekly review
node automation/weekly-review.js

# Health check
node automation/health-check.js
```

### Setup Cron Jobs
```bash
crontab -e

# Add:
0 7 * * * cd /home/ubuntu/.openclaw/workspace && node automation/morning-brief.js
0 22 * * * cd /home/ubuntu/.openclaw/workspace && node automation/evening-prompt.js
0 18 * * 0 cd /home/ubuntu/.openclaw/workspace && node automation/weekly-review.js
*/15 * * * * cd /home/ubuntu/.openclaw/workspace && node automation/health-check.js
```

---

## Integration Points

### Already Connected
- ✅ Airtable (Plinko CRM) via webhook handler
- ✅ File-based data persistence
- ✅ JSON API for all domains

### Ready for Integration
- ⏳ ActivityWatch (time tracking)
- ⏳ Firefly III (finance)
- ⏳ Gadgetbridge (wearables)
- ⏳ Cal.com (calendar/bookings)

---

## Health Score Algorithm

The dashboard calculates an overall health score (0-100):

**Base score**: 100

**Deductions**:
- No weight logged: -10
- No training data: -5
- MRR at $0: -5
- Debt unchanged: -5
- No deep work tracked: -5
- Each overdue action: -3

**Status thresholds**:
- 80-100: Healthy (green)
- 50-79: Degraded (yellow)
- 0-49: Critical (red)

---

## Alerts System

Health check monitors:

1. **LLM Budget** — 50% (info), 80% (warning), 100% (critical)
2. **Stale weight data** — Alert if >7 days since last weigh-in
3. **No leads** — Alert if no leads by weekend
4. **Debt velocity** — Alert if payoff stalled

Alerts stored in `data/system.json` and displayed in dashboard.

---

## Next Steps (Recommended)

### Immediate (This Week)
1. **Test dashboard build** — Run `npm run build` in dashboard/
2. **Set up cron** — Schedule automation scripts
3. **Log initial data** — First weight, workout, baseline metrics

### Short Term (Next 2 Weeks)
4. **Connect ActivityWatch** — Automate time tracking
5. **Integrate Firefly III** — Or build simple finance tracker
6. **Create detail pages** — Add `/domains/[domain]/page.tsx` for deep dives

### Medium Term (This Month)
7. **Charts & Visualization** — Add Recharts time-series graphs
8. **Mobile responsive** — Optimize for phone/tablet
9. **Auth layer** — Optional password protection

---

## API Usage Examples

### Log Weight
```bash
curl -X POST http://localhost:3000/api/health \
  -H "Content-Type: application/json" \
  -d '{"type": "weight", "weight": 180, "date": "2026-02-09"}'
```

### Log Lead
```bash
curl -X POST http://localhost:3000/api/sales \
  -H "Content-Type: application/json" \
  -d '{"type": "lead", "source": "website"}'
```

### Get Full Snapshot
```bash
curl http://localhost:3000/api/snapshot
```

---

## Design Decisions

1. **File-first data**: JSON files are git-tracked, human-readable, zero-config
2. **No database**: Eliminates setup complexity; scales to ~10k records per domain
3. **Static export**: Can host on any static server; no Node.js runtime needed for prod
4. **Node automation**: Scripts work standalone; dashboard is optional view
5. **Health score**: Single number summarizes system state at a glance

---

## Performance Targets

- Dashboard load: <2s
- API response: <100ms
- Health check: <500ms
- Snapshot generation: <200ms

---

*Built with Next.js 14, Tailwind CSS, and Node.js. No external database required.*
