"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Contact } from "../../../layout";

async function updateContact(
  id: number,
  formData: FormData,
  redirect: (to: string) => void
) {
  const updates = Object.fromEntries(formData);

  await fetch(`http://localhost:8098/contacts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  // Refresh the current route and fetch new data from the server
  redirect(`/contacts/${id}`);
}

export function EditForm({ contact }: { contact: Contact }) {
  const router = useRouter();

  function handleUpdateForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateContact(
      contact.id,
      new FormData(e.target as HTMLFormElement),
      (to: string) => {
        router.refresh();
        router.replace(to);
      }
    );
  }

  return (
    <>
      <form method="post" id="contact-form" onSubmit={handleUpdateForm}>
        <p>
          <span>Name</span>
          <input
            placeholder="First"
            aria-label="First name"
            type="text"
            name="first"
            defaultValue={contact.first}
          />
          <input
            placeholder="Last"
            aria-label="Last name"
            type="text"
            name="last"
            defaultValue={contact.last}
          />
        </p>
        <label>
          <span>Twitter</span>
          <input
            type="text"
            name="twitter"
            placeholder="@jack"
            defaultValue={contact.twitter}
          />
        </label>
        <label>
          <span>Avatar URL</span>
          <input
            placeholder="https://example.com/avatar.jpg"
            aria-label="Avatar URL"
            type="text"
            name="avatar"
            defaultValue={contact.avatar}
          />
        </label>
        <label>
          <span>Notes</span>
          <textarea name="notes" defaultValue={contact.notes} rows={6} />
        </label>
        <p>
          <button type="submit">Save</button>
          <Link href={`/contacts/${contact.id}`} className={`cancel-button`}>
            Cancel
          </Link>
        </p>
      </form>
    </>
  );
}
