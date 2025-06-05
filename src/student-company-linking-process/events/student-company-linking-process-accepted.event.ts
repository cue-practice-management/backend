import { StudentCompanyLinkingProcessResponseDto } from 'student-company-linking-process/dtos/student-company-linking-process-response.dto';

export class StudentCompanyLinkingProcessAcceptedEvent {
  constructor(
    public readonly studentCompanyLinkingProcess: StudentCompanyLinkingProcessResponseDto,
  ) {}
}
