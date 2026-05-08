import {
  cartItems,
  catalogProducts,
  featuredProducts,
  trustSignals,
  type Product,
} from "@/data/storefront";

export function formatTaka(value: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getDiscountPercent(product: Product) {
  return Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );
}

export function getCartProducts() {
  return cartItems.map((item) => {
    const product = catalogProducts.find(
      (catalogProduct) => catalogProduct.id === item.productId,
    );

    if (!product) {
      throw new Error(`Missing product for cart item ${item.productId}`);
    }

    return {
      ...product,
      quantity: item.quantity,
      note: item.note,
      lineTotal: item.quantity * product.price,
    };
  });
}

export function getCartSummary() {
  const items = getCartProducts();
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const shipping = subtotal > 10000 ? 0 : 120;
  const serviceFee = 85;

  return {
    subtotal,
    shipping,
    serviceFee,
    total: subtotal + shipping + serviceFee,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}

export function getFeaturedByCategory(category: string) {
  return featuredProducts.filter((product) => product.category === category);
}

export function getTrustGroups() {
  return [
    { label: "Payments", items: trustSignals.payments },
    { label: "Shipping", items: trustSignals.shipping },
  ];
}
