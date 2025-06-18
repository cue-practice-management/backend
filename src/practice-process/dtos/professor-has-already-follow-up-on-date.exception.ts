import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { PRACTICE_PROCESS_FOLLOW_UP_EXCEPTIONS } from "practice-process/constants/practice-process-follow-up.constants";

export class ProfessorHasAlreadyFollowUpOnDateException extends BaseHttpException {
    constructor() {
        super(
            PRACTICE_PROCESS_FOLLOW_UP_EXCEPTIONS.PROFESSOR_HAS_ALREADY_FOLLOW_UP_ON_DATE.code,
            PRACTICE_PROCESS_FOLLOW_UP_EXCEPTIONS.PROFESSOR_HAS_ALREADY_FOLLOW_UP_ON_DATE.message,
            PRACTICE_PROCESS_FOLLOW_UP_EXCEPTIONS.PROFESSOR_HAS_ALREADY_FOLLOW_UP_ON_DATE.status
        )
    }
}