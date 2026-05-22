import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AddressEntity } from '../database/entities/address.entity';
import { OrderItemEntity } from '../database/entities/order-item.entity';
import { OrderEntity } from '../database/entities/order.entity';
import { CourierService } from '../courier/courier.service';
import { ProductsService } from '../products/products.service';
import { CheckoutDto } from './dto/checkout.dto';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class OrdersService {
  private readonly orders = new Map<string, OrderEntity>();
  private readonly orderItems = new Map<string, OrderItemEntity[]>();
  private readonly addresses = new Map<string, AddressEntity>();

  constructor(
    private readonly productsService: ProductsService,
    private readonly courierService: CourierService,
  ) {}

  createAddress(dto: CreateAddressDto) {
    const address: AddressEntity = {
      id: randomUUID(),
      userId: dto.user_id,
      label: dto.label ?? 'Home',
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
    return address;
  }

  listAddresses(userId: string) {
    return [...this.addresses.values()].filter((address) => address.userId === userId);
  }

  async checkout(dto: CheckoutDto) {
    const address = this.addresses.get(dto.delivery_address_id);
    if (!address) {
      throw new NotFoundException('Delivery address not found');
    }
    const district = address.district;

    let subtotal = 0;
    const items: OrderItemEntity[] = dto.items.map((item) => ({
      id: randomUUID(),
      orderId: '',
      productId: item.product_id,
      variantId: item.variant_id ?? null,
      sellerId: '',
      quantity: item.qty,
      unitPrice: 0,
      totalPrice: 0,
      commissionAmount: 0,
      sellerEarning: 0,
    } as OrderItemEntity));

    // fetch product details and compute prices
    for (const item of items) {
      const product = await this.productsService.getById(item.productId);

      if (product.stockQuantity < item.quantity) {
        throw new NotFoundException(`Insufficient stock for product ${product.id}`);
      }

      // Note: replace with DB transaction + row-level locking in TypeORM for production.
      product.stockQuantity -= item.quantity;
      await (this.productsService as any).update(product.id, { stockQuantity: product.stockQuantity });

      const unitPrice = Number(product.salePrice ?? product.basePrice);
      const totalPrice = unitPrice * item.quantity;
      subtotal += totalPrice;

      item.sellerId = product.sellerId;
      item.unitPrice = unitPrice;
      item.totalPrice = totalPrice;
      item.sellerEarning = totalPrice;
    }

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
