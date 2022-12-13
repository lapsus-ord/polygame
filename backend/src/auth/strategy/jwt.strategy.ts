import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilteredUser } from 'src/users/dto/filtered-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  validate(payload: any): Promise<FilteredUser | null> {
    return this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        username: true,
        role: true,
      },
    });
  }
}
