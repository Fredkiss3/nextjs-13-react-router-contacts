"use client";

import * as React from "react";
// components
import Link from "next/link";

// utils
import { useRouter } from "next/navigation";
import { editContact } from "~/app/(actions)/contacts";

// types
import type { Contact } from "~/lib/schema/contact";
import { updateContactSchema } from "~/lib/shared-utils";

export function EditForm({ contact }: { contact: Contact }) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  return (
    <>
      <form
        id="contact-form"
        action={editContact}
        onSubmit={(e) => {
          e.preventDefault();
          // validate data client-side
          const formData = new FormData(e.currentTarget);
          const result = updateContactSchema.safeParse(
            Object.fromEntries(formData)
          );

          if (result.success) {
            // FIXME: until this issue is fixed : https://github.com/vercel/next.js/issues/52075
            startTransition(() =>
              editContact(new FormData(e.currentTarget)).then(() => {
                router.refresh();
                router.push(`/contacts/${contact.id}`);
              })
            );
          } else {
            alert("Invalid input, please retry or reload the page !");
          }
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
