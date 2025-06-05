import { CompanyResponseDto } from 'company/dtos/company-response.dto';
import { StudentCompanyLinkingProcessStatus } from 'student-company-linking-process/enums/student-company-linking-process-status.enum';
import { StudentResponseDto } from 'student/dtos/student-response.dto';

export class StudentCompanyLinkingProcessResponseDto {
  _id: string;
  student: StudentResponseDto;
  company: CompanyResponseDto;
  status: StudentCompanyLinkingProcessStatus;
  observations?: string;
  createdAt: Date;
  updatedAt: Date;
}
