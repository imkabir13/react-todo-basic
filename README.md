# React To‑Do (Vite + TypeScript)

A very basic to‑do app you can run locally and deploy anywhere.

## Prerequisites
- Node.js 18+ (Node 20 recommended)
- npm or yarn or pnpm

## Run locally
```bash
npm install
npm run dev
```
Then open the URL printed in your terminal (usually http://localhost:5173).

## Build for production
```bash
npm run build
npm run preview   # serve the built app to test locally
```

## Deploy
- Any static host works: Netlify, Vercel (as static), GitHub Pages, S3 + CloudFront, Nginx, etc.
- The build output goes to `dist/`.

## Features
- Add, toggle complete, delete tasks
- Persist tasks in `localStorage`
- Minimal, clean UI
