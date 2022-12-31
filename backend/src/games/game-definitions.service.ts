import { Injectable } from '@nestjs/common';
import { GameDefinition, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameDefinitionService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    where?: Prisma.GameDefinitionWhereInput
  ): Promise<GameDefinition[]> {
    return this.prisma.gameDefinition.findMany({ where });
  }

  async findEnabledBySlug(slug: string): Promise<GameDefinition | null> {
    return this.prisma.gameDefinition.findFirst({
      where: { slug: slug, enabled: true },
    });
  }
}
