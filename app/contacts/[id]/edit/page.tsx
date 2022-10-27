import { Contact } from "../../../layout";
import { EditForm } from "./edit-form";

type PageParams = Record<string, string>;
interface PageProps {
  params?: PageParams;
  searchParams?: Record<string, string | string[]>;
}

const EditFormPage = async function ({ params }: PageProps) {
  const contact = await fetch(
    `http://localhost:8098/contacts/${params?.id}`
  ).then((r) => r.json() as Promise<Contact>);

  return <EditForm contact={contact} />;
};

export default EditFormPage;
