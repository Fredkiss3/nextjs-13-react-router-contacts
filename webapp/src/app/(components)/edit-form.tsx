"use client";

import * as React from "react";
// components
import Link from "next/link";

// utils
import { useRouter } from "next/navigation";
import { updateContact } from "~/app/(actions)/contacts";

// types
import type { Contact } from "~/app/(models)/contact";

export function EditForm({ contact }: { contact: Contact }) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  return (
    <>
      <form
        id="contact-form"
        action={updateContact}
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(
            () =>
              void updateContact(new FormData(e.currentTarget)).then(() => {
                router.refresh();
                router.push(`/contacts/${contact.id}`);
              })
          );
        }}
      >
        <input type="hidden" name="id" value={contact.id} />
        <p>
          <span>Name</span>
          <input
            placeholder="First"
            aria-label="First name"
            type="text"
            name="first"
            defaultValue={contact.first ?? ""}
          />
          <input
            placeholder="Last"
            aria-label="Last name"
            type="text"
            name="last"
            defaultValue={contact.last ?? ""}
          />

          <input type="hidden" name="id" value={contact.id} />
        </p>
        <label>
          <span>Github handle</span>
          <input
            type="text"
            name="twitter"
            placeholder="ex: fredkiss3"
            defaultValue={contact.twitter ?? ""}
          />
        </label>
        <label>
          <span>Avatar URL</span>
          <input
            placeholder="https://example.com/avatar.jpg"
            aria-label="Avatar URL"
            type="text"
            name="avatar"
            defaultValue={contact.avatar ?? ""}
          />
        </label>
        <label>
          <span>Notes</span>
          <textarea name="notes" defaultValue={contact.notes ?? ""} rows={6} />
        </label>
        <p>
          <button type="submit" disabled={isPending} className={`edit-button`}>
            {isPending ? "saving..." : "Save"}
          </button>
          <Link href={`/contacts/${contact.id}`} className="button">
            Cancel
          </Link>
        </p>
      </form>
    </>
  );
}
