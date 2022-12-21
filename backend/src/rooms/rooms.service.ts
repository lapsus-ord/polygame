import { Injectable } from '@nestjs/common';
import { GameDefinition, Prisma, Room, RoomState, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './types/create-room.dto';
import { GameStrategy } from 'src/games/strategies/game-strategy.service';

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
        _count: { select: { users: true } },
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
        _count: { select: { users: true } },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async create(user: User, dto: CreateRoomDto, gameDefinition: GameDefinition) {
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
        _count: { select: { users: true } },
        createdAt: true,
        updatedAt: true,
      },
    });
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
