import { Module } from '@nestjs/common';
import { StudentCompanyContractService } from './student-company-contract.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentCompanyContract, StudentCompanyContractSchema } from './schemas/student-company-contract.schema';
import { StudentCompanyContractMapper } from './mappers/student-company-contract.mapper';
import { StudentCompanyContractListener } from './listeners/student-company-contract.listener';
import { StudentCompanyContractController } from './student-company-contract.controller';
import { StudentModule } from 'student/student.module';
import { CompanyModule } from 'company/company.module';
import { FileModule } from 'file/file.module';
import { AuthModule } from '@auth/auth.module';
import { EmailModule } from 'email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: StudentCompanyContract.name,
        schema: StudentCompanyContractSchema
      }
    ]),
    StudentModule,
    CompanyModule,
    FileModule,
    AuthModule,
    EmailModule
  ],
  providers: [StudentCompanyContractService, StudentCompanyContractMapper, StudentCompanyContractListener],
  exports: [StudentCompanyContractService, StudentCompanyContractMapper],
  controllers: [StudentCompanyContractController]
})
export class StudentCompanyContractModule { }
