import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { STUDENT_COMPANY_CONTRACT_EXCEPTIONS } from "student-company-contract/constants/student-company-contract.constants";

export class StudentCompanyContractNotFoundException extends BaseHttpException {
    constructor() {
        super(
            STUDENT_COMPANY_CONTRACT_EXCEPTIONS.NOT_FOUND.code,
            STUDENT_COMPANY_CONTRACT_EXCEPTIONS.NOT_FOUND.message,
            STUDENT_COMPANY_CONTRACT_EXCEPTIONS.NOT_FOUND.status
        );
    }
}
