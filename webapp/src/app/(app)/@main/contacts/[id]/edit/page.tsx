import { EditForm } from "./edit-form";
import { getContactDetail } from "~/_actions";
import { notFound } from "next/navigation";

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
