import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER;
const isUserOrOrgPagesSite = repository === `${repositoryOwner}.github.io`;

export default defineConfig({
  site:
    isGitHubActions && repositoryOwner
      ? `https://${repositoryOwner}.github.io`
      : 'https://example.com',
  base:
    isGitHubActions && repository && !isUserOrOrgPagesSite
      ? `/${repository}`
      : '/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: 'shiki'
  }
});
