import { HttpStatus } from "@nestjs/common";

export const STUDENT_COMPANY_LINKING_PROCESS_EXCEPTIONS = { 
    NOT_FOUND: {
        code: 'STUDENT_COMPANY_LINKING_PROCESS_NOT_FOUND',
        message: 'Student company linking process not found',
        statusCode: HttpStatus.NOT_FOUND,
    }
}