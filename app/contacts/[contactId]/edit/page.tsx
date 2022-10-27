import { Contact } from "../../../layout";
import { EditForm } from "./edit-form";

export default async function EditContactPage({
  params,
}: {
  params: { contactId: string };
}) {
  const contact = await fetch(
    `http://localhost:8098/contacts/${params.contactId}`
  ).then((r) => r.json() as Promise<Contact>);

  return <EditForm contact={contact} />;
}
