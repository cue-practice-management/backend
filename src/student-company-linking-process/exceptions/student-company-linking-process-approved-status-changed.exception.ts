import { BaseHttpException } from '@common/exceptions/base-http.exception';
import { STUDENT_COMPANY_LINKING_PROCESS_EXCEPTIONS } from 'student-company-linking-process/constants/student-company-linking-process.constants';

export class StudentCompanyLinkingProcessApprovedStatusChangedException extends BaseHttpException {
  constructor() {
    super(
      STUDENT_COMPANY_LINKING_PROCESS_EXCEPTIONS.APPROVED_STATUS_ALREADY_CHANGED
        .code,
      STUDENT_COMPANY_LINKING_PROCESS_EXCEPTIONS.APPROVED_STATUS_ALREADY_CHANGED
        .message,
      STUDENT_COMPANY_LINKING_PROCESS_EXCEPTIONS.APPROVED_STATUS_ALREADY_CHANGED
        .statusCode,
    );
  }
}
