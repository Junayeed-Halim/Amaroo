import { PaymentMethod } from './order.entity';

export type PaymentRecordStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export class PaymentEntity {
  id!: string;
  orderId!: string;
  method!: PaymentMethod;
  gatewayTransactionId!: string | null;
  amount!: number;
  currency!: string;
  status!: PaymentRecordStatus;
  gatewayResponse!: Record<string, unknown> | null;
  createdAt!: string;
}
