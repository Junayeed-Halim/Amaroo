import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ProductEntity } from '../database/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ListProductsQueryDto } from './dto/list-products-query.dto';

@Injectable()
export class ProductsService {
  private readonly products = new Map<string, ProductEntity>();

  constructor() {
    this.seedInitialProducts();
  }

  list(query: ListProductsQueryDto) {
    let values = [...this.products.values()].filter((product) => product.deletedAt === null);

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
    const product = [...this.products.values()].find((value) => value.slug === slug && value.deletedAt === null);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  getById(id: string) {
    const product = this.products.get(id);
    if (!product || product.deletedAt) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  create(dto: CreateProductDto) {
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
      deletedAt: null,
    };

    this.products.set(product.id, product);
    return product;
  }

  update(id: string, dto: Partial<CreateProductDto>) {
    const product = this.getById(id);

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
    return product;
  }

  remove(id: string) {
    const product = this.getById(id);
    product.deletedAt = new Date().toISOString();
    product.status = 'paused';
    this.products.set(id, product);
    return { deleted: true };
  }

  featured() {
    return [...this.products.values()].filter((product) => product.deletedAt === null && product.isFeatured);
  }

  byCategory(categorySlug: string) {
    const normalizedSlug = this.slugify(categorySlug);
    return [...this.products.values()].filter(
      (product) => product.deletedAt === null && this.slugify(product.categoryId) === normalizedSlug,
    );
  }

  search(query: ListProductsQueryDto & { q?: string }) {
    const q = query.q?.trim().toLowerCase();
    let values = this.list(query);
    if (q) {
      values = values.filter((product) => `${product.nameEn} ${product.nameBn ?? ''}`.toLowerCase().includes(q));
    }

    return values;
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

  private seedInitialProducts() {
    const now = new Date().toISOString();
    const initial: ProductEntity[] = [
      {
        id: randomUUID(),
        sellerId: 'seed-seller-1',
        categoryId: 'electronics',
        nameEn: 'Walton Inverter AC 1.5 Ton',
        nameBn: 'ওয়ালটন ইনভার্টার এসি ১.৫ টন',
        slug: 'walton-inverter-ac-1-5-ton',
        descriptionEn: 'Bangladesh-ready inverter AC with official warranty.',
        descriptionBn: 'বাংলাদেশের আবহাওয়ার উপযোগী ইনভার্টার এসি।',
        basePrice: 69990,
        salePrice: 62990,
        stockQuantity: 12,
        sku: 'WAL-AC-15T',
        weightGrams: 38500,
        status: 'active',
        isFeatured: true,
        viewsCount: 0,
        salesCount: 0,
        createdAt: now,
        deletedAt: null,
      },
      {
        id: randomUUID(),
        sellerId: 'seed-seller-2',
        categoryId: 'electronics',
        nameEn: 'Samsung Galaxy A55 5G',
        nameBn: 'স্যামসাং গ্যালাক্সি A55 5G',
        slug: 'samsung-galaxy-a55-5g',
        descriptionEn: 'Official Samsung handset with VAT invoice.',
        descriptionBn: 'অফিশিয়াল ভ্যাট ইনভয়েসসহ স্যামসাং ফোন।',
        basePrice: 59999,
        salePrice: 54999,
        stockQuantity: 24,
        sku: 'SAM-A55-5G',
        weightGrams: 213,
        status: 'active',
        isFeatured: true,
        viewsCount: 0,
        salesCount: 0,
        createdAt: now,
        deletedAt: null,
      },
      {
        id: randomUUID(),
        sellerId: 'seed-seller-3',
        categoryId: 'home-living',
        nameEn: 'Luxury Cotton Bed Sheet Set',
        nameBn: 'লাক্সারি কটন বেডশিট সেট',
        slug: 'luxury-cotton-bed-sheet-set',
        descriptionEn: 'Premium cotton bed sheet set for all seasons.',
        descriptionBn: 'সব মৌসুমের জন্য প্রিমিয়াম কটন বেডশিট।',
        basePrice: 3990,
        salePrice: 3250,
        stockQuantity: 80,
        sku: 'BED-COT-SET',
        weightGrams: 990,
        status: 'active',
        isFeatured: false,
        viewsCount: 0,
        salesCount: 0,
        createdAt: now,
        deletedAt: null,
      },
    ];

    initial.forEach((product) => {
      this.products.set(product.id, product);
    });
  }
}
