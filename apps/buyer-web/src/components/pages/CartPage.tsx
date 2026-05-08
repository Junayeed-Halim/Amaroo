"use client";

import { useMemo, useState } from "react";

import { getCartProducts, formatTaka } from "@/lib/storefront";

import { useStorefront } from "@/components/storefront/StorefrontProvider";

export function CartPage() {
  const { t } = useStorefront();
  const [items, setItems] = useState(getCartProducts());

  const summary = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 10000 ? 0 : 120;
    const serviceFee = 85;

    return {
      subtotal,
      shipping,
      serviceFee,
      total: subtotal + shipping + serviceFee,
    };
  }, [items]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-[0_16px_45px_-28px_rgba(15,23,42,0.28)]">
        <h1 className="text-4xl font-black tracking-tight text-slate-950">{t.cart.title}</h1>
        <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">{t.cart.subtitle}</p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="grid gap-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.28)] sm:grid-cols-[180px_1fr]"
            >
              <div className={`flex h-40 items-end justify-between rounded-[1.5rem] bg-gradient-to-br ${item.accent} p-5 text-white`}>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.28em] backdrop-blur">
                  {item.badge}
                </span>
                <span className="text-2xl font-black tracking-tight">{item.imageLabel}</span>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{item.category}</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">{item.name}</h2>
                  <p className="mt-2 text-sm text-slate-600">{item.note}</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-1">
                    <button
                      type="button"
                      onClick={() =>
                        setItems((current) =>
                          current.map((currentItem) =>
                            currentItem.id === item.id
                              ? { ...currentItem, quantity: Math.max(1, currentItem.quantity - 1) }
                              : currentItem,
                          ),
                        )
                      }
                      className="rounded-full px-4 py-2 text-sm font-bold text-slate-600"
                    >
                      −
                    </button>
                    <span className="min-w-10 text-center text-sm font-bold text-slate-950">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setItems((current) =>
                          current.map((currentItem) =>
                            currentItem.id === item.id
                              ? { ...currentItem, quantity: currentItem.quantity + 1 }
                              : currentItem,
                          ),
                        )
                      }
                      className="rounded-full px-4 py-2 text-sm font-bold text-slate-600"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Line total</p>
                    <p className="text-2xl font-black tracking-tight text-slate-950">
                      {formatTaka(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        <aside className="h-fit rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_16px_45px_-28px_rgba(15,23,42,0.55)] lg:sticky lg:top-36">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-white/60">Order summary</p>
          <div className="mt-6 space-y-4 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{formatTaka(summary.subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>{summary.shipping === 0 ? 'Free' : formatTaka(summary.shipping)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Service fee</span>
              <span>{formatTaka(summary.serviceFee)}</span>
            </div>
          </div>
          <div className="my-6 h-px bg-white/10" />
          <div className="flex items-center justify-between text-lg font-bold">
            <span>Total</span>
            <span>{formatTaka(summary.total)}</span>
          </div>
          <a
            href="/checkout"
            className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-amber-400 px-6 py-4 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
          >
            {t.cart.checkout}
          </a>
          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
            Supports bKash, Nagad, Rocket, SSLCommerz, AmarPay, and cash on delivery where eligible.
          </div>
        </aside>
      </div>
    </div>
  );
}
