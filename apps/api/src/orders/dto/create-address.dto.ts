export class CreateAddressDto {
  user_id!: string;
  label?: string;
  recipient_name!: string;
  phone!: string;
  division!: string;
  district!: string;
  upazila!: string;
  street_address!: string;
  postal_code?: string;
  is_default?: boolean;
}
