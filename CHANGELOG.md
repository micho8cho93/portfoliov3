# Changelog

## 2026-02-11

- Extended Astro content schemas in `/Users/Michel/Desktop/portfoliov3/src/content/config.ts` for lesson practice blocks (`tryIts`, `breakIts`, `fixIts`, `checks`) and course capstone metadata.
- Added a new `capstones` collection and authored `/Users/Michel/Desktop/portfoliov3/src/content/capstones/intro-to-python-capstone.mdx`.
- Added reusable course UX components: `/Users/Michel/Desktop/portfoliov3/src/components/course/CodeBlock.astro`, `/Users/Michel/Desktop/portfoliov3/src/components/course/TryIt.astro`, `/Users/Michel/Desktop/portfoliov3/src/components/course/BreakIt.astro`, `/Users/Michel/Desktop/portfoliov3/src/components/course/FixIt.astro`, and `/Users/Michel/Desktop/portfoliov3/src/components/course/LessonNav.astro`.
- Updated lesson/course rendering in `/Users/Michel/Desktop/portfoliov3/src/pages/courses/[course]/lessons/[lesson].astro`, `/Users/Michel/Desktop/portfoliov3/src/components/course/CourseLayout.astro`, and `/Users/Michel/Desktop/portfoliov3/src/pages/courses/[slug].astro`.
- Added capstone routing page at `/Users/Michel/Desktop/portfoliov3/src/pages/courses/[course]/capstone/[capstone].astro` and route helper support in `/Users/Michel/Desktop/portfoliov3/src/lib/routes.ts`.
- Added Intro to Python course content at `/Users/Michel/Desktop/portfoliov3/src/content/courses/intro-to-python.mdx` and six lesson files under `/Users/Michel/Desktop/portfoliov3/src/content/lessons/intro-to-python/`.
