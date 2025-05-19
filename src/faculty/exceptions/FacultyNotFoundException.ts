import { BaseHttpException } from '@common/exceptions/base-http.exception';
import { HttpStatus } from '@nestjs/common';
import {
  FACULTY_EXCEPTION_CODES,
  FACULTY_EXCEPTION_MESSAGES,
} from 'faculty/constants/faculty.constants';

export class FacultyNotFoundException extends BaseHttpException {
  constructor() {
    super(
      FACULTY_EXCEPTION_CODES.FACULTY_NOT_FOUND,
      FACULTY_EXCEPTION_MESSAGES.FACULTY_NOT_FOUND,
      HttpStatus.NOT_FOUND,
    );
  }
}
