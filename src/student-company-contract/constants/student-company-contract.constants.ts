import { HttpStatus } from "@nestjs/common";

export const STUDENT_COMPANY_CONTRACT_EXCEPTIONS = {
    NOT_FOUND: {
        code: 'STUDENT_COMPANY_CONTRACT_NOT_FOUND',
        message: 'Student company contract not found',
        status: HttpStatus.NOT_FOUND
    },
    STUDENT_HAS_ALREADY_ACTIVE_CONTRACT: {
        code: 'STUDENT_HAS_ALREADY_ACTIVE_CONTRACT',
        message: 'Student has already an active contract',
        status: HttpStatus.BAD_REQUEST
    },
}

