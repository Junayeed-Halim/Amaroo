"use client";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { StorefrontProvider } from "./StorefrontProvider";

export function StorefrontShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StorefrontProvider>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.08),_transparent_30%),linear-gradient(to_bottom,_#f8fafc,_#eef4f7_46%,_#eef2ff)] text-slate-950">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </StorefrontProvider>
  );
}
