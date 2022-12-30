import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './types/auth.dto';
import { JwtPayload, Tokens } from './types/jwt.type';
import { RefreshTokenGuard } from './guard/refresh-token.guard';
import { AccessTokenGuard } from './guard/access-token.guard';
import { GetUser } from './decorator/user.decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() dto: RegisterUserDto): Promise<Tokens> {
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginUserDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@GetUser() user: User) {
    await this.authService.removeRefreshToken(user);

    return '';
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@GetUser() user: JwtPayload & { refreshToken: string }) {
    return this.authService.refreshTokens(user.sub, user.refreshToken);
  }
}
