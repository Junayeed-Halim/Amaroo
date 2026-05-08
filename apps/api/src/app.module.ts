import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CourierModule } from './courier/courier.module';

@Module({
  imports: [AuthModule, ProductsModule, OrdersModule, CourierModule],
})
export class AppModule {}
