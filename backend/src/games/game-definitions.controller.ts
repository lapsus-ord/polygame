import { Controller, Get } from '@nestjs/common';
import { GameType } from '@prisma/client';
import { GameDefinitionService } from './game-definitions.service';

@Controller('games/definitions')
export class GameDefinitionsController {
  constructor(private gameDefinitions: GameDefinitionService) {}

  @Get()
  async getGameDefinitions() {
    const definitions = await this.gameDefinitions.findAll({ enabled: true });

    return definitions.map((def) => {
      return {
        slug: def.slug,
        name: def.name,
        type: def.gameType,
      };
    });
  }

  @Get('individual')
  async getIndividualGameDefinitions() {
    const gameDefs = await this.gameDefinitions.findAll({
      enabled: true,
      gameType: GameType.INDIVIDUAL,
    });

    const gameDefsFiltered = gameDefs.map((gameDef) => {
      return {
        slug: gameDef.slug,
        name: gameDef.name,
      };
    });

    return gameDefsFiltered;
  }

  @Get('team')
  async getTeamGameDefinitions() {
    const gameDefs = await this.gameDefinitions.findAll({
      enabled: true,
      gameType: GameType.TEAM,
    });

    const gameDefsFiltered = gameDefs.map((gameDef) => {
      return {
        slug: gameDef.slug,
        name: gameDef.name,
      };
    });

    return gameDefsFiltered;
  }
}
