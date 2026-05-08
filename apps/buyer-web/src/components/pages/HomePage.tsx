"use client";

import Link from "next/link";

import { categories, featuredProducts, trustSignals } from "@/data/storefront";

import { BadgeRow } from "@/components/storefront/BadgeRow";
import { ProductCard } from "@/components/storefront/ProductCard";
import { SectionHeading } from "@/components/storefront/SectionHeading";
import { useStorefront } from "@/components/storefront/StorefrontProvider";

export function HomePage() {
  const { t } = useStorefront();

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="grid gap-8 overflow-hidden rounded-[2.5rem] bg-slate-950 px-6 py-8 text-white shadow-[0_24px_70px_-32px_rgba(15,23,42,0.7)] sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-12">
        <div className="space-y-7">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-amber-400">{t.home.heroEyebrow}</p>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              {t.home.heroTitle}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {t.home.heroCopy}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-2xl bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
            >
              {t.home.primaryCta}
            </Link>
            <Link
              href="/checkout"
              className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
            >
              {t.home.secondaryCta}
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {trustSignals.promises.map((promise) => (
              <div key={promise} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                {promise}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Payment confidence</p>
            <div className="mt-4 h-px bg-white/10" />
            <div className="mt-5 space-y-4">
              <BadgeRow items={trustSignals.payments} tone="dark" />
              <p className="text-sm leading-7 text-slate-300">
                Wallet-ready checkout flows, COD availability, and trusted gateways for premium conversion.
              </p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Shipping visibility</p>
            <div className="mt-4 h-px bg-white/10" />
            <div className="mt-5 space-y-4">
              <BadgeRow items={trustSignals.shipping} tone="dark" />
              <p className="text-sm leading-7 text-slate-300">
                Delivery signals tailored for Dhaka and nationwide courier expectations.
              </p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-amber-300/20 bg-gradient-to-br from-amber-400/20 to-orange-400/20 p-6 sm:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Weekend campaign</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Save up to 25% with wallet and bank offers</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-200">
              Curated homepage merchandising with premium spacing, trust badges, and promotional storytelling.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Curated categories"
          title={t.home.categoryTitle}
          copy="Each section is designed like a polished marketplace shelf: easy scanning, strong hierarchy, and calm spacing."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br ${category.accent} p-8 text-white shadow-[0_16px_40px_-24px_rgba(15,23,42,0.35)]`}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Category spotlight</p>
              <h3 className="mt-4 text-3xl font-black tracking-tight">{category.name}</h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-white/85">{category.subtitle}</p>
              <Link href="/products" className="mt-8 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                Explore now →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Featured products"
          title={t.home.featuredTitle}
          copy="Amazon-inspired card density, but tuned for a premium Bangladesh storefront with cleaner breathing room."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-[0_16px_45px_-28px_rgba(15,23,42,0.28)]">
          <SectionHeading
            eyebrow="Trust framework"
            title={t.home.trustTitle}
            copy="A premium buyer experience needs visible reassurance in every major decision point."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Visible payment partner badges above the fold",
              "Delivery promise blocks built for courier-heavy operations",
              "Local language toggle without cluttering the interface",
              "Clear pricing with discount framing and seller confidence",
            ].map((item) => (
              <div key={item} className="rounded-[1.75rem] bg-slate-50 p-5 text-sm leading-7 text-slate-600">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2.25rem] bg-gradient-to-br from-teal-600 via-cyan-600 to-slate-900 p-8 text-white shadow-[0_18px_50px_-30px_rgba(8,145,178,0.6)]">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100">Promo banner</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight">{t.home.promoTitle}</h2>
          <p className="mt-4 max-w-lg text-base leading-8 text-cyan-50">{t.home.promoCopy}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "0% EMI on selected electronics",
              "Pathao & REDX priority routing",
              "Wallet cashback every weekend",
              "Premium customer support response lanes",
            ].map((benefit) => (
              <div key={benefit} className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4 text-sm">
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
