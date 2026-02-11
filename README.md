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
- `courseId`: unique ID used to link lessons
- `level`: Beginner | Intermediate | Advanced
- `topics`: string[]
- `duration`: string
- `audience`: string
- `status`: Active | Archived | Planned

Optional:
- `skills`: string[]
- `prereqs`: string[]
- `estimatedHours`: number
- `coverImage`: string
- `startDate`, `updatedDate` (date)
- `featured` (boolean)

### Lessons (`src/content/lessons/**/*.mdx`)
Required:
- `courseId`: matches a course file’s `courseId`
- `moduleId`: stable identifier for grouping
- `moduleTitle`: visible module label
- `title`, `description`
- `order`: lesson order inside course flow
- `estimatedMinutes`: reading/activity estimate
- `objectives`: string[]

Optional:
- `prereqs`: string[]
- `draft`: boolean
- `updatedDate`: date

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

## 5) Course and lesson authoring workflow

### Course creation workflow
1. Create a new file in `src/content/courses/<course-slug>.md`.
2. Set a unique `courseId` in frontmatter (this is the join key for lessons).
3. Add high-level metadata (`skills`, `prereqs`, `estimatedHours`) for the landing page.
4. Write overview copy in the markdown body.

### Lesson creation workflow
1. Copy `src/content/lessons/_templates/lesson-template.mdx`.
2. Place lesson files under `src/content/lessons/<course-id>/<module-folder>/`.
3. Fill required frontmatter and set `order` for navigation.
4. Add MDX body content with headings (`##`, `###`) for automatic TOC generation.
5. Keep `courseId` aligned with the course metadata file.

### Folder structure

```text
src/content/
  courses/
    <course-slug>.md
  lessons/
    _templates/
      lesson-template.mdx
    <course-id>/
      <module-folder>/
        <lesson-slug>.mdx
```

### How ordering works
- Lesson pages are sorted by `order` (ascending) per course.
- Modules are grouped by `moduleId` and displayed using the first lesson order.
- Prev/next navigation uses the ordered lesson list for the course.

### Embedding interactive components in lessons
Import components in MDX and hydrate only where needed:

```mdx
import Quiz from '../../../../components/course/Quiz';
import FreeResponse from '../../../../components/course/FreeResponse';
import LessonChecklist from '../../../../components/course/LessonChecklist';
import Callout from '../../../../components/course/Callout.astro';
import Hint from '../../../../components/course/Hint.astro';

<Quiz client:load ... />
<FreeResponse client:load ... />
<LessonChecklist client:load ... />
<Callout type="info">...</Callout>
<Hint summary="Need help?">...</Hint>
```

Interactive component state persists in `localStorage` using keys in this format:
`courseId:lessonSlug:componentId`.

## 6) Routes

- `/` Home + About + featured sections
- `/blog` + `/blog/[slug]`
- `/courses` + `/courses/[slug]`
- `/courses/[course]/lessons/[lesson]`
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
