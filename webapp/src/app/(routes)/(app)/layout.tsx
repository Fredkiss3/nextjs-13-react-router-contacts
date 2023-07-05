import Image from "next/image";

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
          <Image src="/nextjs.svg" alt="NextJS Logo" width={72} height={16} />{" "}
          13 Contacts
        </h1>

        {sidebar}
      </aside>
      <div id="detail">{main}</div>
    </main>
  );
}
