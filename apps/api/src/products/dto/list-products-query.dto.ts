import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class ListProductsQueryDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  min_price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  max_price?: number;

  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  in_stock?: boolean;

  @IsOptional()
  @IsString()
  seller_id?: string;

  @IsOptional()
  @IsIn(['price_asc', 'price_desc', 'newest', 'popular'])
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
}
