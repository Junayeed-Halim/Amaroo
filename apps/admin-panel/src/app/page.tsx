export default function AdminHome() {
  const metrics = [
    { label: "Open disputes", value: "12", delta: "3 urgent" },
    { label: "Seller approvals", value: "8", delta: "2 waiting on docs" },
    { label: "Risk alerts", value: "5", delta: "1 high priority" },
    { label: "Catalog flags", value: "19", delta: "Needs review" },
  ];

  const queues = [
    { title: "KYC review", items: ["Fresh Mart BD", "Urban Bazaar", "TechNest Commerce"] },
    { title: "Dispute queue", items: ["AMR-D-2049 refund", "AMR-D-2044 damaged item", "AMR-D-2038 COD mismatch"] },
    { title: "Risk watchlist", items: ["Multiple failed OTP attempts", "High refund velocity seller", "Address mismatch pattern"] },
  ];

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="overflow-hidden rounded-[2.5rem] bg-slate-950 px-6 py-8 text-white shadow-[0_24px_70px_-32px_rgba(15,23,42,0.72)] sm:px-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-amber-400">Platform operations</p>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Keep Amaroo trusted with fast review, clear risk signals, and tight merchant control.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300">
              The admin console is the control room for seller KYC, disputes, catalog moderation, fraud triage, and
              courier/payment oversight.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Approve seller', 'Open dispute', 'Review risk'].map((action) => (
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
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">System status</p>
              <p className="mt-4 text-3xl font-black tracking-tight">Healthy</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">All major seller and buyer flows are online.</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">Compliance SLA</p>
              <p className="mt-4 text-3xl font-black tracking-tight">2h 15m</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">Average time to close urgent trust issues.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.28)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{metric.label}</p>
            <p className="mt-4 text-3xl font-black tracking-tight text-slate-950">{metric.value}</p>
            <p className="mt-2 text-sm font-medium text-slate-500">{metric.delta}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          {queues.map((queue) => (
            <section
              key={queue.title}
              className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.28)] sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Queue</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">{queue.title}</h2>
                </div>
                <button
                  type="button"
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Open queue
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {queue.items.map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-[1.5rem] bg-slate-50 px-5 py-4">
                    <p className="text-sm font-semibold text-slate-800">{item}</p>
                    <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-white">
                      Review
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="space-y-6">
          <section className="rounded-[2.25rem] bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.28)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-800">Today&apos;s focus</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Clear trust issues before peak traffic.</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Prioritize KYC, disputes, and suspicious activity so sellers can stay active and buyers stay confident.
            </p>
          </section>

          <section className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.28)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Operations notes</p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
              <p>• AmarPay and SSLCommerz settlement reconciliation pending for the morning batch.</p>
              <p>• One seller needs trade license verification before going live.</p>
              <p>• Two product listings were flagged for misleading coupon language.</p>
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
