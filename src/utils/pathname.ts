import * as clientConfig from "astro:config/client";

const base = clientConfig.base === "/" ? "" : clientConfig.base.replace(/\/$/, "");

export function normalizePathname(pathname: string): string {
  if (!pathname) {
    return "/";
  }

  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const withoutTrailingSlash = withLeadingSlash.replace(/\/+$/, "");

  return withoutTrailingSlash || "/";
}

export function stripBasePath(pathname: string): string {
  const normalizedPathname = normalizePathname(pathname);

  if (!base) {
    return normalizedPathname;
  }

  const normalizedBase = normalizePathname(base);

  if (normalizedPathname === normalizedBase) {
    return "/";
  }

  if (normalizedPathname.startsWith(`${normalizedBase}/`)) {
    const pathWithoutBase = normalizedPathname.slice(normalizedBase.length);
    return normalizePathname(pathWithoutBase);
  }

  return normalizedPathname;
}
