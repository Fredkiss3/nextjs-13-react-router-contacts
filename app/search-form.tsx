"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function SearchForm() {
  const searchParams = useSearchParams();

  const router = useRouter();
  const path = usePathname();

  function handleSearch(form: HTMLFormElement) {
    const data = new FormData(form);

    router.push(`${path}?q=${data.get("q")}`);
  }

  return (
    <>
      <form
        id="search-form"
        role="search"
        method="get"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(e.currentTarget);
        }}
      >
        <input
          id="q"
          aria-label="Search contacts"
          placeholder="Search"
          type="search"
          name="q"
          defaultValue={searchParams.get("p") ?? ""}
          onChange={(event) => {
            handleSearch(event.currentTarget.form!);
          }}
        />
        <div id="search-spinner" aria-hidden hidden={true} />
        <div className="sr-only" aria-live="polite"></div>
      </form>
    </>
  );
}
