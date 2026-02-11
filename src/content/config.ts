import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
    readingTime: z.number().optional()
  })
});

const courses = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    courseId: z.string(),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
    topics: z.array(z.string()),
    duration: z.string(),
    audience: z.string(),
    status: z.enum(['Active', 'Archived', 'Planned']),
    skills: z.array(z.string()).optional(),
    prereqs: z.array(z.string()).optional(),
    estimatedHours: z.number().optional(),
    coverImage: z.string().optional(),
    startDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    featured: z.boolean().optional()
  })
});

const lessons = defineCollection({
  type: 'content',
  schema: z.object({
    courseId: z.string(),
    moduleId: z.string(),
    moduleTitle: z.string(),
    title: z.string(),
    description: z.string(),
    order: z.number(),
    estimatedMinutes: z.number(),
    objectives: z.array(z.string()),
    prereqs: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    updatedDate: z.coerce.date().optional()
  })
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    stack: z.array(z.string()),
    role: z.string(),
    year: z.number(),
    links: z.array(z.object({ label: z.string(), url: z.string().url() })).optional(),
    featured: z.boolean().optional()
  })
});

const resources = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      type: z.enum(['Rubric', 'Lesson Plan', 'Tool', 'Link', 'Template', 'Worksheet']),
      tags: z.array(z.string()).optional(),
      url: z.string().url().optional(),
      file: z.string().optional(),
      updatedDate: z.coerce.date().optional()
    })
    .refine((data) => Boolean(data.url || data.file), {
      message: 'At least one of "url" or "file" must be provided.'
    })
});

export const collections = { posts, courses, lessons, projects, resources };
