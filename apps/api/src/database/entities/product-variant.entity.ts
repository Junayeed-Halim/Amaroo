export class ProductVariantEntity {
  id!: string;
  productId!: string;
  name!: string;
  sku!: string | null;
  priceModifier!: number;
  stockQuantity!: number;
  attributes!: Record<string, string>;
}
