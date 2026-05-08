export class CategoryEntity {
  id!: string;
  nameEn!: string;
  nameBn!: string | null;
  slug!: string;
  parentId!: string | null;
  imageUrl!: string | null;
  sortOrder!: number;
  isActive!: boolean;
}
