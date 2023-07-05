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
  return unstable_cache(cb, [], options);
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
