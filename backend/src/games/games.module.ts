import { Module } from '@nestjs/common';
import { GameDefinitionsController } from './game-definitions.controller';
import { GameStrategy } from './strategy/game-strategy.service';
import { GameDefinitionService } from './game-definitions.service';

@Module({
  providers: [GameStrategy, GameDefinitionService],
  controllers: [GameDefinitionsController],
  exports: [GameStrategy, GameDefinitionService],
})
export class GamesModule {}
