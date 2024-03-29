import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { UsersService } from './users.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { FilteredUser } from './types/filtered-user.dto';
import { RoomsType } from '../rooms/types/rooms.type';
import { AccessTokenGuard } from '../auth/guard/access-token.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { GetUser } from '../auth/decorator/user.decorator';
import { errors } from '../error.message';
import { UpdateUserDto } from './types/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService, private rooms: RoomsService) {}

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<FilteredUser[]> {
    const users = await this.users.findAll();

    return users.map((user) => {
      return {
        id: user.id,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() currentUser: User
  ): Promise<FilteredUser> {
    const user = await this.userOwnsUser(currentUser, id);

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id/rooms')
  async findRoomsOfUserById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() currentUser: User
  ): Promise<RoomsType> {
    const user = await this.userOwnsUser(currentUser, id);

    const userRooms = await this.rooms.findAll({
      creator: { id: user.id },
    });

    return userRooms.map((room) => {
      return {
        code: room.code,
        name: room.name,
        state: room.state,
        creator: {
          id: room.creator.id,
          username: room.creator.username,
          role: room.creator.role,
        },
        gameDefinition: room.game.definitionSlug,
        userCount: room._count.users,
        createdAt: room.createdAt,
        updatedAt: room.updatedAt,
      };
    });
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto
  ): Promise<FilteredUser> {
    if (undefined !== dto.username) {
      const definitions = await this.users.findAll();
      const isAlreadyTaken = definitions.find(
        (user) => user.username === dto.username
      );
      if (undefined !== isAlreadyTaken)
        throw new ConflictException(errors.users.usernameTaken);
    }

    const user = await this.users.update(id, dto);
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() currentUser: User
  ): Promise<FilteredUser> {
    const user = await this.userOwnsUser(currentUser, id);

    await this.users.remove(user.id);

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private async userOwnsUser(
    currentUser: User,
    userTargetId: number
  ): Promise<User> {
    const user = await this.users.findById(userTargetId);
    if (null === user) throw new NotFoundException();

    // If user own the resource, or he's an admin -> authorized
    if (currentUser.role === Role.ADMIN || currentUser.id === user.id)
      return user;

    throw new NotFoundException();
  }
}
