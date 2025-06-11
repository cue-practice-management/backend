import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { PRACTICE_TEMPLATE_FORMAT_EXCEPTIONS } from "practice-template/constants/practice-template-format.constants";

export class PracticeTemplateFormatNotFoundException extends BaseHttpException {
    constructor(){
        super(
            PRACTICE_TEMPLATE_FORMAT_EXCEPTIONS.NOT_FOUND.code,
            PRACTICE_TEMPLATE_FORMAT_EXCEPTIONS.NOT_FOUND.message,
            PRACTICE_TEMPLATE_FORMAT_EXCEPTIONS.NOT_FOUND.status
        )
    }
}