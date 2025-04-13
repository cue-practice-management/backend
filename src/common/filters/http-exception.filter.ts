import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
  } from '@nestjs/common';
  import { BaseHttpException } from '../exceptions/base-http.exception';
  import { Response } from 'express';
  
  @Catch()
  export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      if (exception instanceof BaseHttpException) {
        response.status(exception.status).json({
          code: exception.code,
          message: exception.message,
          status: exception.status,
        });
      } else if (exception instanceof HttpException) {
        const status = exception.getStatus();
        const res = exception.getResponse() as any;
  
        response.status(status).json({
          code: res?.error || 'UNEXPECTED_ERROR',
          message: res?.message || 'Something went wrong',
        });
      } else {
        response.status(500).json({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Unexpected error occurred',
        });
      }
    }
  }
  