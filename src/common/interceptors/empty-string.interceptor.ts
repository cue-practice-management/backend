import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

@Injectable()
export class EmptyStringToUndefinedInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    this.cleanObject(request.query);
    this.cleanObject(request.body);
    this.cleanObject(request.params);

    return next.handle();
  }

  private cleanObject(obj: any) {
    if (!obj || typeof obj !== 'object') return;

    for (const key in obj) {
      if (obj[key] === '') {
        obj[key] = undefined;
      }
    }
  }
}
