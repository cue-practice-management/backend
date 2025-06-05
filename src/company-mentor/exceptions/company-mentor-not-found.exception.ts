import { BaseHttpException } from '@common/exceptions/base-http.exception';
import { COMPANY_MENTOR_EXCEPTIONS } from '../constants/company-mentor.constants';
import { HttpStatus } from '@nestjs/common';

export class CompanyMentorNotFoundException extends BaseHttpException {
  constructor() {
    super(
      COMPANY_MENTOR_EXCEPTIONS.NOT_FOUND.code,
      COMPANY_MENTOR_EXCEPTIONS.NOT_FOUND.message,
      HttpStatus.NOT_FOUND,
    );
  }
}
