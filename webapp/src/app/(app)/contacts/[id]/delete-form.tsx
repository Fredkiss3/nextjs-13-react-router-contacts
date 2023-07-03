"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { deleteContact } from "../../../_actions";

export function DeleteForm({ contactId }: { contactId: number }) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  return (
    <form
      action={deleteContact}
      onSubmit={(e) => {
        e.preventDefault();
        if (!confirm("Please confirm you want to delete this record.")) {
          return;
        }
        startTransition(
          () =>
            void deleteContact(new FormData(e.currentTarget)).then(() => {
              router.refresh();
              router.replace("/");
            })
        );
      }}
    >
      <input type="hidden" name="id" value={contactId} />
      <button type="submit" disabled={isPending} className="delete-button">
        {isPending ? "deleting..." : "Delete"}
      </button>
    </form>
  );
}
