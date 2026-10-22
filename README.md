# Silas Varga — Portfolio

Real-time collaboration engineer · Berlin. Built with **Astro** (static), plain CSS + tokens, one interactive island.

> Persona is fictional (see `src/data/profile.ts`) — swap in real content by editing `src/data/*` and `src/data/projects.ts`. No markup edits needed for adding a project.

## Stack

- **Astro 7** — `output: 'static'`, zero JS by default, one `client:visible` island for the tape viz.
- **Plain CSS** — `@layer tokens → base → layout → components → utilities`, CSS custom properties, `prefers-reduced-motion` kill-switch.
- **TypeScript** — strict, typed data (`src/data/*.ts`), Zod-ready content schema.
- **Biome** — format + lint.
- **Cloudflare Pages / Netlify / Vercel / GH Pages** — any static host; `astro build` → `dist/`.

No state lib, no component lib, no animation lib, no analytics — intentional.

## Design choices

- **Palette:** warm paper `#F6F3EE` / ink `#12141A` / vermillion `#E85D3F` / phosphor teal `#2FAA8C` — oscilloscope + synth studio, not template defaults.
- **Type:** Instrument Serif (display) + IBM Plex Sans/Mono (body/code), fluid `clamp()` scale, self-hosted via Google with `display=swap` + preconnect (swap to WOFF2 subsets for prod).
- **Layout:** left ledger — 12-col grid, persistent spine (desktop) + marginalia, not centered hero. One bold moment: the `crdt-tapes` canvas.
- **Motion:** single load-in wipe (900 ms), shared `--ease-out` / `--duration-*` tokens, respects `prefers-reduced-motion`.

## Project structure

```
src/
  content/         # (empty, reserved for MDX projects via content.config.ts)
  data/
    profile.ts     # name, bio, currently, socials
    projects.ts    # Project[] — add one entry → new card, no markup
    experience.ts  # Role[]
    skills.ts      # grouped, ho  components/      # presentational only — props in, HTML out
    Hero.astro     # includes tape canvas + script (progressive enhancement)
  layouts/
    Base.astro     # <head>, meta, OG, skip-link, theme script
  styles/
    tokens.css     # single source of truth — colors, space, type, motion
    base.css
    layout.css
  pages/
    index.astro    # shell + site grid, composes sections
public/
  favicon.svg  og.svg  sitemap.xml  robots.txt
```

## Content as data

```ts
// src/data/projects.ts
type Project = {
  slug: string;
  name: string;
  problem: string;        // one-line, problem-first
  role: string;
  stack: string[];
  year: number;
  highlight?: string;
  links?: { repo?: string; demo?: string; writeup?: string };
  featured: boolean;
};
```

Adding a 6th project = one object in `projects.ts`. No component touched.

## Run

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/ — static, works without JS
npm run preview  # serve dist
```

## Quality floor

- [x] Responsive 320px → wide, no horizontal scroll (`overflow-x: clip`, intrinsic `minmax()`, `clamp()`).
- [x] A11y: skip link, `lang`, one `h1`, `aria-labelledby`, `time[datetime]`, `article`, keyboard focus visible, contrast AA (muted 5.19:1, ink 16.6:1), `alt`/`aria-label` on canvas, `prefers-reduced-motion`.
- [x] Perf: HTML 32kB, CSS 28kB raw / 5.1kB gz, JS ~ <15kB for tape; no images to lazy-load, `width`/`height` on canvas, `font-display: swap`.
- [x] Meta: title, description, OG/Twitter, favicon, canonical, `sitemap.xml`.
- [x] Works without JS: all content in HTML, noscript tape fallback, mailto fallback, form degrades.
- Dependencies: only `astro` + `@biomejs/biome` — every dep earns its weight.
