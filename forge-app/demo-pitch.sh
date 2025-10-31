#!/bin/bash

# F.O.R.G.E. Pitch Deck Demo Script

echo "========================================"
echo "  F.O.R.G.E. PITCH DECK DEMO"
echo "========================================"
echo ""
echo "Opening pitch deck in your default browser..."
echo ""

# Get the directory where the script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

# Open the pitch deck HTML file
if command -v xdg-open > /dev/null; then
    xdg-open pitch.html
elif command -v open > /dev/null; then
    open pitch.html
else
    echo "Could not find a way to open the browser. Please open pitch.html manually."
    exit 1
fi

echo "Pitch deck opened!"
echo ""
echo "Navigate slides using arrow keys or the buttons on screen."

