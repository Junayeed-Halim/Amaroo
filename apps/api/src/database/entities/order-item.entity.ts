export class OrderItemEntity {
  id!: string;
  orderId!: string;
  productId!: string;
  variantId!: string | null;
  sellerId!: string;
  quantity!: number;
  unitPrice!: number;
  totalPrice!: number;
  commissionAmount!: number;
  sellerEarning!: number;
}
