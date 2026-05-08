export type CourierName = 'pathao' | 'steadfast' | 'redx' | 'paperfly' | 'sundarban';

export class ShipmentEntity {
  id!: string;
  orderId!: string;
  courier!: CourierName;
  trackingId!: string;
  status!: string;
  pickupDate!: string | null;
  estimatedDelivery!: string | null;
  deliveredAt!: string | null;
  courierResponse!: Record<string, unknown> | null;
}
