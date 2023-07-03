import type { Contact } from "../../../../types";
import { favoriteContact } from "../../../../_actions";

export function FavoriteForm({ contact }: { contact: Contact }) {
  return (
    <form action={favoriteContact}>
      <input type="hidden" name="id" value={contact.id} />
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
