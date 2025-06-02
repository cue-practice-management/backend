import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { STUDENT_COMPANY_LINKING_PROCESS_EXCEPTIONS } from "student-company-linking-process/constants/student-company-linking-process.constants";

export class StudentCompanyLinkingProcessNotFoundException extends BaseHttpException {
    constructor() {
        super(
            STUDENT_COMPANY_LINKING_PROCESS_EXCEPTIONS.NOT_FOUND.code,
            STUDENT_COMPANY_LINKING_PROCESS_EXCEPTIONS.NOT_FOUND.message,
            STUDENT_COMPANY_LINKING_PROCESS_EXCEPTIONS.NOT_FOUND.statusCode
        );

    }
}