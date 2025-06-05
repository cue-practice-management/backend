import { CompanyBasicInfoResponseDto } from 'company/dtos/company-basic-info-responde.dto';
import { StudentCompanyContractCancelledBy } from 'student-company-contract/enums/student-company-contract-cancelled-by.enum';
import { StudentCompanyContractStatus } from 'student-company-contract/enums/student-company-contract-status.enum';
import { StudentBasicInfoResponseDto } from 'student/dtos/student-basic-info-response.dto';

export class StudentCompanyContractResponseDto {
  _id: string;
  student: StudentBasicInfoResponseDto;
  company: CompanyBasicInfoResponseDto;
  startDate?: Date;
  endDate?: Date;
  isPaid: boolean;
  status: StudentCompanyContractStatus;
  contractUrl?: string;
  cancellationReason?: string;
  cancellationDate?: Date;
  cancelledBy?: StudentCompanyContractCancelledBy;
  createdAt: Date;
  updatedAt: Date;
}
