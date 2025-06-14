import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { PRACTICE_PROCESS_EXCEPTIONS } from "practice-process/constants/practice-process.constants";

export class PracticeProcessNotFoundException extends BaseHttpException {
    constructor(){
        super(
            PRACTICE_PROCESS_EXCEPTIONS.PRACTICE_PROCESS_NOT_FOUND.code,
            PRACTICE_PROCESS_EXCEPTIONS.PRACTICE_PROCESS_NOT_FOUND.message,
            PRACTICE_PROCESS_EXCEPTIONS.PRACTICE_PROCESS_NOT_FOUND.status
        )
    }
}