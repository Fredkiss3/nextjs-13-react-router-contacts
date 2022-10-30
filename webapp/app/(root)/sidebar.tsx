"use client";

import * as React from "react";
import { ContactList } from "./contact-list";
import { Contact } from "./layout";
import { NewContactForm } from "./new-contact-form";
import { SearchForm } from "./search-form";

export type SidebarProps = {
  contacts: Contact[];
};

export function Sidebar({ contacts }: SidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setSearchQuery(searchParams.get("q") ?? "");
  }, []);

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
        <SearchForm onChangeQuery={setSearchQuery} query={searchQuery} />
        <NewContactForm />
      </div>

      <nav>
        <ContactList contacts={filtered} />
      </nav>
    </>
  );
}
