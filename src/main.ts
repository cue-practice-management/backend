import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { EmptyStringToUndefinedInterceptor } from '@common/interceptors/empty-string.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
  }));
  app.setGlobalPrefix('api'); 
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  });
  app.useGlobalInterceptors(new EmptyStringToUndefinedInterceptor());
  app.use(cookieParser()); 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
