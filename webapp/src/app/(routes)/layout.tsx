import "./globals.css";
import * as React from "react";

export const metadata = {
  title: "Contacts App With Next 13",
  description: "A reproduction of the app in remix tutorial",
};

export const runtime = "edge";
export const fetchCache = "force-no-store";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
