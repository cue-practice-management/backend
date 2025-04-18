import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { InvalidRefreshTokenException } from '@auth/exceptions/invalid-refresh-token.exception';
import { EnvironmentConfigService } from '@common/config/environment-config.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {

  constructor(private readonly env: EnvironmentConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const refreshToken = request.cookies[this.env.jwtRefreshCookieName] || null;

    if (this.env.nodeEnv !== 'production') {
      console.log('Refresh Token received.');
    }

    if (!refreshToken) {
      throw new InvalidRefreshTokenException();
    }
    
    request[this.env.jwtRefreshCookieName] = refreshToken;

    return true;
  }
}
