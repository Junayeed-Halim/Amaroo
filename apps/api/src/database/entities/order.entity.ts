export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
export type PaymentMethod = 'cod' | 'bkash' | 'nagad' | 'card' | 'rocket';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'pending';

export class OrderEntity {
  id!: string;
  orderNumber!: string;
  buyerId!: string;
  status!: OrderStatus;
  paymentMethod!: PaymentMethod;
  paymentStatus!: PaymentStatus;
  subtotal!: number;
  deliveryFee!: number;
  discountAmount!: number;
  total!: number;
  deliveryAddressId!: string;
  notes!: string | null;
  createdAt!: string;
  deletedAt!: string | null;
}
