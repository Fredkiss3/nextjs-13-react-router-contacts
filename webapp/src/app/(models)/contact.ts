import "server-only";
import { sql, eq, asc } from "drizzle-orm";
import { cache } from "react";
import { z } from "zod";
import { db } from "~/lib/db";
import { contacts } from "~/lib/schema/contact";
import { cookies } from "next/headers";

export const getContactDetail = cache(async function getContactDetail(
  id: number
) {
  // FIXME : until this issue is fixed : https://github.com/vercel/next.js/issues/52405
  // Dummy call to `cookies` as it is the only workaround for now
  cookies();

  return (
    (await db.query.contacts.findFirst({
      where: (fields, { eq }) => eq(fields.id, id),
    })) ?? null
  );
});

export const getAllContactIds = cache(async function getAllContactIds() {
  // FIXME : until this issue is fixed : https://github.com/vercel/next.js/issues/52405
  // Dummy call to `cookies` as it is the only workaround for now
  cookies();
  return await db
    .select({
      id: contacts.id,
    })
    .from(contacts)
    .orderBy(asc(contacts.createdAt))
    .all();
});

export const searchContactByName = cache(async function searchContactByName(
  query: string
) {
  // FIXME : until this issue is fixed : https://github.com/vercel/next.js/issues/52405
  // Dummy call to `cookies` as it is the only workaround for now
  cookies();
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
  // FIXME : until this issue is fixed : https://github.com/vercel/next.js/issues/52405
  // Dummy call to `cookies` as it is the only workaround for now
  cookies();
  const res = await db
    .insert(contacts)
    .values({
      favorite: false,
      createdAt: new Date(),
    })
    .returning({ insertedId: contacts.id })
    .get();

  return res.insertedId;
}

export async function deleteContact(id: number) {
  // FIXME : until this issue is fixed : https://github.com/vercel/next.js/issues/52405
  // Dummy call to `cookies` as it is the only workaround for now
  cookies();
  return db.delete(contacts).where(eq(contacts.id, id)).run();
}

export const updateContactSchema = z.object({
  first: z.string().trim(),
  last: z.string().trim(),
  avatar: z.string().trim(),
  twitter: z.string().trim(),
  notes: z.string().trim(),
});

export type UpdateContactPayload = z.TypeOf<typeof updateContactSchema>;

export async function updateContact(payload: UpdateContactPayload, id: number) {
  // FIXME : until this issue is fixed : https://github.com/vercel/next.js/issues/52405
  // Dummy call to `cookies` as it is the only workaround for now
  cookies();
  await db
    .update(contacts)
    .set({ ...payload, updadedAt: new Date() })
    .where(eq(contacts.id, id))
    .run();
}

export async function toggleFavoriteContact(id: number) {
  // FIXME : until this issue is fixed : https://github.com/vercel/next.js/issues/52405
  // Dummy call to `cookies` as it is the only workaround for now
  cookies();
  const oldContact = await getContactDetail(id);

  if (!oldContact) return;

  const newValue = await db
    .update(contacts)
    .set({ favorite: !oldContact.favorite, updadedAt: new Date() })
    .where(eq(contacts.id, Number(id)))
    .returning({
      favorite: contacts.favorite,
    })
    .run();

  const newContact = await getContactDetail(Number(id));

  console.log({
    oldContact,
    newContact,
    oldValue: oldContact.favorite,
    newValue: newValue.rows,
  });
}
