import Link from "next/link";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        .header {
          background-color: #f7f7f7;
          padding: 1rem 2rem;
          width: 100%;
          position: absolute;
          inset-inline: 0;
          top: 0;
        }
        .page {
          margin-top: 4rem;
        }
        .nav-link {
          text-decoration: none;
          color: #3992ff;
          font-weight: 500;
        }
      `}</style>
      <div className="header">
        <Link href={`/`} className="nav-link">
          {"<"} Go home
        </Link>
      </div>
      <div className="page">{children}</div>
    </>
  );
}
