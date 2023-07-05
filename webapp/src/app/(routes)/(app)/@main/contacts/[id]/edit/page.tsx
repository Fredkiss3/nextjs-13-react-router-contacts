import { EditForm } from "~/app/(components)/edit-form";
import { getContactDetail } from "~/app/(actions)/contacts";
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
