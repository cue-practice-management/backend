import { HttpStatus } from "@nestjs/common";

export const PRACTICE_DEFINITION_EXCEPTIONS = {
    NOT_FOUND: {
        code: 'PRACTICE_DEFINITION_NOT_FOUND',
        message: 'Practice definition not found',
        status: HttpStatus.NOT_FOUND
    }
}

export const PRACTICE_DEFINITION_CONTRAINTS = {
    SEMESTER: {
        MIN: 1,
        MAX: 12
    }
}