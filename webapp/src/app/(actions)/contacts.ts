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
  const res = await db
    .insert(contacts)
    .values({
      favorite: false,
      createdAt: new Date(),
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

  revalidateTag(contactKeys.singleKey(id));

  if (isSSR()) {
    redirect(`/contacts/${id}`);
  }
}
