import "server-only";
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
