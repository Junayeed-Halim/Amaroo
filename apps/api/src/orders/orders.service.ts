import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AddressEntity } from '../database/entities/address.entity';
import { OrderItemEntity } from '../database/entities/order-item.entity';
import { OrderEntity } from '../database/entities/order.entity';
import { CourierService } from '../courier/courier.service';
import { PaymentsService } from '../payments/payments.service';
import { ProductsService } from '../products/products.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { CheckoutDto } from './dto/checkout.dto';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  private readonly orders = new Map<string, OrderEntity>();
  private readonly orderItems = new Map<string, OrderItemEntity[]>();
  private readonly addresses = new Map<string, AddressEntity>();

  constructor(
    private readonly productsService: ProductsService,
    private readonly courierService: CourierService,
    private readonly paymentsService: PaymentsService,
  ) {}

  createAddress(dto: CreateAddressDto) {
    const address: AddressEntity = {
      id: randomUUID(),
      userId: dto.user_id,
      label: dto.label ?? null,
      recipientName: dto.recipient_name,
      phone: dto.phone,
      division: dto.division,
      district: dto.district,
      upazila: dto.upazila,
      streetAddress: dto.street_address,
      postalCode: dto.postal_code ?? null,
      isDefault: dto.is_default ?? false,
    };

    if (address.isDefault) {
      [...this.addresses.values()]
        .filter((existing) => existing.userId === address.userId)
        .forEach((existing) => {
          existing.isDefault = false;
        });
    }

    this.addresses.set(address.id, address);
    this.logger.log(`Address created ${address.id} for ${address.userId}`);
    return address;
  }

  listAddresses(userId: string) {
    return [...this.addresses.values()].filter((address) => address.userId === userId);
  }

  checkout(dto: CheckoutDto) {
    if (dto.items.length === 0) {
      throw new BadRequestException('At least one checkout item is required');
    }
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
      buyerId: dto.buyer_id,
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

    const payment = this.paymentsService.initiate(order);
    const shipment = this.courierService.createShipment(order, district, 'steadfast');
    this.logger.log(`Checkout created order ${order.id} with shipment ${shipment.id}`);

    return {
      order,
      items,
      payment,
      shipment,
      redirectUrl: dto.payment_method === 'cod' ? null : 'https://sandbox.sslcommerz.com/gwprocess/v4',
    };
  }

  getOrder(id: string) {
    const order = this.orders.get(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const shipment = this.courierService.getShipmentByOrderId(id);

    return {
      ...order,
      items: this.orderItems.get(id) ?? [],
      shipment: shipment ?? null,
    };
  }

  listOrders(buyerId: string) {
    return [...this.orders.values()].filter((order) => order.buyerId === buyerId);
  }

  cancelOrder(id: string) {
    const order = this.orders.get(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    if (order.status === 'shipped' || order.status === 'delivered') {
      throw new BadRequestException('Shipped or delivered orders cannot be cancelled');
    }

    order.status = 'cancelled';
    this.orders.set(id, order);
    return order;
  }

  markPayment(orderId: string, status: OrderEntity['paymentStatus']) {
    const order = this.orders.get(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.paymentStatus = status;
    if (status === 'paid' && order.status === 'pending') {
      order.status = 'confirmed';
    }
    this.orders.set(orderId, order);
    return order;
  }
}
