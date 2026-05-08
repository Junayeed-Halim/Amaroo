import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CourierName, ShipmentEntity } from '../database/entities/shipment.entity';
import { OrderEntity } from '../database/entities/order.entity';

@Injectable()
export class CourierService {
  private readonly shipments = new Map<string, ShipmentEntity>();

  createShipment(order: OrderEntity, district: string, courier: CourierName = 'steadfast') {
    const trackingId = `SFD-${randomUUID()}`;
    const shipment: ShipmentEntity = {
      id: randomUUID(),
      orderId: order.id,
      courier,
      trackingId,
      status: 'created',
      pickupDate: null,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      deliveredAt: null,
      courierResponse: {
        provider: 'steadfast',
        cod_amount: order.paymentMethod === 'cod' ? order.total : 0,
        delivery_fee: this.calculateDeliveryFee(district),
      },
    };

    this.shipments.set(shipment.id, shipment);
    return shipment;
  }

  trackShipment(consignmentId: string) {
    return [...this.shipments.values()].find((value) => value.trackingId === consignmentId) ?? null;
  }

  bulkTrackShipments(consignmentIds: string[]) {
    return consignmentIds.map((id) => this.trackShipment(id)).filter((value) => value !== null);
  }

  calculateDeliveryFee(district: string) {
    return district.toLowerCase().includes('dhaka') ? 110 : 150;
  }
}
