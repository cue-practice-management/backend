export const FACULTY_CONSTRAINTS = {
  NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
  },
  DESCRIPTION: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 500,
  },
};

export const FACULTY_SORT_OPTIONS = [
  'name',
  'description',
  'deanName',
  'deanEmail',
  'createdAt',
];
export const DEFAULT_FACULTY_SORT_OPTION = 'createdAt';

export const FACULTY_EXCEPTION_CODES = {
  FACULTY_NOT_FOUND: 'FACULTY_NOT_FOUND',
};

export const FACULTY_EXCEPTION_MESSAGES = {
  FACULTY_NOT_FOUND: 'Faculty not found',
};
