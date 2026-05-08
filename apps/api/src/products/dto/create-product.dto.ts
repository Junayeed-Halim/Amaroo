import { ProductStatus } from '../../database/entities/product.entity';

export class CreateProductDto {
  sellerId!: string;
  categoryId!: string;
  nameEn!: string;
  nameBn?: string;
  descriptionEn?: string;
  descriptionBn?: string;
  basePrice!: number;
  salePrice?: number;
  stockQuantity?: number;
  sku?: string;
  weightGrams?: number;
  status?: ProductStatus;
  isFeatured?: boolean;
}
