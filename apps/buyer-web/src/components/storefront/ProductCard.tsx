import Link from "next/link";

import type { Product } from "@/data/storefront";
import { formatTaka, getDiscountPercent } from "@/lib/storefront";

import { RatingStars } from "./RatingStars";

export function ProductCard({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_16px_40px_-24px_rgba(15,23,42,0.35)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_50px_-26px_rgba(15,23,42,0.42)]"
    >
      <div
        className={`relative flex ${compact ? "h-44" : "h-56"} items-end justify-between overflow-hidden bg-gradient-to-br ${product.accent} p-6 text-white`}
      >
        <div>
          <p className="mb-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] backdrop-blur">
            {product.badge}
          </p>
          <p className="text-sm font-semibold text-white/80">{product.category}</p>
        </div>
        <div className="rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-right backdrop-blur">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/70">Preview</p>
          <p className="text-2xl font-black tracking-tight">{product.imageLabel}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="line-clamp-2 text-lg font-bold leading-7 text-slate-950">{product.name}</h3>
        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          <RatingStars rating={product.rating} />
          <span>({product.reviewCount})</span>
        </div>
        <div className="mt-4 flex items-end gap-3">
          <span className="text-2xl font-black tracking-tight text-slate-950">
            {formatTaka(product.price)}
          </span>
          <span className="text-sm text-slate-400 line-through">
            {formatTaka(product.originalPrice)}
          </span>
        </div>
        <p className="mt-2 text-sm font-semibold text-emerald-600">
          Save {getDiscountPercent(product)}% today
        </p>
        <div className="mt-4 space-y-2 text-sm text-slate-600">
          <p>{product.delivery}</p>
          <p>{product.eta} delivery, {product.stock}</p>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-semibold text-slate-700">
          <span>{product.seller}</span>
          <span className="text-teal-700 group-hover:text-teal-600">View details →</span>
        </div>
      </div>
    </Link>
  );
}
