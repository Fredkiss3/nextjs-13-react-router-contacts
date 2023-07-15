"use client";

import * as React from "react";
import { NewContactForm } from "./new-contact-form";
import { usePathname, useRouter } from "next/navigation";
import { debounce } from "~/lib/functions";

export type SidebarFormProps = {
  searchQuery?: string;
};

export function SidebarForm({ searchQuery }: SidebarFormProps) {
  const router = useRouter();
  const path = usePathname();
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = React.useTransition();

  const submitForm = React.useCallback(
    debounce(() => {
      formRef.current?.requestSubmit();
    }),
    []
  );

  return (
    <>
      <div>
        <form
          id="search-form"
          ref={formRef}
          role="search"
          method="get"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);

            // @ts-expect-error the URLSearchParams constructor works with form data
            const params = new URLSearchParams(formData);
            startTransition(() => router.push(path + "?" + params.toString()));
          }}
        >
          <input
            id="q"
            aria-label="Search contacts"
            placeholder="Search"
            autoComplete="off"
            type="search"
            name="q"
            defaultValue={searchQuery}
            onChange={() => {
              submitForm();
            }}
          />
          <div id="search-spinner" aria-hidden hidden={!isPending} />
          <div className="sr-only" aria-live="polite">
            {isPending && "Loading"}
          </div>
        </form>

        <NewContactForm />
      </div>
    </>
  );
}
