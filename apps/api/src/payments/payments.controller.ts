import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  /** GET /api/v1/payments/:orderId — get payment status for an order */
  @Get(':orderId')
  getByOrderId(@Param('orderId') orderId: string) {
    return this.paymentsService.getByOrderId(orderId);
  }

  /** POST /api/v1/payments/cod/confirm — delivery staff confirms COD collection */
  @Post('cod/confirm')
  confirmCod(@Body('order_id') orderId: string) {
    return this.paymentsService.confirmCod(orderId);
  }

  /**
   * POST /api/v1/payments/sslcommerz/initiate
   * Start an SSL Commerz checkout session. Returns the gateway redirect URL.
   */
  @Post('sslcommerz/initiate')
  initiateSslCommerz(
    @Body('order_id') orderId: string,
    @Body('amount') amount: number,
    @Body('customer_name') customerName: string,
    @Body('customer_phone') customerPhone: string,
  ) {
    return this.paymentsService.initiateSslCommerz(orderId, amount, customerName, customerPhone);
  }

  /** POST /api/v1/payments/sslcommerz/success — SSL Commerz success redirect */
  @Post('sslcommerz/success')
  sslCommerzSuccess(@Body() body: Record<string, unknown>) {
    return this.paymentsService.handleSslCommerzSuccess(body);
  }

  /** POST /api/v1/payments/sslcommerz/fail — SSL Commerz failure redirect */
  @Post('sslcommerz/fail')
  sslCommerzFail(@Body() body: Record<string, unknown>) {
    return this.paymentsService.handleSslCommerzFail(body);
  }

  /** POST /api/v1/payments/sslcommerz/ipn — SSL Commerz IPN webhook */
  @Post('sslcommerz/ipn')
  sslCommerzIpn(@Body() body: Record<string, unknown>) {
    return this.paymentsService.handleSslCommerzIpn(body);
  }
}
