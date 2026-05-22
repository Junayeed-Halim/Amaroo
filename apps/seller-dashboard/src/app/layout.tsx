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
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.14),_transparent_28%),linear-gradient(to_bottom,_#f8fafc,_#eef2ff_46%,_#e2e8f0)] text-slate-950 antialiased">
        {children}
      </body>
    </html>
  );
}
