"use client";

export type SearchFormProps = {
  onChangeQuery: (newQuery: string) => void;
  query: string;
};

export function SearchForm(props: SearchFormProps) {
  function handleSearch(form: HTMLFormElement) {
    const data = new FormData(form);
    props.onChangeQuery(data.get("q")?.toString() ?? "");
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
          defaultValue={props.query}
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
