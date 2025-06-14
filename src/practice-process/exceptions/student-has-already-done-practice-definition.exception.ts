import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { PRACTICE_PROCESS_EXCEPTIONS } from "practice-process/constants/practice-process.constants";

export class StudentHasAlreadyDonePracticeDefinitionException extends BaseHttpException {
    constructor(){
        super(
            PRACTICE_PROCESS_EXCEPTIONS.STUDENT_HAS_ALREADY_DONE_PRACTICE_DEFINITION.code,
            PRACTICE_PROCESS_EXCEPTIONS.STUDENT_HAS_ALREADY_DONE_PRACTICE_DEFINITION.message,
            PRACTICE_PROCESS_EXCEPTIONS.STUDENT_HAS_ALREADY_DONE_PRACTICE_DEFINITION.status
        )
    }
}