import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { SellerEntity } from '../database/entities/seller.entity';
import { RegisterSellerDto } from './dto/register-seller.dto';

@Injectable()
export class SellerService {
  private readonly sellers = new Map<string, SellerEntity>();

  /** POST /api/v1/seller/register — apply as a seller (KYC pending). */
  register(dto: RegisterSellerDto) {
    const slugTaken = [...this.sellers.values()].some((s) => s.shopSlug === dto.shop_slug);
    if (slugTaken) {
      throw new ConflictException('Shop slug already taken');
    }

    const seller: SellerEntity = {
      id: randomUUID(),
      userId: dto.user_id,
      shopName: dto.shop_name,
      shopSlug: dto.shop_slug,
      nidNumber: dto.nid_number ?? null,
      tradeLicense: dto.trade_license ?? null,
      kycStatus: 'pending',
      commissionRate: 10,
      balance: 0,
      bankAccountName: null,
      bankAccountNumber: null,
      bankName: null,
      bkashNumber: dto.bkash_number ?? null,
      createdAt: new Date().toISOString(),
    };

    this.sellers.set(seller.id, seller);
    return seller;
  }

  /** GET /api/v1/seller/:id/dashboard — headline metrics for seller dashboard. */
  getDashboard(sellerId: string) {
    const seller = this.sellers.get(sellerId);
    if (!seller) throw new NotFoundException('Seller not found');

    return {
      seller_id: sellerId,
      shop_name: seller.shopName,
      kyc_status: seller.kycStatus,
      balance: seller.balance,
      // In production these come from DB aggregates.
      today_orders: 0,
      total_revenue: 0,
      pending_orders: 0,
      average_rating: 0,
    };
  }

  /** GET /api/v1/seller/:id — public shop page details. */
  getShop(sellerId: string) {
    const seller = this.sellers.get(sellerId);
    if (!seller) throw new NotFoundException('Seller not found');

    return {
      id: seller.id,
      shop_name: seller.shopName,
      shop_slug: seller.shopSlug,
      kyc_status: seller.kycStatus,
      created_at: seller.createdAt,
    };
  }

  /** GET /api/v1/seller/shop/:slug — public shop lookup by slug. */
  getShopBySlug(slug: string) {
    const seller = [...this.sellers.values()].find((s) => s.shopSlug === slug);
    if (!seller) throw new NotFoundException('Shop not found');

    return {
      id: seller.id,
      shop_name: seller.shopName,
      shop_slug: seller.shopSlug,
      kyc_status: seller.kycStatus,
      created_at: seller.createdAt,
    };
  }

  getSellerById(sellerId: string) {
    const seller = this.sellers.get(sellerId);
    if (!seller) throw new NotFoundException('Seller not found');
    return seller;
  }
}
