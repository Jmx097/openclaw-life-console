# OpenClaw Life Console

**Self-hosted Personal Operating System Dashboard**

## Overview

A unified command center for managing 6 life domains:
- 💼 Sales & Revenue
- 💪 Fitness & Health  
- 💰 Finance & Investments
- 📢 Content & Audience
- ⏱️ Productivity & Time
- ⚙️ Systems & Automation

## Quick Start

```bash
cd /home/ubuntu/.openclaw/workspace/dashboard

# Install dependencies
npm install

# Run development server
npm run dev

# Dashboard available at http://localhost:3000
```

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Next.js    │────▶│  API Routes │────▶│  JSON Data  │
│  Dashboard  │     │  (/api/*)   │     │  Stores     │
└─────────────┘     └─────────────┘     └─────────────┘
       │
       ▼
┌─────────────┐
│ Automation  │
│  Scripts    │
└─────────────┘
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/snapshot` | Full system state across all domains |
| `GET /api/health` | Health & fitness data |
| `POST /api/health` | Log weight, workout, recovery |
| `GET /api/sales` | Sales pipeline & MRR |
| `POST /api/sales` | Log lead, deal, sale |
| `GET /api/finance` | Debt, investments, net worth |
| `POST /api/finance` | Log trade, debt payment |
| `GET /api/content` | Platform metrics, content pipeline |
| `POST /api/content` | Log post, update metrics |
| `GET /api/productivity` | Time tracking, deep work |
| `POST /api/productivity` | Log deep work hours |
| `GET /api/system` | Infrastructure health, costs |
| `POST /api/system` | Log cost, health check |

## Data Storage

All data stored in `/home/ubuntu/.openclaw/workspace/data/` as JSON files:
- `sales.json` — Pipeline, MRR, leads
- `health.json` — Weight, workouts, recovery
- `finance.json` — Debt, investments, net worth
- `content.json` — Platform metrics, content pipeline
- `productivity.json` — Time tracking, deep work
- `system.json` — Infrastructure, costs, alerts

## Automation (Heartbeat Cadence)

Scripts in `/home/ubuntu/.openclaw/workspace/automation/`:

```bash
# Morning brief (7:00 AM daily)
node automation/morning-brief.js

# Evening reflection prompt (10:00 PM daily)
node automation/evening-prompt.js

# Weekly review (Sunday evening)
node automation/weekly-review.js

# Health check (every 15 minutes)
node automation/health-check.js
```

### Setup Cron Jobs

```bash
# Edit crontab
crontab -e

# Add these lines:
0 7 * * * cd /home/ubuntu/.openclaw/workspace && node automation/morning-brief.js >> logs/morning.log 2>&1
0 22 * * * cd /home/ubuntu/.openclaw/workspace && node automation/evening-prompt.js >> logs/evening.log 2>&1
0 18 * * 0 cd /home/ubuntu/.openclaw/workspace && node automation/weekly-review.js >> logs/weekly.log 2>&1
*/15 * * * * cd /home/ubuntu/.openclaw/workspace && node automation/health-check.js >> logs/health.log 2>&1
```

## Extending

### Add a New Domain

1. Create `data/newdomain.json`
2. Add API route `app/api/newdomain/route.ts`
3. Update `app/api/snapshot/route.ts`
4. Add card to `app/page.tsx`
5. Create detail page `app/domains/newdomain/page.tsx`

### Customize Alerts

Edit `automation/health-check.js` to add new checks:

```javascript
if (someCondition) {
  alerts.push({
    id: 'my-alert',
    message: 'Something needs attention',
    severity: 'warning',
    domain: 'mydomain'
  })
}
```

## Integrations

### Airtable (Sales CRM)
- Base: Plinko Solutions Lead Base
- Tables: Leads, Activities, Deals
- Webhook: `scripts/plinko-webhook-handler.sh`

### ActivityWatch (Time Tracking)
- Status: Planned integration
- Endpoint: http://localhost:5600/api

### Future Integrations
- Firefly III (Finance)
- Gadgetbridge (Wearables)
- OpenFoodFacts (Nutrition)

## Development

```bash
# Run in dev mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## File Structure

```
workspace/
├── dashboard/              # Next.js app
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── components/    # React components
│   │   ├── domains/       # Detail pages
│   │   ├── page.tsx       # Main dashboard
│   │   └── layout.tsx     # Root layout
│   ├── package.json
│   └── next.config.js
├── data/                  # JSON data stores
├── automation/            # Heartbeat scripts
├── output/                # Generated briefs/reports
├── ARCHITECTURE.md        # System architecture
└── README.md              # This file
```

## Security

- No secrets in code
- API keys in `.env` (not committed)
- Dashboard runs local-only by default
- Optional auth via `AUTH_TOKEN` env var

## License

MIT — Built for personal use. Modify freely.

---

**OpenClaw Life Console v2.0** — *Quantify what matters, automate what doesn't.*
