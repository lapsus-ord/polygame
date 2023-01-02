import { Controller, Get, UseGuards } from '@nestjs/common';
import { GameDefinitionService } from './game-definitions.service';
import { GameDefinitionType } from './types/game-definitions.type';
import { AccessTokenGuard } from '../auth/guard/access-token.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { GameDefinition, Role } from '@prisma/client';

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
}
