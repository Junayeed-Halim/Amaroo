"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/storefront/ProductCard";
import { SectionHeading } from "@/components/storefront/SectionHeading";
import { useStorefront } from "@/components/storefront/StorefrontProvider";
import { apiFetch } from "@/lib/api";

type RemoteProduct = {
  id: string;
  nameEn?: string;
  nameBn?: string | null;
  slug?: string;
  basePrice?: number;
  salePrice?: number | null;
  stockQuantity?: number;
  categoryId?: string;
  isFeatured?: boolean;
};

const filters = {
  departments: ["Electronics", "Fashion", "Home & Living", "Beauty", "Groceries"],
  fulfilment: ["Dhaka Express", "Nationwide", "Cash on Delivery", "Official Store"],
  price: ["Under ৳2,000", "৳2,000 - ৳10,000", "৳10,000 - ৳50,000", "Above ৳50,000"],
};

export function ProductListingPage({ query = "" }: { query?: string }) {
  const { t } = useStorefront();
  const [products, setProducts] = useState<RemoteProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const q = query?.trim();
        const path = q ? `/products/search?q=${encodeURIComponent(q)}` : `/products`;
        const data = await apiFetch(path);
        if (!mounted) return;
        // Products service returns ProductEntity[] shaped differently; normalize for UI
        setProducts(
          (data as any[]).map((p) => ({
            id: p.id,
            // map remote shape to UI-friendly product fields
            nameEn: p.nameEn ?? p.name ?? '',
            nameBn: p.nameBn ?? null,
            slug: p.slug ?? String(p.id),
            basePrice: p.basePrice ?? p.price ?? 0,
            salePrice: p.salePrice ?? null,
            stockQuantity: p.stockQuantity ?? 0,
            categoryId: p.categoryId ?? p.category ?? 'Misc',
            isFeatured: p.isFeatured ?? false,
            // UI-facing defaults
            // keep some extra fields used by ProductCard by adding them dynamically at render
            _raw: p,
          })),
        );
      } catch (err: any) {
        console.error(err);
        setError(err?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      mounted = false;
    };
  }, [query]);

  const displayedProducts = products.map((p) => ({
    id: typeof p.id === 'number' ? p.id : p.id,
    slug: p.slug || String(p.id),
    name: p.nameEn ?? p.nameBn ?? 'Product',
    category: p.categoryId ?? 'Misc',
    price: p.salePrice ?? p.basePrice ?? 0,
    originalPrice: p.basePrice ?? (p.salePrice ?? 0),
    rating: 4.5,
    reviewCount: 10,
    badge: p.isFeatured ? 'Featured' : '',
    imageLabel: 'Photo',
    accent: 'from-sky-500 via-cyan-500 to-teal-500',
    delivery: 'Standard delivery',
    eta: '2-3 days',
    seller: p._raw?.seller ?? 'Partner store',
    stock: (p.stockQuantity ?? 0) > 0 ? 'In stock' : 'Out of stock',
    highlights: [],
    variants: [],
    gallery: [],
  }));

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-[0_16px_45px_-28px_rgba(15,23,42,0.28)]">
        <SectionHeading eyebrow="Product listing" title={t.plp.title} copy={t.plp.subtitle} />
        {normalizedQuery ? (
          <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600">
            Showing results for “{query}”
          </p>
        ) : null}
      </section>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="h-fit space-y-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.28)] lg:sticky lg:top-36">
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
              <p className="text-sm font-semibold text-slate-500">Showing {displayedProducts.length} premium mock products</p>
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
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>

          {displayedProducts.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
              No products matched your search yet. Try browsing all products or use a broader keyword.
            </div>
          ) : null}

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
