"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { createContact } from "./_actions";

export function NewContactForm() {
  const router = useRouter();

  return (
    <>
      <form
        method="post"
        action={createContact}
        onSubmit={(e) => {
          e.preventDefault();
          React.startTransition(
            () =>
              void createContact(new FormData(e.currentTarget)).then((id) => {
                router.refresh();
                router.push(`/contacts/${id}/edit`);
              })
          );
        }}
      >
        <button type="submit">New</button>
      </form>
    </>
  );
}
