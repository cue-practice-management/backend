import {
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { CompanyContractStatus } from '../enums/company-contract-status.enum';
import { CompanyContractType } from '../enums/company-contract-type.enum';

export class UpdateCompanyContractDto {
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsEnum(CompanyContractStatus)
  @IsOptional()
  status?: CompanyContractStatus;

  @IsEnum(CompanyContractType)
  @IsOptional()
  type?: CompanyContractType;

  @IsOptional()
  @IsString()
  @IsOptional()
  observations?: string;
}
