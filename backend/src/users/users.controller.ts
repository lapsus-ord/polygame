import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { IsAdminGuard } from 'src/auth/guard/admin.guard';
import { IsLoggedGuard } from 'src/auth/guard/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(IsLoggedGuard)
  @Get('me')
  getUserMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(IsAdminGuard)
  @Get(':id')
  async getUserInfoById(@Param('id') userId: string) {
    const user = await this.usersService.find(parseInt(userId));
    if (null === user) throw new NotFoundException();

    return user;
  }

  @UseGuards(IsAdminGuard)
  @Delete(':id')
  async deleteUserById(@Param('id') userId: string) {
    const user = await this.usersService.delete(parseInt(userId));
    if (null === user) throw new NotFoundException();

    return user;
  }

  @UseGuards(IsAdminGuard)
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }
}
