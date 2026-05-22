import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CourierModule } from './courier/courier.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { ProductsModule } from './products/products.module';
import { SellerModule } from './seller/seller.module';
import { ProductEntity } from './database/entities/product.entity';
import { UserEntity } from './database/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/amaroo',
      synchronize: true,
      logging: false,
      entities: [ProductEntity, UserEntity],
    }),
    AuthModule,
    ProductsModule,
    OrdersModule,
    CourierModule,
    PaymentsModule,
    SellerModule,
  ],
})
export class AppModule {}
