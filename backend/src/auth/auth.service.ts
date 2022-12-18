import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/index';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { Tokens } from './types/tokens.type';

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

      const tokens = await this.getTokens(
        createdUser.id,
        createdUser.username,
        createdUser.role
      );
      await this.updateRefreshToken(createdUser.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      if (!(error instanceof PrismaClientKnownRequestError)) throw error;
      if (error.code !== 'P2002') throw error;

      throw new ConflictException('Credentials taken');
    }
  }

  async login(dto: LoginUserDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });
    if (null === user) throw new ForbiddenException('Wrong credentials');

    const isSamePassword = await argon2.verify(user.password, dto.password);
    if (!isSamePassword) throw new ForbiddenException('Wrong credentials');

    const tokens = await this.getTokens(user.id, user.username, user.role);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  // Helper functions

  async getTokens(
    userId: number,
    username: string,
    role: Role
  ): Promise<Tokens> {
    const payload = {
      sub: userId,
      username: username,
      role: role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      }),
      this.jwt.signAsync(payload, {
        expiresIn: '7d',
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string
  ): Promise<void> {
    const hashRefreshToken = await argon2.hash(refreshToken);

    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashRefreshToken },
    });
  }

  hash(data: string): Promise<string> {
    return argon2.hash(data);
  }
}
