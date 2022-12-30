import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { GameDefinitionService } from './game-definitions.service';
import {
  GameDefinitionAdminType,
  GameDefinitionType,
} from './types/game-definitions.type';
import { errors } from '../error.message';
import { AccessTokenGuard } from '../auth/guard/access-token.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '@prisma/client';

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
      };
    });
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('all')
  async findAllAdmin(): Promise<GameDefinitionAdminType[]> {
    const definitions = await this.gameDefinitions.findAll();

    return definitions.map((def) => {
      return {
        slug: def.slug,
        name: def.name,
        enabled: def.enabled,
        color: def.color,
      };
    });
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string): Promise<GameDefinitionType> {
    const definition = await this.gameDefinitions.findBySlug(slug);
    if (null === definition)
      throw new NotFoundException(errors.gameDefinitions.notFound);

    return definition;
  }
}
