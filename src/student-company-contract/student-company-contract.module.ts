import { Module } from '@nestjs/common';
import { StudentCompanyContractService } from './student-company-contract.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentCompanyContract, StudentCompanyContractSchema } from './schemas/student-company-contract.schema';
import { StudentCompanyContractMapper } from './mappers/student-company-contract.mapper';
import { StudentCompanyContractListener } from './listeners/student-company-contract.listener';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: StudentCompanyContract.name,
        schema: StudentCompanyContractSchema
      }
    ])
  ],
  providers: [StudentCompanyContractService, StudentCompanyContractMapper, StudentCompanyContractListener],
  exports: [StudentCompanyContractService, StudentCompanyContractMapper]
})
export class StudentCompanyContractModule {}
