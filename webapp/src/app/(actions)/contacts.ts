"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { isSSR, nextCache } from "~/lib/server-utils";
import { contactKeys } from "~/lib/constants";
import { db } from "~/lib/db";
import { contacts } from "~/app/(models)/contact";
import { asc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { wait } from "~/lib/functions";

const contactSchema = z.object({
  first: z.string().trim(),
  last: z.string().trim(),
  avatar: z.string().trim(),
  twitter: z.string().trim(),
  notes: z.string().trim(),
});

export async function searchContactByName(query: string) {
  const searchStr = query.toLowerCase().trim() + "%";
  return await db
    .select({
      id: contacts.id,
    })
    .from(contacts)
    .where(
      sql`lower(${contacts.first}) LIKE ${searchStr} or lower(${contacts.last}) LIKE ${searchStr}`
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

  return await fn();
}

export async function getContactDetail(id: number) {
  const fn = nextCache(
    async (id: number) => {
      return (
        (await db.query.contacts.findFirst({
          where: (fields, { eq }) => eq(fields.id, id),
        })) ?? null
      );
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
  // FIXME remove this code when this PR is merged : https://github.com/vercel/next.js/pull/51887
  await wait(100);
  revalidateTag(contactKeys.singleKey(id));

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

  if (!contact) return;

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
