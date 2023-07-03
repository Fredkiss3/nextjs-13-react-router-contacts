import type { Contact, PageProps } from "../../../types";
import { EditForm } from "./edit-form";

export default async function EditFormPage({ params }: PageProps) {
  const contact = await fetch(
    `${process.env.API_SERVER}/contacts/${params?.id}`,
    { cache: "no-store" }
  ).then((r) => r.json() as Promise<Contact>);

  return <EditForm contact={contact} />;
}
