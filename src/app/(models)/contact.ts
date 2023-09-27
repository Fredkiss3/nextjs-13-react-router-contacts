import "server-only";
import { sql, eq, asc } from "drizzle-orm";
import { cache } from "react";
import { db } from "~/lib/db";
import { contacts } from "~/lib/schema/contact.sql";
import { nextCache } from "~/lib/server-utils";
import { contactKeys } from "~/lib/constants";
import { revalidateTag } from "next/cache";
import type { ContactPayload } from "~/lib/validators";

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

export const getContactByGithubHandle = cache(
    async function searchContactByName(handle: string) {
        return await db
            .select({
                id: contacts.id,
            })
            .from(contacts)
            .where(eq(contacts.github_handle, handle))
            .all();
    }
);

export async function createContact(payload: ContactPayload) {
    const res = await db
        .insert(contacts)
        .values({
            ...payload,
        })
        .returning({ insertedId: contacts.id })
        .get();

    revalidateTag(contactKeys.allKey());

    return res.insertedId;
}

export async function deleteContact(id: number) {
    db.delete(contacts).where(eq(contacts.id, id)).run();
    revalidateTag(contactKeys.allKey());
    revalidateTag(contactKeys.singleKey(id));
}

export async function updateContact(payload: ContactPayload, id: number) {
    await db
        .update(contacts)
        .set({ ...payload })
        .where(eq(contacts.id, id))
        .run();
    revalidateTag(contactKeys.singleKey(id));
}

export async function toggleFavoriteContact(id: number) {
    const oldContact = await getContactDetail(id);

    if (!oldContact) return;

    await db
        .update(contacts)
        .set({ favorite: !oldContact.favorite })
        .where(eq(contacts.id, Number(id)))
        .returning({
            favorite: contacts.favorite,
        })
        .run();

    revalidateTag(contactKeys.singleKey(id));
}
