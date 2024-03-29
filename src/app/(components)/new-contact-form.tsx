"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { newContact } from "~/app/(actions)/contacts";

export function NewContactForm() {
  const router = useRouter();
  const [_, startTransition] = React.useTransition();

  return (
    <>
      <form
        action={newContact}
        onSubmit={(e) => {
          e.preventDefault();
          // FIXME: until this issue is fixed : https://github.com/vercel/next.js/issues/52075
          startTransition(() =>
            newContact().then((newContactId) => {
              router.refresh();
              router.push(`/contacts/${newContactId}/edit`);
            })
          );
        }}
      >
        <button className="edit-button" type="submit">
          New
        </button>
      </form>
    </>
  );
}
