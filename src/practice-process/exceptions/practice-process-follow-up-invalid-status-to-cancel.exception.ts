import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { PRACTICE_PROCESS_FOLLOW_UP_EXCEPTIONS } from "practice-process/constants/practice-process-follow-up.constants";

export class PracticeProcessFollowUpInvalidStatusToCancelException extends BaseHttpException {
    constructor() {
        super(
            PRACTICE_PROCESS_FOLLOW_UP_EXCEPTIONS.INVALID_STATUS_TO_CANCEL.code,
            PRACTICE_PROCESS_FOLLOW_UP_EXCEPTIONS.INVALID_STATUS_TO_CANCEL.message,
            PRACTICE_PROCESS_FOLLOW_UP_EXCEPTIONS.INVALID_STATUS_TO_CANCEL.status
        );
    }
}