# Central Tracking Infrastructure

## Quick Links

| Domain | Primary Tracker | Update Frequency |
|--------|-----------------|------------------|
| **Health** | [Fitness Log](health/fitness-log.md) | Weekly |
| **Nutrition** | [Nutrition Log](health/nutrition-log.md) | Daily |
| **Finance** | [Finance Tracker](finance/finance-tracker.md) | Per trade + Monthly |
| **Business** | [Plinko Tracker](business/plinko-tracker.md) | Weekly |
| **Content** | [Content Tracker](content/content-tracker.md) | Weekly + Per post |
| **Relationships** | [Relationship Memory](relationships/relationship-memory.md) | Per interaction |
| **Daily Logs** | [Template](daily-logs/template.md) | Daily |
| **Visualization** | [Launch Graph](visualization/view-graph.sh) | On demand |

---

## Daily Workflow

### Morning (~7:00 AM)
1. Review yesterday's log
2. Weigh in → log weight
3. Check overnight alerts (trading, leads)
4. Plan deep work blocks

### Throughout Day
1. Log meals as you eat
2. Track workouts post-session
3. Log business activity (leads, calls)
4. Note content ideas as they come

### Evening (~10:00 PM)
1. Complete daily reflection
2. Log training if not done
3. Review nutrition totals
4. Flag wins for tracking

---

## Weekly Rhythm (Sunday)

### Morning
- [ ] Weigh in
- [ ] Complete weekly fitness review
- [ ] Compile nutrition adherence score

### Evening
- [ ] Update all trackers
- [ ] Review business pipeline
- [ ] Analyze content performance
- [ ] Plan next week's priorities

---

## Monthly Rhythm (First Sunday)

- [ ] Compile all tracker data
- [ ] Calculate investment returns vs 7% target
- [ ] Review MRR progress to $10k
- [ ] Assess content funnel conversion
- [ ] Update debt payoff velocity
- [ ] Generate monthly brief for OpenClaw

---

## File Structure

```
tracking/
├── README.md                    # This file
├── health/
│   ├── fitness-log.md          # Weekly training, recovery
│   └── nutrition-log.md        # Daily meals, macros
├── finance/
│   └── finance-tracker.md      # Debt, investments, trades
├── business/
│   └── plinko-tracker.md       # Pipeline, MRR, clients
├── content/
│   └── content-tracker.md      # Platform metrics, pipeline
├── relationships/
│   ├── relationship-memory.md  # People, commitments, health
│   └── people/                 # Individual person files
├── visualization/
│   ├── index.html              # Interactive graph UI
│   ├── generate-graph.py       # Parse markdown → JSON
│   ├── view-graph.sh           # Launch server script
│   └── graph-data.json         # Generated (auto-created)
└── daily-logs/
    ├── template.md             # Copy this for new days
    ├── 2026-02-08.md           # Example daily log
    └── archive/                # Old daily logs
```

---

## Integration with OpenClaw

### Automatic (via APIs when connected)
- ActivityWatch time tracking
- Weight scale (if smart scale connected)
- Trading alerts (via agent monitoring)
- Social media metrics (via APIs)

### Manual (you log)
- Workout details, RPE, volume
- Nutrition, meal photos
- Sales calls, pipeline updates
- Content ideas, publishing schedule

### Hybrid (both)
- Daily weight (auto or manual)
- Sleep tracking (wearable + subjective)
- Energy/mood scores (subjective)
- Business wins (flagged in daily log)

---

## Naming Conventions

### Daily Logs
- Format: `YYYY-MM-DD.md`
- Example: `2026-02-08.md`
- Store in `daily-logs/` root
- Move to `daily-logs/archive/` after 30 days

### Weekly Reviews
- Create new file each week: `tracking/weekly-reviews/2026-W06.md`
- Reference tracker data, don't duplicate

### Monthly Briefs
- Store in: `tracking/monthly-briefs/2026-02.md`
- Full synthesis of all trackers

---

## Key Metrics Dashboard

### Health
- Current weight: ___ lbs (7-day avg)
- Pull-up max: ___ reps
- Pain level: ___/10
- Sleep avg: ___ hours

### Finance
- Debt remaining: $___ / $21,000
- Monthly return: ___% (target: 7%)
- Net worth: $___
- Open positions: ___

### Business
- Current MRR: $___ / $10,000
- Pipeline value: $___
- Active clients: ___
- Leads this week: ___

### Content
- YouTube subs: ___
- Skool members: ___
- Content pieces this week: ___
- Funnel conversion: ___%

---

## Relationship Memory System

Track people, commitments, and relationship health across your network.

### What It Tracks
- **People**: Investors, clients, connectors, peers
- **Relationship Health**: Strong → Warm → Cooling → At Risk
- **Commitments**: What you promised, when it's due
- **Interaction History**: Calls, emails, meetings with context
- **Projects/Deals**: Link people to active opportunities

### Key Files
- `relationships/relationship-memory.md` - Master relationship directory
- `relationships/people/` - Individual person files (optional)
- `visualization/graph-data.json` - Generated graph data

### Quick Commands
```bash
# View interactive relationship graph
cd tracking/visualization
./view-graph.sh

# Generate fresh graph data
python3 visualization/generate-graph.py
```

### Graph Features
- 🎯 **Interactive**: Drag, zoom, click nodes for details
- 🔍 **Search**: Find people by name or role
- 🎨 **Color-coded**: Green (strong), Orange (warm), Red (at risk)
- 📊 **Shapes**: Diamond (investor), Square (client), Triangle (connector), Hexagon (project)
- 🔥 **Filters**: Show only cooling relationships or overdue commitments
- 📐 **Layouts**: Force-directed, hierarchical, circular

---

## Visualization

### Launch the Graph
```bash
cd tracking/visualization
./view-graph.sh [port]
```

Default port is 8080. Opens at `http://localhost:8080`

### How It Works
1. Parses `relationships/*.md` files
2. Extracts people, projects, and connections
3. Generates `graph-data.json`
4. Serves interactive vis-network visualization

### Tech Stack
- **vis-network**: Free, open-source graph library (Apache 2.0)
- **Python**: Data extraction and JSON generation
- **Pure HTML/JS**: No build step, runs in any browser
- **Dark mode UI**: Matches GitHub's dark theme

### No yFiles Required
- vis-network is **100% free** (unlike yFiles)
- No license fees
- Runs entirely local
- Export to PNG/SVG supported

---

## Automation Roadmap

### Phase 1 (Now)
- Manual logging with structured templates
- Daily reflection prompts from OpenClaw
- Weekly reminder to update trackers

### Phase 2 (Next)
- ActivityWatch auto-sync
- Trading alert bot for entry/exit signals
- Weight scale integration

### Phase 3 (Later)
- Nutrition photo → macro estimation
- Wearable sleep/HRV sync
- CRM auto-updates from calendar

---

## Maintenance

- **Daily**: Log in trackers, complete reflection
- **Weekly**: Review and update all trackers
- **Monthly**: Archive old daily logs, validate data
- **Quarterly**: Full system audit, tool evaluations

---

*Last updated: 2026-02-07*
*Version: 1.1 - Added Relationship Memory & Visualization*
