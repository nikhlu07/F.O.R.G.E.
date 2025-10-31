# Vercel Deployment Instructions for F.O.R.G.E.

## Quick Deployment Steps

### For Vercel Deployment:

1. **Go to Vercel Dashboard**: https://vercel.com
2. **Import your Git repository**: `https://github.com/nikhlu07/F.O.R.G.E.`
3. **Configure the project**:
   - **Root Directory**: Set to `forge-app` (IMPORTANT!)
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build` (already set)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (already set)

4. **Environment Variables** (Optional for demo - app works in mock mode):
   ```
   NEXT_PUBLIC_HEDERA_NETWORK=testnet
   ```

5. **Deploy!**

---

## After Deployment

Your app will be available at:
- **Main Landing Page**: `https://your-project.vercel.app/`
- **Pitch Deck**: `https://your-project.vercel.app/pitch.html`
- **Live Dashboard**: `https://your-project.vercel.app/live-dashboard`
- **Demo Pages**: `https://your-project.vercel.app/demo`

---

## Important Notes

### Root Directory Setting
**CRITICAL**: You MUST set the root directory to `forge-app` in Vercel project settings. Otherwise, Vercel will try to build from the root directory and fail.

### Directory Structure
```
Forge/
├── forge-app/           ← Vercel should build from here
│   ├── app/
│   ├── public/
│   │   └── pitch.html   ← Standalone pitch deck
│   ├── package.json
│   └── next.config.ts
├── autonomous_fraud_engine/
├── fraud_engine/
└── pitch deck/
```

---

## Troubleshooting

### "Empty Deployment"
- **Solution**: Make sure Root Directory is set to `forge-app` in Vercel project settings
- Go to: Project Settings → General → Root Directory

### Build Errors
- Check that all dependencies are in `package.json`
- Run `npm run build` locally first to test
- Check Vercel build logs for specific errors

### Pitch Deck Not Showing
- Pitch deck is at: `/pitch.html`
- Make sure `pitch.html` is in `forge-app/public/` folder
- Files in `public/` are served as static assets in Next.js

### Environment Variables
- The app works in mock mode without Hedera credentials
- For full functionality, add environment variables in Vercel dashboard
- Go to: Project Settings → Environment Variables

---

## Testing Before Deployment

```bash
cd forge-app
npm install
npm run build
npm start
```

Visit: http://localhost:3000 and verify everything works.

---

## One-Click Deploy

You can also use the Vercel CLI:

```bash
npm i -g vercel
cd forge-app
vercel
```

Follow the prompts and specify `forge-app` as the root directory.

---

## Contact

If you encounter issues, check:
1. Root directory is set correctly
2. Build logs in Vercel dashboard
3. All files are pushed to GitHub

Happy deploying! 🚀

