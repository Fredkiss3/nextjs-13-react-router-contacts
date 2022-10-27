"use client";

import { useSearchParams } from "next/navigation";
import { Contact } from "./layout";
import { NavLink } from "./nav-link";

export function ContactList({ contacts }: { contacts: Contact[] }) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") ?? "";

  const filtered = contacts.filter((c) => {
    return (
      c.first
        ?.toLocaleLowerCase()
        .startsWith(searchQuery.toLocaleLowerCase()) ||
      c.last?.toLocaleLowerCase().startsWith(searchQuery.toLocaleLowerCase())
    );
  });

  return (
    <>
      <ul>
        {filtered.length > 0 ? (
          filtered.map((contact) => (
            <li key={contact.id}>
              <NavLink href={`/contacts/${contact.id}/`}>
                <>
                  {contact.first || contact.last ? (
                    <>
                      {contact.first} {contact.last}
                    </>
                  ) : (
                    <i>No Name</i>
                  )}
                  &nbsp;{contact.favorite && <span>★</span>}
                </>
              </NavLink>
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
    </>
  );
}
