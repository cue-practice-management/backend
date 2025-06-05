import { BaseHttpException } from '@common/exceptions/base-http.exception';
import { STUDENT_COMPANY_CONTRACT_EXCEPTIONS } from 'student-company-contract/constants/student-company-contract.constants';

export class StudentCompanyContractMissingException extends BaseHttpException {
  constructor() {
    super(
      STUDENT_COMPANY_CONTRACT_EXCEPTIONS.STUDENT_COMPANY_CONTRACT_MISSING.code,
      STUDENT_COMPANY_CONTRACT_EXCEPTIONS.STUDENT_COMPANY_CONTRACT_MISSING
        .message,
      STUDENT_COMPANY_CONTRACT_EXCEPTIONS.STUDENT_COMPANY_CONTRACT_MISSING
        .status,
    );
  }
}
