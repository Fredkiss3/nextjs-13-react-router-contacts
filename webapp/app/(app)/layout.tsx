import Image from "next/image";
import { Sidebar } from "./sidebar";
import { Contact } from "./types";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contacts = await fetch(`${process.env.API_SERVER}/contacts`, {
    cache: "no-store",
  }).then((r) => r.json() as Promise<Contact[]>);

  return (
    <main
      style={{
        height: `100vh`,
        display: `flex`,
      }}
    >
      <div id="sidebar">
        <h1 style={{ display: "flex", gap: "1rem" }}>
          <Image src="/nextjs.svg" alt="NextJS Logo" width={72} height={16} />{" "}
          13 Contacts
        </h1>
        <Sidebar contacts={contacts} />
      </div>
      <div id="detail">{children}</div>
    </main>
  );
}
