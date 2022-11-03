import Link from "next/link";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="header">
        <Link href={`/`} className="nav-link">
          {"<"} Go home
        </Link>
      </div>
      <div className="page">{children}</div>
    </>
  );
}
