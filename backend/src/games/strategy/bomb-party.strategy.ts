import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GameStrategyInterface } from './game-strategy.interface';

@Injectable()
export class BombpartyStrategy implements GameStrategyInterface {
  buildConfig(): Prisma.JsonObject {
    return {
      test: 'data of bombparty game',
    };
  }
}
