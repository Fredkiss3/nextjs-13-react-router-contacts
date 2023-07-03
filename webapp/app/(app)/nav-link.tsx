"use client";

import Link, { type LinkProps } from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

export function linkWithSlash(link: string): string {
  link = link.startsWith("/") ? link : `/${link}`;
  link = link.endsWith("/") ? link : `${link}/`;

  return link;
}

export function useActiveLink(href: string) {
  const selectedSegments = useSelectedLayoutSegments();

  return linkWithSlash(selectedSegments.join(`/`)).includes(
    linkWithSlash(href)
  );
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
