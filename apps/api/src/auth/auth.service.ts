import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHash, randomInt, randomUUID } from 'crypto';
import { UserEntity, UserRole } from '../database/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { OtpSendDto, OtpVerifyDto } from './dto/otp.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly users = new Map<string, UserEntity>();
  private readonly otpStore = new Map<string, { otp: string; expiresAt: number }>();
  private readonly otpRateLimit = new Map<string, number[]>();

  register(dto: RegisterDto) {
    const now = new Date().toISOString();
    const user: UserEntity = {
      id: randomUUID(),
      name: dto.name,
      phone: dto.phone,
      email: dto.email ?? null,
      passwordHash: this.hashPassword(dto.password),
      role: 'buyer',
      avatarUrl: null,
      isVerified: false,
      isActive: true,
      createdAt: now,
      deletedAt: null,
    };

    this.users.set(user.phone, user);

    return {
      user,
      accessToken: this.generateToken(user.id, user.role, '15m'),
      refreshToken: this.generateToken(user.id, user.role, '30d'),
    };
  }

  login(dto: LoginDto) {
    const user = this.users.get(dto.phone);
    if (!user || user.passwordHash !== this.hashPassword(dto.password)) {
      throw new UnauthorizedException('Invalid phone or password');
    }

    return {
      accessToken: this.generateToken(user.id, user.role, '15m'),
      refreshToken: this.generateToken(user.id, user.role, '30d'),
      user,
    };
  }

  sendOtp(dto: OtpSendDto) {
    const now = Date.now();
    const history = (this.otpRateLimit.get(dto.phone) ?? []).filter((value) => now - value < 60 * 60 * 1000);
    if (history.length >= 3) {
      throw new UnauthorizedException('OTP rate limit exceeded for this phone');
    }

    const otp = randomInt(100000, 999999).toString();
    history.push(now);
    this.otpRateLimit.set(dto.phone, history);
    this.otpStore.set(dto.phone, { otp, expiresAt: now + 5 * 60 * 1000 });

    return { phone: dto.phone, otpExpiresInSeconds: 300 };
  }

  verifyOtp(dto: OtpVerifyDto) {
    const record = this.otpStore.get(dto.phone);
    if (!record || record.expiresAt < Date.now() || record.otp !== dto.otp) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    this.otpStore.delete(dto.phone);
    const user = this.users.get(dto.phone);
    if (user) {
      user.isVerified = true;
    }

    return { verified: true };
  }

  refresh(refreshToken: string) {
    return {
      accessToken: `${refreshToken}.access`,
      expiresIn: '15m',
    };
  }

  logout() {
    return { success: true };
  }

  me(phone: string) {
    return this.users.get(phone) ?? null;
  }

  private generateToken(userId: string, role: UserRole, expiry: '15m' | '30d') {
    return Buffer.from(JSON.stringify({ sub: userId, role, exp: expiry, iat: Date.now() })).toString('base64url');
  }

  private hashPassword(password: string) {
    return createHash('sha256').update(password).digest('hex');
  }
}
