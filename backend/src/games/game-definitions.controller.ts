import { Controller, Get } from '@nestjs/common';
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
}
