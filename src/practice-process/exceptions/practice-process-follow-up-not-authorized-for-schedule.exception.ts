import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { PRACTICE_PROCESS_FOLLOW_UP_EXCEPTIONS } from "practice-process/constants/practice-process-follow-up.constants";

export class PracticeProcessFollowUpNotAuthorizedForScheduleException extends BaseHttpException {
    constructor() {
        super(
            PRACTICE_PROCESS_FOLLOW_UP_EXCEPTIONS.NOT_AUTHORIZED_TO_SCHEDULE.code,
            PRACTICE_PROCESS_FOLLOW_UP_EXCEPTIONS.NOT_AUTHORIZED_TO_SCHEDULE.message,
            PRACTICE_PROCESS_FOLLOW_UP_EXCEPTIONS.NOT_AUTHORIZED_TO_SCHEDULE.status
        );
    }
}