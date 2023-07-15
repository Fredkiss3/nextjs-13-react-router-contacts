"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ssrRedirect } from "~/lib/server-utils";
import {
  createContact,
  deleteContact,
  toggleFavoriteContact,
  updateContact,
  updateContactSchema,
} from "~/app/(models)/contact";

export async function removeContact(fd: FormData) {
  const id = fd.get("id")!.toString();
  await deleteContact(Number(id));

  revalidatePath("/");
  ssrRedirect("/");
}

export async function newContact() {
  const id = await createContact();

  revalidatePath("/");
  ssrRedirect(`/contacts/${id}/edit`);

  return id;
}

export async function editContact(fd: FormData) {
  const id = fd.get("id")!.toString();
  const result = updateContactSchema.safeParse(Object.fromEntries(fd));

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
