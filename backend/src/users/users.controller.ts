import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/guard/admin.guard';
import { UsersService } from './users.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { FilteredUser } from './dto/filtered-user.dto';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService, private rooms: RoomsService) {}

  @UseGuards(AdminGuard)
  @Get()
  async findAll(): Promise<FilteredUser[]> {
    const users = await this.users.findAll();
    const filteredUsers = users.map((user) => {
      return {
        id: user.id,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });

    return filteredUsers;
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<FilteredUser> {
    const user = await this.users.findById(id);
    if (null === user) throw new NotFoundException();

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  @UseGuards(AdminGuard)
  @Get(':id/rooms')
  async findRoomsOfUserById(@Param('id') id: string) {
    const userRooms = await this.rooms.findAll({
      creator: { id: parseInt(id) },
    });

    const userRoomsFiltered = userRooms.map((room) => {
      return {
        code: room.code,
        name: room.name,
        state: room.state,
        creator: room.creator.username,
        game: room.game.definition.name,
        createdAt: room.createdAt,
        updatedAt: room.updatedAt,
      };
    });

    return userRoomsFiltered;
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.users.remove(id);
    if (null === user) throw new NotFoundException();

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
