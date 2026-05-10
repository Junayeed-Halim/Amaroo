import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amaroo Seller Dashboard",
  description: "Manage your Amaroo store — products, orders, analytics.",
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
