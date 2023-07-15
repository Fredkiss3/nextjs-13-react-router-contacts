"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

function linkWithSlash(href: string) {
  if (href.endsWith("/")) {
    return href;
  }
  return href + "/";
}

function useActiveLink(href: string) {
  const path = usePathname();

  return linkWithSlash(path).includes(linkWithSlash(href));
}

export function NavLink({
  href,
  children,
  ...props
}: LinkProps & { children: React.ReactNode }) {
  const isActive = useActiveLink(href.toString());

  return (
    <Link {...props} className={`${isActive && "active"}`} href={href}>
      {children}
    </Link>
  );
}
