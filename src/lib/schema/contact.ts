import { type InferModel, sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const contacts = sqliteTable("contacts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .default(sql`(strftime('%s', 'now'))`)
    .notNull(),
  updadedAt: integer("updadedAt", { mode: "timestamp" })
    .default(sql`(strftime('%s', 'now'))`)
    .notNull(),
  favorite: integer("favorite", { mode: "boolean" }).default(false).notNull(),
  first: text("first"),
  last: text("last"),
  avatar: text("avatar"),
  twitter: text("twitter"),
  notes: text("notes"),
});

export type Contact = InferModel<typeof contacts>;
