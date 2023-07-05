"use client";

import * as React from "react";
import { NewContactForm } from "./new-contact-form";
import { usePathname, useRouter } from "next/navigation";

export type SidebarFormProps = {
  searchQuery?: string;
};

export function SidebarForm({ searchQuery }: SidebarFormProps) {
  const router = useRouter();
  const path = usePathname();
  return (
    <>
      <div>
        <form
          id="search-form"
          role="search"
          method="get"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);

            // @ts-expect-error
            const sp = new URLSearchParams(fd);
            React.startTransition(() =>
              router.push(path + "?" + sp.toString())
            );
          }}
        >
          <input
            id="q"
            aria-label="Search contacts"
            placeholder="Search"
            type="search"
            name="q"
            defaultValue={searchQuery}
            onChange={(e) => {
              e.currentTarget.form?.requestSubmit();
            }}
          />
          <div id="search-spinner" aria-hidden hidden={true} />
          <div className="sr-only" aria-live="polite"></div>
        </form>

        <NewContactForm />
      </div>
    </>
  );
}
