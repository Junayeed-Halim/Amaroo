import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AddressEntity } from '../database/entities/address.entity';
import { OrderItemEntity } from '../database/entities/order-item.entity';
import { OrderEntity } from '../database/entities/order.entity';
import { CourierService } from '../courier/courier.service';
import { ProductsService } from '../products/products.service';
import { CheckoutDto } from './dto/checkout.dto';

@Injectable()
export class OrdersService {
  private readonly orders = new Map<string, OrderEntity>();
  private readonly orderItems = new Map<string, OrderItemEntity[]>();
  private readonly addresses = new Map<string, AddressEntity>();

  constructor(
    private readonly productsService: ProductsService,
    private readonly courierService: CourierService,
  ) {}

  checkout(dto: CheckoutDto) {
    const address = this.addresses.get(dto.delivery_address_id);
    if (!address) {
      throw new NotFoundException('Delivery address not found');
    }
    const district = address.district;

    let subtotal = 0;
    const items: OrderItemEntity[] = dto.items.map((item) => {
      const product = this.productsService.getById(item.product_id);

      if (product.stockQuantity < item.qty) {
        throw new NotFoundException(`Insufficient stock for product ${product.id}`);
      }

      // Note: replace with DB transaction + row-level locking in TypeORM for production.
      product.stockQuantity -= item.qty;
      const unitPrice = Number(product.salePrice ?? product.basePrice);
      const totalPrice = unitPrice * item.qty;
      subtotal += totalPrice;

      return {
        id: randomUUID(),
        orderId: '',
        productId: product.id,
        variantId: item.variant_id ?? null,
        sellerId: product.sellerId,
        quantity: item.qty,
        unitPrice,
        totalPrice,
        commissionAmount: 0,
        sellerEarning: totalPrice,
      };
    });

    const deliveryFee = this.courierService.calculateDeliveryFee(district);
    const discountAmount = dto.coupon_code ? Math.min(subtotal * 0.1, 200) : 0;
    const total = subtotal + deliveryFee - discountAmount;

    const order: OrderEntity = {
      id: randomUUID(),
      orderNumber: `ORD-${Date.now()}`,
      buyerId: 'buyer-placeholder',
      status: dto.payment_method === 'cod' ? 'confirmed' : 'pending',
      paymentMethod: dto.payment_method,
      paymentStatus: dto.payment_method === 'cod' ? 'unpaid' : 'pending',
      subtotal,
      deliveryFee,
      discountAmount,
      total,
      deliveryAddressId: dto.delivery_address_id,
      notes: null,
      createdAt: new Date().toISOString(),
      deletedAt: null,
    };

    items.forEach((item) => {
      item.orderId = order.id;
    });

    this.orders.set(order.id, order);
    this.orderItems.set(order.id, items);

    const shipment = this.courierService.createShipment(order, district, 'steadfast');

    return {
      order,
      items,
      shipment,
      redirectUrl: dto.payment_method === 'cod' ? null : 'https://sandbox.sslcommerz.com/gwprocess/v4',
    };
  }

  getOrder(id: string) {
    const order = this.orders.get(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return {
      ...order,
      items: this.orderItems.get(id) ?? [],
    };
  }
}
