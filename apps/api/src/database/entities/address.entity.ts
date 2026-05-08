export class AddressEntity {
  id!: string;
  userId!: string;
  label!: string | null;
  recipientName!: string;
  phone!: string;
  division!: string;
  district!: string;
  upazila!: string;
  streetAddress!: string;
  postalCode!: string | null;
  isDefault!: boolean;
}
