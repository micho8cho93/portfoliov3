import * as clientConfig from "astro:config/client";

const base = clientConfig.base === "/" ? "" : clientConfig.base.replace(/\/$/, "");

export function withBase(path: string): string {
  if (!path.startsWith("/")) {
    return path;
  }

  if (!base) {
    return path;
  }

  return `${base}${path}`;
}
