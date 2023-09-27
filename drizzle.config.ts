import type { Config } from "drizzle-kit";

export default {
    schema: "./src/lib/schema/*.sql.ts",
    out: "./drizzle",
    driver: "turso",
    dbCredentials: {
        url: process.env.TURSO_DB_URL!,
        authToken: process.env.TURSO_DB_TOKEN!,
    },
} satisfies Config;
