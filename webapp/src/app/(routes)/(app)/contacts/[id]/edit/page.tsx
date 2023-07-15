import { EditForm } from "~/app/(components)/edit-form";
import { getContactDetail } from "~/app/(models)/contact";
import { notFound } from "next/navigation";

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
    title: `Edit contact : ${contact.twitter ?? "empty"}`,
  };
}

export default async function EditFormPage({
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

  return <EditForm contact={contact} />;
}
