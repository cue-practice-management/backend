import { IsEnum, IsOptional, IsString, IsDateString } from 'class-validator';
import { CompanyContractStatus } from '../enums/company-contract-status.enum';
import { CompanyContractType } from '../enums/company-contract-type.enum';

export class CreateCompanyContractDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsEnum(CompanyContractStatus)
  status: CompanyContractStatus;

  @IsEnum(CompanyContractType)
  type: CompanyContractType;

  @IsOptional()
  @IsString()
  observations?: string;
}
