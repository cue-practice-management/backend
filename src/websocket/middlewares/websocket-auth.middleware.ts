import { EXCEPTION_MESSAGES } from '@auth/constants/auth.constants';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class WsAuthMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(socket: Socket, next: (err?: any) => void) {
    const token = socket.handshake.query.authToken;
    if (!token || typeof token !== 'string') {
      return next(
        new UnauthorizedException(EXCEPTION_MESSAGES.INVALID_ACCESS_TOKEN),
      );
    }

    try {
      const payload = this.jwtService.verify(token);
      if (!payload?.userId) {
        return next(
          new UnauthorizedException(EXCEPTION_MESSAGES.INVALID_ACCESS_TOKEN),
        );
      }

      socket.data.userId = payload.userId;
      socket.data.role = payload.role; 

      next();
    } catch (err) {
      return next(
        new UnauthorizedException(EXCEPTION_MESSAGES.INVALID_ACCESS_TOKEN),
      );
    }
  }
}