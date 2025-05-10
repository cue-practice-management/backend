import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { EXCEPTION_MESSAGES } from '@auth/constants/auth.constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractTokenFromHeader(request);

    if (!accessToken) {
      throw new UnauthorizedException(EXCEPTION_MESSAGES.INVALID_ACCESS_TOKEN);
    }

    try {
      const payload = this.jwtService.verify(accessToken);

      request.userId = payload.userId;
      request.userRole = payload.role;
    } catch (error) {
      throw new UnauthorizedException(EXCEPTION_MESSAGES.INVALID_ACCESS_TOKEN);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {

    return request.headers.authorization?.split(' ')[1];
  }

}
