export const PROFESSOR_EXCEPTIONS = {
    NOT_FOUND: {
        message: 'Professor not found',
        errorCode: 'PROFESSOR_NOT_FOUND',
    }
}

export const PROFESSOR_POPULATE_OPTIONS = {
    ACADEMIC_PROGRAM: {
        path: 'academicProgram',
        populate: {
            path: 'faculty',
        },
    },
}

export const PROFESSOR_SORT_OPTIONS = [
    'firstName',
    'lastName',
    'academicProgram'
];

export const DEFAULT_PROFESSOR_SORT_OPTION = 'firstName';
