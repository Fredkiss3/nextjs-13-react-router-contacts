"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { createContact } from "~/app/(actions)/contacts";

export function NewContactForm() {
  const router = useRouter();

  return (
    <>
      <form
        action={createContact}
        onSubmit={(e) => {
          e.preventDefault();
          React.startTransition(
            () =>
              void createContact().then((id) => {
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
