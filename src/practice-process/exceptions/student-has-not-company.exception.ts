import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { PRACTICE_PROCESS_EXCEPTIONS } from "practice-process/constants/practice-process.constants";

export class StudentHasNotCompanyException extends BaseHttpException {
  constructor() {
    super(
        PRACTICE_PROCESS_EXCEPTIONS.STUDENT_HAS_NOT_COMPANY.code,
        PRACTICE_PROCESS_EXCEPTIONS.STUDENT_HAS_NOT_COMPANY.message,
        PRACTICE_PROCESS_EXCEPTIONS.STUDENT_HAS_NOT_COMPANY.status

    );
  }
}