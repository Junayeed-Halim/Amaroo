import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomInt, randomUUID } from 'crypto';
import { compare, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { UserEntity, UserRole } from '../database/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { OtpSendDto, OtpVerifyDto } from './dto/otp.dto';
import { RegisterDto } from './dto/register.dto';

const OTP_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const OTP_MAX_PER_WINDOW = 3;
const OTP_TTL_MS = 5 * 60 * 1000;
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '30d';

@Injectable()
export class AuthService {
  private readonly users = new Map<string, UserEntity>();
  private readonly otpStore = new Map<string, { otp: string; expiresAt: number }>();
  private readonly otpRateLimit = new Map<string, number[]>();
  private readonly jwtSecret: string;

  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is required');
    }
    this.jwtSecret = secret;
  }

  async register(dto: RegisterDto) {
    const now = new Date().toISOString();
    const user: UserEntity = {
      id: randomUUID(),
      name: dto.name,
      phone: dto.phone,
      email: dto.email ?? null,
      passwordHash: await this.hashPassword(dto.password),
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
      accessToken: this.generateToken(user.id, user.role, ACCESS_TOKEN_EXPIRY),
      refreshToken: this.generateToken(user.id, user.role, REFRESH_TOKEN_EXPIRY),
    };
  }

  async login(dto: LoginDto) {
    const user = this.users.get(dto.phone);
    if (!user || !user.passwordHash || !(await compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid phone or password');
    }

    return {
      accessToken: this.generateToken(user.id, user.role, ACCESS_TOKEN_EXPIRY),
      refreshToken: this.generateToken(user.id, user.role, REFRESH_TOKEN_EXPIRY),
      user,
    };
  }

  sendOtp(dto: OtpSendDto) {
    const now = Date.now();
    const history = (this.otpRateLimit.get(dto.phone) ?? []).filter((value) => now - value < OTP_RATE_LIMIT_WINDOW_MS);
    if (history.length >= OTP_MAX_PER_WINDOW) {
      throw new UnauthorizedException('OTP rate limit exceeded for this phone');
    }

    const otp = randomInt(100000, 999999).toString();
    history.push(now);
    this.otpRateLimit.set(dto.phone, history);
    this.otpStore.set(dto.phone, { otp, expiresAt: now + OTP_TTL_MS });

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
    try {
      const payload = verify(refreshToken, this.jwtSecret) as { sub: string; role: UserRole };
      return {
        accessToken: this.generateToken(payload.sub, payload.role, ACCESS_TOKEN_EXPIRY),
        expiresIn: ACCESS_TOKEN_EXPIRY,
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  logout() {
    return {
      success: true,
    };
  }

  me(phone: string) {
    return this.users.get(phone) ?? null;
  }

  meFromAccessToken(accessToken: string) {
    try {
      const token = accessToken.replace(/^Bearer\s+/i, '');
      const payload = verify(token, this.jwtSecret) as { sub: string };
      return [...this.users.values()].find((user) => user.id === payload.sub) ?? null;
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  private generateToken(userId: string, role: UserRole, expiry: '15m' | '30d') {
    return sign({ sub: userId, role }, this.jwtSecret, { expiresIn: expiry });
  }

  private hashPassword(password: string) {
    return hash(password, 12);
  }
}
