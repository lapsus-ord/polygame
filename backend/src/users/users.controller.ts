import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/index';
import { UserOwnsGuard } from 'src/auth/guard/user-owns.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilteredUser } from './dto/filtered-user.dto';

@Controller('users')
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(UserOwnsGuard)
  @Get()
  getUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        username: true,
        role: true,
      },
    });
  }

  @UseGuards(UserOwnsGuard)
  @Get(':userId')
  async getUserInfoById(@Param('userId') userId: string) {
    const user: FilteredUser | null = await this.prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        username: true,
        role: true,
      },
    });
    if (null === user) throw new NotFoundException();

    return user;
  }

  @UseGuards(UserOwnsGuard)
  @Delete(':userId')
  async deleteUserById(@Param('userId') userId: string) {
    try {
      return await this.prisma.user.delete({
        where: { id: parseInt(userId) },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          username: true,
          role: true,
        },
      });
    } catch (error) {
      if (!(error instanceof PrismaClientKnownRequestError)) throw error;
      if (error.code !== 'P2025') throw error;

      throw new NotFoundException();
    }
  }
}
