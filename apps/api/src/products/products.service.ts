import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ProductEntity } from '../database/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ListProductsQueryDto } from './dto/list-products-query.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  private readonly products = new Map<string, ProductEntity>();

  list(query: ListProductsQueryDto) {
    let values = [...this.products.values()];

    if (query.category) {
      values = values.filter((product) => product.categoryId === query.category);
    }

    if (query.min_price !== undefined) {
      values = values.filter((product) => Number(product.basePrice) >= Number(query.min_price));
    }

    if (query.max_price !== undefined) {
      values = values.filter((product) => Number(product.basePrice) <= Number(query.max_price));
    }

    if (query.in_stock) {
      values = values.filter((product) => product.stockQuantity > 0);
    }

    if (query.seller_id) {
      values = values.filter((product) => product.sellerId === query.seller_id);
    }

    switch (query.sort) {
      case 'price_asc':
        values = values.sort((a, b) => Number(a.basePrice) - Number(b.basePrice));
        break;
      case 'price_desc':
        values = values.sort((a, b) => Number(b.basePrice) - Number(a.basePrice));
        break;
      case 'newest':
        values = values.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case 'popular':
        values = values.sort((a, b) => b.salesCount - a.salesCount);
        break;
    }

    return values;
  }

  getBySlug(slug: string) {
    const product = [...this.products.values()].find((value) => value.slug === slug);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  getById(id: string) {
    const product = this.products.get(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  create(dto: CreateProductDto) {
    if (dto.salePrice !== undefined && dto.salePrice > dto.basePrice) {
      throw new BadRequestException('salePrice cannot be greater than basePrice');
    }
    const now = new Date().toISOString();
    const slug = this.ensureUniqueSlug(this.slugify(dto.nameEn));
    const product: ProductEntity = {
      id: randomUUID(),
      sellerId: dto.sellerId,
      categoryId: dto.categoryId,
      nameEn: dto.nameEn,
      nameBn: dto.nameBn ?? null,
      slug,
      descriptionEn: dto.descriptionEn ?? null,
      descriptionBn: dto.descriptionBn ?? null,
      basePrice: dto.basePrice,
      salePrice: dto.salePrice ?? null,
      stockQuantity: dto.stockQuantity ?? 0,
      sku: dto.sku ?? null,
      weightGrams: dto.weightGrams ?? null,
      status: dto.status ?? 'draft',
      isFeatured: dto.isFeatured ?? false,
      viewsCount: 0,
      salesCount: 0,
      createdAt: now,
    };

    this.products.set(product.id, product);
    this.logger.log(`Product created ${product.id} (${product.slug})`);
    return product;
  }

  update(id: string, dto: Partial<CreateProductDto>) {
    const product = this.getById(id);
    const nextBasePrice = dto.basePrice ?? product.basePrice;
    const nextSalePrice = dto.salePrice ?? product.salePrice;
    if (nextSalePrice !== null && nextSalePrice !== undefined && nextSalePrice > nextBasePrice) {
      throw new BadRequestException('salePrice cannot be greater than basePrice');
    }

    if (dto.nameEn) {
      product.slug = this.ensureUniqueSlug(this.slugify(dto.nameEn), id);
    }

    Object.assign(product, {
      sellerId: dto.sellerId ?? product.sellerId,
      categoryId: dto.categoryId ?? product.categoryId,
      nameEn: dto.nameEn ?? product.nameEn,
      nameBn: dto.nameBn ?? product.nameBn,
      descriptionEn: dto.descriptionEn ?? product.descriptionEn,
      descriptionBn: dto.descriptionBn ?? product.descriptionBn,
      basePrice: dto.basePrice ?? product.basePrice,
      salePrice: dto.salePrice ?? product.salePrice,
      stockQuantity: dto.stockQuantity ?? product.stockQuantity,
      sku: dto.sku ?? product.sku,
      weightGrams: dto.weightGrams ?? product.weightGrams,
      status: dto.status ?? product.status,
      isFeatured: dto.isFeatured ?? product.isFeatured,
    });

    this.products.set(id, product);
    this.logger.log(`Product updated ${id}`);
    return product;
  }

  remove(id: string) {
    this.getById(id);
    this.products.delete(id);
    this.logger.log(`Product removed ${id}`);
    return { deleted: true };
  }

  private slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  private ensureUniqueSlug(baseSlug: string, excludingId?: string) {
    const existingSlugs = new Set(
      [...this.products.values()].filter((product) => product.id !== excludingId).map((product) => product.slug),
    );

    if (!existingSlugs.has(baseSlug)) {
      return baseSlug;
    }

    let suffix = 2;
    while (existingSlugs.has(`${baseSlug}-${suffix}`)) {
      suffix += 1;
    }

    return `${baseSlug}-${suffix}`;
  }
}
