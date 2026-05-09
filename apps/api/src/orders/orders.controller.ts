import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CheckoutDto } from './dto/checkout.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /** POST /api/v1/orders/addresses — create a delivery address */
  @Post('addresses')
  createAddress(@Body() dto: CreateAddressDto) {
    return this.ordersService.createAddress(dto);
  }

  /** GET /api/v1/orders/addresses?user_id=<id> — list user addresses */
  @Get('addresses')
  listAddresses(@Query('user_id') userId = '') {
    return this.ordersService.listAddresses(userId);
  }

  /** GET /api/v1/orders?buyer_id=<id> — list buyer orders */
  @Get()
  listOrders(@Query('buyer_id') buyerId = '') {
    return this.ordersService.listOrders(buyerId);
  }

  /** POST /api/v1/orders — checkout (create order) */
  @Post()
  checkout(@Body() dto: CheckoutDto) {
    return this.ordersService.checkout(dto);
  }

  /** GET /api/v1/orders/:id — get order detail + shipment */
  @Get(':id')
  getOrder(@Param('id') id: string) {
    return this.ordersService.getOrder(id);
  }

  /** PATCH /api/v1/orders/:id/cancel — cancel an order before it ships */
  @Patch(':id/cancel')
  cancelOrder(@Param('id') id: string) {
    return this.ordersService.cancelOrder(id);
  }

  /** PATCH /api/v1/orders/:id/payment — internal: mark payment status */
  @Patch(':id/payment')
  markPayment(
    @Param('id') id: string,
    @Body('status') status: 'paid' | 'unpaid' | 'refunded' | 'pending',
  ) {
    return this.ordersService.markPayment(id, status);
  }
}
