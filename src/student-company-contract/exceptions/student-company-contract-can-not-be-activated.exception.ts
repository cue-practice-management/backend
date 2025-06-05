import { BaseHttpException } from '@common/exceptions/base-http.exception';
import { STUDENT_COMPANY_CONTRACT_EXCEPTIONS } from 'student-company-contract/constants/student-company-contract.constants';

export class StudentCompanyContractCanNotBeActivatedException extends BaseHttpException {
  constructor() {
    super(
      STUDENT_COMPANY_CONTRACT_EXCEPTIONS
        .STUDENT_COMPANY_CONTRACT_CAN_NOT_BE_ACTIVATED.code,
      STUDENT_COMPANY_CONTRACT_EXCEPTIONS
        .STUDENT_COMPANY_CONTRACT_CAN_NOT_BE_ACTIVATED.message,
      STUDENT_COMPANY_CONTRACT_EXCEPTIONS
        .STUDENT_COMPANY_CONTRACT_CAN_NOT_BE_ACTIVATED.status,
    );
  }
}
