import "server-only";
import { sql, eq, asc } from "drizzle-orm";
import { cache } from "react";
import { db } from "~/lib/db";
import { contacts } from "~/lib/schema/contact";
import { nextCache } from "~/lib/server-utils";
import { contactKeys } from "~/lib/constants";
import { revalidateTag } from "next/cache";
import { wait } from "~/lib/functions";
import type { UpdateContactPayload } from "~/lib/shared-utils";

export const getContactDetail = async function getContactDetail(id: number) {
  const fn = nextCache(
    async (id: number) => {
      return (
        (await db.query.contacts.findFirst({
          where: (fields, { eq }) => eq(fields.id, id),
        })) ?? null
      );
    },
    {
      tags: contactKeys.detail(id),
    }
  );

  return fn(id);
};

export const getAllContactIds = async function getAllContactIds() {
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
};

export const searchContactByName = cache(async function searchContactByName(
  query: string
) {
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
});

export async function createContact() {
  const res = await db
    .insert(contacts)
    .values({
      favorite: false,
    })
    .returning({ insertedId: contacts.id })
    .get();

  revalidateTag(contactKeys.allKey());

  return res.insertedId;
}

export async function deleteContact(id: number) {
  db.delete(contacts).where(eq(contacts.id, id)).run();
  revalidateTag(contactKeys.allKey());
  // FIXME remove this code when this PR is merged : https://github.com/vercel/next.js/pull/51887
  // wait for ms
  await wait(50);
  revalidateTag(contactKeys.singleKey(id));
}

export async function updateContact(payload: UpdateContactPayload, id: number) {
  await db
    .update(contacts)
    .set({ ...payload, updadedAt: new Date() })
    .where(eq(contacts.id, id))
    .run();
  revalidateTag(contactKeys.singleKey(id));
}

export async function toggleFavoriteContact(id: number) {
  const oldContact = await getContactDetail(id);

  if (!oldContact) return;

  await db
    .update(contacts)
    .set({ favorite: !oldContact.favorite, updadedAt: new Date() })
    .where(eq(contacts.id, Number(id)))
    .returning({
      favorite: contacts.favorite,
    })
    .run();

  revalidateTag(contactKeys.singleKey(id));
}
