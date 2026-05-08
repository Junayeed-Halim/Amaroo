"use client";

import Link from "next/link";

import { getTrustGroups } from "@/lib/storefront";

import { BadgeRow } from "./BadgeRow";
import { useStorefront } from "./StorefrontProvider";

export function Footer() {
  const { t } = useStorefront();
  const trustGroups = getTrustGroups();

  return (
    <footer className="mt-16 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-amber-400">Amaroo</p>
            <h2 className="max-w-xl text-3xl font-black tracking-tight">{t.footer.title}</h2>
            <p className="max-w-2xl text-base leading-7 text-slate-300">{t.footer.blurb}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {trustGroups.map((group) => (
              <div key={group.label} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
                  {group.label}
                </p>
                <BadgeRow items={group.items} tone="dark" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Explore</p>
            <div className="space-y-3 text-sm text-slate-300">
              <Link href="/products" className="block hover:text-white">All products</Link>
              <Link href="/checkout" className="block hover:text-white">Checkout</Link>
              <Link href="/account" className="block hover:text-white">My account</Link>
            </div>
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Buyer promise</p>
            <div className="space-y-3 text-sm text-slate-300">
              <p>Authentic sellers and transparent pricing</p>
              <p>Nationwide courier coverage with live-ready UX</p>
              <p>Designed for bilingual Bangladesh commerce</p>
            </div>
          </div>
          <div className="sm:col-span-2 border-t border-white/10 pt-6 text-sm text-slate-400">
            © 2026 Amaroo. UI scaffold for buyer storefront experience.
          </div>
        </div>
      </div>
    </footer>
  );
}
