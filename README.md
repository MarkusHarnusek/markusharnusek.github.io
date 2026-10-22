# Markus Harnúšek — Portfolio

My personal portfolio site. I'm a software engineering student at HTL Leonding, and this site covers my background, skills, projects, and experience, plus ways to get in touch.

## Sections

- **About** — my background and what I'm currently working on
- **Skills** — languages, tools, and areas I work in
- **Projects** — selected school, side, and support projects
- **Experience** — internships and club/student roles
- **Contact** — email and social links

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # preview the production build
```

## Deployment

The site is deployed to GitHub Pages at <https://markusharnusek.github.io> by
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Every push to
`main` builds the site with `withastro/action` and publishes the `dist/` folder
via GitHub Actions.

One-time repository setup: in **Settings → Pages → Build and deployment**, set
**Source** to **GitHub Actions** (not "Deploy from a branch").

Notes:

- The repository is named `markusharnusek.github.io`, so it is a user site
  served from the domain root. That is why `astro.config.mjs` sets `site` but no
  `base` — do not add a `base` unless the repository is renamed.
- If you add a custom domain later, update `site` in `astro.config.mjs`, the
  URLs in `public/robots.txt` and `public/sitemap.xml`, and commit a `CNAME`
  file in `public/`.
- `public/og.png` (1200×630) is the social sharing preview. Re-generate or
  replace it when the branding changes.
