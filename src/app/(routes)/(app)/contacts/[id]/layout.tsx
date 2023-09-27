import Link from "next/link";

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <header className="header">
                <Link href="/" className="nav-link">
                    {"<"} Go home
                </Link>
            </header>
            <div className="page">{children}</div>
        </>
    );
}
