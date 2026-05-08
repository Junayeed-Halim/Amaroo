"use client";

import { catalogProducts } from "@/data/storefront";

import { ProductCard } from "@/components/storefront/ProductCard";
import { SectionHeading } from "@/components/storefront/SectionHeading";
import { useStorefront } from "@/components/storefront/StorefrontProvider";

const filters = {
  departments: ["Electronics", "Fashion", "Home & Living", "Beauty", "Groceries"],
  fulfilment: ["Dhaka Express", "Nationwide", "Cash on Delivery", "Official Store"],
  price: ["Under ৳2,000", "৳2,000 - ৳10,000", "৳10,000 - ৳50,000", "Above ৳50,000"],
};

export function ProductListingPage() {
  const { t } = useStorefront();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-[0_16px_45px_-28px_rgba(15,23,42,0.28)]">
        <SectionHeading eyebrow="Product listing" title={t.plp.title} copy={t.plp.subtitle} />
      </section>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.28)] h-fit lg:sticky lg:top-36">
          {Object.entries(filters).map(([section, items]) => (
            <div key={section} className="space-y-4 border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">{section}</p>
              <div className="space-y-3">
                {items.map((item) => (
                  <label key={item} className="flex items-center gap-3 text-sm text-slate-600">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </aside>

        <section className="space-y-6">
          <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.28)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">Showing {catalogProducts.length} premium mock products</p>
              <h2 className="text-2xl font-black tracking-tight text-slate-950">Filter-first catalog scaffold</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                "Prime-style delivery",
                "Official stores",
                "Top ratings",
                "Newest arrivals",
              ].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {catalogProducts.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.28)]">
            {['Previous', '1', '2', '3', 'Next'].map((item, index) => (
              <button
                key={item}
                type="button"
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  index === 1
                    ? 'bg-slate-950 text-white'
                    : 'border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
