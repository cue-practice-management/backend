import { EXCEPTION_MESSAGES } from '@auth/constants/auth.constants';
import { ROLES_KEY } from '@common/decorators/role.decorator';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.userId
      ? { userId: request.userId, role: request.userRole }
      : null;

    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException(EXCEPTION_MESSAGES.ACCESS_DENIED);
    }

    return true;
  }
}
