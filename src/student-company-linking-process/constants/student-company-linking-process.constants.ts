import { UserRole } from '@common/enums/role.enum';
import { HttpStatus } from '@nestjs/common';
import { COMPANY_POPULATION_OPTIONS } from 'company/constants/company.constants';
import { model } from 'mongoose';
import { STUDENT_POPULATION_OPTIONS } from 'student/constants/student.constants';

export const STUDENT_COMPANY_LINKING_PROCESS_EXCEPTIONS = {
  NOT_FOUND: {
    code: 'STUDENT_COMPANY_LINKING_PROCESS_NOT_FOUND',
    message: 'Student company linking process not found',
    statusCode: HttpStatus.NOT_FOUND,
  },
  APPROVED_STATUS_ALREADY_CHANGED: {
    code: 'STUDENT_COMPANY_LINKING_PROCESS_APPROVED_STATUS_ALREADY_CHANGED',
    message:
      'You cannot update the status of a process that has already been approved',
    statusCode: HttpStatus.BAD_REQUEST,
  },
};

export const STUDENT_COMPANY_LINKING_PROCESS_POPULATE_OPTIONS = {
  STUDENT: {
    path: 'student',
    model: UserRole.STUDENT,
    populate: [STUDENT_POPULATION_OPTIONS.ACADEMIC_PROGRAM],
  },
  COMPANY: {
    path: 'company',
    populate: [
      COMPANY_POPULATION_OPTIONS.CITY,
      COMPANY_POPULATION_OPTIONS.COUNTRY,
      COMPANY_POPULATION_OPTIONS.ASSOCIATED_ACADEMIC_PROGRAMS,
      COMPANY_POPULATION_OPTIONS.CONTRACTS,
    ],
  },
};

export const STUDENT_COMPANY_LINKING_PROCESS_SORT_OPTIONS = [
  'student',
  'company',
  'status',
];
export const STUDENT_COMPANY_LINKING_PROCESS_DEFAULT_SORT = 'createdAt';
