import { EditForm } from "./edit-form";
import type { Contact } from "~/types";

export default async function EditFormPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const contact = await fetch(
    `${process.env.API_SERVER}/contacts/${params?.id}`,
    {
      next: {
        tags: ["contacts", `contact-${params.id}`],
      },
    }
  ).then((r) => r.json() as Promise<Contact>);

  return <EditForm contact={contact} />;
}
