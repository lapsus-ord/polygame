import { Injectable } from '@nestjs/common';
import {
  GameDefinition,
  GameType,
  Prisma,
  Room,
  RoomState,
  User,
} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './types/create-room.dto';
import { GameStrategy } from 'src/games/strategies/game-strategy.service';
import { GameRoomType } from './types/rooms.type';

const nanoid = import('nanoid/async');

@Injectable()
export class RoomsService {
  constructor(
    private prisma: PrismaService,
    private gameStrategy: GameStrategy
  ) {}

  findAllGameRoom(where?: Prisma.RoomWhereInput) {
    return this.prisma.room.findMany({
      where,
      select: {
        code: true,
        name: true,
        state: true,
        creator: { select: { username: true } },
        game: {
          select: {
            definition: {
              select: { name: true },
            },
          },
        },
        _count: {
          select: {
            users: true,
            teams: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findRoomByCode(code: string): Promise<Room | null> {
    return this.prisma.room.findUnique({
      where: { code: code },
    });
  }

  findGameRoomByCode(code: string) {
    return this.prisma.room.findUnique({
      where: { code: code },
      select: {
        code: true,
        name: true,
        state: true,
        creator: { select: { username: true } },
        game: {
          select: {
            definition: {
              select: { name: true },
            },
          },
        },
        _count: {
          select: {
            users: true,
            teams: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async create(user: User, dto: CreateRoomDto, gameDefinition: GameDefinition) {
    // Create a unique room code like "a7u8be5u-m"
    const roomCode = await this.getRandomCode();

    const gameRoom = await this.prisma.room.create({
      data: {
        code: roomCode,
        isPublic: dto.isPublic,
        name: dto.name,
        state: RoomState.WAITING,
        creator: { connect: { id: user.id } },
        game: {
          create: {
            data: this.gameStrategy.buildConfig(dto.gameDefinitionSlug),
            definition: { connect: { slug: gameDefinition.slug } },
          },
        },
      },
      select: {
        code: true,
        name: true,
        state: true,
        creator: { select: { username: true } },
        game: {
          select: {
            definition: {
              select: { name: true },
            },
          },
        },
        _count: {
          select: {
            users: true,
            teams: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (gameDefinition.gameType === GameType.INDIVIDUAL) {
      await this.prisma.usersInRooms.create({
        data: {
          user: { connect: { id: user.id } },
          room: { connect: { code: roomCode } },
        },
      });
    }

    if (gameDefinition.gameType === GameType.TEAM) {
      const team = await this.prisma.team.create({
        data: {
          code: await this.getRandomCode(),
          name: `${user.updatedAt}'s Team`,
        },
      });

      await this.prisma.teamsInRooms.create({
        data: {
          team: { connect: { code: team.code } },
          room: { connect: { code: gameRoom.code } },
        },
      });
    }

    return gameRoom;
  }

  remove(code: string) {
    return this.prisma.room.delete({
      where: { code: code },
      select: {
        code: true,
        name: true,
        state: true,
        creator: { select: { username: true } },
        createdAt: true,
        updatedAt: true,
      },
    });
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
