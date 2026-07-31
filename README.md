# Easy Rx Cycle — Website

Marketing + shop site for Easy Rx Cycle, built on **Next.js (App Router)** and deployed to **Cloudflare Pages**. This is the real codebase — staging and production are the same build, just different Pages environments/URLs.

## Stack
- **Next.js 16** (App Router, TypeScript) — currently static export (`output: "export"`), ready to move to SSR/ISR for programmatic pages later.
- **Self-hosted fonts** — Poppins + Inter in `public/fonts` (no external font CDN).
- **Assets** — logo and imagery in `public/images`.
- Brand system lives in `app/globals.css` (Deep Teal `#005770`, Emerald `#33C089`, Poppins/Inter).

## Local development
```bash
npm install
npm run dev      # http://localhost:3000
```

## Production build
```bash
npm run build    # generates the static site into ./out
```

## Deploy — Cloudflare Pages (auto-deploy on every push)
Connect this GitHub repo in the Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**, then:

| Setting | Value |
|---|---|
| Framework preset | **Next.js (Static HTML Export)** |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | `20` (env var `NODE_VERSION=20`) |

Every push to `main` triggers a new deploy. Feature branches get their own preview URLs.

## Structure
```
app/
  layout.tsx        Root layout + metadata
  page.tsx          Homepage
  globals.css       Brand system + all page styles
components/
  Reveal.tsx        Scroll-reveal (IntersectionObserver)
public/
  fonts/            Poppins + Inter (self-hosted)
  images/           Logo + imagery
```
