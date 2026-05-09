import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amaroo Admin Panel",
  description: "Amaroo platform administration — sellers, disputes, analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
