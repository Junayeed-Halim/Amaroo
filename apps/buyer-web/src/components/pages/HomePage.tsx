"use client";

import Link from "next/link";

import {
  catalogProducts,
  categories,
  flashSaleEndsAt,
  flashSaleProductIds,
  recommendedProductIds,
  trustSignals,
} from "@/data/storefront";

import { BadgeRow } from "@/components/storefront/BadgeRow";
import { FlashSaleTimer } from "@/components/storefront/FlashSaleTimer";
import { ProductCard } from "@/components/storefront/ProductCard";
import { SectionHeading } from "@/components/storefront/SectionHeading";
import { useStorefront } from "@/components/storefront/StorefrontProvider";

const flashSaleIds = new Set<number>(flashSaleProductIds);
const recommendedIds = new Set<number>(recommendedProductIds);
const flashSaleProducts = catalogProducts.filter((product) => flashSaleIds.has(product.id));
const recommendedProducts = catalogProducts.filter((product) => recommendedIds.has(product.id));

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
              Browse products
            </Link>
            <Link
              href="/auth/login"
              className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
            >
              Sign in
            </Link>
            <Link
              href="/auth/register"
              className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white/90 backdrop-blur transition hover:bg-white/10"
            >
              Create account
            </Link>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-slate-400">
            Browse freely without an account, or sign in anytime to track orders and save your details.
          </p>

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
          copy="Browse category collections tailored for fast buyer navigation."
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
        <div className="overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-teal-600 via-cyan-600 to-slate-900 p-6 text-white shadow-[0_18px_50px_-30px_rgba(8,145,178,0.6)] sm:p-8">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-cyan-100">Flash sale</p>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{t.home.flashSaleTitle}</h2>
            <p className="max-w-3xl text-base leading-7 text-cyan-100/90">{t.home.flashSaleCopy}</p>
          </div>
          <div className="mt-6 max-w-md">
            <FlashSaleTimer endAt={flashSaleEndsAt} />
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading eyebrow="Recommended products" title={t.home.recommendedTitle} copy={t.home.recommendedCopy} />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
