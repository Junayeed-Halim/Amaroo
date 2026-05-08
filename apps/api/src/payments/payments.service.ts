import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { OrderEntity } from '../database/entities/order.entity';
import { PaymentEntity } from '../database/entities/payment.entity';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private readonly records = new Map<string, PaymentEntity>();

  initiate(order: OrderEntity) {
    const payment: PaymentEntity = {
      id: randomUUID(),
      orderId: order.id,
      method: order.paymentMethod,
      gatewayTransactionId: null,
      amount: order.total,
      currency: 'BDT',
      status: order.paymentMethod === 'cod' ? 'pending' : 'pending',
      gatewayResponse:
        order.paymentMethod === 'cod'
          ? {
              type: 'cod',
              note: 'Collect payment from buyer during delivery',
            }
          : {
              type: 'gateway_redirect',
              note: 'Gateway workflow placeholder scaffold',
            },
      createdAt: new Date().toISOString(),
    };

    this.records.set(order.id, payment);
    this.logger.log(`Payment initiated for order ${order.id} via ${order.paymentMethod}`);
    return payment;
  }

  getByOrderId(orderId: string) {
    return this.records.get(orderId) ?? null;
  }
}
