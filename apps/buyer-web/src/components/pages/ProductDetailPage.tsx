"use client";

import type { Product } from "@/data/storefront";
import { trustSignals } from "@/data/storefront";
import { formatTaka, getDiscountPercent } from "@/lib/storefront";

import { BadgeRow } from "@/components/storefront/BadgeRow";
import { RatingStars } from "@/components/storefront/RatingStars";
import { useStorefront } from "@/components/storefront/StorefrontProvider";

export function ProductDetailPage({ product }: { product: Product }) {
  const { t } = useStorefront();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="grid gap-8 rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.28)] lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
        <div className="space-y-4">
          <div className={`flex min-h-[420px] items-end justify-between rounded-[2rem] bg-gradient-to-br ${product.accent} p-8 text-white`}>
            <div>
              <p className="rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.32em] backdrop-blur">
                {product.badge}
              </p>
              <h1 className="mt-5 text-5xl font-black tracking-tight">{product.imageLabel}</h1>
            </div>
            <div className="rounded-[1.75rem] border border-white/20 bg-white/10 px-5 py-4 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">Seller</p>
              <p className="mt-2 text-lg font-semibold">{product.seller}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            {product.gallery.map((item) => (
              <button
                key={item}
                type="button"
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-5 text-left text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-white"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-600">{product.category}</p>
            <h2 className="text-4xl font-black tracking-tight text-slate-950">{product.name}</h2>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <RatingStars rating={product.rating} />
              <span>{product.rating} rating</span>
              <span>•</span>
              <span>{product.reviewCount} reviews</span>
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-50 p-6">
            <div className="flex flex-wrap items-end gap-4">
              <span className="text-4xl font-black tracking-tight text-slate-950">{formatTaka(product.price)}</span>
              <span className="text-lg text-slate-400 line-through">{formatTaka(product.originalPrice)}</span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">
                Save {getDiscountPercent(product)}%
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">{product.delivery} · ETA {product.eta}</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">Variants</p>
            <div className="flex flex-wrap gap-3">
              {product.variants.map((variant, index) => (
                <button
                  key={variant}
                  type="button"
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    index === 0
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {variant}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" className="rounded-2xl bg-amber-400 px-6 py-4 text-sm font-bold text-slate-950 transition hover:bg-amber-300">
              {t.pdp.addToCart}
            </button>
            <button type="button" className="rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white transition hover:bg-slate-800">
              {t.pdp.buyNow}
            </button>
          </div>

          <div className="grid gap-5 rounded-[2rem] border border-slate-200 bg-white p-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">Highlights</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                {product.highlights.map((highlight) => (
                  <li key={highlight}>• {highlight}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">{t.pdp.deliveryTitle}</p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <p>{product.delivery}</p>
                <p>Nationwide delivery via Pathao, REDX, Steadfast, Paperfly, and Sundarban.</p>
                <p>Secure payment options include bKash, Nagad, Rocket, SSLCommerz, and AmarPay.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_16px_45px_-28px_rgba(15,23,42,0.28)]">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-slate-500">{t.pdp.reviewsTitle}</p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <span className="text-5xl font-black tracking-tight text-slate-950">{product.rating}</span>
            <div>
              <RatingStars rating={product.rating} />
              <p className="mt-2 text-sm text-slate-500">Based on {product.reviewCount} verified mock reviews</p>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            {[
              { label: '5 star', value: 82 },
              { label: '4 star', value: 12 },
              { label: '3 star', value: 4 },
              { label: '2 star', value: 1 },
              { label: '1 star', value: 1 },
            ].map((row) => (
              <div key={row.label} className="grid grid-cols-[64px_1fr_48px] items-center gap-4 text-sm text-slate-600">
                <span>{row.label}</span>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className="h-3 rounded-full bg-amber-400" style={{ width: `${row.value}%` }} />
                </div>
                <span>{row.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-5 rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_16px_45px_-28px_rgba(15,23,42,0.55)] h-fit">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-white/60">Trusted checkout</p>
          <BadgeRow items={trustSignals.payments} tone="dark" />
          <div className="h-px bg-white/10" />
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-white/60">Courier network</p>
          <BadgeRow items={trustSignals.shipping} tone="dark" />
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
            Eligible for COD, digital wallet payment, and standard return support. UI scaffold only — no live integrations yet.
          </div>
        </aside>
      </section>
    </div>
  );
}
