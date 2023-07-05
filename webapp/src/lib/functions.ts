import { Remarkable } from "remarkable";
import { linkify } from "remarkable/linkify";

export function wait(ms: number): Promise<void> {
  // Wait for the specified amount of time
  return new Promise((resolve) => setTimeout(resolve, ms));
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
