import { Sidebar } from "~/app/(components)/sidebar";

export default function SidebarPage(props: {
  searchParams: { q: string } | undefined;
}) {
  return <Sidebar query={props.searchParams?.q} />;
}
