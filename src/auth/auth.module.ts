import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './schemas/refresh-token.schema';
import { UserModule } from '@user/user.module';
import { CommonModule } from '@common/common.module';
import { EnvironmentConfigService } from '@common/config/environment-config.service';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { OtpModule } from 'otp/otp.module';
import { EmailModule } from 'email/email.module';

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
      },
    ]),
    UserModule,
    CommonModule,
    OtpModule,
    EmailModule
  ],
  providers: [AuthService, RefreshTokenGuard, AuthGuard, RoleGuard],
  controllers: [AuthController],
  exports: [AuthGuard, RoleGuard, JwtModule],
})
export class AuthModule {}
