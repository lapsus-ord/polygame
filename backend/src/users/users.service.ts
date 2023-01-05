import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './types/update-user.dto';
import { errors } from '../error.message';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(where?: Prisma.UserWhereInput): Promise<User[]> {
    return this.prisma.user.findMany({ where });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (null === user) throw new NotFoundException(errors.users.notFound);

    return this.prisma.user.update({
      where: { id: id },
      data: {
        username: dto.username,
        role: dto.role,
      },
    });
  }

  async remove(id: number): Promise<User | null> {
    try {
      return this.prisma.user.delete({
        where: { id: id },
      });
    } catch (error) {
      if (!(error instanceof PrismaClientKnownRequestError)) throw error;
      if (error.code !== 'P2025') throw error;

      return null;
    }
  }
}
