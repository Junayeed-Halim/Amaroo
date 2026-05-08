"use client";

import { checkoutSteps, trustSignals } from "@/data/storefront";
import { formatTaka, getCartSummary } from "@/lib/storefront";

import { BadgeRow } from "@/components/storefront/BadgeRow";
import { useStorefront } from "@/components/storefront/StorefrontProvider";

const summary = getCartSummary();

export function CheckoutPage() {
  const { t } = useStorefront();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-[0_16px_45px_-28px_rgba(15,23,42,0.28)]">
        <h1 className="text-4xl font-black tracking-tight text-slate-950">{t.checkout.title}</h1>
        <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">{t.checkout.subtitle}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {checkoutSteps.map((step, index) => (
            <div
              key={step}
              className={`inline-flex items-center gap-3 rounded-full px-4 py-3 text-sm font-semibold ${
                index === 0
                  ? "bg-slate-950 text-white"
                  : "border border-slate-200 bg-slate-50 text-slate-600"
              }`}
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs font-bold">
                {index + 1}
              </span>
              {step}
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="space-y-6">
          {[
            {
              title: 'Shipping details',
              content: (
                <div className="grid gap-4 md:grid-cols-2">
                  {['Full name', 'Phone number', 'City', 'Area / Address'].map((field) => (
                    <label key={field} className="space-y-2 text-sm font-semibold text-slate-600">
                      <span>{field}</span>
                      <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-500" placeholder={field} />
                    </label>
                  ))}
                </div>
              ),
            },
            {
              title: 'Payment method',
              content: (
                <div className="space-y-4">
                  <BadgeRow items={trustSignals.payments} />
                  <div className="grid gap-3 md:grid-cols-2">
                    {['Wallet / gateway payment', 'Cash on delivery', 'Card / EMI (UI only)', 'Saved method placeholder'].map((method, index) => (
                      <button
                        key={method}
                        type="button"
                        className={`rounded-[1.5rem] border p-5 text-left text-sm font-semibold transition ${
                          index === 0
                            ? 'border-slate-950 bg-slate-950 text-white'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              ),
            },
            {
              title: 'Review before placing order',
              content: (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.5rem] bg-slate-50 p-5 text-sm leading-7 text-slate-600">
                    Confirm recipient, address, contact number, and preferred time slot before final checkout integration.
                  </div>
                  <div className="rounded-[1.5rem] bg-slate-50 p-5 text-sm leading-7 text-slate-600">
                    Review payment trust badges, courier availability, and mock order lines to keep the final step low-stress.
                  </div>
                </div>
              ),
            },
          ].map((section) => (
            <div key={section.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.28)]">
              <h2 className="text-2xl font-black tracking-tight text-slate-950">{section.title}</h2>
              <div className="mt-5">{section.content}</div>
            </div>
          ))}
        </section>

        <aside className="h-fit rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_16px_45px_-28px_rgba(15,23,42,0.55)] lg:sticky lg:top-36">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-white/60">Final summary</p>
          <div className="mt-6 space-y-4 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <span>Items</span>
              <span>{summary.itemCount}</span>
            </div>
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
          <button
            type="button"
            className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-amber-400 px-6 py-4 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
          >
            {t.checkout.placeOrder}
          </button>
          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
            Amaroo checkout is designed to highlight bKash, Nagad, Rocket, SSLCommerz, AmarPay, Pathao, REDX, Steadfast, Paperfly, and Sundarban confidence signals.
          </div>
        </aside>
      </div>
    </div>
  );
}
