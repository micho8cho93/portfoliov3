export const home = '/';
export const about = '/about';
export const teaching = '/teaching';
export const learning = '/learning';
export const institutions = '/institutions';
export const blog = '/blog';
export const projects = '/projects';
export const courses = '/courses';
export const resources = '/resources';
export const contact = '/contact';
export const rss = '/rss.xml';

export const routeLabels = {
  home: 'Home',
  teaching: 'Teaching',
  learning: 'Learning',
  institutions: 'Institutions',
  projects: 'Projects',
  resources: 'Resources',
  blog: 'Blog',
  about: 'About',
  contact: 'Contact',
  courses: 'Courses',
  rss: 'RSS'
} as const;

function normalizeSlug(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, '');
}

export function blogPost(slug: string): string {
  return `${blog}/${normalizeSlug(slug)}`;
}

export function project(slug: string): string {
  return `${projects}/${normalizeSlug(slug)}`;
}

export function courseRoute(slug: string): string {
  return `${courses}/${normalizeSlug(slug)}`;
}

export function lessonRoute(courseSlug: string, lessonSlug: string): string {
  return `${courseRoute(courseSlug)}/lessons/${normalizeSlug(lessonSlug)}`;
}

export function capstoneRoute(courseSlug: string, capstoneSlug: string): string {
  return `${courseRoute(courseSlug)}/capstone/${normalizeSlug(capstoneSlug)}`;
}

export function course(slug: string): string {
  return courseRoute(slug);
}

export function resource(slug: string): string {
  return `${resources}/${normalizeSlug(slug)}`;
}
