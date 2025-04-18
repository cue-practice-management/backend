import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { validationSchema } from './common/config/env-validation.config';
import { EnvironmentConfigService } from './common/config/environment-config.service';
import { AppLogger } from '@common/loggers/app.logger';
import { GlobalExceptionFilter } from '@common/filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      imports: [CommonModule],
      inject: [EnvironmentConfigService],
      useFactory: (env: EnvironmentConfigService) => ({
        uri: env.mongoUri,
        dbName: env.mongoDbName,
      }),
    }),
    UserModule,
    AuthModule,
    CommonModule,
  ],
  providers:[
    AppLogger,
    {
      provide: 'APP_FILTER',
      useClass: GlobalExceptionFilter,
    },
  ]
})
export class AppModule {}
