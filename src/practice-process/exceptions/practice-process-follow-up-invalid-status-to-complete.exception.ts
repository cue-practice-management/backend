import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { PRACTICE_PROCESS_FOLLOW_UP_EXCEPTIONS } from "practice-process/constants/practice-process-follow-up.constants";

export class PracticeProcessFollowUpInvalidStatusToCompleteException extends BaseHttpException {
    constructor() {
        super(
            PRACTICE_PROCESS_FOLLOW_UP_EXCEPTIONS.INVALID_STATUS_TO_COMPLETE.code,
            PRACTICE_PROCESS_FOLLOW_UP_EXCEPTIONS.INVALID_STATUS_TO_COMPLETE.message,
            PRACTICE_PROCESS_FOLLOW_UP_EXCEPTIONS.INVALID_STATUS_TO_COMPLETE.status
        );
    }
}