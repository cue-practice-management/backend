import { PaginationQueryDto } from '@common/dtos/pagination-query.dto';
import { IsMongoId, IsOptional } from 'class-validator';
import { StudentCompanyContractStatus } from 'student-company-contract/enums/student-company-contract-status.enum';

export class StudentCompanyContractFilter extends PaginationQueryDto {
  @IsOptional()
  @IsMongoId()
  student?: string;

  @IsOptional()
  @IsMongoId()
  company?: string;

  @IsOptional()
  status?: StudentCompanyContractStatus;
}
