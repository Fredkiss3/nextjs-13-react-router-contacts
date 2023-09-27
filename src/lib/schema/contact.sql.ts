import { sql, InferSelectModel } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const contacts = sqliteTable("contacts", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    createdAt: integer("createdAt", { mode: "timestamp" })
        .default(sql`(strftime('%s', 'now'))`)
        .notNull(),
    favorite: integer("favorite", { mode: "boolean" }).default(false).notNull(),
    first: text("first"),
    last: text("last"),
    avatar_url: text("avatar_url"),
    github_handle: text("github_handle").unique(),
    notes: text("notes"),
});

export type Contact = InferSelectModel<typeof contacts>;
