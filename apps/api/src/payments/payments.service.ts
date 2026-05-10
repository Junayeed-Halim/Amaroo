import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { OrderEntity } from '../database/entities/order.entity';
import { PaymentEntity, PaymentRecordStatus } from '../database/entities/payment.entity';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private readonly payments = new Map<string, PaymentEntity>();

  initiate(order: OrderEntity) {
    const status: PaymentRecordStatus = order.paymentMethod === 'cod' ? 'pending' : 'pending';
    return this.upsertPayment(order.id, order.paymentMethod, status, null, {
      type: order.paymentMethod === 'cod' ? 'cod' : 'gateway_redirect',
      note:
        order.paymentMethod === 'cod'
          ? 'Collect payment from buyer during delivery'
          : 'Gateway workflow placeholder scaffold',
      amount: order.total,
    });
  }

  /** Retrieve payment record for an order. */
  getByOrderId(orderId: string) {
    const payment = [...this.payments.values()].find((p) => p.orderId === orderId);
    if (!payment) {
      throw new NotFoundException('Payment record not found');
    }

    return payment;
  }

  /** Confirm a Cash-on-Delivery order — call from delivery staff webhook. */
  confirmCod(orderId: string) {
    return this.upsertPayment(orderId, 'cod', 'completed', null, {
      confirmed_via: 'cod_delivery_confirmation',
    });
  }

  /**
   * Initiate an SSL Commerz session.
   * In production this calls the SSL Commerz REST API and returns a GatewayPageURL.
   * For now we return a sandbox redirect URL so the endpoint shape is production-ready.
   */
  initiateSslCommerz(orderId: string, amount: number, customerName: string, customerPhone: string) {
    const tran_id = `SSL-${randomUUID()}`;
    this.upsertPayment(orderId, 'card', 'pending', tran_id, {
      gateway: 'sslcommerz',
      initiated_at: new Date().toISOString(),
      amount,
    });

    return {
      tran_id,
      // Replace with real SSL Commerz GatewayPageURL from sslcommerz-lts in production.
      redirect_url: `https://sandbox.sslcommerz.com/gwprocess/v4/gw.php?Q=PAY&SESSIONKEY=${tran_id}`,
      amount,
      customer_name: customerName,
      customer_phone: customerPhone,
    };
  }

  /** Called by SSL Commerz on payment success (redirect + IPN). */
  handleSslCommerzSuccess(body: Record<string, unknown>) {
    const tran_id = String(body['tran_id'] ?? '');
    const val_id = String(body['val_id'] ?? '');
    const status = String(body['status'] ?? '');

    const payment = [...this.payments.values()].find((p) => p.gatewayTransactionId === tran_id);
    if (!payment) {
      return { success: false, message: 'Payment record not found' };
    }

    // In production: verify payment with SSL Commerz validation API using val_id before marking paid.
    payment.status = status === 'VALID' || status === 'VALIDATED' ? 'completed' : 'failed';
    payment.gatewayResponse = { ...body, val_id };
    this.payments.set(payment.id, payment);

    return { success: payment.status === 'completed', tran_id, status: payment.status };
  }

  /** Called by SSL Commerz on payment failure. */
  handleSslCommerzFail(body: Record<string, unknown>) {
    const tran_id = String(body['tran_id'] ?? '');
    const payment = [...this.payments.values()].find((p) => p.gatewayTransactionId === tran_id);
    if (payment) {
      payment.status = 'failed';
      payment.gatewayResponse = { ...body };
      this.payments.set(payment.id, payment);
    }

    return { success: false, tran_id };
  }

  /** SSL Commerz Instant Payment Notification (IPN) — authoritative server-to-server notification. */
  handleSslCommerzIpn(body: Record<string, unknown>) {
    return this.handleSslCommerzSuccess(body);
  }

  private upsertPayment(
    orderId: string,
    method: OrderEntity['paymentMethod'],
    status: PaymentRecordStatus,
    gatewayTransactionId: string | null,
    gatewayResponse: Record<string, unknown>,
  ) {
    const existing = [...this.payments.values()].find((p) => p.orderId === orderId);
    const now = new Date().toISOString();

    if (existing) {
      existing.status = status;
      if (gatewayTransactionId) existing.gatewayTransactionId = gatewayTransactionId;
      existing.gatewayResponse = { ...(existing.gatewayResponse ?? {}), ...gatewayResponse };
      this.payments.set(existing.id, existing);
      this.logger.log(`Payment updated for order ${orderId} with status ${status}`);
      return existing;
    }

    const payment: PaymentEntity = {
      id: randomUUID(),
      orderId,
      method,
      gatewayTransactionId,
      amount: Number(gatewayResponse.amount ?? 0),
      currency: 'BDT',
      status,
      gatewayResponse,
      createdAt: now,
    };

    this.payments.set(payment.id, payment);
    this.logger.log(`Payment created for order ${orderId} via ${method}`);
    return payment;
  }
}
