import { Controller, Get, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('orders/:orderId')
  getOrderPayment(@Param('orderId') orderId: string) {
    return this.paymentsService.getByOrderId(orderId);
  }
}
