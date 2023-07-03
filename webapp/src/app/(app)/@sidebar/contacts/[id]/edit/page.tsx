import { Sidebar } from "~/(app)/@sidebar/sidebar";

export default function Page(props: {
  searchParams: { q?: string } | undefined;
}) {
  return <Sidebar query={props.searchParams?.q} />;
}
