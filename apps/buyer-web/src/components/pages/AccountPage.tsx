"use client";

import { accountOrders } from "@/data/storefront";
import { formatTaka } from "@/lib/storefront";

import { useStorefront } from "@/components/storefront/StorefrontProvider";

export function AccountPage() {
  const { t } = useStorefront();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-[0_16px_45px_-28px_rgba(15,23,42,0.28)]">
        <h1 className="text-4xl font-black tracking-tight text-slate-950">{t.account.title}</h1>
        <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">{t.account.subtitle}</p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.28)]">
          <div className="rounded-[1.75rem] bg-gradient-to-br from-slate-950 via-slate-800 to-teal-700 p-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Profile snapshot</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight">Tania Rahman</h2>
            <p className="mt-2 text-sm text-slate-200">Prime-style buyer tier · Dhaka, Bangladesh</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {[
              { label: 'Saved addresses', value: '3' },
              { label: 'Wishlist items', value: '18' },
              { label: 'Wallet offers', value: '6' },
              { label: 'Support cases', value: '1 open' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-[1.5rem] bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
                <p className="mt-3 text-2xl font-black tracking-tight text-slate-950">{stat.value}</p>
              </div>
            ))}
          </div>
        </aside>

        <section className="space-y-4">
          {accountOrders.map((order) => (
            <div key={order.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.28)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Order {order.id}</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">{order.status}</h2>
                  <p className="mt-2 text-sm text-slate-600">Placed on {order.date} · {order.items} item(s)</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Order total</p>
                  <p className="text-2xl font-black tracking-tight text-slate-950">{formatTaka(order.total)}</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {['Track package', 'View invoice', 'Need help?'].map((action) => (
                  <button
                    key={action}
                    type="button"
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
