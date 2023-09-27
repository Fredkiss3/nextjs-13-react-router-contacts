import { z } from "zod";

export const contactSchema = z.object({
    first: z.string().trim(),
    last: z.string().trim(),
    avatar_url: z
        .string()
        .trim()
        .url()
        .nonempty()
        .regex(/^(https:\/\/)?avatars\.githubusercontent\.com/, {
            message: "Only Github avatar URL are supported",
        }),
    github_handle: z
        .string()
        .trim()
        .nonempty()
        .regex(/^[a-zA-Z][a-zA-Z0-9_\-]+/),
    notes: z.string().trim(),
});

export type ContactPayload = z.TypeOf<typeof contactSchema>;
