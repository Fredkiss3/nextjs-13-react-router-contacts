import * as React from "react";

// components
import { NavLink } from "~/app/(components)/nav-link";
import { SidebarForm } from "./sidebar-form";

// utils
import {
  getAllContactIds,
  getContactDetail,
  searchContactByName,
} from "~/app/(actions)/contacts";
import { isSSR } from "~/lib/server-utils";

// types
export type SidebarProps = {
  query?: string;
};

export async function Sidebar({ query = "" }: SidebarProps) {
  const filteredContacts =
    query.length > 0
      ? await searchContactByName(query)
      : await getAllContactIds();

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
