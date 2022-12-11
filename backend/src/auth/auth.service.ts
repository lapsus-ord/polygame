import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/index';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async register(dto: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    try {
      const createdUser = await this.prisma.user.create({
        data: {
          username: dto.username,
          password: hashedPassword,
        },
      });

      return this.signToken(
        createdUser.id,
        createdUser.username,
        createdUser.role
      );
    } catch (error) {
      if (!(error instanceof PrismaClientKnownRequestError)) throw error;
      if (error.code !== 'P2002') throw error;

      throw new ConflictException('Credentials taken');
    }
  }

  async login(dto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });
    if (null === user) throw new ForbiddenException('Wrong credentials');

    const isSamePassword = await bcrypt.compare(dto.password, user.password);
    if (!isSamePassword) throw new ForbiddenException('Wrong credentials');

    return this.signToken(user.id, user.username, user.role);
  }

  async signToken(
    userId: number,
    username: string,
    role: Role
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      username: username,
      role: role,
    };

    const options: JwtSignOptions = {
      expiresIn: '15m',
      secret: this.config.get<string>('JWT_SECRET'),
    };

    const token = await this.jwt.signAsync(payload, options);

    return { access_token: token };
  }
}
