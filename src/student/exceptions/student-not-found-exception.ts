import { BaseHttpException } from '@common/exceptions/base-http.exception';
import { HttpStatus } from '@nestjs/common';
import { STUDENT_EXCEPTIONS } from 'student/constants/student.constants';

export class StudentNotFoundException extends BaseHttpException {
  constructor() {
    super(
      STUDENT_EXCEPTIONS.STUDENT_NOT_FOUND.code,
      STUDENT_EXCEPTIONS.STUDENT_NOT_FOUND.message,
      HttpStatus.NOT_FOUND,
    );
  }
}
