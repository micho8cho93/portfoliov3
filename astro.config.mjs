import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER;
const isUserOrOrgPagesSite = repository === `${repositoryOwner}.github.io`;

const fallbackSiteUrl = process.env.PUBLIC_SITE_URL || process.env.SITE_URL || 'https://example.com';
const fallbackBasePath = process.env.PUBLIC_BASE_PATH || process.env.BASE_PATH || '/';

const normalizeSite = (value) => {
  const url = new URL(value);
  return url.toString().replace(/\/$/, '');
};

const normalizeBase = (value) => {
  if (!value || value === '/') {
    return '/';
  }

  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`;
  const withoutTrailingSlash = withLeadingSlash.replace(/\/+$/, '');
  return withoutTrailingSlash || '/';
};

const site =
  isGitHubActions && repositoryOwner
    ? `https://${repositoryOwner}.github.io`
    : normalizeSite(fallbackSiteUrl);

const base =
  isGitHubActions && repository && !isUserOrOrgPagesSite
    ? normalizeBase(`/${repository}`)
    : normalizeBase(fallbackBasePath);

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: 'shiki'
  }
});
