import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookie = (cookieName: string) =>
  createParamDecorator((_: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.cookies?.[cookieName] || null;
  })();
