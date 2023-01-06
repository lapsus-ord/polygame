import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GameStrategyInterface } from './game-strategy.interface';

@Injectable()
export class GameExampleStrategy implements GameStrategyInterface {
  init(): { config: Prisma.JsonObject; data: Prisma.JsonObject } {
    return { config: {}, data: {} };
  }

  handleRequest(): string {
    return '';
  }
}
