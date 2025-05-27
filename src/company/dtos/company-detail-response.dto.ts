import { CompanyContractResponseDto } from './company-contract-response.dto';
import { CompanyResponseDto } from './company-response.dto';

export class CompanyDetailResponseDto extends CompanyResponseDto {
  contracts: CompanyContractResponseDto[];
}
