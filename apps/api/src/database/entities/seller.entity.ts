export type SellerKycStatus = 'pending' | 'approved' | 'rejected';

export class SellerEntity {
  id!: string;
  userId!: string;
  shopName!: string;
  shopSlug!: string;
  nidNumber!: string | null;
  tradeLicense!: string | null;
  kycStatus!: SellerKycStatus;
  commissionRate!: number;
  balance!: number;
  bankAccountName!: string | null;
  bankAccountNumber!: string | null;
  bankName!: string | null;
  bkashNumber!: string | null;
  createdAt!: string;
}
