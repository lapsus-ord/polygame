import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoomState, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto/rooms.dto';
import { randomBytes } from 'crypto';
import { GamesService } from 'src/games/games.service';
import { IsLoggedGuard } from 'src/auth/guard/jwt.guard';

@Controller('rooms')
export class RoomsController {
  constructor(
    private prisma: PrismaService,
    private gamesService: GamesService
  ) {}

  @Get()
  getPublicRooms() {
    return this.prisma.room.findMany({
      where: { isPublic: true },
      select: {
        code: true,
        createdAt: true,
        updatedAt: true,
        creator: { select: { username: true } },
        game: {
          select: {
            definition: {
              select: { name: true },
            },
          },
        },
      },
    });
  }

  @UseGuards(IsLoggedGuard)
  @Post()
  async createRoom(@GetUser() user: User, @Body() dto: CreateRoomDto) {
    // Get the game definition
    const gameDefinition = await this.prisma.gameDefinition.findUnique({
      where: { slug: dto.gameDefinitionSlug },
    });
    if (null === gameDefinition) {
      throw new NotFoundException('game definition not found');
    }

    // Create an instance of a game
    const game = await this.prisma.game.create({
      data: {
        data: this.gamesService.buildConfig(dto.gameDefinitionSlug),
        definition: { connect: { slug: gameDefinition.slug } },
      },
    });

    // Create a unique room code like "a7u8"
    const roomCodes = await this.prisma.room.findMany({
      select: { code: true },
    });
    let createdRoomCode: string | null = null;
    while (
      createdRoomCode === null ||
      roomCodes.includes({ code: createdRoomCode })
    ) {
      createdRoomCode = randomBytes(2).toString('hex', 0, 2);
    }

    // Finally create the room in "SETUP" mode with its game
    const roomPromise = this.prisma.room.create({
      data: {
        code: createdRoomCode,
        isPublic: dto.isPublic,
        name: dto.name,
        state: RoomState.SETUP,
        creator: { connect: { id: user.id } },
        game: { connect: { id: game.id } },
      },
      select: {
        createdAt: true,
        code: true,
        name: true,
        creator: { select: { username: true } },
        game: { select: { definition: { select: { name: true } } } },
        state: true,
      },
    });

    return roomPromise;
  }
}
