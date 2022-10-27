import Link from "next/link";
import "../app/globals.css";
export default function NotFoundPage() {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>This page could not be found.</p>
      <Link href={`/`}>Go home</Link>
    </div>
  );
}
