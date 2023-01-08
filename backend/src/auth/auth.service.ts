import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { LoginUserDto, RegisterUserDto } from './types/auth.dto';
import {
  AccessToken,
  JwtPayload,
  RefreshToken,
  Tokens,
} from './types/jwt.type';
import { errors } from '../error.message';
import { CookieOptions } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async register(dto: RegisterUserDto): Promise<Tokens> {
    const hashedPassword = await this.hash(dto.password);

    try {
      const createdUser = await this.prisma.user.create({
        data: {
          username: dto.username,
          password: hashedPassword,
        },
      });

      const tokens = await this.getTokens(createdUser.id);
      await this.updateRefreshToken(createdUser.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      if (!(error instanceof PrismaClientKnownRequestError)) throw error;
      if (error.code !== 'P2002') throw error;

      throw new ConflictException(errors.register.credentialsTaken);
    }
  }

  async login(dto: LoginUserDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });
    if (null === user)
      throw new ForbiddenException(errors.login.credentialsWrong);

    const isSamePassword = await argon2.verify(user.password, dto.password);
    if (!isSamePassword)
      throw new ForbiddenException(errors.login.credentialsWrong);

    const tokens = await this.getTokens(user.id);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async removeRefreshToken(user: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: null },
    });
  }

  async refreshTokens(
    userId: number,
    oldRefreshToken: string
  ): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (null === user || null === user.refreshToken)
      throw new ForbiddenException(errors.refreshToken.expired);

    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      oldRefreshToken
    );
    if (!refreshTokenMatches)
      throw new ForbiddenException(errors.refreshToken.expired);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const decodedRefresh: { sub: number; iat: number; exp: number } =
      this.jwt.decode(oldRefreshToken);
    const expirationTime = (decodedRefresh['exp'] ?? 0) * 1000;
    const daysBetween = Math.floor((expirationTime - Date.now()) / 86400000);

    // update refresh token only if near its expiration
    if (daysBetween <= 4) {
      const tokens = await this.getTokens(user.id);
      await this.updateRefreshToken(user.id, tokens.refresh_token);
      return tokens;
    }

    const newAccessToken = await this.newAccessToken({ sub: user.id });
    return {
      access_token: newAccessToken,
      refresh_token: oldRefreshToken,
    };
  }

  getRefreshCookieAdd(refreshToken: string): {
    val: string;
    options: CookieOptions;
  } {
    return {
      val: refreshToken,
      options: {
        httpOnly: true,
        secure: true,
        path: '/api/v1/auth/refresh',
        maxAge: 604800 * 1000,
        sameSite: 'strict',
        domain: this.config.get('COOKIE_DOMAIN') ?? 'localhost',
      },
    };
  }

  getRefreshCookieRemove(): {
    val: string;
    options: CookieOptions;
  } {
    return {
      val: 'none',
      options: {
        httpOnly: true,
        secure: true,
        path: '/api/v1/auth/refresh',
        maxAge: 0,
        sameSite: 'strict',
        domain: this.config.get('COOKIE_DOMAIN') ?? 'localhost',
      },
    };
  }

  private async getTokens(userId: number): Promise<Tokens> {
    const payload = { sub: userId };

    const [accessToken, refreshToken] = await Promise.all([
      this.newAccessToken(payload),
      this.newRefreshToken(payload),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private async newAccessToken(payload: JwtPayload): Promise<string> {
    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get<string>('JWT_ACCESS_SECRET'),
    });
  }

  private async newRefreshToken(payload: JwtPayload): Promise<string> {
    return this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
    });
  }

  private async updateRefreshToken(
    userId: number,
    refreshToken: string
  ): Promise<void> {
    const newRefreshToken = await argon2.hash(refreshToken);

    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: newRefreshToken },
    });
  }

  private hash(data: string): Promise<string> {
    return argon2.hash(data);
  }
}
