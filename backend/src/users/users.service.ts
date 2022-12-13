import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/index';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilteredUser } from './dto/filtered-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  find(userId: number): Promise<FilteredUser | null> {
    const promise = this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        username: true,
        role: true,
      },
    });

    return promise;
  }

  findAll(): Promise<FilteredUser[]> {
    const promise = this.prisma.user.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        username: true,
        role: true,
      },
    });

    return promise;
  }

  async delete(userId: number): Promise<FilteredUser | null> {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: { id: userId },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          username: true,
          role: true,
        },
      });

      return deletedUser;
    } catch (error) {
      if (!(error instanceof PrismaClientKnownRequestError)) throw error;
      if (error.code !== 'P2025') throw error;

      return null;
    }
  }
}
