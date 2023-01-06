import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GameExampleStrategy } from './strategies/game-example.strategy';
import { errors } from '../error.message';

@Injectable()
export class GameStrategy {
  public static strategies: MapGameStrategy = {
    bombparty: GameExampleStrategy,
    'cowboy-clicker': GameExampleStrategy,
    motus: GameExampleStrategy,
    guesswho: GameExampleStrategy,
  };

  init(strategySlug: string): {
    config: Prisma.JsonObject;
    data: Prisma.JsonObject;
  } {
    const strategy = GameStrategy.strategies[strategySlug];
    if (undefined === strategy) {
      throw new NotFoundException(errors.gameDefinitions.notFound);
    }

    return new strategy().init();
  }
}

interface MapGameStrategy {
  [key: string]: any;
}
