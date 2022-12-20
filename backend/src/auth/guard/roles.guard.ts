import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, User } from '@prisma/client';
import { ROLES_KEY } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const { user }: { user: User | undefined } = context
      .switchToHttp()
      .getRequest();
    if (undefined === user) return false;

    // admin has access to everything
    if (user.role === Role.ADMIN) return true;

    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
