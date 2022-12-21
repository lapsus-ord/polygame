import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BombpartyStrategy } from './bomb-party.strategy';

@Injectable()
export class GameStrategy {
  private strategies: MapGameStrategy = {
    bombparty: BombpartyStrategy,
  };

  init(strategySlug: string): {
    config: Prisma.JsonObject;
    data: Prisma.JsonObject;
  } {
    const strategy = this.strategies[strategySlug];
    if (undefined === strategy) {
      throw new NotFoundException('game definition not found');
    }

    return new strategy().init();
  }
}

interface MapGameStrategy {
  [key: string]: any;
}
