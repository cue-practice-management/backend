import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from './schemas/refresh-token.schema';
import { UserModule } from '@users/user.module';
import { CommonModule } from '@common/common.module';
import { EnvironmentConfigService } from '@common/config/environment-config.service';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [CommonModule], 
      inject: [EnvironmentConfigService],
      useFactory: (env: EnvironmentConfigService) => ({
        secret: env.jwtAccessSecret,
        signOptions: {
          expiresIn: env.jwtAccessExpiresIn,
        },
      }),
    }),
    MongooseModule.forFeature([
      {
        name: RefreshToken.name,
        schema: RefreshTokenSchema,
      }
    ]),
    UserModule,
    CommonModule,
  ],
  providers: [AuthService, RefreshTokenGuard],
  controllers: [AuthController],
})
export class AuthModule {}
