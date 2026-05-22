import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type ProductStatus = 'draft' | 'active' | 'paused' | 'banned';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 128 })
  sellerId!: string;

  @Column({ type: 'varchar', length: 128 })
  categoryId!: string;

  @Column({ type: 'varchar', length: 256 })
  nameEn!: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  nameBn!: string | null;

  @Column({ type: 'varchar', length: 256, unique: true })
  slug!: string;

  @Column({ type: 'text', nullable: true })
  descriptionEn!: string | null;

  @Column({ type: 'text', nullable: true })
  descriptionBn!: string | null;

  @Column({ type: 'integer', default: 0 })
  basePrice!: number;

  @Column({ type: 'integer', nullable: true })
  salePrice!: number | null;

  @Column({ type: 'integer', default: 0 })
  stockQuantity!: number;

  @Column({ type: 'varchar', length: 128, nullable: true })
  sku!: string | null;

  @Column({ type: 'integer', nullable: true })
  weightGrams!: number | null;

  @Column({ type: 'varchar', length: 32, default: 'draft' })
  status!: ProductStatus;

  @Column({ type: 'boolean', default: false })
  isFeatured!: boolean;

  @Column({ type: 'integer', default: 0 })
  viewsCount!: number;

  @Column({ type: 'integer', default: 0 })
  salesCount!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: string;

  @Column({ type: 'timestamptz', nullable: true })
  deletedAt!: string | null;
}
