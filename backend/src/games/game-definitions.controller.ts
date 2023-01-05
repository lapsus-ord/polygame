import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GameDefinitionService } from './game-definitions.service';
import { GameDefinitionType } from './types/game-definitions.type';
import { AccessTokenGuard } from '../auth/guard/access-token.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { GameDefinition, Role } from '@prisma/client';
import {
  CreateDefinitionDto,
  UpdateDefinitionDto,
} from './types/game-definition.dto';
import { errors } from '../error.message';

@Controller('games/definitions')
export class GameDefinitionsController {
  constructor(private gameDefinitions: GameDefinitionService) {}

  @Get()
  async findAll(): Promise<GameDefinitionType[]> {
    const definitions = await this.gameDefinitions.findAll({ enabled: true });

    return definitions.map((def) => {
      return {
        slug: def.slug,
        name: def.name,
        logo: def.logo,
        description: def.description,
        color: def.color,
      };
    });
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('all')
  findAllAdmin(): Promise<GameDefinition[]> {
    return this.gameDefinitions.findAll();
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() dto: CreateDefinitionDto): Promise<GameDefinition> {
    const definitions = await this.gameDefinitions.findAll();
    const isAlreadyTaken = definitions.find((def) => def.slug === dto.slug);
    if (undefined !== isAlreadyTaken)
      throw new ConflictException(errors.gameDefinitions.slugTaken);

    return this.gameDefinitions.create(dto);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() dto: UpdateDefinitionDto
  ): Promise<GameDefinition> {
    if (undefined !== dto.slug) {
      const definitions = await this.gameDefinitions.findAll();
      const isAlreadyTaken = definitions.find((def) => def.slug === dto.slug);
      if (undefined !== isAlreadyTaken)
        throw new ConflictException(errors.gameDefinitions.slugTaken);
    }

    return this.gameDefinitions.update(slug, dto);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':slug/switch')
  switchEnabled(@Param('slug') slug: string): Promise<GameDefinition> {
    return this.gameDefinitions.switchEnabled(slug);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':slug')
  remove(@Param('slug') slug: string): Promise<GameDefinition> {
    return this.gameDefinitions.remove(slug);
  }
}
