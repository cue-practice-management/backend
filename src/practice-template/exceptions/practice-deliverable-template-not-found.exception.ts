import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { PRACTICE_TEMPLATE_DELIVERABLE_EXCEPTIONS } from "practice-template/constants/practice-template-deliverable.constants";

export class PracticeDeliverableTemplateNotFoundException extends BaseHttpException {
    constructor(){
        super(
            PRACTICE_TEMPLATE_DELIVERABLE_EXCEPTIONS.NOT_FOUND.code,
            PRACTICE_TEMPLATE_DELIVERABLE_EXCEPTIONS.NOT_FOUND.message,
            PRACTICE_TEMPLATE_DELIVERABLE_EXCEPTIONS.NOT_FOUND.status
        )
    }
}