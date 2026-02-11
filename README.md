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

## 7) Deployment (static hosting)

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

Update `site` in `astro.config.mjs` from `https://example.com` to your real domain for canonical URLs, sitemap, and RSS links.
