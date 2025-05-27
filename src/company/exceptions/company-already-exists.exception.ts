import { BaseHttpException } from '@common/exceptions/base-http.exception';
import { HttpStatus } from '@nestjs/common';
import { COMPANY_EXCEPTIONS } from '../constants/company.constants';

export class CompanyNameAlreadyExistsException extends BaseHttpException {
  constructor() {
    super(
      COMPANY_EXCEPTIONS.NAME_ALREADY_EXISTS.code,
      COMPANY_EXCEPTIONS.NAME_ALREADY_EXISTS.message,
      HttpStatus.CONFLICT,
    );
  }
}

export class CompanyCorporateNameAlreadyExistsException extends BaseHttpException {
  constructor() {
    super(
      COMPANY_EXCEPTIONS.CORPORATE_NAME_ALREADY_EXISTS.code,
      COMPANY_EXCEPTIONS.CORPORATE_NAME_ALREADY_EXISTS.message,
      HttpStatus.CONFLICT,
    );
  }
}

export class CompanyNitAlreadyExistsException extends BaseHttpException {
  constructor() {
    super(
      COMPANY_EXCEPTIONS.NIT_ALREADY_EXISTS.code,
      COMPANY_EXCEPTIONS.NIT_ALREADY_EXISTS.message,
      HttpStatus.CONFLICT,
    );
  }
}

export class CompanyPhoneAlreadyExistsException extends BaseHttpException {
  constructor() {
    super(
      COMPANY_EXCEPTIONS.PHONE_ALREADY_EXISTS.code,
      COMPANY_EXCEPTIONS.PHONE_ALREADY_EXISTS.message,
      HttpStatus.CONFLICT,
    );
  }
}
