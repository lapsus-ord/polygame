import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
  private params: any | null = null;

  canActivate(context: ExecutionContext) {
    this.params = context.switchToHttp().getRequest().params;

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) throw err || new UnauthorizedException();
    if (undefined === user.role) throw new UnauthorizedException();

    // Allow access if User owns himself
    if (this.params.userId && user.id === parseInt(this.params.id)) {
      return user;
    }

    // Allow access if User is an admin
    if (user.role === Role.ADMIN) {
      return user;
    }

    throw new ForbiddenException();
  }
}
