import { Contact } from "../../../layout";
import { PageProps } from "../../../types";
import { EditForm } from "./edit-form";

const EditFormPage = async function ({ params }: PageProps) {
  const contact = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/contacts/${params?.id}`
  ).then((r) => r.json() as Promise<Contact>);

  return <EditForm contact={contact} />;
};

export default EditFormPage;
