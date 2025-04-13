import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '@users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: '.env'
      }
    ),
    MongooseModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          uri: configService.get<string>('MONGO_URI'),
          dbName: configService.get<string>('MONGO_DB_NAME')
        })
      }
    ),
    UserModule,
    AuthModule,
    CommonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
