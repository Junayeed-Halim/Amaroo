import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amaroo Buyer Web",
  description: "Trust-first Bangladesh eCommerce storefront scaffold",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" data-theme="high-clarity">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
