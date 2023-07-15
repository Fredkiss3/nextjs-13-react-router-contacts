"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { removeContact } from "~/app/(actions)/contacts";

export function DeleteForm({ contactId }: { contactId: number }) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  return (
    <form
      action={removeContact}
      onSubmit={(e) => {
        e.preventDefault();
        if (!confirm("Please confirm you want to delete this record.")) {
          return;
        }

        startTransition(() =>
          removeContact(new FormData(e.currentTarget)).then(() => {
            // FIXME: until this issue is fixed : https://github.com/vercel/next.js/issues/52075
            router.replace("/");
            router.refresh();
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
