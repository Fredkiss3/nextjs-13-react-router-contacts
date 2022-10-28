"use client";

import { useRouter } from "next/navigation";

async function createContact(redirect: (to: string) => void) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/contacts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ createdAt: Date.now() }),
  }).then((res) => res.json() as Promise<{ id: string }>);

  // Refresh the current route and fetch new data from the server
  // Refresh the current route and fetch new data from the server
  redirect(`/contacts/${res.id}/edit`);
}

export function NewContactForm() {
  const router = useRouter();

  async function handleCreateForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createContact((to) => {
      router.refresh();
      router.replace(to);
    });
  }

  return (
    <>
      <form method="post" onSubmit={handleCreateForm}>
        <button type="submit">New</button>
      </form>
    </>
  );
}
