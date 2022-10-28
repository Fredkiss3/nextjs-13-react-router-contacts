import Image from "next/image";
import Link from "next/link";
import type { Contact } from "../../layout";
import { notFound } from "next/dist/client/components/not-found";

import { DeleteForm } from "./delete-form";
import { Favorite } from "./favorite-form";
import { wait } from "../../functions";
import { PageProps } from "../../types";

export default async function ContactPage({ params }: PageProps) {
  await wait(1500);
  const contact = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/contacts/${params?.id}`
  ).then((r) => {
    if (r.status === 404) return null;
    return r.json() as Promise<Contact>;
  });

  if (!contact) {
    notFound();
    return null;
  }

  return (
    <div id="contact">
      <div>
        {contact.avatar ? (
          <Image
            key={contact.avatar}
            src={contact.avatar}
            alt={`Contact`}
            width={200}
            height={200}
          />
        ) : (
          <div className="contact-img"></div>
        )}
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <Link
              target="_blank"
              href={`https://github.com/${contact.twitter}`}
            >
              {contact.twitter}
            </Link>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Link href={`/contacts/${params?.id}/edit`} className={`edit-button`}>
            Edit
          </Link>
          <DeleteForm contactId={contact.id} />
        </div>
      </div>
    </div>
  );
}
