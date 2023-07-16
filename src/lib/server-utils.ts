import "server-only";
import { Remarkable } from "remarkable";
import { linkify } from "remarkable/linkify";
import { headers } from "next/headers";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { cache } from "react";

export function isSSR() {
  return headers().get("accept")?.includes("text/html");
}

export function ssrRedirect(path: string) {
  // FIXME: until this issue is fixed : https://github.com/vercel/next.js/issues/52075
  if (isSSR()) {
    redirect(path);
  }
}

type Callback = (...args: any[]) => Promise<any>;
export function nextCache<T extends Callback>(
  cb: T,
  options: {
    tags: string[];
  }
) {
  return cache(unstable_cache(cb, options.tags, options));
}

export function renderMarkdown(markdown: string): string {
  return new Remarkable("full", {
    html: true,
    breaks: true,
    typographer: true,
  })
    .use(linkify)
    .render(markdown);
}
