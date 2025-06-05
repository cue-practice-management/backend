import { UserRole } from '@common/enums/role.enum';
import { HttpStatus } from '@nestjs/common';

export const STUDENT_COMPANY_CONTRACT_EXCEPTIONS = {
  NOT_FOUND: {
    code: 'STUDENT_COMPANY_CONTRACT_NOT_FOUND',
    message: 'Student company contract not found',
    status: HttpStatus.NOT_FOUND,
  },
  STUDENT_HAS_ALREADY_ACTIVE_CONTRACT: {
    code: 'STUDENT_HAS_ALREADY_ACTIVE_CONTRACT',
    message: 'Student has already an active contract',
    status: HttpStatus.BAD_REQUEST,
  },
  STUDENT_COMPANY_CONTRACT_MISSING: {
    code: 'STUDENT_COMPANY_CONTRACT_MISSING',
    message:
      'Student company contract is missing, and is required for active contracts',
    status: HttpStatus.BAD_REQUEST,
  },
  STUDENT_COMPANY_CONTRACT_ALREADY_CANCELLED: {
    code: 'STUDENT_COMPANY_CONTRACT_ALREADY_CANCELLED',
    message: 'Student company contract is already cancelled',
    status: HttpStatus.BAD_REQUEST,
  },
  STUDENT_COMPANY_CONTRACT_CAN_NOT_BE_ACTIVATED: {
    code: 'STUDENT_COMPANY_CONTRACT_CAN_NOT_BE_ACTIVATED',
    message:
      'Student company contract can not be activated, its status is not pending',
    status: HttpStatus.BAD_REQUEST,
  },
};

export const STUDENT_COMPANY_CONTRACT_EVENTS = {
  ACTIVATED: 'student-company-contract.activated',
};

export const STUDENT_COMPANY_CONTRACT_POPULATE_OPTIONS = {
  STUDENT: {
    path: 'student',
    model: UserRole.STUDENT,
  },
  COMPANY: {
    path: 'company',
  },
};

export const STUDENT_COMPANY_CONTRACT_SORT_OPTIONS = [
  'student',
  'company',
  'startDate',
  'endDate',
  'status',
  'createdAt',
];
export const STUDENT_COMPANY_CONTRACT_DEFAULT_SORT = 'createdAt';
