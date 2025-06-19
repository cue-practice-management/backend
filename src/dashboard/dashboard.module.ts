import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from 'company/schemas/company.schema';
import { PracticeProcess, PracticeProcessSchema } from 'practice-process/schemas/practice-process.schema';
import { DashboardController } from './dashboard.controller';
import { User, UserSchema } from '@user/schemas/user.schema';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: Company.name,
        schema: CompanySchema
      },
      {
        name: PracticeProcess.name,
        schema: PracticeProcessSchema,
      }
    ]),
    AuthModule
  ],
  providers: [DashboardService],
  controllers: [DashboardController]
})
export class DashboardModule { }
