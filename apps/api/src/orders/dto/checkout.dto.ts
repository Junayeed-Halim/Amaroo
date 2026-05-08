import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsIn, IsInt, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { PaymentMethod } from '../../database/entities/order.entity';

export class CheckoutItemDto {
  @IsString()
  product_id!: string;

  @IsOptional()
  @IsString()
  variant_id?: string;

  @IsInt()
  @Min(1)
  qty!: number;
}

export class CheckoutDto {
  @IsString()
  buyer_id!: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items!: CheckoutItemDto[];

  @IsString()
  delivery_address_id!: string;

  @IsIn(['cod', 'bkash', 'nagad', 'card', 'rocket'])
  payment_method!: PaymentMethod;

  @IsOptional()
  @IsString()
  coupon_code?: string;
}
