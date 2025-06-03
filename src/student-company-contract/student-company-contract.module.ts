import { Module } from '@nestjs/common';
import { StudentCompanyContractService } from './student-company-contract.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentCompanyContract, StudentCompanyContractSchema } from './schemas/student-company-contract.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: StudentCompanyContract.name,
        schema: StudentCompanyContractSchema
      }
    ])
  ],
  providers: [StudentCompanyContractService]
})
export class StudentCompanyContractModule {}
