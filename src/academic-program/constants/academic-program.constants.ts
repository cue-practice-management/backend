export const ACADEMIC_PROGRAM_CONSTRAINTS = {
    NAME: {
        MAX_LENGTH: 100,
        MIN_LENGTH: 3,
    },
    DESCRIPTION: {
        MAX_LENGTH: 500,
        MIN_LENGTH: 10,
    }
}

export const ACADEMIC_PROGRAM_EXCEPTION_MESSAGES = {
    NOT_FOUND: 'Academic program not found',
}

export const ACADEMIC_PROGRAM_EXCEPTION_CODES = {
    NOT_FOUND: 'ACADEMIC_PROGRAM_NOT_FOUND',
}

export const ACADEMIC_PROGRAM_POPULATE_OPTIONS = {
    FACULTY: 'faculty'
}

export const ACADEMIC_PROGRAM_SORT_OPTIONS = [
    'name',
    'description',
    'durationInSemesters',
    'faculty',
    'coordinatorName',
    'coordinatorEmail'
];

export const DEFAULT_ACADEMIC_PROGRAM_SORT_OPTION = 'name';