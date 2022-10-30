"use client";
import * as React from "react";

import { Contact } from "./layout";
import { NavLink } from "./nav-link";

export function ContactList({ contacts }: { contacts: Contact[] }) {
  return (
    <>
      <ul>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
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
