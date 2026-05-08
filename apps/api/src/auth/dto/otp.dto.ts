export class OtpSendDto {
  phone!: string;
}

export class OtpVerifyDto {
  phone!: string;
  otp!: string;
}
