import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/index';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    try {
      const createdUser = await this.prisma.user.create({
        data: {
          username: dto.username,
          password: hashedPassword,
        },
      });

      return {
        username: createdUser.username,
        createdAt: createdUser.createdAt,
      };
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
    if (null === user) throw new ForbiddenException();

    const isSamePassword = await bcrypt.compare(dto.password, user.password);
    if (!isSamePassword) throw new ForbiddenException();

    return {
      username: user.username,
      createdAt: user.createdAt,
    };
  }

  async validateUser(login: string, pass: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: login,
      },
    });
    if (!user) return null;

    const isSamePassword = await bcrypt.compare(pass, user.password);
    if (!isSamePassword) return null;

    return user;
  }
}
