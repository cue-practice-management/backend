import { BaseHttpException } from '@common/exceptions/base-http.exception';
import { STUDENT_COMPANY_CONTRACT_EXCEPTIONS } from 'student-company-contract/constants/student-company-contract.constants';

export class StudentHasAlreadyActiveContractException extends BaseHttpException {
  constructor() {
    super(
      STUDENT_COMPANY_CONTRACT_EXCEPTIONS.STUDENT_HAS_ALREADY_ACTIVE_CONTRACT
        .code,
      STUDENT_COMPANY_CONTRACT_EXCEPTIONS.STUDENT_HAS_ALREADY_ACTIVE_CONTRACT
        .message,
      STUDENT_COMPANY_CONTRACT_EXCEPTIONS.STUDENT_HAS_ALREADY_ACTIVE_CONTRACT
        .status,
    );
  }
}
