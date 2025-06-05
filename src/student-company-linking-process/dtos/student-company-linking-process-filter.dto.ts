import { PaginationQueryDto } from '@common/dtos/pagination-query.dto';
import { IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { StudentCompanyLinkingProcessStatus } from 'student-company-linking-process/enums/student-company-linking-process-status.enum';

export class StudentCompanyLinkingProcessFilterDto extends PaginationQueryDto {
  @IsOptional()
  @IsMongoId()
  student?: string;

  @IsOptional()
  @IsMongoId()
  company?: string;

  @IsOptional()
  @IsEnum(StudentCompanyLinkingProcessStatus)
  status?: StudentCompanyLinkingProcessStatus;
}
