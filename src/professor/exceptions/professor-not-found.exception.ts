import { BaseHttpException } from '@common/exceptions/base-http.exception';
import { HttpStatus } from '@nestjs/common';
import { PROFESSOR_EXCEPTIONS } from 'professor/constants/professor.constants';

export class ProfessorNotFoundException extends BaseHttpException {
  constructor() {
    super(
      PROFESSOR_EXCEPTIONS.NOT_FOUND.errorCode,
      PROFESSOR_EXCEPTIONS.NOT_FOUND.message,
      HttpStatus.NOT_FOUND,
    );
  }
}
