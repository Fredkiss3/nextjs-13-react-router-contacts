"use client";

import * as React from "react";
import { ContactList } from "./contact-list";
import { NewContactForm } from "./new-contact-form";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Contact } from "./types";

export type SidebarProps = {
  contacts: Contact[];
};

export function Sidebar({ contacts }: SidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState(
    searchParams.get("q") ?? ""
  );
  const path = usePathname();

  const filtered =
    searchQuery.length === 0
      ? contacts
      : contacts.filter((c) => {
          return (
            c.first
              ?.toLocaleLowerCase()
              .startsWith(searchQuery.toLocaleLowerCase()) ||
            c.last
              ?.toLocaleLowerCase()
              .startsWith(searchQuery.toLocaleLowerCase())
          );
        });

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
            setSearchQuery(fd.get("q")?.toString() ?? "");

            // @ts-expect-error
            const sp = new URLSearchParams(fd);
            router.push(path + "?" + sp.toString());
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

      <nav>
        <ContactList contacts={filtered} />
      </nav>
    </>
  );
}
