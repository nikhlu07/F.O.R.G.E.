# F.O.R.G.E. Demo Instructions

## Quick Demo Guide

### Option 1: Pitch Deck (Standalone HTML)
The pitch deck is a standalone HTML presentation you can open directly in your browser.

**Windows:**
```bash
# Double-click demo-pitch.bat
# OR
cd forge-app
start pitch.html
```

**Mac/Linux:**
```bash
# Run the shell script
chmod +x forge-app/demo-pitch.sh
./forge-app/demo-pitch.sh

# OR directly
cd forge-app
open pitch.html  # Mac
# OR
xdg-open pitch.html  # Linux
```

**Manual:**
- Navigate to `forge-app/pitch.html`
- Double-click to open in your browser
- Navigate slides using arrow keys or on-screen buttons

### Option 2: Next.js Application (Full Demo)
For the full interactive application:

**Start the development server:**
```bash
cd forge-app
npm run dev
```

Then open in browser:
- Main Landing Page: http://localhost:3000
- Live Dashboard: http://localhost:3000/live-dashboard
- Demo Dashboards: http://localhost:3000/demo
- Vendor Dashboard: http://localhost:3000/vendor

### Option 3: Production Build
For a production-ready demo:

```bash
cd forge-app
npm run build
npm start
```

Access the same URLs as above but on the production build.

---

## What to Demo

### Pitch Deck (10 slides)
1. **Title Slide** - Project introduction
2. **Problem Statement** - Corruption in government spending
3. **Solution Overview** - Autonomous fraud detection
4. **Key Features** - Transparency, immutability, AI-powered
5. **Technology Stack** - Hedera, smart contracts, ML
6. **Architecture** - System design overview
7. **Use Cases** - Real-world applications
8. **Impact Metrics** - Success stories and numbers
9. **Roadmap** - Future development
10. **Call to Action** - Get involved

### Full Application Features
- **Flow Orchestrator**: Complete disbursement workflow demo
- **Fraud Detection**: Real-time fraud scoring
- **Dashboard Views**: Government, Auditor, Citizen, Vendor perspectives
- **Hedera Integration**: Live blockchain transactions
- **AI Auditor**: Automated investigation tools

---

## Presentation Tips

1. Start with the pitch deck for overview (5 min)
2. Switch to live demo for hands-on features (10 min)
3. Highlight unique value propositions:
   - Immutability through Hedera blockchain
   - AI-powered fraud detection
   - Multi-party transparency
   - Automated workflow orchestration

---

## Troubleshooting

**Pitch deck not opening?**
- Make sure you're in the `forge-app` directory
- Try opening `pitch.html` manually with a browser
- Check that JavaScript is enabled

**Next.js dev server issues?**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Build errors?**
- Run `npm run build` to check for errors
- Ensure all dependencies are installed
- Check that all environment variables are set

---

## Environment Setup

If you need Hedera integration:
```bash
# Create .env.local file
cd forge-app
echo HEDERA_ACCOUNT_ID=your_account_id > .env.local
echo HEDERA_PRIVATE_KEY=your_private_key >> .env.local
echo HEDERA_NETWORK=testnet >> .env.local
echo HCS_TOPIC_ID=your_topic_id >> .env.local
```

Note: For demo purposes, most features work in mock mode without real Hedera credentials.

