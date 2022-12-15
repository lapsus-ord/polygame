import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BombpartyStrategy } from './strategy/bomb-party.strategy';

@Injectable()
export class GamesService {
  // private gameStrategies: MapGameStrategy = {};

  // constructor() {
  //   this.gameStrategies['bombparty'] = BombpartyStrategy;
  // }

  buildConfig(gameDefinitionSlug: string): Prisma.JsonObject {
    if (gameDefinitionSlug === 'bombparty') {
      return new BombpartyStrategy().buildConfig();
    }

    return {};
  }
}

// type MapGameStrategy = {
//   [slug: string]: GameStrategyInterface;
// };
