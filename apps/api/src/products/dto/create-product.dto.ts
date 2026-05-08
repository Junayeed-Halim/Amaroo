import { ProductStatus } from '../../database/entities/product.entity';
import { IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  sellerId!: string;

  @IsString()
  categoryId!: string;

  @IsString()
  nameEn!: string;

  @IsOptional()
  @IsString()
  nameBn?: string;

  @IsOptional()
  @IsString()
  descriptionEn?: string;

  @IsOptional()
  @IsString()
  descriptionBn?: string;

  @IsNumber()
  @Min(0)
  basePrice!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  salePrice?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  stockQuantity?: number;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100000)
  weightGrams?: number;

  @IsOptional()
  @IsIn(['draft', 'active', 'paused', 'banned'])
  status?: ProductStatus;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
