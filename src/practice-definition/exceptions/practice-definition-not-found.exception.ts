import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { PRACTICE_DEFINITION_EXCEPTIONS } from "practice-definition/constants/practice-definition.constants";

export class PracticeDefinitionNotFoundException extends BaseHttpException {
    constructor() {
        super(
            PRACTICE_DEFINITION_EXCEPTIONS.NOT_FOUND.code,
            PRACTICE_DEFINITION_EXCEPTIONS.NOT_FOUND.message,
            PRACTICE_DEFINITION_EXCEPTIONS.NOT_FOUND.status
        )
    }
}