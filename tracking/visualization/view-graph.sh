#!/bin/bash
# Spin up the OpenClaw Relationship Graph visualization
# Usage: ./view-graph.sh [port]

PORT=${1:-8080}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🧠 OpenClaw Relationship Graph"
echo "=============================="

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Please install Python 3."
    exit 1
fi

# Generate fresh graph data
echo "📊 Generating graph data from relationship files..."
python3 generate-graph.py

if [ $? -ne 0 ]; then
    echo "⚠️  Warning: Could not generate graph data. Using sample data."
fi

# Check if the graph data was created
if [ -f "graph-data.json" ]; then
    NODE_COUNT=$(python3 -c "import json; print(len(json.load(open('graph-data.json'))['graph']['nodes']))")
    EDGE_COUNT=$(python3 -c "import json; print(len(json.load(open('graph-data.json'))['graph']['edges']))")
    echo "✅ Graph data loaded: $NODE_COUNT nodes, $EDGE_COUNT edges"
else
    echo "ℹ️  Using sample data (no relationship files found)"
fi

# Start HTTP server
echo ""
echo "🚀 Starting visualization server..."
echo "📍 Open: http://localhost:$PORT"
echo ""
echo "Features:"
echo "  • Interactive graph (drag, zoom, click)"
echo "  • Search people by name"
echo "  • Filter by relationship health"
echo "  • Multiple layout options"
echo "  • Dark mode UI"
echo ""
echo "Press Ctrl+C to stop"
echo "=============================="

# Start Python HTTP server
python3 -m http.server $PORT
