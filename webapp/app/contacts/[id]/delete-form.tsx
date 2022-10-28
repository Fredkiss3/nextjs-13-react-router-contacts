"use client";

import { useRouter } from "next/navigation";

async function deleteContact(id: number, redirect: (to: string) => void) {
  await fetch(`http://localhost:8098/contacts/${id}`, {
    method: "DELETE",
  });

  // Refresh the current route and fetch new data from the server
  redirect(`/`);
}

export function DeleteForm({ contactId }: { contactId: number }) {
  const router = useRouter();

  function handleDeleteForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!confirm("Please confirm you want to delete this record.")) {
      return;
    }

    deleteContact(contactId, (to: string) => {
      router.refresh();
      router.replace(to);
    });
  }
  return (
    <form method="post" action="destroy" onSubmit={handleDeleteForm}>
      <button type="submit">Delete</button>
    </form>
  );
}
