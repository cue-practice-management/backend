import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { PRACTICE_PROCESS_DELIVERABLE_EXCEPTIONS } from "practice-process/constants/practice-process-deliverable.constants";

export class PracticeProcessDeliverableInvalidStatusToSubmitException extends BaseHttpException {
    constructor(){
        super(
            PRACTICE_PROCESS_DELIVERABLE_EXCEPTIONS.INVALID_STATUS_TO_SUBMIT.code,
            PRACTICE_PROCESS_DELIVERABLE_EXCEPTIONS.INVALID_STATUS_TO_SUBMIT.message,
            PRACTICE_PROCESS_DELIVERABLE_EXCEPTIONS.INVALID_STATUS_TO_SUBMIT.status
        )
    }
}