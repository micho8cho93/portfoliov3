import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { blogPost } from '../lib/routes';

export async function GET(context) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  return rss({
    title: 'CS Educator Blog',
    description: 'Writing on teaching computer science and curriculum design.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `${blogPost(post.slug)}/`
    }))
  });
}
