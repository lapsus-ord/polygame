import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto/rooms.dto';
import { GameDefinition, Prisma, RoomState, User } from '@prisma/client';
import { GameStrategy } from 'src/games/strategies/game-strategy.service';

const nanoid = import('nanoid/async');

@Injectable()
export class RoomsService {
  constructor(
    private prisma: PrismaService,
    private gameStrategy: GameStrategy
  ) {}

  async findAll(where?: Prisma.RoomWhereInput) {
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
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async create(user: User, dto: CreateRoomDto, gameDefinition: GameDefinition) {
    // Create a unique room code like "a7u8"
    const roomCode = await this.getRandomCode();

    return this.prisma.room.create({
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
