import { Sidebar } from "~/app/(components)/sidebar";

export function SidebarPage(props: {
    searchParams: { q: string } | undefined;
}) {
    return <Sidebar query={props.searchParams?.q} />;
}
