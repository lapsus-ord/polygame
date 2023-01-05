import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GameDefinition, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateDefinitionDto,
  UpdateDefinitionDto,
} from './types/game-definition.dto';
import { errors } from '../error.message';
import { GameStrategy } from './strategies/game-strategy.service';

@Injectable()
export class GameDefinitionService {
  constructor(private prisma: PrismaService) {}

  findAll(where?: Prisma.GameDefinitionWhereInput): Promise<GameDefinition[]> {
    return this.prisma.gameDefinition.findMany({ where });
  }

  findEnabledBySlug(slug: string): Promise<GameDefinition | null> {
    return this.prisma.gameDefinition.findFirst({
      where: { slug: slug, enabled: true },
    });
  }

  create(dto: CreateDefinitionDto): Promise<GameDefinition> {
    return this.prisma.gameDefinition.create({
      data: {
        slug: dto.slug,
        name: dto.name,
        logo: dto.logo,
        description: dto.description,
        color: dto.color,
      },
    });
  }

  async update(
    slug: string,
    dto: UpdateDefinitionDto
  ): Promise<GameDefinition> {
    const definition = await this.prisma.gameDefinition.findUnique({
      where: { slug: slug },
    });
    if (null === definition)
      throw new NotFoundException(errors.gameDefinitions.notFound);

    if (dto.slug && undefined === GameStrategy.strategies[dto.slug])
      throw new ConflictException(errors.gameDefinitions.notImplemented);

    return this.prisma.gameDefinition.update({
      where: { slug: slug },
      data: {
        slug: dto.slug,
        name: dto.name,
        logo: dto.logo,
        description: dto.description,
        color: dto.color,
      },
    });
  }

  async switchEnabled(slug: string): Promise<GameDefinition> {
    const definition = await this.prisma.gameDefinition.findUnique({
      where: { slug: slug },
    });
    if (null === definition)
      throw new NotFoundException(errors.gameDefinitions.notFound);

    if (undefined === GameStrategy.strategies[slug])
      throw new ConflictException(errors.gameDefinitions.notImplemented);

    return this.prisma.gameDefinition.update({
      where: { slug: slug },
      data: {
        enabled: !definition.enabled,
      },
    });
  }

  async remove(slug: string): Promise<GameDefinition> {
    const definition = await this.prisma.gameDefinition.findUnique({
      where: { slug: slug },
    });
    if (null === definition)
      throw new NotFoundException(errors.gameDefinitions.notFound);

    return this.prisma.gameDefinition.delete({ where: { slug: slug } });
  }
}
