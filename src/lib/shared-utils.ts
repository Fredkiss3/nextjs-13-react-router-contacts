import { z } from "zod";

export const updateContactSchema = z.object({
  first: z.string().trim(),
  last: z.string().trim(),
  avatar: z.string().trim(),
  twitter: z.string().trim(),
  notes: z.string().trim(),
});

export type UpdateContactPayload = z.TypeOf<typeof updateContactSchema>;
