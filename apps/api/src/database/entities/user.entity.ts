export type UserRole = 'buyer' | 'seller' | 'admin';

export class UserEntity {
  id!: string;
  name!: string;
  phone!: string;
  email!: string | null;
  passwordHash!: string | null;
  role!: UserRole;
  avatarUrl!: string | null;
  isVerified!: boolean;
  isActive!: boolean;
  createdAt!: string;
  deletedAt!: string | null;
}
