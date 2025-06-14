import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { PRACTICE_PROCESS_EXCEPTIONS } from "practice-process/constants/practice-process.constants";

export class StudentHasAlreadyPracticeProcessException extends BaseHttpException {
  constructor() {
    super(
        PRACTICE_PROCESS_EXCEPTIONS.STUDENT_HAS_ALREADY_PRACTICE_PROCESS.code,
        PRACTICE_PROCESS_EXCEPTIONS.STUDENT_HAS_ALREADY_PRACTICE_PROCESS.message,
        PRACTICE_PROCESS_EXCEPTIONS.STUDENT_HAS_ALREADY_PRACTICE_PROCESS.status
    );
  }
}