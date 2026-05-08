import { IsString, Matches, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @Matches(/^(\+?88)?01[3-9]\d{8}$/)
  phone!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
