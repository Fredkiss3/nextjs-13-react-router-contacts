"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { isSSR } from "~/server-utils";
import { Contact } from "~/types";
import { contactKeys } from "~/(app)/constants";

export async function getAllContacts() {
  return fetch(`${process.env.API_SERVER}/contacts`, {
    next: {
      tags: contactKeys.all(),
    },
  }).then((r) => r.json() as Promise<Contact[]>);
}

export async function getContactDetail(id: number) {
  return await fetch(`${process.env.API_SERVER}/contacts/${id}`, {
    next: {
      tags: contactKeys.detail(id.toString()),
    },
  }).then((r) => {
    if (r.status === 404) return null;
    return r.json() as Promise<Contact>;
  });
}

export async function deleteContact(fd: FormData) {
  await fetch(
    `${process.env.API_SERVER}/contacts/${fd.get("id")!.toString()}`,
    {
      method: "DELETE",
    }
  );

  revalidateTag(contactKeys.allKey());

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

  revalidateTag(contactKeys.allKey());

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

  revalidateTag(contactKeys.singleKey(id));

  if (isSSR()) {
    redirect(`/contacts/${id}`);
  }
}

export async function favoriteContact(formData: FormData) {
  const id = formData.get("id")!.toString();
  const contact = await fetch(`${process.env.API_SERVER}/contacts/${id}`).then(
    (r) => {
      if (r.status === 404) return null;
      return r.json() as Promise<Contact>;
    }
  );

  await fetch(`${process.env.API_SERVER}/contacts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...contact, favorite: !contact!.favorite }),
  });

  revalidateTag(contactKeys.singleKey(id));

  if (isSSR()) {
    redirect(`/contacts/${id}`);
  }
}
