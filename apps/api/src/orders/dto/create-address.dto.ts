import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  user_id!: string;

  @IsOptional()
  @IsString()
  label?: string;

  @IsString()
  recipient_name!: string;

  @IsString()
  @Matches(/^(\+?88)?01[3-9]\d{8}$/)
  phone!: string;

  @IsString()
  division!: string;

  @IsString()
  district!: string;

  @IsString()
  upazila!: string;

  @IsString()
  street_address!: string;

  @IsOptional()
  @IsString()
  postal_code?: string;

  @IsOptional()
  @IsBoolean()
  is_default?: boolean;
}
