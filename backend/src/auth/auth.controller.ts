import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './types/auth.dto';
import { AccessToken, JwtPayload } from './types/jwt.type';
import { RefreshTokenGuard } from './guard/refresh-token.guard';
import { AccessTokenGuard } from './guard/access-token.guard';
import { GetUser } from './decorator/user.decorator';
import { User } from '@prisma/client';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Body() dto: RegisterUserDto,
    @Req() req: Request
  ): Promise<AccessToken> {
    const tokens = await this.authService.register(dto);
    const cookie = this.authService.getRefreshCookieAdd(tokens.refresh_token);
    req.res?.cookie('Refresh', cookie.val, cookie.options);

    return { access_token: tokens.access_token };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: LoginUserDto,
    @Req() req: Request
  ): Promise<AccessToken> {
    const tokens = await this.authService.login(dto);
    const cookie = this.authService.getRefreshCookieAdd(tokens.refresh_token);
    req.res?.cookie('Refresh', cookie.val, cookie.options);

    return { access_token: tokens.access_token };
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@GetUser() user: User, @Req() req: Request) {
    await this.authService.removeRefreshToken(user);
    const cookie = this.authService.getRefreshCookieRemove();
    req.res?.cookie('Refresh', cookie.val, cookie.options);

    return '';
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(
    @GetUser() user: JwtPayload & { refreshToken: string },
    @Req() req: Request
  ): Promise<AccessToken> {
    const tokens = await this.authService.refreshTokens(
      user.sub,
      user.refreshToken
    );
    const cookie = this.authService.getRefreshCookieAdd(tokens.refresh_token);
    req.res?.cookie('Refresh', cookie.val, cookie.options);

    return { access_token: tokens.access_token };
  }
}
