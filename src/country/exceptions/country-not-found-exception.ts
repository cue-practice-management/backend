import { BaseHttpException } from '@common/exceptions/base-http.exception';
import {
  COUNTRY_EXCEPTION_CODES,
  COUNTRY_EXCEPTION_MESSAGES,
} from '@country/constants/country.constants';
import { HttpStatus } from '@nestjs/common';

export class CountryNotFoundException extends BaseHttpException {
  constructor() {
    super(
      COUNTRY_EXCEPTION_CODES.NOT_FOUND,
      COUNTRY_EXCEPTION_MESSAGES.NOT_FOUND,
      HttpStatus.NOT_FOUND,
    );
  }
}
