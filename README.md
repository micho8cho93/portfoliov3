# CS Educator Portfolio (Astro)

Production-ready static Astro site for a CS educator/thought leader.

## 1) Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

## 2) Build + preview

```bash
npm run build
npm run preview
```

## 3) Scripts

- `npm run dev` – local development server
- `npm run build` – static build output
- `npm run preview` – preview built site
- `npm run lint` – Astro type/content checks

## 4) Content collections

All content is Markdown in `src/content/` and validated by `src/content/config.ts`.

### Blog posts (`src/content/posts/*.md`)
Required frontmatter:
- `title` (string)
- `description` (string)
- `pubDate` (date)

Optional:
- `updatedDate` (date)
- `tags` (string[])
- `draft` (boolean, default false)
- `heroImage` (string)
- `readingTime` (number)

### Courses (`src/content/courses/*.md`)
Required:
- `title`, `description`
- `level`: Beginner | Intermediate | Advanced
- `topics`: string[]
- `duration`: string
- `audience`: string
- `status`: Active | Archived | Planned

Optional:
- `startDate`, `updatedDate` (date)
- `featured` (boolean)

### Projects (`src/content/projects/*.md`)
Required:
- `title`, `description`
- `stack`: string[]
- `role`: string
- `year`: number

Optional:
- `links`: `{ label, url }[]`
- `featured`: boolean

### Resources (`src/content/resources/*.md`)
Required:
- `title`, `description`
- `type`: Rubric | Lesson Plan | Tool | Link | Template | Worksheet
- **At least one of:**
  - `url` (external link), or
  - `file` (local file path in `/public`, e.g. `/resources/worksheet.pdf`)

Optional:
- `tags`: string[]
- `updatedDate`: date

## 5) How to add content

1. Add a new `.md` file to the target collection folder.
2. Use the required frontmatter fields above.
3. Filename becomes the slug (for example `my-post.md` → `/blog/my-post`).
4. For downloadable resources, add files under `public/resources/` and set `file: /resources/<filename>`.

## 6) Routes

- `/` Home + About + featured sections
- `/blog` + `/blog/[slug]`
- `/courses` + `/courses/[slug]`
- `/projects` + `/projects/[slug]`
- `/resources` + `/resources/[slug]`
- `/contact`
- `/rss.xml`
- `/sitemap-index.xml`


## Contributor note

- Never hardcode internal `/...` links directly in pages or components.
- Use route constants/builders from `src/lib/routes.ts` and wrap render-time URLs with `withBase(...)` from `src/utils/withBase.ts` for consistent base-aware links.

## 7) Deployment (static hosting)


### GitHub Pages
1. In GitHub, go to **Settings → Pages** and set **Build and deployment** to **GitHub Actions**.
2. Ensure your default branch is `main` (or update `.github/workflows/deploy.yml` if different).
3. Push to `main`; the **Deploy to GitHub Pages** workflow will build and publish `dist/`.
4. For project repos (`<owner>/<repo>`), Astro automatically uses `base: /<repo>` in CI.

### Cloudflare Pages
1. Connect repo.
2. Build command: `npm run build`
3. Output directory: `dist`

### Netlify
1. New site from Git.
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Import project.
2. Framework preset: Astro.
3. Build/output auto-detected (`npm run build`, `dist`).

## Important configuration

- `astro.config.mjs` auto-configures `site` and `base` during GitHub Actions deploys so GitHub Pages URLs work for both user/org and project sites.
- Outside GitHub Actions, the build uses explicit fallback env vars so local or non-GitHub deploys can mirror production:
  - `PUBLIC_SITE_URL` (preferred, fallback: `SITE_URL`) – canonical origin, e.g. `https://yourname.github.io`.
  - `PUBLIC_BASE_PATH` (preferred, fallback: `BASE_PATH`) – deployment base path, either `/` (user/org pages) or `/portfoliov3` (project pages).
- Normalization rules applied in config:
  - `site` removes trailing slash from the configured origin.
  - `base` always resolves to `/` or `/<project-repo>` style paths (leading slash, no trailing slash).

### Local production-like builds

Use these commands to test the two GitHub Pages deployment modes without GitHub Actions:

```bash
# User/org pages (https://<owner>.github.io/)
PUBLIC_SITE_URL=https://<owner>.github.io PUBLIC_BASE_PATH=/ npm run build

# Project pages (https://<owner>.github.io/portfoliov3/)
PUBLIC_SITE_URL=https://<owner>.github.io PUBLIC_BASE_PATH=/portfoliov3 npm run build
```

These values ensure canonical tags, RSS item URLs, and sitemap URLs are generated with the correct origin + base.
