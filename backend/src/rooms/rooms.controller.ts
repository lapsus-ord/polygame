import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Role, Room, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { CreateRoomDto } from './types/create-room.dto';
import { GameRoomType, RoomType } from './types/rooms.type';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { RoomsService } from './rooms.service';
import { GameDefinitionService } from 'src/games/game-definitions.service';

@Controller('rooms')
export class RoomsController {
  constructor(
    private rooms: RoomsService,
    private gameDefinitions: GameDefinitionService
  ) {}

  @Get()
  async findAll(): Promise<GameRoomType[]> {
    const gameRooms = await this.rooms.findAllGameRoom({ isPublic: true });

    return gameRooms.map((gameRoom) => {
      return {
        code: gameRoom.code,
        name: gameRoom.name,
        state: gameRoom.state,
        creator: gameRoom.creator.username,
        game: gameRoom.game.definition.name,
        nbOfUsers: gameRoom._count.users,
        createdAt: gameRoom.createdAt,
        updatedAt: gameRoom.updatedAt,
      };
    });
  }

  @Get(':code')
  async findByCode(@Param('code') code: string): Promise<GameRoomType> {
    const gameRoom = await this.rooms.findGameRoomByCode(code);
    if (null === gameRoom) throw new NotFoundException();

    return {
      code: gameRoom.code,
      name: gameRoom.name,
      state: gameRoom.state,
      creator: gameRoom.creator.username,
      game: gameRoom.game.definition.name,
      nbOfUsers: gameRoom._count.users,
      createdAt: gameRoom.createdAt,
      updatedAt: gameRoom.updatedAt,
    };
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createRoom(
    @GetUser() user: User,
    @Body() dto: CreateRoomDto
  ): Promise<GameRoomType> {
    // Get the game definition
    const gameDefinition = await this.gameDefinitions.findBySlug(
      dto.gameDefinitionSlug
    );
    if (null === gameDefinition) {
      throw new NotFoundException('game definition not found');
    }

    // Create the room in "WAITING" mode with a game instance
    const room = await this.rooms.create(user, dto, gameDefinition);

    return {
      code: room.code,
      name: room.name,
      state: room.state,
      creator: room.creator.username,
      game: room.game.definition.name,
      nbOfUsers: room._count.users,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    };
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':code')
  async remove(
    @Param('code') code: string,
    @GetUser() user: User
  ): Promise<RoomType> {
    const room = await this.userOwnsRoom(user, code);
    const deletedRoom = await this.rooms.remove(room.code);

    return {
      code: deletedRoom.code,
      name: deletedRoom.name,
      state: deletedRoom.state,
      creator: deletedRoom.creator.username,
      createdAt: deletedRoom.createdAt,
      updatedAt: deletedRoom.updatedAt,
    };
  }

  private async userOwnsRoom(
    currentUser: User,
    roomTargetCode: string
  ): Promise<Room> {
    const room = await this.rooms.findRoomByCode(roomTargetCode);
    if (null === room) throw new NotFoundException();

    // If user own the resource, or he's an admin -> authorized
    if (currentUser.role === Role.ADMIN || currentUser.id === room.creatorId)
      return room;

    throw new UnauthorizedException();
  }
}
