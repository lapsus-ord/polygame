import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BombpartyStrategy } from './bomb-party.strategy';
import { errors } from '../../error.message';

@Injectable()
export class GameStrategy {
  private strategies: MapGameStrategy = {
    bombparty: BombpartyStrategy,
    'cowboy-clicker': BombpartyStrategy, // TODO: not implemented
  };

  init(strategySlug: string): {
    config: Prisma.JsonObject;
    data: Prisma.JsonObject;
  } {
    const strategy = this.strategies[strategySlug];
    if (undefined === strategy) {
      throw new NotFoundException(errors.gameDefinitions.notFound);
    }

    return new strategy().init();
  }
}

interface MapGameStrategy {
  [key: string]: any;
}
