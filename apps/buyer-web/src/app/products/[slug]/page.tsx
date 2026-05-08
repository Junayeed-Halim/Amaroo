import { notFound } from "next/navigation";

import { ProductDetailPage } from "@/components/pages/ProductDetailPage";
import { catalogProducts, getProductBySlug } from "@/data/storefront";

export function generateStaticParams() {
  return catalogProducts.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}
