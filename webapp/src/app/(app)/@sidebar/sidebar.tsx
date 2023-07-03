import * as React from "react";

// components
import { NavLink } from "~/(app)/nav-link";
import { SidebarForm } from "./sidebar-form";

// types
import type { Contact } from "~/types";
export type SidebarProps = {
  query?: string;
};

export async function Sidebar({ query = "" }: SidebarProps) {
  const contacts = await fetch(`${process.env.API_SERVER}/contacts`, {
    next: {
      tags: ["contacts"],
    },
  }).then((r) => r.json() as Promise<Contact[]>);

  const filteredContacts =
    query.length === 0
      ? contacts
      : contacts.filter((c) => {
          return (
            c.first
              ?.toLocaleLowerCase()
              .startsWith(query.toLocaleLowerCase()) ||
            c.last?.toLocaleLowerCase().startsWith(query?.toLocaleLowerCase())
          );
        });

  console.log({
    query,
    len: filteredContacts.length,
  });
  return (
    <>
      <SidebarForm searchQuery={query} />

      <nav>
        <ul>
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <li key={contact.id}>
                <React.Suspense
                  key={contact.id}
                  fallback={<>loading contact...</>}
                >
                  <SingleContact id={contact.id} />
                </React.Suspense>
              </li>
            ))
          ) : (
            <>
              <p>
                <i>No contacts</i>
              </p>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

async function SingleContact(props: { id: number }) {
  const contact = await fetch(
    `${process.env.API_SERVER}/contacts/${props.id}`,
    {
      next: {
        tags: ["contacts", `contact-${props.id}`],
      },
    }
  ).then((r) => r.json() as Promise<Contact>);

  return (
    <NavLink href={`/contacts/${contact.id}/`}>
      {contact.first || contact.last ? (
        <>
          {contact.first} {contact.last}
        </>
      ) : (
        <i>No Name</i>
      )}
      &nbsp;{contact.favorite && <span>★</span>}
    </NavLink>
  );
}
