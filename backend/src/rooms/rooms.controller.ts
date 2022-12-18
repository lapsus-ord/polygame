import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { CreateRoomDto } from './dto/rooms.dto';
import { IsLoggedGuard } from 'src/auth/guard/jwt.guard';
import { RoomsService } from './rooms.service';
import { GameDefinitionService } from 'src/games/game-definitions.service';

@Controller('rooms')
export class RoomsController {
  constructor(
    private rooms: RoomsService,
    private gameDefinitions: GameDefinitionService
  ) {}

  @Get()
  async findAll() {
    const rooms = await this.rooms.findAll({ isPublic: true });

    const filteredRooms = rooms.map((room) => {
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

    return filteredRooms;
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(IsLoggedGuard)
  @Post()
  async createRoom(@GetUser() user: User, @Body() dto: CreateRoomDto) {
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
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    };
  }
}
