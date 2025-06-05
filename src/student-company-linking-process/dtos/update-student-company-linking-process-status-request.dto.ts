import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StudentCompanyLinkingProcessStatus } from 'student-company-linking-process/enums/student-company-linking-process-status.enum';

export class UpdateStudentCompanyLinkingProcessStatusRequestDto {
  @IsEnum(StudentCompanyLinkingProcessStatus)
  status: StudentCompanyLinkingProcessStatus;

  @IsOptional()
  @IsString()
  observations?: string;
}
