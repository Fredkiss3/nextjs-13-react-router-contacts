import "server-only";
import { headers } from "next/headers";

export function isSSR() {
  return headers().get("accept")?.includes("text/html");
}
