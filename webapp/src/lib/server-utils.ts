import "server-only";
import { Remarkable } from "remarkable";
import { linkify } from "remarkable/linkify";
import { headers } from "next/headers";
import { unstable_cache } from "next/cache";

export function isSSR() {
  return headers().get("accept")?.includes("text/html");
}

type Callback = (...args: any[]) => Promise<any>;
export function nextCache<T extends Callback>(
  cb: T,
  options: {
    tags: string[];
  }
) {
  // FIXME: until we are sure this issue is fixed https://github.com/vercel/next.js/issues/52405,
  // -> we are returning the callback directly because i patched `@libsql` to use `cache: "no-store"`
  // but it seems like it can't be used within `unstable_cache`
  return cb;
  return unstable_cache(cb, options.tags, options);
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
