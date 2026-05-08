import { PaymentMethod } from '../../database/entities/order.entity';

export class CheckoutItemDto {
  product_id!: string;
  variant_id?: string;
  qty!: number;
}

export class CheckoutDto {
  items!: CheckoutItemDto[];
  delivery_address_id!: string;
  payment_method!: PaymentMethod;
  coupon_code?: string;
}
