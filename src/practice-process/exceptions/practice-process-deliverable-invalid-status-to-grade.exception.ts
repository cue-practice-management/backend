import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { PRACTICE_PROCESS_DELIVERABLE_EXCEPTIONS } from "practice-process/constants/practice-process-deliverable.constants";

export class PracticeProcessDeliverableInvalidStatusToGradeException extends BaseHttpException {
    constructor(){
        super(
            PRACTICE_PROCESS_DELIVERABLE_EXCEPTIONS.INVALID_STATUS_TO_GRADE.code,
            PRACTICE_PROCESS_DELIVERABLE_EXCEPTIONS.INVALID_STATUS_TO_GRADE.message,
            PRACTICE_PROCESS_DELIVERABLE_EXCEPTIONS.INVALID_STATUS_TO_GRADE.status
        )
    }
}