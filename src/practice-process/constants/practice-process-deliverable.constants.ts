import { HttpStatus } from "@nestjs/common"

export const PRACTICE_PROCESS_DELIVERABLE_EXCEPTIONS = {
    NOT_FOUND: {
        code: 'PRACTICE_PROCESS_DELIVERABLE_NOT_FOUND',
        message: 'Practice process deliverable not found.',
        status: HttpStatus.NOT_FOUND,
    },
    INVALID_STATUS_TO_SUBMIT: {
        code: 'PRACTICE_PROCESS_DELIVERABLE_INVALID_STATUS_TO_SUBMIT',
        message: 'Deliverable cannot be submitted in its current status.',
        status: HttpStatus.BAD_REQUEST,
    },
    INVALID_STATUS_TO_GRADE: {
        code: 'PRACTICE_PROCESS_DELIVERABLE_INVALID_STATUS_TO_GRADE',
        message: 'Deliverable cannot be graded in its current status.',
        status: HttpStatus.BAD_REQUEST,
    },
}

export const PRACTICE_PROCESS_DELIVERABLE_CONSTRAINTS = {
    GRADE: {
        MIN: 0,
        MAX: 5,
    }
}