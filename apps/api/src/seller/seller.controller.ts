import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegisterSellerDto } from './dto/register-seller.dto';
import { SellerService } from './seller.service';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  /** POST /api/v1/seller/register — apply as a seller (requires auth in production) */
  @Post('register')
  register(@Body() dto: RegisterSellerDto) {
    return this.sellerService.register(dto);
  }

  /** GET /api/v1/seller/:id/dashboard — seller dashboard stats */
  @Get(':id/dashboard')
  dashboard(@Param('id') id: string) {
    return this.sellerService.getDashboard(id);
  }

  /** GET /api/v1/seller/:id — seller detail */
  @Get(':id')
  getShop(@Param('id') id: string) {
    return this.sellerService.getShop(id);
  }

  /** GET /api/v1/seller/shop/:slug — public shop page by slug */
  @Get('shop/:slug')
  getShopBySlug(@Param('slug') slug: string) {
    return this.sellerService.getShopBySlug(slug);
  }
}
