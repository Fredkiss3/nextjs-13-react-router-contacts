import Link from "next/link";
import type { Metadata } from "next";
import type { Contact } from "../../types";

import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}): Promise<Metadata> {
  const contact = await fetch(
    `${process.env.API_SERVER}/contacts/${params?.id}`,
    { cache: "no-store" }
  ).then((r) => {
    if (r.status === 404) return null;
    return r.json() as Promise<Contact>;
  });

  if (!contact) {
    notFound();
  }

  return {
    title: `Contact : ${contact.twitter}`,
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="header">
        <Link href={`/`} className="nav-link">
          {"<"} Go home
        </Link>
      </div>
      <div className="page">{children}</div>
    </>
  );
}
