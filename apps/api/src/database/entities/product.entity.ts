export type ProductStatus = 'draft' | 'active' | 'paused' | 'banned';

export class ProductEntity {
  id!: string;
  sellerId!: string;
  categoryId!: string;
  nameEn!: string;
  nameBn!: string | null;
  slug!: string;
  descriptionEn!: string | null;
  descriptionBn!: string | null;
  basePrice!: number;
  salePrice!: number | null;
  stockQuantity!: number;
  sku!: string | null;
  weightGrams!: number | null;
  status!: ProductStatus;
  isFeatured!: boolean;
  viewsCount!: number;
  salesCount!: number;
  createdAt!: string;
}
