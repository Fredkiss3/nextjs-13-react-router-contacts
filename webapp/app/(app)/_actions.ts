"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isSSR } from "./server-utils";

export async function deleteContact(fd: FormData) {
  await fetch(
    `${process.env.API_SERVER}/contacts/${fd.get("id")!.toString()}`,
    {
      method: "DELETE",
    }
  );

  // Refresh the current route and fetch new data from the server
  revalidatePath("/");
  if (isSSR()) {
    redirect("/");
  }
}

export async function createContact(fd: FormData) {
  const res = await fetch(`${process.env.API_SERVER}/contacts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ createdAt: Date.now() }),
  }).then((res) => res.json() as Promise<{ id: string }>);

  revalidatePath("/");
  if (isSSR()) {
    redirect(`/contacts/${res.id}/edit`);
  }
  return res.id;
}

export async function updateContact(fd: FormData) {
  const id = fd.get("id")!.toString();
  const updates = Object.fromEntries(fd);

  await fetch(`${process.env.API_SERVER}/contacts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  revalidatePath("/");
  // Refresh the current route and fetch new data from the server
  if (isSSR()) {
    redirect(`/contacts/${id}`);
  }
}
