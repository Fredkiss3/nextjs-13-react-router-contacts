import { favoriteContact } from "~/app/(actions)/contacts";

export function FavoriteForm({
  contactId,
  isFavorite,
}: {
  contactId: number;
  isFavorite: boolean;
}) {
  return (
    <form action={favoriteContact}>
      <input type="hidden" name="id" value={contactId} />
      <button
        name="favorite"
        value={isFavorite ? "false" : "true"}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? "★" : "☆"}
      </button>
    </form>
  );
}
