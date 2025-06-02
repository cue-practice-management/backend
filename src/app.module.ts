import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { validationSchema } from './common/config/env-validation.config';
import { EnvironmentConfigService } from './common/config/environment-config.service';
import { AppLogger } from '@common/loggers/app.logger';
import { GlobalExceptionFilter } from '@common/filters/http-exception.filter';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ThrottleConfigService } from '@common/config/throttle-config.service';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { OtpModule } from './otp/otp.module';
import { FacultyModule } from './faculty/faculty.module';
import { AcademicProgramModule } from './academic-program/academic-program.module';
import { CompanyModule } from './company/company.module';
import { CountryModule } from './country/country.module';
import { CityModule } from './city/city.module';
import { StudentModule } from './student/student.module';
import { ProfessorModule } from './professor/professor.module';
import { FileModule } from './file/file.module';
import { EmailModule } from './email/email.module';
import { NewsModule } from './news/news.module';
import { CompanyMentorModule } from './company-mentor/company-mentor.module';
import { StudentCompanyLinkingProcessModule } from './student-company-linking-process/student-company-linking-process.module';

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
    ThrottlerModule.forRootAsync({
      useClass: ThrottleConfigService,
    }),
    UserModule,
    AuthModule,
    CommonModule,
    OtpModule,
    FacultyModule,
    AcademicProgramModule,
    CompanyModule,
    CountryModule,
    CityModule,
    StudentModule,
    ProfessorModule,
    FileModule,
    EmailModule,
    NewsModule,
    CompanyMentorModule,
    StudentCompanyLinkingProcessModule,
  ],
  providers: [
    AppLogger,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
