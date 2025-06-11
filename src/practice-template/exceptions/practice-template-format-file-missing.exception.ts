import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { PRACTICE_TEMPLATE_FORMAT_EXCEPTIONS } from "practice-template/constants/practice-template-format.constants";

export class PracticeTemplateFormatFileMissingException extends BaseHttpException {
    constructor() {
        super(
            PRACTICE_TEMPLATE_FORMAT_EXCEPTIONS.FILE_MISSING.code,
            PRACTICE_TEMPLATE_FORMAT_EXCEPTIONS.FILE_MISSING.message,
            PRACTICE_TEMPLATE_FORMAT_EXCEPTIONS.FILE_MISSING.status
        );
    }
}