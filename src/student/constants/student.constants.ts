export const STUDENT_EXCEPTIONS = {
  STUDENT_NOT_FOUND: {
    message: 'Student not found',
    code: 'STUDENT_NOT_FOUND',
  },
};
export const STUDENT_POPULATION_OPTIONS = {
  ACADEMIC_PROGRAM: {
    path: 'academicProgram',
    populate: {
      path: 'faculty',
    },
  },
  COMPANY: 'currentCompany',
};

export const STUDENT_SORT_OPTIONS = [
  'firstName',
  'lastName',
  'gender',
  'academicProgram',
  'currentSemester',
  'currentCompany',
];

export const DEFAULT_STUDENT_SORT_OPTION = 'firstName';
