import {
  CITY_EXCEPTION_CODES,
  CITY_EXCEPTION_MESSAGES,
} from '@city/constants/city.constants';
import { BaseHttpException } from '@common/exceptions/base-http.exception';
import { HttpStatus } from '@nestjs/common';

export class CityNotFoundException extends BaseHttpException {
  constructor() {
    super(
      CITY_EXCEPTION_CODES.NOT_FOUND,
      CITY_EXCEPTION_MESSAGES.NOT_FOUND,
      HttpStatus.NOT_FOUND,
    );
  }
}
