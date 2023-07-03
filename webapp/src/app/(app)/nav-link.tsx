"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

function linkWithSlash(href: string) {
  if (href.endsWith("/")) {
    return href;
  }

  return href + "/";
}

export function useActiveLink(href: string) {
  const path = usePathname();

  return linkWithSlash(path).includes(linkWithSlash(href));
}

export function NavLink({
  href,
  children,
  className = "",
  ...props
}: LinkProps & { children: React.ReactNode; className?: string }) {
  const isActive = useActiveLink(href.toString());

  return (
    <Link
      {...props}
      className={`${className} ${isActive && "active"}`}
      href={href}
    >
      {children}
    </Link>
  );
}
