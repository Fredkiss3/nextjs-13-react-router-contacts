"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ssrRedirect } from "~/lib/server-utils";
import {
    createContact,
    deleteContact,
    getContactByGithubHandle,
    toggleFavoriteContact,
    updateContact,
} from "~/app/(models)/contact";
import { contactSchema } from "~/lib/validators";

export type ActionResult<T extends unknown = undefined> =
    | {
          type: "success";
          data: T;
          message: string;
      }
    | {
          type: "error";
          errors: Record<string, string[] | undefined>;
      }
    | { type?: undefined; message: null };

export async function removeContact(formData: FormData) {
    const id = formData.get("id")!.toString();
    await deleteContact(Number(id));

    revalidatePath("/");
    ssrRedirect("/");
}

export async function newContact(_: ActionResult, formData: FormData) {
    const result = contactSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
        return {
            type: "error",
            errors: result.error.flatten().fieldErrors,
        } satisfies ActionResult;
    }

    const existingContacts = await getContactByGithubHandle(
        result.data.github_handle
    );
    if (existingContacts.length > 0) {
        return {
            type: "error",
            errors: {
                github_handle: ["A user with this handle already exists in DB"],
            },
        } satisfies ActionResult;
    }

    const id = await createContact(result.data);
    revalidatePath("/");
    redirect(`/contacts/${id}`);
}

export async function editContact(_: any, formData: FormData) {
    const id = formData.get("id")!.toString();
    const result = contactSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
        redirect("/");
    }

    await updateContact(result.data, Number(id));

    revalidatePath("/");

    ssrRedirect(`/contacts/${id}`);
}

export async function favoriteContact(formData: FormData) {
    const id = formData.get("id")!.toString();

    await toggleFavoriteContact(Number(id));

    revalidatePath("/");

    ssrRedirect(`/contacts/${id}`);
}
