# Plinko Galaxy - 3D Pipeline Dashboard

A cosmic, interactive 3D visualization of your Plinko Solutions sales pipeline. Built with React, Three.js, and Airtable.

![Galaxy Dashboard](https://via.placeholder.com/800x400/0f172a/4f46e5?text=Plinko+Galaxy)

## 🌌 Features

- **3D Galaxy Visualization**: 51+ leads floating as glowing spheres in space
- **Interactive Navigation**: Drag to rotate, scroll to zoom, click spheres for details
- **Live Airtable Sync**: Real-time pipeline data from your CRM
- **Mobile Responsive**: Touch gestures for mobile (pinch, drag, tap)
- **Domain Pillars**: 6 glowing pillars representing Sales, Fitness, Finance, Content, Productivity, Systems
- **Status Colors**: Blue (New), Cyan (Qualified), Yellow (Proposal), Green (Sold), Red (Lost)
- **Auto-refresh**: Updates every 5 minutes

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/Jmx097/openclaw-life-console.git
cd openclaw-life-console/galaxy-3d
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your Airtable Personal Access Token:

```
VITE_AIRTABLE_PAT=your_pat_here
VITE_AIRTABLE_BASE_ID=appvoLtkzliuViGvb
```

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:5173

### 4. Build for Production

```bash
npm run build
```

## 🎮 Controls

| Action | Desktop | Mobile |
|--------|---------|--------|
| Rotate | Drag | Drag |
| Zoom | Scroll | Pinch |
| Select Lead | Click sphere | Tap sphere |
| Close Detail | Click X | Tap X |

## 🏗️ Architecture

```
galaxy-3d/
├── src/
│   ├── Galaxy.tsx      # Main 3D scene with Three.js
│   ├── UIOverlay.tsx   # HUD, stats, lead cards
│   ├── store.ts        # Zustand state management
│   ├── airtable.ts     # Airtable API client
│   └── main.tsx        # App entry point
├── index.html          # HTML template
└── vite.config.ts      # Build configuration
```

## 🎨 Tech Stack

- **React 19** + **TypeScript** - UI framework
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Three.js helpers & abstractions
- **Three.js** - 3D graphics library
- **Zustand** - State management
- **Vite** - Build tool
- **Airtable API** - Data source

## 📊 Data Model

Leads are positioned in 3D space based on:
- **X, Z**: Spiral galaxy distribution (deal size affects radius)
- **Y**: Height (Sold leads float higher, Lost leads sink lower)
- **Color**: Status (New=blue, Qualified=cyan, Proposal=yellow, Sold=green, Lost=red)
- **Size**: Deal value (larger deals = bigger spheres)

## 🚢 Deployment

### Vercel (Recommended)

1. Connect GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_AIRTABLE_PAT` | Airtable Personal Access Token |
| `VITE_AIRTABLE_BASE_ID` | Airtable Base ID |

## 📝 License

MIT - Plinko Solutions
