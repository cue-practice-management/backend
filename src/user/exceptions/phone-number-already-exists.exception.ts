import { BaseHttpException } from '@common/exceptions/base-http.exception';
import { HttpStatus } from '@nestjs/common';
import {
  EXCEPTION_CODES,
  EXCEPTION_MESSAGES,
} from '../constants/user.exception.constants';

export class PhoneNumberAlreadyExistsException extends BaseHttpException {
  constructor() {
    super(
      EXCEPTION_CODES.USER_PHONE_EXISTS,
      EXCEPTION_MESSAGES.USER_PHONE_EXISTS,
      HttpStatus.CONFLICT,
    );
  }
}
