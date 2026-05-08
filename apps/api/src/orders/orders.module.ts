import { Module } from '@nestjs/common';
import { CourierModule } from '../courier/courier.module';
import { ProductsModule } from '../products/products.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [ProductsModule, CourierModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
