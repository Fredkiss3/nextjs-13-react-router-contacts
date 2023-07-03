import { revalidatePath } from "next/cache";
import type { Contact } from "../../types";

export function FavoriteForm({ contact }: { contact: Contact }) {
  async function favoriteContact(formData: FormData) {
    "use server";
    await fetch(`${process.env.API_SERVER}/contacts/${contact.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...contact, favorite: !contact.favorite }),
    });

    revalidatePath("/");
  }
  return (
    <form method="post" action={favoriteContact}>
      <button
        name="favorite"
        value={contact.favorite ? "false" : "true"}
        aria-label={
          contact.favorite ? "Remove from favorites" : "Add to favorites"
        }
      >
        {contact.favorite ? "★" : "☆"}
      </button>
    </form>
  );
}
