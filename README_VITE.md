# CampusConnect — Vite + React + Tailwind (local dev)

This folder contains the CampusConnect web app scaffold built with Vite, React, Tailwind CSS and Framer Motion for animations.

Files added/important:
- `package.json` — scripts and dependencies (vite, react, tailwindcss, framer-motion).
- `vite.config.js` — Vite config with the React plugin.
- `tailwind.config.cjs` and `postcss.config.cjs` — Tailwind/PostCSS configuration (includes CampusConnect brand colors).
- `index.html` — Vite entry that loads `/src/main.jsx`.
- `src/index.css` — Tailwind directives and small fallbacks.
- `src/main.jsx` and `src/App.jsx` — React entry and app (includes animations via Framer Motion).

How to run (PowerShell on Windows):

```powershell
# 1) Install dependencies (only needed once)
npm install

# 2) Start the dev server
npm run dev

# This will print a local URL (e.g. http://localhost:5173) — open it in your browser.
```

Notes:
- This uses a proper build pipeline (Vite + Tailwind) so you get an optimized production build when running `npm run build`.
- Theme toggle persists to `localStorage` and uses Tailwind's `dark` class.
- Animations are implemented with `framer-motion` inside `src/App.jsx`.

Next steps I can do for you:
- Scaffold GitHub Actions workflow to deploy to GitHub Pages or Vercel.
- Convert to TypeScript.
- Add a favicon, logo SVG and social meta tags for sharing.
