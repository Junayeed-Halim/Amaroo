import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../database/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ListProductsQueryDto } from './dto/list-products-query.dto';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repo: Repository<ProductEntity>,
  ) {}

  async onModuleInit() {
    // Seed initial products if table empty
    const count = await this.repo.count();
    if (count === 0) {
      await this.seedInitialProducts();
    }
  }

  async list(query: ListProductsQueryDto) {
    const where: any = { deletedAt: null };
    if (query.category) where.categoryId = query.category;
    if (query.seller_id) where.sellerId = query.seller_id;

    const items = await this.repo.find({ where });

    let values = items;

    if (query.min_price !== undefined) {
      values = values.filter((p) => Number(p.basePrice) >= Number(query.min_price));
    }
    if (query.max_price !== undefined) {
      values = values.filter((p) => Number(p.basePrice) <= Number(query.max_price));
    }
    if (query.in_stock) {
      values = values.filter((p) => p.stockQuantity > 0);
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

  async getBySlug(slug: string) {
    const product = await this.repo.findOne({ where: { slug, deletedAt: null } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async getById(id: string) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product || product.deletedAt) throw new NotFoundException('Product not found');
    return product;
  }

  async create(dto: CreateProductDto) {
    const slug = await this.ensureUniqueSlug(this.slugify(dto.nameEn));
    const product = this.repo.create({
      ...dto,
      slug,
      viewsCount: 0,
      salesCount: 0,
      status: dto.status ?? 'draft',
    } as any);
    return this.repo.save(product);
  }

  async update(id: string, dto: Partial<CreateProductDto>) {
    const product = await this.getById(id);
    if (dto.nameEn) dto['slug'] = await this.ensureUniqueSlug(this.slugify(dto.nameEn), id);
    Object.assign(product, dto as any);
    return this.repo.save(product);
  }

  async remove(id: string) {
    const product = await this.getById(id);
    product.deletedAt = new Date().toISOString();
    product.status = 'paused';
    await this.repo.save(product);
    return { deleted: true };
  }

  async featured() {
    return this.repo.find({ where: { deletedAt: null, isFeatured: true } });
  }

  async byCategory(categorySlug: string) {
    const items = await this.repo.find({ where: { deletedAt: null } });
    const normalized = this.slugify(categorySlug);
    return items.filter((p) => this.slugify(String(p.categoryId)) === normalized);
  }

  async search(query: ListProductsQueryDto & { q?: string }) {
    const q = query.q?.trim();
    if (!q) return this.list(query);
    const items = await this.repo.find({ where: { deletedAt: null } });
    return items.filter((p) => (`${p.nameEn} ${p.nameBn ?? ''}`).toLowerCase().includes(q.toLowerCase()));
  }

  private slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  private async ensureUniqueSlug(baseSlug: string, excludingId?: string) {
    let slug = baseSlug;
    let suffix = 1;
    while (true) {
      const existing = await this.repo.findOne({ where: { slug } });
      if (!existing || (excludingId && existing.id === excludingId)) return slug;
      suffix += 1;
      slug = `${baseSlug}-${suffix}`;
    }
  }

  private async seedInitialProducts() {
    const now = new Date().toISOString();
    const initial: Partial<ProductEntity>[] = [
      {
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

    for (const p of initial) {
      const entity = this.repo.create(p as any);
      await this.repo.save(entity);
    }
  }
}
