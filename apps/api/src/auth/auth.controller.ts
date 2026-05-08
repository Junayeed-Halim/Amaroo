import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { OtpSendDto, OtpVerifyDto } from './dto/otp.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('otp/send')
  sendOtp(@Body() dto: OtpSendDto) {
    return this.authService.sendOtp(dto);
  }

  @Post('otp/verify')
  verifyOtp(@Body() dto: OtpVerifyDto) {
    return this.authService.verifyOtp(dto);
  }

  @Post('refresh')
  refresh(@Body('refreshToken') refreshToken = '') {
    return this.authService.refresh(refreshToken);
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }

  @Get('me')
  me(@Headers('authorization') authorization = '') {
    return this.authService.meFromAccessToken(authorization);
  }
}
