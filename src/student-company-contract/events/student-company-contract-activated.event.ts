import { StudentCompanyContractResponseDto } from 'student-company-contract/dtos/student-company-contract-response.dto';

export class StudentCompanyContractActivatedEvent {
  constructor(
    public readonly studentCompanyContract: StudentCompanyContractResponseDto,
  ) {}
}
