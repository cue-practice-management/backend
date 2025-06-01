export const COMPANY_MENTOR_EXCEPTIONS = {
    NOT_FOUND: {
        code: 'COMPANY_MENTOR_NOT_FOUND',
        message: 'Company mentor not found',
    }
}

export const COMPANY_MENTOR_POPULATE_OPTIONS = {
    COMPANY: {
        path: 'company',
    }
}

export const COMPANY_MENTOR_SORT_OPTIONS = [
    'firstName',
    'lastName',
    'gender',
    'company',
];

export const DEFAULT_COMPANY_MENTOR_SORT_OPTION = 'firstName';