import {
  BadRequestException,
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
import { RoomsType, RoomType, RoomWithUsersType } from './types/rooms.type';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { RoomsService } from './rooms.service';
import { GameDefinitionService } from 'src/games/game-definitions.service';
import { JoinLeaveRoomType } from './types/join-leave-room.type';

@Controller('rooms')
export class RoomsController {
  constructor(
    private rooms: RoomsService,
    private gameDefinitions: GameDefinitionService
  ) {}

  @Get()
  async findAll(): Promise<RoomsType> {
    const rooms = await this.rooms.findAll({ isPublic: true });

    return Promise.all(
      rooms.map(async (room) => {
        return {
          code: room.code,
          name: room.name,
          state: room.state,
          creator: { id: room.creator.id, username: room.creator.username },
          gameDefinition: room.game.definitionSlug,
          nbOfUsers: await this.rooms.getNbOfUsersInTheRoom(room),
          createdAt: room.createdAt,
          updatedAt: room.updatedAt,
        };
      })
    );
  }

  @Get(':code')
  async findByCode(@Param('code') code: string): Promise<RoomWithUsersType> {
    const room = await this.rooms.findByCode(code);
    if (null === room) throw new NotFoundException('room not found');

    return {
      code: room.code,
      name: room.name,
      state: room.state,
      creator: { id: room.creator.id, username: room.creator.username },
      gameDefinition: room.game.definitionSlug,
      users: room.users.map((user) => {
        return { id: user.user.id, username: user.user.username };
      }),
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    };
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @GetUser() user: User,
    @Body() dto: CreateRoomDto
  ): Promise<RoomWithUsersType> {
    // Get the game definition
    const gameDefinition = await this.gameDefinitions.findBySlug(
      dto.gameDefinitionSlug
    );
    if (null === gameDefinition)
      throw new NotFoundException('game definition not found');

    // Create the room in "WAITING" mode with a game instance
    const room = await this.rooms.create(user, dto, gameDefinition);

    return {
      code: room.code,
      name: room.name,
      state: room.state,
      creator: { id: room.creator.id, username: room.creator.username },
      gameDefinition: room.game.definitionSlug,
      users: room.users.map((user) => {
        return { id: user.user.id, username: user.user.username };
      }),
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
      creator: {
        id: deletedRoom.creator.id,
        username: deletedRoom.creator.username,
      },
      gameDefinition: deletedRoom.game.definitionSlug,
      createdAt: deletedRoom.createdAt,
      updatedAt: deletedRoom.updatedAt,
    };
  }

  @UseGuards(AccessTokenGuard)
  @Get(':code/join')
  async join(
    @Param('code') code: string,
    @GetUser() user: User
  ): Promise<JoinLeaveRoomType> {
    const room = await this.rooms.findByCode(code);
    if (null === room) throw new NotFoundException('room not found');

    const userIsInTheRoom = await this.rooms.isUserInTheRoom(user, room);
    if (userIsInTheRoom)
      throw new BadRequestException('user is already in the room');

    await this.rooms.join(user, room);

    return { message: 'successfully joined the room' };
  }

  @UseGuards(AccessTokenGuard)
  @Get(':code/leave')
  async leave(
    @Param('code') code: string,
    @GetUser() user: User
  ): Promise<JoinLeaveRoomType> {
    const room = await this.rooms.findByCode(code);
    if (null === room) throw new NotFoundException('room not found');

    const userIsInTheRoom = await this.rooms.isUserInTheRoom(user, room);
    if (!userIsInTheRoom)
      throw new BadRequestException('user is not in the room');

    if (room.creatorId === user.id)
      throw new BadRequestException("creator cannot leave it's room");

    await this.rooms.leave(user, room);

    return { message: 'successfully leaved the room' };
  }

  private async userOwnsRoom(
    currentUser: User,
    roomTargetCode: string
  ): Promise<Room> {
    const room = await this.rooms.findByCode(roomTargetCode);
    if (null === room) throw new NotFoundException('room not found');

    // If user own the resource, or he's an admin -> authorized
    if (currentUser.role === Role.ADMIN || currentUser.id === room.creatorId)
      return room;

    throw new UnauthorizedException();
  }
}
