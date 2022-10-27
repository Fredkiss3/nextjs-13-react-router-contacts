"use client";

import type { Contact } from "../../layout";

import { usePathname, useRouter } from "next/navigation";

async function favoriteContact(contact: Contact) {
  return fetch(`http://localhost:8098/contacts/${contact.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...contact, favorite: !contact.favorite }),
  });
}

export function Favorite({ contact }: { contact: Contact }) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  const router = useRouter();
  const path = usePathname();

  function handleFavorite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    favoriteContact(contact).then(() => {
      router.refresh();
    });
  }

  return (
    <form method="post" onSubmit={handleFavorite}>
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </form>
  );
}
