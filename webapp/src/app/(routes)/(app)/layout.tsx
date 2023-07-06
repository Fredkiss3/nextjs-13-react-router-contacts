import { Logo } from "~/app/(components)/logo";

export default async function MainLayout({
  children,
  sidebar,
  main,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  main: React.ReactNode;
}) {
  return (
    <main
      style={{
        height: `100vh`,
        display: `flex`,
      }}
    >
      <aside id="sidebar">
        <h1 style={{ display: "flex", gap: "1rem" }}>
          <Logo />
          13 Contacts
        </h1>

        {sidebar}
      </aside>
      <div id="detail">{main}</div>
    </main>
  );
}
