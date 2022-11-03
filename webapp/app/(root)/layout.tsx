import Image from "next/image";
import { Sidebar } from "./sidebar";
import {wait} from './functions';

export type Contact = {
  id: number;
  createdAt: number; // timestamp
  first?: string;
  last?: string;
  favorite?: boolean;
  avatar?: string;
  twitter?: string;
  notes?: string;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await wait(1500);
  console.time('fetch /contacts');
  const contacts = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/contacts`,
    { cache: "no-store" }
    ).then((r) => r.json() as Promise<Contact[]>);
  console.timeEnd('fetch /contacts');

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
