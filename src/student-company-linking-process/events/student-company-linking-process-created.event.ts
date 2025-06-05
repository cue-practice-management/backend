import { StudentCompanyLinkingProcessResponseDto } from 'student-company-linking-process/dtos/student-company-linking-process-response.dto';

export class StudentCompanyLinkingProcessCreatedEvent {
  constructor(
    public readonly studentCompanyLinkingProcess: StudentCompanyLinkingProcessResponseDto,
  ) {}
}
