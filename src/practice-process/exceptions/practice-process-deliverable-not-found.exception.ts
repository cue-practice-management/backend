import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { PRACTICE_PROCESS_DELIVERABLE_EXCEPTIONS } from "practice-process/constants/practice-process-deliverable.constants";

export class PracticeProcessDeliverableNotFoundException extends BaseHttpException {
    constructor() {
        super(
            PRACTICE_PROCESS_DELIVERABLE_EXCEPTIONS.NOT_FOUND.code,
            PRACTICE_PROCESS_DELIVERABLE_EXCEPTIONS.NOT_FOUND.message,
            PRACTICE_PROCESS_DELIVERABLE_EXCEPTIONS.NOT_FOUND.status
        )
    }
}