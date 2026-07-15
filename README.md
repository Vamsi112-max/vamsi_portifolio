# Vamsi Raju — Portfolio

A static, framework-free portfolio (HTML/CSS/JS) for Inampudi Durga Vamsi Krishnam Raju.

## Structure

```
.
├── index.html              # Main one-page site (hero → about → experience → projects → skills → education → certifications → leadership → contact)
├── resume.html              # Inline PDF résumé viewer + download + quick-look summary
├── 404.html                 # Custom not-found page
├── styles.css               # Design system + all styles, fully responsive
├── script.js                 # Sidebar drawer, active-section tracking, scroll reveal, card glow, animated counters
├── assets/
│   ├── favicon.svg
│   └── Vamsi_Resume.pdf     # Downloadable résumé, embedded on resume.html
├── projects/
│   ├── omniroot.html
│   ├── atomsphere.html
│   ├── genai-task.html
│   ├── trackwise.html
│   └── iot-agriculture.html
└── README.md
```

All content is sourced only from the resume — no invented stats, links, or achievements. Live links are shown only for the two projects that actually have deployed demos (OmniRoot Agentic AI, AtomSphere Nexus); the rest are marked as internal/hardware builds, matching the résumé exactly.

## Run locally

No build step. Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

1. Create a new repo (e.g. `portfolio`) and push these files to the root of the `main` branch.
2. In the repo, go to **Settings → Pages**, set source to `main` / `root`.
3. Your site will be live at `https://<username>.github.io/<repo>/`.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel, click **Add New → Project**, import the repo.
3. Framework preset: **Other** (static). Build command: none. Output directory: `.`
4. Deploy — no environment variables or backend needed.

## Editing content

- Update resume-based content directly in `index.html` and the files inside `projects/`.
- Colors, fonts, and spacing are controlled by CSS custom properties at the top of `styles.css` (`:root { ... }`).
