import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyMapper } from './mappers/company.mapper';
import { CountryModule } from '@country/country.module';
import { CityModule } from '@city/city.module';
import { AcademicProgramModule } from '@academic-program/academic-program.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schemas/company.schema';
import { CompanyContract, CompanyContractSchema } from './schemas/company-contract.schema';
import { AuthModule } from '@auth/auth.module';
import { FileModule } from 'file/file.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Company.name,
        schema: CompanySchema
      },
      {
        name: CompanyContract.name,
        schema: CompanyContractSchema
      }
    ]),
    CountryModule,
    CityModule,
    AcademicProgramModule,
    AuthModule,
    FileModule
  ],
  providers: [CompanyService, CompanyMapper],
  controllers: [CompanyController],
  exports: [CompanyService, CompanyMapper]
})
export class CompanyModule { }
