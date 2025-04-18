// src/auth/interceptors/set-refresh-cookie.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Response } from 'express';
import { EnvironmentConfigService } from '@common/config/environment-config.service';
import { CookieUtil } from '@common/utils/cookie.util';

@Injectable()
export class RefreshCookieInterceptor implements NestInterceptor {
  constructor(private readonly env: EnvironmentConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      tap((data) => {
        if (data?.refreshToken) {
          CookieUtil.setCookie(response, {
            name: this.env.jwtRefreshCookieName,
            value: data.refreshToken,
            maxAgeInDays: this.env.jwtRefreshExpirationDays,
            httpOnly: true,
            secure: false,
            sameSite: 'none',
          });

          delete data.refreshToken;
        }
      }),
    );
  }
}
