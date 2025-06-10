import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { PRACTICE_TEMPLATE_EXCEPTIONS } from "practice-template/constants/practice-template.constants";

export class PracticeTemplateNotFoundException extends BaseHttpException { 
    constructor(){
        super(
            PRACTICE_TEMPLATE_EXCEPTIONS.NOT_FOUND.code,
            PRACTICE_TEMPLATE_EXCEPTIONS.NOT_FOUND.message,
            PRACTICE_TEMPLATE_EXCEPTIONS.NOT_FOUND.status
        )
    }
}