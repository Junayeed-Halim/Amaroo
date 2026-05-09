import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CourierModule } from './courier/courier.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { ProductsModule } from './products/products.module';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [AuthModule, ProductsModule, OrdersModule, CourierModule, PaymentsModule, SellerModule],
})
export class AppModule {}
