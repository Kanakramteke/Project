# Welcome Page — React + Tailwind (CDN demo)

This folder contains a polished welcome page built with React and Tailwind CSS using CDN builds so you can preview it immediately without a build step.

Files included:
- `index.html` — Loads React, ReactDOM, Babel and Tailwind (Play CDN). Mounts the React app.
- `css/styles.css` — Minimal fallback styles (mostly unused; Tailwind provides main styling).
- `js/app.jsx` — React app (Header, Hero, Features, Contact, Footer) using Tailwind utility classes.

How to view locally (PowerShell):

```powershell
# from the project root (where index.html lives)
# if you have Python installed (works with Python 3.x):
python -m http.server 8000; Start-Process "http://localhost:8000"

# Or just open the file directly (double-click `index.html`).
```

Notes:
- This demo uses the Tailwind Play CDN (https://cdn.tailwindcss.com) to apply Tailwind utilities at runtime. It's perfect for prototypes and demos. For production, convert to a proper build (Vite, Tailwind CLI) and use the official Tailwind build pipeline.
- The theme toggle sets the `dark` class on the document root (Tailwind's class-based dark mode). Preference is stored in `localStorage`.

Next steps you might want:
- Convert this to a Vite + React project with Tailwind installed (I can scaffold `package.json`, `vite.config.js`, and `tailwind.config.cjs`).
- Add a logo SVG, favicon, and social meta tags.
- Add animations (Framer Motion) or more interactive components.
