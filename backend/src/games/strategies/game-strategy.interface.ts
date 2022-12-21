import { Prisma } from '@prisma/client';

export interface GameStrategyInterface {
  init(): { config: Prisma.JsonObject; data: Prisma.JsonObject };

  handleRequest(): string;
}
