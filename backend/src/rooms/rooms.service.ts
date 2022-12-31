import { Injectable } from '@nestjs/common';
import {
  GameDefinition,
  Prisma,
  Room,
  RoomState,
  User,
  UsersInRooms,
} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './types/create-room.dto';
import { GameStrategy } from 'src/games/strategies/game-strategy.service';
import { PrismaRoomType } from './types/rooms.type';

const nanoid = import('nanoid/async');

@Injectable()
export class RoomsService {
  constructor(
    private prisma: PrismaService,
    private gameStrategy: GameStrategy
  ) {}

  findAll(where?: Prisma.RoomWhereInput): Promise<PrismaRoomType[]> {
    return this.prisma.room.findMany({
      where,
      include: {
        creator: { select: { id: true, username: true, role: true } },
        game: { select: { definitionSlug: true } },
        users: {
          select: {
            user: { select: { id: true, username: true, role: true } },
          },
        },
        _count: { select: { users: true } },
      },
    });
  }

  findByCode(code: string): Promise<PrismaRoomType | null> {
    return this.prisma.room.findUnique({
      where: { code: code },
      include: {
        creator: { select: { id: true, username: true, role: true } },
        game: { select: { definitionSlug: true } },
        users: {
          select: {
            user: { select: { id: true, username: true, role: true } },
          },
        },
        _count: { select: { users: true } },
      },
    });
  }

  async create(
    user: User,
    dto: CreateRoomDto,
    gameDefinition: GameDefinition
  ): Promise<PrismaRoomType> {
    // Create a unique room code like "a7u8be5u-m"
    const roomCode = await this.getRandomCode();

    const { config, data } = this.gameStrategy.init(gameDefinition.slug);
    return this.prisma.room.create({
      data: {
        code: roomCode,
        isPublic: dto.isPublic,
        name: dto.name,
        state: RoomState.WAITING,
        creator: { connect: { id: user.id } },
        game: {
          create: {
            config: config,
            data: data,
            definition: { connect: { slug: gameDefinition.slug } },
          },
        },
        users: { create: { user: { connect: { id: user.id } } } },
      },
      include: {
        creator: { select: { id: true, username: true, role: true } },
        game: { select: { definitionSlug: true } },
        users: {
          select: {
            user: { select: { id: true, username: true, role: true } },
          },
        },
        _count: { select: { users: true } },
      },
    });
  }

  remove(code: string): Promise<PrismaRoomType> {
    return this.prisma.room.delete({
      where: { code: code },
      include: {
        creator: { select: { id: true, username: true, role: true } },
        game: { select: { definitionSlug: true } },
        users: {
          select: {
            user: { select: { id: true, username: true, role: true } },
          },
        },
        _count: { select: { users: true } },
      },
    });
  }

  join(user: User, room: Room): Promise<UsersInRooms> {
    return this.prisma.usersInRooms.create({
      data: {
        user: { connect: { id: user.id } },
        room: { connect: { id: room.id } },
      },
    });
  }

  leave(user: User, room: Room): Promise<UsersInRooms> {
    return this.prisma.usersInRooms.delete({
      where: {
        userId_roomId: {
          userId: user.id,
          roomId: room.id,
        },
      },
    });
  }

  getNbOfUsersInTheRoom(room: Room): Promise<number> {
    return this.prisma.usersInRooms.count({
      where: { roomId: room.id },
    });
  }

  async isUserInTheRoom(user: User, room: Room): Promise<boolean> {
    const row = await this.prisma.usersInRooms.findUnique({
      where: {
        userId_roomId: {
          userId: user.id,
          roomId: room.id,
        },
      },
    });

    return !!row;
  }

  private async getRandomCode(): Promise<string> {
    const roomCodes = await this.prisma.room.findMany();

    let randomCode: string;
    do {
      randomCode = await (await nanoid).nanoid(10);
    } while (roomCodes.find((r) => r.code === randomCode));

    return randomCode;
  }
}
