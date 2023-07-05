"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { isSSR, nextCache } from "~/lib/server-utils";
import { contactKeys } from "~/lib/constants";
import { db } from "~/lib/db";
import { contacts } from "~/app/(models)/contact";
import { asc, eq, sql } from "drizzle-orm";
import { z } from "zod";

const contactSchema = z.object({
  first: z.string(),
  last: z.string(),
  avatar: z.string(),
  twitter: z.string(),
  notes: z.string(),
});

export async function searchContactByName(query: string) {
  return await db
    .select({
      id: contacts.id,
    })
    .from(contacts)
    .where(
      sql`lower(${contacts.first}) LIKE "${query
        .toLowerCase()
        .trim()}%" or lower(${contacts.last}) LIKE "${query
        .toLowerCase()
        .trim()}%"`
    )
    .orderBy(asc(contacts.createdAt))
    .all();
}

export async function getAllContactIds() {
  //   return fetch(`${process.env.API_SERVER}/contacts`, {
  //     next: {
  //       tags: contactKeys.all(),
  //     },
  //   }).then((r) => r.json() as Promise<Contact[]>);
  const fn = nextCache(
    async () => {
      return await db
        .select({
          id: contacts.id,
        })
        .from(contacts)
        .orderBy(asc(contacts.createdAt))
        .all();
    },
    {
      tags: contactKeys.all(),
    }
  );

  return fn();
}

export async function getContactDetail(id: number) {
  //   return await fetch(`${process.env.API_SERVER}/contacts/${id}`, {
  //     next: {
  //       tags: contactKeys.detail(id.toString()),
  //     },
  //   }).then((r) => {
  //     if (r.status === 404) return null;
  //     return r.json() as Promise<Contact>;
  //   });
  const fn = nextCache(
    async (id: number) => {
      return db.select().from(contacts).where(eq(contacts.id, id)).get();
    },
    {
      tags: contactKeys.detail(id.toString()),
    }
  );
  return await fn(id);
}

export async function deleteContact(fd: FormData) {
  //   await fetch(
  //     `${process.env.API_SERVER}/contacts/${fd.get("id")!.toString()}`,
  //     {
  //       method: "DELETE",
  //     }
  //   );
  const id = fd.get("id")!.toString();
  await db
    .delete(contacts)
    .where(eq(contacts.id, Number(id)))
    .run();
  revalidateTag(contactKeys.allKey());

  if (isSSR()) {
    redirect("/");
  }
}

export async function createContact() {
  //   const res = await fetch(`${process.env.API_SERVER}/contacts`, {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({ createdAt: Date.now() }),
  //   }).then((res) => res.json() as Promise<{ id: string }>);
  const res = await db
    .insert(contacts)
    .values({
      favorite: false,
    })
    .returning({ insertedId: contacts.id })
    .get();

  revalidateTag(contactKeys.allKey());

  if (isSSR()) {
    redirect(`/contacts/${res.insertedId}/edit`);
  }

  console.log({ res });
  return res.insertedId;
}

export async function updateContact(fd: FormData) {
  const id = fd.get("id")!.toString();
  const result = contactSchema.safeParse(Object.fromEntries(fd));

  if (!result.success) {
    redirect("/");
  }

  await db
    .update(contacts)
    .set({ ...result.data })
    .where(eq(contacts.id, Number(id)))
    .run();

  //   await fetch(`${process.env.API_SERVER}/contacts/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updates),
  //   });

  revalidateTag(contactKeys.singleKey(id));

  if (isSSR()) {
    redirect(`/contacts/${id}`);
  }
}

export async function favoriteContact(formData: FormData) {
  const id = formData.get("id")!.toString();

  const contact = await getContactDetail(Number(id));

  await db
    .update(contacts)
    .set({ favorite: !contact.favorite })
    .where(eq(contacts.id, Number(id)))
    .run();

  //   const contact = await fetch(`${process.env.API_SERVER}/contacts/${id}`).then(
  //     (r) => {
  //       if (r.status === 404) return null;
  //       return r.json() as Promise<Contact>;
  //     }
  //   );

  //   await fetch(`${process.env.API_SERVER}/contacts/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ ...contact, favorite: !contact!.favorite }),
  //   });

  revalidateTag(contactKeys.singleKey(id));

  if (isSSR()) {
    redirect(`/contacts/${id}`);
  }
}
