import * as React from "react";

// components
import { NavLink } from "~/(app)/nav-link";
import { SidebarForm } from "./sidebar-form";

// utils
import { getAllContacts, getContactDetail } from "~/_actions";
import { isSSR } from "~/server-utils";

// types
export type SidebarProps = {
  query?: string;
};

export async function Sidebar({ query = "" }: SidebarProps) {
  const contacts = await getAllContacts();

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

  return (
    <>
      <SidebarForm searchQuery={query} />

      <nav>
        <ul>
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <li key={contact.id}>
                {isSSR() ? (
                  <React.Suspense fallback={<>loading contact...</>}>
                    <SingleContact id={contact.id} />
                  </React.Suspense>
                ) : (
                  <SingleContact id={contact.id} />
                )}
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
  const contact = await getContactDetail(props.id);

  if (!contact) return null;

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
