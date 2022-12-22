import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { GameDefinitionService } from './game-definitions.service';
import { GameDefinitionType } from './types/game-definitions.type';

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

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string): Promise<GameDefinitionType> {
    const definition = await this.gameDefinitions.findBySlug(slug);
    if (null === definition)
      throw new NotFoundException('game definition not found');

    return definition;
  }
}
