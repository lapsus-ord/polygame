import { Prisma } from '@prisma/client';

export interface GameStrategyInterface {
  buildConfig(): Prisma.JsonObject;
}
