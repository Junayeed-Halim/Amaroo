import { ProductListingPage } from "@/components/pages/ProductListingPage";

export default function ProductsPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  return <ProductListingPage query={searchParams?.query ?? ""} />;
}
