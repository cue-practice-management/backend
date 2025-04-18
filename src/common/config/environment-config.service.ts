// src/config/environment-config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) {}

  get mongoUri(): string {
    return this.configService.get<string>('MONGO_URI', { infer: true })!;
  }

  get mongoDbName(): string {
    return this.configService.get<string>('MONGO_DB_NAME', { infer: true })!;
  }

  get jwtAccessSecret(): string {
    return this.configService.get<string>('JWT_ACCESS_SECRET', { infer: true })!;
  }

  get jwtAccessExpiresIn(): string {
    return this.configService.get<string>('JWT_ACCESS_EXPIRES_IN', { infer: true })!;
  }

  get jwtRefreshExpirationDays(): number {
    return this.configService.get<number>('JWT_REFRESH_EXPIRATION_DAYS', { infer: true })!;
  }

  get jwtRefreshCookieName(): string {
    return this.configService.get<string>('JWT_REFRESH_COOKIE_NAME', { infer: true })!;
  }

  get superAdminEmail(): string {
    return this.configService.get<string>('SUPER_ADMIN_EMAIL', { infer: true })!;
  }

  get superAdminPassword(): string {
    return this.configService.get<string>('SUPER_ADMIN_PASSWORD', { infer: true })!;
  }

  get superAdminPhone(): string {
    return this.configService.get<string>('SUPER_ADMIN_PHONE', { infer: true })!;
  }

  get superAdminDocumentNumber(): string {
    return this.configService.get<string>('SUPER_ADMIN_DOCUMENT_NUMBER', { infer: true })!;
  }
}
