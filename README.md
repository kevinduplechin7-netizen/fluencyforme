# FluentHour (Runnable Static Repo)

This repo is **static-first**: the app files in the repo root are already built.
- `npm run dev` starts a local server (Vite) to run it.
- `npm run build` copies the static site into `dist/` for Netlify (`publish = dist`).

## Local run (Windows)
Right-click: `RUN_DEV.ps1`

Or manually:
- `npm ci`
- `npm run dev`

## Netlify
Build command: `npm run build`
Publish directory: `dist`
