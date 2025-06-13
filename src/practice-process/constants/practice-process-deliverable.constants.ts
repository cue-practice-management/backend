export const PRACTICE_PROCESS_EXCEPTIONS = {
    PRACTICE_PROCESS_NOT_FOUND: {
        code: 'PRACTICE_PROCESS_NOT_FOUND',
        message: 'Practice process not found.',
        status: 404,
    },
    STUDENT_HAS_NOT_COMPANY: {
        code: 'STUDENT_HAS_NOT_COMPANY',
        message: 'Student does not have a company assigned.',
        status: 400,
    },
    STUDENT_HAS_ALREADY_PRACTICE_PROCESS: {
        code: 'STUDENT_HAS_ALREADY_PRACTICE_PROCESS',
        message: 'Student already has a practice process assigned.',
        status: 400,
    },
}


export const PRACTICE_PROCESS_DELIVERABLE_CONSTRAINTS = {
    GRADE: {
        MIN: 0,
        MAX: 5,
    }
}