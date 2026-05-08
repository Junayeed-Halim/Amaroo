export class ListProductsQueryDto {
  category?: string;
  min_price?: number;
  max_price?: number;
  in_stock?: boolean;
  seller_id?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
}
