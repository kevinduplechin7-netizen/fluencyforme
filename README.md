# FluentHour Language Sessions (Static-first)

This repo is a static site packaged with a tiny Vite wrapper so it can:
- run locally with `npm run dev`
- build a Netlify-deployable `dist/` folder with `npm run build`

## Local dev

```powershell
npm install
npm run dev
```

Or run:

```powershell
./RUN_DEV.ps1
```

## Netlify

Netlify uses:
- Build command: `npm run build`
- Publish directory: `dist`

Those are already set in `netlify.toml`.
