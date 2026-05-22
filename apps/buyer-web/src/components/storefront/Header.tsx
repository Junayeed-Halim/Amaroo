"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { getCartSummary } from "@/lib/storefront";

import { useStorefront } from "./StorefrontProvider";
import { Logo } from "./Logo";

const links = [
  { href: "/", key: "home" },
  { href: "/products", key: "shop" },
  { href: "/products", key: "deals" },
  { href: "/account", key: "account" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { t, toggleLocale } = useStorefront();
  const cartSummary = getCartSummary();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    router.push(query ? `/products?query=${encodeURIComponent(query)}` : "/products");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="shrink-0" aria-label="Amaroo home">
              <Logo />
            </Link>
            <p className="hidden rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 md:inline-flex">
              {t.header.location}
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex flex-1 items-center gap-3 lg:max-w-3xl">
            <div className="flex flex-1 items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-inner shadow-slate-100">
              <span aria-hidden="true" className="mr-3 text-slate-400">⌕</span>
              <input
                aria-label={t.header.searchPlaceholder}
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                placeholder={t.header.searchPlaceholder}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
            <button
              type="submit"
              className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Browse
            </button>
            <button
              type="button"
              onClick={toggleLocale}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              {t.header.language}
            </button>
          </form>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700 xl:block">
              {t.header.support}
            </div>
            <Link
              href="/account"
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              {t.nav.account}
            </Link>
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15"
            >
              {t.nav.cart}
              <span className="rounded-full bg-white/15 px-2 py-1 text-xs">
                {cartSummary.itemCount}
              </span>
            </Link>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2" aria-label="Primary navigation">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={`${link.href}-${link.key}`}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                {t.nav[link.key as keyof typeof t.nav]}
              </Link>
            );
          })}
          <div className="ml-auto hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400 md:flex">
            <span>Trusted payments</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-500">bKash</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-500">SSLCommerz</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
