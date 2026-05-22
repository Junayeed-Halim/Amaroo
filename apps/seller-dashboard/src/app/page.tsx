export default function SellerDashboardHome() {
  const stats = [
    { label: "Today\'s revenue", value: "৳128,400", delta: "+18%" },
    { label: "Open orders", value: "42", delta: "+7" },
    { label: "Low-stock SKUs", value: "9", delta: "Needs restock" },
    { label: "Payout pending", value: "৳64,200", delta: "Settles Friday" },
  ];

  const products = [
    { name: "Walton Inverter AC 1.5 Ton", status: "Active", stock: "24 units", price: "৳62,990" },
    { name: "Aarong Inspired Jamdani Saree", status: "Campaign ready", stock: "11 units", price: "৳8,450" },
    { name: "Neutrogena Hydro Boost Water Gel", status: "Low stock", stock: "4 units", price: "৳2,190" },
  ];

  const orders = [
    { id: "AMR-S-2048", customer: "Nusrat Jahan", status: "Packed", total: "৳8,450" },
    { id: "AMR-S-2047", customer: "Tareq Hasan", status: "Awaiting courier pickup", total: "৳62,990" },
    { id: "AMR-S-2046", customer: "Sadia Ahmed", status: "Cash on delivery", total: "৳2,190" },
  ];

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="overflow-hidden rounded-[2.5rem] bg-slate-950 px-6 py-8 text-white shadow-[0_24px_70px_-32px_rgba(15,23,42,0.72)] sm:px-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-amber-400">Merchant control center</p>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Run your Amaroo storefront with clarity, speed, and fewer surprises.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300">
              Monitor orders, stock, payouts, and campaign readiness from one focused dashboard built for Bangladesh
              sellers.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Add product', 'Review orders', 'View payouts'].map((action) => (
                <button
                  key={action}
                  type="button"
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">Seller health</p>
              <p className="mt-4 text-3xl font-black tracking-tight">96/100</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">Ready for weekend traffic and promotion spikes.</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">Delivery mix</p>
              <p className="mt-4 text-3xl font-black tracking-tight">COD 58%</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">bKash and cash-on-delivery still lead conversion.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.28)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{stat.label}</p>
            <p className="mt-4 text-3xl font-black tracking-tight text-slate-950">{stat.value}</p>
            <p className="mt-2 text-sm font-medium text-slate-500">{stat.delta}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.28)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Catalog</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Products needing attention</h2>
            </div>
            <button
              type="button"
              className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Open catalog
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {products.map((product) => (
              <div
                key={product.name}
                className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-lg font-bold text-slate-950">{product.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{product.stock} · {product.price}</p>
                </div>
                <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] ${
                  product.status === 'Low stock'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {product.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.28)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Orders</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Recent order queue</h2>
            <div className="mt-6 space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="rounded-[1.5rem] bg-slate-50 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{order.id}</p>
                      <p className="mt-2 text-lg font-bold text-slate-950">{order.customer}</p>
                      <p className="mt-1 text-sm text-slate-500">{order.status}</p>
                    </div>
                    <p className="text-lg font-black tracking-tight text-slate-950">{order.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2.25rem] border border-slate-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.28)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-800">Campaigns</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Weekend promotion readiness</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Flag products for flash sale placement, highlight COD-friendly items, and keep low-stock items off the
              front page until replenished.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
