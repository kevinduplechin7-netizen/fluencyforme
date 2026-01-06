import { defineConfig } from 'vite';

// This repo is intentionally a "static-first" site:
// - `npm run dev` uses Vite as a fast local server.
// - `npm run build` copies the already-built static assets into `dist/` for Netlify.
export default defineConfig({
  server: {
    port: 5173,
    strictPort: false
  },
  preview: {
    port: 4173,
    strictPort: false
  }
});
