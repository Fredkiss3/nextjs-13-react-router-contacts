import * as React from "react";

// components
import Image from "next/image";
import Link from "next/link";
import { DeleteForm } from "~/app/(components)/delete-form";
import { FavoriteForm } from "~/app/(components)/favorite-form";

// utils
import { renderMarkdown } from "~/lib/server-utils";
import { notFound } from "next/navigation";
import { getContactDetail } from "~/app/(models)/contact";

// types
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: {
        id: string;
    };
}): Promise<Metadata> {
    const contact = await getContactDetail(Number(params.id));

    if (!contact) {
        notFound();
    }

    return {
        title: `Contact : ${contact.github_handle ?? "<no name>"}`,
    };
}

export default async function ContactPage({
    params,
}: {
    params: {
        id: string;
    };
}) {
    const contact = await getContactDetail(Number(params.id));

    if (!contact) {
        notFound();
    }

    return (
        <section id="contact">
            <div>
                {contact.avatar_url ? (
                    <Image
                        src={contact.avatar_url}
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
                    <FavoriteForm
                        isFavorite={contact.favorite}
                        contactId={contact.id}
                    />
                </h1>

                {contact.github_handle && (
                    <p>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            className="github_handle"
                            href={`https://github.com/${contact.github_handle}`}
                        >
                            {contact.github_handle}
                        </a>
                    </p>
                )}

                {contact.notes && (
                    <article
                        dangerouslySetInnerHTML={{
                            __html: renderMarkdown(contact.notes),
                        }}
                    />
                )}

                <div>
                    <Link
                        href={`/contacts/${params.id}/edit`}
                        className={`edit-button`}
                    >
                        Edit
                    </Link>
                    <DeleteForm contactId={contact.id} />
                </div>
            </div>
        </section>
    );
}
