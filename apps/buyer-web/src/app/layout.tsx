import type { Metadata } from "next";
import "./globals.css";

import { StorefrontShell } from "@/components/storefront/StorefrontShell";

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
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">
        <StorefrontShell>{children}</StorefrontShell>
      </body>
    </html>
  );
}
