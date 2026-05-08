import { IsString, Matches } from 'class-validator';

export class OtpSendDto {
  @IsString()
  @Matches(/^(\+?88)?01[3-9]\d{8}$/)
  phone!: string;
}

export class OtpVerifyDto {
  @IsString()
  @Matches(/^(\+?88)?01[3-9]\d{8}$/)
  phone!: string;

  @IsString()
  @Matches(/^\d{6}$/)
  otp!: string;
}
